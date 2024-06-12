// DOM Elements
let slider = document.querySelector('#div-slider');
let gridValues = document.querySelectorAll('#range-value');
let pad = document.querySelector('.sketch-pad');
let style = window.getComputedStyle(pad);
let penColor = document.querySelector('#color');

// Variables
let gridTiles;
let colorValue = 'black';
let isMouseMOve = false;
let isMouseDown = false;


function printCurrentGrid(num){
    const result = pad.clientWidth / num;
    // Remove all existing grid tiles
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

document.addEventListener('DOMContentLoaded', printCurrentGrid(parseInt(gridValues[0].textContent)));
slider.addEventListener('mousedown',function(e){
    isMouseDown = true;
});

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
    colorValue = e.target.value;
    printColors(colorValue);
});

function printColors(currentColor) {
    gridTiles.forEach(function(tile) {
        tile.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isMouseDown = true;
            e.target.style.backgroundColor = currentColor;
        });
        tile.addEventListener('mouseup', function(e) {
            e.preventDefault();
            isMouseDown = false;
            e.target.style.backgroundColor = currentColor;
        });
        tile.addEventListener('mouseover', function(e) {
            e.preventDefault();
            if (isMouseDown) {
            e.target.style.backgroundColor = currentColor;
            }
        })
    });
    
}


function randomize() {
    return Math.floor(Math.random() * 256);
}


let buttons = document.querySelector('.buttons-control');

buttons.addEventListener('click', function(e){
    if (e.target.nodeName === 'BUTTON') {
        let buttonClass = e.target.className;
    switch(buttonClass) {
        case 'colorfill':
            console.log(pad.children.className);
            break;
        case 'rainbow':
            printRainbowColors(e);
            break;
        case 'lighten':
            lightenColors(e);
            break;
        case 'eraser':
            colorValue = 'white';
            printColors(colorValue);
            break;
        case 'toggle':
            console.log('hello');
            break;
        case 'clear':
            console.log('hello');
            break;
        }
    }
});


function printRainbowColors(e) {
    gridTiles.forEach(function(tile) {
        tile.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isMouseDown = true;
            e.target.style.backgroundColor = `rgb(${randomize()}, ${randomize()}, ${randomize()})`;
        });
        tile.addEventListener('mouseup', function(e) {
            e.preventDefault();
            isMouseDown = false;
            e.target.style.backgroundColor = `rgb(${randomize()}, ${randomize()}, ${randomize()})`;
        });
        tile.addEventListener('mousemove', function(e) {
            e.preventDefault();
            if (isMouseDown) {
                e.target.style.backgroundColor = `rgb(${randomize()}, ${randomize()}, ${randomize()})`;
            }
        })
    });
}
