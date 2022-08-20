import { Box, Center, Flex, Select, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import Button from '../Components/Button';
import CardList from '../Components/CardList';
import Headers from '../Components/Headers';
import HistoryCard from '../Components/HistoryCard';
import Pagination from '../Components/Pagination';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function RequestHistory() {
    const nav = useNavigate();
    const isLogged = useSelector((state) => state.isLogged);
    const [Duration, setDuration] = useState("")

    const handleDuration = (e)=>{
        setDuration(e.target.value)
    }

    const Continue = ()=>{
        // alert(Duration)
    }

    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
    }
    useEffect(() => {
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

                            <Box mt="30px">
                                <Text fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">Total - 10</Text>

                                <Stack spacing={"15px"} mt="15px">
                                    <CardList/>
                                    <CardList/>
                                    <CardList/>
                                </Stack>

                                <Box mt="20px">
                                    <Pagination/>
                                </Box>
                            </Box>

                            <Button mt="60px" onClick={Continue}>Continue</Button>
                        </Box>
                    </Box>
                </Center>

                <BackBtn/>
            </Box>
        </MainLayout>
    );
}
