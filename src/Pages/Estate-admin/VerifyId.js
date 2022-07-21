import {
    Box, Center, CircularProgress, Flex, HStack, Spacer, Stack, Switch, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import $ from 'jquery';
import BackBtn from '../../Components/BackBtn';
import { useNavigate } from 'react-router-dom';
import Headers from '../../Components/Headers';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import moment from 'moment';
import Pagination from '../../Components/Pagination';
import Divider from '../../Components/Divider';
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

    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState("");

    const [verifyAll, setVerifyAll] = useState(false);



    const onlineUser = useSelector((state) => state.onlineUser);

    const [Success, setSuccess] = useState(false);
    const nav = useNavigate()

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const checkLength = () => {
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {

                    setResidentLen(data.resident?.length)
                    setLandlordLen(data.landlord?.length)
                    setSecurityLen(data.security_OPs?.length)
                }
                setIsLoading(false)
            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }


    

    const [ModalObj, setModalObj] = useState({
        id: "",
        firstName: "",
        lastName: ""
    });

     const openModal = (id, firstName, lastName, userType, verify)=>{
        setVerifyAll(false)

        setModalObj({
            id: id,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            verify: verify
        })

        onOpen();
     }

    const update_status = (id, firstName, lastName, userType) => {

      

        setSuccessMsg(`${firstName} ${lastName}`)

        fetch('https://api.solomonleke.com.ng/user/toggleUser', {

            method: "POST",

            headers: {
                "Content-Type": "application/JSON"
            },

            body: JSON.stringify({ _id: id }),

        })

            .then(response => response.json())
            .then(data => {

                console.log("data", data)
                onClose()


                if(userType === "Security operative"){
                    handleSecurity()
                }else if(userType === "Resident"){
                    handleResident()
                }else if(userType === "Landlord"){
                    handleLandlord()
                }
                setSuccess(true)

                setTimeout(() => {
                   
                    setSuccess(false)

                }, 5000);

                checkLengthRedux();


            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }


    const handleLandlord = () => {

        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.landlord)
                }
                setShow(false)
                setLandlord(true)
                setResident(false)
                setSecurity(false)

                setIsLoading(false)

            })


            .catch((error) => {
                console.error('Error:', error);
            });


    }
    const handleResident = () => {
        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.resident)
                }
                setShow(false)
                setLandlord(false)
                setResident(true)
                setSecurity(false)
                setIsLoading(false)

            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }
    const handleSecurity = () => {

        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.security_OPs)
                }
                setShow(false)
                setLandlord(false)
                setResident(false)
                setSecurity(true)
                setIsLoading(false)


            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }

    const back = () => {
        setShow(true)
        checkLength();
    }

    const VerifyAll = () => {

        // alert(JSON.stringify(Data))

        Data.map((item, i)=>{

            if(item.Verified === false){

                fetch('https://api.solomonleke.com.ng/user/toggleUser', {

                    method: "POST",
        
                    headers: {
                        "Content-Type": "application/JSON"
                    },
        
                    body: JSON.stringify({ _id: item._id }),
        
                })
        
                    .then(response => response.json())
                    .then(data => {
        
                        console.log("data", data)
                        setSuccessMsg(`All Users`)
                        onClose()


                        if(item.userType === "Security operative"){
                            handleSecurity()
                        }else if(item.userType === "Resident"){
                            handleResident()
                        }else if(item.userType === "Landlord"){
                            handleLandlord()
                        }
                        setSuccess(true)
                       
                        setTimeout(() => {
                   
                            setSuccess(false)
        
                        }, 5000);
                        checkLengthRedux()
                    })
        
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            

            }else{
                onClose()
                 
                // setTimeout(() => {
                   
                //     alert("All user are verified")

                // }, 1000);
            }
            
                        })
       
    }

    const verify = ()=>{
        setVerifyAll(true)

        onOpen()
    }


    const checkLengthRedux = () => {

        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {

                    dispatch(
                        
                        { type: "VERIFIED_COUNT", payload: { data: data.resident?.length + data.landlord?.length + data.security_OPs?.length } }
                    );
                    dispatch(
                    
                        { type: "VERIFIED_COUNT_LAN", payload: { data: data.resident?.length  } }
                    );
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const GoBack = ()=>{
        nav("/home")
    }

  

    useEffect(() => {

        checkLength()
        checkLengthRedux()
    }, [Checked]);
    return (
        <MainLayout>
            <Seo title="Verify IDs" description='Verify IDs' />


            {
                Show ? (
                    <Box mx={["6%", "10%"]}>
                    <Center mt={["100px", "131px"]}>
                    <Box w={["80%", "310px"]}>

                       

                        <Headers text={"Verify User Identification"}/>

                        {
                            isLoading ? (
                                <Center mt="20vh">
                                    <CircularProgress isIndeterminate={true} value={49} size='150px' thickness='4px' />
                                </Center>
                            ) : (
                                <Stack spacing={'15px'} cursor="pointer" mt="39px">

                                    <Box pos={"relative"}>
                                    <Button onClick={handleResident}> Verify Resident</Button>

                                    {
                                                ResidentLen >= 1 && (

                                                <Text h={"18px"} w={"18px"}
                                                    rounded={"100%"} bg="#EDEDED"
                                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                    pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                                    fontSize={"12"}>{ResidentLen}</Text>
                                            )
                                        }

                                    </Box>

                                    {
                                        onlineUser.user.userType === "Estate manager" && (

                                            <Box pos={"relative"}>
                                            <Button onClick={handleLandlord}>Verify LandLord</Button>
                                            {
                                                LandlordLen >= 1 && (
                                                    <Text h={"18px"} w={"18px"}
                                                        rounded={"100%"} bg="#EDEDED"
                                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                        pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                                        fontSize={"12"}>{LandlordLen} </Text>
                                                )
                                            }
    
    
                                        </Box>
                                        )
                                    }

                                  
                                  {
                                    onlineUser.user.userType === "Estate manager" && (
                                        
                                        <Box pos={"relative"}>
                                        <Button onClick={handleSecurity}>Verify Security Operative</Button>

                                        {
                                            SecurityLen >= 1 && (
                                                <Text h={"18px"} w={"18px"}
                                                    rounded={"100%"} bg="#EDEDED"
                                                    boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                    pos="absolute" right="-8px" top="-8px" pt="1px" textAlign={"center"}
                                                    fontFamily="body" fontWeight={"400"} color="#000000"
                                                    fontSize={"12"}>{SecurityLen}</Text>
                                            )
                                        }

                                    </Box>
                                    )
                                  } 
                                  


                                  
                                </Stack>
                            )
                        }

                    </Box>
                </Center>

                <BackBtn onclick={GoBack} />
                    </Box>
                   
                ) : (
                    <Center mt={["60px", "61px"]} >

                        <Box px={["3%","0%"]}>

                            <Headers text={Resident ? "Verify Residents" : Landlord ? "Verify Landlords" : Security && " Verify Security Operatives"}/>

                            <Menu >
                            {
                                ({isOpen}) => (
                                    <>
                                    <MenuButton as={Box}  aria-label='Options' cursor={"pointer"} >
                                    <Box fontSize={"30px"} color={isOpen ? "#E02828": "#9D9D9D"} mt={"32px"} _focus={{color: "#E02828"}} px={["3%","0%"]}>
                                    <BsThreeDots/>
                                    
                                    </Box>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Display First 5</MenuItem>
                                        <MenuItem>Display First 10</MenuItem>
                                        <MenuItem>Display First 15</MenuItem>
                                        <MenuItem>Display All</MenuItem>
                                       
                                    </MenuList>
                                    </>
                                   
                                    )
                                }
                                
                                </Menu>
                           
                            {
                                Data.length <= 0 ? (

                                    <Text fontFamily={"body"} fontSize="24px" mt="32px" fontWeight={"400"} color="#000000">No Record</Text>

                                ) : (

                                    <Box  mb="32px" px={["3%","0%"]}>
                                        <Stack spacing={'14px'} cursor="pointer" mt="10px" >

                                            {
                                                Data?.map((item, i) => (

                                                    <HStack id="verify" spacing="39px" border={item.Verified && "1.5px solid #00FFCD"} bg={item.Verified === true ? ("#EAF7F5") : ("#EEEEEE")} px={"15px"} py="5px" onClick={() => openModal(item._id, item.firstName, item.lastName, item.userType,item.Verified)}>
                                                        <Box w={["50%","70%"]}>
                                                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">{item.firstName} {item.lastName}</Text>
                                                            <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no {item.houseNo}, {item.streetName} <Divider/> 0{item.phone} <Divider/> {moment(item.time).format("MMM Do ")}</Text>

                                                        </Box>

                                                       
                                                        <Spacer />




                                                        <div className={`toggle ${item.Verified && "toggle-on" } `}>

                                                            <div className={`toggle-btn ${item.Verified ? "on":"off"}`}>

                                                            </div>

                                                        </div>

                                                        <Modal motionPreset='slideInBottom' size={"md"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                                                        <ModalOverlay />
                                                        <ModalContent>
                                                            <ModalHeader></ModalHeader>
                                                           
                                                            <ModalBody pb={6}>
                                                                {
                                                                    verifyAll ? (
                                                                        <Text textAlign={"center"} fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">Are you sure you want to <br/> Verify  <br/> all Users?</Text>

                                                                    ):(
                                                                        <Text textAlign={"center"} fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">Are you sure you want to <br/> { ModalObj.verify ? "Unverify": "Verify"}  <br/> <Box as="span" fontWeight={"700"}>{ModalObj.firstName} {ModalObj.lastName}?</Box></Text>

                                                                    )
                                                                }
                                                                <Center>
                                                                <Flex mt="33px" px="10%" justifyContent={"space-between"}>
                                                                {
                                                                      verifyAll ? (
                                                                        <Button w='2%' onClick={VerifyAll}>Yes </Button>

                                                                      ):(
                                                                        <Button w='2%' onClick={() => update_status(ModalObj.id, ModalObj.firstName, ModalObj.lastName, ModalObj.userType)}>Yes </Button>

                                                                      )
                                                                }
                                                             
                                                                <Button w='2%' onClick={onClose}>No</Button>
                                                                
                                                                </Flex>
                                                                </Center>

                                                
                                                              
                                                            </ModalBody>

                                                            <ModalFooter>
                                                               
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>

                                                    </HStack>


                                                ))
                                            }
                                          <Pagination/>
                                        </Stack>
                                        <Button mb="18px" mt="65px" onClick={verify} >Verify All</Button>



                                        {
                                            Success && (
                                                verifyAll ? (
                                                    <Text textAlign={"center"} fontFamily="body" fontWeight={400} fontSize="14px" color="#939393">{SuccessMsg} verified successfully </Text>

                                                ):(
                                                    <Text textAlign={"center"} fontFamily="body" fontWeight={400} fontSize="14px" color="#939393">{SuccessMsg} { ModalObj.verify ? "unverified successfully": "verified successfully"} </Text>

                                                )
                                            )
                                        }

                                    </Box>




                                )
                            }






                        </Box>
                    </Center>

                )
            }


            {
                Show === false && (
                   
                    <Box mx={["6%", "10%"]} >
                    <BackBtn onclick={back}/>    
                    </Box>
                )
            }

        </MainLayout>
    );
}
