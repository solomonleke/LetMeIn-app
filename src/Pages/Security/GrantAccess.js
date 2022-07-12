import { Box, Center, Img, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function GrantAccess() {

  const [Loading, setLoading] = useState(false);
const nav = useNavigate()
  const homepage = ()=>{
    nav("/home")
  }
  return (
    <MainLayout>
      <Seo title='Security' description='Security for LetMeIn' />


      <Center>
        <Box w={["80%", "35%"]}>
          <Box  boxShadow={"2px 2px 10px 2px rgba(84, 0, 0, 0.25)"} bg="rgba(255, 255, 255, 0.85)" rounded="3px" py="35px" textAlign={"center"}>
            <Text>Visitor Access Granted Successfully</Text>

            <Center mt="35px"><Img src="/check.png" /></Center>

          </Box>

          <Button w={"100%"} isLoading={Loading} mb="10px" mt="55px"  onClick={homepage}>Homepage</Button>


        </Box>

      </Center>
    </MainLayout>
  );
}
