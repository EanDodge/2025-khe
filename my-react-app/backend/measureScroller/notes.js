// Note, Measure, and Song Classes

const noteValues = {
  "w": 4,   // Whole note = 4 beats
  "h": 2,   // Half note = 2 beats
  "q": 1,   // Quarter note = 1 beat
  "e": 0.5, // Eighth note = 0.5 beat
  "s": 0.25 // Sixteenth note = 0.25 beat
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
}

class Measure {
  constructor() {
    // maxbeats is default to 4/4
    this.notes = [];
    this.maxBeats = 4;
    this.beatValue = 0;
  }

  constructor(timeSignature) {
    // notes contains the note strings within the measure
    // maxbeats contains the top number of the time signature (x/4)
    // beatValue contains the value of all notes in the measure
    this.notes = [];
    this.maxBeats = timeSignature;
    this.measureValue = 0;
  }

  constructor(noteArr) {
    this.notes = noteArr;
    this.maxBeats = 4;
    let sum = 0;
    for(let i = 0; i < len(noteArr); ++i){
      sum += noteArr[i].length;
    }
    this.measureValue = sum;
  }

  // this adds a note to the measure
  addNote(note) {
    // noteValue is used to add to this.notes and this.beatValue
    let noteValue = noteValues[note.length];
    // checks to see if it can fit, returns true if it can, while inserting
    if (noteValue + this.measureValue < this.maxBeats) {
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
}

class Song {
  constructor() {
    this.measures = [];
    this.title = "New Song";
    this.bpm = 120;
  }

  constructor(measures, title, bpm) {
    this.measures = measures;
    this.title = title;
    this.bpm = bpm;
  }

  addMeasure(measure) {
    this.measures.push(measure);
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

  // add measures
  testSong.addMeasure(testMeasure1);
  testSong.addMeasure(testMeasure2);
  testSong.addMeasure(testMeasure3);
  testSong.addMeasure(testMeasure4);

  // creates canvas size based on however many measures there are
  createCanvas(400 * len(testSong.measures), 400); 
}

function draw() {
  // draw song
  // ...somehow
  background(220);

  // draw staff
  for (let i = 0; i < 5; i++) {
    line(50, 50 + i * 30, width - 50, 50 + i * 30);
  }
}