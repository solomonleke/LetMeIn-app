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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import NavList from './NavList';
import SingleList from '../Components/SingleList';
import { isActive } from '../Authenticaation';


export default function NavBar() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [OpenAvater, setOpenAvater] = useState(false);
  const [Notification, setNotification] = useState();
  const [ResidentLen, setResidentLen] = useState([]);
  const initialFocusRef = React.useRef()
  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);
  const verifiedLen = useSelector((state) => state.verifiedCount.count);
  const verifiedLan = useSelector((state) => state.verifiedCountLan.count);

  const dispatch = useDispatch();
  const nav = useNavigate()
  const location = useLocation()


  const navList = NavList(location.pathname)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const apiLink = useSelector((state) => state.apiLink);

  const VerifyEvent = () => {
    fetch(`${apiLink.link}/user/getEventHistory/${onlineUser.user.estateName}`)

        .then(response => response.json())
        .then(data => {


          if (data.status === 200) {
            
            let datalen = data.msg.filter((item)=> item.approve === false)
            console.log("ResidentLen", datalen)
              setResidentLen(datalen?.length)

            }
        })

        .catch((error) => {
            console.error('Error:', error);
        });
}

  const getNotification = () => {
    fetch(`${apiLink.link}/user/unverifiedEstateAdmin`)

      .then(res => res.json())
      .then(json => {
        if (json.msg !== 0) {
          setNotification(json.msg)
        }
        setNotification(0);
        console.log("number", json)
      })
      .catch(error => {
        console.log("error", error);
      })

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

  

  const AvatarOpen = () => {

    setOpenAvater(!OpenAvater)
  }


  const home = () => {
    nav("/home")
  }

  // let Data = [];
  const { data, isLoading, isError } = useQuery('notification', async () => await (await (fetch(`${apiLink.link}/user/residentEvent/${onlineUser.user.id}`))).json(), { refetchInterval: 10000, refetchOnReconnect: false, refetchIntervalInBackground: true, cacheTime: 10000 });
  // console.log('data', data, isLoading, isError);
  let Data = [];

  if (!isLoading) {

    //filter the unread data
    Data = data?.msg;
    let newData = Data?.filter((item, i) =>
      item.unread == false
    )

    Data = newData;


  }



  useEffect(() => {
    getNotification()
    VerifyEvent()
  }, [])

  return (
    <Box >

      <Box bgImage="url(/nav_bg.png)" bgSize={'cover'} bgRepeat={'repeat'} height="">

        <Center>
          <Box pos={"relative"} mt="10px" pb="25px" onClick={home} cursor="pointer">
            <Img src="/logo.png" width={"152px"} />
            <Text fontSize={"14.5px"} color="#fff" fontWeight="400" w={"100%"} letterSpacing="1px" fontFamily={"body"} pos={"absolute"} left={"34px"} top={"32px"}>{onlineUser.user.userType}</Text>
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
            <Flex>
              {
                onlineUser.user.profileImage != "" && (
                  <Box mr="10px">
                    <Text textAlign={"right"} fontFamily="body" fontSize={"15px"} fontWeight="500">{onlineUser.user.firstName} </Text>
                    <Text textAlign={"right"} fontFamily="body" fontSize={"15px"} fontWeight="500"> {onlineUser.user.lastName}</Text>
                  </Box>

                )
              }

              <Box pos={"relative"} cursor="pointer">

                <Avatar pos={"relative"} name={onlineUser.user.firstName + " " + onlineUser.user.lastName} src={onlineUser.user.profileImage != "" && `${apiLink.link}/${onlineUser.user.profileImage}`} onClick={AvatarOpen} />
                {
                  Data?.length >= 1 && (
                    <Box w="20px" h="20px" bg="#E02828" fontSize={"10px"} fontFamily="body" display={"flex"}
                      justifyContent="center" rounded="100%" pos="absolute" color="#fff" p="3px" top="-8px" left="32px">{Data.length}</Box>

                  )
                }

                {
                  OpenAvater && (
                    <div className='drop-down'>
                      <Box display={"flex"} justifyContent="flex-end" color={"#000000"} fontSize={"22px"} onClick={AvatarOpen}>
                        <AiOutlineClose />
                      </Box>
                      <Link to={"/notification"} >
                        <Box pos={"relative"}>
                          <Text mt="11px" pl={"15px"} pb="14px" borderBottom={"0.5px solid #AFAFAF"} fontFamily={"body"} fontSize="14px" fontWeight={"400"} lineHeight="16px" color={"#424242"}>Notifications</Text>
                          {
                            Data?.length >= 1 && (
                              <Box w="18px" h="18px" bg="#E02828" fontSize={"8px"} fontFamily="body" display={"flex"}
                                justifyContent="center" rounded="100%" pos="absolute" color="#fff" p="3px" top="-12px" left="90px">{Data.length}</Box>

                            )
                          }
                        </Box>
                      </Link>
                      <Link to={"/my-profile"}>
                        <Text mt="11px" pl={"15px"} pb="14px" borderBottom={"0.5px solid #AFAFAF"} fontFamily={"body"} fontSize="14px" fontWeight={"400"} lineHeight="16px" color={"#424242"}>My Profile</Text>
                      </Link>
                      <Link to={"/change-password"}>
                        <Text mt={"12px"} pl={"15px"} pb="14px" borderBottom={"0.5px solid #AFAFAF"} fontFamily={"body"} fontSize="14px" fontWeight={"400"} lineHeight="16px" color={"#424242"}>Change Password</Text>
                      </Link>



                    </div>
                  )
                }





              </Box>
            </Flex>

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
                <Link to="/">
                  <Text _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} p="10px" fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Homepage</Text>

                </Link>

                {
                  navList.filter(item => item.display === true).map((item, i) => (
                    <SingleList
                      key={i}
                      link={item.location}
                      name={item.name}
                      pageActive={item.active}
                    />
                  ))

                }

                {
                  onlineUser.user.userType == "Super admin" && (
                    <>

                      <Link to="/superAdmin/verifyAdmin">
                        <Box pos={"relative"}>
                          <Text _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} bg={isActive(location.pathname, "/superAdmin/verifyAdmin") ?
                            "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : ""} p="10px" fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Verify Estate Admin</Text>
                          {
                            <Text h={"18px"} w={"18px"}
                              rounded={"100%"} bg="#E02828"
                              boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                              pos="absolute" left="140px" top="-8px" textAlign={"center"} pt="1px"
                              fontFamily="body" fontWeight={"400"} color="#FFFFFF"
                              fontSize={"12"}>{Notification}</Text>
                          }
                        </Box>
                      </Link>
                    </>
                  )
                }

                {
                  onlineUser.user.userType == "Estate manager" && (
                    <>

                      <Link to="/resident-request">
                        <Box pos={"relative"}>
                          <Text _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} bg={isActive(location.pathname, "/resident-request") ?
                            "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : ""} p="10px" fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Resident Request</Text>
                          {
                            ResidentLen >= 1 && (
                              <Text h={"18px"} w={"18px"}
                                rounded={"100%"} bg="#E02828"
                                boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                pos="absolute" right="0px" top="-8px" textAlign={"center"} pt="1px"
                                fontFamily="body" fontWeight={"400"} color="#FFFFFF"
                                fontSize={"12"}>{ResidentLen}</Text>
                            )
                          }
                        </Box>
                      </Link>



                    </>
                  )
                }
                {
                  onlineUser.user.userType == "Estate manager" && (
                    <>

                      <Link to="/verify-id">
                        <Box pos={"relative"}>
                          <Text _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} bg={isActive(location.pathname, "/verify-id") ?
                            "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : ""} p="10px" fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Verify IDs</Text>
                          {
                            verifiedLen >= 1 && (
                              <Text h={"18px"} w={"18px"}
                                rounded={"100%"} bg="#E02828"
                                boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                pos="absolute" right="0px" top="-8px" textAlign={"center"} pt="1px"
                                fontFamily="body" fontWeight={"400"} color="#FFFFFF"
                                fontSize={"12"}>{verifiedLen}</Text>
                            )
                          }
                        </Box>
                      </Link>



                    </>
                  )
                }


                <Text _hover={{ bg: "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" }} p="10px" onClick={logout} fontFamily={"body"} fontWeight={700} fontSize={"16px"} borderBottom={'0.5px solid #A7A5A5'}>Logout</Text>

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
