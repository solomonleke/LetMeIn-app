import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChangePassword from '../Pages/ChangePassword'
import Confirmation from '../Pages/Confirmation'
import CustomerSupport from '../Pages/CustomerSupport'
import EstateAdmin from '../Pages/Estate-admin/Index'
import ManageVerified from '../Pages/Estate-admin/ManageVerified'
import VerifyId from '../Pages/Estate-admin/VerifyId'
import Home from '../Pages/Home'
import IndexHome from '../Pages/Index'
import LandLord from '../Pages/Landlord/Index'
import Profile from '../Pages/Profile'
import Index from '../Pages/Residents/Index'
import CheckInHistory from '../Pages/Security/CheckInHistory'
import GrantAccess from '../Pages/Security/GrantAccess'
import SecurityOps from '../Pages/Security/Index'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Verification from '../Pages/Verification'
import VisitorsAccess from '../Pages/VisitorsAccess'
import { ProtectedRoute } from './Protected'



export default function IndexRoutes() {

  const isLogged = useSelector((state) => state.isLogged);
  const [User, setUser] = useState(isLogged.isLogged);

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<IndexHome/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/confirmation' element={<Confirmation/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>

            <Route path='/resident' element={<Index/>}/>
            <Route path='/estate-admin' element={<EstateAdmin/>}/>
            <Route path='/landlord' element={<LandLord/>}/>
            <Route path='/security-ops' element={<SecurityOps/>}/>
            <Route path='/security-ops/grant-access' element={<GrantAccess/>}/>
            <Route path='/my-profile' element={<Profile/>}/>
            <Route path='/customer-support' element={<CustomerSupport/>}/>
            <Route path='/change-password' element={<ChangePassword/>}/>

            <Route path='/visitors-access' element={<VisitorsAccess/>}/>
            <Route path='/security-ops/check-in-history' element={<CheckInHistory/>}/>        
            <Route path='/verify-id' element={<VerifyId/>}/>
            <Route path='/manage-verify-id' element={<ManageVerified/>}/>
            <Route path='/verification' element={<Verification/>}/>
           
        </Routes>
    </BrowserRouter>
  )
}
