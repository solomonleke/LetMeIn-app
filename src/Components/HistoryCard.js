import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function HistoryCard({title, text, fontSize = "53px"}) {
  return (
    <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" w={["100%","100%","100%","45%"]}>
    <Flex justifyContent="space-between" >
        <Flex w="50%" alignItems={"center"} borderRight="1px solid #B7B7B7" p="5px">
        
        <Text textAlign="left"    fontFamily="body" fontWeight={'400'} color="#424242" fontSize={"14px"} >{title} </Text>
        </Flex>
        <Flex w="50%" justifyContent={"center"} alignItems={"center"}  p="5px">
        
        <Text fontFamily="body" textAlign="center" fontWeight={'700'} color="#CBCBCB" fontSize={fontSize}>{text}</Text>
        </Flex>

        


    </Flex>
</Box>
  );
}
