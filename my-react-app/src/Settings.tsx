// Settings.tsx
import React, { useState } from 'react';
import { defaultKeyBindings } from './key';  // Import default key bindings
import './Settings.css';
import NavBar from './NavBar';

interface SettingsProps {
  keyBindings: Record<number, number>;
  onSave: (bindings: Record<number, number>) => void;
  volume: number;
  onVolumeChange: (volume: number) => void; // Add the function to update volume
}

const Settings: React.FC<SettingsProps> = ({ keyBindings, onSave, volume, onVolumeChange }) => {
  const [editing, setEditing] = useState<number | null>(null); // To track which key is being edited
  const [currentKeyBindings, setCurrentKeyBindings] = useState(keyBindings);

  // Handle key press event to update the key binding
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (editing !== null) {
      const newKeyBindings = { ...currentKeyBindings };
      newKeyBindings[editing] = (event.which); // Update the key binding for the selected note
      setCurrentKeyBindings(newKeyBindings);
      setEditing(null); // Stop editing once a key is selected
    }
  };

  // Reset to default key bindings
  const resetToDefault = () => {
    setCurrentKeyBindings(defaultKeyBindings);
  };

  return (
    <div className="settings-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <NavBar />
      <h1 className="settings-title">Settings</h1>
      <h2 className="set-title">Customize Key Bindings</h2>
      <div className="keys-grid">
        {Object.entries(currentKeyBindings).map(([index, key]) => (
          <div
            key={index}
            className="key-circle"
            onClick={() => setEditing(Number(index))} // Set the editing index
          >
            {editing === Number(index) ? "Press a key..." : `${index}: ${String.fromCharCode(key)}`}
            
          </div>
          
        ))}
      <div className = "button-container">
        <button onClick={() => onSave(currentKeyBindings)}>Save</button>
        <button onClick={resetToDefault}>Reset to Default</button> {/* Reset button */}
        </div>
      </div>
      <div className="volume-slider">
        <label htmlFor="volume">Volume: {(volume * 100).toFixed(0)} </label> {/* Round to 2 decimal places */}
        <input
          style = {{width: '200px',paddingLeft: '10x'}}
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))} // Use the passed function to update volume
        />
      </div>
    </div>
  );
};

export default Settings;
