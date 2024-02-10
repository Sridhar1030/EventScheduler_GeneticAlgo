import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function EventForm({ eventName }) {
    const [formData, setFormData] = useState({
        username: '', // Add username state
        event_name: '', // Add event_name state
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register-event/', formData)
            .then(response => {
                console.log(response.data);
                // Handle success, e.g., show a success message or redirect
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, e.g., show an error message
            });
    };

    return (
        <>
            <div className='bg-black h-screen text-white'>
                <div className='w-full h-10'></div> {/*Div for space*/}
                <div className='flex flex-col top-10'>
                    <h2 className='text-center text-4xl top-10 gap-10 mb-10'>Event Form for {eventName}</h2>
                </div>
                <form className="max-w-sm mx-auto mt-24" onSubmit={handleSubmit}>
                    <div className="mb-5 gap-10">
                        <label htmlFor="usernameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="username" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                    </div>
                    <div className="mb-5 gap-10">
                        <label htmlFor="eventNameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                        <input type="text" id="event_name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                    </div>
                    <button type="submit" className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default EventForm;
