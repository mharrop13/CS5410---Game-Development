let gridSize = 1000;

let backImage = new Image();
backImage.isReady = false;
backImage.onload = function() {
    this.isReady = true;
};
backImage.src = 'images/background.png';

//Draw Cell and Render Maze are based on Dr. Mathias HalfMaze Code
function drawCell(context, cell, mazeSize) {
    //Based on Dr. Mathias Half maze code shown in class.
    //Render Background
    if (backImage.isReady) {
        context.drawImage(backImage,
        cell.col * (gridSize / mazeSize), cell.row * (gridSize/ mazeSize),
        gridSize / mazeSize + 0.5, gridSize / mazeSize + 0.5);
    }
    //Render Top Edge
    if (cell.edges.top === "wall") {
        context.moveTo(cell.col * (gridSize / mazeSize), cell.row * (gridSize / mazeSize));
        context.lineTo((cell.col + 1) * (gridSize / mazeSize), cell.y * (gridSize / mazeSize));
    }
    //Render Bottom Edge
    if (cell.edges.bottom === "wall") {
        context.moveTo(cell.col * (gridSize / mazeSize), (cell.row + 1) * (gridSize / mazeSize));
        context.lineTo((cell.col + 1) * (gridSize / mazeSize), (cell.row + 1) * (gridSize / mazeSize));
    }
    //Render Right Edge
    if (cell.edges.right === "wall") {
        context.moveTo((cell.col + 1) * (gridSize / mazeSize), cell.row * (gridSize / mazeSize));
        context.lineTo((cell.col + 1) * (gridSize / mazeSize), (cell.row + 1) * (gridSize / mazeSize));
    }
    //Render Left Edge
    if (cell.edges.left === "wall") {
        context.moveTo(cell.col * (gridSize / mazeSize), cell.row * (gridSize / mazeSize));
        context.lineTo(cell.col * (gridSize / mazeSize), (cell.row + 1) * (gridSize / mazeSize));
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
    if (mazeObject.img.isReady) {
        context.drawImage(mazeObject.img,
        mazeObject.col * (gridSize / mazeSize) + mazeObject.deficit / -2, mazeObject.row * (gridSize/ mazeSize) + mazeObject.deficit / -2,
        gridSize / mazeSize + mazeObject.deficit, gridSize / mazeSize + mazeObject.deficit);
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
    for (let spot of maze.solution) {
        context.beginPath();
        context.arc(spot.col * (gridSize / maze.size) + (gridSize / maze.size) / 2 , 
        spot.row * (gridSize / maze.size) + (gridSize / maze.size) / 2, 
        .1 * (gridSize / maze.size), 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.3';
        context.fill();
        context.closePath();
    }
    
}

function renderHint(context, maze) {
    let spot = maze.solution[maze.solution.length - 1];
    if (spot) {
        context.beginPath();
        context.arc(spot.col * (gridSize / maze.size) + (gridSize / maze.size) / 2 , 
        spot.row * (gridSize / maze.size) + (gridSize / maze.size) / 2, 
        .1 * (gridSize / maze.size), 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.3';
        context.fill();
        context.closePath();
    }
    

}

function renderBreadCrumbs(context, maze, breadCrumbs) {
    for (let spot of breadCrumbs) {
        context.beginPath();
        context.arc(spot.col * (gridSize / maze.size) + (gridSize / maze.size) / 2 , 
        spot.row * (gridSize / maze.size) + (gridSize / maze.size) / 2, 
        .05 * (gridSize / maze.size), 0,  2 * Math.PI); 
        context.fillStyle = 'rgba(0, 255, 0, 0.9';
        context.fill();
        context.closePath();
    }
    
}