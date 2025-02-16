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
  "Db": 0,
  "C": 1,
  "B": 2,
  "Bb": 3,
  "A": 4,
  "Ab": 5,
  "G": 6,
  "Gb": 7, // or F#
  "F": 8,
  "E": 9,
  "Eb": 10,
  "D": 11
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
  }
  
  info() {
    let returnString = "";
    returnString = this.pitch + this.length;
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
  constructor() {
    this.measures = [];
    this.title = "New Song";
    this.bpm = 120;
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
}

// p5.js visualization

let testSong;
let testMeasure1, testMeasure2, testMeasure3, testMeasure4;
let testNote1, testNote2, testNote3, testNote4, testNote5;

function setup() {
  testNote1 = new Note("B", "q");
  testNote2 = new Note("A", "q");
  testNote3 = new Note("G", "h");
  testNote4 = new Note("G", "e");
  testNote5 = new Note("A", "e");

  testMeasure1 = new Measure();
  testMeasure2 = new Measure();
  testMeasure3 = new Measure();
  testMeasure4 = new Measure();

  testSong = new Song();

  // my song :)
  // hot cross buns

  // add notes
  testMeasure1.addNote(testNote1);
  testMeasure1.addNote(testNote2);
  testMeasure1.addNote(testNote3);

  /*
  testMeasure2.addNote(testNote1);
  testMeasure2.addNote(testNote2);
  testMeasure2.addNote(testNote3);

  testMeasure3.addNote(testNote4);
  testMeasure3.addNote(testNote4);
  testMeasure3.addNote(testNote4);
  testMeasure3.addNote(testNote4);
  testMeasure3.addNote(testNote5);
  testMeasure3.addNote(testNote5);
  testMeasure3.addNote(testNote5);
  testMeasure3.addNote(testNote5);

  testMeasure4.addNote(testNote1);
  testMeasure4.addNote(testNote2);
  testMeasure4.addNote(testNote3);
  */
  
  // add measures
  testSong.addMeasure(testMeasure1);
  testSong.addMeasure(testMeasure2);

  /*
  testSong.addMeasure(testMeasure3);
  testSong.addMeasure(testMeasure4);
  */

  // creates canvas size based on however many measures there are
  createCanvas(400 * testSong.length(), 400); 
  testSong.debugSong();
}

function draw() {
  // draw song
  // ...somehow
  background(220);

  // draw staff
  for (let i = 0; i < 5; i++) {
    line(50, 50 + i * 30, width - 50, 50 + i * 30);
  }
  
  // draw measure lines
  for (let i = 0; i < testSong.length() + 1; ++i) {
    line(i * 300 + 50, 50, i * 300 + 50, 170);
  }

  
  // draw j notes in i measures
  let x = 50;
  for (let i = 0; i < testSong.length(); ++i) {
    for (let j = 0; j < testSong.measures[i].length(); ++j) {
      let flat = false;

      // note length is used to calculate where it is spacing wise in the measure,
      // note pitch is used to determine which line it appears on
      let noteLength = noteValues[testSong.measures[i].notes[j].length];
      let notePitch = pitchValues[testSong.measures[i].notes[j].pitch];

      // checks for flat
      // if (...)

      // calculates note placement
      // z represents how many notes are in the measure
      let z = 300 / testSong.measures[i].length();
      let y = notePitch * 15;

      circle(x, y, 30);
      console.log("placed note #" + j);
      console.log("placed circle at: " + (x + 50) + ", " + (y + 25));
      x += z;                                                                                                                                                                              
    }
  }
}