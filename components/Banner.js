import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
          <p className="text-sm sm:text-lg text-gray-900">Not sure where to go? Perfect.</p>
          <button className="rounded-full text-white shadow-md bg-red-400 px-10 py-4 font-bold my-4 hover:shadow-xl
               active:scale-90 transition duration-150">
            I'm flexible
          </button>
      </div>
    </div>
  );
}

export default Banner;
