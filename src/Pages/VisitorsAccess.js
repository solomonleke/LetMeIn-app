import {
    Box, Center, Select, Stack, Text, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image, AlertIcon, Alert, AlertTitle, CloseButton
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertMe from '../Components/Alert';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function VisitorsAccess() {
    const [Success, setSuccess] = useState(false);
    const [Copied, setCopied] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onlineUser = useSelector((state) => state.onlineUser);
    const [Loading, setLoading] = useState(false);

    const [Payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        _id: onlineUser.user._id,
      
    });
    const handleChange = (e) => {
        setPayload({ ...Payload, [e.target.id]: e.target.value })
    }

    const payload = {

        method: "POST",

        headers: { 
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),
        
    }

    const [AccessCode, setAccessCode] = useState("");


    const access = () => {
        if (Payload.firstName !== ""  && Payload.gender !== "") {
            setLoading(true)
            
            fetch("https://api.solomonleke.com.ng/user/visitor", payload)

            .then(res => res.json())
            .then(json => {
            
              console.log("Access", json);
              if(json.status == 201){

                setAccessCode(json.visitor_1.accessCode)
                onOpen()
                setLoading(false)
              }
           })
            .catch(error => {
              console.log("error", error);
              setLoading(false)
          })
          
           
        } else {
            setSuccess(true)
        }

    }

    const copyAccess = () => {
        let copyText = document.getElementById("myInput");

        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        setCopied(true)

    }

    // const accessCode = (Math.floor(Math.random() * 128) + 12061);
    const isLogged = useSelector((state) => state.isLogged);
    const nav = useNavigate()

    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
    }
    useEffect(() => {
        middleWare()
    }, []);
  
    return (
        <MainLayout>
       
            <Seo title="Visitors Access" description='Grant visitors Access' />


           
            <Box mt="40px">
                <Headers text="Grant Visitor Access"/>
            </Box>
            {
                Success && (

                    <AlertMe title="Please fill in required fields!" status="error" onclick={() => setSuccess(false)} />
                )
            }

            <Center>
                <Box  w={["80%", "310px"]}>

                    <Stack mt="44px" spacing="15px">

                        <Input val={Payload.firstName && true} isRequired label="First Name" value={Payload.firstName} id='firstName' type='text' onChange={handleChange} />
                        <Input val={Payload.lastName && true}  label="Last Name" value={Payload.lastName} id='lastName' type='text' onChange={handleChange} />

                        <Select isRequired onChange={handleChange} id="gender" color="#939393" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize="12px" fontWeight={"400"} placeholder='Gender' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"}>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </Select>

                    </Stack>

                    <Button isLoading={Loading}  mb="32px" mt="65px" px='60px' onClick={access}>Request Access</Button>


                </Box>
            </Center>

            <Modal motionPreset='slideInBottom' size={"xs"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        <Text textAlign={"center"}>Visitor Access Requested <br /> Successfully</Text>

                        <Center>
                            <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                                <Image src="/check.png" />
                                <Box textAlign={"center"} pos="relative" top="12px">
                                    <Text fontSize="24px" fontWeight={"700"}>{AccessCode}</Text>
                                    <Text fontSize="14px" fontWeight={"300"}>Access Code</Text>
                                </Box>
                            </Stack>
                        </Center>
                        <Box mt="10px" fontSize="10px" textAlign={"center"} fontStyle="italic">
                            <Text fontWeight={"400"}>Please copy the access code and only share with  </Text>
                            <Text fontWeight={"700"}> {Payload.firstName} {Payload.lastName}</Text>
                        </Box>

                        <input type="text" value={AccessCode} hidden id="myInput" />


                        <Center> <Button mb="5px" mt="32px" px='0px' onClick={copyAccess}>Copy Access Code</Button></Center>

                      

                        <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires in 24hrs </Text>
                        {
                            Copied && (
                                <Center>
                                    <Alert status={"success"} mt="10px" color="#fff" >
                                        <AlertIcon />
                                        <AlertTitle mr={2} fontSize="14px" fontWeight={"400"}>{"Code Copied Successfully"}</AlertTitle>
                                        <CloseButton onClick={() => setCopied(false)} position='absolute' right='8px' top='8px' />
                                    </Alert>
                                </Center>
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                  
                    </ModalFooter>
                </ModalContent>
            </Modal>          
         
            

        </MainLayout>
    );
}
