import React, { Component, useState } from "react";
import CityForm from "./CityForm.js";
import CityCard from "./CityCard.js";

export default function Main() {
  const [cityName, setCityName] = useState("");
  const [cityMap, setCityMap] = useState();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  return (
    <>
      <h1>{cityName}</h1>
      <CityForm
        cityNameValue={cityName}
        updateCityName={setCityName}
        setCityMap={setCityMap}
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
      />

      <CityCard mapPng={cityMap} cityNameValue={cityName} lat={lat} lon={lon} />
    </>
  );
}
