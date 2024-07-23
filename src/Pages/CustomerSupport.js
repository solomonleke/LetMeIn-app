import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Headers from '../Components/Headers';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';
import PartnershipStamp from '../Components/PartnershipStamp';

export default function CustomerSupport() {
  const nav = useNavigate();

  return (
    <MainLayout>
      <Seo title='Customer Support' description='Letmein Customer Support' />

      <Box px={["6%", "10%"]} >

        <Center>
          <Box w={["80%", "310px"]}>
            <Box mt="41px">
              <Headers text="customer support" />
            </Box>

            <Stack spacing={"15px"} mt="25px">

              <Flex justifyContent={"center"}>
                <HStack pt="18px" spacing={"20px"}>

                  <HStack w={["50%", "50%"]}>
                    <div className='flex-icon'>
                      <AiOutlineMail />
                    </div>
                    <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Email </Text>
                  </HStack>

                  <a href="mailto:support@letmein.com.ng">
                    <Text borderBottom={"1px solid #7E90EF"} fontSize={"14px"} w="100%" fontFamily="body" fontWeight={"700"} color="#000000">support@letmein.ng</Text>
                  </a>

                </HStack>
              </Flex>


              <Flex justifyContent={"center"}>
                <HStack pt="18px" spacing={"20px"}>

                  <HStack w={["50%", "50%"]}>
                    <div className='flex-icon'>
                      <BsTelephoneFill />
                    </div>
                    <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Phone No </Text>
                  </HStack>
                  <a href="callto:08068840125">
                    <Text borderBottom={"1px solid #7E90EF"} fontSize={"14px"} w="100%" fontFamily="body" fontWeight={"700"} color="#000000">08068840125</Text>
                  </a>

                </HStack>
              </Flex>

            </Stack>
          </Box>
        </Center>

        <BackBtn onclick={() => nav("/home")} />

        <PartnershipStamp/>

      </Box>
    </MainLayout>
  );
}
