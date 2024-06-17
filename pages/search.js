import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import {
  ArrowUturnLeftIcon,
  FunnelIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchMap from "@/components/SearchMap";

function Search({ searchResults }) {
  const [selectedAddress, setSelectedAddress] = useState({});
  const router = useRouter();
  const { city, startDate, endDate, numberOfGuests, numberOfDays } =
    router?.query;

    const [selectedCity, setSelectedCity] = useState(city);

    console.log("city", city, router.query.city, selectedCity)

      // Update selectedCity whenever the city query parameter changes
  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  const resetQueryParams = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          city: null,
          startDate: null,
          endDate: null,
          numberOfGuests: null,
          numberOfDays: null,
        },
      },
      undefined,
      { shallow: true }
    );
  };

 

  const formattedStartDate =
    startDate && format(new Date(startDate), "dd MMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = ["Cancel Free", "Pets Ok", "Breakfast", "Wi-Fi"];

  const sortButtons = ["By Price", "By Rating", "Favorites"];

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
    filteredResults = filteredResults.filter((item) =>
      favorited.includes(item)
    );
  }

  if (activeFilters.includes("By Rating")) {
    filteredResults = filteredResults.slice().sort((a, b) => b.star - a.star);
  }

  if (activeFilters.includes("By Price")) {
    filteredResults = filteredResults.slice().sort((a, b) => a.price - b.price);
  }

  if (activeFilters.includes("Pets Ok")) {
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

  if (activeFilters.includes("Cancel Free")) {
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

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10,
    longitude: 0,
    zoom: 4,
  });

  // console.log(
  //   "selectedAddressID",
  //   selectedAddress.id,
  //   "location",
  //   selectedCity,
  //   "searchRsults",
  //   searchResults,
  //   "filteredResults",
  //   filteredResults,
  //   "viewport",
  //   viewport
  // );



  return (
    <div className="flex flex-col h-screen ">
      <Header
        favorited={favorited}
        placeholder={selectedCity ? selectedCity : ""}
        handleFilter={handleFilter}
        activeFilters={activeFilters}
      />
      <main className="flex flex-col lg:flex-row flex-grow flex-1 overflow-y-auto scrollbar-hide">
        <section
          className="flex-1 px-1 md:px-3 xl:px-6 max-w-full xl:max-w-[750px] lg:overflow-y-auto scrollbar-thin
       scrollbar-thumb-rounded-full scrollbar-thumb-red-400 scrollbar-track-white"
        >
          <div className="flex w-full justify-between mt-2">
            <div className="pl-1">
              <h1 className="text-2xl md:text-3xl font-semibold capitalize">
                {selectedCity ? selectedCity : "Explore The World"}{" "}
              </h1>
              <p className="text-xs">
                {filteredResults.length + " Stays | "}
                {numberOfDays ? range + " | " : "No dates selected"}
                {numberOfGuests ? numberOfGuests + " Guests " : " | Any guests"}
              </p>
            </div>

            <div className="flex">
              {activeFilters.length > 0 ? (
                <div className="flex flex-col items-end md:mt-1">
                  <button
                    onClick={() => {
                      setActiveFilters([]);
                    }}
                    className="h-8 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md active:scale-90 transition duration-150"
                  >
                    <FunnelIcon className="h-5 w-5 text-white hover:scale-125 transition duration-200 ease-out" />
                  </button>
                  <span className="text-xs text-gray-900">Remove Filters</span>
                </div>
              ) : selectedCity ? (
                <div className="flex flex-col items-end md:mt-1">
                  <button
                    onClick={() => {
                      setSelectedCity(null);
                      resetQueryParams();
                      setSelectedAddress({});
                      setViewport({
                        latitude: 10,
                        longitude: 0,
                        zoom: 1,
                        transitionDuration: 500,
                      });
                    }}
                    className="h-8 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md active:scale-90 transition duration-150"
                  >
                    <ArrowUturnLeftIcon className="h-5 w-5 text-white hover:scale-125 transition duration-200 ease-out" />
                  </button>
                  <span className="text-xs text-gray-900">Clear Search</span>
                </div>
              ) : (
                <div className="flex flex-col items-end md:mt-1">
                  <button
                    onClick={() => router.push("/")}
                    className="h-8 px-2 bg-red-400 hover:shadow-xl max-w-fit flex items-center cursor-pointer border rounded-md active:scale-90 transition duration-150"
                  >
                    <HomeIcon className="h-5 w-5 text-white hover:scale-125 transition duration-200 ease-out" />
                  </button>
                  <span className="text-xs text-gray-900">Return Home</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap py-2">
            <div className="flex justify-center md:justify-start w-full md:w-1/2 text-xs xl:text-[14px] space-x-1 my-1 text-gray-800 whitespace-nowrap pl-1">
              {filterButtons.map((item) => (
                <p
                  key={item}
                  onClick={() => handleFilter(item)}
                  className={
                    activeFilters.includes(item)
                      ? "py-1 px-2 rounded-full bg-red-400 text-white cursor-pointer hover:opacity-90 active:scale-90 transition duration-150"
                      : "py-1 px-2 rounded-full bg-gray-400 text-white cursor-pointer hover:opacity-90 active:scale-90 transition duration-150"
                  }
                >
                  {item}
                </p>
              ))}
            </div>

            <div className="flex justify-center md:justify-end flex-grow text-xs xl:text-[14px] space-x-1 my-1 text-gray-800 whitespace-nowrap pl-1">
              {sortButtons.map((item) => (
                <p
                  key={item}
                  onClick={() => handleFilter(item)}
                  className={
                    activeFilters.includes(item)
                      ? "py-1 px-2 rounded bg-red-400 text-white cursor-pointer hover:opacity-90 active:scale-90 transition duration-150"
                      : "py-1 px-2 rounded bg-gray-400 text-white cursor-pointer hover:opacity-90 active:scale-90 transition duration-150"
                  }
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2 ">
            {filteredResults?.map((item) => (
              <InfoCard
                key={item.id}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                item={item}
                favorited={favorited}
                setFavorited={setFavorited}
                handleFavorites={handleFavorites}
                setViewport={setViewport}
                numberOfDays={numberOfDays}
              />
            ))}
            {filteredResults.length === 0 && (
              <span className="flex border w-full h-96 justify-center items-center">
                Sorry, no stays available for {numberOfGuests} guests on
                selected dates in {selectedCity} with those filters.
              </span>
            )}
          </div>
        </section>

        <section className=" flex-1 min-w-[300px] lg:min-w-[400px] mt-6 lg:mt-2 flex-grow">
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

      {/* <Footer /> */}
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
