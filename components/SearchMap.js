import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Map, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaW5ibG9jayIsImEiOiJjbHg4b3VoM3cxNDA4Mm1wem1wbDhlYmppIn0.YWSASiW3GzEdOTA8lXoEFw";

const SearchMap = ({
  searchResults,
  selectedLocation,
  setSelectedLocation,
  filteredResults,
}) => {
  //Get all the search coordinate points
  const coordinates = filteredResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //Get the center of coordinate points
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center?.latitude || 37.7577,
    longitude: center?.longitude || -122.4376,
    zoom: 11,
  });

  //   const [viewport, setViewport] = useState({
  //     latitude: 37.7577,
  //     longitude: -122.4376,
  //     zoom: 8
  //   });
  const mapRef = React.useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),

    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  console.log(viewport, "newViewport");

  return (
    <div style={{ height: "70vh", width: "88vw" }} className="border-8 my-4">
      <MapGL
        initialViewState={{
          ...viewport,
        }}
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/inblock/clx5v536g01iw01rb29t6ezfq"
        //mapboxAccessToken={process.env.mapbox_key}
        className="  bg-gray-300"
      >
        {filteredResults?.map((result) => (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
              //onClick={() => setShowPopup(true)}
              onClick={() => setSelectedLocation(result)}
            >
              <div className="relative w-16 h-16">
                <div className="z-50 absolute w-10 text-auto bg-red-400 rounded-full shadow-xl ml-6 -mt-2 text-white font-semibold px-2 py-1">
                  {"$" + result.price}
                </div>
                <Image
                  alt="image-marker"
                  src={result.img}
                  layout="fill"
                  objectFit="cover"
                  className={
                    selectedLocation.long === result.long
                      ? " rounded-full border-4 border-red-400 hover:border-red-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out"
                      : " rounded-full border-4 border-white hover:border-red-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out"
                  }
                />
              </div>
            </Marker>
          </div>
        ))}

        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          //mapboxAccessToken={process.env.mapbox_key}
          position="top-left"
        />
      </MapGL>

      {/* <button onClick={mapRef.setInput('New York')._geocode('New York')}>New York</button> */}
    </div>
  );
};

export default SearchMap;
