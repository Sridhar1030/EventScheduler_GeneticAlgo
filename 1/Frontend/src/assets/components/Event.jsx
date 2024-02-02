import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Events;
