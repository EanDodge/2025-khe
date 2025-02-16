let bpm = 120; // Example BPM
let canvasWidth = 800;
let measureManager;
let metronomeManager;
let metronomeleft, metronomeright;
let metronomeSound;

function preload() {
  metronomeleft = loadImage('measureElements/metronome2.png');
  metronomeright = loadImage('measureElements/metronome.png');
  metronomeSound = loadSound('measureElements/pickupCoin.wav');
}

function setup() {
  createCanvas(canvasWidth, 400);
  measureManager = new MeasureManager(bpm, canvasWidth);
  metronomeManager = new Metronome(bpm);
}

function draw() {
  background(220);

  if (!measureManager.isPaused()) {
    measureManager.update();
  }

  // receptor line: the beats hit at this line.
  stroke(0, 0, 255);
  line(100, height / 2, 100, height);
  stroke(0);

  measureManager.display();
  metronomeManager.playMetronome(measureManager.getClosestMeasureX());
  metronomeManager.display();
}

class MeasureManager {
  constructor(bpm, canvasWidth) {
    this.bpm = bpm;
    this.canvasWidth = canvasWidth;
    this.scrollSpeed = (canvasWidth / ((60 / bpm) * 4));
    this.measureSpacing = this.scrollSpeed * 4 * (60 / bpm);
    this.measureLines = [];
    this.paused = false;

    let initialX = canvasWidth;
    for (let i = 0; i < 5; i++) {
      this.measureLines.push(initialX + i * this.measureSpacing);
    }
  }

  update() {
    for (let i = this.measureLines.length - 1; i >= 0; i--) {
      this.measureLines[i] -= this.scrollSpeed * (deltaTime / 1000);

      if (this.measureLines[i] < -this.measureSpacing) {
        this.measureLines.splice(i, 1);
        let lastLineX = Math.max(...this.measureLines);
        this.measureLines.push(lastLineX + this.measureSpacing);
      }
    }
  }

  getClosestMeasureX() {
    return this.measureLines.length > 0 ? Math.min(...this.measureLines) : 1000;
  }

  display() {
    stroke(0);
    for (let x of this.measureLines) {
      line(x, height / 2, x, height);
    }

    for (let i = 0; i < 5; ++i) {
      line(0, (height / 2) + (i * height / 10), width, (height / 2) + (i * height / 10));
    }
  }

  isPaused() {
    return this.paused;
  }

  pause() {
    this.paused = true; 
    metronomeManager.pauseMetronome();
  }

  unpause() {
    this.paused = false;
    metronomeManager.unpauseMetronome();
  }
}

function keyPressed() {
  if (keyCode === 32) { 
    if (measureManager.isPaused()) {
      measureManager.unpause();
    } else {
      measureManager.pause();
    }
  }
}

class Metronome {
  constructor(bpm) {
    this.bpm = bpm;
    this.metronomeIcon = [metronomeright, metronomeleft];
    this.metronomeSound = metronomeSound;
    this.lastBeatPlayed = millis();
    this.flip = false;
    this.isPaused = false;
    this.pauseStartTime = 0;
  }

  playMetronome(closestMeasureX) {
    if (!this.isPaused && closestMeasureX <= 100 && millis() - this.lastBeatPlayed >= (60 / this.bpm) * 1000) {
      this.metronomeSound.play();
      this.lastBeatPlayed = millis();
      this.flip = !this.flip;
    }
  }

  pauseMetronome() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pauseStartTime = millis();
    }
  }

  unpauseMetronome() {
    if (this.isPaused) {
      this.isPaused = false;
      let timePaused = millis() - this.pauseStartTime;
      this.lastBeatPlayed += timePaused;
    }
  }

  display() {
    image(this.flip ? this.metronomeIcon[0] : this.metronomeIcon[1], 0, 0);
  }
}
