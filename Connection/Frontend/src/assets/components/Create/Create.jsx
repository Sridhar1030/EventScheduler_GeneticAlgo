import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Create = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const handleCreateEvent = async () => {
        try {
            if (eventName.trim() !== '' && eventDate.trim() !== '') {
                // Send event name and event date to Django backend using POST
                await axios.post('http://localhost:8000/api/create-event/', { eventName, eventDate });

                setEventName('');
                setEventDate('');
                alert('Event created successfully!');
            } else {
                alert('Please enter a valid event name and date.');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex justify-center align-middle items-center'>
                <div className="w-72 ">
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" "
                        />
                        <label className="block text-sm text-gray-500 mb-1">Event Name</label>

                    </div>
                    <div className='gap-7 mt-5'>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" "
                        />
                        <label className="font-normal text-gray-500 text-sm mt-2">Event Date</label>
                    </div>
                </div>
            </div>
            <div className='flex ml-32'></div>
            <div className='m-10 gap-10'>

                <button
                    className="relative inline-flex items-center mx-auto p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white "
                    onClick={handleCreateEvent}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Create event
                    </span>
                </button>
            </div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <Link to="/event">Link to Events</Link>
                </span>
            </button>
        </>
    );
};
export default Create;
