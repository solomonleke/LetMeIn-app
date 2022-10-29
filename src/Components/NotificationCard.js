import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiFillCopy } from 'react-icons/ai';

export default function NotificationCard() {
    
    return (
        <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"} rounded='7px' px="13px" pb="30px" mt="50px">
            <Stack mt="18px" spacing={"14px"}>
                <HStack  pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Name </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> fkvubjkvrmsnksee</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Address </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> fkvubjkvrmsnksee</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Phone No </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> fkvubjkvrmsnksee</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">No of Guest </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> fkvubjkvrmsnksee</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Access Code </Text>

                    <HStack w="60%">
                    <Text fontSize={"14px"}  fontFamily="body" fontWeight={"700"} color="#000000"> Pending </Text>

                    <Box ><AiFillCopy/></Box>
                    </HStack>
                    
                </HStack>
            </Stack>

        </Box>
    );
}
