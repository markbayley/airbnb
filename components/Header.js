import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";

import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

function Header({ placeholder, handleFilter, activeFilters }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const numberOfDays = differenceInDays(endDate, startDate);

  const [isOpened, setIsOpened] = useState(false);

  console.log("numberOfDays", numberOfDays);
  const [numberOfGuests, setNumberOfGuests] = useState(2);

  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
    setIsOpened(false);
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        city: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
        numberOfDays,
      },
    });
    setIsOpened(false);
  };

  return (
    <header className="sticky top-0 z-50  grid grid-cols-3 bg-white shadow-md px-5 lg:px-10 h-20">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-8 cursor-pointer my-auto"
      >
        <Image
          alt="image-header"
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div
        onClick={() => setIsOpened(!isOpened)}
        className="flex items-center justify-end  lg:border-2 rounded-full my-3 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="hidden lg:inline-flex flex-grow pl-5 bg-transparent outline-none text-gray-600 capitalize"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <MagnifyingGlassIcon className=" h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer m-2" />

   
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
      {/* <p className="hidden md:inline">Favorites</p> */}
              <div
                key={"Favorites"}
                onClick={() => handleFilter("Favorites")}
                className={
                  activeFilters &&  activeFilters?.includes("Favorites")
                    ? "p-1 ring-2 mx-3 ring-red-400 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shadow-lg "
                    : "p-1 ring-2 mx-3 ring-red-400 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shadow-lg "
                }
              >
              
                {activeFilters && activeFilters?.includes("Favorites") ? (
                  <HeartIcon className="h-5 cursor-pointer text-red-400" />
                ) : (
                  <HeartIconInactive className=" h-5 cursor-pointer text-red-400" />
                )}
              </div>


        <p className="hidden md:inline">Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {isOpened && (
        <div className="text-black flex flex-col col-span-3 mx-auto ">
          <DateRange
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            
          />

          <div className="flex items-center border-b mb-4">
            <h2 className=" flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex w-full justify-between pb-4 ">
            <button
              onClick={resetInput}
              className="flex items-center justify-center bg-gray-400 rounded-full w-28 h-10 text-white"
            >
              Close
            </button>
            <button
              onClick={search}
              className="flex items-center justify-center bg-red-400 rounded-full w-28 h-10 text-white"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
