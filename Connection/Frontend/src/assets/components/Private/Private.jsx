import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';

const Private = () => {
    
    const {user} = useContext(AuthContext)

    return (
        <>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default Private;
