import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Footer from "@/components/Footer";
import Head from "next/head";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home({
  exploreData,
  cardsData,
  destinationData,
  featuredData,
  bannerImage,
}) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Head>
        <title>AirBnb - Find Your Perfect Stay</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Banner img={bannerImage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Destinations Section */}
        <section className="py-12 sm:py-16">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-3">
              Top Destinations
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light">
              Go where you want to go today
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {destinationData?.map((data, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <SmallCard data={data} />
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        {/* <div className="border-t border-gray-200"></div> */}

        {/* Travel Explorer Section */}
        <section className="">
          <div className=" text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Travel Explorer
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light">
              See the world through others' eyes
            </p>
          </div>

          <div className="mb-16">
            <PhotoGallery />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Featured Canada Section */}
        <section className="">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-3">
              Featured: Canada
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light">
              Find the perfect destination for you
            </p>
          </div>

          <div className="relative">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {featuredData?.map((data, index) => (
                <div
                  key={index}
                  className="snap-start transform transition-all duration-300 hover:scale-105"
                >
                  <MediumCard data={data} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    (res) => res.json()
  );

  // Fetch images at build time for better performance
  const topDestinations = [
    ["San Francisco", "from $170"],
    ["Paris", "from $165"],
    ["Sydney", "from $150"],
    ["London", "from $130"],
    ["Barcelona", "from $190"],
    ["Singapore", "from $80"],
    ["Vancouver", "from $210"],
    ["New York", "from $137"],
  ];

  const featuredDestinations = [
    ["Vancouver", "from $170"],
    ["Toronto", "from $165"],
    ["Ottawa", "from $150"],
    ["Calgary", "from $130"],
    ["Quebec City", "from $190"],
    ["Winnipeg", "from $80"],
    ["Edmonton", "from $210"],
    ["Hamilton", "from $137"],
  ];

  let destinationData = [];
  let featuredData = [];
  let bannerImage = "";

  try {
    // Fetch both API calls in parallel for better performance
    const [travelResponse, featuredResponse] = await Promise.all([
      fetch(
        `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_TOKEN}&q=Travel&image_type=photo&category=places&per_page=8`
      ),
      fetch(
        `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_TOKEN}&q=Vancouver&image_type=photo&category=places&per_page=8`
      ),
    ]);

    const travelData = await travelResponse.json();
    const featuredCityData = await featuredResponse.json();

    const imageUrls = travelData.hits?.map((image) => image.webformatURL) || [];
    const featuredUrls =
      featuredCityData.hits?.map((image) => image.webformatURL) || [];

    bannerImage = imageUrls[4] || "";

    // Merge imageUrls with topDestinations
    destinationData = topDestinations.map((city, index) => ({
      city,
      imageUrl: imageUrls[index] || "",
    }));

    featuredData = featuredDestinations.map((city, index) => ({
      city,
      imageUrl: featuredUrls[index] || "",
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    // Provide fallback data if API fails
    destinationData = topDestinations.map((city) => ({
      city,
      imageUrl: "",
    }));
    featuredData = featuredDestinations.map((city) => ({
      city,
      imageUrl: "",
    }));
  }

  return {
    props: {
      exploreData,
      cardsData,
      destinationData,
      featuredData,
      bannerImage,
    },
    revalidate: 86400, // Revalidate every 24 hours (ISR)
  };
}
