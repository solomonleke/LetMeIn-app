import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import DelayMsg from '../../Components/DelayMsg';
import GreetingText from '../../Components/GreetingText';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function LandLord() {

    const nav = useNavigate()

    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const isLogged = useSelector((state) => state.isLogged);

    const dispatch = useDispatch();
    const apiLink = useSelector((state) => state.apiLink);
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

    const checkVerification = ()=>{
      
        fetch(`${apiLink.link}/user/getOneUser/${onlineUser.user.id}`)
        .then(response => response.json())
        .then(data => {
          
            if(data.status === 200){
              console.log("userrrrs", data)
              dispatch(
              
                { type: "ADD_USER", payload: { data: data.msg } }
              );
              
              setVerified(data.msg.Verified)
            }
          
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
      
       
      }

    const middleWare = () => {
        if (isLogged.isLogged !== true) {
            nav("/sign-in")
        }
    }

    const checkLength = ()=>{

        fetch(`${apiLink.link}/user/unVerified/${onlineUser.user.estateName}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                console.log("data len", data)
                dispatch(
                  // collect two parameters (type and payload)
          
                  { type: "VERIFIED_COUNT", payload: { data:  data.resident?.length + data.landlord?.length + data.security_OPs?.length} }
                );

                dispatch(
          
                  { type: "VERIFIED_COUNT_LAN", payload: { data:  data.resident?.length } }
                );

            }else{
                console.log("error", data)
            }
          
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        middleWare()
        checkVerification()
        checkLength()
    }, []);

    return (
        <MainLayout>
            <Seo title='LandLord' description='Landlord for LetMeIn' />


            <Center mt={["100px", "171px"]} opacity={Verified == false && "0.04"}>
                <Stack spacing={'15px'} cursor="pointer" w={["80%", "310px"]}>
                    <GreetingText name={`${onlineUser.user.prefix} ${onlineUser.user.lastName}`} />
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
            <Center mt={["0px","-90px"]}>
            <DelayMsg/>
        
          </Center>
                ) 
            }

        </MainLayout>
    );
}
