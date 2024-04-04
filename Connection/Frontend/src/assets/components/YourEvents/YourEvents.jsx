import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const YourEvents = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        // Fetch registered events from Django backend
        axios.get('http://localhost:8000/api/get-registered-events/')
            .then(response => {
                setRegisteredEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching registered events:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            <div className='bg-[#0D1117] min-h-screen p-0 overflow-y-scroll overflow-x-hidden' style={{
                "@apply scrollbarNone": "",
                "-ms-overflow-style": "none",
                "scrollbar-width": "none"
            }}>
                {/* Set position to relative */}
                <Navbar />
                {registeredEvents.map(event => (
                    <div
                        key={`${event.eventName}-${event.subEventName}`}
                        className='border gap-10 w-96 h-auto mx-auto mt-10 mb-10 bg-blue-300 relative transition duration-300 ease-in-out'
                    >
                        <div className='font-bold '>
                            <h2 className='pt-4 ml-7'>Event Name: {event.eventName}</h2>
                            <h2 className='ml-7'>Usernames:</h2>
                            <ul className='ml-7 '>
                                {event.usernames.map(([username, subEventName], index) => (
                                    <li  key={index}>{username} subevent: {subEventName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default YourEvents;
