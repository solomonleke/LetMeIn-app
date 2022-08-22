import { Box, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function HomeNav() {

    const navBar = [
        {
            name: "Our product",
            link: "/homepage/#our-product"
        },
        {
            name: "Sign-up",
            link: "/sign-up"
        },
        {
            name: "Our team",
            link: "/homepage/our-team"
        },
        {
            name: "Contact us",
            link: "/homepage/contact-us"
        },
    ]

    const [ShowNav, setShowNav] = useState(false)

    const showMore = ()=>{
        setShowNav(!ShowNav)
    }
    return (
        <Box>
            <Flex justifyContent={"space-between"} alignItems="flex-start" >

                <Image src="/logo.png" w="100.85px" />

                <Flex justifyContent={"space-between"} spacing="30px" w={"50%"} cursor="pointer" display={["none", "none", "none", "flex"]}>
                    {
                        navBar.map((item, i) => (
                            <a href={`${item.link}`}>
                                <Text textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#ffffff" pb="1px" _hover={{ borderBottom: "4px solid  #50FCDA" }}>{item.name} </Text>
                            </a>
                        ))
                    }

                </Flex>

                <Box color={"#fff"} fontSize="20px" pos="relative" top={"2.5px"} display={["flex", "flex", "flex", "none"]} onClick={showMore}>

                {
                    ShowNav ? <AiOutlineClose/>: <AiOutlineMenu />
                }
                   
                </Box>

            </Flex>
                {
                    ShowNav && 
                    <Stack mt='32px' spacing={"12px"} textAlign="center" display={["flex", "flex", "flex", "none"]}>
                    {
                        navBar.map((item, i) => (
                            <a href={`${item.link}`}>
                                <Text textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#ffffff" pb="1px" _hover={{ borderBottom: "4px solid  #50FCDA" }}>{item.name} </Text>
                            </a>
                        ))
                    }
                    </Stack>
                }
           
        </Box>

    );
}
