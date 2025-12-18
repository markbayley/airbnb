import Banner from "@/components/Banner";
import Header from "@/components/Header";
// import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home({
  // exploreData,
  // cardsData,
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
        <div className="border-t border-gray-200 my-8"></div>

        {/* Featured Section */}
        <section className="mb-16">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-3">
              Featured Cities
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light">
              Find the perfect destination for you
            </p>
          </div>

          <div className="relative">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {featuredData?.map((data, index) => (
                <div
                  key={index}
                  className="snap-start transform transition-all duration-300 hover:scale-105"
                >
                  <SmallCard data={data} />
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
  // const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
  //   (res) => res.json()
  // );

  // const cardsData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
  //   (res) => res.json()
  // );

  // Using local images for better performance
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
    ["Lima", "from $170"],
    ["Dubai", "from $165"],
    // ["Miami", "from $150"],
    ["Rio de Janeiro", "from $130"],
    // ["Tokyo", "from $190"],
    ["Lisbon", "from $80"],
    // ["Rome", "from $210"],
    ["Istanbul", "from $137"],
  ];

  // Map city names to local image files
  const cityImageMap = {
    "San Francisco": "/cityimages/sanfrancisco.jpg",
    "Paris": "/cityimages/paris.jpg",
    "Sydney": "/cityimages/sydney.jpg",
    "London": "/cityimages/london.jpg",
    "Barcelona": "/cityimages/barcelona.jpg",
    "Singapore": "/cityimages/singapore.jpg",
    "Vancouver": "/cityimages/vancouver.jpg",
    "New York": "/cityimages/newyork.jpg",
  };

  const featuredImageMap = {
    "Lima": "/featuredimages/lima.jpg",
    "Dubai": "/featuredimages/dubai.jpg",
    "Rio de Janeiro": "/featuredimages/rio-de-janeiro.jpg",
    "Lisbon": "/featuredimages/lisbon.jpg",
    "Istanbul": "/featuredimages/istanbul.jpg",
  };

  // Use local images for destinations
  const destinationData = topDestinations.map((city) => ({
    city,
    imageUrl: cityImageMap[city[0]] || "",
  }));

  // Use local images for featured cities
  const featuredData = featuredDestinations.map((city) => ({
    city,
    imageUrl: featuredImageMap[city[0]] || "",
  }));

  const bannerImage = cityImageMap["London"];

  return {
    props: {
      // exploreData,
      // cardsData,
      destinationData,
      featuredData,
      bannerImage,
    },
    revalidate: 86400, // Revalidate every 24 hours (ISR)
  };
}
