import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from '../Pages/404'
import ChangePassword from '../Pages/ChangePassword'
import Confirmation from '../Pages/Confirmation'
import CustomerSupport from '../Pages/CustomerSupport'
import EstateAdmin from '../Pages/Estate-admin/Index'
import ManageVerified from '../Pages/Estate-admin/ManageVerified'
import ResidentRequest from '../Pages/Estate-admin/ResidentRequest'
import VerifyId from '../Pages/Estate-admin/VerifyId'
import ForgetPassword from '../Pages/ForgetPassword'
import FullReport from '../Pages/FullReport'
import Home from '../Pages/Home'
import Homepage from '../Pages/Homepage'
import IndexHome from '../Pages/Index'
import LandLord from '../Pages/Landlord/Index'
import Notification from '../Pages/Notification'
import Profile from '../Pages/Profile'
import RequestHistory from '../Pages/RequestHistory'
import ResetPassword from '../Pages/ResetPassword'
import Index from '../Pages/Residents/Index'
import CheckInHistory from '../Pages/Security/CheckInHistory'
import CheckOutHistory from '../Pages/Security/CheckOutHistory'
import GrantAccess from '../Pages/Security/GrantAccess'
import SecurityOps from '../Pages/Security/Index'
import UnCheckOutHistory from '../Pages/Security/UncheckOut'
import VerifyID from '../Pages/Security/VerifyID'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import IndexAdmin from '../Pages/superAdmin/Index'
import ManageEstate from '../Pages/superAdmin/ManageEstate'
import NewOffice from '../Pages/superAdmin/NewOffice'
import VerifyAdmin from '../Pages/superAdmin/VerifyAdmin'
import TaxiAccess from '../Pages/TaxiAccess'
import Verification from '../Pages/Verification'
import VisitorsAccess from '../Pages/VisitorsAccess'
import EstateAminRoutes from './EstateAdminRoutes'
import ProtectedRoutes, { ProtectedRoute } from './ProtectedRoutes'
import ResidentRoutes from './ResidentRoutes'
import SecurityRoutes from './SecurityRoutes'
import SuperAdminRoutes from './SuperAdminRoutes'
import VerifiedPagesRoutes from './VerifiedPagesRoutes'
import Privacy from '../Pages/Privacy'
import TemporaryPass from '../Pages/TemporaryPass'
import ManageRequestHistory from '../Pages/Residents/ManageRequestHistory'
import ManageRequestHistoryAdmin from '../Pages/Estate-admin/ManageRequestHistoryAdmin'
import ViewAllEstate from '../Pages/superAdmin/ViewAllEstate'



export default function IndexRoutes() {

  const isLogged = useSelector((state) => state.isLogged);
  const [User, setUser] = useState(isLogged.isLogged);

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/confirmation/:lastName/:prefix/:boolean' element={<Confirmation />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-in/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/404' element={<Error404 />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/privacy' element={<Privacy />} />

        <Route element={<ProtectedRoutes />}>

          <Route element={<ResidentRoutes />}>

            <Route path='/resident' element={<Index />} />
            <Route path='/manage-access-history' element={<ManageRequestHistory />} />
          </Route>

          <Route element={<EstateAminRoutes />}>
            <Route path='/estate-admin' element={<EstateAdmin />} />
            <Route path='/verify-id' element={<VerifyId />} />
            <Route path='/manage-verify-id' element={<ManageVerified />} />
            <Route path='/full-report' element={<FullReport />} />
            <Route path='/resident-request' element={<ResidentRequest />} />
            <Route path='/manage-access-history-admin' element={<ManageRequestHistoryAdmin />} />

          </Route>

          <Route element={<VerifiedPagesRoutes />}>
            <Route path='/visitors-access' element={<VisitorsAccess />} />
            <Route path='/temporary-pass' element={<TemporaryPass />} />
            <Route path='/taxi-access' element={<TaxiAccess />} />
            


          </Route>

          <Route element={<SecurityRoutes />}>
            <Route path='/security-ops' element={<SecurityOps />} />
            <Route path='/security-ops/grant-access' element={<GrantAccess />} />
            <Route path='/security-ops/check-in-history' element={<CheckInHistory />} />
            <Route path='/security-ops/check-out-history' element={<CheckOutHistory />} />
            <Route path='/security-ops/uncheck-out-history' element={<UnCheckOutHistory />} />
            <Route path='/security-ops/verify-id' element={<VerifyID />} />
          </Route>

          <Route element={<SuperAdminRoutes />}>
            <Route path='/superAdmin' element={<IndexAdmin />} />
            <Route path='/superAdmin/newOffice' element={<NewOffice />} />
            <Route path='/superAdmin/manageEstate' element={<ManageEstate />} />
            <Route path='/superAdmin/verifyAdmin' element={<VerifyAdmin />} />
            <Route path='/superAdmin/view-all-estate' element={<ViewAllEstate />} />

          </Route>

          <Route path='/my-profile' element={<Profile />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/customer-support' element={<CustomerSupport />} />
          <Route path='/change-password' element={<ChangePassword />} />

        </Route>


      </Routes>
    </BrowserRouter>
  )
}
