import { Alert, AlertIcon, AlertTitle, Box, Center, CloseButton,  Stack, Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function SignIn() {

    const [Success, setSuccess] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [Loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const nav = useNavigate()
    const [Payload, setPayload] = useState({

        userName: "",
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

             <Box mt="54px"> <Headers text="Sign In" />  </Box>
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


                <Box w={["80%", "310px"]}>


                    <Stack mt="66px" spacing="15px">

                        <Input val={Payload.userName && true} isRequired label="Email or Phone No" value={Payload.userName} id='userName' type='text' onChange={handleSignUp} />
                        <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp} />

                    </Stack>
                    <Text cursor={"pointer"} float={"right"} fontSize="13px" mt="5px" color={"blue"}><Link to="#">Forget password</Link></Text>
                    <Text mt="30px" fontFamily={"body"}>Don't have an account ? <Link to="/sign-up"><Box as='span' borderBottom="1.5px solid #E02828" pb="5px" cursor={"pointer"}>Sign-Up</Box></Link> </Text>
                   
                    <Button w={"100%"} isLoading={Loading} mb="32px" mt="25px" disabled={Payload.userType !== "" ? false : true} onClick={Sign_in}>Enter</Button>
                </Box>


            </Center>

           

        </MainLayout>
    );
}
