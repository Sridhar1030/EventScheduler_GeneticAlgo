import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Create = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [EndEventDate, setEndEventDate] = useState('');
    const [Time, setEventTime] = useState('');
    const [EndTime, setEventEndTime] = useState('');
    const [subEvents, setSubEvents] = useState([]);
    const [customSubEvent, setCustomSubEvent] = useState('');
    const [subEventDuration, setSubEventDuration] = useState('');

    const handleCreateEvent = async () => {
        try {
            if (eventName.trim() !== '' && eventDate.trim() !== '' && EndEventDate.trim() !== '') {
                await axios.post('http://localhost:8000/api/create-event/', {
                    eventName,
                    eventDate,
                    EndEventDate,
                    Time,
                    EndTime,
                    subEvents: subEvents.map(subEvent => ({
                        name: subEvent.name,
                        duration: subEvent.duration
                    }))
                });
                alert('Event created successfully!');
            } else {
                alert('Please enter a valid event name, start date, and end date.');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const addSubEvent = () => {
        if (customSubEvent.trim() !== '' && subEventDuration.trim() !== '') {
            setSubEvents(prevState => [
                ...prevState,
                {
                    name: customSubEvent,
                    duration: subEventDuration
                }
            ]);
            setCustomSubEvent('');
            setSubEventDuration('');
        }
    };

    return (
        <div className='bg-gray-900 h-full bottom-0'>
            <Navbar />
            <div className='flex justify-center align-middle items-center '>
                <div className="w-72 mt-10  ">
                    {/* Event Name */}
                    <div className="relative w-full min-w-[200px] h- ">
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" "
                        />
                        <label className="block  text-gray-500 mb-1 text-xl">Event Name</label>
                    </div>

                    {/* Event Start Date */}
                    <div className='mtgap-7 mt-1'>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="mt-10 peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=""
                        />
                        <label className="font-normal text-gray-500 text-xl mt-2">Event Start Date</label>
                    </div>

                    {/* Event End Date */}
                    <div className='gap-7 mt-10'>
                        <input
                            type="date"
                            value={EndEventDate}
                            onChange={(e) => setEndEventDate(e.target.value)}
                            className=" peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=""
                        />
                        <label className="font-normal text-gray-500 text-xl mt-2"> Event End Date</label>

                        {/* Event Start Time */}
                        <input
                            type="time"
                            value={Time}
                            onChange={(e) => setEventTime(e.target.value)}
                            className="mt-10 peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=""
                        />
                        <label className="font-normal text-gray-500 text-xl mt-2"> Event Start Time</label>

                        {/* Event End Time */}
                        <input
                            type="time"
                            value={EndTime} // Use EndTime state variable for value
                            onChange={(e) => setEventEndTime(e.target.value)} // Use setEventEndTime for updating EndTime
                            className="mt-10 peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=""
                        />
                        <label className="font-normal text-gray-500 text-xl mt-2"> Event End Time</label>

                        {/* Sub Event Name */}
                        <div className='mt-10 flex gap-3 justify-center items-center'>
                            <input
                                type="text"
                                value={customSubEvent}
                                onChange={(e) => setCustomSubEvent(e.target.value)}
                                placeholder="Enter Sub Event Name"
                                className=" h-14 peer w-full  bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:text-sm px-3 py-2.5 rounded-[7px] 
                                - blue-gray-200 focus:border-gray-900"
                            />
                            <label className="block  text-gray-500 mb-1 text-xl">Event Name</label>
                        </div>

                        {/* Sub Event Duration */}
                        <div className='mt-10'>
                            <input
                                type="text"
                                value={subEventDuration}
                                onChange={(e) => setSubEventDuration(e.target.value)}
                                placeholder="Enter Sub Event Duration"
                                className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            />
                            <label className="font-normal text-gray-500 text-xl mt-2"> Sub Event Duration</label>

                            {/* Add Sub Event Button */}
                            <div className='mt-10 flex gap-3 justify-center items-center'>
                                <button
                                    className='w-32 align-middle flex h-10 text-sm font-medium text-white bg-gray-600 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                    onClick={addSubEvent}
                                >
                                    Add Sub Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Event Button */}
            <div className='mt-10 ml-10 flex gap-4 flex-col w-32 '>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleCreateEvent}
                >
                    Create Event
                </button>

                {/* View Events Button */}
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Link to="/event" >
                        View Events
                    </Link>
                </button>
            </div>
        </div>
    );

};

export default Create;

