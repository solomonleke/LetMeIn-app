import { Box, Center, Img, Text } from '@chakra-ui/react';
import React from 'react';

export default function IndexHome() {


  return (
    <Box bgImage="url(/bg_img.png)" bgSize ={'cover'}
            bgRepeat={'repeat'}
            height="100vh">
        
            

            <Center>
                <Img src="/full_logo.png" />
                <Text></Text>
            </Center>
    </Box>
  );
}
