import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Genetic = () => {
    const location = useLocation();
    const eventIndex = location.state ? location.state.eventIndex : '';
    const eventName = location.state ? location.state.eventName : '';
    console.log("location state ", location.state)



    // Define the state for sub events
    const [subEvents, setSubEvents] = useState([]);
    const [event, eventNames] = useState([]);

    useEffect(() => {
        if (eventIndex !== null && eventName !== '') {
            axios.get('http://localhost:8000/api/get-events/')
                .then(response => {
                    // Reverse the order of events before processing
                    const reversedEvents = response.data.reverse();
                    if (reversedEvents && reversedEvents.length > eventIndex) {
                        const selectedEventName = reversedEvents[eventIndex].name;
                        eventNames(selectedEventName)
                        axios.get(`http://127.0.0.1:8000/api/get-sub-events/${selectedEventName}/`)
                            .then(subEventResponse => {
                                setSubEvents(subEventResponse.data);

                            })
                            .catch(error => {
                                console.error('Error fetching sub-events:', error);
                            });
                    } else {
                        console.error('Invalid event index');
                    }
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                });
        }
    }, [eventIndex]);

    return (
        <>
            <h1 className='text-3xl text-center sticky mt-10 underline font-bold'>Genetic Algorithm</h1>
            <div className='flex justify-center items-center mt-32'>
                <div className='border-2 border-blue-500 p-10 cursor-pointer rounded-md hover:border-yellow-300 hover:scale-110 transition duration-500'>
                    <div className=''>
                        <div className='font-bold underline text-2xl'>
                            Event Name : {event}
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold mt-4'>Subevents:</h2>

                            {subEvents.map((subEvent, index) => (
                                <div key={index}>{subEvent}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col justify-center mx-auto text-center w-96 h-96 mb-10 ">
    <h1>Algorithm implementation</h1>
    <h2 className='font-semibold'>Subevents Table:</h2>
    <table className="border-collapse border border-gray-400 mt-2">
        <thead>
            <tr>
                <th className="border border-gray-400 p-2">Subevent</th>
            </tr>
        </thead>
        <tbody>
            {subEvents.slice(0, subEvents.length - 1).map((subEvent, index) => (
                <tr key={index} className="hover:bg-gray-200">
                    <td className="border border-gray-400 p-2">{subEvent}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            
        </>
    );
}

export default Genetic;
