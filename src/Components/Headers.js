import { Text } from '@chakra-ui/react';
import React from 'react';

export default function Headers({text,mt}) {
  return (
    <Text mt={mt} textTransform={"capitalize"} fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#000000" textAlign={"center"}>{text}</Text>
  );
}
