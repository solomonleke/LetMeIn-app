import {
    Box, Center, Select, Stack, Text, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image, AlertIcon, Alert, AlertTitle, CloseButton, HStack,
    Flex,
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
import TemporaryPassHistoryCard from '../Components/TeporaryPassHistoryCard';
import ReusablePaginationControls from '../Components/PaginatedComponent';
import { rolesPerPage } from '../Utils/Helpers';

export default function TemporaryPass() {
    const [Success, setSuccess] = useState(false);
    const [Copied, setCopied] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpen2, setisOpen2] = useState(false)
    // const { isOpen2, onOpen2, onClose2 } = useDisclosure()
    const onlineUser = useSelector((state) => state.onlineUser);
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const [Loading, setLoading] = useState(false);
    const [HistoryPass, setHistoryPass] = useState([]);
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

    const [rowsPerPage, setRowsPerPage] = useState(rolesPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const [PendingMultiple, setPendingMultiple] = useState([]);
    const [PendingTaxi, setPendingTaxi] = useState([]);
    const [PendingSingle, setPendingSingle] = useState([]);
    const allPendingRequests = [...PendingSingle, ...PendingTaxi, ...PendingMultiple];
    const indexOfLastData = currentPage * rowsPerPage;
    const indexOfFirstData = indexOfLastData - rowsPerPage;
    const PaginatedData = allPendingRequests?.slice(indexOfFirstData, indexOfLastData);


    const historyData = [
        { type: "Single" },
        { type: "Taxi" },
        { type: "Multiple" },
        { type: "Temporary" },
    ];


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };
    
      const PreviousPage = () => {
        setCurrentPage(1);
      };
    
      const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };
    

   
    const paginatedData = historyData.slice(indexOfFirstData, indexOfLastData);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

  

    const totalPages = Math.ceil(historyData.length / rowsPerPage);

    

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

        console.log("temporary pass", Payload)
        fetch(`${apiLink.link}/user/temporaryPass`, payload)

            .then(res => res.json())
            .then(json => {

                console.log("temporary pass", json)


                if (json.status == 200) {

                    setAccessCode(json.msg.accessCode)
                    onOpen()

                    setLoading(false)
                }else{
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

   
    const GetHistory = ()=>{
      
        fetch(`${apiLink.link}/user/accessHistory/${onlineUser.user.id}`)
        .then(res => res.json())
        .then(json => {


          console.log("accessHistory", json)

          
          if (json.status == 200) {

              
              
              setHistoryPass(json.singleVisitor)
              
             


           
  
          } else {
            alert(json.message)
            setLoading(false)
          }
        })
        .catch(error => {
          console.log("error", error);
        })
    }
    

    const middleWare = () => {


        if (Verified == false || onlineUser.user.disable_user == true) {
            nav("/home")
        }

    }
    useEffect(() => {
        middleWare()
        GetHistory()
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
                    <Box w={["100%","100%","60%","40%", "30%"]}>

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


                                            <Input val={Payload.numberOfDays && true} label="No. of Days" value={Payload.numberOfDays > 14 ? "14" : Payload.numberOfDays} id='numberOfDays' type='number' onChange={handleChange} />

                                            <Text fontFamily={"body"} mt="4px" textAlign="right" fontSize="10px" fontWeight={"400"} color="#939393">Temporary Pass has a Maximum Validity of 14 days</Text>

                                        </Box>

                                    </Stack>

                                    <Button isLoading={Loading} disabled={Payload.lastName !== "" && Payload.gender !== "" ? false : true} mb="32px" mt="65px" px='60px' onClick={access}>Request Access</Button>


                                </Box>
                            ) : (


                                <Box>
                                    <Stack mt="44px" spacing="32px">



                                       {paginatedData.map((item, i) => (
                                            <TemporaryPassHistoryCard
                                                key={i}
                                                residentName={`${HistoryPass.firstName} ${HistoryPass.lastName}`}
                                                residentPhone={HistoryPass.phone}
                                                residentAddress={`No ${HistoryPass.houseNo}, ${HistoryPass.streetName} ${HistoryPass.estateName}`}
                                                guestName={`${item.firstName} ${item.lastName}`}
                                                gender={item.gender}
                                                guestCreatedAt={item.createdAt}
                                                securityName={item.approved_by}
                                            />
                                        ))}
                                    ):(
                                            <Text mt={"64px"} fontWeight={"700"} textAlign={"center"}>No Record Found</Text>
                                        )

                                   
                                   
                                       

                                    </Stack>

                                  
                                    <ReusablePaginationControls
                                        currentPage={currentPage}
                                        startIndex={startIndex}
                                        endIndex={endIndex}
                                        totalItems={Math.ceil(allPendingRequests?.length / rowsPerPage)}
                                        handlePreviousPage={handlePreviousPage}
                                        handleNextPage={handleNextPage}
                                        PreviousPage={PreviousPage}
                                    />

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
                      
                           <Text textAlign={"center"}>Temporary Pass Granted <br /> Successfully</Text> 
                             
                       


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
                                        <Text fontWeight={"400"}>This access code is only valid for {Payload.numberOfDays } days.</Text>
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
