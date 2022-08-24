import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';


const Profile = () => {
    const nav = useNavigate()
    const isLogged = useSelector((state) => state.isLogged);
    const onlineUser = useSelector((state) => state.onlineUser);

    const middleWare = () => {
        if (isLogged.isLogged !== true) {
            nav("/sign-in")
        }
    }

    useEffect(() => {
        middleWare()
    }, []);




    return <MainLayout>

    <Seo title='My Profile' description='Profile of user' />
        <Box px={["6%", "10%"]} pb="100px">
        <Center>
            <Box w={["90%","85%", "65%", "49%","35%"]} mb="20px">
                <Box bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"} rounded='7px' px="13px" py="30px" mt="50px">
                    <Text textAlign={"center"} fontSize={"24px"} fontFamily="body" fontWeight={"500"} color="#424242">Your Profile</Text>

                    <Stack mt="27px" spacing={"14px"}>

                        <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" spacing={"20px"}>
                            <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Name </Text>

                            <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000"> {onlineUser.user.prefix} {onlineUser.user.firstName} {onlineUser.user.lastName}</Text>
                        </HStack>

                        <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
                            <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Email</Text>

                            <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.email||""}</Text>
                        </HStack>

                        <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
                        <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Phone No.</Text>

                        <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.phone}</Text>
                    </HStack>

                        <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
                            <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Estate </Text>

                            <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.estateName}</Text>
                        </HStack>

                        <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
                            <Text fontSize={"14px"} w="20%" fontFamily="body" fontWeight={"400"} color="#424242">Address </Text>

                            <Text fontSize={"14px"} w="80%" fontFamily="body" fontWeight={"700"} color="#000000">{onlineUser.user.houseNo||""}, {onlineUser.user.streetName||""}, {onlineUser.user.estateName}</Text>
                        </HStack>

                    </Stack>


                </Box>


            </Box>


        </Center>
        <BackBtn onclick={()=>nav("/home")}/>

        </Box>
    </MainLayout>;
}



export default Profile;