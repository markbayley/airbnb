import Image from "next/image";
import { useRouter } from "next/navigation";


function Banner({img}) {

  const router = useRouter()

  return (
    <div className="relative h-[400px] ">

      <Image
       alt="image-banner"
        src="/banner.webp"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />
      <div className="absolute top-1/2 w-full text-center">
          <p className="text-sm sm:text-3xl text-white brightness-150">Not sure where? Perfect.</p>
          <button onClick={() => router.push("/search")}  className="rounded-full text-white shadow-xl bg-red-400 px-10 py-4 font-bold my-4 hover:shadow-xl
               active:scale-90 transition duration-150">
            Search Map
          </button>
      </div>
    </div>
  );
}

export default Banner;
