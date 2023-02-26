import React, { useState, useEffect } from 'react'
import { Box, Center, Flex, Select, Text, Stack } from '@chakra-ui/react';
import Headers from '../../Components/Headers'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackBtn from '../../Components/BackBtn';
import moment from 'moment/moment';
import EstateReqCard from '../../Components/EstateReqCard';

export default function ManageEstate() {
    
    const [View, setView] = useState(false);
    const [EstateName, setEstateName] = useState("");
    const [EstateList, setEstateList] = useState([]);
    const [EstateAdmin, setEstateAdmin] = useState([]);
    const [Loading, setLoading] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);

    const getAllEstate = () => {
      fetch(`${apiLink.link}/user/getAllEstates`)

          .then(res => res.json())
          .then(json => {
              setEstateList(json.msg)
              console.log("estate list", json)
          })
          .catch(error => {
              console.log("error", error);
          })

  }

  const Proceed = () => {
    setLoading(true)
    fetch(`${apiLink.link}/user/getEstateAdmin/${EstateName}`)

        .then(res => res.json())
        .then(json => {
            if (json.status == 200) {

                console.log("estate admin list", json)
                setLoading(false)
                setEstateAdmin(json.estateAdministrator)
                setView(true)
            } else {
                setLoading(false)
                alert("Wrong estate entered")

            }
        })
        .catch(error => {
            console.log("error", error);
        })

}

const verifyToggle = (id)=>{
  const payload = {

      method: "POST",

      headers: {
          "Content-Type": "application/JSON"
      },

      body: JSON.stringify({id: id}),

  }

 
  fetch(`${apiLink.link}/user/toggleUser`, payload)

  .then(res => res.json())
  .then(json => {
      if (json.status == 200) {
          Proceed()
        console.log("verify ", json)
        alert(json.msg)
      }
  })
  .catch(error => {
      console.log("error", error);
  })
}

    const nav = useNavigate()
    const goBack = () => {
        nav("/home")
    }
  
    useEffect(() => {

      getAllEstate()
  }, []);
// <Box w={["80%", "310px"]}></Box>

  return (
    <MainLayout>
    <Seo description='Letmein Manage Estates or Offices page' title='Manage Estates'/>
    <Center>
    <Box px={["80%", "19%"]} >
    <Box mt="41px">
    <Headers text={"Manage Estate/Office"} />
    </Box>

     <Box mt="45px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" >
    <Flex justifyContent="space-between">
    <Text textAlign="center" pt="30px" pr="10px" w="60%" fontFamily="body" fontWeight={'400'} color="#424242" fontSize={"14px"} borderRight="1px solid #B7B7B7">Total no. of Estate</Text>

    <Text fontFamily="body" textAlign="center" w="50%" fontWeight={'700'} color="#CBCBCB" fontSize={"53px"}>50</Text>


     </Flex>
    </Box>


    <Box px={["6%", "10%"]} pb="100px">
    {
        View == false ? (
            <Center>
                <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>



                    <Select onChange={(e) => setEstateName(e.target.value)} color={"00000"} id="estateName" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} value={EstateName} fontSize={EstateName ? "16px" : "12px"} fontWeight={"400"} placeholder='Select Estate to Verify' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="42px">
                        {
                            // EstateList?.map((item, i) => (
                            //     <option value={`${item.estateName}`}>{item.estateName}</option>
                            // ))
                            EstateList?.Length
                        }



                    </Select>


                    <Button mt={"32px"} onClick={Proceed} disabled={EstateName != "" ? false : true} isLoading={Loading}>Proceed </Button>
                </Box>
            </Center>
        ) : (
            <Center>
                <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>

                    <Headers mt="20px" text={` ${EstateName} Admin`} />


                    <Stack spacing={"20px"}>

                        {
                            EstateAdmin.map((item, i) => (
                                <EstateReqCard
                                    key={i}
                                    estateAdmin={`${item.prefix} ${item.firstName} ${item.lastName}`}
                                    estateAddress={`${item.houseNo} ${item.streetName}`}
                                    address={`${item.houseNo} ${item.streetName}`}
                                    phone={item.phone}
                                    dateReg={moment(item.createdAt).format('L')}
                                    onClick={()=>verifyToggle(item.id)}
                                    approve={item.Verified}
                                />
                            ))
                        }








                    </Stack>


                </Box>
            </Center>
        )
    }
    {
        View ? (
            <BackBtn onclick={() => setView(false)} />

        ) : (
            <BackBtn onclick={goBack} />

        )
    }

</Box>
    </Box>
    </Center>
    </MainLayout>
      )
}


