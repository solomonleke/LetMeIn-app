import { Box, Center, Img, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndexHome() {
 const nav = useNavigate()

 useEffect(() => {
    setTimeout(() => {
        nav("/home")
    }, 5000);
 }, []);

    return (
        <Box bgImage="url(/bg_img.png)" bgSize={'cover'}
            bgRepeat={'repeat'}
            height="100vh">

            <Center pt="40vh">
                <Box pos={"relative"} >
                    <Img src="/full_logo.png" />
                    <Text fontSize={"18.5px"} color="#fff" fontWeight="500" w={"80%"} letterSpacing="1px" fontFamily={"body"} pos={"absolute"} left={"56px"} top={"58px"}>Easy . Safe . Smart </Text>
                </Box>
            </Center>
        </Box>
    );
}
