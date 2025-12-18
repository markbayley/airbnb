# AI Chat Assistant

An intelligent chat assistant has been integrated into your Airbnb app!

## Features

✨ **Smart AI Assistant** - Floating chat widget accessible from any page
🤖 **Dual Mode Operation**:
  - **With OpenAI**: Uses GPT-3.5-turbo for intelligent, context-aware responses
  - **Without OpenAI**: Uses rule-based system with property-aware responses

💬 **Capabilities**:
- Answer questions about properties and destinations
- Help users find pet-friendly accommodations
- Provide information about amenities, parking, pricing
- Explain cancellation policies
- Guide users through the booking process
- Suggest properties based on user needs

## Setup

### Option 1: Use with OpenAI (Recommended)

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
3. Add your API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
4. Restart your development server

### Option 2: Use Rule-Based Responses (No API Key Needed)

The chat works immediately without any API key! It uses an intelligent rule-based system that:
- Understands common queries about locations, pets, pricing, amenities
- Provides helpful responses based on your actual property data
- Suggests relevant properties from your `rooms.json` file

## Usage

1. Look for the red chat button in the bottom-right corner
2. Click to open the chat assistant
3. Ask questions like:
   - "What are the best areas to stay in Paris?"
   - "Show me pet-friendly properties"
   - "I need a place with free parking"
   - "What's your price range?"

## Files Created

- `components/ChatAssistant.js` - Chat UI component
- `pages/api/chat.js` - Chat API endpoint
- `.env.local.example` - Environment configuration template
- `pages/_app.js` - Updated to include chat widget

## Customization

### Styling
Edit `components/ChatAssistant.js` to customize colors, position, and appearance.

### AI Personality
Modify the system prompt in `pages/api/chat.js` to change the assistant's tone and behavior.

### Rule-Based Responses
Enhance the `generateRuleBasedResponse()` function in `pages/api/chat.js` to handle more query types.

## Future Enhancements

Consider adding:
- Conversation memory/history
- Property recommendations based on chat
- Direct booking from chat
- Multi-language support
- Voice input
- Integration with your search functionality

Enjoy your new AI-powered chat assistant! 🚀
