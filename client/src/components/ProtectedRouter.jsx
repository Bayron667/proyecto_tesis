import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import parseJwt from "../components/parseJwt";

export const ProtectedRouter = () => {
    let token = parseJwt(localStorage.getItem('token')).exp * 1000 >  Date.now();

    if(token === false) {
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}
