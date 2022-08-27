import {
    Box, Center, Select, Stack, Text, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image, AlertIcon, Alert, AlertTitle, CloseButton, HStack,
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
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function VisitorsAccess() {
    const [Success, setSuccess] = useState(false);
    const [Copied, setCopied] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const [Loading, setLoading] = useState(false);
    const [Single, setSingle] = useState(true);
    const [Multiple, setMultiple] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);
    const [Payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        id: onlineUser.user.id,

    });

    const handleChange = (e) => {
        setPayload({ ...Payload, [e.target.id]: e.target.value })
    }

    const [MultiplePayload, setMultiplePayload] = useState({
        numbers: "",
        codeWord: "",
        id: onlineUser.user.id,

    });

    const handleMultipleChange = (e) => {
        setMultiplePayload({ ...MultiplePayload, [e.target.id]: e.target.value })
    }



    const payload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(Payload),

    }

    const [AccessCode, setAccessCode] = useState("");
    const [MultiAccessCode, setMultiAccessCode] = useState("");


    const access = () => {
       
            setLoading(true)

            fetch(`${apiLink.link}/user/visitorRequest`, payload)

                .then(res => res.json())
                .then(json => {

                  
                    if (json.status == 200) {

                        setAccessCode(json.msg.accessCode)
                        onOpen()
                        // setPayload({
                        //     firstName: "",
                        //     lastName: "",
                        //     gender: "",
                        //     id: onlineUser.user.id,
                    
                        // })
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

  
    const nav = useNavigate();
    const isLogged = useSelector((state) => state.isLogged);


    const handleSingle = () => {
        setSingle(true)
        setMultiple(false)
    }

    const handleMultiple = () => {

        setSingle(false)
        setMultiple(true)

    }

    const multiPayload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(
            {
                numbers: MultiplePayload.numbers > 10 ? "10": MultiplePayload.numbers,
                codeWord: MultiplePayload.codeWord,
                id: onlineUser.user.id,
            }
        ),

    }

    const multipleAccess = ()=>{
        setLoading(true)

        fetch(`${apiLink.link}/user/multipleVisitor`, multiPayload)

            .then(res => res.json())
            .then(json => {

              
                if (json.status == 200) {

                    setMultiAccessCode(json.msg.accessCode)
                    onOpen()
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log("error", error);
                setLoading(false)
            })

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

            <Seo title="Visitors Access" description='Grant visitors Access' />



            <Box mt="40px">
                <Headers text="Grant Visitor Access" />
            </Box>


            {
                Success && (

                    <AlertMe title="Please fill in required fields!" status="error" onclick={() => setSuccess(false)} />
                )
            }

            <Center>
                <Box w={["85%", "320px"]}>

                    <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="30px" cursor={"pointer"}>
                        <Text w={"50%"} onClick={handleSingle} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={Single ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={Single ? "#424242" : "#939393"}>Single Visitor</Text>
                        <Text w={"50%"} onClick={handleMultiple} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={Multiple ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={Multiple ? "#424242" : "#939393"}>Multiple Visitors</Text>
                    </HStack>

                    {

                        Single ? (
                            <Box>
                            <Stack mt="44px" spacing="15px">
    
                            <Input val={Payload.lastName && true} isRequired label="Last Name" value={Payload.lastName} id='lastName' type='text' onChange={handleChange} />
                            <Input val={Payload.firstName && true}  label="First Name" value={Payload.firstName} id='firstName' type='text' onChange={handleChange} />
    
                                <Select isRequired onChange={handleChange} id="gender" color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"}  fontSize={Payload.gender ? "16px":"12px"} fontWeight={"400"}  placeholder='Gender' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
    
                            </Stack>
    
                            <Button isLoading={Loading} disabled={Payload.lastName !=="" && Payload.gender !=="" ? false:true} mb="32px" mt="65px" px='60px' onClick={access}>Request Access</Button>
                        </Box>
                        ):(
                            <Box>
                            <Stack mt="44px" spacing="15px">
                            <Box>
                            

                          <Input val={MultiplePayload.numbers && true} label="No. of Visitors" value={MultiplePayload.numbers > 10 ? "10": MultiplePayload.numbers} id='numbers' type='number' onChange={handleMultipleChange} />

                          <Text fontFamily={"body"} mt="4px" textAlign="center" fontSize="10px" fontWeight={"400"} color="#939393">Maximum no. of visitors is 10. For more visitors make another  request.</Text>

                            </Box>
                           
                           <Input val={MultiplePayload.codeWord && true} label="Code Word" value={MultiplePayload.codeWord} id='codeWord' type='text' onChange={handleMultipleChange} />
    
                               
    
                            </Stack>
    
                            <Button isLoading={Loading} disabled={MultiplePayload.codeWord !=="" && MultiplePayload.numbers !=="" ? false:true} mt="65px" px='60px' onClick={multipleAccess}>Request Access</Button>
                            <Text mb="32px" textAlign="center" fontFamily={"body"} mt="4px" fontSize="10px" fontWeight={"400"} color="#939393">Your estate manager would be notified of this access request</Text>

                        </Box>
                        )
                    }
                   

                    {
                        Copied && (

                            <Text fontSize={"12px"} textAlign="center" fontWeight="700" fontStyle={"italic"} fontFamily="body" color="#249421">Access Code has been copied to your clip board</Text>
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
                    {
                        Single ?  <Text textAlign={"center"}>Visitor Access Requested <br /> Successfully</Text>:
                        <Text textAlign={"center"}>Multiple Visitor Access Requested Successfully</Text>
                    }
                        

                        <Center>
                            <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                                <Image src="/check.png" />
                                <Box textAlign={"center"} pos="relative" top="12px">
                                {
                                    Single ? <Text fontSize="24px" fontWeight={"700"} color="#424242">{AccessCode}</Text>:
                                    <Text fontSize="24px" fontWeight={"700"} color="#424242">{MultiAccessCode}</Text>

                                }
                                    <Text fontSize="14px" fontWeight={"300"}>Access Code</Text>
                                </Box>
                            </Stack>
                        </Center>
                        <Box mt="10px" fontSize="10px" textAlign={"center"} fontStyle="italic">
                        {
                            Single ? (
                                <div>
                                <Text fontWeight={"400"}>Please copy the access code and only share with  </Text>
                                <Text fontWeight={"700"}> {Payload.firstName||""} {Payload.lastName||""}</Text>
                                </div>
                            ):
                            <Text fontWeight={"400"}>This access code is only valid for {MultiplePayload.numbers > 10 ? "10": MultiplePayload.numbers} people.</Text>

                        }
                           
                        </Box>



                        <Center>
                        <CopyToClipboard text={Single ? AccessCode: MultiAccessCode}>
                        <Button mb="5px" mt="32px" px='0px' onClick={copyAccess}>Copy Access Code</Button>
                        
                        </CopyToClipboard>
                         </Center>



                        <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires in 24hrs </Text>
                      
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>



        </MainLayout>
    );
}
