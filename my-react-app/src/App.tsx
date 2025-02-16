import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';  
import Play from './Play'; 
import Tutorial from './Tutorial'; 
import Settings from './Settings';

// Default key bindings
const defaultKeyBindings: Record<string, number> = {
  Eb: 222, // Key code for Eb
  D: 186,  // Key code for D
  G: 76,   // Key code for G
  F: 188,  // Key code for F
  A: 85,   // Key code for A
  B: 89,   // Key code for B
  C: 84,   // Key code for C
  Bb: 52,  // Key code for Bb
  Gb: 56,  // Key code for Gb
  Ab: 65,  // Key code for Ab
};

function App() {
  const [keyBindings, setKeyBindings] = useState<Record<string, number>>(defaultKeyBindings);

  // Load key bindings from localStorage on initial render (only if not already set)
  useEffect(() => {
    const savedKeyBindings = localStorage.getItem('keyBindings');
    if (savedKeyBindings) {
      setKeyBindings(JSON.parse(savedKeyBindings));
    }
  }, []);

  // Save key bindings to localStorage whenever they change
  const handleSaveKeyBindings = (newKeyBindings: Record<string, number>) => {
    setKeyBindings(newKeyBindings);
    localStorage.setItem('keyBindings', JSON.stringify(newKeyBindings));
  };

  // Reset to default key bindings
  const handleResetKeyBindings = () => {
    setKeyBindings(defaultKeyBindings);
    localStorage.setItem('keyBindings', JSON.stringify(defaultKeyBindings));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/Play" element={<Play /*keyBindings={keyBindings} *//>} /> 
        <Route path="/Tutorial" element={<Tutorial />} />  
        <Route 
          path="/Settings" 
          element={<Settings 
                    keyBindings={keyBindings} 
                    onSave={handleSaveKeyBindings} 
                    onReset={handleResetKeyBindings} 
                  />} 
        />   
      </Routes>
    </Router>
  );
}

export default App;
