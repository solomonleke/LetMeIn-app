import { Box, Center, Flex, HStack, Select, Spacer, Stack, Switch, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Text, Modal, Textarea, Checkbox } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import moment from 'moment';
import Divider from '../../Components/Divider';
import Pagination from '../../Components/Pagination';

export default function ManageVerified() {

    const [Data, setData] = useState([]);
    const [VerifiedLen, setVerifiedLen] = useState("");
    const [Checked, setChecked] = useState(false);
    const [Category, setCategory] = useState("category");
    const [Duration, setDuration] = useState("");
    const apiLink = useSelector((state) => state.apiLink);
    const onlineUser = useSelector((state) => state.onlineUser);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [CheckBox, setCheckBox] = useState(false);
    const [Reasons, setReasons] = useState("");
    // console.log("reason", CheckBox)
    // console.log("reason", Reasons)
    
    const [ModalObj, setModalObj] = useState({
        id: "",
        firstName: "",
        lastName: "",
        disable_user: false
    });

    const openModal = (id, firstName, lastName, userType,disable_user)=>{
    
        // console.log("fun modal", disable_user)

        setModalObj({
            id: id,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            disable_user: disable_user 
            
        })



        onOpen();
     }




    const handleCategory = (e) => {

        
        setCategory(e.target.value)

    }


    const handleDuration = (e) => {
        setDuration(e.target.value)

    }

    const Continue = ()=>{

        fetch(`${apiLink.link}/user/verified/${onlineUser.user.estateName}`)

        .then(response => response.json())
        .then(data => {


            if (data.status == 200) {


                if (Category == "Security") {
                    setData(data.security_OPs)
                } else if (Category == "Resident") {
                    setData(data.resident)
                } else if (Category == "LandLord") {
                    setData(data.landlord)
                }
            }

            // console.log("verifiedUser", data)


        })

        .catch((error) => {
            console.error('Error:', error);
        });
    }






    const verifiedUser = () => {


        fetch(`${apiLink.link}/user/verified/${onlineUser.user.estateName}`)

            .then(response => response.json())
            .then(data => {


                if (data.status == 200) {

                    setVerifiedLen(data.landlord?.length + data.resident?.length + data.security_OPs?.length)
 

                }


            })

            .catch((error) => {
                console.error('Error:', error);
            });


    }

    const disableUSer = (id)=>{
        // alert(id)
            
        fetch(`${apiLink.link}/user/disableUser`, {

            method: "POST",

            headers: {
                "Content-Type": "application/JSON"
            },

            body: JSON.stringify({

                 resId: id,
                 estateId: onlineUser.user.id,
                 message: CheckBox === true ? "No Reason":  Reasons
                }),

        })

            .then(response => response.json())
            .then(data => {

                console.log("data", data)
                onClose()
                Continue()
                setReasons("")


            })

            .catch((error) => {
                console.error('Error:', error);
            });




    }


    useEffect(() => {
        verifiedUser()
    }, [Category, Duration, Checked]);

    return (
        <MainLayout>
            <Seo title="Manage Verify IDs" description='Manage Verify IDs' />
            <Box mx={["6%", "10%"]}>
                <Center>
                    <Box w={["90%", "310px"]}>

                        <Box mt="41px">
                            <Headers text={"Manage Verified IDs"} />
                        </Box>

                        <Box mt="25px" boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25)"} px="12px" >
                            <Flex justifyContent="space-between">
                                <Text textAlign="center" pt="30px" pr="10px" w="60%" fontFamily="body" fontWeight={'400'} color="#424242" fontSize={"14px"} borderRight="1px solid #B7B7B7">Total no. of Verified IDs</Text>

                                <Text fontFamily="body" textAlign="center" w="50%" fontWeight={'700'} color="#CBCBCB" fontSize={"53px"}>{VerifiedLen}</Text>


                            </Flex>
                        </Box>

                        <Select onChange={handleCategory} color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Category ? "16px" : "12px"} fontWeight={"400"} placeholder='Category' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="61px">
                            <option value='Security'>Security Operative</option>
                            <option value='Resident'>Resident</option>
                        </Select>

                        <Select onChange={handleDuration} color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Duration ? "16px" : "12px"} fontWeight={"400"} placeholder='Duration' bg={"#F1FCFA"} _hover={{ bg: "#F1FCFA" }} size={"lg"} mt="26px">
                            <option value='Last-5'>Last 5</option>
                            <option value='Last-10'>Last 10</option>
                            <option value='Last-20'>Last 20</option>
                            <option value='Last-30'>Last 30</option>

                        </Select>


                       

                    </Box>
                </Center>

                <Center>
                    <Box w={["90%", "310px"]} >
                        <Stack spacing={'12px'} cursor="pointer" mt="29px" >
                            {
                                Data?.map((item, i) => ( 

                                    <HStack  spacing="39px" border={item.disable_user === true ? "2px solid rgba(224, 40, 40, 0.4)": "2px solid #00FFCD"} bg={item.disable_user === true ? "#EEEEEE" : "#EAF7F5" } px={"15px"} py="5px" onClick={() => openModal(item.id, item.firstName, item.lastName, item.userType, item.disable_user)}>
                                    {console.log("outside modal" ,item.disable_user)}
                                        <Box w={["50%", "70%"]}>
                                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">{item.firstName} {item.lastName}</Text>
                                            <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">no {item.houseNo} <Divider /> 0{item.phone} <Divider /> {moment(item.time).format("MMM Do ")}</Text>

                                        </Box>


                                        <Spacer />



                                        <div className={`toggle ${item.disable_user && "toggle-disable"} `}>

                                            <div className={`toggle-btn ${item.disable_user ? "off" : "on"}`}>

                                            </div>

                                        </div>

                                        <Modal motionPreset='slideInBottom' size={"md"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader></ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody pb={6}>
                                                   
                                                    <Text textAlign={"left"} fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">
                                                    {
                                                        // console.log(ModalObj.disable_user)
                                                    }
                                                       {ModalObj.disable_user == true ? "Are you Sure you want to Enable": "Disable"} -   <Box as="span" fontWeight={"700"}>{ModalObj.firstName} {ModalObj.lastName}</Box></Text>

                                    {
                                        ModalObj.disable_user === false && 

                                        <Box>
                                        <Text mt="20px" fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#424242">Kindly provide reasons</Text>

                                        <Textarea mt="4px"  value={Reasons}  onChange={(e)=>setReasons(e.target.value)} placeholder='Type Reason Here' size='sm'/>

                                          
                                        <Checkbox mt="46px" fontFamily={"body"} fontSize="16px" fontWeight={"400"} onChange={(e)=>setCheckBox(e.target.checked)} color="#424242" >No Reasons</Checkbox>


                                        </Box>
                                    }
                                                   
                                                   {
                                                    ModalObj.disable_user === true ? <Button mt="41px" onClick={()=>disableUSer(ModalObj.id)} >Confirm</Button>:
                                                       <Button mt="41px" onClick={()=>disableUSer(ModalObj.id)} disabled={Reasons !=="" || CheckBox !== false  ? false: true}>Confirm</Button>
                                                    } 
                                                </ModalBody>

                                                <ModalFooter>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>

                                    </HStack>



                                ))
                            }





                        </Stack>
                       <Box mt="10px"> 
                       {

                        //  <Pagination />
          
                       }
                       </Box>
                        <Button mt="60px" onClick={Continue}>Continue</Button>
                    </Box>
                </Center>
            </Box>



        </MainLayout>
    );
}
