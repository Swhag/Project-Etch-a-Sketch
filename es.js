let color = "black";
const buttonBlack = document.getElementById("black");
const buttonRandom = document.getElementById("random");
const buttonEraser = document.getElementById("eraser");
const button16 = document.getElementById("16");
const button32 = document.getElementById("32");
const button64 = document.getElementById("64");

buttonBlack.onclick = () => (color = "black");
buttonRandom.onclick = () => (color = "random");
buttonEraser.onclick = () => (color = "white");
button16.onclick = () => {
  deleteChild(), makeRows(16, 16);
};
button32.onclick = () => {
  deleteChild(), makeRows(32, 32);
};
button64.onclick = () => {
  deleteChild(), makeRows(64, 64);
};
// --------------------------------------------------------------------
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
  if (color === "black") {
    e.target.style.backgroundColor = color;
  } else if (color === "random") {
    e.target.style.backgroundColor = getRandomColor();
  } else if (color === "white") {
    e.target.style.backgroundColor = color;
  }
}

//Function that removes previously created grids
function deleteChild() {
  let e = document.getElementById("board");
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

//Clear button refreshes the board
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  deleteChild();
  makeRows(32, 32);
});

makeRows(32, 32);
