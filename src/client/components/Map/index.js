import React, { useState } from "react";
import Map from "pigeon-maps";
import Marker from "./Marker";

import ShowModal from "../Modals/ShowModal";

const MAPTILER_ACCESS_TOKEN = 'oX566lZc76j7AJxQAjJt';
const MAP_ID = 'streets';



export default function MyMap({ markers, handleClickMarker  }) {
  console.log("markers", markers);
  const [details, setDetails] = useState("");
  const [showMarker, setShowMarker] = useState(false);
  

  const mapTilerProvider =  (x, y, z, dpr) => {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
  }
  
  
  const handleClickMap = latLng => {
    console.log("click on map: ", latLng);
  };

  const onOpenShowModal = () => {
    setShowMarker(true);
  };

  const onCloseShowModal = () => {
    setShowMarker(false);
  };

  return (
    <div className="map-container">
      <Map
        provider ={mapTilerProvider}
        dprs = {[1,2]}
        center={[-39.819588, -73.245209]}
        zoom={14}
        onClick={({ event, latLng, pixel }) => {
          handleClickMap(latLng);
        }}
      >
        {markers.map(e => (
          <Marker
            key={e.key}
            anchor={e.pos}
            payload={1}
            onClick={({ event, anchor, payload }) => {
              handleClickMarker(e.key);
            }}
          />
        ))}
      </Map>
      <ShowModal
        onClose={onCloseShowModal}
        size={"xs"}
        isOpen={showMarker}
        details={details}
      />
    </div>
  );
}
