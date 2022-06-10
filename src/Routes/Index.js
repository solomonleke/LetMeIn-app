import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EstateAdmin from '../Pages/Estate-admin/Index'
import Home from '../Pages/Home'
import Page2 from '../Pages/Page2'
import Index from '../Pages/Residents/Index'
import SecurityOps from '../Pages/Security/Index'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Verification from '../Pages/Verification'
import VisitorsAccess from '../Pages/VisitorsAccess'
import Sample from '../Redux/Reducers/Sample'

export default function IndexRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/resident' element={<Index/>}/>
            <Route path='/estate-admin' element={<EstateAdmin/>}/>
            <Route path='/security-ops' element={<SecurityOps/>}/>
            <Route path='/visitors-access' element={<VisitorsAccess/>}/>
            <Route path='/verification' element={<Verification/>}/>
            <Route path='/page' element={<Page2/>}/>
            <Route path='/sample' element={<Sample/>}/>
        </Routes>
    </BrowserRouter>
  )
}
