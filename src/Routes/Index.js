import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EstateAdmin from '../Pages/Estate-admin/Index'
import ManageVerified from '../Pages/Estate-admin/ManageVerified'
import VerifyId from '../Pages/Estate-admin/VerifyId'
import Home from '../Pages/Home'
import IndexHome from '../Pages/Index'
import LandLord from '../Pages/Landlord/Index'
import Index from '../Pages/Residents/Index'
import GrantAccess from '../Pages/Security/GrantAccess'
import SecurityOps from '../Pages/Security/Index'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Verification from '../Pages/Verification'
import VisitorsAccess from '../Pages/VisitorsAccess'


export default function IndexRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<IndexHome/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/resident' element={<Index/>}/>
            <Route path='/estate-admin' element={<EstateAdmin/>}/>
            <Route path='/landlord' element={<LandLord/>}/>
            <Route path='/security-ops' element={<SecurityOps/>}/>
            <Route path='/security-ops/grant-access' element={<GrantAccess/>}/>
            <Route path='/visitors-access' element={<VisitorsAccess/>}/>
            <Route path='/verify-id' element={<VerifyId/>}/>
            <Route path='/manage-verify-id' element={<ManageVerified/>}/>
            <Route path='/verification' element={<Verification/>}/>
           
        </Routes>
    </BrowserRouter>
  )
}
