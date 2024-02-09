import React, { useState } from "react";

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleDateRangeSelect = () => {
        // Handle the selected date range, e.g., send it to a parent component or perform some action
        console.log("Selected Date Range:", startDate, endDate);
    };

    return (
        <div className="flex items-center">
            <div className="relative">
                <input
                    name="start"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date start"
                />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
                <input
                    name="end"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date end"
                />
            </div>
            
        </div>
    );
};

export default DateRangePicker;
