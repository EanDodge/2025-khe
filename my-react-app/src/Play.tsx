import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import 'p5/lib/addons/p5.sound';
import './Play.css';
import NavBar from './NavBar';

function Play() {
  let B: p5Types.SoundFile | null = null;
  let Bb: p5Types.SoundFile | null = null;
  let A: p5Types.SoundFile | null = null;
  let Ab: p5Types.SoundFile | null = null;
  let G: p5Types.SoundFile | null = null;
  let Gb: p5Types.SoundFile | null = null;
  let F: p5Types.SoundFile | null = null;
  let E: p5Types.SoundFile | null = null;
  let Eb: p5Types.SoundFile | null = null;
  let D: p5Types.SoundFile | null = null;
  let Db: p5Types.SoundFile | null = null;
  let C: p5Types.SoundFile | null = null;
  let notePlayed: string = "";

  const preload = (p5: p5Types) => {
    if (typeof p5.loadSound !== 'undefined') {
      B = p5.loadSound('Notes/B.wav');
      Bb = p5.loadSound('Notes/Bb.wav');
      A = p5.loadSound('Notes/A.wav');
      Ab = p5.loadSound('Notes/Ab.wav');
      G = p5.loadSound('Notes/G.wav');
      Gb = p5.loadSound('Notes/Gb.wav');
      F = p5.loadSound('Notes/F.wav');
      E = p5.loadSound('Notes/E.wav');
      Eb = p5.loadSound('Notes/Eb.wav');
      D = p5.loadSound('Notes/D.wav');
      Db = p5.loadSound('Notes/Db.wav');
      C = p5.loadSound('Notes/C.wav');
    } else {
      console.error('p5.sound is not loaded!');
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    p5.textSize(50);
    if (B) {
      B.playMode('sustain');
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    if (p5.keyIsDown(222)) p5.circle(40, 20, 40);
    if (p5.keyIsDown(186)) p5.circle(40, 60, 40);
    if (p5.keyIsDown(76)) p5.circle(40, 100, 40);
    if (p5.keyIsDown(188)) p5.circle(80, 140, 40);
    if (p5.keyIsDown(55)) p5.circle(20, 180, 40);
    if (p5.keyIsDown(78)) p5.circle(40, 220, 40);
    if (p5.keyIsDown(66)) p5.circle(40, 260, 40);
    if (p5.keyIsDown(86)) p5.circle(40, 300, 40);
    if (p5.keyIsDown(68)) p5.circle(40, 340, 40);

    checkNotes(p5);
    playNote();
  };

  const checkNotes = (p5: p5Types) => {
    if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && p5.keyIsDown(78) &&
      p5.keyIsDown(66) && p5.keyIsDown(86) && p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('Eb', 300, 200);
      notePlayed = "Eb";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && p5.keyIsDown(78) &&
      p5.keyIsDown(66) && p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('D', 300, 200);
      notePlayed = "D";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && p5.keyIsDown(78) &&
      p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('E', 300, 200);
      notePlayed = "E";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('F', 300, 200);
      notePlayed = "F";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('Gb', 300, 200);
      notePlayed = "Gb";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && p5.keyIsDown(188)) {
      p5.text('Ab', 300, 200);
      notePlayed = "Ab";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('G', 300, 200);
      notePlayed = "G";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && !p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('Bb', 300, 200);
      notePlayed = "Bb";
    } else if (p5.keyIsDown(222) && p5.keyIsDown(186) && !p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('A', 300, 200);
      notePlayed = "A";
    } else if (p5.keyIsDown(222) && !p5.keyIsDown(186) && !p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('B', 300, 200);
      notePlayed = "B";
    } else if (!p5.keyIsDown(222) && p5.keyIsDown(186) && !p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('C', 300, 200);
      notePlayed = "C";
    } else if (!p5.keyIsDown(222) && !p5.keyIsDown(186) && p5.keyIsDown(76) && !p5.keyIsDown(78) &&
      !p5.keyIsDown(66) && !p5.keyIsDown(86) && !p5.keyIsDown(68) && !p5.keyIsDown(55) && !p5.keyIsDown(188)) {
      p5.text('Db', 300, 200);
      notePlayed = "Db";
    } else {
      notePlayed = "";
    }
  }

  const playNote = () => {
    switch (notePlayed) {
      case "C":
        if (C && !C.isPlaying()) C.play();
        break;
      case "B":
        if (B && !B.isPlaying()) B.play();
        break;
      case "Bb":
        if (Bb && !Bb.isPlaying()) Bb.play();
        break;
      case "A":
        if (A && !A.isPlaying()) A.play();
        break;
      case "Ab":
        if (Ab && !Ab.isPlaying()) Ab.play();
        break;
      case "G":
        if (G && !G.isPlaying()) G.play();
        break;
      case "Gb":
        if (Gb && !Gb.isPlaying()) Gb.play();
        break;
      case "F":
        if (F && !F.isPlaying()) F.play();
        break;
      case "E":
        if (E && !E.isPlaying()) E.play();
        break;
      case "Eb":
        if (Eb && !Eb.isPlaying()) Eb.play();
        break;
      case "D":
        if (D && !D.isPlaying()) D.play();
        break;
      case "Db":
        if (Db && !Db.isPlaying()) Db.play();
        break;
    }
  }

  return (
    <div>
      <NavBar />
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}

export default Play;
