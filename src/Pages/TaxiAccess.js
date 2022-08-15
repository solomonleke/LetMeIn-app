import { Box, Center, Stack, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Image, } from '@chakra-ui/react';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../Components/Button';
import Headers from '../Components/Headers';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function TaxiAccess() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [Payload, setPayload] = useState({
        name: "",
        plateNo: ""
    })
    const [Loading, setLoading] = useState(false)
    const [Copied, setCopied] = useState(false)

    const handleChange = (e)=> {
        setPayload({...Payload, [e.target.id]: e.target.value })
    }

    const requestAccess = ()=>{
        // setLoading(true)
        onOpen()

    }

    const copyAccess = () => {
      
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 4000);

    }

  return (
    <MainLayout>
        <Seo title="Grant Taxi Access" description='Letmein Taxi Access'/>

        <Center>

        <Box w={["85%", "320px"]}>

            <Box mt="41px">
                <Headers text="Grant Taxi Access"/>
            </Box>
                <Stack spacing={"43px"} mt="55px">
                    <Input type='text' label='Name' isRequired  id="name" onChange={handleChange}/>
                    <Input type='text' label='Plate Number' isRequired id="plateNo" onChange={handleChange} />
                </Stack>

                <Button mt={"72px"} disabled={Payload.name !="" && Payload.plateNo !="" ? false:true} onClick={requestAccess} isLoading={Loading}>Request Access</Button>
                {
                    Copied && (

                        <Text mt="10vh" fontSize={"12px"} textAlign="center" fontWeight="700" fontStyle={"italic"} fontFamily="body" color="#249421">Access Code has been copied to your clip board</Text>
                    )
                }   

                <Modal motionPreset='slideInBottom' size={"xs"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                    <Text textAlign={"center"}>Taxi Access Requested Successfully</Text>:
                        
                    
                        

                        <Center>
                            <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                                <Image src="/check.png" />
                                <Box textAlign={"center"} pos="relative" top="12px">
                                    <Text fontSize="24px" fontWeight={"700"} color="#424242">12129</Text>

                                
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
                        <CopyToClipboard text={1234567}>
                        <Button mb="5px" mt="32px" px='0px' onClick={copyAccess}>Copy Access Code</Button>
                        
                        </CopyToClipboard>
                         </Center>



                        <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires in 24hrs </Text>


                        
                  
                      
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        </Center>

        
    </MainLayout>
  );
}
