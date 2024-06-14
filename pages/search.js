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
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

function Search({ searchResults }) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const router = useRouter();
  const { city, startDate, endDate, numberOfGuests, numberOfDays } = router?.query;

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
    "Free Breakfast",
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

if (activeFilters.includes("Free Breakfast")) {
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

console.log("Filtered Results:", filteredResults);

  const coordinates = filteredResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

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
    <div>
      <Header
        placeholder={
          selectedCity ? `${selectedCity} | ${range} | ${numberOfGuests} guests` : ""
        }
      />
      <main className="flex">
        <section className=" px-2  max-w-[750px] ">
          <div className="flex w-full justify-between mt-4">
            <h1 className="text-xl md:text-3xl font-semibold mb-2 pl-2 capitalize">
              {selectedCity ? selectedCity : "Explore Locations"}{" "}
              <p className="text-xs pl-1">
                {numberOfGuests != undefined
                  ? filteredResults.length +
                    " Stays | " +
                    range +
                    " | " +
                    numberOfGuests +
                    " guests "
                  : "No dates have been selected yet "}
                  {activeFilters.includes("Favorites") && <span className="text-red-400">| Favorites selected </span>}
                  {selectedAddress.id && <span className="text-red-400">| Address selected </span>}
              </p>
            </h1>

            <div className="flex">
              {" "}
              <div className="mx-4">
              <button
                key={"Favorites"}
                onClick={() => handleFilter("Favorites")}
                className={
                  activeFilters.includes("Favorites")
                    ? "p-2 ring-2 ring-red-400 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shadow-lg "
                    : "p-2 ring-2 ring-red-400 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shadow-lg "
                }
              >
              
                {activeFilters.includes("Favorites") ? (
                  <HeartIcon className="h-6 cursor-pointer text-red-400" />
                ) : (
                  <HeartIconInactive className=" h-6 cursor-pointer text-red-400" />
                )}
              </button>
              </div>
              {selectedAddress.id ? (
                <button
                  onClick={() => setSelectedAddress({})}
                  className="h-11 px-2  bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
                >
                  <ArrowUturnLeftIcon className="h-5 w-5 font-semibold text-white" />
                  <p className="py-2 px-1 text-white">Undo</p>
                </button>
              ) : (
                <button
                  onClick={() => router.push("/")}
                  className="h-10 px-2 ring-2 ring-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md"
                >
                  <ArrowLeftCircleIcon className="h-8 w-8 text-red-400" />
                  <p className="py-1 px-1 text-red-400">Back</p>
                </button>
              )}
            </div>
          </div>

          {/* { !selectedAddress.id && */}
          <div className="hidden lg:inline-flex text-xs md:text-[15px] mb-3 mt-3 space-x-1 text-gray-800 whitespace-nowrap">
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
          {/* { selectedAddress.id &&   <SelectedCard selectedAddress={selectedAddress}  favorited={favorited} handleFavorites={handleFavorites}/> } */}
          <div className="flex flex-col gap-y-2">
            {filteredResults?.map((item) => (
              <InfoCard
                selectedCity={selectedCity}
                key={item.id}
                img={item.img}
                title={item.title}
                star={item.star}
                price={item.price}
                description={item.description}
                total={item.total}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                item={item}
                favorited={favorited}
                setFavorited={setFavorited}
                handleFavorites={handleFavorites}
                setViewport={setViewport}
              />
            ))}
          </div>
        </section>

        <section className="hidden lg:flex min-w-[700px]">
          <SearchMap
            searchResults={searchResults}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            filteredResults={filteredResults}
           // Pass the searched location to the SearchMap component
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
