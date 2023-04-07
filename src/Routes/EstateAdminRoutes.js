import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isEstateAdmin, isResident } from '../Authenticaation'



export default function EstateAminRoutes() {

  const onlineUser = useSelector((state) => state.onlineUser);


  let auth = {"token": isEstateAdmin(onlineUser.user.userType)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/home"/>
  )
}
