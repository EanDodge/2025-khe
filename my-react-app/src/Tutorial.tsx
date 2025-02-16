import React, { useRef, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'p5/lib/addons/p5.sound';
import './Tutorial.css';
import NavBar from './NavBar';
//import { keyBindings } from './key';



// Type for musical notes
type NoteKeys = 'B' | 'Bb' | 'A' | 'Ab' | 'G' | 'Gb' | 'F' | 'E' | 'Eb' | 'D' | 'Db' | 'C';

// Type for notes mapping with SoundFile or null
type Notes = { [K in NoteKeys]: p5Types.SoundFile | null };

// Type for key positions mapping (keycode -> position)
type KeyPositions = { [key: number]: { x: number, y: number } };

interface TutorialProps {
  keyBindings: Record<number, number>; // Accept keyBindings as a prop
}

function Tutorial({ keyBindings }: TutorialProps) { /*React.FC<TutorialProps> = ({ keyBindings }) =>*/ 
  // Initialize notes and pressed keys
  const notes = useRef<Notes>({
    B: null, Bb: null, A: null, Ab: null, G: null, Gb: null,
    F: null, E: null, Eb: null, D: null, Db: null, C: null
  });

  const [currentNote, setCurrentNote] = useState<NoteKeys | null>(null);
  const pressedKeys = useRef(new Set<number>());

  // Preload function for sounds
  const preload = (p5: p5Types) => {
    if (typeof p5.loadSound !== 'undefined') {
      (Object.keys(notes.current) as NoteKeys[]).forEach(note => {
        notes.current[note] = p5.loadSound(`Notes/${note}.m4a`);
      });
    } else {
      console.error('p5.sound is not loaded!');
    }
  };

  // Setup canvas and sound play modes
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    p5.textSize(50);
    Object.values(notes.current).forEach(note => {
      if (note) note.playMode('sustain');
    });
  };

  // Drawing function for canvas
  const draw = (p5: p5Types) => {
    p5.background(220);
    p5.text(currentNote || '', 300, 200);

    // Key positions with explicit type
    const keyPositions: KeyPositions = {
      222: { x: 40, y: 40 },   // for key `"`
      186: { x: 40, y: 82 },   // for key `;`
      76:  { x: 40, y: 122 },   // for key `L`
      188: { x: 20, y: 162 },  // for key `,`
      56:  { x: 20, y: 202 },   // for key `8`
      85:  { x: 40, y: 242 },    // for key `U`
      89:  { x: 40, y: 282 },    // for key `Y`
      84:  { x: 40, y: 322 },   // for key `T`
      52:  { x: 20, y: 362 },   // for key `4`
    };

    // Visualize pressed keys
    pressedKeys.current.forEach(keyCode => {
      const pos = keyPositions[keyCode];
      if (pos) {
        p5.circle(pos.x, pos.y, 40);  // Draw circle for each pressed key
      }
    });
  };
console.log(keyBindings[0]);
  // Function to determine the note based on pressed keys
  const determineNote = (p5: p5Types): NoteKeys | null => {
    const keyIsDown = (key: number) => pressedKeys.current.has(key);

    // Check for each note based on the key bindings
    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      keyIsDown(keyBindings[4]) && keyIsDown(keyBindings[5]) && keyIsDown(keyBindings[6]) && keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'Eb';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[1]) && !keyIsDown(keyBindings[3]) &&
      keyIsDown(keyBindings[4]) && keyIsDown(keyBindings[5]) && keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[8])) {
      return 'D';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      keyIsDown(keyBindings[4]) && keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'E';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'F';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'Gb';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'Ab';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'G';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && !keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && keyIsDown(keyBindings[8])) {
      return 'Bb';
    }

    if (keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && !keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'A';
    }

    if (keyIsDown(keyBindings[0]) && !keyIsDown(keyBindings[1]) && !keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'B';
    }

    if (!keyIsDown(keyBindings[0]) && keyIsDown(keyBindings[1]) && !keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'C';
    }

    if (!keyIsDown(keyBindings[0]) && !keyIsDown(keyBindings[1]) && keyIsDown(keyBindings[2]) && !keyIsDown(keyBindings[3]) &&
      !keyIsDown(keyBindings[4]) && !keyIsDown(keyBindings[5]) && !keyIsDown(keyBindings[6]) && !keyIsDown(keyBindings[7]) && !keyIsDown(keyBindings[8])) {
      return 'Db';
    }

    return null;
};


  // Play the note if it exists
  const playNote = (note: NoteKeys | null) => {
    Object.values(notes.current).forEach(n => {
      if (n && n.isPlaying()) n.stop();
    });
    if (note) {
      const noteToPlay = notes.current[note];
      if (noteToPlay) noteToPlay.play();
    }
  };

  // Handle key press event
  const keyPressed = (p5: p5Types) => {
    const key = p5.keyCode;
    pressedKeys.current.add(key);
    const newNote = determineNote(p5);
    if (newNote !== currentNote) {
      setCurrentNote(newNote);
      playNote(newNote);
    }
  };

  // Handle key release event
  const keyReleased = (p5: p5Types) => {
    const key = p5.keyCode;
    pressedKeys.current.delete(key);
    const newNote = determineNote(p5);
    if (newNote !== currentNote) {
      setCurrentNote(newNote);
      playNote(newNote);
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className="tut-title">Tutorial</h1>
      <Sketch
        className="tutor"
        preload={preload}
        setup={setup}
        draw={draw}
        keyPressed={keyPressed}
        keyReleased={keyReleased}
      />
    </div>
  );
}

export default Tutorial;
