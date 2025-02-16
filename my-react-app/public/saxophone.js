let sax;

function preload() {
  B = loadSound("Notes/B.wav");
  Bb = loadSound("Notes/Bb.wav");
  A = loadSound("Notes/A.wav");
  Ab = loadSound("Notes/Ab.wav");
  G = loadSound("Notes/G.wav");
  Gb = loadSound("Notes/Gb.wav");
  F = loadSound("Notes/F.wav");
  E = loadSound("Notes/E.wav");
  Eb = loadSound("Notes/Eb.wav");
  D = loadSound("Notes/D.wav");
  Db = loadSound("Notes/Db.wav");
  C = loadSound("Notes/C.wav");
}

function setup() {
  createCanvas(100, 400);
  textSize(50);
  sax = new Saxophone();
}

function draw() {
  background(200);
  sax.checkNotes();
  sax.display();
  sax.playNote();
}

// saxophone class
// !!! needs to be a singleton

class Saxophone {
  constructor() {
    // initializes variables
    this.notePlayed = "";
    this.B = B;
    this.Bb = Bb;
    this.A = A;
    this.Ab = Ab;
    this.G = G;
    this.Gb = Gb;
    this.F = F;
    this.E = E;
    this.Eb = Eb;
    this.D = D;
    this.Db = Db;
    this.C = C;
  }

  checkNotes() {
    // Eb
    if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      keyIsDown(78) &&
      keyIsDown(66) &&
      keyIsDown(86) &&
      keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("Eb", 300, 200);
      this.notePlayed = "Eb";
    }
    // D
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      keyIsDown(78) &&
      keyIsDown(66) &&
      keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("D", 300, 200);
      this.notePlayed = "D";
    }
    // E
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      keyIsDown(78) &&
      keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("E", 300, 200);
      this.notePlayed = "E";
    }
    // F
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("F", 300, 200);
      this.notePlayed = "F";
    }
    // Gb
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      !keyIsDown(78) &&
      keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("Gb", 300, 200);
      this.notePlayed = "Gb";
    }
    // Ab
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      keyIsDown(188)
    ) {
      //text("Ab", 300, 200);
      this.notePlayed = "Ab";
    }
    // G
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("G", 300, 200);
      this.notePlayed = "G";
    }
    // Bb
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      !keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("Bb", 300, 200);
      this.notePlayed = "Bb";
    }
    // A
    else if (
      keyIsDown(222) &&
      keyIsDown(186) &&
      !keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("A", 300, 200);
      this.notePlayed = "A";
    }
    // B
    else if (
      keyIsDown(222) &&
      !keyIsDown(186) &&
      !keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("B", 300, 200);
      this.notePlayed = "B";
    }
    // C
    else if (
      !keyIsDown(222) &&
      keyIsDown(186) &&
      !keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("C", 300, 200);
      this.notePlayed = "C";
    }
    // Db
    else if (
      !keyIsDown(222) &&
      !keyIsDown(186) &&
      keyIsDown(76) &&
      !keyIsDown(78) &&
      !keyIsDown(66) &&
      !keyIsDown(86) &&
      !keyIsDown(68) &&
      !keyIsDown(55) &&
      !keyIsDown(188)
    ) {
      //text("Db", 300, 200);
      this.notePlayed = "Db";
    } else {
      this.notePlayed = "";
    }
  }

  playNote() {
    switch (this.notePlayed) {
      case "C":
        if (!C.isPlaying()) {
          C.play();
        }
        break;
      case "B":
        if (!B.isPlaying()) {
          B.play();
        }
        break;
      case "Bb":
        if (!Bb.isPlaying()) {
          Bb.play();
        }
        break;
      case "A":
        if (!A.isPlaying()) {
          A.play();
        }
        break;
      case "Ab":
        if (!Ab.isPlaying()) {
          Ab.play();
        }
        break;
      case "G":
        if (!G.isPlaying()) {
          G.play();
        }
        break;
      case "Gb":
        if (!Gb.isPlaying()) {
          Gb.play();
        }
        break;
      case "F":
        if (!F.isPlaying()) {
          F.play();
        }
        break;
      case "E":
        if (!E.isPlaying()) {
          E.play();
        }
        break;
      case "Eb":
        if (!Eb.isPlaying()) {
          Eb.play();
        }
        break;
      case "D":
        if (!D.isPlaying()) {
          D.play();
        }
        break;
      case "Db":
        if (!Db.isPlaying()) {
          Db.play();
        }
        break;
    }
  }

  // Draws the keys for the saxophone
  display() {
    for (let i = 1; i < 10; i++) {
      fill(255);
      let x = width/2;
      let y = i * 40;
      
      switch(i) {
        case 1:
          if (keyIsDown(222)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 2:
          if (keyIsDown(186)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 3:
          if (keyIsDown(76)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 4:
          if (keyIsDown(188)) {
            fill(0);
          }
          circle(x + 20, y, 40);
          break;
        case 5:
          if (keyIsDown(55)) {
            fill(0);
          }
          circle(x - 20, y, 40);
          break;
        case 6:
          if (keyIsDown(78)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 7:
          if (keyIsDown(66)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 8:
          if (keyIsDown(86)) {
            fill(0);
          }
          circle(x, y, 40);
          break;
        case 9:
          if (keyIsDown(68)) {
            fill(0);
          }
          circle(x - 20, y, 40);
          break;
      }
    }
  }
}
