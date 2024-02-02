import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './assets/components/Create/Create'
import Event from './assets/components/Event/Event';
function App() {

  return (
    <>
        
      <Router>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/event" element={<Event />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
