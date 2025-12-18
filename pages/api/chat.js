import roomsData from "@/data/rooms.json";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Get the latest user message
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop()?.content.toLowerCase();

    // Get context about available properties
    const propertyContext = getPropertyContext();

    // If OpenAI API key is configured, use it
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      try {
        console.log("Using OpenAI API...");
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are a helpful AI travel assistant for an Airbnb-style accommodation booking platform. You help users find properties, answer questions about destinations, and assist with bookings.

Available properties context:
${propertyContext}

IMPORTANT INSTRUCTIONS:
- When users mention specific cities, provide information about properties in that city
- When users mention dates, acknowledge them and ask about preferences or proceed with recommendations
- Answer questions about destinations, activities, and travel beyond just property listings
- If users ask to see properties, suggest they use the search feature on the homepage with their criteria
- Be conversational and remember context from the conversation
- Keep responses under 150 words unless answering complex questions`,
              },
              ...messages,
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("OpenAI API Error:", response.status, errorData);
          throw new Error(`OpenAI API failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log("OpenAI response received successfully");
        return res.status(200).json({
          message: data.choices[0].message.content,
          mode: "ai", // Indicate AI mode
        });
      } catch (openAIError) {
        console.error("OpenAI Error (falling back to rule-based):", openAIError.message);
        // Fall through to rule-based system
      }
    } else {
      console.log("No valid OpenAI API key, using rule-based responses");
    }

    // Fallback: Use rule-based responses if no API key
    console.log("Using rule-based responses");
    const response = generateRuleBasedResponse(lastUserMessage, messages, propertyContext);
    return res.status(200).json({ 
      message: response.message,
      properties: response.properties || null,
      mode: "rules" // Indicate rule-based mode
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Failed to process chat request",
      message: "I'm having trouble right now. Please try again in a moment.",
    });
  }
}

function getPropertyContext() {
  const locations = [...new Set(roomsData.map((room) => room.location))];
  const petFriendlyCount = roomsData.filter(
    (room) => room.petsAllowed === "yes"
  ).length;
  const freeCancellationCount = roomsData.filter(
    (room) => room.freeCancelation === "yes"
  ).length;
  
  const priceRange = {
    min: Math.min(...roomsData.map((room) => room.price)),
    max: Math.max(...roomsData.map((room) => room.price)),
  };

  return `
- Available locations: ${locations.join(", ")}
- Total properties: ${roomsData.length}
- Pet-friendly properties: ${petFriendlyCount}
- Properties with free cancellation: ${freeCancellationCount}
- Price range: $${priceRange.min} - $${priceRange.max} per night
  `.trim();
}

