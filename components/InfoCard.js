import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconInactive } from "@heroicons/react/24/outline";
import {
  MdOutlinePets,
  MdFreeCancellation,
  MdPerson,
  MdFreeBreakfast,
} from "react-icons/md";
import { FaBed, FaBath, FaWifi } from "react-icons/fa";
import { BsPiggyBankFill } from "react-icons/bs";
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
  setSelectedCity,
  numberOfDays,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const imageVariations = [
    { objectPosition: "bottom right" },
    { objectPosition: "left", transform: "scaleX(-1)" },
    { objectPosition: "top left" },
    { objectPosition: "bottom", transform: "scaleX(-1)" },
  ];

  const fallbackImage = "/roomimages/bedroom1.jpg";
  const mainImageSrc = imageError || !item.img ? fallbackImage : item.img;

  return (
    <>
      <div
        onClick={() => {
          (setSelectedAddress(item), setSelectedCity(item.location));
          setViewport({
            longitude: item.long,
            latitude: item.lat,
            zoom: 15,
            transitionDuration: 300,
          });
        }}
        className={
          selectedAddress.id == item.id
            ? "relative rounded-md p-1 cursor-pointer hover:shadow-lg transition duration-200 ease-out"
            : "relative bg-gray-100 rounded-md p-1 border-b cursor-pointer hover:shadow-lg transition duration-200 ease-out"
        }
      >
        <div className="relative h-56 md:h-80 w-full flex-shrink-0">
          <Image
            alt="image-info"
            src={mainImageSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 750px, 750px"
            style={{
              objectFit: "cover",
              objectPosition:
                imageVariations[selectedImageIndex].objectPosition,
              transform: imageVariations[selectedImageIndex].transform,
            }}
            className="rounded-md"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-2 right-2 flex justify-between items-end pt-5 text-white">
            <p className="flex items-center">
              <StarIcon className={"h-5 text-white"} />
              {item.star}
            </p>
          </div>
        </div>

        {selectedAddress.id == item.id && (
          <div className="flex gap-x-1 py-2 text-white text-lg bg-gray-100 rounded-b w-full justify-between">
            {[...Array(4)].map((_, index) => {
              let objectPosition = "center";
              let transformStyle = "";

              switch (index) {
                case 0:
                  objectPosition = "bottom right";
                  break;
                case 1:
                  objectPosition = "left";
                  transformStyle = "scaleX(-1)"; // Flip horizontally
                  break;
                case 2:
                  objectPosition = "top left";
                  break;
                case 3:
                  objectPosition = "bottom";
                  transformStyle = "scaleX(-1)"; // Flip horizontally
                  break;
                default:
                  break;
              }

              return (
                <div
                  key={index}
                  className="relative flex-1 h-12 md:h-24 "
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    alt={`image-info-${index}`}
                    src={mainImageSrc}
                    fill
                    sizes="(max-width: 768px) 25vw, 100px"
                    className={
                      selectedImageIndex === index
                        ? `rounded cursor-pointer active:opacity-80 border-b-4 border-red-400 transition duration-150 `
                        : `rounded cursor-pointer hover:opacity-80 transition duration-150`
                    }
                    style={{
                      objectFit: "cover",
                      objectPosition: objectPosition,
                      transform: transformStyle,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col flex-grow ">
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col font-semibold bg-teal-500 absolute top-3 left-0 rounded-r pb-1">
              <span className=" text-white text-[15px] px-2 py-1  ">
                {numberOfDays
                  ? "$" + item.price * numberOfDays
                  : "$" + item.price}
              </span>
              <span className=" text-white text-[12px] px-2 -mt-3">
                {numberOfDays ? "/" + numberOfDays + " nights" : "/ night"}
              </span>
            </div>

            <div className="absolute top-70 left-0 text-gray-500 uppercase pl-1">
              <span>{item.location}</span>
            </div>

            <div>
              <button
                key={item.id}
                className="p-2 bg-white rounded-full shadow-lg absolute top-3 right-2"
                onClick={() => handleFavorites(item)}
              >
                {favorited.includes(item) ? (
                  <HeartIcon className="h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                ) : (
                  <HeartIconInactive className="h-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                )}
              </button>
            </div>
          </div>

          <h4 className="flex w-full flex-wrap justify-between text-md md:text-xl ">
            <span className="pt-1 ">{item.title}</span>
            <span className="flex items-center text-[16px] bg-red-400  px-2 h-8 font-semibold text-white rounded active:scale-95 hover:shadow-lg">
              Book Now
            </span>
          </h4>

          <p className="flex items-center text-sm text-gray-700 flex-grow overflow-hidden nowrap mt-3 ">
            {item.description.includes("1 guest") && (
              <>
                Guests <MdPerson className="mx-1 h-4 w-4" />
              </>
            )}
            {item.description.includes("2 guest") && (
              <>
                Guests <MdPerson className="h-4 w-4 mx-0" />
                <MdPerson className="h-4 w-4 mx-0" />
              </>
            )}
            {item.description.includes("3 guest") && (
              <>
                Guests <MdPerson className="h-4 w-4" />
                <MdPerson className="h-4 w-4" />
                <MdPerson className="h-4 w-4" />
              </>
            )}
            {item.description.includes("4 guest") && (
              <>
                Guests <MdPerson className="h-4 w-4" />
                <MdPerson className="h-4 w-4" />
                <MdPerson className="h-4 w-4" />
                <MdPerson className="h-4 w-4" />
              </>
            )}
            {item.description.includes("1 bed") && (
              <>
                | Beds <FaBed className="mx-1 h-4 w-4" />
              </>
            )}
            {item.description.includes("2 beds") && (
              <>
                | Beds <FaBed className="ml-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
              </>
            )}
            {item.description.includes("3 beds") && (
              <>
                | Beds <FaBed className=" h-4 w-4" />
                <FaBed className=" h-4 w-4 " />
                <FaBed className=" h-4 w-4 " />
              </>
            )}
            {item.description.includes("4 beds") && (
              <>
                | Beds <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
                <FaBed className="mx-1 h-4 w-4" />
              </>
            )}
            {item.description.includes("1 bath") && (
              <>
                | Baths <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("2 baths") && (
              <>
                | Baths <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("3 baths") && (
              <>
                | Baths <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("4 baths") && (
              <>
                | Baths <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
                <FaBath className="mx-1" />
              </>
            )}
            {item.description.includes("Wi-Fi") && (
              <>
                | Wi-Fi <FaWifi className="mx-1" />
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
                  | Pets <MdOutlinePets className="mx-1" />
                </>
              )}
            </span>
            <span className="hidden md:inline-flex items-center justify-end text-sm text-gray-700 flex-grow overflow-hidden nowrap">
              {item.freeCancelation === "yes" && (
                <>
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
