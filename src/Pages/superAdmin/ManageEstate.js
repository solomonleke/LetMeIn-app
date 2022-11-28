import React from 'react'
import { Box, Center, Flex, Select, Text, Stack } from '@chakra-ui/react';
import Headers from '../../Components/Headers'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import MainLayout from '../../Layouts/Index'
import Seo from '../../Utils/Seo'

export default function ManageEstate() {
    
  
  return (
    <MainLayout>
    <Seo description='Letmein Manage Estates or Offices page' title='Manage Estates'/>
    <Center>
    <Box w={["80%", "310px"]}>

                        <Box mt="41px">
                            <Headers text={"Manage Estate/Office"} />
                        </Box>

                        <Box mt="45px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" >
                            <Flex justifyContent="space-between">
                                <Text textAlign="center" pt="30px" pr="10px" w="60%" fontFamily="body" fontWeight={'400'} color="#424242" fontSize={"14px"} borderRight="1px solid #B7B7B7">Total no. of Estate</Text>

                                <Text fontFamily="body" textAlign="center" w="50%" fontWeight={'700'} color="#CBCBCB" fontSize={"53px"}>50</Text>


                            </Flex>
                        </Box>

                        <Stack mt="10px" spacing="15px">

            <Select color={"00000"}  id="country"  rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"}  fontSize={"14px"} fontWeight={"400"} placeholder='Select Country' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              <option value='Nigeria'>Nigeria</option>
              <option value='Ghana'>Ghana</option>
              <option value='Usa'>Usa</option>
            </Select>
            <Select color={"00000"}  id="state"  rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"}  fontSize={"14px"} fontWeight={"400"} placeholder='Select State' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"} mt="62px">
              <option value='Lagos'>Lagos</option>
              <option value='Oyo'>Oyo</option>
              <option value='Abuja'>Abuja</option>
            </Select>

            <Input label='Name of Estate/Office'  id="name" />
          </Stack>

          <Button mt={"32px"}>Confirm</Button>

                       

                    </Box>
    </Center>
    </MainLayout>
      )
}
