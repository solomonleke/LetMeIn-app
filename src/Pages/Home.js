import { Box, Button, Center, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    const dispatch = useDispatch();
    const [TotalLen, setTotalLen] = useState("");



    const checkLength = ()=>{

        fetch('https://api.solomonleke.com.ng/user/endUser')
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
  
                setTotalLen(data.resident?.length + data.landlord?.length + data.security_OPs?.length)

                dispatch(
                  // collect two parameters (type and payload)
          
                  { type: "VERIFIED_COUNT", payload: { data:  data.resident?.length + data.landlord?.length + data.security_OPs?.length} }
                );
            }
          console.log("TotalLen", TotalLen)
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    }
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
      checkLength()
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
