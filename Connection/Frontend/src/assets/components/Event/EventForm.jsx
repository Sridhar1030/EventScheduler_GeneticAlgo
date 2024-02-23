import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link } from 'react-router-dom';

function EventForm() {
    const [formData, setFormData] = useState({
        username: '', // Add username state
        eventName: '', // Add eventName state
        subEventName: '', // Add subEventName state
    });
    const [subEvents, setSubEvents] = useState([]); // State to store sub-events

    useEffect(() => {
        // Fetch event name and sub-events
        axios.get('http://127.0.0.1:8000/api/get-events/') // Adjust URL to your backend endpoint for fetching events
            .then(response => {
                // Assuming the response.data is an array of event objects with 'name' property
                const firstEventName = response.data[0].name; // Get the name of the first event
                setFormData(prevFormData => ({
                    ...prevFormData,
                    eventName: firstEventName // Set the eventName in the form data state
                }));
                // Fetch sub-events of the first event
                axios.get(`http://127.0.0.1:8000/api/get-sub-events/${firstEventName}/`)
                    .then(subEventResponse => {
                        setSubEvents(subEventResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching sub-events:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post('http://127.0.0.1:8000/api/register-event/', formData)
            .then(response => {
                console.log(response.data);
                // Handle success, e.g., show a success message or redirect
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, e.g., show an error message
            });
    };

    return (
        <>
            <div className='bg-black h-screen text-white'>
                <div className='w-full h-10'></div> {/*Div for space*/}
                <div className='flex flex-col top-10'>
                    <h2 className='text-center text-4xl top-10 gap-10 mb-10'>Event Form for {formData.eventName}</h2>
                </div>
                <form className="max-w-sm mx-auto mt-24" onSubmit={handleSubmit}>

                <div className="mb-5 gap-10 ">
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
                                <option key={index} value={subEvent}>{subEvent}</option>
                            ))}
                        </select>
                    </div>
                    <div className=''>

                    <button type="submit" className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-10">
                        Register
                    </button>

                    <Link to = "/enrolled"><button  className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2  border border-blue-500 hover:border-transparent rounded w-24 ">
                        Your Events
                    </button>
                    </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EventForm; // Ensure to export the component as default
