// EventForm.jsx

import React from 'react';
import { useParams } from 'react-router-dom';


function EventForm({ eventName }) {


    return (
        <>
            <div className='bg-black h-screen text-white'>
                <div className='w-full h-10'></div> {/*Div for spapce*/}
                <div className='flex flex-col top-10'>
                    <h2 className='text-center text-4xl top-10 gap-10 mb-10'>Event Form for {eventName}</h2>
                </div>
                <form class="max-w-sm mx-auto mt-24">
                    <div class="mb-5 gap-10">
                        <label for="nameInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="nameInput" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="mb-5 gap-10">
                        <label for="dropdown" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Option</label>
                        <select id="dropdown" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected hidden>Select A Sport</option>
                            <option value="option1">Badminton</option>
                            <option value="option2">Table Tennis</option>
                            <option value="option3">Cricket</option>
                        </select>
                    </div>
                    <button class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Register
                    </button>
                </form>



            </div>
        </>
    );
};

export default EventForm;
