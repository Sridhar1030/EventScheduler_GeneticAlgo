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
            <Navbar />
            <div className='border border-red-500 gap-10 w-96 h-52 mx-auto mt-10'>
                {registeredEvents.map(event => (
                    <h2>Event Name: {event.name}</h2>
                ))}
            </div>
        </>
    );
}

export default YourEvents;