function generateRuleBasedResponse(query, allMessages, context) {
  // Extract city from query and conversation context
  const extractedCity = extractCity(query, allMessages);
  
  // Check if user wants to see properties
  const wantsToSeeProperties = 
    query.includes("show me") || 
    query.includes("see") || 
    query.includes("view") || 
    query.includes("properties") ||
    query.includes("rooms") ||
    query.includes("display") ||
    query.includes("list");
  
  // Check if this is a combined query (e.g., "pet friendly in Paris")
  const isPetQuery = query.includes("pet") || query.includes("dog") || query.includes("cat");
  const isParkingQuery = query.includes("parking") || query.includes("car");
  const isPriceQuery = query.includes("price") || query.includes("cheap") || query.includes("budget");
  
  // Combined location + feature queries
  if (extractedCity) {
    const cityProps = roomsData.filter(
      (room) => room.location.toLowerCase() === extractedCity.toLowerCase()
    );
    
    if (cityProps.length === 0) {
      return { 
        message: `I couldn't find properties in ${extractedCity}. We have amazing stays in ${getAvailableLocations().slice(0, 5).join(", ")} and more. Which of these interests you?`
      };
    }
    
    // Pet-friendly in specific city
    if (isPetQuery) {
      const petFriendly = cityProps.filter((room) => room.petsAllowed === "yes");
      const prices = petFriendly.map((room) => room.price);
      const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
      
      if (petFriendly.length > 0) {
        const message = `Perfect! I found ${petFriendly.length} pet-friendly properties in ${extractedCity}! Prices range from $${Math.min(...prices)} to $${Math.max(...prices)} per night (avg $${avgPrice}). ${wantsToSeeProperties ? 'Here are some options:' : 'Would you like to see them?'}`;
        
        if (wantsToSeeProperties) {
          return {
            message,
            properties: petFriendly.slice(0, 3) // Show top 3
          };
        }
        return { message };
      } else {
        return { 
          message: `Unfortunately, we don't have pet-friendly properties in ${extractedCity} right now. However, we have ${countPetFriendly()} pet-friendly options in other cities like ${getTopPetFriendlyCities(3).join(", ")}. Would any of these work for you?`
        };
      }
    }
    
    // Parking in specific city
    if (isParkingQuery) {
      const withParking = cityProps.filter((room) =>
        room.description.toLowerCase().includes("parking")
      );
      if (withParking.length > 0) {
        return `Great choice! ${withParking.length} properties in ${extractedCity} include parking. Many offer free parking too. Prices start at $${Math.min(...withParking.map(r => r.price))} per night. Want to see available dates?`;
      }
    }
    
    // General city info
    const prices = cityProps.map((room) => room.price);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const petCount = cityProps.filter((room) => room.petsAllowed === "yes").length;
    const cancelCount = cityProps.filter((room) => room.freeCancelation === "yes").length;
    
    const message = `${extractedCity} is a great choice! We have ${cityProps.length} properties there with prices from $${Math.min(...prices)} to $${Math.max(...prices)} per night (avg $${avgPrice}). ${petCount > 0 ? `${petCount} are pet-friendly. ` : ''}${cancelCount > 0 ? `${cancelCount} offer free cancellation. ` : ''}${wantsToSeeProperties ? 'Here are some top picks:' : 'What dates are you considering?'}`;
    
    if (wantsToSeeProperties) {
      // Sort by rating and show top 3
      const topProps = cityProps.sort((a, b) => b.star - a.star).slice(0, 3);
      return {
        message,
        properties: topProps
      };
    }
    
    return { message };
  }

  // Location-based queries
  if (query.includes("where") || query.includes("location") || query.includes("city") || query.includes("destination")) {
    const locations = getAvailableLocations();
    const topCities = getTopCitiesByCount(5);
    return { 
      message: `We have amazing properties in ${topCities.join(", ")}, and ${locations.length - 5} more destinations! Each offers unique experiences. Which destination interests you most?`
    };
  }

  // Pet-friendly queries (no specific city)
  if (isPetQuery) {
    const petFriendly = roomsData.filter((room) => room.petsAllowed === "yes");
    const topCities = getTopPetFriendlyCities(4);
    const message = `Great news! We have ${petFriendly.length} pet-friendly properties. Top destinations: ${topCities.join(", ")}. Your furry friends are welcome! ${wantsToSeeProperties ? 'Here are some great options:' : 'Which city sounds perfect for you?'}`;
    
    if (wantsToSeeProperties) {
      const topProps = petFriendly.sort((a, b) => b.star - a.star).slice(0, 3);
      return {
        message,
        properties: topProps
      };
    }
    return { message };
  }

  // Parking queries
  if (query.includes("parking") || query.includes("car")) {
    const withParking = roomsData.filter((room) =>
      room.description.toLowerCase().includes("parking")
    );
    return { 
      message: `We have ${withParking.length}+ properties with parking available. Many of our listings include free parking for your convenience. Which city are you interested in visiting?`
    };
  }

  // Price/budget queries
  if (query.includes("price") || query.includes("cheap") || query.includes("budget") || query.includes("cost")) {
    const priceRange = {
      min: Math.min(...roomsData.map((room) => room.price)),
      max: Math.max(...roomsData.map((room) => room.price)),
    };
    return { 
      message: `Our properties range from $${priceRange.min} to $${priceRange.max} per night. We have options for every budget! Budget-friendly stays start at just $${priceRange.min}/night. What's your ideal price range?`
    };
  }

  // Cancellation queries
  if (query.includes("cancel") || query.includes("refund")) {
    const freeCancellation = roomsData.filter(
      (room) => room.freeCancelation === "yes"
    );
    return { 
      message: `We offer flexible booking options! ${freeCancellation.length} properties have free cancellation policies. I recommend filtering for "free cancellation" when you search to see all flexible options.`
    };
  }

  // Amenities queries
  if (query.includes("wifi") || query.includes("kitchen") || query.includes("amenities")) {
    return { 
      message: `Most of our properties include essential amenities like Wi-Fi, kitchens, and washing machines. When you search, you'll see detailed amenity lists for each property. Is there a specific amenity you need?`
    };
  }

  // Area/neighborhood queries
  if (query.includes("area") || query.includes("neighborhood") || query.includes("safe") || query.includes("best")) {
    return { 
      message: `Each of our destinations offers wonderful neighborhoods! Popular areas include city centers for convenience, historic districts for culture, and peaceful suburbs for relaxation. Which city are you considering, and what's your travel style?`
    };
  }

  // Booking process queries
  if (query.includes("book") || query.includes("reserve") || query.includes("how to")) {
    return { 
      message: `Booking is easy! Just search for your destination, select your dates and number of guests, browse properties, and click to book. You can filter by price, amenities, and ratings. Need help finding something specific?`
    };
  }

  // Default response
  return { 
    message: `I'd be happy to help you find the perfect stay! We have ${roomsData.length} properties across amazing destinations. I can help you with:
  
• Finding properties in specific locations
• Pet-friendly accommodations
• Budget-friendly options
• Amenities like parking, WiFi, kitchens
• Cancellation policies

What are you looking for?`
  };
}

// Helper functions
function extractCity(query, allMessages) {
  const locations = getAvailableLocations();
  
  // Check current query for city names
  for (const location of locations) {
    if (query.toLowerCase().includes(location.toLowerCase())) {
      return location;
    }
  }
  
  // Check if the query is just a city name (e.g., user replied "Paris")
  const trimmedQuery = query.trim();
  for (const location of locations) {
    if (trimmedQuery.toLowerCase() === location.toLowerCase()) {
      return location;
    }
  }
  
  // Check previous messages for context
  if (allMessages && allMessages.length > 2) {
    const recentMessages = allMessages.slice(-4); // Check last 4 messages
    for (const msg of recentMessages.reverse()) {
      if (msg.role === "user") {
        for (const location of locations) {
          if (msg.content.toLowerCase().includes(location.toLowerCase())) {
            return location;
          }
        }
      }
    }
  }
  
  return null;
}

function getAvailableLocations() {
  return [...new Set(roomsData.map((room) => room.location))];
}

function getTopCitiesByCount(limit) {
  const cityCounts = {};
  roomsData.forEach((room) => {
    cityCounts[room.location] = (cityCounts[room.location] || 0) + 1;
  });
  
  return Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city]) => city);
}

function getTopPetFriendlyCities(limit) {
  const petFriendly = roomsData.filter((room) => room.petsAllowed === "yes");
  const cityCounts = {};
  
  petFriendly.forEach((room) => {
    cityCounts[room.location] = (cityCounts[room.location] || 0) + 1;
  });
  
  return Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city]) => city);
}

function countPetFriendly() {
  return roomsData.filter((room) => room.petsAllowed === "yes").length;
}
