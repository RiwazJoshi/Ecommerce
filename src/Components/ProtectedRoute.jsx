import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectedRoute=(props)=>{
if (props.login_status) {
   return <Outlet/> 
}
else
    return  <Navigate to ="Login"/>
}
export default ProtectedRoute