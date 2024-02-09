import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const clearDatabase = () => {
        axios.post('http://localhost:8000/api/clear-database/')
            .then(response => {
                console.log(response.data); // Database cleared successfully message
            })
            .catch(error => {
                console.error('Error clearing database:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '1234') {
            setAccessGranted(true);
        } else {
            setError('Wrong password');
        }
    };

    return (
        <div className='flex justify-center mt-10 items-center border border-red-500 w-96 mx-auto'>
            {!accessGranted && (
                <form onSubmit={handleSubmit}>
                    <input
                        className='bg-black w-96 h-10 text-center text-white'
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="flex flex-col mt-3 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Submit
                    </button>
                    {error && <p>{error}</p>}
                </form>
            )}
            {accessGranted && (
                <div>
                    <button onClick={clearDatabase}>Clear Database</button>
                </div>
            )}
        </div>
    );
};

export default Delete;
