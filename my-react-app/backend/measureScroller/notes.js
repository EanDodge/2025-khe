// Note, Measure, and Song Classes

const noteValues = {
  "w": 4,   // Whole note = 4 beats
  "h": 2,   // Half note = 2 beats
  "q": 1,   // Quarter note = 1 beat
  "e": 0.5, // Eighth note = 0.5 beat
  "s": 0.25 // Sixteenth note = 0.25 beat
}

// integers associated with pitches to determine where to draw on lines
const pitchValues = {
  "R": -1, // rest
  "Db": 0.5,
  "C": 1.0,
  "B": 2.0,
  "Bb": 2.5,
  "A": 3.0,
  "Ab": 3.5, // or G#
  "G": 4.0,
  "Gb": 4.5, // or F#
  "F": 5.0,
  "E": 6.0,
  "Eb": 6.5,
  "D": 7.0
}

class Note {

  // pitch is a string with the note value ("Eb", "B", etc.)
  // length is a string with a char describing the length
  // for example, w would be whole note, h=half note,
  // q=quarter note, etc.

  // put in .wav files here

  constructor(pitch, length) {
    this.pitch = pitch;
    this.length = length;
    this.isRest = false;
  }

  info() {
    let returnString = "";
    if (this.pitch == "R") {
      returnString = "Rest" + this.length;
    }
    else {
      returnString = this.pitch + this.length;
    }
    return returnString;
  }
}

class Measure {
  constructor() {
    // maxbeats is default to 4/4
    this.notes = [];
    this.maxBeats = 4;
    this.measureValue = 0;
  }

  // this adds a note to the measure
  addNote(note) {
    // noteValue is used to add to this.notes and this.beatValue
    let noteValue = noteValues[note.length];
    console.log(noteValue);
    // checks to see if it can fit, returns true if it can, while inserting
    if (noteValue + this.measureValue <= this.maxBeats) {
      this.notes.push(note);
      this.measureValue += noteValue;
      return true
    }
    else {
      console.log("too dam big");
      return false;
    }
  }

  // takes an index input to remove
  removeNote(noteIndex) {
    // checks if the index is within bounds
    if (noteIndex >= 0 && noteIndex < this.notes.length) {
      // the removed index is removed from the notes[] array, note data stored in removed
      // then the measure value is lessened by removed note data 
      let removed = this.notes.splice(noteIndex, 1)[0];
      this.measureValue -= noteValues[removed.length];
    }
  }

  debug() {
    let returnString = "This measure contains: "
    for (let i = 0; i < this.notes.length; i++) {
      returnString += this.notes[i].info() + " + ";
    }
    returnString += "end";
    return returnString;
  }

  length() {
    return this.notes.length;
  }

}

class Song {
  constructor(song, bpm) {
    this.measures = [];
    this.title = song;
    this.bpm = bpm;
  }

  addMeasure(measure) {
    this.measures.push(measure);
  }

  length() {
    return this.measures.length;
  }

  debugSong() {
    for (let i = 0; i < this.measures.length; i++) {
      console.log("measure #" + i + ": " + this.measures[i].debug());
    }
  }

  currentMeasure() {

  }
}

class Receptor {
  constructor() {
    this.exists = true;
  }

  display() {
    line(100, 30, 100, 190);
  }


}




// p5.js visualization

let testSong;
let testMeasure1, testMeasure2, testMeasure3, testMeasure4;

// TODO
//  Implement scrollSpeed in Song and draw
//  Implement a receptor line
//  Implement noteLength
//
//

function preload() {
  
}

let scrollX = 0;
let scrollSpeed = 5;
let measureWidth = 300;
let canvasWidth;

