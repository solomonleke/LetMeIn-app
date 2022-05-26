import {
  Image, HStack, Input, InputGroup, InputRightElement, Spacer, Stack, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Center,
  Text,
  Box,
  Avatar, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

export default function NavBar() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const initialFocusRef = React.useRef()
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logout = () => {

    dispatch(

      { type: "SIGN_IN", payload: { isLogged: false } }
    )

    nav("/")


  }

  const home = () => {
    nav("/")
  }
  return (
    <Box mx={["6%", "10%"]} mt='32px'>

      <Stack direction="row" cursor={"pointer"} display={["none", "flex"]}>
        <Image src='/logo.png' onClick={home} />
        <Spacer />
        {
          isLogged.isLogged && (

            <HStack spacing="20px" >
              <Popover
                initialFocusRef={initialFocusRef}
                placement='bottom'
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Center fontSize={"25px"} color="#E02828" pos="relative" cursor={"pointer"} bg="#F4C6BC" p="5px" borderRadius={"100%"}>
                    <MdNotificationsActive />
                    <Text pos="absolute" right="5px" top="-10px" fontSize={"15px"} fontWeight="600" color="#252525">3</Text>
                  </Center>

                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    3 New Notification
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore.
                  </PopoverBody>
                  <PopoverFooter>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>

              <Box borderLeft="2px solid #E8E8E8" pl="20px">
                <Text fontSize="18px" fontWeight={"600"} color="#00000" fontFamily={"body"}>Henry Solomon</Text>
                <Text fontSize="12px" fontWeight={"400"} textAlign="right" color="#00000" fontFamily={"body"}>Resident</Text>
              </Box>
              <Avatar name='Henry Solomon' src='' />
              <HStack onClick={logout} spacing="4px">
                <Box fontSize="20px"><BiLogOut /></Box>
                <Text fontSize="17px" fontWeight={"500"} color="#363232" textTransform={"capitalize"} fontFamily={"body"} >Sign Out</Text>
              </HStack>
            </HStack>


          )
        }

       
      </Stack>

      <Flex justifyContent={"space-between"} display={["flex", "none"]}>
      {
        isLogged.isLogged && (

          <Box display={["flex", "none"]} fontSize="30px" color="#080707" pos="relative" top="12px" onClick={onOpen} > <AiOutlineMenu /></Box>
        )
      }
      <Box pos={"relative"}>
          <Image src='/logo.png' onClick={home} />
          <Text fontSize={"14px"} fontWeight="400" color={"#939393"} fontFamily={"body"} pos={"absolute"} left={"50px"} top={"35px"}>Resident</Text>
      </Box>

      <Avatar name='Henry Solomon' src='' />

      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader><Image src='/logo.png' onClick={home} /></DrawerHeader>

          <DrawerBody>
          <Stack spacing={"25px"}>
          <Text fontSize="23px" fontWeight={"600"} fontFamily={"body"}>Welcome  &#128515;</Text>
          <HStack>
          <Avatar name='Henry Solomon' src='' />
          <Box>
          <Text fontSize="24px" fontWeight={"600"} color="#00000" fontFamily={"body"}>Henry Solomon</Text>
          <Text fontSize="16px" fontWeight={"400"} textAlign="left" color="#00000" fontFamily={"body"}>Resident</Text>
          </Box>
          </HStack>

          <HStack>
            <Text fontSize="20px" fontWeight={"400"} fontFamily={"body"}>Notification</Text>
            <Spacer/> 
            <Popover
                initialFocusRef={initialFocusRef}
                placement='bottom'
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Center fontSize={"25px"} color="#E02828" pos="relative" cursor={"pointer"} bg="#F4C6BC" p="5px" borderRadius={"100%"}>
                    <MdNotificationsActive />
                    <Text pos="absolute" right="5px" top="-10px" fontSize={"15px"} fontWeight="600" color="#252525">3</Text>
                  </Center>

                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                  <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    3 New Notification
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore.
                  </PopoverBody>
                  <PopoverFooter>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
          </HStack>

          <HStack onClick={logout} spacing="4px">
          <Box fontSize="25px"><BiLogOut /></Box>
          <Text fontSize="20px" fontWeight={"400"} color="#363232" textTransform={"capitalize"} fontFamily={"body"} >Sign Out</Text>
        </HStack>
           
               
             
            </Stack>
          </DrawerBody>

          <DrawerFooter>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
