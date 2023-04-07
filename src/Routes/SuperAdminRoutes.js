import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isResident, isSuperAdmin } from '../Authenticaation'



export default function SuperAdminRoutes() {

  const onlineUser = useSelector((state) => state.onlineUser);


  let auth = {"token": isSuperAdmin(onlineUser.user.userType)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/home"/>
  )
}
