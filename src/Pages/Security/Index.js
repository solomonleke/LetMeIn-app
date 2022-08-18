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
  const [Users, setUsers] = useState({});
  const [TypeOf, setTypeOf] = useState({});
  const [CheckIn, setCheckIn] = useState(true);
  const [CheckOut, setCheckOut] = useState(false);
  const [Grant, setGrant] = useState(false);
  const [AccessCode, setAccessCode] = useState("");
  const [Success, setSuccess] = useState(false);
  const [Message, setMessage] = useState("");
  const [SuccessOut, setSuccessOut] = useState(false);


  const onlineUser = useSelector((state) => state.onlineUser);
  // console.log("estatename", onlineUser.user.estateName)
  const [Verified, setVerified] = useState(true);
  // const [Verified, setVerified] = useState(onlineUser.user.Verified);
  const apiLink = useSelector((state) => state.apiLink);


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
      {  
        accessCode: AccessCode,
        estateName: onlineUser.user.estateName
      
      }
    ),

}
  const VerifyCode = () => {

    setLoading(true)
  

    fetch(`${apiLink.link}/user/verifyVisitor`,payload)
    .then(response => response.json())
    .then(data => {
        if (data.status == 200) {
          setTypeOf(data.msg.type_Request)
          if(data.msg.type_Request == "Single"){
            setLoading(false)
            setUser(data.msg)
            setUsers(data.msg.users)
            setGrant(true)
          }else if(data.msg.type_Request == "Multiple"){
            setLoading(false)
            setUser(data.msg)
            setUsers(data.msg.User_visitors)
            setGrant(true)
          }else if(data.msg.type_Request == "Taxi"){
            setLoading(false)
            setUser(data.msg)
            setUsers(data.msg.User_taxis)
            setGrant(true)
          }
         
         
          console.log("data", data)
        }else{  
          setSuccess(true)
          setMessage(data.msg)
          setLoading(false)
        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

  }


  const grantAccess = () => {
    setLoading(true)
    fetch(`${apiLink.link}/user/visitorCheckedIn`,{

      method: "POST",
  
      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify(
        {id: User.id }
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
       
      }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

   
  }

  const CheckOutVisitor = () => {
    setLoading(true)

    fetch(`${apiLink.link}/user/visitorCheckedOut`,{

      method: "POST",
  
      headers: {
          "Content-Type": "application/JSON"
      },
  
      body: JSON.stringify(
        {id: User.id }
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
              <Text w={"50%"} onClick={handleCheckIn} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckIn ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={CheckIn ? "#424242": "#939393"}>Check in.</Text>
              <Text w={"50%"} onClick={handleCheckOut} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={CheckOut ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={CheckOut ? "#424242" : "#939393"}>Check out.</Text>
            </HStack>
  
            <Box mt="38px" >
              <Input isDisabled={Verified ? false : true} w={"100%"} val={AccessCode && true} isRequired label="Access code" value={AccessCode} type='number' onChange={handleAccess} />
            </Box>
            {
              Success && (
                <Alert status='error' mt="15px"  color="#00000" >
                <AlertIcon/>
              <AlertTitle mr={2}>{Message}</AlertTitle>
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
            <Text textAlign={"center"} fontSize={"24px"} fontFamily="body" fontWeight={"500"} color="#424242">
            {TypeOf === "Single" ? "Visitor Details": TypeOf === "Multiple" ? "Multiple Visitor Details": "Taxi Details"}</Text>

            <Stack mt="27px" spacing={"14px"}>

            <HStack borderTop={"0.5px solid #A7A5A5"} pt="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242" w="30%">
            {TypeOf === "Single" ? "Visitor Name": TypeOf === "Multiple" ? "No of User Access": "Taxi Name"}
            </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">
            {TypeOf === "Single" ? `${User.firstName||""}  ${User.lastName||""}`: TypeOf === "Multiple" ? `${User.number_Visitors}`: `${User.visitorName}`}</Text>
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"} >
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242" w="30%">
            {TypeOf === "Single" ? "Visitor  Gender": TypeOf === "Multiple" ? "Code Word": "Plate Number"}
           </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">
            {TypeOf === "Single" ? `${User.gender} `: TypeOf === "Multiple" ? `${User.codeName}`: `${User.plateNumber}`}</Text>
            
            
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242" w="30%">Resident Name </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{Users.firstName} {Users.lastName}</Text>
            </HStack>

            <HStack borderTop={"0.5px solid #A7A5A5"} py="18px" spacing={"20px"}>
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"400"} color="#424242" w="30%">Resident address </Text>
           
            <Text fontSize={"14px"} fontFamily="body" fontWeight={"700"} color="#424242">{Users.houseNo},  {Users.streetName},  {Users.estateName} </Text>
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
