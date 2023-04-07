import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isResident, isSecurity, isSuperAdmin } from '../Authenticaation'



export default function SecurityRoutes() {

  const onlineUser = useSelector((state) => state.onlineUser);


  let auth = {"token": isSecurity(onlineUser.user.userType)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/home"/>
  )
}
