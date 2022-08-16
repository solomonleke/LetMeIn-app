import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function ForgetPassword() {

    const [Email, setEmail] = useState("")
    const [Loading, setLoading] = useState(false)
    const [Success, setSuccess] = useState(false)
    const [ValidEmail, setValidEmail] = useState(true)
    const apiLink = useSelector((state) => state.apiLink);
    
    const payload = {

        method: "POST",

        headers: { 
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify({
            email: Email
        }),
        
    }
    const sendConfirmation = () => {
        

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)){
        
            setValidEmail(true)
        }else{
            
            return   setValidEmail(false)
     
        }
          
        setLoading(true)
        
        fetch(`${apiLink.link}/user/forgotPassword`, payload)

        .then(res => res.json())
        .then(json => {
         
          if(json.status == 200){
            setSuccess(true)
            setLoading(false)
           
        }else{
            alert(json.message)
            setLoading(false)
        }

       })
        .catch(error => {
          console.log("error", error);
      })

    }
    return (
        <MainLayout>
            <Seo title="Forget Password" description='LetMeIn reset password' />

            <Box mt="54px"> <Headers text="Reset Password" />  </Box>


            <Center>
                <Box w={["80%", "310px"]}>
                    {
                        Success == false ? (
                            <Stack mt="62px" spacing={"32px"}>
                                <Box>
                                <Input label='Email' isRequired type='email' value={Email} val={Email != "" ? true : false} onChange={(e) => setEmail(e.target.value)} />
                                <Text color="red" fontSize={"12px"} fontFamily="body" fontWeight={"400"} textAlign="center" mt="4px"> {ValidEmail == false && "You have entered an invalid email address"}</Text>
                                </Box>

                                <Button isLoading={Loading} disabled={Email != "" ? false : true} onClick={sendConfirmation}> Confirm</Button>

                            </Stack>
                        ) : (
                            <Text mt="20vh" fontSize={"14px"} textAlign="center" fontWeight="700" fontStyle={"italic"} fontFamily="body" color="#249421">
                                A reset link as been sent  to {Email}. Kindly go and visit the link sent to you to rest your password
                            </Text>
                        )
                    }



                </Box>

            </Center>


        </MainLayout>
    );
}
