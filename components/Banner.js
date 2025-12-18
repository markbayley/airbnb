import Image from "next/image";
import { useRouter } from "next/navigation";

function Banner({ img }) {
  const router = useRouter();

  return (
    <div className="relative h-[400px] ">
      <Image
        alt="image-banner"
        src="/banner.webp"
        fill
        priority
        style={{ objectFit: "cover" }}
        className="brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full text-center">
        <h2 className="text-2xl sm:text-4xl text-white brightness-150 bg-black/30 px-4 py-2 rounded-lg font-semibold">
          Not sure where to go? Perfect!
        </h2>
        <button
          onClick={() => router.push("/search")}
          className="rounded-full text-white shadow-xl bg-red-400 hover:bg-red-500 px-10 py-4 font-bold my-6 hover:shadow-xl
               active:scale-90 transition duration-150 hover:scale-105 uppercase"
        >
          Search Map
        </button>
      </div>
    </div>
  );
}

export default Banner;
