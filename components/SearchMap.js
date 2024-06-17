import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import axios from 'axios';

// const MAPBOX_TOKEN = "pk.eyJ1IjoiaW5ibG9jayIsImEiOiJjbHg4b3VoM3cxNDA4Mm1wem1wbDhlYmppIn0.YWSASiW3GzEdOTA8lXoEFw";

const SearchMap = ({ selectedAddress, setSelectedAddress, filteredResults, selectedCity, setViewport, viewport, setSelectedCity }) => {


  const mapRef = useRef();

  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return handleViewportChange({ ...newViewport, ...geocoderDefaultOverrides });
  }, []);

  // Function to update the viewport based on the search location
  useEffect(() => {
    if (selectedCity) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(selectedCity) + '.json', {
            params: {
              access_token: MAPBOX_TOKEN,
            },
          });
          const center = response.data.features[0].center;
          setViewport({
            ...viewport,
            latitude: center[1],
            longitude: center[0],
            zoom: 11,
          });
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      };
      fetchCoordinates();
    }
  }, [selectedCity]);

  return (
    <div className="sticky top-20 flex-grow h-[90vh] p-2 md:p-6 lg:pt-0 lg:pb-5 lg:pr-1 lg:pl-0">
    <MapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/inblock/clx5v536g01iw01rb29t6ezfq"
      className="bg-gray-300"
    >
      {filteredResults?.map((result) => (
        <div
          key={result.id}
          onClick={() => {
            selectedAddress.id === result.id ? setSelectedAddress({}) : setSelectedAddress(result);
            setSelectedCity(result.location);
            setViewport({
              longitude: result.long,
              latitude: result.lat,
              zoom: 15,
              transitionDuration: 500,
            });
          }}
        >
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div className="relative w-16 h-16">
              <div className="z-50 absolute w-12 flex justify-center items-center text-auto bg-red-400 rounded ml-6 -mt-2 text-white font-semibold">
                {"$" + result.price}
              </div>
              <Image
                alt="image-marker"
                src={result.img}
                layout="fill"
                objectFit="cover"
                className={
                  selectedAddress.id === result.id
                    ? "rounded-full border-4 border-red-400 hover:border-red-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out active:scale-90 tranition"
                    : "rounded-full border-4 border-white hover:border-white-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out  active:scale-90 tranition"
                }
              />
            </div>
          </Marker>
        </div>
      ))}

      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        position="top-right"
      />
    </MapGL>
  </div>
  );
};

export default SearchMap;
