import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function ProductCard({ icon, title, text }) {
  return (
      <Box bg="#fff"  boxShadow={"0px  8px 4px rgba(46, 186, 159, 0.45)"}  borderTopWidth={"3px"}   borderTopColor={"rgba(46, 186, 159, 0.45)"}  w={["100%","48%","48%","48%","23.9%"]} mt={["40px","32px","32px","32px","10px"]} >
        <Flex justifyContent={"center"} pt="15px" h="74px">
          <Image src={`/${icon}.svg`} w={"54px"} objectFit="contain" />
        </Flex>
        <Text textAlign={"center"} textTransform="capitalize" fontSize="20px" color={"#E02828"} fontWeight={"700"} pt="15px" fontFamily="body">{title}</Text>

        <Text textAlign={["center","center","left","left"]} px="17px" pt="17px" pb="42px" >
          {text} 
         
        </Text>
      </Box>
 

  );
}
