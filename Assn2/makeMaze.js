function primMaze(gridSize = 5) {
    // 1. Start with grid of unvisited cells
    let maze = [];
    let size = gridSize;
    //Create a grid of unvisited cells
    for (let row = 0; row < size; row++) {
        maze.push([]);
        for (let col = 0; col < size; col++) {
            let cell = {
                x: col,
                y: row, 
                status: "unvisited",
                neighbors:[],
                edges: {
                    top: "wall",
                    bottom: "wall",
                    right: "wall",
                    left: "wall"
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
    let ranX = Math.floor(Math.random() * size);
    let ranY = Math.floor(Math.random() * size);
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

        //Add frontierCell to visited and remove from frontier
        frontierCell.status = "visited";
        frontier.delete(frontierCell);
        
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
            frontierCell.edges.top = ranMazeCell;
            ranMazeCell.edges.bottom = frontierCell;
        } else if (frontierCell.y < ranMazeCell.y) {    //Maze Cell is on bottom of Frontier Cell
            frontierCell.edges.bottom = ranMazeCell;
            ranMazeCell.edges.top = frontierCell;
        } else if (frontierCell.x > ranMazeCell.x) {    //Maze Cell is on right of Frontier Cell
            frontierCell.edges.left = ranMazeCell;
            ranMazeCell.edges.right = frontierCell;
        } else if (frontierCell.x < ranMazeCell.x) {                                        //Maze Cell is on left of Frontier Cell
            frontierCell.edges.right = ranMazeCell;
            ranMazeCell.edges.left = frontierCell;
        }

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