import React, { useEffect, useState } from 'react';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import { useSelector } from 'react-redux';

export default function EstateAdmin() {

    const nav = useNavigate()

    const [Verified, setVerified] = useState(true);
    const isLogged = useSelector((state) => state.isLogged);

    const visitor_access = () => {

        nav("/visitors-access")
    }
    const verify_id = () => {

        nav("/verify-id")
    }

    const taxi_access = () => {
        nav("/taxi-access")
    }

    const middleWare = () => {
        if (isLogged.isLogged !== true) {
            nav("/sign-in")
        }
    }
    useEffect(() => {
        middleWare()
    }, []);


    return (
        <MainLayout>
            <Seo title='Estate-Manager' description='Estate for LetMeIn' />


            <Center mt={["100px", "171px"]}>
                <Stack spacing={'15px'} cursor="pointer">
                    <Text color={Verified ? "#939393" : "#dad9d9"}>What would you like to request for ?</Text>
                    <Button onClick={visitor_access}>Visitor Access</Button>
                    <Button onClick={taxi_access}>Taxi Access</Button>
                    <Box pos={"relative"}>
                        <Button onClick={verify_id} >Verify IDs</Button>
                        <Text h={"18px"} w={"18px"}
                            rounded={"100%"} bg="#EDEDED"
                            boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                            pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                            fontFamily="body" fontWeight={"400"} color="#000000"
                            fontSize={"12"}>24</Text>
                    </Box>
                </Stack>
            </Center>




        </MainLayout>
    );
}
