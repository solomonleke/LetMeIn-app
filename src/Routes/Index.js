import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Page2 from '../Pages/Page2'
import SignUp from '../Pages/SignUp'
import Sample from '../Redux/Reducers/Sample'

export default function IndexRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/page' element={<Page2/>}/>
            <Route path='/sample' element={<Sample/>}/>
        </Routes>
    </BrowserRouter>
  )
}
