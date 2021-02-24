let gridSize = 1000;

let startPoint = {
    x: 100,
    y: 100,
    rad: 70,
    fillStyle: 'rgba(0, 123, 255, 1)',
    strokeStyle: 'rgba(0, 0, 0, 1)',
}

let endPoint = {
    x: 100,
    y: 100,
    rad: 70,
    fillStyle: 'rgba(0, 123, 255, 1)',
    strokeStyle: 'rgba(0, 0, 0, 1)',
}

let backImage = new Image();
backImage.isReady = false;
backImage.onload = function() {
    this.isReady = true;
};
backImage.src = 'images/background.png';


function drawCell(cell, mazeSize) {
    //Based on Dr. Mathias Half maze code shown in class.
    //Render Background
    if (backImage.isReady) {
        context.drawImage(backImage,
        cell.x * (gridSize / mazeSize), cell.y * (gridSize/ mazeSize),
        gridSize / mazeSize + 0.5, gridSize / mazeSize + 0.5);
    }
    //Render Top Edge
    if (cell.edges.top === "wall") {
        context.moveTo(cell.x * (gridSize / mazeSize), cell.y * (gridSize / mazeSize));
        context.lineTo((cell.x + 1) * (gridSize / mazeSize), cell.y * (gridSize / mazeSize));
    }
    //Render Right Edge
    if (cell.edges.right === "wall") {
        context.moveTo((cell.x + 1) * (gridSize / mazeSize), cell.y * (gridSize / mazeSize));
        context.lineTo((cell.x + 1) * (gridSize / mazeSize), (cell.y + 1) * (gridSize / mazeSize));
    }
    //Render Bottom Edge
    if (cell.edges.bottom === "wall") {
        context.moveTo(cell.x * (gridSize / mazeSize), (cell.y + 1) * (gridSize / mazeSize));
        context.lineTo((cell.x + 1) * (gridSize / mazeSize), (cell.y + 1) * (gridSize / mazeSize));
    }
    //Render Left Edge
    if (cell.edges.left === "wall") {
        context.moveTo(cell.x * (gridSize / mazeSize), cell.y * (gridSize / mazeSize));
        context.lineTo(cell.x * (gridSize / mazeSize), (cell.y + 1) * (gridSize / mazeSize));
    }

}

function renderMaze(mazeSize) {
    // Render the cells first
    context.beginPath();
    for (let row = 0; row < mazeSize; row++) {
        for (let col = 0; col < mazeSize; col++) {
            drawCell(maze[row][col], mazeSize);
        }
    }
    context.closePath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 5;
    context.stroke();

    // Draw a black border around the whole maze
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(gridSize - 1, 0);
    context.lineTo(gridSize- 1, gridSize - 1);
    context.lineTo(0, gridSize - 1);
    context.closePath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.stroke();
}

function renderObjects(objectList, mazeSize) {
    context.drawImage(objectList.image,
    objectList.location.x * (gridSize / mazeSize) - 15, objectList.location.y * (gridSize / mazeSize) - 15,
    gridSize / mazeSize + 30, gridSize / mazeSize + 30);
}

function renderStart(start, mazeSize) {
    context.drawImage(start.image,
    start.location.x * (gridSize / mazeSize), start.location.y * (gridSize / mazeSize),
    gridSize / mazeSize + 0.5, gridSize / mazeSize + 0.5);
}

function renderEnd(end, mazeSize) {
    context.drawImage(end.image,
    end.location.x * (gridSize / mazeSize) + 5, end.location.y * (gridSize / mazeSize) + 5,
    gridSize / mazeSize - 10 , gridSize / mazeSize - 10 );
}

