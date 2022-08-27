const defaultColor = "#333333";
const defaultMode = "color";
let currentColor = defaultColor;
let currentMode = defaultMode;
const btnColor = document.getElementById("color");
const btnRandom = document.getElementById("random");
const btnEraser = document.getElementById("eraser");
const btn16 = document.getElementById("16");
const btn32 = document.getElementById("32");
const btn64 = document.getElementById("64");
const clear = document.getElementById("clear");

btnColor.onclick = () => setCurrentMode("color");
btnRandom.onclick = () => setCurrentMode("random");
btnEraser.onclick = () => setCurrentMode("eraser");
btn16.onclick = () => (deleteGrid(), makeRows(16, 16));
btn32.onclick = () => (deleteGrid(), makeRows(32, 32));
btn64.onclick = () => (deleteGrid(), makeRows(64, 64));
clear.onclick = () => (deleteGrid(), makeRows(32, 32));
colorPicker.oninput = (e) => setCurrentColor(e.target.value);

// --------------------------------------------------------------------

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// --------------------------------------------------------------------

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const board = document.getElementById("board");

function makeRows(rows, cols) {
  board.style.setProperty("--grid-rows", rows);
  board.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseover", changeColor);
    cell.addEventListener("mousedown", changeColor);
    board.appendChild(cell);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "random") {
    e.target.style.backgroundColor = getRandomColor();
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

function deleteGrid() {
  let e = document.getElementById("board");
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

makeRows(32, 32);
