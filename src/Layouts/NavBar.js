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
  Img,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

export default function NavBar() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const initialFocusRef = React.useRef()
  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const verifiedLen = useSelector((state) => state.verifiedCount.count);
  const verifiedLan = useSelector((state) => state.verifiedCountLan.count);

  const dispatch = useDispatch();
  const nav = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logout = () => {

    dispatch(

      { type: "SIGN_IN", payload: { isLogged: false } }
    )

    dispatch(

      { type: "ADD_USER", payload: { data: "" } }
    );



    nav("/home")


  }


  const home = () => {
    nav("/home")
  }
  return (
    <Box >

      <Box bgImage="url(/nav_bg.png)" bgSize={'cover'} bgRepeat={'repeat'} height="">

        <Center>
          <Box pos={"relative"} mt="10px"  pb="25px" onClick={home} cursor="pointer">
            <Img src="/logo.png" width={"152px"}/>
            <Text fontSize={"14.5px"} color="#fff" fontWeight="400" w={"100%"} letterSpacing="1px" fontFamily={"body"} pos={"absolute"} left={"34px"} top={"32px"}>{onlineUser.user.userType} </Text>
          </Box>
        </Center>
      </Box>

      <Flex justifyContent={"space-between"} display={["flex", "flex"]} mx={["6%", "10%"]} mt='20px'>
        {
          isLogged.isLogged && (

            <Box cursor={"pointer"} fontSize="30px" color="#A7A7A7" pos="relative" top="12px" onClick={onOpen} >
              <AiOutlineMenu />
              {
                verifiedLen >= 1 && onlineUser.user.userType == "Estate manager" && (
                  <Box w="8px" h="8px" bg="#E02828" rounded="100%" pos="absolute" top="0" right="0"></Box>
                )
              }
              {
                verifiedLan >= 1 && onlineUser.user.userType == "Landlord" && (
                  <Box w="8px" h="8px" bg="#E02828" rounded="100%" pos="absolute" top="0" right="0"></Box>
                )
              }

            </Box>
          )
        }



        {
          isLogged.isLogged && (
            <Box pos={"relative"}>
            
            <Avatar name={onlineUser.user.firstName + " " + onlineUser.user.lastName} src='' />

            <div className='drop-down'>
              <Box float={"right"}>
              <AiOutlineClose/>
              </Box>
              <Text>My Profile</Text>
              <Text>Change Password</Text>
              <Text>Customer Support</Text>
              
            </div>


            </Box>
          
          )
        }


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
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Box display="flex" flexDirection={"column"} >

              <Stack spacing={"19px"} mt="123px" cursor={"pointer"} flexGrow={1}>

                {
                  onlineUser.user.userType == "Security operative" && (
                    <Stack spacing={"19px"}>
                      <Link to="/check-in">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Check-in History</Text>
                      </Link>
                      <Link to="/check-out">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Check-out History</Text>
                      </Link>
                      <Link to="/uncheck-out">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Uncheck-Out</Text>
                      </Link>

                    </Stack>
                  )
                }

                {
                  onlineUser.user.userType == "Resident"  && (

                    <Stack spacing={"19px"}>

                      <Link to="/visitors-access">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access History</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Create Temporary Pass</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Manage Temporary Pass</Text>
                      </Link>

                    </Stack>
                  )
                }



                {
                   onlineUser.user.userType == "Landlord" && (
                    <>
                      <Link to="/visitors-access">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access History</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Create Temporary Pass</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Manage Temporary Pass</Text>
                      </Link>

                      <Link to="/verify-id">
                        <Box pos={"relative"}>
                          <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Verify IDs</Text>
                          {
                            verifiedLan >= 1 && (
                              <Text h={"18px"} w={"18px"}
                                rounded={"100%"} bg="#E02828"
                                boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                pos="absolute" left="63px" top="-8px" textAlign={"center"} pt="1px"
                                fontFamily="body" fontWeight={"400"} color="#FFFFFF"
                                fontSize={"12"}>{verifiedLan}</Text>
                            )
                          }
                        </Box>
                      </Link>

                      <Link to="/manage-verify-id">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Manage Verified IDs</Text>
                      </Link>
                    </>
                  )
                }

{
                  onlineUser.user.userType == "Estate manager"  && (
                    <>
                      <Link to="/visitors-access">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Request Access History</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Create Temporary Pass</Text>
                      </Link>

                      <Link to="/#">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Manage Temporary Pass</Text>
                      </Link>

                      <Link to="/verify-id">
                        <Box pos={"relative"}>
                          <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Verify IDs</Text>
                          {
                            verifiedLen >= 1 && (
                              <Text h={"18px"} w={"18px"}
                                rounded={"100%"} bg="#E02828"
                                boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                pos="absolute" left="63px" top="-8px" textAlign={"center"} pt="1px"
                                fontFamily="body" fontWeight={"400"} color="#FFFFFF"
                                fontSize={"12"}>{verifiedLen}</Text>
                            )
                          }
                        </Box>
                      </Link>

                      <Link to="/manage-verify-id">
                        <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Manage Verified IDs</Text>
                      </Link>
                    </>
                  )
                }








              </Stack>




              <Stack spacing={"19px"} mt={"200px"}>

                <Link to="/#">
                  <Text fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Customer Support</Text>
                </Link>

                <Text onClick={logout} cursor={"pointer"} fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'} >Log out</Text>
              </Stack>




            </Box>
          </DrawerBody>

          <DrawerFooter>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
