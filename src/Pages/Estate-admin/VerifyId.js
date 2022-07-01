import { Box, Center, Flex, HStack, Spacer, Stack, Switch, Text } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function VerifyId() {
    const [Resident, setResident] = useState(false);
    const [Landlord, setLandlord] = useState(false);
    const [Data, setData] = useState([]);
    const [Security, setSecurity] = useState(false);
    const [Show, setShow] = useState(true);
    const [Checked, setChecked] = useState(false);

    const [ResidentLen, setResidentLen] = useState("");
    const [LandlordLen, setLandlordLen] = useState("");
    const [SecurityLen, setSecurityLen] = useState("");



    const checkLength = ()=>{

        fetch('https://api.solomonleke.com.ng/user/endUser')
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {

                setResidentLen(data.resident?.length)
                setLandlordLen(data.landlord?.length)
                setSecurityLen(data.security_OPs?.length)
            }
          
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    }


    const handleChange = (e) => {


        setChecked(e.target.checked)
       

       
    }

    

    const update_status = (id)=> {

 



        if(Checked == false){

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
              
            })
    
            .catch((error) => {
                console.error('Error:', error);
            });

          
        }else{


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
              
            })
    
            .catch((error) => {
                console.error('Error:', error);
            });
        }


       
    }


    const handleLandlord = () => {

        setData([])

        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.landlord)
                }
                setShow(false)
                setLandlord(true)
                setResident(false)
                setSecurity(false)


             
            })

            
            .catch((error) => {
                console.error('Error:', error);
            });

       
    }
    const handleResident = () => {
        setData([])
        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.resident)
                }
                setShow(false)
                setLandlord(false)
                setResident(true)
                setSecurity(false)

               
            })

            .catch((error) => {
                console.error('Error:', error);
            });


      
    }
    const handleSecurity = () => {

        setData([])
        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.security_OPs)
                }
                setShow(false)
                setLandlord(false)
                setResident(false)
                setSecurity(true)

               
            })

            .catch((error) => {
                console.error('Error:', error);
            });


       
    }

    const back = () => {
        setShow(true)
    }

    const VerifyAll = () => {
        setChecked(true)
    }


    useEffect(() => {

        checkLength()

    }, [Checked]);
    return (
        <MainLayout>
            <Seo title="Verify IDs" description='Verify IDs' />


            {
                Show ? (
                    <Center mt={["100px", "131px"]}>
                        <Box>
                            <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#575757" textAlign={"center"}>Verify IDs</Text>
                            <Stack spacing={'15px'} cursor="pointer" mt="39px">


                                <Text color={"#939393"}>Select ID Category you intend to Verify</Text>

                                <Box pos={"relative"}>
                                    <Button onClick={handleLandlord}>LandLord</Button>
                                    <Text h={"18px"} w={"18px"}
                                        rounded={"100%"} bg="#EDEDED"
                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                        pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                        fontSize={"12"}>{LandlordLen}</Text>
                                </Box>
                                <Box pos={"relative"}>
                                    <Button onClick={handleResident}>Resident</Button>
                                    <Text h={"18px"} w={"18px"}
                                        rounded={"100%"} bg="#EDEDED"
                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                        pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                        fontSize={"12"}>{ResidentLen}</Text>
                                </Box>
                                <Box pos={"relative"}>
                                    <Button onClick={handleSecurity}>Security</Button>
                                    <Text h={"18px"} w={"18px"}
                                        rounded={"100%"} bg="#EDEDED"
                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                        pos="absolute" right="-8px" top="-8px" pt="1px" textAlign={"center"}
                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                        fontSize={"12"}>{SecurityLen}</Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Center>
                ) : (
                    <Center mt={["100px", "131px"]} >

                        <Box>
                            <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#575757" textAlign={"center"}>Verify IDs</Text>
                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#575757" mt="-8px" textAlign={"center"}>
                                {Resident ? "Resident" : Landlord ? "Landlord" : Security && "Security"}</Text>


                            {
                                Data.length <= 0 ? (

                                    <Text fontFamily={"body"} fontSize="24px" mt="32px" fontWeight={"400"} color="#000000">No Record</Text>

                                ) : (

                                    <Box px={["1%","5%","5%","0%"]}>
                                        <Stack spacing={'14px'} cursor="pointer" mt="18px" >

                                            {
                                                Data?.map((item, i) => (

                                                    <HStack spacing="39px" bg={item.Verified == true? ("#96F4E2") : ("#D6D6D6")} px={"15px"} py="5px" onClick={()=>update_status(item._id)}>
                                                        <Box>
                                                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">{item.firstName} {item.lastName}</Text>
                                                            <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">{item.address} | 0{item.phone}</Text>

                                                        </Box>
                                                    <Spacer/>

                                                        <Switch onChange={handleChange}  colorScheme='teal' size='lg' />
                                                    </HStack>


                                                ))
                                            }

                                        </Stack>
                                        <Button mb="32px" mt="65px" onClick={VerifyAll} >Verify All</Button>

                                    </Box>




                                )
                            }






                        </Box>
                    </Center>

                )
            }


            {
                Show == false && (
                    <Box mx={["6%", "10%"]} mt='32px' mb="20px">
                        <Text cursor={"pointer"} fontFamily={"body"} fontSize="16px" fontWeight={"700"} color="#ffffff" bg="#E02828" p="5px" textAlign={"center"} w={["20%", "15%", "8%"]} onClick={back}>Back</Text>
                    </Box>
                )
            }

        </MainLayout>
    );
}
