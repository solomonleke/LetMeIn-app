import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Pagination() {
  return (
    <HStack justifyContent='right'>
    <Box color="#9D9D9D" ><AiOutlineLeft /></Box>
    <Text color="#000000" fontWeight={"700"} fontSize="10px">1 of 3</Text>
    <Box color="#9D9D9D" ><AiOutlineRight/></Box>
  </HStack>
  );
}
