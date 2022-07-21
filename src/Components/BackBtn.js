import { Box } from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

export default function BackBtn({onclick}) {
  return (
   <Box h="51.46px" w={"51.46px"} border="3px solid #9D9D9D" transition={"0.5s ease"} rounded={"100%"} _hover={{color: "#fff", bg:"#E02828", borderColor: "#E02828"}} mt="22px" cursor={"pointer"} fontSize="35px" display={"flex"} justifyContent="center"
    color={"#9D9D9D"} pt="6px" mb="32px" onClick={onclick}>
        <BsArrowLeft/>
   </Box>
  );
}
