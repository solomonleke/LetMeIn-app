import { Alert, AlertIcon, AlertTitle, Box, Center, CloseButton, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import DelayMsg from '../../Components/DelayMsg';
import DelayMsgDisable from '../../Components/DelayMsgDisble';
import GreetingText from '../../Components/GreetingText';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function Index() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const apiLink = useSelector((state) => state.apiLink);

    const visitor_access = () => {

        nav("/visitors-access")
    }

    const taxi_access = () => {
        nav("/taxi-access")
    }
    const onlineUser = useSelector((state) => state.onlineUser);


    const isLogged = useSelector((state) => state.isLogged);



//useQuery to get updated data every 10 seconds

    const { data, isLoading, isError } = useQuery('users', async () => await (await (fetch(`${apiLink.link}/user/getOneUser/${onlineUser.user.id}`))).json(), { refetchInterval: 10000, refetchOnReconnect: false, refetchIntervalInBackground: true, cacheTime: 10000 });
    console.log('data', data, isLoading, isError);
    var Verified = onlineUser.user.Verified;

    if (!isLoading) {

        var Verified = data?.msg.Verified;
       

    }
//alert modification 

    const [ShowAlert, setShowAlert] = useState(false)


    useEffect(() => {

    
        Verified === true? setShowAlert(true):setShowAlert(false);
        dispatch(
        
            { type: "ADD_USER", payload: { data: data? data.msg: onlineUser.user } }
          );

          
        


    }, [Verified]);
    return (
        <MainLayout>
            <Seo title='Resident' description='Resident for LetMeIn' />

          
            <Center mt={["60px", "90px"]} opacity={Verified == false || onlineUser.user.disable_user === true && "0.1"}>
                <Stack spacing={'15px'} cursor="pointer">
                    <GreetingText name={`${onlineUser.user.prefix} ${onlineUser.user.lastName}`} />

                    <Text color={Verified ? "#939393" : "#dad9d9"}>What would you like to request for ?</Text>
                    <Button disabled={Verified ? false : true} onClick={visitor_access}>Visitor Access</Button>
                    <Button disabled={Verified ? false : true} onClick={taxi_access}>Taxi Access</Button>
                </Stack>
            </Center>


            {
                Verified == false && (
                    <Center>
                        <DelayMsg />
                    </Center>
                )
            }

            {
                onlineUser.user.disable_user == true && (
                    <Center>
                        <DelayMsgDisable />
                    </Center>
                )
            }

            {
                ShowAlert && (
                    <Center mt="32px" >
                    <Alert status='success' mt="35px" color="#fff" w={["85%","83%","70%","57%","36%"]}>
                        <AlertIcon />
                        <AlertTitle mr={2} fontWeight="400" fontFamily={"body"} fontSize="16px">Congratulation, your account has been verified Successfully</AlertTitle>
                        <CloseButton onClick={() => setShowAlert(false)} position='absolute' right='8px' top='8px' />
            
                    </Alert>
                </Center>
                )
            }   


        </MainLayout>
    );
}
