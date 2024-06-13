import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchMap from "@/components/SearchMap";

export default function Home({ exploreData, cardsData }) {

  const [imageUrls, setImageUrls] = useState([]);

  const [destinationData, setDestinationData] = useState([]);

  const topDestinations = [
    ["San Francisco", "1750km away"],
    ["Paris", "from $1,688"],
    ["Sydney", "from $499"],
    ["London", "from $1,743"],
    ["Barcelona", "from $1,979"],
    ["Singapore", "from $879"],
    ["Vancouver", "from $2,167"],
    ["New York", "from 2,437"]
  ];
  

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "44296476-2891cf0ed10ef410397d4aef5",
            q: "Travel",
            image_type: "photo",
            category: "places",
            per_page: 8,
          },
        });

        const images = response.data.hits;
        const imageUrls = images.map((image) => image.webformatURL);
        setImageUrls(imageUrls);

       
        // Merge imageUrls with topDestinations
        const mergedData = topDestinations.map((city, index) => ({
          city,
          imageUrl: imageUrls[index] || '',
        }));

        setDestinationData(mergedData);

      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);




console.log(destinationData, "data")

  return (
    <div className="bg-white">
      <Head>
        <title>AirBnb</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Banner img={imageUrls[4]}/>

      <main className="max-w-7xl mx-auto px-2 sm:mx-16 ">
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5 text-gray-500 ">Top Destinations</h2>
          
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2"> 
        {destinationData?.map((data, index) => (
          <SmallCard key={index} data={data} />
        ) )}
        </div>
    {/* </div> */}
    <h2 className="text-3xl font-semibold py-8 text-gray-500">Live Anywhere</h2>
    <div className="flex space-x-3 overflow-scroll scrollbar-hide ">
          {imageUrls?.map((url) => (
          <MediumCard key={url} url={url} />
          ) )}
    </div>

    {/* <SearchMap /> */}

    {/* <div>
      <LargeCard img={imageUrls[7]} title="The Great Outdoors" description="Get started today" buttonText="Get inspired"/>
    </div> */}

        </section>
      </main>
      <Footer />
    </div>
  );
}


export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").
      then(
        (res) => res.json()
      );

  const cardsData = await fetch("https://www.jsonkeeper.com/b/4G1G").
     then(
      (res) => res.json()
     );

      return {
          props: {
            exploreData,
            cardsData
          }
        }
}
