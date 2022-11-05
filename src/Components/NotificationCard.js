import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiFillCopy } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

export default function NotificationCard({codeName, number, accessCode, Show, Copied, deleteCard}) {

 
    return (
        <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"} rounded='7px' px="13px" pb="30px" mt="50px">
        <Flex onClick={deleteCard} color={"dark-grey"} fontSize="20px" mt="10px" justifyContent={"flex-end"}>
        <MdCancel/>
        </Flex>
            <Stack mt="18px" spacing={"14px"}>
               
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Code Name </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {codeName}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">No of Guest </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {number}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Access Code </Text>

                    <HStack w="60%">
                    <Text fontSize={"14px"}  fontFamily="body" fontWeight={"700"} color="#000000"> {accessCode} </Text>
                    <CopyToClipboard text={accessCode} >
                    <Box onClick={Copied} fontSize={"20px"} color=" rgba(13, 210, 163)"><AiFillCopy/></Box>
                    </CopyToClipboard>

                    {
                        Show && (

                            <Text>Copied!</Text>
                        )
                    }
                    </HStack>
                    
                </HStack>
            </Stack>

        </Box>
    );
}
