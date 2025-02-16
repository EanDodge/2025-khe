import React, { useRef, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'p5/lib/addons/p5.sound';
import './Play.css';
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
        notes.current[note] = p5.loadSound(`Notes/${note}.wav`);
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
    
    // Visualize pressed keys
    pressedKeys.current.forEach(key => {
      const x = (key % 3) * 40 + 40;
      const y = Math.floor(key / 3) * 40 + 20;
      p5.circle(x, y, 40);
    });
  };

  const determineNote = (): NoteKeys => {
    const keys = Array.from(pressedKeys.current);
    if (keys.includes(222) && keys.includes(186) && keys.includes(76)) return 'G';
    if (keys.includes(222) && keys.includes(186)) return 'A';
    if (keys.includes(222)) return 'B';
    if (keys.includes(186)) return 'C';
    if (keys.includes(76)) return 'Db';
    if (keys.includes(78) && keys.includes(66) && keys.includes(86) && keys.includes(68)) return 'Eb';
    if (keys.includes(78) && keys.includes(66) && keys.includes(86)) return 'D';
    if (keys.includes(78) && keys.includes(66)) return 'E';
    if (keys.includes(78)) return 'F';
    if (keys.includes(66)) return 'Gb';
    if (keys.includes(188)) return 'Ab';
    if (keys.includes(55)) return 'Bb';
    return 'C'; // Default note
  };

  const playNote = (note: NoteKeys) => {
    Object.values(notes.current).forEach(n => {
      if (n && n.isPlaying()) n.stop();
    });
    const noteToPlay = notes.current[note];
    if (noteToPlay) noteToPlay.play();
  };

  const keyPressed = (p5: p5Types) => {
    const key = p5.keyCode;
    pressedKeys.current.add(key);
    const newNote = determineNote();
    if (newNote !== currentNote) {
      setCurrentNote(newNote);
      playNote(newNote);
    }
  };

  const keyReleased = (p5: p5Types) => {
    const key = p5.keyCode;
    pressedKeys.current.delete(key);
    const newNote = determineNote();
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
