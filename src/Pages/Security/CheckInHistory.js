import { Box, Center, Flex, HStack, Select, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function CheckInHistory() {

  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState({});
  const [CheckIn, setCheckIn] = useState(true);
  const [CheckOut, setCheckOut] = useState(false);
  const [Grant, setGrant] = useState(false);
  const [AccessCode, setAccessCode] = useState("");


  const onlineUser = useSelector((state) => state.onlineUser);
  const [Verified, setVerified] = useState(onlineUser.user.Verified);



  const handleCheckIn = () => {
    setCheckIn(true)
    setCheckOut(false)
  }

  const nav = useNavigate();
  const handleCheckOut = () => {

    setCheckIn(false)
    setCheckOut(true)

  }
  const handleAccess = (e) => {

    setAccessCode(e.target.value)

  }

  const payload = {

    method: "POST",

    headers: {
        "Content-Type": "application/JSON"
    },

    body: JSON.stringify(
      {accessCode: AccessCode }
    ),

}
  const VerifyCode = () => {

    setLoading(true)
  

    fetch('https://api.solomonleke.com.ng/user/verifyAccess',payload)
    .then(response => response.json())
    .then(data => {
        if (data.status == 200) {
          setLoading(false)
          setUser(data.user)
          setGrant(true)
          console.log("data", data)
        }else{
          console.log("not working " , data)
          setLoading(false)
        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

  }


  const grantAccess = () => {

    fetch('https://api.solomonleke.com.ng/user/CheckedIn',{

      method: "POST",
  
      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify(
        {_id: User._id }
      ),
  
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nav("/security-ops/grant-access")
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

   
  }

  const CheckOutVisitor = () => {

    fetch('https://api.solomonleke.com.ng/user/CheckedIn',{

      method: "POST",
  
      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify(
        {_id: User._id }
      ),
  
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nav("/security-ops/grant-access")
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

   
  }
  const handleDuration = ()=>{

  }



  return (
    <MainLayout bgColor={Verified == false && "#EEEEEE"} >
      <Seo title='Security-Check-In-History' description='Security for LetMeIn' />

      {
        Grant == false ? (
          <Center mt={"30px"} cursor="pointer" opacity={Verified == false && "0.2"}>

          <Box w={["80%", "79%","65%", "35%"]}>
  
           
  
            <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="25px">
              <Text w={"50%"} onClick={handleCheckIn} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckIn ? "#5BE3C9" : "#EEEEEE"} color={CheckIn ? "#424242": "#939393"}>Check in. History</Text>
              <Text w={"50%"} onClick={handleCheckOut} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckOut ? "#5BE3C9" : "#EEEEEE"} color={CheckOut ? "#424242" : "#939393"}>Check out. History</Text>
            </HStack>
  
           <Flex justifyContent={"space-between"} flexDir={["column", "row"]} mt={["12px","32px"]}>
           <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" w={["100%", "250px"]}>
           <Flex justifyContent="space-between">
               <Text display={"flex"} alignItems="center" justifyContent={"center"} textAlign="center" py="20px" w="60%" fontFamily="body" fontWeight={'400'} color="#939393" fontSize={"13px"} borderRight="1px solid #B7B7B7">Total No of Access Request Granted </Text>

               <Text fontFamily="body" display={"flex"} textAlign="center" alignItems="center" justifyContent={"center"} w="50%" fontWeight={'700'} color="#939393" fontSize={"53px"}>23</Text>


           </Flex>
           </Box>

         

           <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" w={["100%", "250px"]}>
           <Flex justifyContent="space-between">
               <Text display={"flex"} textAlign="center" alignItems="center" justifyContent={"center"} py="20px" w="60%" fontFamily="body" fontWeight={'400'} color="#939393" fontSize={"13px"} borderRight="1px solid #B7B7B7">Most Frequent <br/> Days  </Text>

               <Text fontFamily="body" textAlign="center" display={"flex"} alignItems="center" justifyContent={"center"}  w="50%" fontWeight={'700'} color="#939393" fontSize={"40px"}>Sat</Text>


           </Flex>
           </Box>
           </Flex>


           <Select onChange={handleDuration}  id="estateName" rounded="0"  _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize="12px" fontWeight={"400"}   placeholder='Enter Duration' bg={"#fff"} _hover={{bg: "#fff"}} w="100%" size={"lg"} mt="22px">
           <option value='Last 5'>Last 5</option>
           <option value='Last 10'>Last 10</option>
           <option value='Last 15'>Last 15</option>
           <option value='Last 20'>Last 20</option>
           <option value='from'>From - T0</option>
          
           </Select>

           <Text mt="32px" bg="#EEEEEE" color="#000000" fontWeight={'400'} fontSize={"14px"} fontFamily="body" p="8px" textAlign={"center"}  >
           Adebola Adeniran | Male | 08-May-22 | 5:45 pm
           </Text>
          </Box>
  
        </Center>

        ):(
            <Center>
            <Box w={["80%", "30%"]} mb="20px">
            <Box  bg="#FAFAFA" boxShadow={"0px 2px 8px rgba(177, 177, 177, 0.25)"} rounded='7px' px="13px" py="30px" mt="50px">
            <Text textAlign={"center"} fontSize={"24px"} fontFamily="body" fontWeight={"500"} color="#424242">Visitor Details</Text>

            <Stack mt="27px" spacing={"14px"}>

            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Visitor Name </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{User.firstName} {User.lastName}</Text>
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Visitor  Gender </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{User.gender}</Text>
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Resident Name </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{User.user_fName} {User.user_lName}</Text>
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Resident address </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{User.user_houseNo},  {User.user_streetName},  {User.user_estateName} </Text>
            </HStack>
             
            </Stack>
           
  
            </Box>
              <Button w={"100%"} isLoading={Loading} mb="10px" mt="55px"  onClick={CheckOut ? CheckOutVisitor : grantAccess}>{CheckOut ? "Check Out": "Grant Access"}</Button>
            </Box>
            

            </Center>
        )
      }

     

      {
        Verified == false && (

          <Center mt="-100px">
            <Box opacity={"1"} w={["80%", "35%"]} bg="#fff" px="22px" py="11px">
              <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">Just One Last Step...</Text>
              <Text pb="9px" fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">Your profile is going to be verified by your Estate Administrator.</Text>
              <hr />
              <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242" pt="9px">If this is taking too long...</Text>
              <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242">You can contact Mr. Jubril - <Box as="span" color={"#162B96"} textDecor="underline">08047589000</Box></Text>

            </Box>
          </Center>
        )
      }

    </MainLayout>
  );
}
