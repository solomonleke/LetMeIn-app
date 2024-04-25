import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

export default function DelayEstateMsg() {
   
  return (
    <Box mt={["-200px","-200px","-120px","-100px","-80px"]} zIndex={"1"} opacity={"0.75"} w={["80%", "75%", "55%", "45%", "35%"]} bg="#fff" px="22px" py="17px" boxShadow={"1px 1px 18px rgba(0, 0, 0, 0.4)"} rounded="6px">
    <Text fontSize={"14px"} fontFamily="body" fontWeight={"600"} color="#424242">Just One Last Step...</Text>
    <Text mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">Your profile is going to be verified Soon. </Text>
    
    <Text  mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">
    If the verification process is taking too long, kindly contact <Box as="span" fontWeight={"700"}>Support Team</Box> - <Box as="span" fontWeight="700" color={"#1869E1"} textDecor="underline"> 08068840125</Box>
    </Text>
   
 
  </Box>
  );
}
