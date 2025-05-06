let video;
let cellSize = 10; // Size of each 'glyph'
let inputText = "HELLO"; // Default text

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width / cellSize, height / cellSize);
  video.hide();

  let textInput = createInput(inputText);
  textInput.input(() => inputText = textInput.value().toUpperCase());
}

function draw() {
  background(255);
  video.loadPixels();
  textSize(cellSize * 1.5);
  textAlign(CENTER, CENTER);
  fill(0);

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      let charIndex = floor(x / cellSize) % inputText.length;
      let letter = inputText[charIndex];

      let videoX = floor(x / cellSize);
      let videoY = floor(y / cellSize);
      let index = (videoX + videoY * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let brightnessValue = (r + g + b) / 3;

      // Draw webcam pixel section as glyph
      copy(video, videoX, videoY, 1, 1, x, y, cellSize, cellSize);
      fill(brightnessValue);
      text(letter, x + cellSize / 2, y + cellSize / 2);
    }
  }
}