import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

import Image from "next/image";
import React, { useState } from "react";

function SelectedCard({
  img,
  location,
  description,
  title,
  star,
  price,
  total,
  selectedLocation,
  setSelectedLocation,
  item,
  favorited,
  setFavorited,
  handleFavorites,
  city,
}) {
  // Handle both array and single image formats
  const imageToDisplay = Array.isArray(selectedLocation.img) 
    ? selectedLocation.img[0] 
    : selectedLocation.img;
    
  return (
    <div
      // onClick={() => setSelectedLocation(item)}
      className={
        "flex bg-red-400 rounded-md py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
      }
    >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          alt="image-info"
          src={imageToDisplay}
          fill
          sizes="(max-width: 768px) 160px, 320px"
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="font-semibold">
            <a className="bg-red-200 px-1 rounded">
              {selectedLocation.location || "town"}
            </a>
          </p>
          <button
            className="p-2 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shandow-lg"
            onClick={() => handleFavorites(selectedLocation)}
          >
            {favorited.includes(selectedLocation) ? (
              <HeartIcon className="h-7 cursor-pointer text-red-400" />
            ) : (
              <HeartIconInactive className="h-7 cursor-pointer text-red-400" />
            )}
          </button>
        </div>

        <h4 className="text-xl">{selectedLocation.title}</h4>

        <div className="flex border-b w-10 pt-2" />
        <p className={"pt-2 text-sm text-white flex-grow"}>
          {selectedLocation.description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className={"h-5 text-black"} />
            {selectedLocation.star}
          </p>

          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">
              {"$" + selectedLocation.price + " p/n"}
            </p>
            <p className="text-right font-extralight">
              {"$" + selectedLocation.total + " total"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedCard;
