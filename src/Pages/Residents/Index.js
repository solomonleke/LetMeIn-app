import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import DelayMsg from '../../Components/DelayMsg';
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
    const [Verified, setVerified] = useState(onlineUser.user.Verified);

    const isLogged = useSelector((state) => state.isLogged);

    const middleWare = () => {
        if (isLogged.isLogged !== true) {
            nav("/sign-in")
        }
    }

    
const checkVerification = ()=>{
    // window.location.reload()
  
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
  
    useEffect(() => {
        checkVerification() 
        middleWare()
    }, []);
    return (
        <MainLayout>
            <Seo title='Resident' description='Resident for LetMeIn' />


            <Center mt={["100px", "171px"]} opacity={Verified == false && "0.1"}>
                <Stack spacing={'15px'} cursor="pointer">
                <GreetingText name={`${onlineUser.user.prefix} ${onlineUser.user.lastName}`}/>

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


        </MainLayout>
    );
}
