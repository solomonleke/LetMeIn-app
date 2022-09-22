import { Box, Center, Flex, Select, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Button from '../Components/Button';
import CardList from '../Components/CardList';
import Headers from '../Components/Headers';
import HistoryCard from '../Components/HistoryCard';
import MultipleCard from '../Components/MultipleCard';
import Pagination from '../Components/Pagination';
import TaxiCard from '../Components/TaxiCard';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';
import TaxiAccess from './TaxiAccess';


export default function RequestHistory() {
    const nav = useNavigate();
    const isLogged = useSelector((state) => state.isLogged);
    const [Duration, setDuration] = useState("")
    const [RequestType, setRequestType] = useState("")
    const [RequestLen, setRequestLen] = useState("")
    const [TotalLen, setTotalLen] = useState("")
    const [Show, setShow] = useState(false)
    const [Data, setData] = useState([])
    const [User, setUser] = useState("")
    const [Loading, setLoading] = useState(false)
    const apiLink = useSelector((state) => state.apiLink);
    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);



    const handleDuration = (e)=>{
        setDuration(e.target.value)
    }
    const handleTypeof = (e)=>{
        setRequestType(e.target.value)
        setShow(false)
    }

    const Continue = ()=>{
        // alert(RequestType)
        setLoading(true)
       
        fetch(`${apiLink.link}/user/accessHistory/${onlineUser.user.id}`)
        .then(res => res.json())
        .then(json => {
          console.log("accessHistory", json)


          if (json.status == 200) {
           
            setUser(json.singleVisitor)
            setLoading(false)
            setShow(true)
            if(RequestType  == "Single Access"){
                setData(json.singleVisitor.users)
                setRequestLen(json.singleVisitor.users.length)
            }else if(RequestType  == "Multiple Access"){
                setData(json.singleVisitor.User_visitors)
                setRequestLen(json.singleVisitor.User_visitors.length)
            }else if(RequestType  == "Taxi Access"){
                setData(json.singleVisitor.User_taxis)
                setRequestLen(json.singleVisitor.User_taxis.length)
            }

           
  
          } else {
            alert(json.message)
            setLoading(false)
          }
        })
        .catch(error => {
          console.log("error", error);
        })
    }

    const checkLen = ()=>{
        fetch(`${apiLink.link}/user/accessHistory/${onlineUser.user.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.status == 200) {
           
            setTotalLen(
                json.singleVisitor.users.length + json.singleVisitor.User_visitors.length + json.singleVisitor.User_taxis.length
            )
          } else {
            alert(json.message)
            setLoading(false)
          }
        })
        .catch(error => {
          console.log("error", error);
        })
    }

    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
        if(onlineUser.user.userType !== "Estate manager"){
            if(Verified == false){
                nav("/home")
            }
        }
       
    }
    useEffect(() => {
        checkLen()
        middleWare()
    }, []);
    return (
        <MainLayout>
            <Seo title="Request Access History" description='Request Access History' />
            <Box mx={["6%", "10%"]}>
                <Center>
                    <Box w={["80%", "50%", "50%", "67%", "40%"]} mb="82px">
                        <Box mt="41px">
                            <Headers text={"Request Access History"} />

                            <Flex justifyContent={"space-between"} flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}>

                                <HistoryCard
                                    title="Total No of Access Request Granted"
                                    text={TotalLen}
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


                            <Select onChange={handleDuration} color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} value={Duration} fontFamily={"body"} fontSize={Duration ? "16px" : "12px"} fontWeight={"400"} placeholder='Duration' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="20px">
                                <option value='Last-5'>Last 5</option>
                                <option value='Last-10'>Last 10</option>
                                <option value='Last-20'>Last 20</option>
                                <option value='Last-30'>Last 30</option>

                            </Select>

                            <Box mt="30px">
                            {
                                Show && (

                                    <Text fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">Total - {RequestLen}</Text>
                                )   
                            }

                                {
                                    Show && (
                                        <Stack spacing={"15px"} mt="15px">

                                {
                                    RequestType == "Single Access" && (
                                        Data?.map((item, i)=>(
                                        <CardList
                                        firstName ={item.firstName}
                                        lastName={item.lastName}
                                        gender={item.gender}
                                        date={moment(item.createdAt).format('ll')}
                                        houseNo={User.houseNo}
                                        streetName={`Access Code ${item.accessCode}`}
                                        />

                                        ))

                                        
                                    )
                                }

                                {
                                    RequestType == "Multiple Access" && (

                                        Data?.map((item, i)=>(
                                        <MultipleCard 
                                        codeword ={item.codeName}
                                        numberAccess={item.number_Visitors}
                                        date={moment(item.createdAt).format('ll')}
                                        houseNo={User.houseNo}
                                        streetName={`Access Code ${item.accessCode}`}
                                        />
                                        ))
                                        
                                    )
                                }

                                {
                                    RequestType == "Taxi Access" && (
                              
                                 Data?.map((item, i)=>(
                                    <TaxiCard
                                    name ={item.visitorName}
                                    plateNo={item.plateNumber}
                                    date={moment(item.createdAt).format('ll')}
                                    houseNo={User.houseNo}
                                    streetName={`Access Code ${item.accessCode}`}
                                    />
                                 ))
                                    

                                    )
                                }

                                  

                                 

                                </Stack>
                                    )

                                    
                                }

                                

                                <Box mt="20px">
                                  `
                                </Box>
                            </Box>

                            <Button mt="60px" isLoading={Loading} onClick={Continue}>Continue</Button>
                        </Box>
                    </Box>
                </Center>

                <BackBtn/>
            </Box>
        </MainLayout>
    );
}
