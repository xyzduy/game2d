const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Grid settings
const blockSize = 40; // Size of each block
const rows = Math.floor(canvas.height / blockSize);
const cols = Math.floor(canvas.width / blockSize);

// Game variables
let grid = [];
const colors = ["#8B4513", "#228B22", "#D3D3D3", "#FFFF00"]; // Brown, Green, Gray, Yellow

// Initialize the grid
for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
        // Add grass (green) on top, dirt (brown) below
        if (y < rows / 2) row.push(null); // Empty sky
        else if (y === Math.floor(rows / 2)) row.push(1); // Grass
        else row.push(0); // Dirt
    }
    grid.push(row);
}

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] !== null) {
                ctx.fillStyle = colors[grid[y][x]];
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                ctx.strokeStyle = "#000";
                ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }
}

// Add block
function addBlock(x, y, type) {
    const gridX = Math.floor(x / blockSize);
    const gridY = Math.floor(y / blockSize);

    if (gridY < rows && gridX < cols && grid[gridY][gridX] === null) {
        grid[gridY][gridX] = type; // Add block type
    }
}

// Remove block
function removeBlock(x, y) {
    const gridX = Math.floor(x / blockSize);
    const gridY = Math.floor(y / blockSize);

    if (gridY < rows && gridX < cols && grid[gridY][gridX] !== null) {
        grid[gridY][gridX] = null; // Remove block
    }
}

// Handle mouse clicks
canvas.addEventListener('mousedown', (e) => {
    const button = e.button; // 0: Left click, 2: Right click
    const x = e.clientX;
    const y = e.clientY;

    if (button === 0) {
        // Add block (grass by default)
        addBlock(x, y, 1);
    } else if (button === 2) {
        // Remove block
        removeBlock(x, y);
    }
});

// Prevent context menu
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// Game loop
function gameLoop() {
    drawGrid();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();