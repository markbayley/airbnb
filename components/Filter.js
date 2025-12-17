import React, { useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { HiOutlineSearch, HiUsers } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { PiScalesBold } from "react-icons/pi";
import { BsMinecartLoaded } from "react-icons/bs";
import { FaGlobeAfrica } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";

function Filter({
  filterButtons,
  sortButtons,
  handleFilter,
  activeFilters,
  selectedRegion,
  selectedSorting,
  handleSorter,
  setShowDetail,
  showDetail,
  detailButtons,
  setQuery,
  setShowMap,
  showMap,
  setMainImage,
  searchValue,
  setSearchValue,
  query,
}) {
  const [detailSearch, setDetailSearch] = useState("");

  const handleDetailSearch = (e) => {
    //e.preventDfault()
    setQuery(detailSearch);
  };

  console.log("detailSearch", detailSearch);

  return (
    <div className="flex  md:flex-row items-center justify-between flex-wrap w-full  my-4 text-xs md:text-sm  ">
      {showDetail || showMap ? (
        <>
          <div className="flex  justify-center items-center w-full md:w-auto">
            <input
              value={detailSearch}
              onChange={(e) => setDetailSearch(e.target.value)}
              type="text"
              className="text-sm rounded-l pl-3 w-full placeholder-red-400 text-teal-600 outline-none py-2 my-2 border-l-2 border-b-2 border-t-2 border-red-400"
              placeholder="Search Photos..."
            />
            <button
              value={detailSearch}
              onClick={handleDetailSearch}
              className="border-2 mr-2 border-red-400 border-l-0 bg-red-400 text-white rounded-r-full px-3 py-2"
            >
              <HiOutlineSearch className="h-5 w-5" />
            </button>
          </div>
          {/* Dropdown for medium screens and smaller */}
          <div className="block lg:hidden my-1 text-sm">
            <select
              onChange={(e) => setQuery(e.target.value)}
              className="cursor-pointer rounded-full border-2 border-teal-500 outline-none py-2 px-2 bg-teal-500 text-white hover:shadow-xl "
              value={query}
            >
              <option value="" disabled>
                Themes
              </option>
              {detailButtons.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden lg:flex gap-1 md:gap-2 my-1">
            {detailButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(item)}
                className={
                  query === item
                    ? "cursor-pointer rounded-full border py-2 px-4 bg-teal-500 text-white hover:shadow-xl active:scale-95 transition duration-200"
                    : "cursor-pointer rounded-full border-2 border-teal-500 text-teal-600 py-2 px-4 hover:shadow-xl active:scale-95 transition duration-200"
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-1 md:gap-3 my-1 mx-2 md:mx-0">
            <button
              onClick={() => {
                (setShowDetail(true), setShowMap(false));
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200"
              }
            >
              <RiGalleryView2
                className={`h-10 w-10 p-2  rounded-full border-2 border-amber-500 hover:shadow-xl ${
                  showMap === false
                    ? "bg-amber-500 text-white"
                    : " text-amber-500"
                }  `}
              />
            </button>

            <button
              onClick={() => {
                (setShowDetail(true), setShowMap(true));
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200"
              }
            >
              <FaGlobeAfrica
                className={`h-10 w-10 p-2  rounded-full border-2 border-teal-500 hover:shadow-xl ${
                  showMap === true ? "bg-teal-500 text-white" : " text-teal-500"
                }  `}
              />
            </button>

            <button
              onClick={() => {
                (setShowDetail(false), setShowMap(false), setMainImage(""));
              }}
              className={
                "cursor-pointer active:scale-95 transition duration-200 "
              }
            >
              <HiOutlineX
                className={`h-10 w-10 p-2  rounded-full border-2 border-red-400 text-red-400 hover:shadow-xl`}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex mx-2 md:mx-0 justify-center items-center w-full md:w-60">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              className="text-sm rounded-full pl-3 w-full placeholder-teal-600 outline-none py-2 my-2 border-2 border-teal-500"
              placeholder="Search Countries"
            />
          </div>

          {/* Dropdown for medium screens and smaller */}
          <div className="block lg:hidden my-1 mx-2 md:mx-0 text-sm">
            <select
              // onChange={(e) => setQuery(e.target.value)}
              onChange={(e) => handleFilter(e.target.value)}
              className="cursor-pointer rounded-full border outline-none py-2 px-2 bg-teal-500 text-white hover:shadow-xl "
              //value={item}
            >
              <option value="" disabled>
                Region
              </option>
              {filterButtons.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for larger screens */}
          <div className="hidden lg:flex gap-1 md:gap-2 my-1">
            {filterButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleFilter(item)}
                className={
                  selectedRegion === item
                    ? "cursor-pointer rounded-full border py-2 px-4 bg-teal-500 text-white hover:shadow-xl active:scale-95 transition duration-200"
                    : "cursor-pointer rounded-full border-2 border-teal-500 text-teal-600 py-2 px-4 hover:shadow-xl active:scale-95 transition duration-200"
                }
              >
                {item}
              </button>
            ))}
          </div>
          {/* 
          <div className="flex  gap-1 md:gap-3 mx-2 md:mx-0">
            {sortButtons.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSorter(item)}
                className={
                  "cursor-pointer active:scale-95 transition duration-200"
                }
              >
                {item === "Favorites" ? (
                  <HiHeart
                    className={`h-10 w-10 p-2  rounded-full border-2 border-rose-500 hover:shadow-xl ${
                      selectedSorting === "Favorites"
                        ? "bg-rose-500 text-white"
                        : " text-rose-500"
                    }`}
                  />
                ) : item === "Rating" ? (
                  <BsMinecartLoaded
                    className={`h-10 w-10 p-2  rounded-full border-2 border-teal-500 hover:shadow-xl ${
                      selectedSorting === "Rating"
                        ? "bg-teal-500 text-white"
                        : " text-teal-500"
                    }`}
                  />
                ) : item === "Population" ? (
                  <HiUsers
                    className={`h-10 w-10 p-2  rounded-full border-2 border-amber-500 hover:shadow-xl ${
                      selectedSorting === "Population"
                        ? "bg-amber-500 text-white"
                        : " text-amber-500"
                    }`}
                  />
                ) : (
                  <PiScalesBold
                    className={`h-10 w-10 p-2  rounded-full border-2 border-blue-500 hover:shadow-xl ${
                      selectedSorting === "Area"
                        ? "bg-blue-500 text-white"
                        : " text-blue-500"
                    }`}
                  />
                )}
              </button>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}

export default Filter;
