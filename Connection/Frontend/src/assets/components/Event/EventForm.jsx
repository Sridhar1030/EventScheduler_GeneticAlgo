import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

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
            space_number: e.target.id === "subEventName" ? subEvents.find(subEvent => subEvent.name === e.target.value).space_number : formData.space_number
        });
        console.log('Form data after update:', formData);
    };
    
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Add this line to log formData
    axios.post('http://127.0.0.1:8000/api/register-event/', formData)
        .then(response => {
            console.log("hi" ,response.data);
            // Handle success
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error
        });
};

    return (
        <div className='bg-black h-full text-white'>
            <Navbar/>
            <div className='w-full h-10'></div>
            <div className='flex flex-col top-10'>
                <h2 className='text-center text-4xl top-10 gap-10 mb-10'>Event Form for {formData.eventName}</h2>
            </div>
            <form className="max-w-sm mx-auto mt-24" onSubmit={handleSubmit}>
                <div className="mb-5 gap-10">
                    <label htmlFor="eventName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Event Name</label>
                    <input type="text" id="eventName" value={formData.eventName} readOnly className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" />
                </div>
                <div className="mb-5 gap-10">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="username" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />

                </div>
                <div className="mb-5 gap-10">
                    <label htmlFor="subEventName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Event Name</label>
                    <select id="subEventName" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
                        <option value="">Select a sub-event</option>
                        {subEvents.map((subEvent, index) => (
                            <option key={index} value={subEvent.name}>{subEvent.name}</option>
                        ))}
                    </select>
                </div>
                <div className=''>
                    <button type="submit" className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-10">
                        Register
                    </button>
                    <Link to="/enrolled">
                        <button className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 border border-blue-500 hover:border-transparent rounded w-24">
                            Your Events
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EventForm;
