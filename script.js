// Constants for clarity and maintainability
const BODY = document.querySelector("body");
const MAX_GRID_SIZE = 750;
const MAX_ALLOWED_GRID_SIZE = 64;

// Function to create grid elements
function createGrid(size) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            const column = document.createElement("div");
            column.classList.add("column");
            column.style.width = `${MAX_GRID_SIZE / size}px`;
            column.style.height = `${MAX_GRID_SIZE / size}px`;
            column.addEventListener("mouseover", (event) => changeBackgroundColor(event.target));
            row.appendChild(column);
        }
        gridContainer.appendChild(row);
    }

    return gridContainer;
}

// Function to handle grid size input with proper validation
function handleGridSizePrompt() {
    let gridSize = parseInt(prompt("Enter a size (64 max): "));
    while (isNaN(gridSize) || gridSize > MAX_ALLOWED_GRID_SIZE) {
        alert("Invalid input. Please enter a number between 1 and 64.");
        gridSize = parseInt(prompt("Enter a size (64 max): "));
    }
    return gridSize;
}

// Function to handle background color changes
function changeBackgroundColor(element) {
    const passOverCount = element.dataset.passOver | 0;

    if (passOverCount === 0) {
        const [r, g, b] = [Math.random() * 256 | 0, Math.random() * 256 | 0, Math.random() * 256 | 0];
        element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        const rgb = element.style.backgroundColor.match(/\d+/g).map(Number);
        const newColor = `rgb(${Math.max(0, rgb[0] - (255 / 10))
            }, ${Math.max(0, rgb[1] - (255 / 10))}, ${Math.max(0, rgb[2] - (255 / 10))})`;
        element.style.backgroundColor = newColor;
    }

    element.dataset.passOver = passOverCount + 1;
    if (passOverCount === 10) {
        element.style.backgroundColor = "black";
    }
}

// Initialize button and grid
const buttonSizeGrid = document.createElement("button");
buttonSizeGrid.classList.add("btn-grid-size");
buttonSizeGrid.textContent = "Size";
buttonSizeGrid.addEventListener("click", () => {
    const gridSize = handleGridSizePrompt();
    BODY.replaceChild(createGrid(gridSize), BODY.querySelector(".grid-container"));
});

BODY.appendChild(buttonSizeGrid);
BODY.appendChild(createGrid(0)); // Initially create an empty grid