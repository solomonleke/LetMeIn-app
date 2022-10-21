import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  Text,
} from '@chakra-ui/react'
import Button from './Button';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
export default function EventModal({ isOpen, onClose }) {

  const onlineUser = useSelector((state) => state.onlineUser);
  const apiLink = useSelector((state) => state.apiLink);

  const [Data, setData] = useState('')

  const estateUser = () => {
    fetch(`${apiLink.link}/user/getEstateManager/${onlineUser.user.estateName}`)
      .then(response => response.json())
      .then(data => {

        if (data.status === 200) {
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
    <div>
      <Modal motionPreset='slideInBottom' size={"xs"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={"19px"}>
              <Box  borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#424242" >Your multiple visitor access request has been sent to your estate administrator for approval.</Box>
              <Text mt="16px" borderLeft={"7px solid #11C19E"} pl="8px" fontSize={"14px"} fontFamily="body" fontWeight={"300"} color="#424242">
                Estate Admin -<Box as="span" color="#00000" fontWeight={"700"}>{Data?.prefix}. {Data?.lastName || "Support Team"}</Box> <br/>
                Phone No - <Box as="span" fontWeight="700" color={"#1869E1"} textDecor="underline">{Data?.phone || "08068840125"}</Box>
              </Text>
              <Box fontSize={"14px"} fontFamily="body" color="#424242" fontWeight={"300"} borderLeft={"7px solid #11C19E"} pl="8px">kindly use the button below to complete this request, after your estate manager approves the access request.</Box>
            </Stack>

            <Button mt="35px" disabled={true}>Request Access</Button>
            <Text fontSize={"12px"} textAlign="center" mt="8px" fontFamily="body" color="#424242" fontWeight={"400"}>This access code is only valid for 20 people.
            </Text>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
