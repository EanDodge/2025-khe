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
    stroke(0, 0, 255);
    line(100, 30, 100, 190);
  }
}

// p5.js visualization
let wholeNote;
let openNote;
let closedNote;

let testSong;
let testMeasure1, testMeasure2, testMeasure3, testMeasure4;

function preload() {
  wholeNote = loadImage('noteWhole.png');
  openNote = loadImage('noteOpen.png');
  closedNote = loadImage('noteClosed.png');
  flatSign = loadImage('flat.png');
  sharpSign = loadImage('sharp.png');
}

let scrollX = 0;
let scrollSpeed;
let measureWidth = 300;
let canvasWidth;
let receptor;

function setup() {

  // init receptor
  receptor = new Receptor();

  // initialize measures
  testMeasure1 = new Measure();
  testMeasure2 = new Measure();
  testMeasure3 = new Measure();
  testMeasure4 = new Measure();

  // initialize song
  testSong = new Song("Hot Cross Buns", 120);

  // my song :)
  // hot cross buns

  // add notes
  testMeasure1.addNote(new Note("B", 'q'));
  testMeasure1.addNote(new Note("Ab", 'q'));
  testMeasure1.addNote(new Note("G", 'h'));

  testMeasure2.addNote(new Note("Bb", 'q'));
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
  createCanvas(canvasWidth, 220);
  scrollX = testSong.length() * measureWidth; // Start off-screen
  imageMode(CENTER);

  // bps * default scroll speed / 4
  scrollSpeed = (testSong.bpm / 60) * 5 / 4;
}

// just for the game, i will always have this as true
// i FOR THE LIFE OF ME could not implement the scrolling functionality in draw. this was HORRIBLE.

// last thing i need to do, create flat and sharp images
let autoScroll = true;

function draw() {
  background(220);
  receptor.display();
  stroke(0, 0, 0);

  // Scroll the song to the left over time
  if (autoScroll) {
    scrollX -= scrollSpeed;

    if (scrollX < -testSong.length * measureWidth) {
      autoScroll = false;
      scrollX = -testSong.length * measureWidth;
    }
  }

  // Draw the staff lines
  for (let i = 0; i < 5; i++) {
    line(50, 50 + i * 30, canvasWidth - 50, 50 + i * 30);
  }

  let currentX = 50 + scrollX; // Adjust for scrolling

  for (let i = 0; i < testSong.length(); i++) {
    let measure = testSong.measures[i];

    // Draw measure lines
    line(currentX, 50, currentX, 170);

    let measureStartX = currentX;
    let currentBeatPosition = 0;

    for (let j = 0; j < measure.notes.length; j++) {
      let note = measure.notes[j];
      let noteDuration = noteValues[note.length];
      let noteWidth = (noteDuration / 4) * measureWidth;
      let xPos = measureStartX + (currentBeatPosition / 4) * measureWidth;
      let yPos;

      if (note.pitch === "R") {
        // Rest positioning
        yPos = 110;
        fill(0);
        rect(xPos + noteWidth / 4, yPos - 5, noteWidth / 2, 10);
      } else {
        // Get vertical positioning for notes
        let notePitch = pitchValues[note.pitch];
        let flat = false, sharp = false;

        switch (notePitch) {
          case 0.5: sharp = true; notePitch = 1; break;
          case 2.5: flat = true; notePitch = 2; break;
          case 3.5: sharp = true; notePitch = 4; break;
          case 4.5: sharp = true; notePitch = 5; break;
          case 6.5: flat = true; notePitch = 6; break;
        }

        yPos = 15 * notePitch + 80; // Convert pitch to y-position

        // Draw note image
        let noteImage;
        let accidentalImage;
        switch (note.length) {
          case "w":
            noteImage = wholeNote; 
            if (flat) {
              accidentalImage = flatSign;
            }
            else if (sharp) {
              accidentalImage = sharpSign;
            }
            break;
          case "h":
            noteImage = openNote; 
            if (flat) {
              accidentalImage = flatSign;
            }
            else if (sharp) {
              accidentalImage = sharpSign;
            }
            break;
          case "q":
            noteImage = closedNote; 
            if (flat) {
              accidentalImage = flatSign;
            }
            else if (sharp) {
              accidentalImage = sharpSign;
            }
            break;
          case "e":
            noteImage = closedNote; 
            if (flat) {
              accidentalImage = flatSign;
            }
            else if (sharp) {
              accidentalImage = sharpSign;
            }
            break;
          case "s":
            noteImage = closedNote; 
            if (flat) {
              accidentalImage = flatSign;
            }
            else if (sharp) {
              accidentalImage = sharpSign;
            }
            break;
        }
        image(noteImage, xPos + noteWidth / 2, yPos);
        if (accidentalImage) {
          image(accidentalImage, 15 + xPos + noteWidth / 2, yPos - 10);
        }

        // draw stems
        switch(note.length) {
          case "h":
            if (notePitch > 1) {
              line(10 + xPos + noteWidth / 2, yPos, 10 + xPos + noteWidth / 2, yPos - 60);
            }
            else if (notePitch <= 1) {
              line(-10 + xPos + noteWidth / 2, yPos, -10 + xPos + noteWidth / 2, yPos + 60)
            }
            break;
          case "q":
            if (notePitch > 1) {
              line(10 + xPos + noteWidth / 2, yPos, 10 + xPos + noteWidth / 2, yPos - 60);
            }
            else if (notePitch <= 1) {
              line(-10 + xPos + noteWidth / 2, yPos, -10 + xPos + noteWidth / 2, yPos + 60)
            }
            break;
          case "e":
            if (notePitch > 1) {
              line(10 + xPos + noteWidth / 2, yPos, 10 + xPos + noteWidth / 2, yPos - 60);
              line(10 + xPos + noteWidth / 2, yPos - 60, 20 + xPos + noteWidth / 2, yPos - 50);
            }
            else if (notePitch <= 1) {
              line(-10 + xPos + noteWidth / 2, yPos, -10 + xPos + noteWidth / 2, yPos + 60)
              line(-10 + xPos + noteWidth / 2, yPos + 60, -20 + xPos + noteWidth / 2, yPos + 50);
            }
            break;
          case "s":
            if (notePitch > 1) {
              line(10 + xPos + noteWidth / 2, yPos, 10 + xPos + noteWidth / 2, yPos - 60);
              line(10 + xPos + noteWidth / 2, yPos - 60, 20 + xPos + noteWidth / 2, yPos - 50);
              line(10 + xPos + noteWidth / 2, yPos - 55, 20 + xPos + noteWidth / 2, yPos - 45);
            }
            else if (notePitch <= 1) {
              line(-10 + xPos + noteWidth / 2, yPos, -10 + xPos + noteWidth / 2, yPos + 60)
              line(-10 + xPos + noteWidth / 2, yPos + 60, -20 + xPos + noteWidth / 2, yPos + 50);
              line(-10 + xPos + noteWidth / 2, yPos + 55, -20 + xPos + noteWidth / 2, yPos + 45);
            }
            break;
          default:
            // wholenotes and rests
        }
      }
      // Move to the next beat
      currentBeatPosition += noteDuration;
    }
    // Move to the next measure
    currentX += measureWidth;
  }
  // Draw final measure line
  line(currentX, 50, currentX, 170);
}

