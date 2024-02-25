import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
const YourEvents = () => {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        // Fetch registered events from Django backend
        axios.get('http://localhost:8000/api/get-registered-events/')
            .then(response => {
                setRegisteredEvents(response.data.reverse());
            })
            .catch(error => {
                console.error('Error fetching registered events:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            <Navbar />
                {registeredEvents.map(event => (
            <div className='border border-red-500 gap-10 w-96 h-28  mx-auto mt-10'>
                    <>
                    <h2 className='mt-5 ml-7'>Username: {event.username}</h2>
                    <h2 className='ml-7'>Eventname: {event.event_name}</h2>
                    <h2 className='ml-7'>Sub Eventname: {event.sub_event_name}</h2>
                    </>
            </div>
                ))}
        </>
    );
}

export default YourEvents;
