import { Alert, AlertIcon, AlertTitle, Box, Center, CloseButton, Flex, HStack, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function SecurityOps() {

  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState({});
  const [CheckIn, setCheckIn] = useState(true);
  const [CheckOut, setCheckOut] = useState(false);
  const [Grant, setGrant] = useState(false);
  const [AccessCode, setAccessCode] = useState("");
  const [Success, setSuccess] = useState(false);
  const [SuccessOut, setSuccessOut] = useState(false);


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
          setSuccess(true)
          setLoading(false)
        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

  }


  const grantAccess = () => {
    setLoading(true)
    fetch('https://api.solomonleke.com.ng/user/userCheckedIn',{

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
      if(data.status === 200){

        console.log(data);
        nav("/security-ops/grant-access")
        setLoading(false)

      }else{
        setSuccess(true)
        setLoading(false)
        console.log(data);
      }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

   
  }

  const CheckOutVisitor = () => {
    setLoading(true)

    fetch('https://api.solomonleke.com.ng/user/userCheckedOut',{

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
      
        if(data.status === 200){
          setTimeout(() => {
           nav("/security-ops")
           setGrant(false)
          }, 3000)

          setLoading(false)
          setSuccessOut(true)
   
        }else{
          setLoading(false)
          console.log(data);
        }
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

   
  }



  return (
    <MainLayout bgColor={Verified == false && "#EEEEEE"} >
      <Seo title='Security' description='Security for LetMeIn' />

      {
        Grant == false ? (
          <Center mt={"70px"} cursor="pointer" opacity={Verified == false && "0.2"}>

          <Box w={["80%", "35%"]}>
  
            <Box>
              <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} fontStyle="italic" color="#000000">Hello,</Text>
              <Text fontSize={"24px"} fontFamily="body" fontWeight={"700"} color="#000000">Officer. {onlineUser.user.lastName}</Text>
            </Box>
  
            <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="25px">
              <Text w={"50%"} onClick={handleCheckIn} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckIn ? "#5BE3C9" : "#EEEEEE"} color={CheckIn ? "#424242": "#939393"}>Check in.</Text>
              <Text w={"50%"} onClick={handleCheckOut} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckOut ? "#5BE3C9" : "#EEEEEE"} color={CheckOut ? "#424242" : "#939393"}>Check out.</Text>
            </HStack>
  
            <Box mt="38px" >
              <Input isDisabled={Verified ? false : true} w={"100%"} val={AccessCode && true} isRequired label="Access code" value={AccessCode} type='number' onChange={handleAccess} />
            </Box>
            {
              Success && (
                <Alert status='error' mt="15px"  color="#00000" >
                <AlertIcon/>
                <AlertTitle mr={2}>This Access Code may have expired or incorrect, Please contact the Resident to generate a new Access code</AlertTitle>
                <CloseButton onClick={() => setSuccess(false)} position='absolute' right='8px' top='8px' />
                 </Alert>
              )
            }
          
  
            <Button w={"100%"} isLoading={Loading} mb="32px" mt="15px" disabled={AccessCode !== "" ? false : true} onClick={VerifyCode}>Verify</Button>


           
          </Box>
  
        </Center>

        ):(
            <Center>
            <Box w={["80%","70%", "40%", "30%"]} mb="20px">
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
            {
              Success && (
                <Alert status='info' mt="15px"  color="#00000" >
                <AlertIcon/>
                <AlertTitle mr={2}>User already Checked In</AlertTitle>
                <CloseButton onClick={() => setSuccess(false)} position='absolute' right='8px' top='8px' />
                 </Alert>
              )
            }

            {
              SuccessOut && (
                <Alert status='success' mt="15px"  color="#fff" >
                <AlertIcon/>
                <AlertTitle mr={2}>User Checked out Successfully</AlertTitle>
                <CloseButton onClick={() => setSuccessOut(false)} position='absolute' right='8px' top='8px' />
                 </Alert>
              )
            }


              <Button w={"100%"} isLoading={Loading} mb="10px" mt="35px"  onClick={CheckOut ? CheckOutVisitor : grantAccess}>{CheckOut ? "Check Out": "Grant Access"}</Button>
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
