import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";
import { MdOutlinePets } from "react-icons/md";
import { MdFreeCancellation } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsPiggyBankFill } from "react-icons/bs";
import { MdFreeBreakfast } from "react-icons/md";
import { FaWifi } from "react-icons/fa";

import Image from "next/image";
import React, { useState } from "react";

function InfoCard({
  selectedAddress,
  setSelectedAddress,
  item,
  favorited,
  handleFavorites,
  selectedCity,
  setViewport,
}) {
  return (
    <>
      <div
        onClick={() => {
          setSelectedAddress(item),
            setViewport({
              longitude: item.long,
              latitude: item.lat,
              zoom: 14,
              transitionDuration: 500,
            });
        }}
        className={
          selectedAddress.id == item.id
            ? "relative  rounded-md py-2 px-2  cursor-pointer  hover:shadow-lg transition duration-200 ease-out "
            : "relative bg-gray-100 rounded-md py-2 px-2  border-b cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t"
        }
      >
        <div className="relative h-56  md:h-80 w-full flex-shrink-0">
          <Image
            alt="image-info"
            src={item.img}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />

          <div className=" absolute bottom-2 right-2 flex justify-between items-end pt-5 text-white">
            <p className="flex items-center">
              <StarIcon
                className={
                  selectedAddress.id === item.id
                    ? "h-5 text-white"
                    : "h-5 text-red-400"
                }
              />
              {item.star}
            </p>
          </div>
        </div>

        {selectedAddress.id == item.id && (
  <div className="flex gap-x-1 py-2 text-white text-lg bg-gray-100 rounded-b w-full justify-between">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="relative flex-1 h-12 md:h-24 ">
        <Image
          alt={`image-info-${index}`}
          src={item.img}
          layout="fill"
          objectFit="cover"
          className="rounded cursor-pointer hover:opacity-80"
        />
      </div>
    ))}
  </div>
)}


        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">
              <a className="bg-teal-500 text-white px-1 rounded absolute top-3 left-2">
                {item.location}
              </a>
            </p>
            <div className="">
              <button
                key={item.id}
                className="p-2 bg-white  rounded-full shadow-lg absolute top-3 right-3"
                onClick={() => handleFavorites(item)}
              >
                {favorited.includes(item) ? (
                  <HeartIcon className="h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out" />
                ) : (
                  <HeartIconInactive className=" h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out" />
                )}
              </button>
            </div>
          </div>

          <h4 className="flex w-full flex-wrap justify-between text-md md:text-xl">
            <span className="pt-1">{item.title}</span>
            <span className="text-[18px]  font-semibold bg-red-400 rounded py-1 px-2 text-white">
              {"$" + item.price + "/n"}
            </span>
          </h4>

          {/* <div className="flex border-b w-10 pt-2" /> */}
          {/* {description} */}
          <p
            className={
              " flex items-center text-sm text-gray-700 flex-grow overflow-hidden nowrap mt-3"
            }
          >
            {item.description.includes("1 guest") && (
              <>
                {" "}
                Guests <MdPerson className="mx-1 h-4 w-4" />
              </>
            )}{" "}
            {item.description.includes("2 guests") && (
              <>
                Guests <MdPerson className=" h-4 w-4" />
                <MdPerson className=" h-5 w-4" />
              </>
            )}{" "}
            {item.description.includes("3 guests") && (
              <>
                Guests <MdPerson className=" h-4 w-4" />{" "}
                <MdPerson className=" h-4 w-4" />
                <MdPerson className=" h-5 w-4" />
              </>
            )}
            {item.description.includes("4 guests") && (
              <>
                Guests <MdPerson className=" h-4 w-4" />{" "}
                <MdPerson className=" h-4 w-4" />{" "}
                <MdPerson className=" h-4 w-4" />
                <MdPerson className=" h-5 w-4" />
              </>
            )}
            {item.description.includes("1 bed") && (
              <>
                | Beds <FaBed className="mx-1 h-4 w-4" />
              </>
            )}{" "}
            {item.description.includes("2 beds") && (
              <>
                | Beds
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-5 w-4" />
              </>
            )}
            {item.description.includes("3 beds") && (
              <>
                | Beds
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-5 w-4" />
              </>
            )}
            {item.description.includes("4 beds") && (
              <>
                | Beds
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-5 w-4" />
              </>
            )}
            {item.description.includes("1 bath") && (
              <>
                | Baths <FaBath className="mx-1 " />
              </>
            )}{" "}
            {item.description.includes("2 baths") && (
              <>
                | Baths
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("3 baths") && (
              <>
                | Baths
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("4 baths") && (
              <>
                | Baths
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {/* {item.star > 4  && (<> | Highly Rated <StarIcon className="mx-1 h-4 w-4"/></>)} */}
            {item.description.includes("Wi-Fi") && (
              <>
                | Wi-Fi <FaWifi className="mx-1 " />
              </>
            )}
            <span className="hidden md:inline-flex items-center">
              {item.description.includes("Kitchen") && (
                <>
                  | Breakfast <MdFreeBreakfast className="mx-1 h-4 w-4" />
                </>
              )}
              {item.petsAllowed === "yes" && (
                <>
                  {" "}
                  | Pets <MdOutlinePets className="mx-1" />
                </>
              )}
            </span>
            <span className="hidden md:inline-flex items-center justify-end text-sm text-gray-700 flex-grow overflow-hidden nowrap ">
            {item.freeCancelation === "yes" && (
                <>
                  {" "}
                 Cancel Free <MdFreeCancellation className="mx-1" />
                </>
              )}
              {item.price < 150 && (
                <>
                Budget Friendly <BsPiggyBankFill className="mx-1 h-4 w-4" />
                </>
              )}
            </span>
          </p>

          {selectedAddress.id == item.id && (
            <p className="pt-2 text-gray-600">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default InfoCard;
