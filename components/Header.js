import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
  CalendarIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";

import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

function Header({ placeholder, handleFilter, activeFilters, favorited }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const numberOfDays = differenceInDays(endDate, startDate);

  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isSearchUpdated, setIsSearchUpdated] = useState(false);

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

    setIsSearchUpdated(true);
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
    setIsSearchUpdated(false);
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md px-3 md:px-5 lg:px-10 h-20 py-2">
      {isSearchBarOpen ? (
        // mobile search
        <div className="flex  mx-auto md:hidden my-1 hover:shadow-lg">
          <div className="flex items-center ring-2 ring-red-400 rounded-l-full w-24 py-2">
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value), setIsSearchUpdated(true);
              }}
              className="flex-grow bg-transparent outline-none text-gray-600 capitalize pl-4  text-sm"
              type="text"
              placeholder={placeholder || "Start your search"}
            />
          </div>

          <div  onClick={() => setIsDateRangePickerOpen(!isDateRangePickerOpen)} className="flex items-center justify-center py-2 px-4 bg-white  ring-2 ring-red-400">
            <button
       
            >
              <CalendarIcon
                className={
                  numberOfDays !== 0
                    ? "h-5 w-5 text-gray-500 hover:scale-125 transition duration-200 ease-out"
                    : "h-5 w-5 text-gray-400 hover:scale-125 transition duration-200 ease-out"
                }
              />
            </button>
          </div>

          <div className="flex items-center justify-center py-2 pl-3 bg-white  ring-2 ring-red-400">
            <UsersIcon className="h-5 w-5  text-gray-500 hover:scale-125 transition duration-200 ease-out" />
            <input
              value={numberOfGuests}
              onChange={(e) => {
                setNumberOfGuests(e.target.value), setIsSearchUpdated(true);
              }}
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

          <div onClick={() => setIsSearchBarOpen(false)}>
            <XMarkIcon className="h-6 p-1 shadow-lg bg-gray-400 text-white rounded-full ml-3" />
          </div>
        </div>
      ) : (
        <>
          {/* main menu */}
          <div
            onClick={() => router.push("/")}
            className="relative flex items-center h-8 cursor-pointer my-auto "
          >
            <Image
              alt="image-header"
              src="https://links.papareact.com/qd3"
              width='100'
              height='100'
              style={{objectFit:"contain"}}
              left
              className="active:scale-95 transition duration-150"
            />
          </div>

          <div>
            <div className="hidden md:flex items-center justify-center my-4 ">
              <div className="flex items-center ring-2 ring-red-400 rounded-l-full md:w-32 lg:w-auto px-3 py-2 hover:shadow-lg">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-grow bg-transparent outline-none text-gray-600 capitalize  text-sm"
                  type="text"
                  placeholder={placeholder || "Start your search"}
                />
              </div>

              <div    onClick={() =>
                    setIsDateRangePickerOpen(!isDateRangePickerOpen)
                  } className="flex items-center justify-center py-2 px-4 bg-white  ring-2 ring-red-400 hover:shadow-lg cursor-pointer">
                <button
               
                >
                  <CalendarIcon
                    className={
                      numberOfDays !== 0
                        ? "h-5 w-5 text-gray-500 hover:scale-125 transition duration-200 ease-out active:scale-90"
                        : "h-5 w-5 text-gray-400 hover:scale-125 transition duration-200 ease-out active:scale-90"
                    }
                  />
                </button>
              </div>

              <div className="flex items-center justify-center py-2 pl-3 bg-white  ring-2 ring-red-400 hover:shadow-lg">
                <UsersIcon className="h-5 w-5  text-gray-500 hover:scale-125 transition duration-200 ease-out" />
                <input
                  value={numberOfGuests}
                  onChange={(e) => {
                    setNumberOfGuests(e.target.value), setIsSearchUpdated(true);
                  }}
                  type="number"
                  min={1}
                  className="w-6 outline-none text-gray-500 text-sm "
                />
              </div>
              {/* desktop search icon */}
              <div
                className={
                  isSearchUpdated
                    ? "ring-2 ring-red-400 rounded-r-full bg-red-400 px-2 hover:shadow-lg "
                    : "ring-2 ring-red-400 rounded-r-full bg-red-400 px-2 hover:shadow-lg "
                }
              >
                <MagnifyingGlassIcon
                  onClick={search}
                  className={
                    isSearchUpdated
                      ? "h-9  text-white  p-2 cursor-pointer hover:scale-125 transition duration-200 ease-out active:scale-90 "
                      : "h-9  text-white  p-2 cursor-pointer hover:scale-125 transition duration-200 ease-out active:scale-90 "
                  }
                />
              </div>
            </div>
          </div>

          {/* mobile search icon */}
          <div className="flex items-center justify-end text-gray-500 space-x-4">
            <div className="flex md:hidden ring-2 ring-red-400 rounded-full bg-red-400  active:scale-90 transition duration-150">
              <MagnifyingGlassIcon
                onClick={() => setIsSearchBarOpen(true)}
                className="h-8  text-white  p-1 cursor-pointer hover:scale-125 transition duration-200 ease-out"
              />
            </div>

            <div
              key={"Favorites"}
              onClick={() => handleFilter("Favorites")}
              className={
                activeFilters && activeFilters?.includes("Favorites")
                  ? "p-1 ring-2 mx-3 ring-red-400 bg-white  rounded-full transition duration-200 ease-out shadow-lg active:scale-90 "
                  : "p-1 ring-2 mx-3 ring-red-400 bg-white  rounded-full transition duration-200 ease-out shadow-lg active:scale-90 "
              }
            >
              {activeFilters && activeFilters?.includes("Favorites") ? (
                <div className="relative">
                  <span className="absolute -right-2 flex justify-center -top-3 h-4 w-4 text-xs font-semibold text-white rounded-full bg-teal-500">
                    {favorited?.length || 0}
                  </span>{" "}
                  <HeartIcon className="h-6 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out hover:shadow-xl" />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute -right-2 flex justify-center -top-3 h-4 w-4 text-xs font-semibold text-white rounded-full bg-teal-500">
                    {favorited?.length || 0}
                  </span>{" "}
                  <HeartIconInactive className="h-6 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out hover:shadow-xl" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md active:scale-90 transition duration-150">
              <Bars3Icon className="h-6 cursor-pointer" />
              <UserCircleIcon className="h-6 cursor-pointer" />
            </div>
          </div>
        </>
      )}

      {isDateRangePickerOpen && (
        <div className="text-black flex flex-col col-span-3 mx-auto ">
          <DateRange
            //moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#e57373"]}
            onChange={handleSelect}
            //isClearable={true}
            className="pb-0"
          />

          <div className="bg-white rounded-b-md flex justify-end">
            {" "}
            <button
              onClick={() => setIsDateRangePickerOpen(false)}
              className={
                numberOfDays
                  ? "bg-teal-500 text-white h-auto rounded shadow-xl px-3 py-1 mr-3 mb-3"
                  : "bg-gray-500 text-white h-auto rounded-md shadow-xl px-3 py-1 mr-3 mb-3"
              }
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
