import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function CardList({firstName, lastName, gender, date, houseNo, streetName}) {
  return (
    <Box bg="#F1F1F1" boxShadow={"1px 2px 1px 1px rgba(0, 0, 0, 0.01)"} px="18px" py="8px">
      <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">Adebola Adeniran | Male | 08-May-22</Text>
      <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no 4, Ademola street </Text>
    </Box>
  );
}
