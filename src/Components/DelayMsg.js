import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function DelayMsg() {
  return (
    <Box opacity={"1"} w={["80%", "35%"]} bg="#fff" px="22px" py="11px">
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"700"} color="#424242">Just One Last Step...</Text>
    <Text pb="9px" fontSize={"15px"} fontFamily="body" fontWeight={"500"} color="#424242">Your profile is going to be verified by your Estate Administrator.</Text>
    <hr />
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"700"} color="#424242" pt="9px">If this is taking too long...</Text>
    <Text fontSize={"15px"} fontFamily="body" fontWeight={"500"} color="#424242">You can contact Mr. Jubril - <Box as="span" color={"#162B96"} textDecor="underline">08047589000</Box></Text>

  </Box>
  );
}
