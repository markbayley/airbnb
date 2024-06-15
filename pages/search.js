import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import {
  ArrowLeftCircleIcon,
  ArrowUturnLeftIcon,
  FunnelIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import getCenter from "geolib/es/getCenter";
import React, { useState } from "react";
import SearchMap from "@/components/SearchMap";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

function Search({ searchResults }) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const router = useRouter();
  const { city, startDate, endDate, numberOfGuests, numberOfDays } = router?.query;


  const resetQueryParams = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        city: null,
        startDate: null,
        endDate: null,
        numberOfGuests: null,
        numberOfDays: null
      }
    }, undefined, { shallow: true });
  };

  const [selectedCity, setSelectedCity] = useState(city);

  const formattedStartDate =
    startDate && format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = [
    "Free Cancellation",
    "Pets Allowed",
    "Highly Rated",
    "Budget Friendly",
    "Breakfast",
    "Wi-Fi",
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

// Filter based on selectedAddress and selectedCity
if (selectedAddress && selectedAddress.id !== undefined) {
  // Filter out the selectedAddress from searchResults
  const filteredOutSelected = searchResults.filter(
    (item) => item.id === selectedAddress.id
  );

  // Filter other items based on location if needed
  const otherItems = searchResults.filter(
    (item) => item.location === selectedCity && item.id !== selectedAddress.id
  );

  // Concatenate filteredOutSelected and otherItems
  filteredResults = [...filteredOutSelected, ...otherItems];
} else if (selectedCity) {
  // Filter items based on location if selectedAddress is not defined
  filteredResults = searchResults.filter(
    (item) => item.location.toLowerCase() === selectedCity.toLowerCase()
  );
} else {
  // Default case: return all searchResults
  filteredResults = searchResults;
}

// Apply active filters
if (activeFilters.includes("Favorites")) {
  filteredResults = filteredResults.filter((item) => favorited.includes(item));
}

if (activeFilters.includes("Highly Rated")) {
  filteredResults = filteredResults.slice().sort((a, b) => b.star - a.star);
}

if (activeFilters.includes("Budget Friendly")) {
  filteredResults = filteredResults.slice().sort((a, b) => a.price - b.price);
}

if (activeFilters.includes("Pets Allowed")) {
  filteredResults = filteredResults.filter(
    (item) => item.petsAllowed === "yes"
  );
}

if (activeFilters.includes("Breakfast")) {
  filteredResults = filteredResults.filter((item) =>
    item.description.includes("Kitchen")
  );
}

if (activeFilters.includes("Wi-Fi")) {
  filteredResults = filteredResults.filter((item) =>
    item.description.includes("Wi-Fi")
  );
}

if (activeFilters.includes("Free Cancellation")) {
  filteredResults = filteredResults.filter(
    (item) => item.freeCancelation === "yes"
  );
}

// Filter based on number of guests
if (numberOfGuests !== undefined) {
  const guestsString = `${numberOfGuests} guests`;
  filteredResults = filteredResults.filter((item) =>
    item.description.includes(guestsString)
  );
}


  console.log(
    "selectedAddressID",
    selectedAddress.id,
    "location",
    selectedCity,
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
    <div className="flex flex-col h-screen">
      <Header
        placeholder={
          selectedCity ? `${selectedCity} | ${range} | ${numberOfGuests} guests` : ""
        }
        handleFilter={handleFilter} activeFilters={activeFilters}
      />
   <main className="flex flex-col lg:flex-row  flex-grow">
  <section className="flex-1 px-1 md:px-6 max-w-full lg:max-w-[750px]">
    <div className="flex w-full justify-between my-2">
      <div className="mt-2">
        <h1 className="text-xl md:text-3xl font-semibold pl-1 capitalize">
          {selectedCity ? selectedCity : "Explore The World"}{" "}
        </h1>
        <p className="text-xs pl-1">
          {filteredResults.length + " Stays | "}
          {startDate !== undefined ? 
            range + " | " + numberOfGuests + " guests "
          : "No dates or guest numbers "}
        </p>
      </div>

      <div className="flex">
        {selectedAddress.id || activeFilters.length > 0 ? (
          <div className="flex flex-col items-end">
            <button
              onClick={() => { setSelectedAddress({}); setActiveFilters([]); }}
              className="h-9 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
            >
              <FunnelIcon className="h-5 w-5 text-white" />
            </button>
            <span className="text-xs text-gray-500">Remove Filters</span>
            <p className="text-xs pl-1">
              {activeFilters.includes("Favorites") && <span className="text-red-400"> Favorites </span>}
              {selectedAddress.id && <span className="text-red-400">| Address </span>}
            </p>
          </div>
        ) : selectedCity ? (
          <div className="flex flex-col items-end">
            <button
              onClick={() => { setSelectedCity(null); resetQueryParams(); }}
              className="h-9 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
            >
              <ArrowUturnLeftIcon className="h-5 w-5 text-white" />
            </button>
            <span className="text-xs text-gray-500">Clear Search</span>
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <button
              onClick={() => router.push("/")}
              className="h-9 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
            >
              <HomeIcon className="h-5 w-5 text-white" />
            </button>
            <span className="text-xs text-gray-500">Return Home</span>
          </div>
        )}
      </div>
    </div>

    <div className="hidden lg:inline-flex text-xs md:text-[15px] mb-3 mt-1 space-x-1 text-gray-800 whitespace-nowrap">
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

    <div className="flex flex-col gap-y-2">
      {filteredResults?.map((item) => (
        <InfoCard
          key={item.id}
          selectedCity={selectedCity}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          item={item}
          favorited={favorited}
          setFavorited={setFavorited}
          handleFavorites={handleFavorites}
          setViewport={setViewport}
        />
      ))}
      {filteredResults.length === 0 && (
        <span className="flex border w-full h-96 justify-center items-center">
          Sorry, no stays available for {numberOfGuests} guests on selected dates in {selectedCity} with those filters.
        </span>
      )}
    </div>
  </section>

  <section className="flex-1 min-w-[300px] lg:min-w-[700px] mt-4 lg:mt-2  flex-grow">
    <SearchMap
      searchResults={searchResults}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
      filteredResults={filteredResults}
      selectedCity={selectedCity}
      setViewport={setViewport}
      viewport={viewport}
      setSelectedCity={setSelectedCity}
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
