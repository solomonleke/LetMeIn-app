import { Box, Center, Flex, HStack, Select, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../Components/BackBtn';
import Button from '../../Components/Button';
import CardList from '../../Components/CardList';
import DelayMsg from '../../Components/DelayMsg';
import HistoryCard from '../../Components/HistoryCard';
import Input from '../../Components/Input';
import MultipleCard from '../../Components/MultipleCard';
import Pagination from '../../Components/Pagination';
import TaxiCard from '../../Components/TaxiCard';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import moment from 'moment';

export default function CheckOutHistory() {

  const [Loading, setLoading] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [CheckOut, setCheckOut] = useState(true);
  const [Duration, setDuration] = useState('');

  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const [Verified, setVerified] = useState(onlineUser.user.Verified);
  const [RequestType, setRequestType] = useState("")
  const [RequestLen, setRequestLen] = useState("")
  const [Data, setData] = useState("")
  const [User, setUser] = useState("")
  const [SingleLen, setSingleLen] = useState("")
  const [MultipleLen, setMultipleLen] = useState("")
  const [TaxiLen, setTaxiLen] = useState("")
 
  const apiLink = useSelector((state) => state.apiLink);

  const [Show, setShow] = useState(false)

  const handleDuration = (e) => {
    setShow(false)
    setDuration(e.target.value)
  }

  const handleTypeof = (e) => {
    setShow(false)
    setRequestType(e.target.value)
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





  const middleWare = () => {
    if (isLogged.isLogged !== true) {
      nav("/sign-in")
    }

    if (onlineUser.user.userType !== "Security operative") {
      nav("/home")
    }
  }

  const Continue =()=>{
    setLoading(true)

    if(RequestType  == "Single Access"){

      fetch(`${apiLink.link}/user/checkOutHistory_Single/${onlineUser.user.estateName}`)
      .then(res => res.json())
      .then(json => {
        
        console.log("checkHistory", json)
        if (json.status == 200) {
          
          setLoading(false)
          setData(json.checkedOut_visitor)
          setShow(true)
        } else {
          alert(json.message)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("error", error);
      })

    }else if(RequestType  == "Multiple Access"){

      fetch(`${apiLink.link}/user/checkOutHistory_Multiple/${onlineUser.user.estateName}`)
      .then(res => res.json())
      .then(json => {
        
        console.log("checkHistory", json)
        if (json.status == 200) {
         
          setLoading(false)
          setData(json.checkedOut_Multiple)
          setShow(true)
        } else {
          alert(json.message)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("error", error);
      })
    } else if(RequestType  == "Taxi Access"){

      fetch(`${apiLink.link}/user/checkOutHistory_Taxi/${onlineUser.user.estateName}`)
      .then(res => res.json())
      .then(json => {
        
        console.log("checkHistory", json)
        if (json.status == 200) {
          setLoading(false)
          setData(json.checkedOut_Taxi)
          setShow(true)
        } else {
          alert(json.message)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("error", error);
      })
    }

  
  }

  const checkLen = ()=>{
    fetch(`${apiLink.link}/user/checkOutHistory_Single/${onlineUser.user.estateName}`)
    .then(res => res.json())
    .then(json => {
      if (json.status == 200) {
        setSingleLen(json.checkedOut_visitor.length)
      } else {
        alert(json.message)
        setLoading(false)
      }
    })
    .catch(error => {
      console.log("error", error);
    })
    fetch(`${apiLink.link}/user/checkOutHistory_Multiple/${onlineUser.user.estateName}`)
    .then(res => res.json())
    .then(json => {
      if (json.status == 200) {
        setMultipleLen(json.checkedOut_Multiple.length)
      } else {
        alert(json.message)
        setLoading(false)
      }
    })
    .catch(error => {
      console.log("error", error);
    })
    fetch(`${apiLink.link}/user/checkOutHistory_Taxi/${onlineUser.user.estateName}`)
    .then(res => res.json())
    .then(json => {
      if (json.status == 200) {
        setTaxiLen(json.checkedOut_Taxi.length)
      } else {
        alert(json.message)
        setLoading(false)
      }
    })
    .catch(error => {
      console.log("error", error);
    })

  }




  useEffect(() => {
    checkLen()
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
                text={SingleLen + TaxiLen + MultipleLen}
              />
              <HistoryCard
                title="Most Frequent Days "
                text="Sat"
                fontSize='56px'
              />
            </Flex>


            <Select onChange={handleTypeof} color="#000000" rounded="0" value={RequestType} _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={RequestType ? "16px" : "12px"} fontWeight={"400"} placeholder='Request Type' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="61px">
            <option value='Single Access'>Single Access</option>
            <option value='Multiple Access'>Multiple Access</option>
            <option value='Taxi Access'>Taxi Access</option>
          
           </Select>


            <Select onChange={handleDuration} color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Duration ? "16px" : "12px"} fontWeight={"400"} placeholder='Duration' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="20px">
              <option value='Last-10'>Last 10</option>
              <option value='Last-20'>Last 20</option>
              <option value='Last-30'>Last 30</option>

            </Select>
            <Box>

            {
              Show && (
                <Stack spacing={"15px"} mt="32px">
            
                {
                  RequestType == "Single Access" && (

                    Data?.map((item,i)=>(
                      <CardList
                      firstName ={item.firstName}
                      lastName={item.lastName}
                      gender={item.gender}
                      date={moment(item.createdAt).format('ll')}
                      houseNo={item.users.houseNo}
                      streetName={item.users.streetName}
                      />

                    ))
          
                  )
                }
                   

                {
                  RequestType == "Multiple Access" && (

                    Data?.map((item,i)=>(
                      <MultipleCard 
                      codeword ={item.codeName}
                      numberAccess={item.number_Visitors}
                      date={moment(item.createdAt).format('ll')}
                      houseNo={item.User_visitors.houseNo}
                      streetName={item.User_visitors.streetName}
                      />
                    ))

                    
                  )
                }
                  
                    {
                      RequestType == "Taxi Access" && (
                        Data?.map((item,i)=>(
                          <TaxiCard
                          name ={item.visitorName}
                          plateNo={item.plateNumber}
                          date={moment(item.createdAt).format('ll')}
                          houseNo={item.User_taxis.houseNo}
                          streetName={item.User_taxis.streetName}
                          />
                        ))
                      
                      )
                    }
      
                 
                    
                    </Stack>
              )
            }
              

              <Box mt={"20px"}>
                <Pagination />
              </Box>

              <Button mt="60px" isLoading={Loading} onClick={Continue}>Continue</Button>

            </Box>

          </Box>

        </Center>

        <BackBtn onclick={()=>nav("/home")}/>

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
