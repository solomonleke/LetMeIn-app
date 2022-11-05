import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
  } from '@chakra-ui/react'
import Button from './Button';

export default function ConfirmationModal({isOpen, onClose, Proceed}) {
  return (

    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242" textAlign="center">Are you sure you want to 
        approve this request</Text>
      </ModalBody>

      <ModalFooter justifyContent={"space-between"}>
        <Button w='20px' onClick={Proceed} colorScheme='blue' mr={3}>
            Yes
        </Button>
        <Button w='20px' variant='ghost' onClick={onClose}>No</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
}
