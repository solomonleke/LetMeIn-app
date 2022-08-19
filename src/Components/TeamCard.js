import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function TeamCard({img,name,pos}) {
  return (
    <Box>
        <Flex justifyContent={"center"} pos="relative" top={"30px"}>
            <Image src={`/${img}.png`} w="130px" />
        </Flex>
        <Box boxShadow="0px 4px 4px rgba(46, 186, 159, 0.45)" bg="#fff" pt="50px">
            <Text textAlign={"center"}  textTransform="uppercase" py="6px" fontFamily="body" fontSize={"15px"} color="#ffffff" bg="#E02828">{name}</Text>
            <Text textAlign={"center"} textTransform="capitalize" py="10px" fontFamily="body" fontSize={"15px"} color="#086F5A">{pos}</Text>
        </Box>

    </Box>
  );
}
