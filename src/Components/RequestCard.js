import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiFillCopy } from 'react-icons/ai';

export default function RequestCard({ name, address, phone, number, onClick , approve,codeName }) {

    return (
        <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"}  rounded='7px' px="13px" pb="30px" mt="50px">
            <Stack mt="18px" spacing={"14px"}>
                <HStack pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Name </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {name}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Address </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {address}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Resident Phone No </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {phone}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">No of Guest </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {number}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Code Name </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {codeName}</Text>
                </HStack>

                <Flex justifyContent={"flex-end"} onClick={onClick}>
                    <div className={`toggle ${approve && "toggle-on" }  `}>

                        <div className={`toggle-btn  ${approve ? "on" :"off" } `}>

                        </div>

                    </div>
                </Flex>

            </Stack>

        </Box>
    );
}
