import { Box, Center, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import MainLayout from '../Layouts/Index';
import { MdEmail } from "react-icons/md";

export default function Verification() {
    const [NewUser, setNewUser] = useState("");
    const [Loading, setLoading] = useState(false);

    let newUser = localStorage.getItem('newUserEmail')
    const getEmail = () => {
        
        let arrUser = newUser.split("") 
        arrUser.shift()
        arrUser.pop()
        let length = arrUser.length
        arrUser[2] = "*"
        arrUser[3] = "*"
        arrUser[4] = "*"
        arrUser[5] = "*"
        arrUser[length-2] = "*"
        arrUser[length-3] = "*"
        arrUser[length-4] = "*"
        let latest=arrUser.join("")

       setNewUser( arrUser)
    }

    const payload = {

        method: "POST",

        headers: { 
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(newUser),
        
    }
    
    const Resend = ()=> {
        setLoading(true)
        fetch("https://api.solomonleke.com.ng/user/resend", payload)
        .then(res => res.json())
        .then(json => {
          console.log( "Resend API-CHECK" , json)
          setLoading(false)
       })
        .catch(error => {
          console.log("error", error);
          setLoading(false)
      })
    }


    useEffect(() => {
        getEmail()
    }, []);

  return (
    <MainLayout Seo title='Verification' description='Verification for user'>

        <Center mt={["100px","171px" ]} textAlign="center">
            <Box boxShadow={"2px 2px 10px 3px #E2E2E2 "} p="20px" rounded={"8px"} m={["10px", "0px"]}>
                <Center fontSize={"60px"} mb="20px" color="#E02828"><MdEmail/></Center>
                <Text fontSize={"20px"} fontFamily="body" fontWeight={"700"} >Verify your Email Address</Text>
                <Text fontSize={"16px"} fontFamily="body" fontWeight={"400"} mt="12px">Almost there! We've sent a verification email to {NewUser} <br/>
                    You need to verify you email address to log into LetMeIn App
                    
                </Text>
                    <Button isLoading={Loading} mt={"32px"} onClick={Resend}>Resend Mail</Button>
            </Box>

        </Center>
    </MainLayout>
  );
}
