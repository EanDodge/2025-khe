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
  "Db": 11,
  "C": 10,
  "B": 9,
  "Bb": 8,
  "A": 7,
  "Ab": 6,
  "G": 5,
  "Gb": 4, // or F#
  "F": 3,
  "E": 2,
  "Eb": 1,
  "D": 0
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
  
  /*
  testSong.addMeasure(testMeasure2);
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
}