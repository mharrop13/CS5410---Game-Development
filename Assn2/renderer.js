let gridSize = 1000;

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

function renderObject(object, mazeSize) {
    if (object.image.isReady) {
        context.drawImage(object.image,
            object.location.x * (gridSize / mazeSize) + object.deficit / -2, 
            object.location.y * (gridSize / mazeSize) + object.deficit / -2,
            gridSize / mazeSize + object.deficit, gridSize / mazeSize + object.deficit);
    }
    
}

