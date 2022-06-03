import { useState } from "react";

//import React, { useState } from "react";
//import { Button } from "@chakra-ui/react";
//import {View} from "react-native";

const Geoloc = () => {
  const [lat, setLat] = useState(null);
  //const [lng, setLng] = useState(null);
 // const [status, setStatus] = useState(null);

     navigator.geolocation.getCurrentPosition(
        (position) => {
          //setStatus("Successful");
          setLat(position.coords.latitude);
          //setLng(position.coords.longitude);
          console.log(position);
        }
      );
// eslint-disable-next-line
  /*return (
    <div className="GeolocationJS">
        {console.log("status")}
      {console.log(status)}
      {console.log(lat,lng)}
      lat,lng;
    </div>
  )*/

  return (lat);
  }

export default Geoloc;