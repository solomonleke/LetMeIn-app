import { AlertIcon, Alert, Center, AlertTitle, CloseButton } from '@chakra-ui/react';
import React from 'react';

export default function AlertMe({title, status, onclick,  }) {
  return (
    <Center>
            <Alert status={status} mt="15px" mx={["2%","10%","20%","39%"]} color="#00000" >
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <CloseButton onClick={onclick} position='absolute' right='8px' top='8px' />
            </Alert>
        </Center>
  );
}
