import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from '../Pages/404'
import ChangePassword from '../Pages/ChangePassword'
import Confirmation from '../Pages/Confirmation'
import CustomerSupport from '../Pages/CustomerSupport'
import EstateAdmin from '../Pages/Estate-admin/Index'
import ManageVerified from '../Pages/Estate-admin/ManageVerified'
import VerifyId from '../Pages/Estate-admin/VerifyId'
import ForgetPassword from '../Pages/ForgetPassword'
import Home from '../Pages/Home'
import Homepage from '../Pages/Homepage'
import IndexHome from '../Pages/Index'
import LandLord from '../Pages/Landlord/Index'
import Profile from '../Pages/Profile'
import RequestHistory from '../Pages/RequestHistory'
import ResetPassword from '../Pages/ResetPassword'
import Index from '../Pages/Residents/Index'
import CheckInHistory from '../Pages/Security/CheckInHistory'
import CheckOutHistory from '../Pages/Security/CheckOutHistory'
import GrantAccess from '../Pages/Security/GrantAccess'
import SecurityOps from '../Pages/Security/Index'
import UnCheckOutHistory from '../Pages/Security/UncheckOut'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import TaxiAccess from '../Pages/TaxiAccess'
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
            <Route path='/homepage' element={<Homepage/>}/>
            <Route path='/confirmation/:lastName/:prefix' element={<Confirmation/>}/>
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
            <Route path='/sign-in/forget-password' element={<ForgetPassword/>}/>
            <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>

            <Route path='/visitors-access' element={<VisitorsAccess/>}/>
            <Route path='/request-access-history' element={<RequestHistory/>}/>
            <Route path='/404' element={<Error404/>}/>
            <Route path='/taxi-access' element={<TaxiAccess/>}/>
            <Route path='/security-ops/check-in-history' element={<CheckInHistory/>}/>        
            <Route path='/security-ops/check-out-history' element={<CheckOutHistory/>}/>        
            <Route path='/security-ops/uncheck-out-history' element={<UnCheckOutHistory/>}/>        
            <Route path='/verify-id' element={<VerifyId/>}/>
            <Route path='/manage-verify-id' element={<ManageVerified/>}/>
            <Route path='/verification' element={<Verification/>}/>
           
        </Routes>
    </BrowserRouter>
  )
}
