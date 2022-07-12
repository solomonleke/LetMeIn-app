import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, CloseButton, HStack, Select, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function SignIn() {

    const [Success, setSuccess] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [Loading, setLoading] = useState(false);

    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    const nav = useNavigate()
    const [Payload, setPayload] = useState({

        email: "",
        password: "",

    });

    const handleSignUp = (e) => {
        setPayload({ ...Payload, [e.target.id]: e.target.value })
    }

    const payload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),

    }

    const Sign_in = () => {

        if (Payload.email !== "" && Payload.password !== "") {
            setLoading(true)
            fetch("https://api.solomonleke.com.ng/user/login", payload)
                .then(res => res.json())
                .then(json => {

                    console.log("Login-CHECK", json)

                    if (json.status == 200) {


                        dispatch(

                            { type: "SIGN_IN", payload: { isLogged: true } }
                        );

                        dispatch(
                            // collect two parameters (type and payload)
                    
                            { type: "ADD_USER", payload: { data: json.people } }
                          );

                        if (json.people.userType == "Resident") {

                            nav("/resident")
                        } else if (json.people.userType == "Landlord") {
                            nav("/landlord")
                        } else if (json.people.userType == "Estate manager") {
                            nav("/estate-admin")
                        } else {
                            nav("/security-ops")
                        }
                    } else {

                        setAlertMessage(json.message)
                        setLoading(false)
                    }



                })
                .catch(error => {
                    console.log("error", error);
                    setLoading(false)
                })

        } else {

            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)

            }, 4000);
        }


    }
    return (
        <MainLayout>
            <Seo title='Sign-in' description='Sign-in for LetMeIn' />

            <Text fontFamily={"body"} fontSize="25px" fontWeight={"700"}  color="#000000" mt="32px" textAlign={"center"}>Sign in</Text>

      
            {
                Success && (
                    <Center>
                        <Alert status='error' mt="15px" mx={["2%", "10%", "30%", "40%"]} color="#00000" >
                            <AlertIcon />
                            <AlertTitle mr={2}>Please fill in required fields!</AlertTitle>
                            <CloseButton onClick={() => setSuccess(false)} position='absolute' right='8px' top='8px' />
                        </Alert>
                    </Center>
                )
            }
            {
                AlertMessage && (
                    <Center>
                        <Alert status='error' mt="15px" mx={["2%", "10%", "20%", "30%"]} color="#00000" >
                            <AlertIcon />
                            <AlertTitle mr={2}>{AlertMessage}</AlertTitle>
                            <CloseButton onClick={() => setAlertMessage("")} position='absolute' right='8px' top='8px' />
                        </Alert>
                    </Center>
                )
            }


            <Center>


                <Box>


                    <Stack mt="66px" spacing="15px">

                        <Input val={Payload.email && true} isRequired label="Email" value={Payload.email} id='email' type='email' onChange={handleSignUp} />
                        <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp} />

                    </Stack>
                    <Text cursor={"pointer"} float={"right"} fontSize="13px" mt="15px" color={"blue"}><Link to="#">Forget password</Link></Text>
                    <Text mt="65px" fontFamily={"body"}>Don't have an account ? <Link to="/sign-up"><Box as='span' borderBottom="1.5px solid #E02828" pb="5px" cursor={"pointer"}>Sign-Up</Box></Link> </Text>
                   

                </Box>


            </Center>

            <Center>
                
             <Button w={["55%","40%","35%","18%"]} isLoading={Loading} mb="32px" mt="15px" disabled={Payload.userType !== "" ? false : true} onClick={Sign_in}>Enter</Button>
            </Center>

        </MainLayout>
    );
}
