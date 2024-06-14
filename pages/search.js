import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import {
  ArrowLeftCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import getCenter from "geolib/es/getCenter";
import React, { useState } from "react";
import SearchMap from "@/components/SearchMap";
import SelectedCard from "@/components/SelectedCard";

function Search({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router?.query;

  const formattedStartDate =
    startDate && format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = [
    "Free Cancelation",
    "Pet Friendly",
    "Highly Rated",
    "Budget Friendly",
    "My Favorites",
  ];

  const handleFilter = (item) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(item)
        ? prevFilters.filter((filter) => filter !== item)
        : [...prevFilters, item]
    );
  };

  const [favorited, setFavorited] = useState([]);
  const handleFavorites = (item) => {
    setFavorited((prevFilters) =>
      prevFilters.includes(item)
        ? prevFilters.filter((filter) => filter !== item)
        : [...prevFilters, item]
    );
  };

  let filteredResults;

  if (selectedLocation && selectedLocation.id !== undefined) {
    // Filter out the selectedLocation from searchResults
    const filteredOutSelected = searchResults.filter(
      (item) => item.id === selectedLocation.id
    );

    // Filter other items based on location if needed
    const otherItems = searchResults.filter(
      (item) => item.location === location && item.id !== selectedLocation.id
    );

    // Concatenate filteredOutSelected and otherItems
    filteredResults = [...filteredOutSelected, ...otherItems];
  } else if (location) {
    // Filter items based on location if selectedLocation is not defined
    filteredResults = searchResults.filter(
      (item) => item.location === location
    );
  } else {
    // Default case: return all searchResults
    filteredResults = searchResults;
  }

  console.log("Filtered Results:", filteredResults);

  if (activeFilters.includes("My Favorites")) {
    filteredResults = searchResults.filter((item) => favorited.includes(item));
  }

  if (activeFilters.includes("Highly Rated")) {
    filteredResults = filteredResults.slice().sort((a, b) => b.star - a.star);
  }

  if (activeFilters.includes("Budget Friendly")) {
    filteredResults = filteredResults.slice().sort((a, b) => a.price - b.price);
  }

  if (activeFilters.includes("Pet Friendly")) {
    filteredResults = filteredResults.filter(
      (item) => item.petsAllowed == "yes"
    );
  }

  if (activeFilters.includes("Free Cancelation")) {
    filteredResults = filteredResults.filter(
      (item) => item.freeCancelation == "yes"
    );
  }

  const coordinates = filteredResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  console.log(
    "selectedLocationID",
    selectedLocation.id,
    "location",
    location,
    "searchRsults",
    searchResults,
    "filteredResults",
    filteredResults
  );

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10,
    longitude: 0,
    zoom: 1,
  });

  return (
    <div>
      <Header
        placeholder={
          location ? `${location} | ${range} | ${numberOfGuests} guests` : ""
        }
      />
      <main className="flex">
        <section className="flex-grow px-2 md:px-6   ">
          <div className="flex w-full justify-between mt-4">
            <h1 className="text-xl md:text-3xl font-semibold mb-2  capitalize">
              {location ? location : "Explore Locations"}{" "}
              <p className="text-xs pl-1">
            {numberOfGuests != undefined
              ? "300+ Stays" + range + " for " + numberOfGuests + "guests"
              : "No dates have been selected yet"}
          </p>
            </h1>

            {selectedLocation.id ? (
              <h3
                onClick={() => setSelectedLocation({})}
                className="h-12 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
              >
                <ArrowUturnLeftIcon className="h-5 w-5 font-bold text-white" />
                <p className="py-2 px-2 text-white">Unselect</p>
              </h3>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="h-12 px-2  bg-gray-100 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
              >
                <ArrowLeftCircleIcon className="h-8 w-8 text-red-400" />
                <p className="py-1 px-2">Back</p>
              </button>
            )}
          </div>
    
          {/* { !selectedLocation.id && */}
          <div className="hidden lg:inline-flex text-xs md:text-[15px] mb-3 mt-3 space-x-3 text-gray-800 whitespace-nowrap">
            {filterButtons.map((item) => (
              <p
                key={item}
                onClick={() => handleFilter(item)}
                className={
                  activeFilters.includes(item)
                    ? "button bg-red-400 text-white"
                    : "button"
                }
              >
                {item}
              </p>
            ))}
          </div>
          {/* } */}
          {/* { selectedLocation.id &&   <SelectedCard selectedLocation={selectedLocation}  favorited={favorited} handleFavorites={handleFavorites}/> } */}
          <div className="flex flex-col gap-y-2">
            {filteredResults?.map((item) => (
              <InfoCard
                city={location}
                key={item.id}
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
                setViewport={setViewport}
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
            setViewport={setViewport}
            viewport={viewport}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch(
    "https://gist.githubusercontent.com/markbayley/a998d77811cfdd839bd4ce78250cc2c6/raw/0ff87e6952ccb68684d568084ab9e6fea564e603/marker.json"
  ).then((res) => res.json());

  return {
    props: {
      searchResults,
    },
  };
}
