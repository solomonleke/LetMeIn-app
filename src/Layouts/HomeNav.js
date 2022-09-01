import { Box, Button, Flex, Image, LinkBox, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeNav() {

    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch()
    const nav = useNavigate();


    const navBar = [
        {
            name: "Our product",
            link: "/#our-product"
        },
        {
            name: "Sign-up",
            link: "/sign-up"
        },
        {
            name: "Our team",
            link: "/#our-team"
        },
        {
            name: "Contact us",
            link: "/#contact-us"
        },
    ]

    const navigate = (link)=>{
        window.location.href = link
    }

    const logout = () => {

        dispatch(
    
          { type: "SIGN_IN", payload: { isLogged: false } }
        )
    
        dispatch(
    
          { type: "ADD_USER", payload: { data: "" } }
        );
    
    
    
        nav("/home")
    
    
      }

    const [ShowNav, setShowNav] = useState(false)

    const showMore = ()=>{
        setShowNav(!ShowNav)
    }
    return (
        <Box>
            <Flex justifyContent={"space-between"} alignItems="flex-start" >

                <Image src="/logo.png" w="100.85px" />

                <Flex justifyContent={"space-between"} spacing="30px" w={"60%"} cursor="pointer" display={["none", "none", "none", "flex"]}>
                    {
                        navBar.map((item, i) => (
                            <LinkBox  onClick={()=>navigate(item.link)}>
                                <Text textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#ffffff" pb="1px" _hover={{ borderBottom: "4px solid  #50FCDA" }}>{item.name} </Text>
                            </LinkBox>
                        ))
                    }

                    {
                        isLogged.isLogged ? 
                        <Button onClick={logout} textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#000" mt="-7px" pb="1px" _hover={{bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"}}>Logout </Button>:

                        <Button onClick={()=>navigate("sign-in")} textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#000" mt="-7px" pb="1px" _hover={{bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"}} px="35px">Login </Button>

                    }
                </Flex>


                <Box color={"#fff"} fontSize="20px" pos="relative" top={"2.5px"} display={["flex", "flex", "flex", "none"]} onClick={showMore} >

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
                            <LinkBox  onClick={()=>navigate(item.link)}>
                                <Text textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#ffffff" pb="1px" _hover={{ borderBottom: "4px solid  #50FCDA" }}>{item.name} </Text>
                            </LinkBox>
                        ))
                    }

                    
                    {
                        isLogged.isLogged ? 
                        <Button onClick={logout} textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#000" mt="-7px" pb="1px" _hover={{bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"}}>Logout </Button>:

                        <Button onClick={()=>navigate("sign-in")} textTransform={"capitalize"} fontSize={"16px"} fontFamily="body" fontWeight={"900"} color="#000" mt="-7px" pb="1px" _hover={{bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)"}}>Login </Button>

                    }
                    </Stack>
                }
           
        </Box>

    );
}
