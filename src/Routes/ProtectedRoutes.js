import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../Authenticaation'



export default function ProtectedRoutes() {

  const isLogged = useSelector((state) => state.isLogged);
  const onlineUser = useSelector((state) => state.onlineUser);

  let auth = {"token": isAuthenticated(isLogged,onlineUser)}

  

  return (
   auth.token ? <Outlet/> : <Navigate to="/sign-in"/>
  )
}
