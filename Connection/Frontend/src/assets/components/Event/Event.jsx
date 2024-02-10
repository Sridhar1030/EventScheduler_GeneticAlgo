import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from Django backend
        axios.get('http://localhost:8000/api/get-events/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            <Navbar/>
            <h1 className='border border-blue-500 w-96 text-2xl mx-auto text-center mt-6 mb-10'>LIVE EVENTS</h1>



            <div className='mt-5 ml-10'>
        {events.map(event => (
            <div className='cursor-pointer border border-red-500 w-96 mb-4 p-4 rounded transition duration-300 ease-in-out transform hover:scale-105' key={event.id}>
                {/* <marquee scrollamount='3'> */}
                <p className='text-xl'>{event.name}</p>
                <div>
                            <strong>Start Date:</strong> {event.date}
                </div>
                <div>
                            <strong> End Date:</strong> {event.another_date}
                </div>
                {/* </marquee> */}
            </div>
        ))}
</div>



            
        </>
    );
}

export default Events;
