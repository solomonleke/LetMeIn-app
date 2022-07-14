import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function GreetingText({name}) {
  return (
    <Text fontStyle={"italic"} color={"#939393"} fontSize={"20px"} fontFamily="body" fontWeight>Hi, <Box as='span' fontStyle={"normal"} fontWeight={"700"}>{name}</Box></Text>
  );
}
