import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";

import "mapbox-gl/dist/mapbox-gl.css";

function MapBox({ searchResults, selectedLocation, setSelectedLocation }) {
  const [showPopup, setShowPopup] = useState(false);

  //Get all the search coordinate points
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //Get the center of coordinate points
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  console.log(selectedLocation);

  return (
    <Map
      initialViewState={{
        ...viewport,
      }}
       style={{width: 800, height: '100vh'}}
      mapStyle="mapbox://styles/inblock/clx5v536g01iw01rb29t6ezfq"
      mapboxAccessToken={process.env.mapbox_key}
      className="z-10"
    >
      {/* <Marker longitude={-122.4} latitude={37.8} color="red" /> */}

      {searchResults?.map((result) => (
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
            <div className="z-50 absolute w-20 bg-red-400 rounded-full shadow-xl ml-4 -mt-2 text-white font-semibold px-2 py-1">
              {result.price}
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

          {/* {selectedLocation.long === result.long && (
            <Popup
           
              longitude={result.long}
              latitude={result.lat}
              anchor="bottom"
            
             onClose={() => setShowPopup(false)}
            >
              {result.price}
            </Popup>
          )} */}
        </div>
      ))}
    </Map>
  );
}

export default MapBox;
