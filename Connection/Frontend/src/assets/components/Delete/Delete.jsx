import React from 'react';
import axios from 'axios';

const Delete = () => {
    const clearDatabase = () => {
        console.log('Clearing database...'); // Check if this message appears in the console
        axios.post('http://localhost:8000/api/clear-database/')
            .then(response => {
                console.log(response.data); // Database cleared successfully message
            })
            .catch(error => {
                console.error('Error clearing database:', error);
            });
    };
    

    return (
        <div>
            <button onClick={clearDatabase}>Clear Database</button>
        </div>
    );
}

export default Delete;
