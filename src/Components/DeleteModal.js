import React from "react"

import { Box,Button,Text,ModalBody,Modal,ModalFooter,ModalHeader,ModalCloseButton,ModalOverlay,ModalContent,useDisclosure  } from "@chakra-ui/react"



function DeleteModal() {
    const { isOpen, onOpen, onClose } = useDisclosure
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
         
        </Box>
  
        <Button mt={4} onClick={onOpen}>
          Open Modal
        </Button>
        
      </>
    )
  }
  export default DeleteModal