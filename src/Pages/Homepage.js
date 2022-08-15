import { Box, Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import HomeNav from '../Layouts/HomeNav';

export default function Homepage() {
    const nav = useNavigate();

    const getStarted = () => {
        nav("/home")
    }
    return (
        <Box w="100%">
            <Box bg="url(/landing_bg.png)" w="100%" minH={"100vh"} h={["auto", "auto", "auto", "auto"]} bgRepeat={"none"} bgSize="cover" pb={"32px"} pt="34.5px" px={["6%", "10%"]}>
                <HomeNav />

                <Flex mt={["32px", "71px"]} justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]} alignItems="flex-start">
                    <Box w={["100%", "100%", "100%", "50%"]}>
                        <Text mt={["0", "20px"]} fontSize={["40px", "50px", "60px", "70px"]} fontFamily="body" fontWeight={"800"} lineHeight={"82.03px"} color="#ffffff">Control Access to your Home with our Reliable Digital Security </Text>

                        <Button onClick={getStarted} mb={["32px", "32px", "32px", "0"]} fontSize={["18px", "23px", "25px", "30px"]} fontFamily="body" fontWeight={"800"} rounded={"0"} bg="linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" mt="69px" color="#000000" py="14px" px="37px">Get Started</Button>
                    </Box>
                    <Flex w={["100%", "100%", "100%", "50%"]} justifyContent={["center", "center", "center", "flex-end"]}>
                        <Image src="/iphone1.png" w={["100%", "70%"]} />
                    </Flex>
                </Flex>
            </Box>

            <Box px={["6%", "10%"]} mt={["32px", "71px"]} pb="32px">
                <div id="our-product">
                    <Text as={"span"} pb="4px" borderBottom={"3px solid #50FCDA"} textTransform={"capitalize"} fontFamily="body" fontWeight={"500"} fontSize="27px" color="#E02828">our product</Text>

                    <Flex mt="68px" justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]}>

                        <Flex w={["100%","100%","100%","35%"]} flexDir={"row"} justifyContent={["center", "center", "center", "flex-start"]}>
                            <Box>
                            <Text fontFamily="body" fontWeight={"700"} fontSize="20px" color="#B7B7B7" textAlign={"center"} pb="10px">Resident App</Text>
                                <Image w="186.3px" src="/left-iphone.png" />

                                <Box>
                                <Text fontFamily="body" fontWeight={"700"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">LetMeIn Resident App  </Text>
                                <Text mt="-12px" fontFamily="body" fontWeight={"400"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">allows residents generate unique <br/> access codes for visiting Guests</Text>
         
                                </Box>
                               
                            </Box>
                        </Flex>

                        <Flex  flexDir={"row"} justifyContent={["center", "center", "center", "flex-end"]}>
                           
                            <Box pos={"relative"} mt="90px" >
                            <Box display={["none", "none", "none", "flex"]} pos="absolute" left={"-110%"} top="35%" borderBottom="2px dashed #A4A4A4" w="110%">  </Box>
                            <Image w="250px" src="/red-glow.png" />
                            <Box display={["none", "none", "none", "flex"]} pos="absolute" borderBottom="2px dashed #A4A4A4" right={"-106%"} top="35%" w="104%">  </Box>
                            </Box>
                        </Flex>

                        <Flex w={["100%","100%","100%","35%"]} flexDir={"row"} justifyContent={["center", "center", "center", "flex-end"]} mt={["90px","90px","90px","0"]} alignItems="flex-start">
                            <Box>
                            <Text fontFamily="body" fontWeight={"700"} fontSize="20px" color="#B7B7B7" textAlign={"center"} pb="10px">Security Operative App</Text>

                                <Image w="186.3px" src="/right-iphone.png" ml="16px" />
                                <Box>
                                <Text fontFamily="body" fontWeight={"700"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">LetMeIn Security Operative App </Text>
                                <Text mt="-12px" fontFamily="body" fontWeight={"400"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">uses the unique access code provided by <br/> Guests to permit residents into an Estate</Text>
         
                                </Box>
                               

                            </Box>
                        </Flex>

                    </Flex>
                </div>

            </Box>

            <Box bg="url(/product-bg.png)" w="100%" px={["6%", "10%"]} pt="34px" bgRepeat={"none"} bgSize="cover" pb="32px">
            <Text as={"span"} pb="4px"  textTransform={"capitalize"} fontFamily="body" fontWeight={"500"} fontSize="27px" color="#E02828">Product Offering</Text>

            <SimpleGrid columns={["1","2", "2","4" ]} spacing={["30px","60px","80px","100px"]} mt="48px" pb>
                <ProductCard 
                    icon= "simple"
                    title="simple"
                    text= "Unique code for individual guests can be simply generated with few clicks in less than 10secs."
                />
                <ProductCard 
                    icon= "reliable"
                    title="reliable"
                    text= "Your security operatives no longer need to worry about the identity of the residents when granting guests access through phone call."
                />
                <ProductCard 
                    icon= "smart"
                    title="smart"
                    text= "With access request history and full comprehensive periodic security reports Letmein provides a smart option for managing access control"
                />
                <ProductCard 
                    icon= "safe"
                    title="safe"
                    text= "Integrating the LetMeIn app into your Estate security protocol makes your estate significantly safer."
                />
               
            </SimpleGrid>
            
            </Box>

            
        </Box>
    );
}
