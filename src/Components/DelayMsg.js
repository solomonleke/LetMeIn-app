import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

export default function DelayMsg() {
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);

    const [Data, setData] = useState('')

    const estateUser = ()=>{
        fetch(`${apiLink.link}/user/getEstateManager/${onlineUser.user.estateName}`)
        .then(response => response.json())
        .then(data => {
          
            if(data.status === 200){
                setData(data.estateManager[data.estateManager.length > 1 ? data.estateManager.length - 1 : 0])
               
            }
          
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    useEffect(() => {
        estateUser()
    }, [])
  return (
    <Box mt={["-200px","-200px","-120px","-100px","-80px"]} opacity={"1"} w={["80%", "75%", "55%", "45%", "35%"]} bg="#fff" px="22px" py="17px" boxShadow={"1px 1px 18px rgba(0, 0, 0, 0.25)"} rounded="6px">
    <Text fontSize={"14px"} fontFamily="body" fontWeight={"600"} color="#424242">Just One Last Step...</Text>
    <Text mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">Your profile is going to be verified by your Estate Administrator. </Text>
    
    <Text  mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#000000">
    If the verification process is taking too long, kindly contact <Box as="span" fontWeight={"700"}>{Data?.prefix}. {Data?.lastName||"Support Team"}</Box> - <Box as="span" fontWeight="700" color={"#1869E1"} textDecor="underline"> {Data?.phone||"08068840125"}</Box>
    </Text>
   
 
  </Box>
  );
}
