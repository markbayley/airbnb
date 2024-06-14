import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";
import { differenceInDays } from 'date-fns'



function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const numberOfDays = differenceInDays( endDate, startDate);

  console.log("numberOfDays", numberOfDays)
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const router = useRouter()

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
    setSearchInput("")
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        city: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
        numberOfDays
      } 
    })
    
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md px-5 lg:px-10">
      <div onClick={() => router.push("/")} className="relative flex items-center h-8 cursor-pointer my-auto">
        <Image
         alt="image-header"
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className="flex items-center justify-end lg:border-2 rounded-full my-3 md:shadow-sm">
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
        <p className="hidden md:inline">Start hosting</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="text-black flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
          <input
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            type="number"
            min={1}
            className="w-12 pl-2 text-lg outline-none text-red-400"
          />
          </div>
         <div className="flex pb-2"><button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button><button onClick={search} className="flex-grow text-red-400">Search</button></div>
        </div>
      )}
    </header>
  );
}

export default Header;
