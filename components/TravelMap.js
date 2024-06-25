import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import MapGL, { Marker, NavigationControl, ScaleControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import axios from "axios";

const TravelMap = ({
  selectedCountryDetail,
  selectedCountry,
  photos,
  viewport,
  setViewport,
  selectedPhoto
}) => {
  const mapRef = useRef();

  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  console.log("viewport", viewport);
  const[center, setCenter] = useState([])

  useEffect(() => {
    if (selectedCountry) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
              encodeURIComponent(selectedCountry) +
              ".json",
            {
              params: {
                access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
              },
            }
          );
          const center = response.data.features[0].center;
          setCenter(center)
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: center[1],
            longitude: center[0],
            zoom: 4.9,
          }));
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };
      fetchCoordinates();
    }
  }, [selectedCountry]);

  console.log("photos", photos)

  return (
    <div className="sticky top-20 flex-grow h-full z-10 ">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/inblock/clxn0epe700gd01poar3c1bmc"
        className="rounded-xl"
      >
        {" "}
        <div className="flex w-full justify-end p-2">
          {" "}
          <NavigationControl position={"top-right"} />
        </div>
        {photos &&
          photos.map((result, i) => (
            <div
              key={i}
              onClick={() => {
                setViewport((prevViewport) => ({
                  ...prevViewport,
                  longitude: result.location?.position?.longitude,
                  latitude: result.location?.position?.latitude,
                  zoom: 15,
                  transitionDuration: 500,
                }));
              }}
            >
              {result?.location?.position?.longitude  && (
                <Marker
                  longitude={result.location?.position?.longitude ? result.location?.position?.longitude : center[0]}
                  latitude={result.location?.position?.latitude ? result.location?.position?.latitude : center[1]}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <div className="z-50 relative w-16 h-16 ">
                    <div className="absolute w-12 flex justify-center items-center text-auto bg-red-400 rounded ml-6 -mt-2 text-white font-semibold"></div>
                    <Image
                      alt="image-marker"
                      src={result?.urls?.small}
                      fill
                      style={{ objectFit: "cover" }}
                      className={ result.id === selectedPhoto ?   "z-50 rounded-full border-4 border-rose-400 hover:border-white-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out  active:scale-90 tranition":
                        "z-50 rounded-full border-2 border-white hover:border-white-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out  active:scale-90 tranition"
                      }
                    />
                  </div>
                </Marker>
              )}
            </div>
          ))}
      </MapGL>
    </div>
  );
};

export default TravelMap;
