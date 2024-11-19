import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Create from './assets/components/Create/Create';
import Event from './assets/components/Event/Event';
import Home from './assets/components/Home/Home';
import Delete from './assets/components/Delete/Delete';
import EventForm from './assets/components/Event/EventForm';
import YourEvents from './assets/components/YourEvents/YourEvents';
import Login from './assets/components/Registration/Login';
import Scheduler from './assets/components/Scheduler/Scheduler';
import Genetic from './assets/components/Genetic/Genetic';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './assets/components/Navbar/Navbar';
import Private from './assets/components/Private/Private';
import Register from './assets/components/Registration/Register';
import Round from './assets/components/Round/Round';


function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Django backend
    axios.get('http://localhost:8000/api/get-events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <Router>
        
          <Routes>
            {/* Define routes for different components */}

            {/* <Route path='/event-form' element={<EventForm/>}/> */}
            {/* Define routes for other components */}


              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/event" element={<Event />} />
              <Route path="/schedule" element={<Scheduler />} />
              {/* Dynamically render routes for each event */}
              {events.map(event => (
                <Route
                  key={event.id}
                  path={`/${event.name}`}
                  element={<EventForm eventName={event.name} />}
                />
              ))}
              {events.map(event => (
                <Route
                  key={event.id}
                  path={`/genetic/${event.name}`}
                  element={<Genetic eventName={event.name} />}
                />

              ))}
              <Route path='/round' element={<Round/>}/>
              <Route path="/enrolled" element={<YourEvents />} />
              <Route path="/DELETE" element={<Delete />} />
              
            </Route>

          </Routes>
  
      </Router>
    </>
  )
}

export default App;
