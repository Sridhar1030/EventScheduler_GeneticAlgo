import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './assets/components/Create/Create'
import Event from './assets/components/Event/Event';
import Home from './assets/components/Home/Home';
import Delete from './assets/components/Delete/Delete';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/event" element={<Event />} />
          <Route path="/DELETE" element={<Delete />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
