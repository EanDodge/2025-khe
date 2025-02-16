// saxophone prototype visualization
// help me god
// deprecated

// needs 8 keys
let B 
let Bb, A, Ab, G, Gb, F, E, Eb, D, Db, C;
let notePlayed = "";



function preload() {
  if (typeof p5 !== "undefined") {
    B = loadSound('Notes/B.wav');
    Bb = loadSound('Notes/Bb.wav');
    A = loadSound('Notes/A.wav');
    Ab = loadSound('Notes/Ab.wav');
    G = loadSound('Notes/G.wav');
    Gb = loadSound('Notes/Gb.wav');
    F = loadSound('Notes/F.wav');
    E = loadSound('Notes/E.wav');
    Eb = loadSound('Notes/Eb.wav');
    D = loadSound('Notes/D.wav');
    Db = loadSound('Notes/Db.wav');
    C = loadSound('Notes/C.wav');
  } else {
    console.error('p5.js is not loaded, cannot load sounds!');
  }
}

function setup() {
  console.log("p5.js setup() is running!");
  createCanvas(600, 400);
  textSize(50);
}

function draw() {
  background(220);
  
  //let sax;
  //sax = new Saxophone();
  //sax.play();
  
  // 1
  if (keyIsDown(222)) {
    circle(40, 40, 40);
  }
  // 2 
  if (keyIsDown(186)) {
    circle(40, 80, 40);
  }
  // 3
  if (keyIsDown(76)) {
    circle(40, 120, 40);
  }
  // 4
  if (keyIsDown(188)) {
    circle(80, 160, 40);
  } 
  // 5
  if (keyIsDown(55)) {
    circle(20, 200, 40);
  }
  // 6
  if (keyIsDown(78)) {
    circle(40, 240, 40);
  }
  // 7
  if (keyIsDown(66)) {
    circle(40, 280, 40);
  }
  // 8
  if (keyIsDown(86)) {
    circle(40, 320, 40);
  }
  // roller key
  if (keyIsDown(68)) {
    circle(40, 360, 40);
  }
  
  checkNotes();
  playNote();
  
  // debug
  // console.log(notePlayed);
}

function checkNotes() {
  // Eb 
  if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && keyIsDown(78) && 
      keyIsDown(66) && keyIsDown(86) && 
      keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('Eb', 300, 200);
    notePlayed = "Eb";
  }
  // D
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && keyIsDown(78) && 
      keyIsDown(66) && keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('D', 300, 200);
    notePlayed = "D";
  }
  // E
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && keyIsDown(78) && 
      keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('E', 300, 200);
    notePlayed = "E";
  }
  // F
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('F', 300, 200);
    notePlayed = "F";
  } 
  // Gb
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && !keyIsDown(78) && 
      keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('Gb', 300, 200);
    notePlayed = "Gb";
  }
  // Ab
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      keyIsDown(188)) {
    text('Ab', 300, 200);
    notePlayed = "Ab";
  }
  // G
  else if (keyIsDown(222) && keyIsDown(186) && 
      keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('G', 300, 200);
    notePlayed = "G";
  }
  // Bb
  else if (keyIsDown(222) && keyIsDown(186) && 
      !keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && keyIsDown(55) &&
      !keyIsDown(188)) {
    text('Bb', 300, 200);
    notePlayed = "Bb";
  }
  // A
  else if (keyIsDown(222) && keyIsDown(186) && 
      !keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('A', 300, 200);
    notePlayed = "A";
  }
  // B
  else if (keyIsDown(222) && !keyIsDown(186) && 
      !keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('B', 300, 200);
    notePlayed = "B";
  }
  // C
  else if (!keyIsDown(222) && keyIsDown(186) && 
      !keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('C', 300, 200);
    notePlayed = "C";
  }
  // Db
  else if (!keyIsDown(222) && !keyIsDown(186) && 
      keyIsDown(76) && !keyIsDown(78) && 
      !keyIsDown(66) && !keyIsDown(86) && 
      !keyIsDown(68) && !keyIsDown(55) &&
      !keyIsDown(188)) {
    text('Db', 300, 200);
    notePlayed = "Db";
  }
  else {
    notePlayed = ""; 
  }
}

function playNote() {
  switch(notePlayed) {
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
    default:
      
  }
}
