import React from 'react'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';


export default function EstateDisableCard({ estateAdmin, disable, estateAddress, phone, dateReg, onClick , approve}) 
{
  return (
    <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"}  rounded='7px' px="13px" pb="30px" mt="50px">
            <Stack mt="18px" spacing={"14px"}>
                <HStack pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Estate Admin </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {estateAdmin}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Estate Address </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {estateAddress}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Phone no. </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {phone}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                    <Text fontSize={"14px"} w="40%" fontFamily="body" fontWeight={"400"} color="#424242">Date of Reg </Text>

                    <Text fontSize={"14px"} w="60%" fontFamily="body" fontWeight={"700"} color="#000000"> {dateReg}</Text>
                </HStack>
                <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
                </HStack>
                
                <Flex justifyContent={"flex-end"} onClick={onClick}>
                    <div className={`toggle ${disable && "toggle-disable" }  `}>

                        <div className={`toggle-btn  ${disable ? "disable-off" : "on" } `}>

                        </div>

                    </div>
                </Flex>
                

            </Stack>

        </Box>
  )
}
