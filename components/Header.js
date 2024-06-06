import Image from "next/image";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md px-5 lg:px-10">
      <div className="relative flex items-center h-8 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className="flex items-center justify-end lg:border-2 rounded-full my-3 md:shadow-sm">
        <input
          className="hidden lg:inline-flex flex-grow pl-5 bg-transparent outline-none text-gray-600"
          type="text"
          placeholder="Search places..."
        />
        <MagnifyingGlassIcon className=" h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer m-2" />
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden md:inline">Start hosting</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;
