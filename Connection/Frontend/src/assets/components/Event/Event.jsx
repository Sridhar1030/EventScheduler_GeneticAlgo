import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';



// Function to calculate the total number of days between two dates
function calculateTotalDays(startDate, endDate) {
    const startParts = startDate.split('-').map(Number);
    const endParts = endDate.split('-').map(Number);
    const start = new Date(startParts[2], startParts[1] - 1, startParts[0]);
    const end = new Date(endParts[2], endParts[1] - 1, endParts[0]);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays;
}

// Component to display events
function Events() {
    // State to store the list of events
    const [events, setEvents] = useState([]);




    // Fetch events from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/get-events/')
            .then(response => {
                // Reverse the order of events before setting them in state
                setEvents(response.data.reverse());
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount




    // Render the component
    return (
        <>
            <Navbar />
            <h1 className='border-2 border-blue-500 w-96 text-2xl mx-auto text-center mt-6 mb-10'>LIVE EVENTS</h1>
            <div className='mt-5 ml-10'>
                {/* Map through the list of events and render each event */}
                {events.map((event, index) => (
                    <Link
                        to={`/${event.name}`}
                        state={{ eventIndex: index }}
                        key={event.id}
                    >
                        <div>
                            <button className='flex' onClick={() => console.log("index is " + index)}>
                                <div className='cursor-pointer border border-red-500 w-96 mb-4 p-4 rounded transition duration-300 ease-in-out transform hover:scale-105'>
                                    <div className='flex gap-3'>
                                        <div><h2>Event Name : </h2></div>
                                        <div className='font-medium underline capitalize'>{event.name}</div>
                                    </div>
                                    <div>
                                        <strong>Start Date:</strong> {event.date}
                                    </div>
                                    <div>
                                        <strong>End Date:</strong> {event.another_date}
                                    </div>
                                    <div>
                                        <strong>Total Days:</strong> {calculateTotalDays(event.date, event.another_date)}
                                    </div>
                                    {/* Display sub-events if available */}
                                    {event.sub_events && event.sub_events.length > 0 && (
                                        <div>
                                            <strong>Sub Events:</strong>
                                            <ul>
                                                {event.sub_events.map(subEvent => (
                                                    <li key={subEvent}>{subEvent}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div>
                                        <div className='font-medium underline'>
                                            EVENT TIME
                                        </div>
                                        <div className='font-semibold'>
                                            {event.Time} to {event.EndTime}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Events;
