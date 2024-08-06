import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'

function PartnershipStamp() {
  return (
    <Flex justifyContent={"flex-end"} position={"relative"} bottom={0} right={"0"} mt="64px">
    <HStack>
        <Text fontWeight={"300"} fontSize={"10px"} color={"#939393"}>
         <Box as='span' fontWeight={"800"}>....Letmein</Box> 
         in Partnership with</Text>

         <Image src='/greenBox.svg'/>
        
    </HStack>
     
    </Flex>
  )
}

export default PartnershipStamp
