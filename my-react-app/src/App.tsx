import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';  
import Play from './Play'; 
import Tutorial from './Tutorial'; 
import Settings from './Settings';

// Default key bindings
const defaultKeyBindings: Record<string, string> = {
  B: "Quote", A: "Semicolon", G: "KeyL", Ab: "Comma", Bb: "Digit8",
  Gb: "KeyY", F: "KeyU", E: "KeyT",
  D: "KeyD", Eb: "Digit4", Db: "KeyV", C: "KeyC"
};

function App() {
  const [keyBindings, setKeyBindings] = useState<Record<string, string>>(defaultKeyBindings);

  // Load key bindings from localStorage on initial render (only if not already set)
  useEffect(() => {
    const savedKeyBindings = localStorage.getItem('keyBindings');
    if (savedKeyBindings) {
      setKeyBindings(JSON.parse(savedKeyBindings));
    }
  }, []);

  // Save key bindings to localStorage whenever they change
  const handleSaveKeyBindings = (newKeyBindings: Record<string, string>) => {
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
        <Route path="/Play" element={<Play /*keyBindings={keyBindings}*/ />} /> 
        <Route path="/Tutorial" element={<Tutorial /*keyBindings={keyBindings}*/ />} />  
        <Route path="/Settings" element={<Settings keyBindings={keyBindings} onSave={handleSaveKeyBindings} onReset={handleResetKeyBindings} />} />   
      </Routes>
    </Router>
  );
}

export default App;
