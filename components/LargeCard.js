import Image from "next/image";
import React from "react";

function LargeCard({ img, description, title, buttonText }) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[200px]">
        <Image
         alt="image-large"
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>

      <div className="absolute top-32 left-12 ">
        <h3 className="text-4xl mb-3 w-64 text-black max-w-[200px]">{title}</h3>
        <p className="text-gray-500 ">{description}</p>

        <button className=" text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
}

export default LargeCard;
