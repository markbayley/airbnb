import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="bg-white">
      <Head>
        <title>AirBnb</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-2 sm:mx-16 ">
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5 text-gray-800">Explore Nearby</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map(({img, location, distance}) => (
          <SmallCard key={img} img={img} location={location} distance={distance} />
          ) )}
    </div>
    <h2 className="text-3xl font-semibold py-8 text-gray-800">Live Anywhere</h2>
    <div className="flex space-x-3 overflow-scroll scrollbar-hide ">
          {cardsData?.map(({img, title}) => (
          <MediumCard key={img} img={img} title={title}  />
          ) )}
    </div>

    <div>
      <LargeCard img={exploreData[4]} title="The Great Outdoors" description="Get started today" buttonText="Get inspired"/>
    </div>

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
