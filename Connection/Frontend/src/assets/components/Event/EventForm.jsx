import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { motion } from 'framer-motion';

function EventForm() {
    const location = useLocation();
    const eventIndex = location.state ? location.state.eventIndex : '';
    const eventName = location.state ? location.state.eventName : '';

    const [formData, setFormData] = useState({
        username: '', // Add username state
        eventName: '', // Add eventName state
        subEventName: '', // Add subEventName state
        space_number: '', // Add spaceNumber state
    });
    
    const [subEvents, setSubEvents] = useState([]); // State to store sub-events
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    useEffect(() => {
        if (eventIndex !== null && eventName !== '') {
            axios.get('http://localhost:8000/api/get-events/')
                .then(response => {
                    // Reverse the order of events before processing
                    const reversedEvents = response.data.reverse();
                    if (reversedEvents && reversedEvents.length > eventIndex) {
                        const selectedEventName = reversedEvents[eventIndex].name;
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            eventName: selectedEventName
                        }));
                        axios.get(`http://127.0.0.1:8000/api/get-sub-events/${selectedEventName}/`)
                            .then(subEventResponse => {
                                console.log('Sub-events:', subEventResponse.data);
                                const subEventsData = subEventResponse.data;
                                setSubEvents(subEventsData);
                                
                                // Find the selected sub event
                                const selectedSubEvent = subEventsData.find(subEvent => subEvent.name === formData.subEventName);
                                if (selectedSubEvent) {
                                    // Set the space number from the selected sub event
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        space_number: selectedSubEvent.spaceNumber
                                    }));
                                }
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
    }, [eventIndex, eventName, formData.subEventName]);
    
    const handleChange = (e) => {
        console.log('Event target:', e.target);
        console.log('Form data before update:', formData);
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
            space_number: e.target.id === "subEventName" ? subEvents.find(subEvent => subEvent.name === e.target.value)?.space_number : formData.space_number
        });
        console.log('Form data after update:', formData);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formData); // Add this line to log formData
        axios.post('http://127.0.0.1:8000/api/register-event/', formData)
            .then(response => {
                console.log("hi" ,response.data);
                setSubmitted(true);
                setIsSubmitting(false);
                // Handle success
            })
            .catch(error => {
                console.error('Error:', error);
                setIsSubmitting(false);
                // Handle error
            });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-[#1a1c2e] text-[#1a1c2e] dark:text-white">
            <Navbar/>
            
            <div className="container mx-auto px-6 pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">
                        Register for {formData.eventName}
                    </h2>
                    
                    <div className="bg-white dark:bg-[#262940] rounded-xl shadow-xl p-8 border border-[#e1e6f0] dark:border-[#32374f]">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-[#5e7ce2]/10 rounded-full mx-auto flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#5e7ce2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#3a4980] dark:text-[#a5b4e3] mb-2">Registration Successful!</h3>
                                <p className="text-[#727888] dark:text-[#a3adc2] mb-8">You have been registered for the event.</p>
                                <div className="flex justify-center space-x-4">
                                    <Link to="/enrolled">
                                        <button className="px-6 py-3 bg-[#5e7ce2] hover:bg-[#4a69d2] text-white rounded-lg transition-colors">
                                            View Your Events
                                        </button>
                                    </Link>
                                    <Link to="/event">
                                        <button className="px-6 py-3 bg-transparent border border-[#d1d9e6] dark:border-[#32374f] hover:border-[#5e7ce2] dark:hover:border-[#5e7ce2] rounded-lg transition-colors">
                                            Browse More Events
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="eventName" className="block mb-2 text-sm font-medium text-[#505565] dark:text-[#a3adc2]">
                                        Event Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="eventName" 
                                        value={formData.eventName} 
                                        readOnly 
                                        className="w-full p-3 bg-[#f5f7fa] dark:bg-[#1e2136] border border-[#e1e6f0] dark:border-[#32374f] rounded-lg text-[#505565] dark:text-[#a3adc2] cursor-not-allowed" 
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#505565] dark:text-[#a3adc2]">
                                        Your Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full p-3 bg-[#f5f7fa] dark:bg-[#1e2136] border border-[#e1e6f0] dark:border-[#32374f] rounded-lg text-[#505565] dark:text-[#a3adc2] focus:ring-2 focus:ring-[#5e7ce2] focus:border-transparent transition-colors" 
                                        required
                                    />
                                </div>
                                
                                <div className="mb-8">
                                    <label htmlFor="subEventName" className="block mb-2 text-sm font-medium text-[#505565] dark:text-[#a3adc2]">
                                        Select Sub-Event
                                    </label>
                                    <select 
                                        id="subEventName" 
                                        value={formData.subEventName}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#f5f7fa] dark:bg-[#1e2136] border border-[#e1e6f0] dark:border-[#32374f] rounded-lg text-[#505565] dark:text-[#a3adc2] focus:ring-2 focus:ring-[#5e7ce2] focus:border-transparent transition-colors"
                                        required
                                    >
                                        <option value="">-- Select a sub-event --</option>
                                        {subEvents.map((subEvent, index) => (
                                            <option key={index} value={subEvent.name}>{subEvent.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className={`px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2] hover:from-[#4a69d2] hover:to-[#3a5bc7] transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Registering...
                                            </span>
                                        ) : 'Register'}
                                    </button>
                                    
                                    <Link to="/enrolled">
                                        <button type="button" className="px-6 py-3 bg-transparent border border-[#d1d9e6] dark:border-[#32374f] hover:border-[#5e7ce2] dark:hover:border-[#5e7ce2] rounded-lg text-[#505565] dark:text-[#a3adc2] transition-colors">
                                            Your Events
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default EventForm;
