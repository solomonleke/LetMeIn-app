import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isResident } from '../Authenticaation'



export default function ResidentRoutes() {

  const onlineUser = useSelector((state) => state.onlineUser);


  let auth = {"token": isResident(onlineUser.user.userType)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/home"/>
  )
}
