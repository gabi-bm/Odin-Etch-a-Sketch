const board = document.querySelector('.board');
const numOfPixels = document.querySelector('#n-pixels');
const labelPixels = document.querySelector('#label-pixels');

board.style.setProperty('grid-template-columns', 'repeat(20, 1fr)');
board.style.setProperty('grid-template-rows', 'repeat(20, 1fr)');

for (let i = 1; i <= Math.pow(20, 2); i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    board.appendChild(pixel);
}

const pixels = document.querySelectorAll('.pixel');

function removePixels() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function changeGrid(e) {
    removePixels();
    for (let i = 1; i <= Math.pow(e.target.value, 2); i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        board.appendChild(pixel);
    }
    board.style.setProperty('grid-template-columns', `repeat(${e.target.value}, 1fr)`);
    board.style.setProperty('grid-template-rows', `repeat(${e.target.value}, 1fr)`);
}

pixels.forEach((pixel) => pixel.addEventListener('click', allowPaint));

function allowPaint () {
    pixels.forEach((pixel) => pixel.addEventListener('mouseover', paint));
}

function paint() {
    this.classList.add('pixel-hover');
}

numOfPixels.addEventListener('input', changeGrid);
numOfPixels.addEventListener('input', function () {
    labelPixels.textContent = `${numOfPixels.value} x ${numOfPixels.value}`;
})

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clear);

function clear() {
    pixels.forEach((pixel) => pixel.classList.remove('pixel-hover'));
    pixels.forEach((pixel) => pixel.removeEventListener('mouseover', paint));
}