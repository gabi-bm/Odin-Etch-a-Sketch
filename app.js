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
let pixels = document.querySelectorAll('.pixel');

//Change grid
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
    pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.style.setProperty('background-color', 'white'));
    pixels.forEach((pixel) => pixel.addEventListener('click', allowPaint));
}

numOfPixels.addEventListener('input', changeGrid);
numOfPixels.addEventListener('input', function () {
    labelPixels.textContent = `${numOfPixels.value} x ${numOfPixels.value}`;
})

//Paint
function rainbow(e) {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    e.target.style.setProperty('background-color', `rgb(${r}, ${g}, ${b})`);
}

function blur(e) {
    let actualColor = e.target.style.getPropertyValue('background-color');
    if (actualColor == 'white') {
        e.target.style.setProperty('background-color', 'rgba(51, 53, 53, 0.1)');
    } else if (actualColor == 'rgba(51, 53, 53, 1)') {
        return;
    } else {
        let currentOpacity = Number(e.target.style.getPropertyValue('background-color').slice(-4, -1));
        e.target.style.setProperty('background-color', `rgba(51, 53, 53, ${currentOpacity + 0.1})`)
    }
}

function paint(e) {
    let colorSelected = document.querySelector('input[name="color"]:checked').id;
    if (colorSelected == 'rainbow') {
        rainbow(e);
    } else if (colorSelected == 'blur') {
        blur (e);
    } else {
        e.target.style.setProperty('background-color', 'rgb(51, 53, 53)');
    }
}

function allowPaint () {
    pixels.forEach((pixel) => pixel.addEventListener('mouseover', paint));
}

pixels.forEach((pixel) => pixel.addEventListener('click', allowPaint));

//Clear
function clear() {
    pixels.forEach((pixel) => pixel.style.setProperty('background-color', 'white'));
    pixels.forEach((pixel) => pixel.removeEventListener('mouseover', paint));
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clear);