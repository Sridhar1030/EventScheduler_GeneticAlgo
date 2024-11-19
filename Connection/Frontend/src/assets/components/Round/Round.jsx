import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Round = () => {
    const [eventName, setEventName] = useState('');
    const [registeredEvents, setRegisteredEvents] = useState([{ id: '', username: '', subEventName: '' }]);
    const [responseData, setResponseData] = useState(null); // State to store response data

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
    };

    const handleRegisteredEventChange = (index, e) => {
        const { name, value } = e.target;
        const events = [...registeredEvents];
        events[index][name] = value;
        setRegisteredEvents(events);
    };

    const addRegisteredEvent = () => {
        setRegisteredEvents([...registeredEvents, { id: '', username: '', subEventName: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            registered_events: registeredEvents.map(event => ({
                id: parseInt(event.id),
                username: event.username,
                subEventName: event.subEventName
            }))
        };

        axios.post(`http://127.0.0.1:8000/api/tournament/${eventName}/`, data)
            .then(response => {
                console.log('Response:', response.data);
                setResponseData(response.data); // Set the response data to state
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error as needed
            });
    };

    return (
        <div className="h-full min-h-screen bg-black        ">
            <Navbar />
            <div className="flex flex-col mt-20 items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Tournament Schedule</h2>
                    <div className="mb-4">
                        <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">Event Name</label>
                        <input
                            type="text"
                            id="eventName"
                            value={eventName}
                            onChange={handleEventNameChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    {registeredEvents.map((event, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="font-semibold mb-2">Registered Event {index + 1}</h3>
                            <input
                                type="text"
                                name="id"
                                placeholder="ID"
                                value={event.id}
                                onChange={e => handleRegisteredEventChange(index, e)}
                                className="w-full px-3 py-2 mb-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={event.username}
                                onChange={e => handleRegisteredEventChange(index, e)}
                                className="w-full px-3 py-2 mb-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="subEventName"
                                placeholder="Sub Event Name"
                                value={event.subEventName}
                                onChange={e => handleRegisteredEventChange(index, e)}
                                className="w-full px-3 py-2 mb-2 border rounded"
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addRegisteredEvent} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4">Add Registered Event</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
                </form>
            </div>
            {responseData && (
                <div className="flex flex-col items-center justify-center mt-10 w-full ">
                    <h2 className="text-2xl font-bold mb-4">Round Winners</h2>
                    <div className="w-full max-w-md">
                        <table className="w-full border-collapse border border-gray-400 bg-white mb-10">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-400 p-2">Rounds</th>
                                    <th className="border border-gray-400 p-2">Winners</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responseData.all_round_winners.map((roundWinners, roundIndex) => (
                                    <tr key={roundIndex} className="hover:bg-gray-300">
                                        <td className="border border-gray-400 p-2">{roundIndex + 1}</td>
                                        <td className="border border-gray-400 p-2">{roundWinners.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Round;
