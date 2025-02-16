import React, { useState } from 'react';
import './Settings.css';
import NavBar from './NavBar';

// Special mapping for better display
const keyDisplayMap: Record<string, string> = {
  "Quote": "'",
  "Semicolon": ";",
  "Comma": ",",
  "Period": ".",
  "Slash": "/",
  "Backslash": "\\",
  "BracketLeft": "[",
  "BracketRight": "]",
  "Minus": "-",
  "Equal": "="
};

interface SettingsProps {
  keyBindings: Record<string, string>;
  onSave: (bindings: Record<string, string>) => void;
  onReset: () => void;
}

const Settings: React.FC<SettingsProps> = ({ keyBindings, onSave, onReset }) => {
  const [editing, setEditing] = useState<string | null>(null);

  const handleClick = (note: string) => {
    setEditing(note);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (editing) {
      onSave({ ...keyBindings, [editing]: event.code });
      setEditing(null);
    }
  };

  return (
    <div className="settings-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <NavBar />
      <h2 className="set-title">Customize Key Bindings</h2>
      <div className="keys-grid">
        {Object.entries(keyBindings).map(([note, key]) => (
          <div
            key={note}
            className="key-circle"
            onClick={() => handleClick(note)}
          >
            {editing === note ? "Press a key..." : `${note}: ${keyDisplayMap[key] || key}`}
          </div>
        ))}
      </div>
      <button onClick={() => onSave(keyBindings)}>Save</button>
      <button onClick={onReset}>Reset to Default</button> {/* Reset button */}
    </div>
  );
};

export default Settings;
