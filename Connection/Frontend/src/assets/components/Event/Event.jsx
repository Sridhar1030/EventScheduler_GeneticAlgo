import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function Events() {
    const [events, setEvents] = useState([]);

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

    const handleFormSubmission = () => {
        // This function is empty because there's no form to submit in this component
        // You can add functionality here if needed in the future
    };

    return (
        <>
            <Navbar />
            <h1 className='border border-blue-500 w-96 text-2xl mx-auto text-center mt-6 mb-10'>LIVE EVENTS</h1>

            <div className='mt-5 ml-10'>
                {events.map((event, index) => (
                    <Link
                        to={`/${event.name}`}
                        state={{ eventIndex: index }} // Pass the index of the clicked event
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
