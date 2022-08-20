import { Box, Center, Flex, HStack, Select, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../Components/BackBtn';
import Button from '../../Components/Button';
import DelayMsg from '../../Components/DelayMsg';
import HistoryCard from '../../Components/HistoryCard';
import Input from '../../Components/Input';
import Pagination from '../../Components/Pagination';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function CheckOutHistory() {

  const [Loading, setLoading] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [CheckOut, setCheckOut] = useState(true);
  const [Duration, setDuration] = useState('');

  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const [Verified, setVerified] = useState(onlineUser.user.Verified);

  const handleDuration = (e)=>{
    setDuration(e.target.value)
  }

  const nav = useNavigate();

  const handleCheckIn = () => {
    setCheckIn(true)
    setCheckOut(false)
    nav("/security-ops/check-in-history")

  }

  
  const handleCheckOut = () => {

    setCheckIn(false)
    setCheckOut(true)
    nav("/security-ops/check-out-history")


  }

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

  const middleWare = ()=>{
    if(isLogged.isLogged !== true){
        nav("/sign-in")
    }

    if(onlineUser.user.userType !== "Security operative"){
      nav("/home")
    }
}
  useEffect(() => {
      middleWare()
  }, []);

  return (
    <MainLayout bgColor={Verified == false && "#EEEEEE"} >
      <Seo title='Security-Check-In-History' description='Security for LetMeIn' />


      <Box mx={["6%", "10%"]} mb="80px">

        <Center mt={"30px"} cursor="pointer" opacity={Verified == false && "0.07"}>

          <Box w={["85%", "50%", "50%", "67%", "40%"]} mb="82px">



            <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="25px">
              <Text w={"50%"} onClick={handleCheckIn} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckIn ? "#5BE3C9" : "#EEEEEE"} color={CheckIn ? "#424242" : "#939393"}>Check in. History</Text>
              <Text w={"50%"} onClick={handleCheckOut} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckOut ? "#5BE3C9" : "#EEEEEE"} color={CheckOut ? "#424242" : "#939393"}>Check out. History</Text>
            </HStack>


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

    </MainLayout>
  );
}
