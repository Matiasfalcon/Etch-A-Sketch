//  elements of the DOM
let body = document.querySelector("body");
let gridContainer = document.createElement("div");
let buttonSizeGrid = document.createElement("button");

// grid container
gridContainer.className = "grid-container";
buttonSizeGrid.className = "btn-grid-size";

// size button
buttonSizeGrid.innerHTML = "Size"
buttonSizeGrid.addEventListener("click", btnSizeGrid)

// variables
let sizeOfGrid = 0;
const maxSizeGrid = 750;
let r = 0;
let g = 0;
let b = 0;

// functions
function changeBackgroundColor(element) {
    let passOver = element.dataset.passOver | 0;
    if (passOver === 0) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    } else {
        let colorNow = element.style.backgroundColor;
        let rgb = colorNow.match(/\d+/g).map(Number);
        let newColor = `rgb(${Math.max(0, rgb[0] - (255 / 10))}, ${Math.max(0, rgb[1] - (255 / 10))}, ${Math.max(0, rgb[2] - (255 / 10))})`;
        element.style.backgroundColor = newColor;
    }
    element.dataset.passOver = passOver + 1;
    if (passOver === 10) {
        element.style.backgroundColor = "black";
    }
}

function btnSizeGrid() {
    gridContainer.innerHTML = "";
    sizeOfGrid = parseInt(prompt("Enter a size(64 max): "));
    while (sizeOfGrid > 64) {
        sizeOfGrid = parseInt(prompt("Enter a size(64 max): "));
    }
    for (let i = 0; i < sizeOfGrid; i++) {
        // create the row (div)
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.width = maxSizeGrid / sizeOfGrid;
        row.style.height = maxSizeGrid / sizeOfGrid;

        // loop fot he columns (div)
        for (let j = 0; j < sizeOfGrid; j++) {
            let column = document.createElement("div");
            column.classList.add("column");
            column.style.width = (maxSizeGrid / sizeOfGrid) + "px";
            column.style.height = (maxSizeGrid / sizeOfGrid) + "px";
            column.addEventListener("mouseover", () => changeBackgroundColor(column))

            // adding column to row
            row.appendChild(column);
        }

        // Addin row to container
        gridContainer.appendChild(row);
    }
}

// create and insert the divs, loop for the rows


// insert divs in the body
body.appendChild(buttonSizeGrid);
body.appendChild(gridContainer);


