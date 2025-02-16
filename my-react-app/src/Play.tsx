import React, { useRef, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'p5/lib/addons/p5.sound';
import './Tutorial.css';
import NavBar from './NavBar';

type NoteKeys = 'B' | 'Bb' | 'A' | 'Ab' | 'G' | 'Gb' | 'F' | 'E' | 'Eb' | 'D' | 'Db' | 'C';
type Notes = { [K in NoteKeys]: p5Types.SoundFile | null };

function Play() {
  const notes = useRef<Notes>({
    B: null, Bb: null, A: null, Ab: null, G: null, Gb: null,
    F: null, E: null, Eb: null, D: null, Db: null, C: null
  });
  const [currentNote, setCurrentNote] = useState<NoteKeys | null>(null);
  const pressedKeys = useRef(new Set<number>());

  const preload = (p5: p5Types) => {
    if (typeof p5.loadSound !== 'undefined') {
      (Object.keys(notes.current) as NoteKeys[]).forEach(note => {
        notes.current[note] = p5.loadSound(`Notes/${note}.m4a`);
      });
    } else {
      console.error('p5.sound is not loaded!');
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    p5.textSize(50);
    Object.values(notes.current).forEach(note => {
      if (note) note.playMode('sustain');
    });
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    p5.text(currentNote || '', 300, 200);

    // Define positions for each key code (mapping key codes to positions)
    const keyPositions: { [key: number]: { x: number, y: number } } = {
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
        p5.circle(pos.x, pos.y, 40);  // draw circle for each pressed key
      }
    });
};

  const determineNote = (p5: p5Types): NoteKeys | null => {
    const keyIsDown = (key: number) => pressedKeys.current.has(key);

    if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      keyIsDown(85) && keyIsDown(89) && keyIsDown(84) && keyIsDown(52) && !keyIsDown(56)) {
      return 'Eb';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      keyIsDown(85) && keyIsDown(89) && keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'D';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      keyIsDown(85) && keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'E';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'F';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'Gb';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'Ab';

    } else if (keyIsDown(222) && keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'G';

    } else if (keyIsDown(222) && keyIsDown(186) && !keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && keyIsDown(56)) {
      return 'Bb';

    } else if (keyIsDown(222) && keyIsDown(186) && !keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'A';

    } else if (keyIsDown(222) && !keyIsDown(186) && !keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'B';

    } else if (!keyIsDown(222) && keyIsDown(186) && !keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'C';

    } else if (!keyIsDown(222) && !keyIsDown(186) && keyIsDown(76) && !keyIsDown(188) &&
      !keyIsDown(85) && !keyIsDown(89) && !keyIsDown(84) && !keyIsDown(52) && !keyIsDown(56)) {
      return 'Db';

    } else {
      return null;
    }
  };

  const playNote = (note: NoteKeys | null) => {
    Object.values(notes.current).forEach(n => {
      if (n && n.isPlaying()) n.stop();
    });
    if (note) {
      const noteToPlay = notes.current[note];
      if (noteToPlay) noteToPlay.play();
    }
  };

  const keyPressed = (p5: p5Types) => {
    const key = p5.keyCode;
    pressedKeys.current.add(key);
    const newNote = determineNote(p5);
    if (newNote !== currentNote) {
      setCurrentNote(newNote);
      playNote(newNote);
    }
  };

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
      <Sketch preload={preload} setup={setup} draw={draw} keyPressed={keyPressed} keyReleased={keyReleased} />
    </div>
  );
}

export default Play;
