import React, { useEffect, useState } from 'react';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import { useDispatch, useSelector } from 'react-redux';
import GreetingText from '../../Components/GreetingText';
import DelayMsg from '../../Components/DelayMsg';
import DelayEstateMsg from '../../Components/DelayEstateMsg';
import { useQuery } from 'react-query';

export default function EstateAdmin() {

    const nav = useNavigate()
    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.isLogged);
    const apiLink = useSelector((state) => state.apiLink);
    const verifiedLen = useSelector((state) => state.verifiedCount.count);

    const onlineUser = useSelector((state) => state.onlineUser);

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

    const checkLength = () => {

        fetch(`${apiLink.link}/user/unVerified/${onlineUser.user.estateName}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    console.log("data len", data)
                    dispatch(
                        // collect two parameters (type and payload)

                        { type: "VERIFIED_COUNT", payload: { data: data.resident?.length + data.landlord?.length + data.security_OPs?.length } }
                    );

                    dispatch(

                        { type: "VERIFIED_COUNT_LAN", payload: { data: data.resident?.length } }
                    );

                } else {
                    console.log("error", data)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }

    //useQuery to get updated data every 10 seconds

    const { data, isLoading, isError } = useQuery('users', async () => await (await (fetch(`${apiLink.link}/user/getOneUser/${onlineUser.user.id}`))).json(), { refetchInterval: 10000, refetchOnReconnect: false, refetchIntervalInBackground: true, cacheTime: 10000 });
    console.log('data', data, isLoading, isError);
     var Verified = onlineUser.user.Verified;

    if (!isLoading) {

        var Verified = data?.msg.Verified;
       

    }

    useEffect(() => {
        dispatch(
        
            { type: "ADD_USER", payload: { data: data? data.msg: onlineUser.user } }
          );

        middleWare()
        checkLength()
    }, [Verified]);


    return (
        <MainLayout>
            <Seo title='Estate-Manager' description='Estate for LetMeIn' />


            <Center mt={["100px", "131px"]} opacity={onlineUser.user.Verified == false && "0.4"}>
                <Stack spacing={'15px'} cursor="pointer" w={["80%", "310px"]}>
                    <GreetingText name={`${onlineUser.user.prefix} ${onlineUser.user.lastName}`} />
                    <Text color={Verified ? "#939393" : "#dad9d9"}>What would you like to request for ?</Text>
                    <Button disabled={onlineUser.user.Verified == false ? true: false} onClick={visitor_access}>Visitor Access</Button>
                    <Button onClick={taxi_access} disabled={onlineUser.user.Verified == false ? true: false}>Taxi Access</Button>
                    <Box pos={"relative"}>
                        <Button onClick={verify_id} disabled={onlineUser.user.Verified == false ? true: false}>Verify IDs</Button>
                        {
                            verifiedLen >= 1 && (
                                <Text h={"18px"} w={"18px"}
                                    rounded={"100%"} bg="#EDEDED"
                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                    pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                    fontSize={"12"}>{verifiedLen}</Text>
                            )
                        }

                    </Box>
                </Stack>
            </Center>

            {
                onlineUser.user.Verified == false && (
                    <Center mt={"-100px"} zIndex="2">
                        <DelayEstateMsg />
                    </Center>
                )
            }





        </MainLayout>
    );
}
