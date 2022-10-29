import { Box, Center, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import NotificationCard from '../Components/NotificationCard';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function Notification() {
  return (
    <MainLayout>
      <Seo title='Notification' description='LetmeIn Notification' />

      <Box px={["6%", "10%"]} pb="100px">
        <Center>
          <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>

          <Text fontFamily={"body"} pt="15px" fontSize="16px" fontWeight={"700"} color="#00000" textAlign={"center"}>Pending Multiple Request Access</Text>

           <Stack spacing={"20px"}>
           
           <NotificationCard/>
           <NotificationCard/>
           </Stack>
          </Box>
        </Center>
      </Box>
    </MainLayout>
  );
}
