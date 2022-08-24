const button16 = document.getElementById("16");
button16.addEventListener("click", () => {
  deleteChild();
  makeRows(16, 16);
});

const button64 = document.getElementById("64");
button64.addEventListener("click", () => {
  deleteChild();
  makeRows(64, 64);
});

const button256 = document.getElementById("256");
button256.addEventListener("click", () => {
  deleteChild();
  makeRows(256, 256);
});

const board = document.getElementById("board");

function makeRows(rows, cols) {
  board.style.setProperty("--grid-rows", rows);
  board.style.setProperty("--grid-cols", cols);
  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    // cell.innerText = i + 1;
    board.appendChild(cell).className = "grid-item";
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

//Clear button reloads the page when clicked
const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  location.reload();
});
