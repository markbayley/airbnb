import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";

import Image from "next/image";
import React, { useState } from "react";

function InfoCard({
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
  setViewport
}) {
  return (
    <>
      <div
        onClick={() => { setSelectedLocation(item), setViewport({ longitude: item.long,  latitude: item.lat, zoom: 14})}}
        className={
          selectedLocation.id == item.id
            ? "relative bg-gray-100 rounded-md py-2 px-2 border-b cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t"
            : "relative bg-gray-100 rounded-md py-2 px-2  border-b cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t"
        }
      >
        <div className="relative h-56 w-full md:h-80 md:w-full flex-shrink-0">
          <Image
            alt="image-info"
            src={img}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />

          <div className=" absolute bottom-2 right-2 flex justify-between items-end pt-5 text-white">
            <p className="flex items-center">
              <StarIcon
                className={
                  selectedLocation.id === item.id
                    ? "h-5 text-white"
                    : "h-5 text-red-400"
                }
              />
              {star}
            </p>
          </div>
        </div>

        {selectedLocation.id == item.id && (
        <div className="flex gap-x-1 py-2 text-white text-lg bg-gray-100 rounded-b w-full justify-between">
          <div className="relative h-12 w-20 md:h-24 md:w-40 flex-shrink-0 ">
            <Image
              alt="image-info"
              src={img}
              layout="fill"
              objectFit="cover"
              className="rounded cursor-pointer hover:opacity-80"
            />
          </div>
          <div className="relative h-12 w-20 md:h-24 md:w-40 flex-shrink-0">
            <Image
              alt="image-info"
              src={img}
              layout="fill"
              objectFit="cover"
              className="rounded cursor-pointer hover:opacity-80"
            />
          </div>
          <div className="relative h-12 w-20 md:h-24 md:w-40 flex-shrink-0">
            <Image
              alt="image-info"
              src={img}
              layout="fill"
              objectFit="cover"
              className="rounded cursor-pointer hover:opacity-80"
            />
          </div>
          <div className="relative h-12 w-20 md:h-24 md:w-40 flex-shrink-0">
            <Image
              alt="image-info"
              src={img}
              layout="fill"
              objectFit="cover"
              className="rounded cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      )}

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between">
            <p className="font-semibold">
              <a className="bg-teal-500 text-white px-1 rounded absolute top-3 left-2">
                {location || "town"}
              </a>
            </p>
            <div className="">
              <button
                key={item}
                className="p-2 bg-white hover:bg-red-500 rounded-full transition duration-200 ease-out shandow-lg absolute top-3 right-3"
                onClick={() => handleFavorites(item)}
              >
                {favorited.includes(item) ? (
                  <HeartIcon className="h-7 cursor-pointer text-red-400" />
                ) : (
                  <HeartIconInactive className=" h-7 cursor-pointer text-red-400" />
                )}
              </button>
            </div>
          </div>

          <h4 className="flex w-full flex-wrap justify-between text-md md:text-xl ">
            <span>{title}</span>
            <span className="font-semibold">{"$" + price + " p/n"}</span>
          </h4>

          {/* <div className="flex border-b w-10 pt-2" /> */}
          <p
            className={
              selectedLocation.id === item.id
                ? " text-sm text-gray-500 flex-grow"
                : "text-sm text-gray-500 flex-grow"
            }
          >
            {description}
          </p>
        </div>
      </div>

     
    </>
  );
}

export default InfoCard;
