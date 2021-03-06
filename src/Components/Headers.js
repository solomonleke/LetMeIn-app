import { Text } from '@chakra-ui/react';
import React from 'react';

export default function Headers({text}) {
  return (
    <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#000000" textAlign={"center"}>{text}</Text>
  );
}
