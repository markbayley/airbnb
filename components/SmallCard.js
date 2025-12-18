import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function SmallCard({ data }) {
  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        city: data.city[0],
      },
    });
  };

  return (
    <div
      onClick={search}
      className="flex items-end w-72 mt-5 space-x-4 rounded-xl shadow-md p-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out active:scale-90"
    >
      <div className="relative h-28 w-28 ">
        <Image
          alt="image-small"
          src={data.imageUrl}
          fill
          sizes="(max-width: 768px) 112px, 112px"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      <div>
        <div className=" text-xs text-gray-500 absolute top-2 right-8">
          Top Rated
        </div>
        <CheckBadgeIcon
          className={"h-6 text-red-400 absolute top-1 right-2 pl-1"}
        />

        <h2 className="text-black">{data.city[0]}</h2>
        <h2 className="text-gray-500 pb-1">{data.city[1]}</h2>
      </div>
    </div>
  );
}

export default SmallCard;
