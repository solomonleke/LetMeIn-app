import React from 'react'
import { useSelector } from 'react-redux';
import { isActive, isEstateAdmin, isResident, isSecurity, isSuperAdmin } from '../Authenticaation'

export default function NavList(path) {

    const onlineUser = useSelector((state) => state.onlineUser);

   


    const list = [
        {
            name: "Dashboard",
            location: "/security-ops",
            active: isActive(path, "/security-ops"),
            display: isSecurity(onlineUser.user.userType)


        },
        {
            name: "Dashboard",
            location: "/resident",
            active: isActive(path, "/resident"),
            display: isResident(onlineUser.user.userType)


        },
        {
            name: "Dashboard",
            location: "/estate-admin",
            active: isActive(path, "/estate-admin"),
            display: isEstateAdmin(onlineUser.user.userType)


        }, 
        {
            name: "Dashboard",
            location: "/superAdmin",
            active: isActive(path, "/superAdmin"),
            display: isSuperAdmin(onlineUser.user.userType)


        }, 
        {
            name: "check-in history",
            location: "/security-ops/check-in-history",
            active: isActive(path, "/security-ops/check-in-history"),
            display: isSecurity(onlineUser.user.userType)

        },
        {
            name: "check-out history",
            location: "/security-ops/check-out-history",
            active: isActive(path, "/security-ops/check-out-history"),
            display: isSecurity(onlineUser.user.userType)


        },
       
        {
            name: "uncheck-out history",
            location: "/security-ops/uncheck-out-history",
            active: isActive(path, "/security-ops/uncheck-out-history"),
            display: isSecurity(onlineUser.user.userType)


        },
        {
            name: "Verify ID",
            location: "/security-ops/verify-id",
            active: isActive(path, "/security-ops/verify-id"),
            display: isSecurity(onlineUser.user.userType)


        },
        {
            name: "Request Access",
            location: "/visitors-access",
            active: isActive(path, "/visitors-access"),
            display: isResident(onlineUser.user.userType)

        },
        {
            name: "Request Access",
            location: "/visitors-access",
            active: isActive(path, "/visitors-access"),
            display: isEstateAdmin(onlineUser.user.userType)

        },
      
        {
            name: "History",
            location: "/manage-access-history",
            active: isActive(path, "/manage-access-history"),
            display: isResident(onlineUser.user.userType)

        },
        {
            name: "Temporary Pass",
            location: "/temporary-pass",
            active: isActive(path, "/temporary-pass"),
            display: isResident(onlineUser.user.userType)

        },
        {
            name: "Manage Temporary Pass",
            location: "/temporary-pass",
            active: isActive(path, "/temporary-pass"),
            display: isEstateAdmin(onlineUser.user.userType)

        },
        {
            name: "History",
            location: "/manage-access-history-admin",
            active: isActive(path, "/manage-access-history-admin"),
            display: isEstateAdmin(onlineUser.user.userType)

        },
       
        {
            name: "Manage Verified IDs",
            location: "/manage-verify-id",
            active: isActive(path, "/manage-verify-id"),
            display: isEstateAdmin(onlineUser.user.userType)

        },
        {
            name: "Full Report",
            location: "/full-report",
            active: isActive(path, "/full-report"),
            display: isEstateAdmin(onlineUser.user.userType)

        },
        {
            name: "New Estate/Office",
            location: "/superAdmin/newOffice",
            active: isActive(path, "/superAdmin/newOffice"),
            display: isSuperAdmin(onlineUser.user.userType)

        },
        {
            name: "Manage Estate/Office",
            location: "/superAdmin/manageEstate",
            active: isActive(path, "/superAdmin/manageEstate"),
            display: isSuperAdmin(onlineUser.user.userType)

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
