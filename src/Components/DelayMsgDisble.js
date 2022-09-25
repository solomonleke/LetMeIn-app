import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

export default function DelayMsgDisable() {
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);

    const [Data, setData] = useState({})
    const [Show, setShow] = useState(false)

    // const estateUser = ()=>{
    //     fetch(`${apiLink.link}/user/getEstateManager/${onlineUser.user.estateName}`)
    //     .then(response => response.json())
    //     .then(data => {

    //         if(data.status === 200){
    //             setData(data.estateManager[data.estateManager.length > 1 ? data.estateManager.length - 1 : 0])

    //         }

    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    // }

    const disableMsg = () => {
        fetch(`${apiLink.link}/user/getDisableUser/${onlineUser.user.id}`)
            .then(response => response.json())
            .then(data => {

                console.log("disableMsg", data)
                setData(data.msg)

                setShow(true)

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        // estateUser()
        disableMsg()
    }, [])
    return (
        <Box mt={["-200px", "-200px", "-120px", "-100px", "-160px"]} opacity={"1"} w={["80%", "75%", "55%", "45%", "35%"]} bg="#fff" px="22px" py="17px" boxShadow={"1px 1px 18px rgba(0, 0, 0, 0.25)"} rounded="6px">
            {
                Show && (
                    <Box>
                        <Text fontSize={"14px"} fontFamily="body" fontWeight={"800"} color="#424242">Ooops...</Text>
                        <Text fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#424242">Your profile has been disabled your Estate  Administrator.</Text>
                        <Text fontSize={"14px"} fontFamily="body" fontWeight={"800"} color="#424242" mt="27px">Reasons Provided</Text>
                        <Text mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">
                            “{Data.message}” <br />
                            Estate Admin -  <Box as="span" fontWeight={"700"}>{Data?.estateAdmin.prefix}. {Data?.estateAdmin.lastName} </Box> <br />
                            Phone n0 - <Box as="span" fontWeight="700" color={"#1869E1"} textDecor="underline"> {Data?.estateAdmin.phone || "08068840125"}</Box>

                        </Text>
                        <Text mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">
                            To clear this message click the refresh button after your estate administrator enables your account again.
                        </Text>


                    </Box>
                )
            }

            <Button mt="45px" onClick={() => window.location.reload()} >Refresh</Button>
        </Box>
    );
}
