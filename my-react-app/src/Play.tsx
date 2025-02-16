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

    // Visualize pressed keys
    pressedKeys.current.forEach(key => {
      const x = (key % 3) * 40 + 40;
      const y = Math.floor(key / 3) * 40 + 20;
      p5.circle(x, y, 40);
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
