import { Box, Button, Center, Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
    const nav = useNavigate()

    const proceed = ()=>{
        nav("/sign-in")
    }
  return (
    <Box bgImage="url(/bg_img.png)" bgSize={'cover'}
    bgRepeat={'repeat'}
    height="100vh">

    <Center pt="30vh">
        <Box pos={"relative"} >
            <Img src="/full_logo.png" />
            <Text fontSize={"18.5px"} color="#fff" fontWeight="500" w={"80%"} letterSpacing="1px" fontFamily={"body"} pos={"absolute"} left={"56px"} top={"58px"}>Easy . Safe . Smart </Text>
          
        </Box>
    </Center>
    <Text textAlign={"center"} fontSize={"16.5px"} color="#fff" fontWeight="400" w={"100%"}  fontFamily={"body"} mt="32px">
            Welcome to LetMeIn an Easy, Safe, and smart Solution for you</Text>
    <Text textAlign={"center"} fontSize={"16.5px"} color="#fff" fontWeight="400" w={"100%"}  fontFamily={"body"} mt="12px">
           Your Email has been verified  successfully</Text>

        <Flex justifyContent={"center"}>
            <Button onClick={proceed} mt="32px">Proceed to Login</Button>
        </Flex>
</Box>
  );
}
