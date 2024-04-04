import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Genetic = () => {
    const location = useLocation();
    const eventIndex = location.state ? location.state.eventIndex : '';
    const eventName = location.state ? location.state.eventName : '';

    // Define the state for sub events and best schedule
    const [subEvents, setSubEvents] = useState([]);
    const [event, setEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [bestSchedule, setBestSchedule] = useState([]);

    useEffect(() => {
        if (eventIndex !== null && eventName !== '') {
            axios.get(`http://localhost:8000/api/get-events/`)
                .then(response => {
                    console.log("get events ", response.data);
                    const reversedEvents = response.data.reverse();
                    if (reversedEvents && reversedEvents.length > eventIndex) {
                        const selectedEvent = reversedEvents[eventIndex];
                        const selectedEventName = selectedEvent.name;
                        const eventStartTime = selectedEvent.startTime; // Assuming the start time property is named 'startTime'
                        setEvent(selectedEventName);
                        setStartTime(eventStartTime); // Add this line to set the start time state
                        axios.get(`http://127.0.0.1:8000/api/get-sub-events/${selectedEventName}/`)
                            .then(subEventResponse => {
                                console.log('Sub Event Response:', subEventResponse.data); // Log sub event data here
                                const formattedSubEvents = subEventResponse.data.map(subEvent => ({
                                    eventName: selectedEventName,
                                    name: subEvent.name,
                                    duration: subEvent.duration,
                                    spaceNumber: subEvent.spaceNumber,
                                    event_date: selectedEvent.date, // Assuming event_date is a property of selectedEvent
                                    end_event_date: selectedEvent.endEventDate // Assuming end_event_date is a property of selectedEvent
                                }));
                                console.log('Formatted sub events:', formattedSubEvents);
                                setSubEvents(formattedSubEvents);
                                // Run genetic algorithm on sub events
                                runGeneticAlgorithm(formattedSubEvents);
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

    const runGeneticAlgorithm = (events) => {
        console.log('Running genetic algorithm...', events);
        const data = {
            events_data: events,
            population_size: 10,
            num_generations: 10,
        };

        axios.post('http://localhost:8000/api/run-genetic-algorithm/', data)
            .then(response => {
                console.log('Genetic algorithm response = ', response.data.best_schedule);
                // Update the state with the best schedule received from the backend
                const updatedBestSchedule = {
                    ...response.data.best_schedule,
                    events: response.data.best_schedule.events.map((event, index) => ({
                        ...event,
                        space_number: events.find(subEvent => subEvent.name === event.name).spaceNumber, // Find the corresponding spaceNumber
                    })),
                };
                setBestSchedule(updatedBestSchedule);
                console.log('Best schedule:', updatedBestSchedule);
            })
            .catch(error => {
                console.error('Error running genetic algorithm:', error);
            });
    };



    // Helper function to format time (assuming time is in 24-hour format)
    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    // Calculate start and end times for each subevent based on event start time and durations
    // Calculate start and end times for each subevent based on event start time and durations
    const calculateEventTimes = () => {
        if (!bestSchedule || !bestSchedule.events) return []; // Add this check
        let currentTime = parseFloat(startTime);
        const sortedEvents = bestSchedule.events.slice().sort((a, b) => a.startTime - b.startTime); // Sort events by start time
        return sortedEvents.map(subEvent => {
            const correspondingEvent = subEvents.find(event => event.name === subEvent.name);
            if (correspondingEvent) {
                const startTime = currentTime;
                const endTime = currentTime + correspondingEvent.duration;
                currentTime = endTime;
                return { ...correspondingEvent, startTime, endTime, spaceNumber: subEvent.space_number };
            }
            return subEvent;
        });
    };




    return (
        <>
            <Navbar />
            <div className='bg-[#0D1117] text-white h-full min-h-screen'>

            <h1 className='text-3xl text-center sticky  underline font-bold'>Genetic Algorithm</h1>
            <div className='flex justify-center items-center mt-32'>
                <div className='border-2 border-white p-10 cursor-pointer rounded-md hover:border-blue-500 hover:scale-110 transition duration-500'>
                    <div className=''>
                        <div className='font-bold underline text-2xl'>
                            Event Name : {event}
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold mt-4'>Subevents:</h2>
                            {subEvents.map((subEvent, index) => (
                                <tr key={index} className="">
                                    <td className="border border-gray-400 p-2 w-60">{subEvent.name}</td>
                                    <td className="border border-gray-400 p-2">{subEvent.duration}</td>
                                </tr>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col justify-center mx-auto text-center w-96 h-96 ">
                <h1>Genetic Algorithm</h1>
                <h2 className="font-semibold">Subevents Table:</h2>
                <table className="border-collapse border border-gray-400 mt-2">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 p-2">Subevent</th>
                            <th className="border border-gray-400 p-2">Duration</th>
                            <th className="border border-gray-400 p-2">Start Time</th>
                            <th className="border border-gray-400 p-2">End Time</th>
                            <th className="border border-gray-400 p-2">Space Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSchedule.events && bestSchedule.events.map((updatedBestSchedule, index) => (
                            <tr key={index} className="hover:bg-black hover:text-lg transition duration-150">
                                <td className="border border-gray-400 p-2">{updatedBestSchedule.name}</td>
                                <td className="border border-gray-400 p-2">{updatedBestSchedule.duration}</td>
                                <td className="border border-gray-400 p-2">{formatTime(updatedBestSchedule.start_time)}</td>
                                <td className="border border-gray-400 p-2">{formatTime(updatedBestSchedule.start_time+updatedBestSchedule.duration)}</td>
                                <td className="border border-gray-400 p-2">{updatedBestSchedule.space_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                        </div>
        </>
    );
    
}

export default Genetic;
