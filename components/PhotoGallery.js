import Image from "next/image";
import { Inter } from "next/font/google";
import jsonData from "../data/country.json";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { PiScalesBold } from "react-icons/pi";
import { BsMinecartLoaded } from "react-icons/bs";
import Filter from "@/components/Filter";
import TravelMap from "@/components/TravelMap";

import superagent from "superagent";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

function PhotoGallery({


}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [countryData, setCountryData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedCountries, setSearchedCountries] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedSorting, setSelectedSorting] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const filterButtons = ["Europe", "Americas", "Africa", "Asia", "Oceania"];
  const sortButtons = ["Population", "Rating", "Area", "Favorites"];
  const detailButtons = ["Food", "People", "Culture", "Nature", "Travel"];
  const [showDetail, setShowDetail] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountryDetail, setSelectedCountryDetail] = useState({});
  let [photos, setPhotos] = useState([]);
  let [query, setQuery] = useState("");

  const [viewport, setViewport] = useState({});

  const handleFilter = (item) => {
    setSelectedRegion(item);
  };

  const handleSorter = (item) => {
    setSelectedSorting(item);
  };

  const [favorited, setFavorited] = useState([]);
  console.log("favorited", favorited);

  const handleFavorites = (item) => {
    setFavorited((prevFilters) =>
      prevFilters.includes(item)
        ? prevFilters.filter((filter) => filter !== item)
        : [...prevFilters, item]
    );
  };

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    const mergedCountries = countryData.filter((country) =>
      country?.name.toLowerCase().includes(lowerCaseSearchValue)
    );

    const updatedCountries = mergedCountries.map((flag) => {
      const travelData = jsonData.find(
        (travel) => travel.country === flag.name
      );
      return {
        ...flag,
        travel: travelData ? travelData.image : null,
        status: travelData ? travelData.status : null,
      };
    });

    setSearchedCountries(updatedCountries);
  }, [countryData, searchValue]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v2/all`)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.status === 404) {
          setError("Error fetching countries");
        } else {
          setCountryData(response);
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, []);

  const clientID = "PvvWIfrMMfNqoEEuVve3X6KE1gksd31-C1Pn-SP3yL4";
  const numberOfPhotos = 9;
  const baseURL = `https://api.unsplash.com/photos/random/?count=${numberOfPhotos}&client_id=${clientID}`;

  const simpleGet = (options) => {
    superagent.get(options.url).then((res) => {
      if (options.onSuccess) options.onSuccess(res);
    });
  };

  useEffect(() => {
    if (selectedCountry && !loading) {
      setLoading(true);

      const photosUrl = `${baseURL}&query=${selectedCountry + " " + query}`;

      simpleGet({
        url: photosUrl,
        onSuccess: (res) => {
          setPhotos(res.body);
          setLoading(false);
        },
      });
    }
  }, [selectedCountry, query]);

  let filteredResults = searchedCountries;

  if (selectedRegion) {
    filteredResults = filteredResults.filter(
      (item) => item.region === selectedRegion
    );
  }

  if (selectedSorting && selectedSorting === "Population") {
    filteredResults = filteredResults
      .slice()
      .sort((b, a) => a.population - b.population);
  } else if (selectedSorting && selectedSorting === "Rating") {
    filteredResults = filteredResults.slice().sort((a, b) => a.gini - b.gini);
  } else if (selectedSorting && selectedSorting === "Area") {
    filteredResults = filteredResults.slice().sort((b, a) => a.area - b.area);
  } else if (selectedSorting && selectedSorting === "Favorites") {
    filteredResults = filteredResults.filter((item) =>
      favorited.includes(item)
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const clickHandler = (item) => {
    setShowDetail(true);
    setSelectedCountry(item.name);
    setSelectedCountryDetail(item);
  };

  return (
    <div
      className={`flex flex-col items-center border-red-500  ${inter.className}`}
    >
      <div className="border-red-500 ">
        <Filter
          filterButtons={filterButtons}
          sortButtons={sortButtons}
          handleFilter={handleFilter}
          activeFilters={activeFilters}
          selectedRegion={selectedRegion}
          selectedSorting={selectedSorting}
          handleSorter={handleSorter}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
          detailButtons={detailButtons}
          setQuery={setQuery}
          query={query}
          setShowMap={setShowMap}
          showMap={showMap}
          setMainImage={setMainImage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {showDetail ? (
          //IMAGE GALLERY
          <section className="border-red-500">
            <div className="flex flex-col md:flex-row gap-x-4   md:border-4">
              <div
                //key={i}
                //onClick={() => clickHandler(photos)}
                className="relative  flex-1 min-w-[300px] lg:min-w-[40vw]  flex-grow"
              >
                {showMap ? (
                  <TravelMap
                    searchedCountries={searchedCountries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountryDetail={selectedCountryDetail}
                    filteredResults={filteredResults}
                    showDetail={showDetail}
                    photos={photos}
                    viewport={viewport}
                    setViewport={setViewport}
                    selectedPhoto={selectedPhoto}
                  />
                ) : (
                  <>
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      // src={showDetail.travel}
                      src={mainImage ? mainImage : selectedCountryDetail.travel}
                      alt="large-photo"
                      className="rounded hover:opacity-90 shadow-xl"
                    />
                  </>
                )}

                <div className="absolute top-2 left-0 px-2 py-1 rounded-r text-white bg-amber-500 z-50">
                  {selectedCountry}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4  justify-center">
                {photos?.slice(0, 9).map((photo, i) => (
                  // {[...Array(9)].map((_, i) => (
                  <div className="relative active:scale-95 transition ease-out duration-150">
                    {/* <div className="absolute bottom-1 text-white text-xs z-50">
                        {photo.location.name}
                      </div> */}
                    <div
                      key={i}
                      //onClick={() => clickHandler(photo)}
                      onClick={() => {
                        setMainImage(photo.urls.regular),
                          setSelectedPhoto(photo.id);
                      }}
                      className="relative w-[95vw]  md:w-[12vw] aspect-square cursor-pointer "
                    >
                      {photo.urls.regular ? (
                        // { selectedCountryDetail.travel ?
                        <Image
                          fill
                          style={{ objectFit: "cover" }}
                          //src={"/italy.jpg"}
                          src={photo.urls.regular}
                          alt="small-photo"
                          className="rounded hover:opacity-90 shadow-xl"
                        />
                      ) : (
                        <div
                          role="status"
                          className="relative w-[95vw]  md:w-[12vw] aspect-square cursor-pointer border flex justify-center items-center"
                        >
                          <svg
                            aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-amber-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span class="sr-only">Loading...</span>
                        </div>
                      )}
                      {/* )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          //MAIN SEARCH
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16 justify-center">
              {filteredResults?.slice(0, 16).map((country, i) => (
                <div
                  key={i}
                  onClick={() => clickHandler(country)}
                  className="relative w-[95vw]  md:w-72 aspect-square  cursor-pointer active:scale-95 transition ease-out duration-150 "
                >
                  {country.travel && (
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      src={country?.travel}
                      alt={country?.name}
                      className="rounded hover:opacity-90 shadow-xl"
                    />
                  )}
                  <div className="absolute top-2 left-0 px-2 py-1 rounded-r text-white bg-amber-500">
                    {country?.name}
                  </div>

                  <div className="flex items-center absolute bottom-1 left-0 text-white text-xs">
                    {selectedSorting === "Rating" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-blue-500 ">
                        <PiScalesBold className="h-5 w-5" />{" "}
                        {country?.gini < 35
                          ? " Good"
                          : country?.gini < 50
                          ? " Avg"
                          : " Poor"}
                      </div>
                    ) : selectedSorting === "Area" ? (
                      <div className="flex flex-1 items-center gap-1 px-3 py-1 rounded-r text-white bg-teal-500">
                        <BsMinecartLoaded className="h-5 w-5" />{" "}
                        {country?.area < 1000000
                          ? " Low"
                          : country?.area < 5000000
                          ? " Med"
                          : " High"}
                      </div>
                    ) : selectedSorting === "Population" ? (
                      <div className="flex flex-grow items-center gap-1 px-3 py-1 rounded-r text-white bg-rose-500">
                        <HiUsers className="h-5 w-5" />{" "}
                        {(country?.population / 1000000).toFixed(0) + "m"}
                      </div>
                    ) : null}
                  </div>
                  <button
                    key={country?.cioc}
                    className="p-2 bg-white rounded-full shadow-lg absolute top-2 right-2"
                    onClick={() => handleFavorites(country)}
                  >
                    {favorited?.includes(country) ? (
                      <HiHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                    ) : (
                      <HiOutlineHeart className="h-5 w-5 cursor-pointer text-red-400 hover:scale-110 transition duration-200 ease-out active:scale-90" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default PhotoGallery;
