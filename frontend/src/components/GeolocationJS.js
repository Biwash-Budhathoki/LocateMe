import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const Geoloc = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const {user} = ChatState();
  console.log(status);

  // eslint-disable-next-line
  const getLocation = async () => {
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
        });
                try {
                    const config = {
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                      },
                    };
                    const { data } =  await axios.post(
                      "/api/user/location",
                      {
                        lng,lat
                      },
                      config
                    );
                    console.log(data);
                          }catch (error) {
                    console.log("errorrrr");
                  };
        
      
    }
    };

  return (
    <div className="GeolocationJS">
    <Button colorScheme='teal' size="md" onClick={getLocation}>Give Location</Button>
    </div>
)};

export default Geoloc;