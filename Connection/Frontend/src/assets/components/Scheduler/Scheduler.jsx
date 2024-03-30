import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Scheduler = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/get-events/')
            .then(response => {
                // Reverse the order of events before setting them in state
                console.log("hi",response.data);
                setEvents(response.data.reverse());
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className='mt-1 h-svh'>
                <h1 className='text-3xl text-center sticky'>Scheduler</h1>
                <div className='ml-10'>
                    {events.map((event, index) => (
                        <Link
                            to={`/genetic/${event.name}`}
                            state={{ eventIndex: index }}
                            key={event.id}
                        >
                            <div className=''>
                                <div className='cursor-pointer border-2 border-blue-700 w-96 mb-4 p-4 rounded transition duration-300 ease-in-out transform hover:scale-105'>
                                    <div className='flex gap-3'>
                                        <div><h2>Event Name : </h2></div>
                                        {/* Check if the property name is 'eventName' */}
                                        <div className='font-medium underline capitalize'>{event.name}</div>
                                    </div>
                                    <div>
                                        <strong>Start Date:</strong> {event.date}
                                    </div>
                                    <div>
                                        <strong>End Date:</strong> {event.endEventDate}
                                    </div>

                                    {/* Check if the property name is 'subEvents' */}
                                    {/* Display sub-events if available */}
                                    {event.subEvents && event.subEvents.length > 0 && (
                                        <div>
                                            <strong>Sub Events:</strong>
                                            <ul>
                                                {event.subEvents.map(subEvent => (
                                                    <li key={subEvent.name} className='font-semibold'>{subEvent.name} 
                                                    <span className='px-4'>plot number:- {subEvent.spaceNumber}</span>
                                                        <div className='flex flex-row'>

                                                            <div className='font-semibold'> Duration :
                                                            </div>
                                                            <div className='font-normal '>
                                                                {subEvent.duration}
                                                            </div>
                                                        </div></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div>
                                        <div className='font-medium underline'>
                                            EVENT TIME
                                        </div>
                                        <div className='font-semibold'>
                                            {/* Check if the property names are 'startTime' and 'endTime' */}
                                            {event.startTime} to {event.end_Time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Scheduler;
