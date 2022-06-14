import { Box, Center, Flex, HStack, Stack, Switch, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';

export default function VerifyId() {
    const [Resident, setResident] = useState(false);
    const [Landlord, setLandlord] = useState(false);
    const [Security, setSecurity] = useState(false);
    const [Show, setShow] = useState(true);
    const [Checked, setChecked] = useState("");

    const handleChange = (e)=> {
        setChecked(e.target.checked)
        console.log("checked", Checked);
    }

    const handleLandlord = ()=>{
        setShow(false)
        setLandlord(true)
        setResident(false)
        setSecurity(false)
    }
    const handleResident = ()=>{
        setShow(false)
        setLandlord(false)
        setResident(true)
        setSecurity(false)
    }
    const handleSecurity = ()=>{
        setShow(false)
        setLandlord(false)
        setResident(false)
        setSecurity(true)
    }

    const back = ()=>{
        setShow(true)
    }

    const VerifyAll = ()=> {
        setChecked(true)
    }
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
                                    fontSize={"12"}>8</Text>
                            </Box>
                            <Box pos={"relative"}>
                                <Button onClick={handleResident}>Resident</Button>
                                <Text h={"18px"} w={"18px"}
                                    rounded={"100%"} bg="#EDEDED"
                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                    pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                    fontSize={"12"}>8</Text>
                            </Box>
                            <Box pos={"relative"}>
                                <Button onClick={handleSecurity}>Security</Button>
                                <Text h={"18px"} w={"18px"}
                                    rounded={"100%"} bg="#EDEDED"
                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                    pos="absolute" right="-8px" top="-8px"  pt="1px" textAlign={"center"}
                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                    fontSize={"12"}> 8</Text>
                            </Box>
                        </Stack>
                    </Box>
                </Center>
                ): (
                    <Center mt={["100px", "131px"]}>
            
                    <Box>
                         <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#575757" textAlign={"center"}>Verify IDs</Text>
                         <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#575757" mt="-8px" textAlign={"center"}>
                         {Resident ? "Resident": Landlord ? "Landlord" : Security && "Security"}</Text>
    
                         <Stack spacing={'14px'} cursor="pointer" mt="18px">
                         <HStack spacing="39px" bg={Checked ? ("#96F4E2"):("#D6D6D6")} px={"15px"} py="5px">
                             <Box>
                                 <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">Adebola Adeniran</Text>
                                 <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no 4, Ademola street I 08012345610</Text>
    
                             </Box>
    
    
                             <Switch onChange={handleChange} colorScheme='teal' size='lg' />
                         </HStack>
                         <HStack spacing="39px" bg={Checked ? ("#96F4E2"):("#D6D6D6")} px={"15px"} py="5px">
                             <Box>
                                 <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">Adebola Adeniran</Text>
                                 <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no 4, Ademola street I 08012345610</Text>
    
                             </Box>
    
    
                             <Switch onChange={handleChange} colorScheme='teal' size='lg' />
                         </HStack>
                         <HStack spacing="39px" bg={Checked ? ("#96F4E2"):("#D6D6D6")} px={"15px"} py="5px">
                             <Box>
                                 <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">Adebola Adeniran</Text>
                                 <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no 4, Ademola street I 08012345610</Text>
    
                             </Box>
    
    
                             <Switch onChange={handleChange} colorScheme='teal' size='lg' />
                         </HStack>
                         <HStack spacing="39px" bg={Checked ? ("#96F4E2"):("#D6D6D6")} px={"15px"} py="5px">
                             <Box>
                                 <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">Adebola Adeniran</Text>
                                 <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no 4, Ademola street I 08012345610</Text>
    
                             </Box>
    
    
                             <Switch onChange={handleChange} colorScheme='teal' size='lg' />
                         </HStack>
                         </Stack>
    
                         <Button  mb="32px" mt="65px" onClick={VerifyAll} >Verify All</Button>
                    </Box>
                </Center>
    
                )
            }


            {
                Show == false && (
                    <Box mx={["6%", "10%"]} mt='32px' mb="20px">
                    <Text cursor={"pointer"} fontFamily={"body"} fontSize="16px" fontWeight={"700"} color="#ffffff" bg="#E02828" p="5px" textAlign={"center"} w={["20%","15%","8%"]} onClick={back}>Back</Text>
                </Box>
                )
            }
           
        </MainLayout>
    );
}