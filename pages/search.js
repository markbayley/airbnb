import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import getCenter from "geolib/es/getCenter";
import React, { useState } from "react";
import SearchMap from "@/components/SearchMap";

function Search({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router?.query;

  const formattedStartDate = startDate && format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = ["Free Cancelation", "Pet Friendly", "Highly Rated", "Budget Friendly", "My Favorites"];

  const handleFilter = (item) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(item) ? prevFilters.filter((filter) => filter !== item) : [...prevFilters, item]
    );
  };

  const [favorited, setFavorited] = useState([]);
  const handleFavorites = (item) => {
    setFavorited((prevFilters) =>
      prevFilters.includes(item) ? prevFilters.filter((filter) => filter !== item) : [...prevFilters, item]
    );
  };

  let filteredResults = activeFilters.includes("My Favorites")
    ? searchResults.filter((item) => favorited.includes(item))
    : searchResults;

  if (activeFilters.includes("Highly Rated")) {
    filteredResults = filteredResults.slice().sort((a, b) => b.star - a.star);
  }

  if (activeFilters.includes("Budget Friendly")) {
    filteredResults = filteredResults.slice().sort((a, b) => a.price - b.price);
  }

  if (activeFilters.includes("Pet Friendly")) {
    filteredResults = filteredResults.filter((item) => item.petsAllowed == "yes");
  }

  if (activeFilters.includes("Free Cancelation")) {
    filteredResults = filteredResults.filter((item) => item.freeCancelation == "yes");
  }

  const coordinates = filteredResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  return (
    <div>
      <Header placeholder={location ? `${location} | ${range} | ${numberOfGuests} guests` : ""} />
      <main className="flex">
        <section className="flex-grow px-6">
          <h3
            onClick={() => router.push("/")}
            className="py-1 px-2 my-3 bg-gray-100 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
          >
            <ArrowLeftCircleIcon className="h-8 w-8 text-red-400" />
            <p className="px-2">Search somewhere else?</p>
          </h3>
          <p className="text-xs">
            {numberOfGuests != undefined
              ? "300+ Stays" + range + " for " + numberOfGuests + "guests"
              : "No dates have been selected yet"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 capitalize">
            {location ? " Stays in " + location : "Explore Locations"}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {filterButtons.map((item) => (
              <p
                key={item}
                onClick={() => handleFilter(item)}
                className={activeFilters.includes(item) ? "button bg-red-400 text-white" : "button"}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {filteredResults?.map((item) => (
              <InfoCard
                city={location}
                key={item.star}
                img={item.img}
                location={item.location}
                title={item.title}
                star={item.star}
                price={item.price}
                description={item.description}
                total={item.total}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                item={item}
                favorited={favorited}
                setFavorited={setFavorited}
                handleFavorites={handleFavorites}
              />
            ))}
          </div>
        </section>

        <section className="hidden lg:inline-flex min-w-[600px]">
          <SearchMap
            searchResults={searchResults}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            filteredResults={filteredResults}
            searchLocation={location} // Pass the searched location to the SearchMap component
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/F9BZ").then((res) => res.json());

  return {
    props: {
      searchResults,
    },
  };
}

               

