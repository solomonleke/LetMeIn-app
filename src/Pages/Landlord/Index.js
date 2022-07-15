import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import GreetingText from '../../Components/GreetingText';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function LandLord() {

    const nav = useNavigate()

    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const isLogged = useSelector((state) => state.isLogged);


    const verifiedLan = useSelector((state) => state.verifiedCountLan.count);


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
            <Seo title='LandLord' description='Landlord for LetMeIn' />


            <Center mt={["100px", "171px"]}>
                <Stack spacing={'15px'} cursor="pointer" w={["80%", "310px"]}>
                    <GreetingText name={onlineUser.user.lastName} />
                    <Text color={Verified ? "#939393" : "#dad9d9"}>What would you like to request for ?</Text>
                    <Button onClick={visitor_access} disabled={Verified ? false: true}>Visitor Access</Button>
                    <Button onClick={taxi_access} disabled={Verified ? false: true}>Taxi Access</Button>
                    <Box pos={"relative"}>
                        <Button onClick={verify_id} disabled={Verified ? false: true} >Verify IDs</Button>
                        {
                            verifiedLan >= 1 && (
                                <Text h={"18px"} w={"18px"}
                                    rounded={"100%"} bg="#EDEDED"
                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                    pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                    fontSize={"12"}>{verifiedLan}</Text>
                            )
                        }

                    </Box>
                </Stack>
            </Center>

            {
                Verified == false && (
            <Center>
            <Box> 
               <Box textAlign={"center"} fontFamily="body" mt={["60px", "70px"]}>
                <Text fontWeight={"700"}> Just a Moment...  </Text>
                <Text> Your profile is going to be verified by your Estate Administrator.</Text>
            </Box>
            <Box textAlign={"center"} fontFamily="body" mt={["30px", "40px"]} mb="32px">
                <Text fontWeight={"700"}>  Is this taking too long.... </Text>
                <Text>You can contact Mr. Jubril - 08047589000 </Text>
            </Box>
        
            </Box>
        
          </Center>
                ) 
            }

        </MainLayout>
    );
}
