import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DelayMsg() {
    const onlineUser = useSelector((state) => state.onlineUser);
    const apiLink = useSelector((state) => state.apiLink);

    const [Data, setData] = useState('')

    const estateUser = ()=>{
        fetch(`${apiLink.link}/user/getEstateManager/${onlineUser.user.estateName}`)
        .then(response => response.json())
        .then(data => {
          
            if(data.status === 200){
                setData(data.estateManager[0])
                // console.log("estate user ", data.estateManager[1])
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
    <Box opacity={"1"} w={["80%", "35%"]} bg="#fff" px="22px" py="11px">
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"700"} color="#424242">Just One Last Step...</Text>
    <Text pb="9px" fontSize={"15px"} fontFamily="body" fontWeight={"500"} color="#424242">Your profile is going to be verified by your Estate Administrator.
    <br/>
    <br/>
    Kindly reload your page after 20 minutes to check if you've been verified
    </Text>
    <hr />
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"700"} color="#424242" pt="9px">If this is taking too long...</Text>
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"500"} color="#424242">You can contact {Data?.prefix}. {Data?.lastName||"Support Team"} {Data?.firstName||""} <Box as="span" color={"#162B96"} textDecor="underline">{Data?.phone||"08068840125"}</Box></Text>

  </Box>
  );
}
