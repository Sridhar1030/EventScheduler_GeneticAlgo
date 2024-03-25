import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
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
            axios.get('http://localhost:8000/api/get-events/')
                .then(response => {
                    const reversedEvents = response.data.reverse();
                    if (reversedEvents && reversedEvents.length > eventIndex) {
                        const selectedEvent = reversedEvents[eventIndex];
                        const selectedEventName = selectedEvent.name;
                        const eventStartTime = selectedEvent.startTime; // Assuming the start time property is named 'startTime'
                        setEvent(selectedEventName);
                        setStartTime(eventStartTime); // Add this line to set the start time state
                        axios.get(`http://127.0.0.1:8000/api/get-sub-events/${selectedEventName}/`)
                            .then(subEventResponse => {
                                setSubEvents(subEventResponse.data);
                                // Run genetic algorithm on sub events
                                const schedule = geneticAlgorithm(subEventResponse.data);
                                setBestSchedule(schedule);
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


    // Genetic Algorithm
    const geneticAlgorithm = (events) => {
        // Define parameters
        const POPULATION_SIZE = 10;
        const MAX_GENERATIONS = 10;
        const TOURNAMENT_SIZE = 3;
        const MUTATION_RATE = 0.1;

        // Function to evaluate fitness of a schedule
        const fitness = (schedule) => {
            const totalDuration = schedule.reduce((total, subEvent) => total + subEvent.duration, 0);
            return totalDuration;
        }

        // Function to generate initial population
        const generatePopulation = () => {
            const population = [];
            for (let i = 0; i < POPULATION_SIZE; i++) {
                const schedule = [...events].sort(() => Math.random() - 0.5);
                population.push(schedule);
            }
            return population;
        }

        // Function to perform tournament selection
        const tournamentSelection = (population) => {
            const selected = [];
            for (let i = 0; i < population.length; i++) {
                const contestants = [];
                for (let j = 0; j < TOURNAMENT_SIZE; j++) {
                    contestants.push(population[Math.floor(Math.random() * population.length)]);
                }
                const winner = contestants.reduce((max, current) => fitness(current) < fitness(max) ? current : max);
                selected.push(winner);
            }
            return selected;
        }

        // Function to perform crossover
        const crossover = (parent1, parent2) => {
            const point = Math.floor(Math.random() * (events.length - 1)) + 1;
            const child1 = [...parent1.slice(0, point), ...parent2.filter(event => !parent1.slice(0, point).some(e => e.name === event.name))];
            const child2 = [...parent2.slice(0, point), ...parent1.filter(event => !parent2.slice(0, point).some(e => e.name === event.name))];
            return [child1, child2];
        }

        // Function to perform mutation
        const mutate = (schedule) => {
            if (Math.random() < MUTATION_RATE) {
                const idx1 = Math.floor(Math.random() * schedule.length);
                let idx2 = Math.floor(Math.random() * schedule.length);
                while (idx2 === idx1) idx2 = Math.floor(Math.random() * schedule.length);
                [schedule[idx1], schedule[idx2]] = [schedule[idx2], schedule[idx1]];
            }
            return schedule;
        }

        // Initial population
        let population = generatePopulation();

        // Genetic algorithm loop
        for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
            const selected = tournamentSelection(population);
            let nextPopulation = [];
            while (nextPopulation.length < POPULATION_SIZE) {
                const [parent1, parent2] = [selected[Math.floor(Math.random() * selected.length)], selected[Math.floor(Math.random() * selected.length)]];
                const [child1, child2] = crossover(parent1, parent2).map(mutate);
                nextPopulation = nextPopulation.concat([child1, child2]);
            }
            population = nextPopulation;
        }

        // Return the best schedule found
        return population.reduce((best, current) => fitness(current) < fitness(best) ? current : best);
    }

    // Helper function to format time (assuming time is in 24-hour format)
    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    // Calculate start and end times for each subevent based on event start time and durations
    const calculateEventTimes = (schedule) => {
        let currentTime = parseFloat(startTime); // Parse the start time as a float
        return schedule.map(subEvent => {
            const startTime = currentTime;
            const endTime = currentTime + subEvent.duration;
            currentTime = endTime; // Update the current time for the next subevent
            return { ...subEvent, startTime, endTime };
        });
    }

    return (
        <>
        <Navbar/>
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
                                <tr key={index} className="">
                                    <td className="border border-gray-400 p-2 w-60">{subEvent.name}</td>
                                    <td className="border border-gray-400 p-2">{subEvent.duration}</td>
                                </tr>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col justify-center mx-auto text-center w-96 h-96 mb-10">
                <h1>Algorithm implementation</h1>
                <h2 className="font-semibold">Subevents Table:</h2>
                <table className="border-collapse border border-gray-400 mt-2">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 p-2">Subevent</th>
                            <th className="border border-gray-400 p-2">Duration</th>
                            <th className="border border-gray-400 p-2">Start Time</th>
                            <th className="border border-gray-400 p-2">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculateEventTimes(bestSchedule).map((subEvent, index) => (
                            <tr key={index} className="hover:bg-gray-300 hover:text-lg transitin duration-150">
                                <td className="border border-gray-400 p-2">{subEvent.name}</td>
                                <td className="border border-gray-400 p-2">{subEvent.duration}</td>
                                <td className="border border-gray-400 p-2">{formatTime(subEvent.startTime)}</td>
                                <td className="border border-gray-400 p-2">{formatTime(subEvent.endTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Genetic;
