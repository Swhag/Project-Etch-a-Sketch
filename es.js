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
const board = document.getElementById("board");

btnColor.onmousedown = () => (activateBtn(), setCurrentMode("color"));
btnRandom.onmousedown = () => (activateBtn(), setCurrentMode("random"));
btnEraser.onmousedown = () => (activateBtn(), setCurrentMode("eraser"));
btn16.onclick = () => (clearGrid(), makeRows(16, 16));
btn32.onclick = () => (clearGrid(), makeRows(32, 32));
btn64.onclick = () => (clearGrid(), makeRows(64, 64));
clear.onclick = () => (clearGrid(), makeRows(32, 32));
colorPicker.oninput = (e) => setCurrentColor(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// --------------------------------------------------------------------

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

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

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

function activateBtn() {
  const btns = document.getElementsByClassName("colors");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
}

function clearGrid() {
  board.innerHTML = "";
}

// --------------------------------------------------------------------

makeRows(32, 32);
