import { Box, Center, Flex, HStack, Select, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BackBtn from '../../Components/BackBtn';
import Button from '../../Components/Button';
import DelayMsg from '../../Components/DelayMsg';
import Headers from '../../Components/Headers';
import HistoryCard from '../../Components/HistoryCard';
import Input from '../../Components/Input';
import Pagination from '../../Components/Pagination';
import MainLayout from '../../Layouts/Index';
import SecurityNav from '../../Layouts/SecurityNav';
import Seo from '../../Utils/Seo';

export default function UnCheckOutHistory() {

  const [Loading, setLoading] = useState(false);
 
  const [Duration, setDuration] = useState('');

  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const [Verified, setVerified] = useState(onlineUser.user.Verified);

  const handleDuration = (e) => {
    setDuration(e.target.value)
  }
  const nav = useNavigate();


  //   const payload = {

  //     method: "POST",

  //     headers: {
  //         "Content-Type": "application/JSON"
  //     },

  //     body: JSON.stringify(
  //       {accessCode: AccessCode }
  //     ),

  // }




  // const CheckOutVisitor = () => {

  //   fetch('https://api.solomonleke.com.ng/user/CheckedIn',{

  //     method: "POST",

  //     headers: {
  //         "Content-Type": "application/JSON"
  //     },

  //     body: JSON.stringify(
  //       {_id: User._id }
  //     ),

  // })
  //   .then(response => response.json())
  //   .then(data => {
  //       console.log(data);
  //       nav("/security-ops/grant-access")
  //   })
  //   .catch((error) => {
  //       console.error('Error:', error);
  //   });



  // }

  const location = useLocation();


  return (
    <MainLayout bgColor={Verified == false && "#EEEEEE"} >
      <Seo title='Security-Check-In-History' description='Security for LetMeIn' />


      <Box mx={["6%", "10%"]} mb="80px">

        <Center mt={"30px"} cursor="pointer" opacity={Verified == false && "0.07"}>

          <Box w={["85%", "50%", "50%", "67%", "40%"]} mb="82px">

        
          <Box mt="41px">
            <Headers text="Unchecked Out History" />
          </Box>

           

            <Flex justifyContent={"space-between"} flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}>

              <HistoryCard
                title="Total No of Access Request Granted"
                text="22"
              />
              <HistoryCard
                title="Most Frequent Days "
                text="Sat"
                fontSize='56px'
              />
            </Flex>




            <Select onChange={handleDuration} color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Duration ? "16px" : "12px"} fontWeight={"400"} placeholder='Duration' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="61px">
              <option value='Last-5'>Last 5</option>
              <option value='Last-10'>Last 10</option>
              <option value='Last-20'>Last 20</option>
              <option value='Last-30'>Last 30</option>

            </Select>
            <Box>

              <Stack spacing={"15px"} mt="32px">
                <Text bg="#EEEEEE" color="#000000" fontWeight={'400'} fontSize={"14px"} fontFamily="body" p="8px" textAlign={"left"}  >
                  Adebola Adeniran | Male | 08-May-22 | 5:45 pm
                </Text>
                <Text bg="#EEEEEE" color="#000000" fontWeight={'400'} fontSize={"14px"} fontFamily="body" p="8px" textAlign={"left"}  >
                  Adebola Adeniran | Male | 08-May-22 | 5:45 pm
                </Text>
                <Text bg="#EEEEEE" color="#000000" fontWeight={'400'} fontSize={"14px"} fontFamily="body" p="8px" textAlign={"left"}  >
                  Adebola Adeniran | Male | 08-May-22 | 5:45 pm
                </Text>
              </Stack>

              <Box mt={"20px"}>
                <Pagination />
              </Box>



            </Box>

          </Box>

        </Center>

        <BackBtn/>

      </Box>




      {
        Verified == false && (

          <Center mt="-100px">
            <DelayMsg />
          </Center>
        )
      }
      <Box pos="fixed" bottom={"0"} width="100%" display={["block", "none"]}>
      <SecurityNav path={location.pathname}/>
      </Box>
    </MainLayout>
  );
}
