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
    this.title = "";
    this.bpm = 120;
  }

  constructor(measures, title, bpm) {
    this.measures = measures;
    this.title = title;
    this.bpm = bpm;
  }
}