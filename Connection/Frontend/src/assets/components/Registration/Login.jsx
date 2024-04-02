import React, { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={loginUser} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block font-semibold">Username</label>
                        <input type="text" name="username" id="username" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Username" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-semibold">Password</label>
                        <input type="password" name="password" id="password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Password" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
