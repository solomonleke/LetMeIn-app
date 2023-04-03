import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function VerifyCard({title, value}) {
    return (
        <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" pb={"5px"} spacing={"20px"}>
            <Text textTransform={"capitalize"} fontSize={"14px"} w="25%" fontFamily="body" fontWeight={"400"} color="#424242">{title} </Text>

            <Text fontSize={"14px"} w="75%" fontFamily="body" fontWeight={"700"} color="#000000"> {value}</Text>
            
        </HStack>
    )
}
