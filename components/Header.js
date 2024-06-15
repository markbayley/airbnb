import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
  CalendarIcon,
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

  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
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
    setIsDateRangePickerOpen(false);
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
    setIsDateRangePickerOpen(false);
  };

  console.log("NOD", numberOfDays)

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md px-5 lg:px-10 h-20 py-2">
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

      <div className="flex items-center justify-center my-4">
        <div className="flex items-center ring-2 ring-red-400 rounded-l-full  px-3 py-2">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow bg-transparent outline-none text-gray-600 capitalize  text-sm"
            type="text"
            placeholder={placeholder || "Start your search"}
          />
        </div>

        <div className="flex items-center justify-center py-2 px-4 bg-white  ring-2 ring-red-400">
          <button
            onClick={() => setIsDateRangePickerOpen(!isDateRangePickerOpen)}
          >
            <CalendarIcon className={ numberOfDays !== 0 ? "h-5 w-5 text-gray-500 hover:scale-125 transition duration-200 ease-out" : "h-5 w-5 text-gray-400 hover:scale-125 transition duration-200 ease-out" } />
          </button>
        </div>

        <div className="flex items-center justify-center py-2 pl-3 bg-white  ring-2 ring-red-400">
          <UsersIcon className="h-5 w-5  text-gray-500 hover:scale-125 transition duration-200 ease-out" />
          <input
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            type="number"
            min={1}
            className="w-6 outline-none text-gray-500 text-sm "
          />
        </div>

        <div className="ring-2 ring-red-400 rounded-r-full bg-red-400 px-2 ">
          <MagnifyingGlassIcon
            onClick={search}
            className="h-9  text-white  p-2 cursor-pointer hover:scale-125 transition duration-200 ease-out"
          />
        </div>
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <div
          key={"Favorites"}
          onClick={() => handleFilter("Favorites")}
          className={
            activeFilters && activeFilters?.includes("Favorites")
              ? "p-1 ring-2 mx-3 ring-red-400 bg-white  rounded-full transition duration-200 ease-out shadow-lg"
              : "p-1 ring-2 mx-3 ring-red-400 bg-white  rounded-full transition duration-200 ease-out shadow-lg"
          }
        >
          {activeFilters && activeFilters?.includes("Favorites") ? (
            <HeartIcon className="h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out" />
          ) : (
            <HeartIconInactive className="h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out" />
          )}
        </div>
        <p className="hidden md:inline">Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {isDateRangePickerOpen && (
        <div className="text-black flex flex-col col-span-3 mx-auto ">
          <DateRange
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
