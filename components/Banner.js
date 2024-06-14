import Image from "next/image";
import { useRouter } from "next/navigation";


function Banner({img}) {

  const router = useRouter()

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">

      <Image
       alt="image-banner"
        src="/banner.webp"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
          <p className="text-sm sm:text-3xl text-white font-semibold">Not sure where to go? Perfect.</p>
          <button onClick={() => router.push("/search")}  className="rounded-full text-white shadow-md bg-red-400 px-10 py-4 font-bold my-4 hover:shadow-xl
               active:scale-90 transition duration-150">
            Search Map
          </button>
      </div>
    </div>
  );
}

export default Banner;
