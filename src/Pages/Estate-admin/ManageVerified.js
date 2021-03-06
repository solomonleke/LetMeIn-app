import { Box, Center, Flex, HStack, Select, Spacer, Stack, Switch, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function ManageVerified() {

    const [Data, setData] = useState([]);
    const [VerifiedLen, setVerifiedLen] = useState("");
    const [Checked, setChecked] = useState(false);
    const [Category, setCategory] = useState("category");
    const [Duration, setDuration] = useState("");

    const handleCategory = (e) => {
        setCategory(e.target.value)

        fetch('https://api.solomonleke.com.ng/user/verifiedUser')

        .then(response => response.json())
        .then(data => {


            if (data.status == 200) {

                setVerifiedLen(data.landlord?.length + data.resident?.length + data.security_OPs?.length);

                if(e.target.value == "Security" ){
                    setData(data.security_OPs)
               }else if(e.target.value == "Resident"){
                   setData(data.resident)
               }else if(e.target.value == "LandLord"){
                setData(data.landlord)
            }   
            }
          
            console.log("verifiedUser", data)

            
        })
        
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }
    console.log("Category", Category);

    const handleDuration = (e) => {
        setDuration(e.target.value)
        
    }
    console.log("Duration", Duration);

    const update_status = (id) => {


        fetch('https://api.solomonleke.com.ng/user/toggleUser', {

            method: "POST",
    
            headers: {
                "Content-Type": "application/JSON"
            },
    
            body: JSON.stringify({_id: id}),
    
        })

        .then(response => response.json())
        .then(data => {

           console.log("data", data)

           setChecked(!Checked)
          
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    }


    const handleChange = (e) => {
        
    }
   
    const verifiedUser = ()=>{


        fetch('https://api.solomonleke.com.ng/user/verifiedUser')

        .then(response => response.json())
        .then(data => {


            if (data.status == 200) {

                setVerifiedLen(data.landlord?.length + data.resident?.length + data.security_OPs?.length)

               
            }
          
            
        })
        
        .catch((error) => {
            console.error('Error:', error);
        });

       
    }

    const item = [
        {
            id: 1,
            firstName: "paul",
            lastName: "Adeleke",
            address: "34 sdjsdj alas",
            phone: 939877654678
        },

        {
            id: 2,
            firstName: "Solomon",
            lastName: "Adeleke",
            address: "34 okota, Nigeria",
            phone: 939877654678
        }, 
            {
            id: 3,
            firstName: "Solomon",
            lastName: "Smooth",
            address: "34 okota, Nigeria",
            phone: 939877654678
        },
    ]

    useEffect(() => {
        verifiedUser()
    }, [Category,Duration,Checked]);

    return (
        <MainLayout>
            <Seo title="Manage Verify IDs" description='Manage Verify IDs' />


            <Center>
                <Box>

                    <Text mt={["76.71px", "120px"]} fontFamily="body" fontWeight={'700'} color="#575757" fontSize={"20px"} textAlign="center">Manage Verified IDs</Text>


                    <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" w={["100%", "250px"]}>
                        <Flex justifyContent="space-between">
                            <Text textAlign="center" py="20px" w="60%" fontFamily="body" fontWeight={'400'} color="#939393" fontSize={"13px"} borderRight="1px solid #B7B7B7">Total no. <br /> of Verified IDs</Text>

                            <Text fontFamily="body" textAlign="center" w="50%" fontWeight={'700'} color="#939393" fontSize={"53px"}>{VerifiedLen}</Text>


                        </Flex>
                    </Box>

                    <Select onChange={handleCategory} id="userType" rounded="0" color={"#939393"} fontFamily={"body"} fontSize="12px" fontWeight={"400"} placeholder='Category' bg={"#EEEEEE"} _hover={{ bg: "#EEEEEE" }} w="250px" size={"lg"} mt="32px">
                        <option value='Security'>Security Operative</option>
                        <option value='LandLord'>LandLord</option>
                        <option value='Resident'>Resident</option>
                    </Select>

                    <Select onChange={handleDuration} id="userType" rounded="0" color={"#939393"} fontFamily={"body"} fontSize="12px" fontWeight={"400"} placeholder='Enter Duration' bg={"#EEEEEE"} _hover={{ bg: "#EEEEEE" }} w="250px" size={"lg"} mt="19px">
                        <option value='Last-5'>Last 5</option>
                        <option value='Last-10'>Last 10</option>
                        <option value='Last-20'>Last 20</option>
                        <option value='Last-30'>Last 30</option>

                    </Select>




                </Box>
            </Center>

            <Center>
                <Box px={["1%", "5%", "5%", "0%"]} >
                    <Stack spacing={'12px'} cursor="pointer" mt="29px" >
                    {
                       Data?.map((item, i)=>(
                            <HStack spacing="39px" bg={item.Verified == true ? ("#96F4E2") : ("#D6D6D6")} px={"15px"} py="5px" onClick={() => update_status(item._id)}>
                            <Box>
                                <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">{item.firstName} {item.lastName}</Text>
                                <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">{item.address} | 0{item.phone}</Text>

                            </Box>
                            <Spacer />

                            <Switch onChange={handleChange} isChecked={item.Verified == true}  colorScheme='teal' size='lg' />
                        </HStack>

                        ))
                    }
                       

                    </Stack>
                </Box>
            </Center>

        </MainLayout>
    );
}
