import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, CloseButton, Flex, HStack, Select, Spacer, Stack, Text, } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import ProgressBar from '../Components/ProgressBar';
import MainLayout from '../Layouts/Index';
import Request from '../Utils/Request';
import Seo from '../Utils/Seo';

export default function SignUp() {
    const [view, setView] = useState(false);
    const [view2, setView2] = useState(false);
    const [Loading, setLoading] = useState(false);

     const [Success, setSuccess] = useState(false);
    const [Match, setMatch] = useState(false);
    const [ValidEmail, setValidEmail] = useState(true);
    
    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);
    const nav = useNavigate()
   const [Payload, setPayload] = useState({
       prefix: "",
       userType: "",
       estateName: "",
       firstName: "",
       lastName: "",
       email: "",
       phone: "",
       streetName: "",
       houseNo: "",
       password: "",
       re_enter_password: ""
   });

   const handleSignUp =(e)=>{
    
    setPayload({...Payload, [e.target.id]: e.target.value})
   }

    
    const proceed =()=>{
        
        setView(true)
    }
    
    const proceed2 =()=>{
        
       if(Payload.email !==""){

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Payload.email)){
            setValidEmail(true)
        }else{
            return setValidEmail(false)
        }
       }

      


        setView2(true)
    }
    


    const payload = {

        method: "POST",

        headers: { 
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),
        
    }

    const Sign_up  = ()=> {
      
        if(Payload.prefix !=="" && Payload.userType !=="" && Payload.estateName !=="" && Payload.firstName !=="" && Payload.lastName !=="" && Payload.email !==""
         && Payload.phone !=="" && Payload.streetName !=="" && Payload.houseNo !=="" && Payload.password !=="" && Payload.re_enter_password !==""){

            if(Payload.password == Payload.re_enter_password){
                setLoading(true)

                fetch("https://api.solomonleke.com.ng/user/signup", payload)

                .then(res => res.json())
                .then(json => {
                  console.log( "API-CHECK" , json)
                  if(json.status == 200){
                    localStorage.setItem("newUserEmail", Payload.email )
                    setLoading(false)
                    nav("/verification")
                }else{
                    alert(json.message)
                    setLoading(false)
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

    const Sign_up_Security  = ()=> {
      
        if(Payload.prefix !=="" && Payload.userType !=="" && Payload.estateName !=="" && Payload.firstName !=="" && Payload.lastName !=="" 
         && Payload.phone !=="" && Payload.password !=="" && Payload.re_enter_password !==""){

            if(Payload.password == Payload.re_enter_password){
                setLoading(true)

                fetch("https://api.solomonleke.com.ng/user/signup", payload)

                .then(res => res.json())
                .then(json => {
                  console.log( "API-CHECK" , json)
                  if(json.status == 200){
                   
                    setLoading(false)
                    nav("/sign-in")
                }else{
                    alert(json.message)
                    setLoading(false)
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


    const back = ()=>{
        setView(false)
    }
    const back2 = ()=>{

        setView2(false)
       
    }


    const checkPassword = ()=> {
        if(Payload.password === Payload.re_enter_password){
            setMatch(false)
        }else{
            setMatch(true)

        }
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
          nav("/sign-up")
        }
      }

    

    useEffect(() => {
        middleWare()
        checkPassword()
        }, [Payload.re_enter_password]);


  return (
    <MainLayout>
    <Seo title='Sign-up' description='Sign-up for LetMeIn'/>

    <Box mt="54px">
    
    <Headers text={"Sign Up"}/>
    </Box>
    <Center>
        <HStack spacing="15px" mt="31px">
            <Box bg={"#5BE3C9"} width={["70px", "90px"]} h="5px"></Box>
           
            <Box bg={view ? "#5BE3C9" : "#A3A3A3"} width={["70px", "90px"]} h="5px"></Box>
           
            <Box bg={view2 ? "#5BE3C9" : "#A3A3A3"} width={["70px", "90px"]} h="5px"></Box>
        </HStack>
    </Center>
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
    

        {
            view == false ? (
                <Center>
                <Box  w={["80%", "310px"]}>
                <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"}  color="#939393" mt="42px">Enter Estate Name</Text>
    
                <Select onChange={handleSignUp} color={"00000"} id="estateName" rounded="0"  _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Payload.estateName ? "16px":"12px"} fontWeight={"400"}    placeholder='Select Estate Name' bg={"#fff"} _hover={{bg: "#fff"}} w="100%" size={"lg"} mt="12px">
                <option value='Lake view'>Lake view Estate</option>
                <option value='Banana Estate'>Banana Estate</option>
                <option value='Canal Estate'>Canal Estate</option>
                <option value='Amen Estate'>Amen Estate</option>
               
                </Select>


                <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"}  color="#939393" mt="35px">Please who are you ?</Text>
    
                <Select color={"00000"} onChange={handleSignUp} id="userType" rounded="0"  _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Payload.userType ? "16px":"12px"} fontWeight={"400"}   placeholder='I am a...................' bg={"#fff"} _hover={{bg: "#fff"}} w="100%" size={"lg"} mt="12px">
                <option value='Resident'>Resident</option>
                <option value='LandLord'>LandLord</option>
                <option value='Estate Manager'>Estate Manager</option>
                <option value='Security Operative'>Security Operative</option>
                </Select>
    
                <Button mt="65px" disabled={Payload.userType !=="" && Payload.estateName !=="" ? false: true} onClick={proceed}>Confirm</Button>
               </Box>
                </Center>
              
            ):(

                view2 == false ? (
                    <Box mx={["6%", "10%"]}>

                    <Center>
                    <Box w={["80%", "310px"]}>
                  
                    <Stack mt="44px" spacing="15px">
                    
                        <Select w="100%" isRequired  onChange={handleSignUp} id="prefix" color="#000000" rounded="0"  _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Payload.prefix ? "16px":"12px"} fontWeight={"400"}   placeholder='Prefix' bg={"#fff"} _hover={{bg: "#fff"}}  size={"lg"} mt="12px">
                        <option value='Mr'>Mr</option>
                        <option value='Mrs'>Mrs</option>
                        </Select>
            
                        <Input val={Payload.firstName && true} isRequired label="FirstName" value={Payload.firstName}  id='firstName' type='text'  onChange={handleSignUp}/>
                        <Input val={Payload.lastName && true} isRequired label="LastName" value={Payload.lastName} id='lastName' type='text' onChange={handleSignUp} />
                        <Box>
                        <Input val={Payload.email && true} isRequired = {Payload.userType == "Security Operative" ? false: true} label="Email" value={Payload.email}  id='email' type='email' onChange={handleSignUp}/>
                        <Text color="red" fontSize={"12px"} fontFamily="body" fontWeight={"400"} textAlign="center" mt="4px"> {ValidEmail == false && "You have entered an invalid email address"}</Text>
                        </Box>
                        <Input val={Payload.phone && true} isRequired label="Phone Number" value={Payload.phone} type="number"  id='phone' onChange={handleSignUp}/>
                       
                    </Stack>

                    {
                        Payload.userType == "Security Operative" ?     

                        <Button mt="65px" disabled={Payload.prefix !=="" && Payload.firstName !=="" && Payload.lastName !=="" && Payload.phone !==""  ? false: true} onClick={proceed2}>Confirm</Button>:

                        <Button mt="65px" disabled={Payload.prefix !=="" && Payload.firstName !=="" && Payload.lastName !=="" && Payload.email !=="" && Payload.phone !==""  ? false: true} onClick={proceed2}>Confirm</Button>

  
                    }


                  
                    </Box>
                    </Center>
                   
                    <BackBtn onclick={back}/>
                    </Box>
                        
                ):(

                    <Box mx={["6%", "10%"]}>

                    <Center>
                    <Box  w={["80%", "310px"]}>
                    <form onSubmit={Sign_up}>
                    <Stack mt="44px" spacing="15px">
                    
                    {
                        Payload.userType == "Security Operative" ?     "":
                        (
                            <Stack spacing="15px">
                            
                            <Select isRequired  onChange={handleSignUp} id="streetName" color="#00000" rounded="0"  _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Payload.streetName ? "16px":"12px"} fontWeight={"400"}   placeholder='Street' bg={"#fff"} _hover={{bg: "#fff"}} w="100%" size={"lg"} mt="12px">
                            <option value='Obidu close'>Obidu close</option>
                            <option value='Rice Street'>Rice Street</option>
                            <option value='Brown Street'>Brown Street</option>
                            <option value='Ajoke Street'>Ajoke Street</option>
                            <option value='Peace Street'>Peace Street</option>
                            </Select>
                            <Input val={Payload.houseNo && true} isRequired label="House No." value={Payload.houseNo} type="number" id='houseNo' onChange={handleSignUp}/>
                            </Stack>
                        )
                    }
                     
                       
                        <div>
                        <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp}/>
                        <ProgressBar password={Payload.password}/>
                        </div>
                        <Box>
                        <Input borderColor={Match ? "#E02828": "#6AF3D8"} val={Payload.re_enter_password && true} isRequired label="Re-enter Password" value={Payload.re_enter_password} type="password" id='re_enter_password' onChange={handleSignUp}/>
                        <Text color="red" fontSize={"12px"} fontFamily="body" fontWeight={"400"} textAlign="center" mt="4px">{Match && "Password does not match"}</Text>
                        </Box>
                    </Stack>
                    <Text mt="2px">Already have an account ? <Link to="/sign-in"><Box as='span' borderBottom="1.5px solid #6AF3D8" pb="5px" cursor={"pointer"}>Sign-in</Box></Link> </Text>

                    {
                        Payload.userType == "Security Operative" ? 
                        <Button w={"100%"} isLoading= {Loading} mb="32px" mt="35px" disabled={ Payload.password !=="" && Payload.re_enter_password !=="" ? false: true} onClick={Sign_up_Security  }>Register</Button>:
                        <Button w={"100%"} isLoading= {Loading} mb="32px" mt="35px" disabled={Payload.streetName !=="" && Payload.houseNo !=="" && Payload.password !=="" && Payload.re_enter_password !=="" ? false: true} onClick={Sign_up}>Register</Button>


                    }

                    </form>
                    </Box>
                    </Center>
                   
     

                    <BackBtn onclick={back2}/>
                    </Box>

                )

            
            )
        }
       
        <Box bgImage="url(/bg-img.png)" bgSize={'cover'}
        bgRepeat={'repeat'}
        height="30vh" mt="121" display={["block", "none"]}>
        
        </Box>
    </MainLayout>
  );
}