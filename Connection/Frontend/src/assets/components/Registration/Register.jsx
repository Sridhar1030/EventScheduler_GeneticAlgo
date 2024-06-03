import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    let { registerUser, user} = useContext(AuthContext);

    useEffect(() => {
        const checkUser = () => {
            if(user){
                window.location.href = '/';
            }
        }
        checkUser();
    },[user])

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={registerUser} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block font-semibold">Username</label>
                        <input type="text" name="username" id="username" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Username" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold">Email</label>
                        <input type="email" name="email" id="email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Username" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-semibold">Password</label>
                        <input type="password" name="password" id="password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Password" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                   
                </form>
                <div className="text-center">
                        <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                    </div>
            </div>
        </div>
    );
};

export default Register;
