const button16 = document.getElementById("16");
button16.addEventListener("click", () => {
  deleteChild();
  makeRows(16, 16);
});

const button32 = document.getElementById("32");
button32.addEventListener("click", () => {
  deleteChild();
  makeRows(32, 32);
});

const button64 = document.getElementById("64");
button64.addEventListener("click", () => {
  deleteChild();
  makeRows(64, 64);
});
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
let color = "black";
const buttonBlack = document.getElementById("black");
const buttonRandom = document.getElementById("random");
const buttonEraser = document.getElementById("eraser");

buttonBlack.addEventListener("click", () => {
  color = "black";
});
buttonRandom.addEventListener("click", () => {
  color = "random";
});
buttonEraser.addEventListener("click", () => {
  color = "white";
});

// --------------------------------------------------------------------
let mouseDown = 0;
document.body.onmousedown = () => (mouseDown = 1);
document.body.onmouseup = () => (mouseDown = 0);

const board = document.getElementById("board");

function makeRows(rows, cols) {
  board.style.setProperty("--grid-rows", rows);
  board.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    board.appendChild(cell).className = "grid-item";
    cell.addEventListener("mouseover", function () {
      if (mouseDown && color === "black") {
        cell.style.backgroundColor = color;
      } else if (mouseDown && color === "random") {
        cell.style.backgroundColor = getRandomColor();
      } else if (mouseDown && color === "white") {
        cell.style.backgroundColor = color;
      }
    });
  }
}

//Function that removes previously created grids
function deleteChild() {
  let e = document.getElementById("board");

  //e.firstElementChild can be used.
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
