import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import ProgressBar from '../Components/ProgressBar';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function ChangePassword() {


  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const apiLink = useSelector((state) => state.apiLink);


  const [Payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
    reTypePassword: "",
    id: onlineUser.user.id
  })

  const [Match, setMatch] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [Success, setSuccess] = useState(false)
  const nav = useNavigate()

  const handleChangePassword = (e) => {
    setPayload({ ...Payload, [e.target.id]: e.target.value })
  }

  const payload = {

    method: "POST",

    headers: {
      "Content-Type": "application/JSON"
    },

    body: JSON.stringify(Payload),

  }
  const SubmitPassword = () => {

    setLoading(true)
    fetch(`${apiLink.link}/user/updatePassword`, payload)

      .then(res => res.json())
      .then(json => {
        console.log("API-CHECK", json)
        if (json.status == 200) {
          setSuccess(true)
          setLoading(false)
          setPayload({
            oldPassword: "",
            newPassword: "",
            reTypePassword: "",
            id: onlineUser.user.id
          })
          setTimeout(() => {
            setSuccess(false)
          }, 4000);

        } else {
          alert(json.message)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("error", error);
      })


  }

  const checkRetypePassword = () => {
    if (Payload.newPassword === Payload.reTypePassword)
      setMatch(false)
    else {

      setMatch(true)
    }

  }




  useEffect(() => {
    
    checkRetypePassword()
  }, [Payload.reTypePassword])

  return (
    <MainLayout>
      <Seo title='Change Password' description='Letmein Change password' />

      <Box px={["6%", "10%"]} pb="100px">
      <Center>
        
      <Box w={["80%", "310px"]}>
        <Box mt="41px">
          <Headers text={"change password"} />
        </Box>
        <Stack mt="56px" spacing={"30px"}>
          <Input val={Payload.oldPassword && true} isRequired label="Old Password" value={Payload.oldPassword} type="password" id='oldPassword' onChange={handleChangePassword} />
          <div>
            <Input val={Payload.newPassword && true} isRequired label="New Password" value={Payload.password} type="password" id='newPassword' onChange={handleChangePassword} />
            <ProgressBar password={Payload.newPassword} />
          </div>
          <Input borderColor={Match ? "#E02828" : "#6AF3D8"} val={Payload.reTypePassword && true} isRequired label="Re-type Password" value={Payload.reTypePassword} type="password" id='reTypePassword' onChange={handleChangePassword} />
          <Text color="red" fontSize={"12px"} pos="relative" top="-10px">{Match && "*Password does not match*"}</Text>
        </Stack>

        <Button isLoading={Loading} mb="22px" mt={"60px"} disabled={Payload.oldPassword !== "" && Payload.newPassword !== "" && Payload.reTypePassword !== "" ? false : true} onClick={SubmitPassword}>Confirm</Button>
  {
    Success && (
      <Text mt="12px" fontSize={"14px"} textAlign="center" fontWeight="700" fontStyle={"italic"} fontFamily="body" color="#249421">
      Password Updated Successfully
    </Text>
    )
  }
       
      </Box>
   
    




</Center>
  <BackBtn onclick={()=>nav("/home")}/>
      </Box>
    </MainLayout>
  );
}
