import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Private = () => {
    
    useEffect(() => {
        const fetchToken = () => {
            const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        }
        fetchToken()
    },[])


    return (
        <>
            {token ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default Private;