import { Box, Center, Select, Stack, Text, useDisclosure,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image, } from '@chakra-ui/react';
import React, { useState } from 'react';
import AlertMe from '../Components/Alert';
import Alert from '../Components/Alert';
import Button from '../Components/Button';
import Input from '../Components/Input';
import MainLayout from '../Layouts/Index';
import Seo from '../Utils/Seo';

export default function VisitorsAccess() {
    const [Success, setSuccess] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [Payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
    });
    const handleChange = (e) => {
        setPayload({...Payload, [e.target.id]: e.target.value})
    }

    const access = ()=> {
        if(Payload.firstName !=="" &&  Payload.lastName !=="" &&  Payload.phone !=="" &&  Payload.gender !==""){
            console.log("Payload", Payload);
            onOpen()

        }else{
            setSuccess(true)
        }
        
    }

    const accessCode =  (Math.floor(Math.random() * 128) + 12061);

  return (
    <MainLayout>
        <Seo title="Visitors Access" description='Grant visitors Access'/>


        <Text mt="40px" fontFamily={"body"} fontSize="25px" fontWeight={"700"} color="#575757"  textAlign={"center"}>Grant Visitor Access</Text>
    {
        Success && (

            <AlertMe title="Please fill in required fields!" status="error" onclick={()=>setSuccess(false)} />
        )
    }

        <Center>
            <Box>
            
                <Stack mt="44px" spacing="15px">
                
                <Input val={Payload.firstName && true} isRequired label="First Name" value={Payload.firstName}  id='firstName' type='text' onChange={handleChange}/>
                <Input val={Payload.lastName && true} isRequired label="Last Name" value={Payload.lastName}  id='lastName' type='text' onChange={handleChange}/>
                <Input val={Payload.phone && true} isRequired label="Phone Number" value={Payload.phone}  id='phone' type='number' onChange={handleChange}/>

                <Select isRequired  onChange={handleChange} id="gender" color="#939393" rounded="0"  _focus={{ borderColor: "#E02828" }} fontFamily={"body"} fontSize="12px" fontWeight={"400"}   placeholder='Gender' bg={"#fff"} _hover={{bg: "#fff"}} w="250px" size={"lg"}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                </Select>
               
            </Stack>

            <Button mb="32px" mt="65px" px='60px' onClick={access}>Request Access</Button>
          

            </Box>
        </Center>
   
        <Modal motionPreset='slideInBottom' size={"xs"}  closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
            <Text textAlign={"center"}>Visitor Access Requested <br/> Successfully</Text>

            <Center>
                <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                    <Image src="/check.png" />
                    <Box textAlign={"center"} pos="relative" top="12px">
                        <Text  fontSize="24px" fontWeight={"700"}>{accessCode}</Text>
                        <Text fontSize="14px" fontWeight={"300"}>Access Code</Text>
                    </Box>
                </Stack>
            </Center>
                <Box  mt="10px" fontSize="10px" textAlign={"center"} fontStyle="italic">
                <Text fontWeight={"400"}>Please copy the access code and only share with  </Text>
                <Text fontWeight={"700"}> {Payload.firstName} {Payload.lastName}</Text>
                </Box>

               <Center> <Button mb="5px" mt="32px" px='0px' onClick={access}>Copy Access Code</Button></Center>
                    <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires in 24hrs </Text>
          </ModalBody>

          <ModalFooter>
           
          </ModalFooter>
        </ModalContent>
      </Modal>

    </MainLayout>
  );
}
