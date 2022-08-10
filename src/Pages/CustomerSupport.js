import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Headers from '../Components/Headers';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function CustomerSupport() {

  return (
    <MainLayout>
      <Seo title='Customer Support' description='Letmein Customer Support' />

      <Center>
        <Box w={["80%", "310px"]}>
          <Box mt="41px">
            <Headers text="customer support" />
          </Box>

          <Stack spacing={"15px"} mt="25px">

            <HStack pt="18px" spacing={"20px"}>

              <HStack w={["50%","35%"]}>
                <div className='flex-icon'>
                  <AiOutlineMail />
                </div>
                <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Email </Text>
              </HStack>
              <a href="mailto:support@letmein.com.ng">
                <Text borderBottom={"1px solid #7E90EF"} fontSize={"14px"} w="100%" fontFamily="body" fontWeight={"700"} color="#000000">support@letmein.com.ng</Text>
              </a>

            </HStack>
            <HStack pt="18px" spacing={"20px"}>

              <HStack w={["40%","35%"]}>
                <div className='flex-icon'>
                  <BsTelephoneFill />
                </div>
                <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Phone No </Text>
              </HStack>
              <a href="callto:08068840125">
                <Text borderBottom={"1px solid #7E90EF"} fontSize={"14px"} w="100%" fontFamily="body" fontWeight={"700"} color="#000000">08068840125</Text>
              </a>

            </HStack>
          </Stack>
        </Box>
      </Center>
    </MainLayout>
  );
}
