import React from "react";
import Card from "react-bootstrap/Card";

export default function CityCard(props) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.mapPng} />
        <Card.Body>
          <Card.Title>{props.cityNameValue}</Card.Title>
          <Card.Text>
            {props.lat}
            <br></br>
            {props.lon}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
