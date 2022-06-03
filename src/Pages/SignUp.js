import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, CloseButton, Select, Stack, Text, } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Request from '../Utils/Request';
import Seo from '../Utils/Seo';

export default function SignUp() {
    const [view, setView] = useState(false);
    const [Loading, setLoading] = useState(false);

     const [Success, setSuccess] = useState(false);
    const [Match, setMatch] = useState(false);
    
    const nav = useNavigate()
   const [Payload, setPayload] = useState({
       prefix: "",
       userType: "",
       firstName: "",
       lastName: "",
       email: "",
       phone: "",
       address: "",
       password: "",
       re_enter_password: ""
   });

   const handleSignUp =(e)=>{
    
    setPayload({...Payload, [e.target.id]: e.target.value})
   }

    
    const proceed =()=>{
        
        console.log("type", Payload.userType);
        setView(true)
    }

    


    const payload = {

        method: "POST",

        headers: { 
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),
        
    }

    const Sign_up  = ()=> {
        setLoading(true)
        if(Payload.prefix !=="" && Payload.userType !=="" && Payload.firstName !=="" && Payload.lastName !=="" && Payload.email !=="" && Payload.phone !=="" && Payload.address !=="" && Payload.password !=="" && Payload.re_enter_password !==""){

            if(Payload.password == Payload.re_enter_password){

                fetch("https://api.solomonleke.com.ng/user/signup", payload)

                .then(res => res.json())
                .then(json => {
                  console.log( "API-CHECK" , json)
                  if(json.status == 200){
                    localStorage.setItem("newUserEmail", JSON.stringify(Payload.email) )
                    setLoading(false)
                    nav("/verification")
                }else{
                    alert(json.message)
                }
               })
                .catch(error => {
                  console.log("error", error);
              })

            }else{
                setMatch(true)
            }


        }else{
            setSuccess(true)
        }

      
    }





    useEffect(() => {
        // getApi()
        }, []);


  return (
    <MainLayout>
    <Seo title='Sign-up' description='Sign-up for LetMeIn'/>

    <Text fontFamily={"body"} fontSize="25px" fontWeight={"700"}  color="#575757" mt="32px" textAlign={"center"}>Sign Up</Text>
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

        {
            view == false ? (
                <Box>
                <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"}  color="#939393" mt="80px">Please who are you ?</Text>
    
                <Select onChange={handleSignUp} id="userType" rounded="0"  _focus={{ borderColor: "#E02828" }} fontFamily={"body"} fontSize="12px" fontWeight={"400"}   placeholder='I am a...................' bg={"#fff"} _hover={{bg: "#fff"}} w="250px" size={"lg"} mt="12px">
                <option value='Resident'>Resident</option>
                <option value='LandLord'>LandLord</option>
                <option value='Estate Manager'>Estate Manager</option>
                <option value='Security Operative'>Security Operative</option>
                </Select>
    
                <Button mt="65px" disabled={Payload.userType !=="" ? false: true} onClick={proceed}>Enter</Button>
            </Box>
            ):(
                <Box>
                <form onSubmit={Sign_up}>
                <Stack mt="44px" spacing="15px">
                
                    <Select isRequired  onChange={handleSignUp} id="prefix" color="#939393" rounded="0"  _focus={{ borderColor: "#E02828" }} fontFamily={"body"} fontSize="12px" fontWeight={"400"}   placeholder='Prefix' bg={"#fff"} _hover={{bg: "#fff"}} w="250px" size={"lg"} mt="12px">
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    </Select>
           
            
            
                    <Input val={Payload.firstName && true} isRequired label="FirstName" value={Payload.firstName}  id='firstName' type='text'  onChange={handleSignUp}/>
                    <Input val={Payload.lastName && true} isRequired label="LastName" value={Payload.lastName} id='lastName' type='text' onChange={handleSignUp} />
                    <Input val={Payload.email && true} isRequired label="Email" value={Payload.email}  id='email' type='email' onChange={handleSignUp}/>
                    <Input val={Payload.phone && true} isRequired label="Phone Number" value={Payload.phone} type="number"  id='phone' onChange={handleSignUp}/>
                    <Input val={Payload.address && true} isRequired label="Address No." value={Payload.address} type="text" id='address' onChange={handleSignUp}/>
                    <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp}/>
                    <Input val={Payload.re_enter_password && true} isRequired label="Re-enter Password" value={Payload.re_enter_password} type="password" id='re_enter_password' onChange={handleSignUp}/>
                    <Text color="red" fontSize={"12px"} pos="relative" top="-10px">{Match && "*password does not match*"}</Text>
                </Stack>

                <Button isLoading= {Loading} mb="32px" mt="65px" disabled={Payload.userType !=="" ? false: true} onClick={Sign_up }>Enter</Button>
                </form>
                </Box>
            )
        }
       
    </Center>
    
    </MainLayout>
  );
}
