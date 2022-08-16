import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import ProgressBar from '../Components/ProgressBar';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function ResetPassword() {
    const id = useParams()
    const token = useParams()

    const [Payload, setPayload] = useState({
        newPassword: "",
        reTypePassword: "",
        id: id.id,
        token: token.token
      })

      const [Match, setMatch] = useState(false)
      const [Loading, setLoading] = useState(false)
      const [Successful, setSuccessful] = useState(false)

      const apiLink = useSelector((state) => state.apiLink);
    
      const handleChangePassword = (e)=>{
        setPayload({...Payload, [e.target.id]: e.target.value})
      } 

     

        const nav = useNavigate()
      const payload = {
    
        method: "POST",
    
        headers: { 
            "Content-Type": "application/JSON"
        },
    
        body: JSON.stringify(Payload),
        
    }
      const SubmitPassword = ()=> {
    
       setLoading(true)

       fetch(`${apiLink.link}/user/resetPassword`, payload)
    
       .then(res => res.json())
       .then(json => {
         console.log( "API-CHECK" , json)
         if(json.status == 200){
         
           setLoading(false)
           setSuccessful(true)
           setPayload({

            newPassword: "",
            reTypePassword: "",
           })

           setTimeout(() => {
            setSuccessful(false)
            nav("/sign-in")

           }, 3000);
          
          
       }else{
           alert(json.message)
           setLoading(false)
       }
      })
       .catch(error => {
         console.log("error", error);
     })
    
    
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
        <Seo title="Reset Password" description='Letmein password reset'/>

        <Center>
    
        <Box w={["80%", "310px"]}>
            <Box mt="41px">
            <Headers text={"Reset password"}/>
            </Box>
            <Stack mt="56px" spacing={"30px"}>
            <div>
            <Input val={Payload.newPassword && true} isRequired label="New Password" value={Payload.password} type="password" id='newPassword' onChange={handleChangePassword}/>
            <ProgressBar password={Payload.newPassword}/>
            </div>
            <Box>
            <Input borderColor={Match ? "#E02828": "#6AF3D8"} val={Payload.reTypePassword && true} isRequired label="Re-Type Password" value={Payload.reTypePassword} type="password" id='reTypePassword' onChange={handleChangePassword}/>
            <Text  color="red" fontSize={"12px"} fontFamily="body" fontWeight={"400"} textAlign="center" mt="4px">{Match && "Password does not match"}</Text>
            </Box>
            </Stack>
    
            <Button isLoading={Loading} mb="22px" mt={"60px"} disabled={Payload.oldPassword !== "" && Payload.newPassword !=="" && Payload.reTypePassword !== "" ? false:true} onClick={SubmitPassword}>Confirm</Button>
        {
            Successful && (
                
                <Text color="#249421" fontSize={"14px"} fontFamily="body" fontWeight={"400"} textAlign="center" mt="4px">Password successfully Updated</Text>
                
                ) 

        }
        </Box>
        </Center>
    </MainLayout>
  );
}
