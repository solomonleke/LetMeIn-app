import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import ProgressBar from '../Components/ProgressBar';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function ChangePassword() {
  const [Payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
    reTypePassword: ""
  })
  const [Match, setMatch] = useState(false)
  const [Loading, setLoading] = useState(false)

  const handleChangePassword = (e)=>{
    setPayload({...Payload, [e.target.id]: e.target.value})
  } 

  const payload = {

    method: "POST",

    headers: { 
        "Content-Type": "application/JSON"
    },

    body: JSON.stringify(Payload),
    
}
  const SubmitPassword = ()=> {

   setLoading(true)
//    fetch("https://api.solomonleke.com.ng/user/signup", payload)

//    .then(res => res.json())
//    .then(json => {
//      console.log( "API-CHECK" , json)
//      if(json.status == 200){
     
//        setLoading(false)
      
//    }else{
//        alert(json.message)
//        setLoading(false)
//    }
//   })
//    .catch(error => {
//      console.log("error", error);
//  })


  }

  const checkRetypePassword = ()=>{
    if(Payload.newPassword === Payload.reTypePassword)
    setMatch(false)
    else{

      setMatch(true)
    }

  }

  useEffect(() => {
    checkRetypePassword()
  }, [Payload.reTypePassword])

  return (
    <MainLayout>
    <Seo title='Change Password' description='Letmein Change password' />   

    <Center>
    
    <Box w={["80%", "310px"]}>
        <Box mt="41px">
        <Headers text={"change password"}/>
        </Box>
        <Stack mt="56px" spacing={"30px"}>
        <Input val={Payload.oldPassword && true} isRequired label="Old Password" value={Payload.oldPassword} type="password" id='oldPassword' onChange={handleChangePassword}/>
        <div>
        <Input val={Payload.newPassword && true} isRequired label="New Password" value={Payload.password} type="password" id='newPassword' onChange={handleChangePassword}/>
        <ProgressBar password={Payload.newPassword}/>
        </div>
        <Input val={Payload.reTypePassword && true} isRequired label="Re-Type Password" value={Payload.reTypePassword} type="password" id='reTypePassword' onChange={handleChangePassword}/>
        <Text  color="red" fontSize={"12px"} pos="relative" top="-10px">{Match && "*Password does not match*"}</Text>
        </Stack>

        <Button isLoading={Loading} mb="22px" mt={"60px"} disabled={Payload.oldPassword == "" || Payload.newPassword =="" || Payload.reTypePassword == "" && true} onClick={SubmitPassword}>Confirm</Button>
    </Box>
    </Center>
    </MainLayout>
  );
}
