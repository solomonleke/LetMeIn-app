import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Preloader() {
    return (
        <Box pt="35vh" bg="#FBFBFB" w="100%" zIndex={10} h="100vh" pos={"fixed"} top="0">

            <Flex justifyContent={"center"}>
                <Image src="/preloader.gif" w="300px" />
            </Flex>

        </Box>


    );
}
