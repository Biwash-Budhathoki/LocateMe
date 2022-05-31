import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const Geoloc = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      // eslint-disable-next-line
      //{console.log(status)};
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="GeolocationJS">
      <Button colorScheme='teal' size="md" onClick={getLocation}>Give Location</Button>
      <p>{status}</p>
      {console.log(lat,lng)}
    </div>
  )
};

export default Geoloc;