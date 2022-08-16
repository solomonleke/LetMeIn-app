import { Box, Center, Img, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function IndexHome() {
 const nav = useNavigate()

 const dispatch = useDispatch();


 useEffect(() => {
    setTimeout(() => {
        nav("/homepage")
    }, 5000);
 }, []);

 const logout = () => {

    dispatch(

      { type: "SIGN_IN", payload: { isLogged: false } }
    )

    dispatch(

      { type: "ADD_USER", payload: { data: "" } }
    );



    nav("/home")


  }


    return (
        <Box bgImage="url(/bg_img.png)" bgSize={'cover'}
            bgRepeat={'repeat'}
            height="100vh">

            <Center pt="40vh">
                <Box pos={"relative"} >
                    <Img src="/full_logo.png" />
                    <Text fontSize={"18.5px"} color="#fff" fontWeight="500" w={"80%"} letterSpacing="1px" fontFamily={"body"} pos={"absolute"} left={"56px"} top={"58px"}>Easy . Safe . Smart </Text>
                </Box>
                {

                    // <Text onClick={logout} mt={"12px"} pl={"15px"} fontFamily={"body"} fontSize="14px" fontWeight={"400"} lineHeight="16px" color={"#424242"}>Logout</Text>
                }

            </Center>
        </Box>
    );
}
