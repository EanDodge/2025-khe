import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';  
import Play from './Play'; 
import Tutorial from './Tutorial'; 
import Settings from './Settings'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/Play" element={<Play />} /> 
        <Route path="/Tutorial" element={<Tutorial />} />  
        <Route path="/Settings" element={<Settings />} />   
      </Routes>
    </Router>
  );
}

export default App;