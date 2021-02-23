let inputBuffer = {};
let canvas = null;
let context = null;
let maze = null;
let mazeHeight = null;
let mazeWidth = null;

const COORD_SIZE = 1000;

let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'images/background.jpg';

function drawCell(cell) {

    if (imgFloor.isReady) {
        context.drawImage(imgFloor,
        cell.x * (COORD_SIZE / mazeWidth), cell.y * (COORD_SIZE / mazeHeight),
        COORD_SIZE / mazeWidth + 0.5, COORD_SIZE / mazeHeight + 0.5);
    }

    if (cell.edges.n === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeWidth), cell.y * (COORD_SIZE / mazeHeight));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeWidth), cell.y * (COORD_SIZE / mazeHeight));
        //context.stroke();
    }

    if (cell.edges.s === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeWidth), (cell.y + 1) * (COORD_SIZE / mazeHeight));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeWidth), (cell.y + 1) * (COORD_SIZE / mazeHeight));
        //context.stroke();
    }

    if (cell.edges.e === null) {
        context.moveTo((cell.x + 1) * (COORD_SIZE / mazeWidth), cell.y * (COORD_SIZE / mazeHeight));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeWidth), (cell.y + 1) * (COORD_SIZE / mazeHeight));
        //context.stroke();
    }

    if (cell.edges.w === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeWidth), cell.y * (COORD_SIZE / mazeHeight));
        context.lineTo(cell.x * (COORD_SIZE / mazeWidth), (cell.y + 1) * (COORD_SIZE / mazeHeight));
        //context.stroke();
    }

    //
    // Can do all the moveTo and lineTo commands and then render them all with a single .stroke() call.
    context.stroke();
}

function renderCharacter(character) {
    if (character.image.isReady) {
        context.drawImage(character.image,
        character.location.x * (COORD_SIZE / mazeWidth), character.location.y * (COORD_SIZE / mazeHeight), 100, 100 * character.image.height / character.image.width);
    }
}

function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
}

function renderMaze() {
    // Render the cells first
    context.beginPath();
    for (let row = 0; row < mazeHeight; row++) {
        for (let col = 0; col < mazeWidth; col++) {
            drawCell(maze[row][col]);
        }
    }
    context.closePath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 6;
    context.stroke();

    // Draw a black border around the whole maze
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(COORD_SIZE - 1, 0);
    context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
    context.lineTo(0, COORD_SIZE - 1);
    context.closePath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.stroke();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMaze();
}

function gameLoop() {
    render();

    requestAnimationFrame(gameLoop);

}

function initialize(width, height) {
    console.log(width);
    console.log(height);
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    mazeHeight = height;
    mazeWidth = width;
    maze = primMaze(width, height);

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}