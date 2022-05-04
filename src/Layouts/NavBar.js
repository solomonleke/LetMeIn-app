import { Box, Image, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineAlignRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const nav= useNavigate()
  const home = () => {
nav("/")
  }
  return (
    <Box mx={["6%","10%"]} mt='32px'>

    <Stack direction="row" cursor={"pointer"}>
    <Image src='/logo.png' onClick={home}/>
    <Spacer/>

   <Box fontSize={"30px"} pos="relative" top={"10px"}> <AiOutlineAlignRight/></Box>
    </Stack>


    </Box>
  )
}
