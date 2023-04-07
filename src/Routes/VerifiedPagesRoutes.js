import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isResident, isVerified } from '../Authenticaation'



export default function VerifiedPagesRoutes() {

  const onlineUser = useSelector((state) => state.onlineUser);


  let auth = {"token": isVerified(onlineUser.user.userType)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/home"/>
  )
}
