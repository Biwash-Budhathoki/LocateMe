import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Box, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import ChatLoading from "../components/ChatLoading";
import UserListItem from "../components/userAvatar/UserListItem";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react';


const Geoloc = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingChat, setLoadingChat] = useState(false);
   const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast();
  const [value, setValue] = React.useState(500);
  const handleChange = (value) => setValue(value);
  const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    };
    console.log(value);

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };  

  // eslint-disable-next-line
  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      const time = Date.now()/1000;
      console.log(time,status);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);           
        });
                try {
                  setLoading(true);
                    const config = {
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                      },
                    };
                    const { data } =  await axios.post(
                      "/api/user/location",
                      {
                        lng,lat,time,value,
                      },
                      config
                    );
                    setLoading(false);
                    setSearchResult(data);
                    console.log(data);
                          }catch (error) {
                            toast({
                              title: "No Users Found Nearby",
                              description: "Please try again later !!!",
                              status: "error",
                              duration: 5000,
                              isClosable: true,
                              position: "bottom-left",
                            });
                  };
        
      
    }
    };
    //setTimeout(getLocation, 20000);
     

    
     return (
       <><Tooltip label="Find Nearby Users" hasArrow placement="bottom-end">
         <Button variant="ghost" onClick={onOpen}>
           <i className="fas fa-map-marker"></i>
           <Text d={{ base: "none", md: "flex" }} px={4}>
             Nearby Users
           </Text>
         </Button>
       </Tooltip>
       
       <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
           <DrawerOverlay />
           <DrawerContent>
             <DrawerHeader borderBottomWidth="1px">LOCATE USERS</DrawerHeader>
             <DrawerBody>
               <Box pt={6} pb={2}>
        <Box pb={2}>
        <Text>Enter distance in meter.</Text>
        <NumberInput defaultValue={value} min={1} max={25000} maxW='100px' mr='2rem' value={value} onChange={handleChange}>
            <NumberInputField/>

        </NumberInput>
        </Box>
        <Slider
          defaultValue={1000}
          min={30} 
          max={25000} 
          step={100}
          aria-label='slider-ex-6'
          value={value}
          onChange={handleChange}>
          <SliderMark
            value={value}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
            {...labelStyles}
          >
            {value}m
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
               <Box d="flex" pb={2} pt={4} >
                 <Button colorScheme='teal' size="md" onClick={getLocation}>Find New Friends</Button>
               </Box>
               {loading ? (
                 <ChatLoading />
               ) : (
                 searchResult?.map((user) => (
                   <UserListItem
                     key={user._id}
                     user={user}
                     handleFunction={() => accessChat(user._id)} />
                 ))
               )}
               {loadingChat && <Spinner ml="auto" d="flex" />}
             </DrawerBody>
           </DrawerContent>
         </Drawer></>
)};

export default Geoloc;