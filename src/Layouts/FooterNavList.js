import React from 'react'
import { useSelector } from 'react-redux';
import { isActive, isEstateAdmin, isResident, isSecurity, isSuperAdmin } from '../Authenticaation'

export default function FooterNavList(path) {

    const onlineUser = useSelector((state) => state.onlineUser);

   


    const list = [
      
       
   
        {
            name: "Homepage",
            location: "/",
            active: isActive(path, "/"),
            display: true

        },
   
        {
            name: "customer support",
            location: "/customer-support",
            active: isActive(path, "/customer-support"),
            display: true

        },
    ]

  return list
  
}
