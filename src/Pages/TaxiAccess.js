import { Box, Center, Stack, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Image, } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';
import { useNavigate } from 'react-router-dom';

export default function TaxiAccess() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);
    const [Payload, setPayload] = useState({
        name: "",
        plateNo: "",
        id: onlineUser.user.id,

    })
    const [Loading, setLoading] = useState(false)
    const [Copied, setCopied] = useState(false)
    const [AccessCode, setAccessCode] = useState("");
    const nav = useNavigate();
    const isLogged = useSelector((state) => state.isLogged);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);

    const handleChange = (e)=> {
        setPayload({...Payload, [e.target.id]: e.target.value })
    }

    const payload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),

    }


    const requestAccess = ()=>{
        setLoading(true)
        onOpen()
        
        fetch(`${apiLink.link}/user/taxiAccess`, payload)

            .then(res => res.json())
            .then(json => {

                console.log("Access", json);
                if (json.status == 200) {

                    setAccessCode(json.msg.accessCode)
                    onOpen()
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log("error", error);
                setLoading(false)
            })

    }

    const copyAccess = () => {
      
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 4000);

    }

    const middleWare = ()=>{
        if(isLogged.isLogged !== true){
            nav("/sign-in")
        }
        if(onlineUser.user.userType !== "Estate manager"){
            if(Verified == false){
                nav("/home")
            }
        }
    }
    useEffect(() => {
        middleWare()
    }, []);

  return (
    <MainLayout>
        <Seo title="Grant Taxi Access" description='Letmein Taxi Access'/>

        <Center>

        <Box w={["85%", "320px"]}>

            <Box mt="41px">
                <Headers text="Grant Taxi Access"/>
            </Box>
                <Stack spacing={"43px"} mt="55px">
                    <Input val={Payload.name ? true: false} value={Payload.name} type='text' label='Name' isRequired  id="name" onChange={handleChange}/>
                    <Input val={Payload.plateNo ? true: false} value={Payload.plateNo} type='text' label='Plate Number' isRequired id="plateNo" onChange={handleChange} />
                </Stack>

                <Button mt={"72px"} disabled={Payload.name !="" && Payload.plateNo !="" ? false:true} onClick={requestAccess} isLoading={Loading}>Request Access</Button>
                {
                    Copied && (

                        <Text mt="15vh" fontSize={"12px"} textAlign="center" fontWeight="700" fontStyle={"italic"} fontFamily="body" color="#249421">Access Code has been copied to your clip board</Text>
                    )
                }   

                
        </Box>
        </Center>

        <Modal motionPreset='slideInBottom' size={"xs"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton onClick={()=>nav("/home")}/>
                    <ModalBody pb={6} >
                    <Text textAlign={"center"}>Taxi Access Requested Successfully</Text>
                        
                    
                        

                        <Center>
                            <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                                <Image src="/check.png" />
                                <Box textAlign={"center"} pos="relative" top="12px">
                                    <Text fontSize="24px" fontWeight={"700"} color="#424242">{AccessCode}</Text>

                                
                                    <Text fontSize="14px" fontWeight={"300"}>Access Code</Text>
                                </Box>
                            </Stack>
                        </Center>
                        <Box mt="10px" fontSize="10px" textAlign={"center"} fontStyle="italic">
              
                                <div>
                                <Text fontWeight={"400"}>Please copy the access code and only share with  </Text>
                                <Text fontWeight={"700"}> {Payload.name} </Text>
                                </div>
                       
                           
                        </Box>



                        <Center>
                        <CopyToClipboard text={AccessCode}>
                        <Button mb="5px" mt="32px" px='0px' onClick={copyAccess}>Copy Access Code</Button>
                        
                        </CopyToClipboard>
                         </Center>



                        <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires at 11pm </Text>


                        
                  
                      
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
    </MainLayout>
  );
}
