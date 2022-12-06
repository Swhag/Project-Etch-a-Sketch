const defaultColor = '#333333';
const defaultMode = 'color';
let currentColor = defaultColor;
let currentMode = defaultMode;

document.getElementById('color').onmousedown = () => (
  activateBtn(), setCurrentMode('color')
);

document.getElementById('random').onmousedown = () => (
  activateBtn(), setCurrentMode('random')
);

document.getElementById('eraser').onmousedown = () => (
  activateBtn(), setCurrentMode('eraser')
);

document.getElementById('clear').onclick = () => (
  clearGrid(), makeRows(32, 32)
);

document.getElementById('16').onclick = () => (clearGrid(), makeRows(16, 16));
document.getElementById('32').onclick = () => (clearGrid(), makeRows(32, 32));
document.getElementById('64').onclick = () => (clearGrid(), makeRows(64, 64));

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
  const board = document.getElementById('board');

  board.style.setProperty('--grid-rows', rows);
  board.style.setProperty('--grid-cols', cols);
  for (i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.addEventListener('mouseover', changeColor);
    cell.addEventListener('mousedown', changeColor);
    board.appendChild(cell);
  }
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'random') {
    e.target.style.backgroundColor = getRandomColor();
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = 'white';
  }
}

function activateBtn() {
  const btns = document.getElementsByClassName('colors');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      let current = document.getElementsByClassName('active');
      if (current.length > 0) {
        current[0].className = current[0].className.replace(' active', '');
      }
      this.className += ' active';
    });
  }
}

function clearGrid() {
  document.getElementById('board').innerHTML = '';
}

// --------------------------------------------------------------------

makeRows(32, 32);
