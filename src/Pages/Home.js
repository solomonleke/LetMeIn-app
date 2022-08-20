import { Box, Button, Center, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../Layouts/Index'
import Seo from '../Utils/Seo'

export default function Home() {
  
    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);

    const nav= useNavigate()
    const dispatch = useDispatch();

  

    
    const sign_up = ()=>{
      nav("/sign-up")
    }
    const sign_in = ()=>{
      nav("/sign-in")
    }

    const middleWare = ()=>{
      if(isLogged.isLogged == true){
        if (onlineUser.user.userType == "Resident") {

          nav("/resident")
      } else if (onlineUser.user.userType == "Landlord") {
          nav("/landlord")
      } else if (onlineUser.user.userType == "Estate manager") {
          nav("/estate-admin")
      }else if (onlineUser.user.userType == "Security operative") {
        nav("/security-ops")
    } else {
          nav("/sign-in")
      }
      }else{
        nav("/home")
      }
    }
    useEffect(() => {
      middleWare()
     
    }, []);

  return (
        <MainLayout>
            <Seo title='Home' description='HomePage'/>
        
            <Center mt="171px">
              <Stack spacing={'22px'} cursor="pointer"  w={["80%", "310px"]}>
              <Text fontFamily={"body"} fontSize="20px" fontWeight={"400"}>Don’t Have an account ?</Text>
                  <Button bg="#E02828" color={"#fff"} _hover={{bg: "#E02828"}}  _active={{bg: "#E02828"}} borderRadius="0" px="85px" py="8px" fontFamily={"body"} fontSize="16px" fontWeight={"700"} onClick={sign_up}>Register</Button>
                  <Button bg="rgba(224, 40, 40, 0.07)" border={"1px solid #E02828"} _hover={{bg: "rgba(224, 40, 40, 0.07)"}}  _active={{bg: "rgba(224, 40, 40, 0.07)"}} borderRadius="0" px="85px" py="8px" fontFamily={"body"} color="#E02828" fontSize="16px" fontWeight={"700"} onClick={sign_in}>Login</Button>
              </Stack>
            </Center>

            <Box bgImage="url(/bg-img.png)" bgSize={'cover'}
            bgRepeat={'repeat'}
            height="30vh" mt="121" display={["block", "none"]}>
            
            </Box>
        </MainLayout>
  )
}
