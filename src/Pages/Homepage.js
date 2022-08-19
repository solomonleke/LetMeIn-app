import { Box, Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import TeamCard from '../Components/TeamCard';
import HomeNav from '../Layouts/HomeNav';

export default function Homepage() {
    const [Coming, setComing] = useState(false)
    const nav = useNavigate();

    const getStarted = () => {
        nav("/home")
    }

    const comingSoon = ()=>{
        setComing(!Coming)
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

                        <Flex w={["100%", "100%", "100%", "35%"]} flexDir={"row"} justifyContent={["center", "center", "center", "flex-start"]}>
                            <Box>
                                <Text fontFamily="body" fontWeight={"700"} fontSize="20px" color="#B7B7B7" textAlign={"center"} pb="10px">Resident App</Text>
                                <Image w="186.3px" src="/left-iphone.png" />

                                <Box>
                                    <Text fontFamily="body" fontWeight={"700"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">LetMeIn Resident App  </Text>
                                    <Text mt="-12px" fontFamily="body" fontWeight={"400"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">allows residents generate unique <br /> access codes for visiting Guests</Text>

                                </Box>

                            </Box>
                        </Flex>

                        <Flex flexDir={"row"} justifyContent={["center", "center", "center", "flex-end"]}>

                            <Box pos={"relative"} mt="90px" >
                                <Box display={["none", "none", "none", "flex"]} pos="absolute" left={"-110%"} top="35%" borderBottom="2px dashed #A4A4A4" w="110%">  </Box>
                                <Image w="250px" src="/red-glow.png" />
                                <Box display={["none", "none", "none", "flex"]} pos="absolute" borderBottom="2px dashed #A4A4A4" right={"-106%"} top="35%" w="104%">  </Box>
                            </Box>
                        </Flex>

                        <Flex w={["100%", "100%", "100%", "35%"]} flexDir={"row"} justifyContent={["center", "center", "center", "flex-end"]} mt={["90px", "90px", "90px", "0"]} alignItems="flex-start">
                            <Box>
                                <Text fontFamily="body" fontWeight={"700"} fontSize="20px" color="#B7B7B7" textAlign={"center"} pb="10px">Security Operative App</Text>

                                <Image w="186.3px" src="/right-iphone.png" ml="16px" />
                                <Box>
                                    <Text fontFamily="body" fontWeight={"700"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">LetMeIn Security Operative App </Text>
                                    <Text mt="-12px" fontFamily="body" fontWeight={"400"} fontSize="12px" color="#B7B7B7" textAlign={"center"} pb="10px">uses the unique access code provided by <br /> Guests to permit residents into an Estate</Text>

                                </Box>


                            </Box>
                        </Flex>

                    </Flex>
                </div>

            </Box>

            <Box bg="url(/product-bg.png)" w="100%" px={["6%", "10%"]} pt="34px" bgRepeat={"none"} bgSize="cover" pb="32px">
                <Text as={"span"} pb="4px" textTransform={"capitalize"} fontFamily="body" fontWeight={"500"} fontSize="27px" color="#E02828">Product Offering</Text>

                <SimpleGrid columns={["1", "2", "2", "4"]} spacing={["30px", "60px", "80px", "100px"]} mt="48px" pb>
                    <ProductCard
                        icon="simple"
                        title="simple"
                        text="Unique code for individual guests can be simply generated with few clicks in less than 10secs."
                    />
                    <ProductCard
                        icon="reliable"
                        title="reliable"
                        text="Your security operatives no longer need to worry about the identity of the residents when granting guests access through phone call."
                    />
                    <ProductCard
                        icon="smart"
                        title="smart"
                        text="With access request history and full comprehensive periodic security reports Letmein provides a smart option for managing access control"
                    />
                    <ProductCard
                        icon="safe"
                        title="safe"
                        text="Integrating the LetMeIn app into your Estate security protocol makes your estate significantly safer."
                    />

                </SimpleGrid>

            </Box>


            <Box w="100%" px={["6%", "10%"]} pt="34px" pb="32px">
                <Text as={"span"} textTransform={"capitalize"} fontFamily="body" fontWeight={"500"} fontSize="27px" color="#E02828">Sign Up</Text>

                <Flex justifyContent={"space-between"} flexDir={["column", "column", "column", "row"]} mt="40px">
                    <Flex justifyContent={["center", "center", "center", "flex-start"]}>
                        <Flex onClick={comingSoon} w="400px" bg="#404040" h={["200px","253px"]} justifyContent={"center"} alignItems="center" cursor={"pointer"}>
                            <Box>
                            <Image src="/btn.png" w="100px" />

                            {
                                Coming && (

                                    <Text color="#fff" mt="4px" fontFamily={'body'} fontSize="14px">Coming Soon</Text>

                                )
                            }
                            </Box>
                        </Flex>
                       
                    </Flex>

                    <Flex justifyContent={["center", "center", "center", "flex-start"]} >
                        <Box pos={"relative"}>
                        <Image src="/laptop-phone.png" w="400px"  />
                        <Image src="/iphone2.png" w={["45px","70px"]} pos={"absolute"} right="20px" top={["85px","87px"]} />
                        </Box>
                      
                    </Flex>

                    <Flex justifyContent={["center", "center", "center", "flex-start"]}>
                        <Button onClick={getStarted} mb={["32px", "32px", "32px", "0"]} _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} fontSize={["18px", "20px", "20px", "20px"]} fontFamily="body" fontWeight={"800"} rounded={"0"} bg="linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" mt="89px" color="#000000" py="14px" px="37px">Get Started</Button>

                    </Flex>



                </Flex>

            </Box>

            <Box bg="url(/product-bg.png)" w="100%" px={["6%", "10%"]} pt="34px" bgRepeat={"none"} bgSize="cover" pb="32px">
            <Text as={"span"} textTransform={"capitalize"} fontFamily="body" fontWeight={"500"} fontSize="27px" color="#E02828">Our team</Text>

                <SimpleGrid columns={["1", "1", "2", "3"]} spacing={["30px", "60px", "80px", "100px"]} mt="48px" px={["0%", "7%"]}>
                
                        <TeamCard
                        img='ope'
                        name="Opeyemi Adeleke"
                        pos="Co-Founder"
                        />
                        <TeamCard
                        img='moyin'
                        name="Solomon Adeleke"
                        pos="Co-Founder"
                        />
                        <TeamCard
                        img='obinna'
                        name="obinna edmund"
                        pos="Co-Founder"
                        />
                        
                </SimpleGrid>
            </Box>


        </Box>
    );
}
