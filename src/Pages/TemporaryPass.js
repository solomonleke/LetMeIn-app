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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EventModal from '../Components/EventModal';
import BackBtn from '../Components/BackBtn';
import PartnershipStamp from '../Components/PartnershipStamp';

export default function TemporaryPass() {
    const [Success, setSuccess] = useState(false);
    const [Copied, setCopied] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpen2, setisOpen2] = useState(false)
    // const { isOpen2, onOpen2, onClose2 } = useDisclosure()
    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const [Loading, setLoading] = useState(false);
    const [NewPass, setNewPass] = useState(true);
    const [History, setHistory] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);
    const [Payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        numberOfDays: "",
        id: onlineUser.user.id,

    });

    const handleChange = (e) => {
        setPayload({ ...Payload, [e.target.id]: e.target.value })
    }

    const [HistoryPayload, setHistoryPayload] = useState({
        numbers: "",
        codeWord: "",
        id: onlineUser.user.id,

    });

    const handleHistoryChange = (e) => {
        setHistoryPayload({ ...HistoryPayload, [e.target.id]: e.target.value })
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


    const handleNewPass = () => {
        setNewPass(true)
        setHistory(false)
    }

    const handleHistory = () => {

        setNewPass(false)
        setHistory(true)

    }

    const multiPayload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify(
            {
                numbers: HistoryPayload.numbers > 20 ? "20" : HistoryPayload.numbers,
                codeWord: HistoryPayload.codeWord,
                id: onlineUser.user.id,
            }
        ),

    }

    const EventAccess = () => {

        setLoading(true)

        fetch(`${apiLink.link}/user/HistoryVisitor`, multiPayload)

            .then(res => res.json())
            .then(json => {


                if (json.status == 200) {

                    // setMultiAccessCode(json.msg.accessCode)
                    setisOpen2(true)
                    setLoading(false)
                    console.log("json", json)
                }
            })
            .catch(error => {
                console.log("error", error);
                setLoading(false)
            })

    }
    const HistoryAccess = () => {

    }

    const middleWare = () => {



        if (Verified == false || onlineUser.user.disable_user == true) {
            nav("/home")
        }




    }
    useEffect(() => {
        middleWare()
    }, []);

    return (
        <MainLayout>

            <Seo title="Temporary Pass" description='Temporary Pass' />



            <Box mt="40px">
                <Headers text="Temporary Pass" />
            </Box>


            {
                Success && (

                    <AlertMe title="Please fill in required fields!" status="error" onclick={() => setSuccess(false)} />
                )
            }
            <Box mx={["6%", "10%"]}>

                <Center>
                    <Box w={["85%", "320px"]}>

                        <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="30px" cursor={"pointer"}>
                            <Text w={"50%"} onClick={handleNewPass} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={NewPass ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={NewPass ? "#424242" : "#939393"}>+ New Pass</Text>
                            <Text w={"50%"} onClick={handleHistory} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={History ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={History ? "#424242" : "#939393"}>History</Text>
                        </HStack>

                        {

                            NewPass ? (
                                <Box>
                                    <Stack mt="44px" spacing="15px">

                                        <Input val={Payload.lastName && true} isRequired label="Last Name" value={Payload.lastName} id='lastName' type='text' onChange={handleChange} />
                                        <Input val={Payload.firstName && true} label="First Name" value={Payload.firstName} id='firstName' type='text' onChange={handleChange} />

                                        <Select isRequired onChange={handleChange} id="gender" color="#000000" rounded="0" _focus={{ borderColor: "#6AF3D8" }} fontFamily={"body"} fontSize={Payload.gender ? "16px" : "12px"} fontWeight={"400"} placeholder='Gender' bg={"#fff"} _hover={{ bg: "#fff" }} w="100%" size={"lg"}>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </Select>

                                        <Box>


                                            <Input val={Payload.numberOfDays && true} label="No. of Visitors" value={Payload.numberOfDays > 20 ? "20" : Payload.numberOfDays} id='numbers' type='number' onChange={handleHistoryChange} />

                                            <Text fontFamily={"body"} mt="4px" textAlign="center" fontSize="10px" fontWeight={"400"} color="#939393">Maximum no. of visitors is 20. For more visitors make another  request.</Text>

                                        </Box>

                                    </Stack>

                                    <Button isLoading={Loading} disabled={Payload.lastName !== "" && Payload.gender !== "" ? false : true} mb="32px" mt="65px" px='60px' onClick={access}>Request Access</Button>


                                </Box>
                            ) : (
                                <Box>
                                    <Stack mt="44px" spacing="15px">
                                        <Box>


                                            <Input val={HistoryPayload.numbers && true} label="No. of Visitors" value={HistoryPayload.numbers > 20 ? "20" : HistoryPayload.numbers} id='numbers' type='number' onChange={handleHistoryChange} />

                                            <Text fontFamily={"body"} mt="4px" textAlign="center" fontSize="10px" fontWeight={"400"} color="#939393">Maximum no. of visitors is 20. For more visitors make another  request.</Text>

                                        </Box>

                                        <Input val={HistoryPayload.codeWord && true} label="Code Word" value={HistoryPayload.codeWord} id='codeWord' type='text' onChange={handleHistoryChange} />



                                    </Stack>

                                    <Button isLoading={Loading} disabled={HistoryPayload.codeWord !== "" && HistoryPayload.numbers !== "" ? false : true} mt="65px" px='60px' onClick={EventAccess}>Request Access</Button>
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

                <BackBtn onclick={() => nav("/home")} />


                <PartnershipStamp />
            </Box>
            <Modal motionPreset='slideInBottom' size={"xs"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader></ModalHeader>

                    <ModalCloseButton onClick={() => nav("/home")} />
                    <ModalBody pb={6} >
                        {
                            NewPass ? <Text textAlign={"center"}>Guest Access Requested <br /> Successfully</Text> :
                                <Text textAlign={"center"}>History Guest Access Requested Successfully</Text>
                        }


                        <Center>
                            <Stack direction={"row"} mt="27px" spacing={"22px"} fontFamily={"body"}>
                                <Image src="/check.png" />
                                <Box textAlign={"center"} pos="relative" top="12px">
                                    {
                                        NewPass ? <Text fontSize="24px" fontWeight={"700"} color="#424242">{AccessCode}</Text> :
                                            <Text fontSize="24px" fontWeight={"700"} color="#424242">{MultiAccessCode}</Text>

                                    }
                                    <Text fontSize="14px" fontWeight={"300"}>Access Code</Text>
                                </Box>
                            </Stack>
                        </Center>
                        <Box mt="10px" fontSize="10px" textAlign={"center"} fontStyle="italic">
                            {
                                NewPass ? (
                                    <div>
                                        <Text fontWeight={"400"}>Please copy the access code and only share with  </Text>
                                        <Text fontWeight={"700"}> {Payload.firstName || ""} {Payload.lastName || ""}</Text>
                                    </div>
                                ) :
                                    <Text fontWeight={"400"}>This access code is only valid for {HistoryPayload.numbers > 10 ? "10" : HistoryPayload.numbers} people.</Text>

                            }

                        </Box>



                        <Center>
                            <CopyToClipboard text={NewPass ? AccessCode : MultiAccessCode}>
                                <Button mb="5px" mt="32px" px='0px' onClick={copyAccess}>Copy Access Code</Button>

                            </CopyToClipboard>
                        </Center>



                        <Text fontSize="10px" fontWeight={"300"} fontFamily="body" textAlign={"center"}>Access Code expires at 11pm </Text>

                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

            <EventModal isOpen={isOpen2} onClose={() => setisOpen2(false)} number={HistoryPayload.numbers > 20 ? "20" : HistoryPayload.numbers} />

        </MainLayout>
    );
}