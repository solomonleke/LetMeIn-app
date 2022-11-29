import React from 'react'
import MainLayout from '../../Layouts/Index'
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import EstateReqCard from '../../Components/EstateReqCard';
import Headers from '../../Components/Headers';
import Seo from '../../Utils/Seo'

export default function VerifyAdmin() {
  return (
   <MainLayout>
    <Seo description='Letmein Verify Estate Admin page' title='Verify Estate Admin'/>
    <Box px={["6%", "10%"]} pb="100px">
                <Center>
                    <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>

                        <Headers mt="20px" text={"Verify Estate Admin"} />


                        <Stack spacing={"20px"}>

                                    <EstateReqCard
                                        estateAdmin={"Mr. Adebola Adeniran"}
                                        estateAddress={"No. 4, Ademola street"}
                                        address={"sxdh"}
                                        phone={"08033344729"}
                                        dateReg={"08-10-2023"}
                                        onClick={"click"}
                                    />






                        </Stack>
                        <Stack spacing={"20px"}>

                                    <EstateReqCard
                                        estateAdmin={"Mr. Arinze Okoye"}
                                        estateAddress={"No. 4, Ademola street"}
                                        address={"sxdh"}
                                        phone={"08033344729"}
                                        dateReg={"08-10-2023"}
                                        onClick={"click"}
                                    />






                        </Stack>
                    </Box>
                </Center>
            </Box>
   </MainLayout>
  )
}
