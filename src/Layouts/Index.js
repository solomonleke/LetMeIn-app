import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function MainLayout({children, bgColor = "white", opacity= "1"}) {
  return (
    <Box bgColor={bgColor} opacity={opacity} minH="100vh">
        <NavBar/>
          
            {children}
        <Footer/>
    </Box>
  )
}
