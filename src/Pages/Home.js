import { Box, Button, Center, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../Layouts/Index'
import Request from '../Utils/Request'
import Seo from '../Utils/Seo'

export default function Home() {
    // const getApi = async ()=>{
    //    const res = await new Request().get({url:"https://jsonplaceholder.typicode.com/posts"})
    //     console.log(res)
    // }

    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);
    const nav= useNavigate()
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
      } else if (onlineUser.user.userType == "Estate Manager") {
          nav("/estate-admin")
      } else {
          nav("/security-ops")
      }
      }else{
        nav("/")
      }
    }
    useEffect(() => {
      middleWare()
    }, []);
  return (
        <MainLayout>
            <Seo title='Home' description='HomePage'/>
        
            <Center mt="171px">
              <Stack spacing={'15px'} cursor="pointer">
                  <Button bg="#E02828" color={"#fff"} _hover={{bg: "#E02828"}}  _active={{bg: "#E02828"}} borderRadius="0" px="85px" py="8px" fontFamily={"body"} fontSize="16px" fontWeight={"700"} onClick={sign_up}>Sign Up</Button>
                  <Button bg="#E02828" color={"#fff"} _hover={{bg: "#E02828"}}  _active={{bg: "#E02828"}} borderRadius="0" px="85px" py="8px" fontFamily={"body"} fontSize="16px" fontWeight={"700"} onClick={sign_in}>Sign In</Button>
              </Stack>
            </Center>

            <Box bgImage="url(/bg-img.png)" bgSize={'cover'}
            bgRepeat={'repeat'}
            height="60vh" mt="121" display={["block", "none"]}>
            
            </Box>
        </MainLayout>
  )
}
