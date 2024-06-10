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
        location: data.city[0],
      } 
    })
  }

  return (
    <div
      onClick={search}
      className="flex items-end mt-5 space-x-4 rounded-xl shadow-md p-2 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
    >
      <div className="relative h-28 w-28 ">
        <Image
          alt="image-small"
          src={data.imageUrl}
          layout="fill"
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

// import Image from "next/image";
// import { useRouter } from "next/router";

// const MyComponent = ({imageUrls}) => {

//   const router = useRouter();
//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {imageUrls.map((url, index) => (
//         <div className=" m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
//           {" "}

// <div className="flex items-end">
//           <div key={index} className="relative h-32 w-32 m-2">
//             <Image
//               onClick={() => router.push("/search")}
//               alt={`image-${index}`}
//               src={url}
//               layout="fill"
//               className="rounded-lg object-cover"
//             />
//           </div>
//           <div className="pb-2 px-3">
//             <h2 className="text-black">Rome</h2>
//             <h2 className="text-gray-500">4.5 km away</h2>
//           </div>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyComponent;