function setup() {

  // initialize measures
  testMeasure1 = new Measure();
  testMeasure2 = new Measure();
  testMeasure3 = new Measure();
  testMeasure4 = new Measure();

  // initialize song
  testSong = new Song("Hot Cross Buns", 60);

  // my song :)
  // hot cross buns

  // add notes
  testMeasure1.addNote(new Note("B", 'q'));
  testMeasure1.addNote(new Note("A", 'q'));
  testMeasure1.addNote(new Note("G", 'h'));

  testMeasure2.addNote(new Note("B", 'q'));
  testMeasure2.addNote(new Note("A", 'q'));
  testMeasure2.addNote(new Note("G", 'h'));

  testMeasure3.addNote(new Note("G", 'e'));
  testMeasure3.addNote(new Note("G", 'e'));
  testMeasure3.addNote(new Note("G", 'e'));
  testMeasure3.addNote(new Note("G", 'e'));
  testMeasure3.addNote(new Note("A", 'e'));
  testMeasure3.addNote(new Note("A", 'e'));
  testMeasure3.addNote(new Note("A", 'e'));
  testMeasure3.addNote(new Note("A", 'e'));

  testMeasure4.addNote(new Note("B", 'q'));
  testMeasure4.addNote(new Note("A", 'q'));
  testMeasure4.addNote(new Note("G", 'h'));

  // add measures
  testSong.addMeasure(testMeasure1);
  testSong.addMeasure(testMeasure2);
  testSong.addMeasure(testMeasure3);
  testSong.addMeasure(testMeasure4);

  // Fixed canvas width to allow for scrolling across the screen
  canvasWidth = 800;
  createCanvas(canvasWidth, 400);
  scrollX = testSong.length() * measureWidth; // Start off-screen
}

// just for the game, i will always have this as true
// i couldn't find a workaround to pause in debugging, but i don't even know if it works
// so i opted to have the scroll stop once it was out of the measure bounds.
let autoScroll = true;

function draw() {
  background(220);

  // if we have autoscroll enabled,
  // the scrollX is constantly being moved by the scrollSpeed
  if (autoScroll) {
    scrollX -= scrollSpeed;

    // checks to see if we have completely scrolled through the song
    if (scrollX < -testSong.length() * measureWidth) {
      autoScroll = false;
      scrollX = -testSong.length() * measureWidth;
    }
  }

  // Draw staff lines
  for (let i = 0; i < 5; i++) {
    line(50, 50 + i * 30, canvasWidth - 50, 50 + i * 30);
  }

  // currentX is used
  let currentX = 50 + scrollX;

  for (let i = 0; i < testSong.length(); i++) {
    // Measure lines
    line(currentX, 50, currentX, 170);

    for (let j = 0; j < testSong.measures[i].length(); j++) {
      let note = testSong.measures[i].notes[j];
      let z = measureWidth / testSong.measures[i].length();
      let y;

      // Handles whether or not the note is a rest. Places a separate rest icon
      if (note.pitch === "R") {
        y = 100;
        fill(0);
        rect(currentX + j * z + z / 4, y - 5, z / 2, 10);
        console.log("placed rest #" + j);
      }
      else {
        let flat = false;
        let sharp = false;
        let notePitch = pitchValues[note.pitch];

        switch (notePitch) {
          case 0.5: // Db or C#
            sharp = true;
            flat = false;
            notePitch = 1;
            break;
          case 2.5: // Bb
            sharp = false;
            flat = true;
            notePitch = 2;
            break;
          case 3.5: // Ab or G#
            sharp = true;
            flat = false;
            notePitch = 4;
            break;
          case 4.5: // Gb or F#
            sharp = true;
            flat = false;
            notePitch = 5;
            break;
          case 6.5: // Eb
            sharp = false;
            flat = true;
            notePitch = 6;
            break;
          default: // anything else
            sharp = false;
            flat = false;
        }
        // get note position on staff
        y = 15 * notePitch + 80;

        // handles note placement
        // if flat, red
        // if sharp, blue
        // if natural, white
        if (flat) {
          fill(255, 0, 0);
          circle(currentX + j * z + z / 2, y, 30);
        }
        else if (sharp) {
          fill(0, 0, 255);
          circle(currentX + j * z + z / 2, y, 30);
        }
        else {
          fill(255);
          circle(currentX + j * z + z / 2, y, 30);
        }
        console.log("placed note #" + j);
        console.log("placed circle at: " + (currentX + j * z + z / 2) + ", " + y);
      }
    }
    currentX += measureWidth;
  }
  line(currentX, 50, currentX, 170);
}