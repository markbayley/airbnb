import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function MediumCard({ data }) {
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
      className="cursor-pointer hover:bg-gray-100 hover:scale-95 transition transform duration-200 ease-out"
    >
      <div className="relative h-80 w-80">
        <Image
          alt="image-medium"
          src={data.imageUrl}
          fill
          sizes="320px"
          style={{ objectFit: "cover" }}
          className="rounded-xl"
        />
      </div>

      <div>
        <h2 className="text-2xl text-black mt-1">{data.city[0]}</h2>
      </div>
    </div>
  );
}

export default MediumCard;
