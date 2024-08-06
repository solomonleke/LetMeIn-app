import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

export default function TemporaryPassHistoryCard({
    guestName,  gender, guestCreatedAt,
    residentName, residentPhone, residentAddress,
    securityName, securityMultiple,
}) {
  return (
    <Box bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
      <Text fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{guestName} | <Box as='span' fontSize="10px" >{gender} | {moment(guestCreatedAt).format("LLL")}</Box></Text>
      <Text mt="-5px" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Guest Details | <Box as='span' fontWeight={"700"}>Temporary Pass</Box> </Text>
      <hr/>
      <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{residentName} | <Box as='span' fontSize="10px" >{residentPhone} | {residentAddress}</Box> </Text>
      <Text mt="-5px" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Resident Details</Text>
      <hr/>
      <Text mt={"11px"} fontFamily={"body"} fontSize="15px" fontWeight={"400"} color="#000000">{securityName ? securityName: "Not CheckedIn"} | <Box as='span' fontSize="10px" color={"#1F73D5"} fontWeight={"700"}>Multiple    |   Multiple</Box> </Text>
      <Text mt="-5px" fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">Security Ops. Details</Text>
      
    </Box>
  );
}
