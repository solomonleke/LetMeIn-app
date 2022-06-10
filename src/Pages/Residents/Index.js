import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function Index() {
    const nav = useNavigate()

    const [Verified, setVerified] = useState(true);

    const visitor_access = () => {

        nav("/visitors-access")
    } 

    const taxi_access = () => {
        nav("/taxi-access")
    } 

    const isLogged = useSelector((state) => state.isLogged);
   
    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
    }
    useEffect(() => {
        middleWare()
    }, []);
  return (
    <MainLayout>
    <Seo title='Resident' description='Resident for LetMeIn'/>

    
    <Center mt={["100px","171px" ]}>
    <Stack spacing={'15px'} cursor="pointer">
    <Text color={Verified ? "#939393" : "#dad9d9"}>What would you like to request for ?</Text>
        <Button disabled={Verified ? false: true} onClick={visitor_access}>Visitor Access</Button>
        <Button disabled={Verified ? false: true} onClick={taxi_access}>Taxi Access</Button>
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
    <Box textAlign={"center"} fontFamily="body" mt={["80px", "120px"]}>
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
