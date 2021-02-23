function primMaze(width, height) {
    // 1. Start with grid of unvisited cells
    let maze = [];
    let mazeHeight = height;
    let mazeWidth = width;
    //Create a grid of unvisited cells
    for (let row = 0; row < mazeHeight; row++) {
        maze.push([]);
        for (let col = 0; col < mazeWidth; col++) {
            let cell = {
                x: col,
                y: row, 
                status: "unvisited",
                neighbors:[],
                edges: {
                    n: null,
                    s: null,
                    e: null,
                    w: null
                }
            };
            maze[row][col] = cell;

            //Add Neighboring cells
            if (maze[row - 1]) {
                if (maze[row - 1][col]) {
                    let aboveCell = maze[row - 1][col];
                    cell.neighbors.push(aboveCell);
                    aboveCell.neighbors.push(cell);
                }
            }
            if (maze[row][col - 1]) {
                let leftCell = maze[row][col - 1];
                cell.neighbors.push(leftCell);
                leftCell.neighbors.push(cell);
            }
        }
    }

    //Only need 1 set because I'm using status to tell if a cell is visited or not
    frontier = new Set();
    //Randomly pick a starting cell 
    let ranX = Math.floor(Math.random() * mazeWidth);
    let ranY = Math.floor(Math.random() * mazeHeight);
    startCell = maze[ranY][ranX];
    startCell.status = "visited";

    //Add starting cell's neighbors to frontier
    for (let next of startCell.neighbors) {
        if (next.status === "unvisited") {
            frontier.add(next);
        }
    }
    processFrontier();
    function processFrontier() {
        //Grab a random frontier cell
        let tempFrontier = [...frontier];
        frontierCell = tempFrontier[Math.floor(Math.random() * tempFrontier.length)]; 
        
        //look at all walls that connect to other cells that are in the maze
        let inMaze = [];
        for (let mazeCell of frontierCell.neighbors) {
            if (mazeCell.status === "visited") {
                inMaze.push(mazeCell);
            }
        }

        ranMazeCell = inMaze[Math.floor(Math.random() * inMaze.length)];
        //Remove the wall between ranMazeCell and the frontierCell
        if (frontierCell.y > ranMazeCell.y ) {          // Maze Cell is on top of Frontier Cell
            frontierCell.edges.n = ranMazeCell;
            ranMazeCell.edges.s = frontierCell;
        } else if (frontierCell.y < ranMazeCell.y) {    //Maze Cell is on bottom of Frontier Cell
            frontierCell.edges.s = ranMazeCell;
            ranMazeCell.edges.n = frontierCell;
        } else if (frontierCell.x > ranMazeCell.x) {    //Maze Cell is on right of Frontier Cell
            frontierCell.edges.w = ranMazeCell;
            ranMazeCell.edges.e = frontierCell;
        } else if (frontierCell.x < ranMazeCell.x) {                                        //Maze Cell is on left of Frontier Cell
            frontierCell.edges.e = ranMazeCell;
            ranMazeCell.edges.w = frontierCell;
        }

        //Add frontierCell to visited and remove from frontier
        frontierCell.status = "visited";
        frontier.delete(frontierCell);

        //Add frontierCell's neighbors to frontier
        for (let adjacentCell of frontierCell.neighbors) {
            if (adjacentCell.status === "unvisited") {
                frontier.add(adjacentCell);
            }
        }
        if (frontier.size > 0) {
            processFrontier();
        }
    }

    return maze;
}