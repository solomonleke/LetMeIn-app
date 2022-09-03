import { Box, Center, Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import MainLayout from '../Layouts/Index';

export default function Confirmation() {
    const nav = useNavigate()


    const lastName = useParams()
    const prefix = useParams()
    const boolean = useParams()

    const proceed = () => {
        nav("/sign-in")
    }
    return (

        <MainLayout>
            <Center pt="20vh" pb="100px">


                <Box px={["18px", "44px"]} py="33px" boxShadow={"1px 1px 18px rgba(0, 0, 0, 0.25)"} color="#000" bg="#fff" rounded="6px" w={["80%", "75%", "55%", "45%", "35%"]}>
                    {
                        boolean.boolean == "true" ? (
                            <Box>
                                <Text textAlign={"left"} fontSize={"28px"} textTransform="capitalize" color="#000000" fontWeight="800" w={"100%"} fontFamily={"body"}>
                                  {prefix.prefix} {lastName.lastName},</Text>
                                <Text textAlign={"left"} fontSize={"18px"} color="#000000" fontWeight="400" w={"100%"} fontFamily={"body"} mt="12px">
                                    Welcome to <Box fontWeight={"800"} as="span">LetMeIn</Box>, your reliable solution for smart access control of your residential space.
                                </Text>
                                <Text textAlign={"left"} fontSize={"18px"} color="#000000" fontWeight="400" w={"100%"} fontFamily={"body"} mt="32px">
                                    Your email has been verified successfully.
                                </Text>
                            </Box>
                        ) : (
                            <Box>
                                <Text textAlign={"left"} fontSize={"28px"} textTransform="capitalize" color="#000000" fontWeight="800" w={"100%"} fontFamily={"body"}>
                               Hi {prefix.prefix} {lastName.lastName},</Text>
                               
                                <Text textAlign={"left"} fontSize={"18px"} color="#000000" fontWeight="400" w={"100%"} fontFamily={"body"} mt="32px">
                                    Your email has been verified already.
                                </Text>
                                <Text textAlign={"left"} fontSize={"18px"} color="#000000" fontWeight="400" w={"100%"} fontFamily={"body"} mt="32px">
                                    Kindly proceed to the login page using the button bellow.
                                </Text>
                            </Box>
                        )
                    }




                    <Button onClick={proceed} mt="32px">Proceed to Login Page</Button>

                </Box>


            </Center>
        </MainLayout>
    );
}
