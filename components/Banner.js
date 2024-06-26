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
        style={{objectFit:"cover"}}
        className="brightness-75"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-2xl text-white brightness-150">
          Not sure where? Perfect.
        </p>
        <button
          onClick={() => router.push("/search")}
          className="rounded-full text-white shadow-xl bg-red-400 px-8 py-3 font-semibold my-4 hover:shadow-xl
               active:scale-90 transition duration-150 hover:scale-105"
        >
          Search Map
        </button>
      </div>
    </div>
  );
}

export default Banner;
