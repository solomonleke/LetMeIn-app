import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function ReportCard({title, text, fontSize = "53px"}) {
  return (
    <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" w={["100%","100%","100%","auto"]}>
    <Flex justifyContent="space-between" >
        <Flex w="50%" ustifyContent={"center"} alignItems={"center"} borderRight="5px solid #21D1AF" p="5px">
        
        <Text textAlign="center"    fontFamily="body"  fontWeight={'400'} color="#424242" fontSize={"14px"} >{title} </Text>
        </Flex>
        <Flex w="50%" justifyContent={"center"} alignItems={"center"}  p="5px">
        
        <Text fontFamily="body" textAlign="center" fontWeight={'700'} color="#CBCBCB" fontSize={fontSize}>{text}</Text>
        </Flex>

        


    </Flex>
</Box>
  );
}
