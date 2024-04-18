import { Alert, AlertIcon, AlertTitle, Box, Center, CloseButton, Select, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';
import BackBtn from '../Components/BackBtn';

export default function SignIn() {

    const [Success, setSuccess] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [Loading, setLoading] = useState(false);
    const [UserType, setUserType] = useState("");
    const [Show, setShow] = useState(false);

    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);

    const apiLink = useSelector((state) => state.apiLink);

    const dispatch = useDispatch();

    const nav = useNavigate()

    const [Payload, setPayload] = useState({

        userName: "",
        password: "",

    });

    const handleSignUp = (e) => {
        setPayload({ ...Payload, [e.target.id]: e.target.value })
    }

    const handleUserType = (e) => {

        setUserType(e.target.value)

        setShow(true)
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
            fetch(`${apiLink.link}/user/login`, payload)
                .then(res => res.json())
                .then(json => {

                    console.log("Login-CHECK", json)

                    if (json.status == 200) {

                        if (json.people) {
                            dispatch(

                                { type: "SIGN_IN", payload: { isLogged: true } }
                            );

                            dispatch(
                                // collect two parameters (type and payload)

                                { type: "ADD_USER", payload: { data: json.people } }
                            );


                        } else {
                            nav("/sign-in")
                        }


                        if (json.people.userType == "Resident") {

                            nav("/resident")
                        } else if (json.people.userType == "Landlord") {
                            nav("/landlord")
                        } else if (json.people.userType == "Estate manager") {
                            nav("/estate-admin")
                        }
                        else if (json.people.userType == "Super admin") {
                            nav("/superAdmin")
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

    const middleWare = () => {
        if (isLogged.isLogged == true) {
            if (onlineUser.user.userType == "Resident") {

                nav("/resident")
            } else if (onlineUser.user.userType == "Landlord") {
                nav("/landlord")
            } else if (onlineUser.user.userType == "Estate manager") {
                nav("/estate-admin")
            }
            else if (onlineUser.user.userType == "Super admin") {
                nav("/superAdmin")
            } else if (onlineUser.user.userType == "Security operative") {
                nav("/security-ops")
            } else {
                nav("/sign-in")
            }
        } else {
            nav("/sign-in")
        }
    }


    const back = () => {
        setShow(!Show)
    }
    const backHome = () => {
        nav("/home")
    }


    useEffect(() => {

        middleWare()

    }, []);
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


            {
                Show == false ? (
                    <Box mx={["6%", "10%"]}>

                        <Center>

                            <Box w={["80%", "310px"]}>

                                <Select color={"00000"} onChange={handleUserType} id="userType" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} value={UserType} fontSize={UserType ? "16px" : "12px"} fontWeight={"400"} placeholder='I am a...................' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
                                    <option value='Resident'>Resident</option>
                                    <option value='Estate Manager'>Estate Manager</option>
                                    <option value='Security Operative'>Security Operative</option>
                                </Select>
                            </Box>

                        </Center>
                        <BackBtn onclick={backHome} />
                    </Box>


                 


                ) : (
                    <Box mx={["6%", "10%"]}>
                        <Center>


                            <Box w={["80%", "310px"]}>


                                <Stack mt="66px" spacing="15px">

                                    <Input val={Payload.userName && true} isRequired label={UserType == "Security Operative" ? "Phone No" : "Email or Phone No"} value={Payload.userName} id='userName' type='text' onChange={handleSignUp} />
                                    <Input val={Payload.password && true} isRequired label="Password" value={Payload.password} type="password" id='password' onChange={handleSignUp} />

                                </Stack>
                                <Text cursor={"pointer"} float={"right"} fontSize="13px" mt="5px" color={"blue"}><Link to="/sign-in/forget-password">Forgot password?</Link></Text>
                                <Text mt="30px" fontFamily={"body"}>Don't have an account? <Link to="/sign-up"><Box as='span' borderBottom="1.5px solid #E02828" pb="5px" cursor={"pointer"}>Sign-Up</Box></Link> </Text>

                                <Button w={"100%"} isLoading={Loading} mb="32px" mt="25px" disabled={Payload.userType !== "" ? false : true} onClick={Sign_in}>Enter</Button>
                            </Box>


                        </Center>
                        <BackBtn onclick={back} />
                    </Box>

                )
            }






        </MainLayout>
    );
}
