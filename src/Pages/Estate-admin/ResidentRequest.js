import { Box, Center, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Headers from '../../Components/Headers';
import NotificationCard from '../../Components/NotificationCard';
import RequestCard from '../../Components/RequestCard';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import BackBtn from '../../Components/BackBtn';

export default function ResidentRequest() {

    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const apiLink = useSelector((state) => state.apiLink);
    const onlineUser = useSelector((state) => state.onlineUser);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ModalObj, setModalObj] = useState({

    });


    const VerifyEvent = () => {
        fetch(`${apiLink.link}/user/getEventHistory/${onlineUser.user.estateName}`)

            .then(response => response.json())
            .then(data => {


                console.log("eventData", data)
                if (data.status === 200) {
                    setData(data.msg)

                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const OpenModal = (id) => {
        // alert(id)
        setModalObj({
            id: id
        })
        onOpen()
    }


    //Proceed function approves each event Request

    const payload = {

        method: "POST",

        headers: {
            "Content-Type": "application/JSON"
        },

        body: JSON.stringify({

            id: ModalObj.id,

        }),

    }
    const Proceed = () => {

        fetch(` ${apiLink.link}/user/approveMultiple `, payload)

            .then(response => response.json())
            .then(data => {


                console.log("approveMultiple", data)
                VerifyEvent()

                onClose()



            })

            .catch((error) => {
                console.error('Error:', error);
            });

    }
    const [Verified, setVerified] = useState(onlineUser.user.Verified);
    const isLogged = useSelector((state) => state.isLogged);
    const nav = useNavigate();


    const middleWare = () => {


        if (Verified == false) {
            nav("/home")
        }


    }


    useEffect(() => {
        VerifyEvent()
        middleWare()

    }, [])


    return (
        <MainLayout>
            <Seo title='Resident Request for Event' description='LetmeIn Resident Request for Event' />

            <Box px={["6%", "10%"]} pb="100px">
                <Center>
                    <Box w={["90%", "85%", "65%", "49%", "35%"]} mb="20px" cursor={"pointer"}>

                        <Headers mt="20px" text={"Resident Request"} />


                        <Stack spacing={"20px"}>

                            {
                                Data.length > 0 ? (
                                    Data.map((item, i) => (

                                        <RequestCard
                                            approve={item.approve}
                                            name={`${item.User_visitors?.lastName} ${item.User_visitors?.firstName} `}
                                            address={`${item.User_visitors?.houseNo}`}
                                            phone={`${item.User_visitors?.phone}`}
                                            number={item.number_Visitors}
                                            codeName={item.codeName}
                                            onClick={() => OpenModal(item.id)}
                                        />
                                    ))
                                ) : (
                                    <Text mt={"20px"} fontWeight="500" textAlign={"center"}>No record found</Text>
                                )

                            }






                        </Stack>
                    </Box>
                </Center>

                <BackBtn onclick={() => nav("/home")} />
            </Box>
            <ConfirmationModal isOpen={isOpen} onClose={onClose} Proceed={Proceed} />
        </MainLayout>
    );
}
