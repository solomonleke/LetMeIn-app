import { Box, Center, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import MainLayout from '../Layouts/Index';
import { MdEmail } from "react-icons/md";

export default function Verification() {
    const [NewUser, setNewUser] = useState("");

    const getEmail = () => {
       setNewUser( localStorage.getItem('newUserEmail'))
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
                    <Button mt={"32px"}>Resend Mail</Button>
            </Box>

        </Center>
    </MainLayout>
  );
}
