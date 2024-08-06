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
import AlertMe from '../../Components/Alert';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import Input from '../../Components/Input';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EventModal from '../../Components/EventModal';
import BackBtn from '../../Components/BackBtn';
import PartnershipStamp from '../../Components/PartnershipStamp';
import TemporaryPassHistoryCard from '../../Components/TeporaryPassHistoryCard';
import PendingCardGroup from '../../Components/PendingCardGroup';
import HistoryCardGroup from '../../Components/HistoryCardGroup';

export default function ManageRequestHistory() {
    const [Success, setSuccess] = useState(false);
    const [Copied, setCopied] = useState(false);

    const onlineUser = useSelector((state) => state.onlineUser);
    console.log("onlineUser", onlineUser)
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const [Loading, setLoading] = useState(false);
    const [HistoryPass, setHistoryPass] = useState([]);
    const [PendingRequest, setPendingRequest] = useState(true);
    const [History, setHistory] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);

    const [PendingMultiple, setPendingMultiple] = useState([]);
    const [PendingTaxi, setPendingTaxi] = useState([]);
    const [PendingSingle, setPendingSingle] = useState([]);







    const nav = useNavigate();


    const handlePendingRequest = () => {
        setPendingRequest(true)
        setHistory(false)
    }

    const handleHistory = () => {

        setPendingRequest(false)
        setHistory(true)

    }


    const GetHistory = () => {

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

    const payload = {

        method: "Post",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify({ id: onlineUser.user.id }),

    }

    const GetPendingHistory = () => {

        fetch(`${apiLink.link}/user/getUserPendingVisitors`, payload)
            .then(res => res.json())
            .then(json => {


                console.log("GetPendingHistory", json.pendingVisitorRequest)


                if (json.status === 200) {


                    setPendingMultiple(json.pendingVisitorRequest.Multiple)
                    setPendingTaxi(json.pendingVisitorRequest.Taxii)
                    setPendingSingle(json.pendingVisitorRequest.Single)


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
        GetPendingHistory()
        GetHistory()
    }, []);

    return (
        <MainLayout>

            <Seo title="Temporary Pass" description='Temporary Pass' />



            <Box mt="40px">
                <Headers text="Access Request" />
            </Box>


            {
                Success && (

                    <AlertMe title="Please fill in required fields!" status="error" onclick={() => setSuccess(false)} />
                )
            }
            <Box mx={["6%", "10%"]}>

                <Center>
                    <Box w={["100%", "100%", "60%", "40%", "30%"]}>

                        <HStack border="2px solid #36E7C4" bg={"#EEEEEE"} p="4px" mt="30px" cursor={"pointer"}>
                            <Text w={"50%"} onClick={handlePendingRequest} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={PendingRequest ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={PendingRequest ? "#424242" : "#939393"}>Pending Request</Text>
                            <Text w={"50%"} onClick={handleHistory} fontSize={"14px"} py="10px" fontFamily="body" fontWeight={"700"} textAlign={"center"} bg={History ? "linear-gradient(269.11deg, #50FCDA 19.49%, #12CDA8 87.44%)" : "#EEEEEE"} color={History ? "#424242" : "#939393"}>History</Text>
                        </HStack>

                        {

                            PendingRequest ? (
                                <Box>

                                    <Text mt="32px" fontWeight={"400"} fontSize={"16px"}>Total - {PendingSingle?.length + PendingTaxi?.length + PendingMultiple?.length }</Text>
                                    <Stack mt="44px" spacing="15px">

                                        {
                                            PendingSingle?.map((item, i) => (

                                                <PendingCardGroup
                                                    key={i}
                                                    typeOf={item.type_Request}
                                                    guestName={`${item.firstName} ${item.lastName}`}
                                                    gender={item.gender}
                                                    guestCreatedAt={item.createdAt}
                                                    residentName={`${onlineUser.user.firstName} ${onlineUser.user.lastName}`}
                                                    residentAddress={`${onlineUser.user.houseNo}, ${onlineUser.user.streetName} ${onlineUser.user.estateName} `}

                                                />
                                            ))

                                        }

                                        {
                                            PendingTaxi?.map((item, i) => (

                                                <PendingCardGroup
                                                    key={i}
                                                    typeOf={item.type_Request}
                                                    guestName={`${item.visitorName}`}
                                                    plateNo={item.plateNumber}
                                                    guestCreatedAt={item.createdAt}
                                                    residentName={`${onlineUser.user.firstName} ${onlineUser.user.lastName}`}
                                                    residentAddress={`${onlineUser.user.houseNo}, ${onlineUser.user.streetName} ${onlineUser.user.estateName} `}

                                                />
                                            ))

                                        }
                                        {
                                            PendingMultiple?.map((item, i) => (

                                                <PendingCardGroup
                                                    key={i}
                                                    typeOf={item.type_Request}
                                                    noOfGuest={item.number_Visitors}
                                                    guestCreatedAt={item.createdAt}
                                                    residentName={`${onlineUser.user.firstName} ${onlineUser.user.lastName}`}
                                                    residentAddress={`${onlineUser.user.houseNo}, ${onlineUser.user.streetName} ${onlineUser.user.estateName} `}

                                                />
                                            ))

                                        }




                                    </Stack>


                                </Box>
                            ) : (


                                <Box>

                                    <Text mt="32px" fontWeight={"400"} fontSize={"16px"}>Total - 10</Text>
                                    <Stack mt="44px" spacing="15px">


                                        <HistoryCardGroup
                                            typeOf="Single"
                                        />



                                        <HistoryCardGroup
                                            typeOf="Taxi"
                                        />
                                        <HistoryCardGroup
                                            typeOf="Multiple"
                                        />
                                        <HistoryCardGroup
                                            typeOf="Temporary"
                                        />


                                    </Stack>


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


        </MainLayout>
    );
}
