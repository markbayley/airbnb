import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home({ exploreData, cardsData }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [featuredUrls, setFeaturedUrls] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);





  const topDestinations = [
    ["San Francisco", "from $170 per night"],
    ["Paris", "from $165 per night"],
    ["Sydney", "from $150 per night"],
    ["London", "from $130 per night"],
    ["Barcelona", "from $190 per night"],
    ["Singapore", "from $80 per night"],
    ["Vancouver", "from $210 per night"],
    ["New York", "from $137 per night"],
  ];

  const featuredDestinations = [
    ["Vancouver", "170 per night"],
    ["Toronto", "from $165 per night"],
    ["Ottawa", "from $150 per night"],
    ["Calgary", "from $130 per night"],
    ["Quebec City", "from $190 per night"],
    ["Winnipeg", "from $80 per night"],
    ["Edmonton", "from $210 per night"],
    ["Hamilton", "from $137 per night"],
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: process.env.NEXT_PUBLIC_PIXABAY_TOKEN,
            q: "Travel",
            image_type: "photo",
            category: "places",
            per_page: 8,
          },
        });

        const featuredCity = await axios.get("https://pixabay.com/api/", {
          params: {
            key: process.env.NEXT_PUBLIC_PIXABAY_TOKEN,
            q: "Vancouver",
            image_type: "photo",
            category: "places",
            per_page: 8,
          },
        });

        const featuredImages = featuredCity.data.hits;
        const featuredUrls = featuredImages.map((image) => image.webformatURL);
        setFeaturedUrls(featuredUrls);

        const images = response.data.hits;
        const imageUrls = images.map((image) => image.webformatURL);
        setImageUrls(imageUrls);

        // Merge imageUrls with topDestinations
        const mergedData = topDestinations.map((city, index) => ({
          city,
          imageUrl: imageUrls[index] || "",
        }));

        const featuredData = featuredDestinations.map((city, index) => ({
          city,
          imageUrl: featuredUrls[index] || "",
        }));

        setFeaturedData(featuredData);

        setDestinationData(mergedData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  console.log(destinationData, "data");

  console.log("featuredUrls", featuredUrls);

  return (
    <div className="bg-white">
      <Head>
        <title>AirBnb</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Banner img={imageUrls[4]} />

   

      <main className="max-w-9xl mx-auto px-2 sm:mx-16 ">
        <section className="">
          <h2 className="text-3xl font-semibold py-8 text-gray-500 ">
            Top Destinations
            <p className="text-black text-xl font-light pt-2">
              Go where you want to go today
            </p>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
            {destinationData?.map((data, index) => (
              <SmallCard key={index} data={data} />
            ))}
          </div>

          <h2 className="text-3xl font-semibold text-gray-500 pt-8">
            Travel Explorer
            <p className="text-black text-xl font-light pt-2">
              See the world through others eyes
            </p>
          </h2>

          <PhotoGallery
    
    />
       
          <h2 className="text-3xl font-semibold py-8 text-gray-500">
            Featured: Canada
            <p className="text-black text-xl font-light pt-2">
              Find the perfect destination for you
            </p>
          </h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide ">
            {featuredData?.map((data, index) => (
              <MediumCard key={index} data={data} />
            ))}
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

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
