import React from "react";
import { useAuth } from "../auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ()=>{

    const [logged] = useAuth()

    return logged ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoute;