import { set } from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [loading , setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
            });

            {
                let data = await response.json();
                if (response.status === 200) {
                    setAuthTokens(data);
                    console.log(data.access);
                    setUser('data.user')
                    localStorage.setItem('authTokens', JSON.stringify(data));
                    navigate('/home')
                } else {
                    alert("Login Failed");
                }


                // Assuming the response contains authentication tokens and user data
                // setAuthTokens(data.tokens); // Update authentication tokens
                // setUser(data.user); // Update user data
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    let logoutUser = () => {

        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem('authTokens');
        navigate('/login')
    }

    let UpdateToken = async () => {
        console.log('update token called ');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })

        })
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
        }
        else {
            logoutUser();

        }
    }



    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4;

        let interval = setInterval( ()=>{
            if (authTokens) {
                UpdateToken();
            }
            },fourMinutes)

            return () => clearInterval(interval)
    
    }, [authTokens,loading]);


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
