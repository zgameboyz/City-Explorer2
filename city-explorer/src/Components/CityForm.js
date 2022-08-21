import React, { useRef, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const locationIQKey = process.env.REACT_APP_LIQKEY;
const axios = require("axios");
const api = axios.create({
  baseURL: `http://localhost:3000/`,
});

export default function CityForm(props) {
  const [currentSelectedCity, setCurrentSelectedCity] = useState("");
  const [currentSubmittedCity, setSubmittedCity] = useState();
  const [conditionalButtonText, setButtonText] = useState("Yeah Let's Go!");
  const [locationIQGetDataFirstResponse, setLocationIQGetDataFirstResponse] =
    useState();
  const [error, setError] = useState();
  const isMounted = useRef(false);

  //Handle Click on form submit to update the current selected and the currently submitted city.
  const handleClick = (e) => {
    //prevents form from reloading page on submit
    e.preventDefault();

    //Updating the passed update function for CityName from Main.js
    props.updateCityName(currentSelectedCity);
    setSubmittedCity(props.cityNameValue);
    setButtonText("Let's Go Somewhere Else");
    getLocationData();
  };

  const getLocationData = async () => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${locationIQKey}&q=${currentSelectedCity}&format=json`
      );

      if (response != null) {
        setLocationIQGetDataFirstResponse(response.data[0]);
        props.setLat(response.data[0].lat);
        props.setLon(response.data[0].lon);
        console.log(response);
      } else {
        setError(":( Something went wrong with the response from LocationIQ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isMounted.current) {
      const mapData = `https://maps.locationiq.com/v3/staticmap?key=${locationIQKey}&center=${props.lat},${props.lon}&zoom=8&size=300x300&format=jpg`;

      props.setCityMap(mapData);
    } else {
      isMounted.current = true;
    }
  }, [locationIQGetDataFirstResponse]);

  //Just a function to reference for  the button onClick
  function changeCurrentSelectedCity(e) {
    setCurrentSelectedCity(e.target.value);
  }

  return (
    <>
      <Form>
        <div>
          {currentSubmittedCity != null ? (
            <p>You Chose to Visit {currentSelectedCity}!</p>
          ) : (
            <p>You Want to Visit {currentSelectedCity}?</p>
          )}
        </div>

        <Form.Group className="mb-3" controlId="cityForm">
          <Form.Label>Enter a city name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a City"
            value={currentSelectedCity}
            onChange={changeCurrentSelectedCity}
          />
        </Form.Group>

        <Button onClick={handleClick} variant="primary" type="submit">
          {conditionalButtonText}
        </Button>
      </Form>
    </>
  );
}
