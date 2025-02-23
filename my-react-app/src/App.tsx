import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';  
import Play from './Play'; 
import Tutorial from './Tutorial'; 
import Settings from './Settings';
import MusicPlayer from './MusicPlayer'; // Adjust the path if needed
import { defaultKeyBindings } from './key'; // Assuming this is where your default bindings are stored

function AppContent() {
  const [keyBindingsState, setKeyBindingsState] = useState<Record<number, number>>(() => {
    const savedKeyBindings = localStorage.getItem('keyBindings');
    if (savedKeyBindings) {
      console.log('Loaded saved key bindings from localStorage:', savedKeyBindings);
      return JSON.parse(savedKeyBindings);
    } else {
      console.log('No saved key bindings found, using default values');
      return defaultKeyBindings;
    }
  });
  const [mainVolume, setMainVolume] = useState(0.8);

  const handleSaveKeyBindings = (newKeyBindings: Record<number, number>) => {
    console.log('Saving new key bindings:', newKeyBindings);
    setKeyBindingsState(newKeyBindings);
    localStorage.setItem('keyBindings', JSON.stringify(newKeyBindings));
  };

  const location = useLocation();
  const noMusicPages = ['/Play', '/Tutorial'];
  const shouldPlayMusic = !noMusicPages.includes(location.pathname);

  return (
    <>
      <MusicPlayer shouldPlay={shouldPlayMusic} volume={mainVolume} />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/Play" element={<Play keyBindings={keyBindingsState}/>} /> 
        <Route path="/Tutorial" element={<Tutorial keyBindings={keyBindingsState}/>} />  
        <Route path="/Settings" element={
          <Settings 
            keyBindings={keyBindingsState} 
            onSave={handleSaveKeyBindings} 
            volume={mainVolume}
            onVolumeChange={setMainVolume} // Pass the function to update volume
          />
        } />   
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router basename='/Haxophone'>
      <AppContent />
    </Router>
  );
}

export default App;
