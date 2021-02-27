let gridSize = 1000;

let backImage = new Image();
backImage.isReady = false;
backImage.onload = function() {
    this.isReady = true;
};
backImage.src = 'images/background.png';

//Draw Cell and Render Maze are based on Dr. Mathias HalfMaze Code
function drawCell(context, cell, mazeSize) {
    let cellSize = gridSize / mazeSize;
    //Based on Dr. Mathias Half maze code shown in class.
    //Render Background
    if (backImage.isReady) {
        context.drawImage(backImage, cell.col * cellSize, cell.row * cellSize, cellSize + 0.5, cellSize + 0.5);
    }

    //Render Top Edge
    if (cell.edges.top === "wall") {
        context.moveTo(cell.col * cellSize, cell.row * cellSize);
        context.lineTo((cell.col + 1) * cellSize, cell.y * cellSize);
    }

    //Render Bottom Edge
    if (cell.edges.bottom === "wall") {
        context.moveTo(cell.col * cellSize, (cell.row + 1) * cellSize);
        context.lineTo((cell.col + 1) * cellSize, (cell.row + 1) * cellSize);
    }

    //Render Right Edge
    if (cell.edges.right === "wall") {
        context.moveTo((cell.col + 1) * cellSize, cell.row * cellSize);
        context.lineTo((cell.col + 1) * cellSize, (cell.row + 1) * cellSize);
    }
    
    //Render Left Edge
    if (cell.edges.left === "wall") {
        context.moveTo(cell.col * cellSize, cell.row * cellSize);
        context.lineTo(cell.col * cellSize, (cell.row + 1) * cellSize);
    }
}

function renderMaze(context, maze, playerObject) {
    //Draw Cells
    context.beginPath();
    context.lineCap = "round";
    for (let col = 0; col < maze.size; col++) {
        for (let row = 0; row < maze.size; row++) {
            drawCell(context, maze.maze[col][row], maze.size,);
        }
    }
    context.closePath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 8;
    context.stroke();

    //Draw Borders
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(gridSize - 1, 0);
    context.lineTo(gridSize- 1, gridSize - 1);
    context.lineTo(0, gridSize - 1);
    context.closePath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 10;
    context.stroke();
    
    //Render Start and Finish since they are a part of the maze
    renderObject(context, maze.start, maze.size);
    renderObject(context, maze.finish, maze.size);
}

function renderObject(context, mazeObject, mazeSize) {
    let cellSize = gridSize / mazeSize;
    if (mazeObject.img.isReady) {
        context.drawImage(mazeObject.img,
        mazeObject.col * cellSize + mazeObject.deficit / -2, mazeObject.row * cellSize + mazeObject.deficit / -2,
        cellSize + mazeObject.deficit, cellSize + mazeObject.deficit);
    }
}

function renderGameOver(context, canvas) {
    let msg = "Game Over"
    context.beginPath();
    context.font = "bold 150px Arial"
    context.fillText(msg, canvas.width / 2 - 400, canvas.height / 2);
    context.strokeText(msg, canvas.width/ 2 - 400, canvas.height/2);
    context.closePath();
}

function renderSolution(context, maze) {
    let cellSize = gridSize / maze.size;
    for (let spot of maze.solution) {
        context.beginPath();
        context.arc(spot.col * cellSize + cellSize / 2 , spot.row * cellSize + cellSize / 2, 
            .1 * cellSize, 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.3';
        context.fill();
        context.closePath();
    }
    
}

function renderHint(context, maze) {
    let cellSize = gridSize / maze.size;
    let spot = maze.solution[maze.solution.length - 1];
    if (spot) {
        context.beginPath();
        context.arc(spot.col * cellSize + cellSize / 2 , spot.row * cellSize + cellSize / 2, 
            .1 * cellSize, 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.3';
        context.fill();
        context.closePath();
    }
    

}

function renderBreadCrumbs(context, maze, breadCrumbs) {
    let cellSize = gridSize / maze.size;
    for (let spot of breadCrumbs) {
        context.beginPath();
        context.arc(spot.col * cellSize + cellSize / 2 , spot.row * cellSize + cellSize / 2, 
            .05 * cellSize, 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.9';
        context.fill();
        context.closePath();
    }
    
}