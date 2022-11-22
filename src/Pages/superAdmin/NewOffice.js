import { Box, Center, Select, Stack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../Components/Button'
import Headers from '../../Components/Headers'
import Input from '../../Components/Input'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'

export default function NewOffice() {

  const apiLink = useSelector((state) => state.apiLink);

  const [Payload, setPayload] = useState({
    country: "",
    state: "",
    name: ""
  })
  const handlePayload = (e)=>{

    setPayload({...Payload, [e.target.id]: e.target.value})
  }

  const payload = {

    method: "POST",

    headers: {
        "Content-Type": "application/JSON"
    },

    body: JSON.stringify(Payload),

}

  const SubmitNewForm = ()=>{

    console.log("Payload", Payload)

  //   fetch(`${apiLink.link}/user/`, payload)

  //   .then(res => res.json())
  //   .then(json => {
  //     console.log( "API-CHECK" , json)
    
  //  })
  //  .catch(error => {
  //    console.log("error", error);
  //   })
  }
  return (
    <MainLayout>
      <Seo title='LetMeIn SuperAdmin Dashboard' description='LetMeIn SuperAdmin Dashboard' />

      <Center>
        <Box w={["80%", "310px"]}>
        <Headers text={"New Estate/Office"} mt="32px" />
          <Stack mt="10px" spacing="15px">

            <Select color={"00000"} onChange={handlePayload} id="country" value={Payload.country} rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"}  fontSize={"14px"} fontWeight={"400"} placeholder='Select Country' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              <option value='Nigeria'>Nigeria</option>
              <option value='Ghana'>Ghana</option>
              <option value='Usa'>Usa</option>
            </Select>
            <Select color={"00000"} onChange={handlePayload} id="state" value={Payload.state} rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"}  fontSize={"14px"} fontWeight={"400"} placeholder='Select State' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              <option value='Lagos'>Lagos</option>
              <option value='Oyo'>Oyo</option>
              <option value='Abuja'>Abuja</option>
            </Select>

            <Input label='Name of Estate/Office' onChange={handlePayload} id="name" value={Payload.name} />
          </Stack>

          <Button onClick={SubmitNewForm} mt={"32px"}>Confirm</Button>

        </Box>
      </Center>
    </MainLayout>
  )
}
