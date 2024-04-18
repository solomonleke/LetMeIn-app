import { Box, Center, Select, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../Components/Button'
import Headers from '../../Components/Headers'
import Input from '../../Components/Input'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'
import { Country, State, City } from 'country-state-city';

export default function NewOffice() {

  const apiLink = useSelector((state) => state.apiLink);

  const [countryCode, setCountryCode] = useState({});


  console.log("countriesssss", Country.getAllCountries())
  console.log(State.getAllStates())

  const [Payload, setPayload] = useState({
    country: "",
    state: "",
    estateName: ""
  })





  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);
  const handlePayload = (e) => {

    setPayload({ ...Payload, [e.target.id]: e.target.value })

  }

  const payload = {

    method: "POST",

    headers: {
      "Content-Type": "application/JSON"
    },

    body: JSON.stringify(Payload),

  }

  const SubmitNewForm = () => {
    setLoading(true)
    console.log("Payload", Payload)

    fetch(`${apiLink.link}/user/newEstate`, payload)

      .then(res => res.json())
      .then(json => {

        if (json.status == 200) {
          setLoading(false)
          setSuccess(true)

          setTimeout(() => {
            setSuccess(false)
          }, 3000);

          setPayload({
            country: "",
            state: "",
            estateName: ""
          })
          console.log("API-CHECK", json)
        }

      })
      .catch(error => {
        console.log("error", error);
      })
  }
  return (
    <MainLayout>
      <Seo title='LetMeIn SuperAdmin Dashboard' description='LetMeIn SuperAdmin Dashboard' />

      <Center>
        <Box w={["80%", "310px"]}>
          <Headers text={"New Estate/Office"} mt="32px" />
          <Stack mt="10px" spacing="15px">

            <Select color={"00000"} onChange={handlePayload} id="country" value={Payload.country} rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={"14px"} fontWeight={"400"} placeholder='Select Country' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              {
                Country.getAllCountries().map((item, i) => (

                  <option value={`${item.name}`}>{item.name}</option>
                ))





              }

            </Select>
            <Select color={"00000"} onChange={handlePayload} id="state" value={Payload.state} rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={"14px"} fontWeight={"400"} placeholder='Select State' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              {


                State.getAllStates().filter((country) => country.countryCode == Country.getAllCountries().filter((country) => country.name == Payload.country)[0]?.isoCode||"").map((state) => (

                  <option value={`${state.name}`}>{state.name}</option>

                  
                ))


              }

            </Select>

            <Input label='Name of Estate/Office' onChange={handlePayload} id="estateName" value={Payload.estateName} />
          </Stack>

          <Button onClick={SubmitNewForm} mt={"32px"} isLoading={Loading}>Confirm</Button>
          {
            Success && (

              <Text textAlign={"center"} mt="20px" color="green">New Estate Added Successfully</Text>
            )
          }

        </Box>
      </Center>
    </MainLayout>
  )
}
