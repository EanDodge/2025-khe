import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';  
import Play from './Play'; 
import Tutorial from './Tutorial'; 
import Settings from './Settings';
import { defaultKeyBindings } from './key'; // Assuming this is where your default bindings are stored

function App() {
  const [keyBindingsState, setKeyBindingsState] = useState<Record<number, number>>(() => {
    // On initial load, check if we have saved key bindings in localStorage
    const savedKeyBindings = localStorage.getItem('keyBindings');
    if (savedKeyBindings) {
      console.log('Loaded saved key bindings from localStorage:', savedKeyBindings);
      return JSON.parse(savedKeyBindings); // Return the saved key bindings
    } else {
      console.log('No saved key bindings found, using default values');
      return defaultKeyBindings; // If nothing is saved, use default bindings
    }
  });

  // Save key bindings to localStorage whenever they change
  const handleSaveKeyBindings = (newKeyBindings: Record<number, number>) => {
    console.log('Saving new key bindings:', newKeyBindings);
    setKeyBindingsState(newKeyBindings); // Update state
    localStorage.setItem('keyBindings', JSON.stringify(newKeyBindings)); // Save to localStorage
  };

  // Reset to default key bindings
  const handleResetKeyBindings = () => {
    console.log('Resetting to default key bindings');
    setKeyBindingsState(defaultKeyBindings); // Reset to default
    localStorage.setItem('keyBindings', JSON.stringify(defaultKeyBindings)); // Save default to localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route 
          path="/Play" 
          element={<Play keyBindings={keyBindingsState}/>} 
        /> 
        <Route 
          path="/Tutorial" 
          element={<Tutorial keyBindings={keyBindingsState}/>} 
        />  
        <Route 
          path="/Settings" 
          element={
            <Settings 
              keyBindings={keyBindingsState} 
              onSave={handleSaveKeyBindings} 
              onReset={handleResetKeyBindings} 
            />
          } 
        />   
      </Routes>
    </Router>
  );
}

export default App;
