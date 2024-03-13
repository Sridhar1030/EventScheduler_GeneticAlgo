import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Scheduler = () => {


    const[events,seeEvents] = useState([])
    // Fetch events from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/get-events/')
            .then(response => {
                // Reverse the order of events before setting them in state
                console.log(response.data)
                seeEvents(response.data.reverse());
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);
    return (
        <>
            <Navbar/>
            <div className='mt-1  h-svh'>
                <h1 className='text-3xl text-center sticky'>Scheduler</h1>
                <div className='ml-10'>

                {events.map((event, index) => (
                    <Link
                        to={`/genetic/${event.name}`}
                        state={{ eventIndex: index }}
                        key={event.id}
                    >
                    <div className=''>
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
                    </div>
                    </Link>
                ))}
            </div>
                </div>

        </>
    )
}

export default Scheduler