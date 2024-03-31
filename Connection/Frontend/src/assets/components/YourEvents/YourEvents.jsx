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
        <div className='bg-gray-900 h-screen relative'> {/* Set position to relative */}
            <Navbar />
            {registeredEvents.map(event => (
                <div 
                    key={event.id} // Ensure each event has a unique key
                    className='gap-10 w-96 h-36 mx-auto mt-10 bg-blue-300 relative ' 
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s, background-color 0.3s', border: 'none' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 12px rgba(159, 160, 222, 0.8)';
                        e.currentTarget.style.backgroundColor = '#90cdf4'; // Change background color to blue 300
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.backgroundColor = ''; // Reset background color on mouse leave
                    }}
                >
                    <div className='font-bold '>
                        <h2 className='pt-4 ml-7'>Username: {event.username}</h2> {/* Adjusted margin-top */}
                        <h2 className='ml-7'>Eventname: {event.eventName}</h2>
                        <h2 className='ml-7'>Sub Eventname: {event.subEventName}</h2>
                        <h2 className='ml-7 '>Space Number: {event.spaceNumber}</h2>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default YourEvents;
