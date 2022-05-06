import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, CloseButton, Select, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function SignIn() {
  
    const [Success, setSuccess] = useState(false);
    const [view, setView] = useState(false);
    const [Match, setMatch] = useState(false);
    
    const nav = useNavigate()
   const [Payload, setPayload] = useState({
      
       email: "",
       password: "",
      
   });

   const handleSignUp =(e)=>{
    setPayload({...Payload, [e.target.id]: e.target.value})
   }

    
  
    const Sign_in =()=>{
        
       if(Payload.email !=="" &&  Payload.password !=="" ){
        nav("/resident")
    }else{
        
        setSuccess(true)
    }

        
    }
  return (
    <MainLayout>
    <Seo title='Sign-in' description='Sign-in for LetMeIn'/>

    <Text fontFamily={"body"} fontSize="25px" fontWeight={"700"}  color="#575757" mt="32px" textAlign={"center"}>Sign In</Text>
    {
        Success && (
            <Center>
            <Alert status='error' mt="15px" mx={["10%","40%"]} color="#00000" >
            <AlertIcon />
            <AlertTitle mr={2}>Please fill in required fields!</AlertTitle>
            <CloseButton onClick={() => setSuccess(false)} position='absolute' right='8px' top='8px' />
            </Alert>
        </Center>
        )
    }
   
    
    <Center>


                <Box>
                
               
                <Stack mt="44px" spacing="15px">
                
                    <Input val={Payload.email && true} isRequired label="Email" value={Payload.email}  id='email' type='email' onChange={handleSignUp}/>
                    <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp}/>
                  
                </Stack>

                <Button mb="32px" mt="65px" disabled={Payload.userType !=="" ? false: true} onClick={Sign_in}>Enter</Button>
              
                </Box>
        
       
    </Center>
    
    </MainLayout>
  );
}
