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
  import React, { useState } from "react";
  import { Box, Text } from "@chakra-ui/layout";

function LocationBySlider() {
    const [value, setValue] = React.useState(500);
    const handleChange = (value) => setValue(value);
    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    };
  
   
  
    return (
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
    );
  };
  
  export default LocationBySlider;
