// Settings.tsx
import React, { useState } from 'react';
import { defaultKeyBindings } from './key';  // Import default key bindings
import './Settings.css';
import NavBar from './NavBar';

interface SettingsProps {
  keyBindings: Record<number, number>;
  onSave: (bindings: Record<number, number>) => void;
}

const Settings: React.FC<SettingsProps> = ({ keyBindings, onSave }) => {
  const [editing, setEditing] = useState<number | null>(null); // To track which key is being edited
  const [currentKeyBindings, setCurrentKeyBindings] = useState(keyBindings);

  // Handle key press event to update the key binding
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (editing !== null) {
      const newKeyBindings = { ...currentKeyBindings };
      newKeyBindings[editing] = event.keyCode; // Update the key binding for the selected note
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
      <h2 className="set-title">Customize Key Bindings</h2>
      <div className="keys-grid">
        {Object.entries(currentKeyBindings).map(([index, key]) => (
          <div
            key={index}
            className="key-circle"
            onClick={() => setEditing(Number(index))} // Set the editing index
          >
            {editing === Number(index) ? "Press a key..." : `${index}: ${key}`}
          </div>
        ))}
      </div>
      <button onClick={() => onSave(currentKeyBindings)}>Save</button>
      <button onClick={resetToDefault}>Reset to Default</button> {/* Reset button */}
    </div>
  );
};

export default Settings;
