import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Function to calculate the total number of days between two dates
function calculateTotalDays(startDate, endDate) {
    if (!startDate || !endDate) return 0; // Handle cases where either startDate or endDate is undefined
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
                console.log(response.data); // Add this line to log the response data
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    // Render the component
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-[#1a1c2e] text-[#1a1c2e] dark:text-white">
            <Navbar />
            
            <div className="container mx-auto px-6 pt-24 pb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]"
                >
                    Live Events
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Map through the list of events and render each event */}
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/${event.name}`}
                                state={{ eventIndex: index }}
                                className="block h-full"
                            >
                                <div className="h-full p-6 rounded-xl bg-white dark:bg-[#262940] border border-[#e1e6f0] dark:border-[#32374f] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                                    <div className="mb-4 pb-3 border-b border-[#e1e6f0] dark:border-[#32374f]">
                                        <h2 className="text-xl font-bold text-[#3a4980] dark:text-[#a5b4e3] capitalize mb-1">
                                            {event.name}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="px-3 py-1 text-xs rounded-full bg-[#5e7ce2]/10 text-[#5e7ce2] dark:bg-[#5e7ce2]/20">
                                                {calculateTotalDays(event.date, event.another_date)} days
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 text-[#505565] dark:text-[#a3adc2]">
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5e7ce2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <span className="text-sm">Start: </span>
                                                <span className="font-medium">{event.date}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5e7ce2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <span className="text-sm">End: </span>
                                                <span className="font-medium">{event.endEventDate}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5e7ce2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <span className="text-sm">Time: </span>
                                                <span className="font-medium">{event.startTime} - {event.end_Time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Display sub-events if available */}
                                    {event.subEvents && event.subEvents.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-[#e1e6f0] dark:border-[#32374f]">
                                            <h3 className="font-medium text-[#3a4980] dark:text-[#a5b4e3] mb-2">Sub Events:</h3>
                                            <ul className="space-y-1 text-[#505565] dark:text-[#a3adc2]">
                                                {event.subEvents.slice(0, 3).map(subEvent => (
                                                    <li key={subEvent.name} className="flex items-center">
                                                        <span className="w-2 h-2 rounded-full bg-[#5e7ce2] mr-2"></span>
                                                        <span className="text-sm">
                                                            {subEvent.name} 
                                                            <span className="text-xs text-[#727888] dark:text-[#8996b8]">
                                                                {" "}- {subEvent.duration}
                                                                {subEvent.spaceNumber && `, Slot: ${subEvent.spaceNumber}`}
                                                            </span>
                                                        </span>
                                                    </li>
                                                ))}
                                                {event.subEvents.length > 3 && (
                                                    <li className="text-xs text-[#5e7ce2]">
                                                        +{event.subEvents.length - 3} more sub-events
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className="mt-6 flex justify-end">
                                        <div className="text-sm text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">
                                            View Details
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Events;