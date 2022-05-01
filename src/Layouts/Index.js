import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function MainLayout({children, bgColor = "white", pageTitle="setup"}) {
  return (
    <div>
        <NavBar/>
           { pageTitle}
            {children}
        <Footer/>
    </div>
  )
}
