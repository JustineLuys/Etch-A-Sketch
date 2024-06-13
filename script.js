// DOM Elements
let slider = document.querySelector('#div-slider');
let gridValues = document.querySelectorAll('#range-value');
let pad = document.querySelector('.sketch-pad');
let style = window.getComputedStyle(pad);
let penColor = document.querySelector('#color');
let buttons = document.querySelector('.buttons-control');

// Variables
let gridTiles;
let colorValue = 'black';
let penColorValue = 'black';
let isMouseDown = toggleButton = rainbowButton = toggleGridButton  = isRainbowOn = false;

/* Functions */
function randomize() {
    return Math.floor(Math.random() * 256);
}

function printCurrentGrid(num){
    const result = pad.clientWidth / num;
    pad.innerHTML = ''; // clear the pad
    for (let i = 0; i < num * num; i++){
        let div = document.createElement('div');
        div.classList.add('gridTiles');
        div.style.cssText = `background-color: white; width: ${result}px; height: ${result}px; 
        border: 1px solid black;`;
        pad.appendChild(div);
    }
    gridTiles = document.querySelectorAll('.gridTiles');
    printColors(colorValue);
}

function printColors(currentColor, isRainbowOn) {
    gridTiles.forEach(tile => {
        tile.onmousedown = tile.onmouseup = tile.onmouseover = (e) => {
            e.preventDefault();
            if (e.type === 'mousedown') {
                isMouseDown = true;
            } else if (e.type === 'mouseup') {
                isMouseDown = false;
            }
            if (isMouseDown || e.type === 'mousedown') {
                tile.style.backgroundColor = isRainbowOn ? `rgb(${randomize()}, ${randomize()}, ${randomize()})` : currentColor;
            }
        }
    });
}

function rainbowColors(e) {
    rainbowButton = !rainbowButton;
    if (rainbowButton) {
        printColors(colorValue, isRainbowOn = true);
    } else {
        printColors(colorValue, isRainbowOn = false);
    }
}

function clearTilesColor(e) {
    gridTiles.forEach(tile => tile.style.backgroundColor = 'white');
}

function toggleGridLines(e) {
    toggleGridButton = !toggleGridButton;
    gridTiles.forEach(tile => toggleGridButton ? tile.style.border = '': 
        tile.style.border = '1px solid black');
}

function handleButtonEvent(e) {
    if (e.target.nodeName === 'BUTTON') {
        const buttonClass = e.target.className;
        switch(buttonClass) {
            case 'colorfill':
                printColors(penColor.value, isRainbowOn = false);
                break;
            case 'rainbow':
                isRainbowOn = !isRainbowOn;
                printColors(colorValue, isRainbowOn);
                break;
            case 'lighten':
                lightenColors(e);
                break;
            case 'eraser':
                printColors('white', isRainbowOn = false);
                break;
            case 'toggle':
                toggleGridLines(e);
                break;
            case 'clear':
                clearTilesColor(e);
                break;
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', printCurrentGrid(parseInt(gridValues[0].textContent)));
slider.addEventListener('mousedown', (e) => isMouseDown = true);
// while moving the slider, it prints the current grid size
slider.addEventListener('mousemove', function(e){
    let gridCount = e.target.value;
    if (isMouseDown) {
        gridValues.forEach(function(gridValue) {
            gridValue.textContent = gridCount;
        });        
    }
})
// get the value after mouse up
slider.addEventListener('mouseup', function(e){
    let gridCount = e.target.value;
    if (isMouseDown) {
        gridValues.forEach(function(gridValue) {
            gridValue.textContent = gridCount;
        });        
    }
    printCurrentGrid(parseInt(gridCount));
    printColors(colorValue);
})
// whole color value;
penColor.addEventListener('mouseout', function(e) {
    penColorValue = e.target.value;
    colorValue = penColorValue;
    printColors(colorValue);
});
buttons.addEventListener('click', handleButtonEvent);


