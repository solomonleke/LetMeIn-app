import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Confirmation from '../Pages/Confirmation'
import EstateAdmin from '../Pages/Estate-admin/Index'
import ManageVerified from '../Pages/Estate-admin/ManageVerified'
import VerifyId from '../Pages/Estate-admin/VerifyId'
import Home from '../Pages/Home'
import IndexHome from '../Pages/Index'
import LandLord from '../Pages/Landlord/Index'
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
           

            <Route path='/visitors-access' element={
              <ProtectedRoute user={User} >
                 <VisitorsAccess/>
              </ProtectedRoute>
            }/>
            <Route path='/security-ops/check-in-history' element={
              <ProtectedRoute user={User} >
                 <CheckInHistory/>
              </ProtectedRoute>
            }/>
            
            <Route path='/verify-id' element={<VerifyId/>}/>
            <Route path='/manage-verify-id' element={<ManageVerified/>}/>
            <Route path='/verification' element={<Verification/>}/>
           
        </Routes>
    </BrowserRouter>
  )
}
