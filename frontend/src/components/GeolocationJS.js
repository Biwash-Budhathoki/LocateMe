import React, { useState } from "react";
//import { Button } from "@chakra-ui/react";
//import {View} from "react-native";

const Geoloc = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

     navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("Successful");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        }
      );

  return (
    <div className="GeolocationJS">
        {console.log("status")}
      {console.log(status)}
      {console.log(lat,lng)}
    </div>
  )
  }

export default Geoloc;