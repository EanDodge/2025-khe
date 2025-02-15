let bpm = 200; // Example BPM
let scrollSpeed;
let measureLines = [];
let canvasWidth = 800; // Adjust as needed
let measureSpacing; // Dynamic spacing based on BPM

function setup() {
  createCanvas(canvasWidth, 200);
  // 
  scrollSpeed = (canvasWidth / ((60 / bpm) * 4));
  measureSpacing = scrollSpeed * 4 * (60 / bpm);
  let initialX = canvasWidth;
  
  // Initialize measure lines spaced correctly
  for (let i = 0; i < 5; i++) {
    measureLines.push(initialX + i * measureSpacing);
  }
}

function draw() {
  background(220);

  // Update and draw measure lines
  for (let i = measureLines.length - 1; i >= 0; i--) {
    measureLines[i] -= scrollSpeed * (deltaTime / 1000); // Move left

    line(measureLines[i], 0, measureLines[i], height);

    // If a measure line moves off-screen, recycle it
    if (measureLines[i] < 0) {
      measureLines.splice(i, 1);
      let lastLineX = Math.max(...measureLines); // Get the rightmost measure line
      measureLines.push(lastLineX + measureSpacing); // Insert at correct spacing
    }
  }
  
  // Draw Staff Lines
  for (let i = 0; i < 5; ++i) {
    line(0, i * height/5, width, i * height/5);
  }
  
  // Draw Receptor Line
  line(100, 0, 100, height);
}