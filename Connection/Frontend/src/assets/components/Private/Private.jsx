import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Private = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = () => {
            const storedToken = localStorage.getItem('authTokens');
            if (storedToken) {
                setToken(JSON.parse(storedToken));
            }
        };
        fetchToken();
    }, []);

    return (
        <>
            {token?.refresh ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default Private;
