class mazeObject {
    constructor(name, col, row, deficit, imgSrc,) {
        this.name = name
        this.col = col;
        this.row = row;
        this.deficit =  deficit;
        this.img = imgSrc;
        this.point = 0;

        this.loadImg();
    }

    loadImg() {
        let objectImage = new Image();
        objectImage.isReady = false;
        objectImage.onload = function() {
            this.isReady = true;
        };
        objectImage.src = this.img;

        this.img = objectImage;
    }

    setPointValue(value) {
        this.point = value;
    }

    moveRight(maze) {
        if (this.col < maze.size - 1 && maze.maze[this.col][this.row].edges.right !== "wall") {
            this.col = this.col + 1;
            return true;
        }
        return false;
    }

    moveLeft(maze) {
        if (this.col > 0 && maze.maze[this.col][this.row].edges.left !== "wall") {
            this.col = this.col - 1;
            return true;
        }
        return false;
    }

    moveUp(maze) {
        if (this.row > 0 && maze.maze[this.col][this.row].edges.top !== "wall") {
            this.row = this.row - 1;
            return true;
        }
        return false;
    }

    moveDown(maze) {
        if (this.row < maze.size - 1 && maze.maze[this.col][this.row].edges.bottom !== "wall") {
            this.row = this.row + 1;
            return true;
        }
        return false;
    }


}

class mazeCell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.visited = false;
        this.previous = null;
        this.neighbors = [];
        this.edges =  {
            top: "wall",
            bottom: "wall",
            left: "wall", 
            right: "wall",
        };
        
    }
}

class Maze {
    constructor(size) {
        this.size = size;
        this.maze = [];
        this.start = new mazeObject("start", 0, 0, -20, 'images/start.png');
        this.finish = new mazeObject("finish", this.size - 1, this.size - 1, 0, 'images/finish.png');
        this.solution = null;

        this.generateMaze()
        this.solveMaze()
    }

    generateMaze() {
        //Based on Randomized Prims
        console.log("generating maze");
        //Create a grid of unvisited cells
        for (let col = 0; col < this.size; col++) {
            this.maze.push([]);
            for (let row = 0; row < this.size; row++) {
                this.maze[col][row] = new mazeCell(col, row);
                let cell = this.maze[col][row];

                //Add Neighboring cells
                if (this.maze[col - 1]) {
                    if (this.maze[col - 1][row]) {
                        let aboveCell = this.maze[col - 1][row];
                        cell.neighbors.push(aboveCell);
                        aboveCell.neighbors.push(cell);
                    }
                }
                if (this.maze[col][row - 1]) {
                    let leftCell = this.maze[col][row - 1];
                    cell.neighbors.push(leftCell);
                    leftCell.neighbors.push(cell);
                }
            }
        }

        //Only need 1 set because I'm using visited to tell if a cell is visited or not
        let frontier = new Set();
        //Randomly pick a starting cell 
        let ranRow = Math.floor(Math.random() * this.size);
        let ranCol = Math.floor(Math.random() * this.size);

        let startCell = this.maze[ranCol][ranRow];
        startCell.visited = true;

        //Add starting cell's neighbors to frontier
        for (let next of startCell.neighbors) {
            if (next.visited === false) {
                frontier.add(next);
            }
        }

        this.processFrontier(frontier);
    }

    processFrontier(frontier) {
        //Grab a random frontier cell
        let tempFrontier = [...frontier];
        this.shuffle(tempFrontier);
        let frontierCell = tempFrontier[tempFrontier.length - 1]; 

        //Add frontierCell to visited and remove from frontier
        frontierCell.visited = true;
        frontier.delete(frontierCell);
        
        //look at all walls that connect to other cells that are in the maze
        let inMaze = [];
        for (let adjacent of frontierCell.neighbors) {
            if (adjacent.visited === true) {
                inMaze.push(adjacent);
            }
        }
        this.shuffle(inMaze);

        let ranMazeCell = inMaze[Math.floor(Math.random() * inMaze.length)];
        //Remove the wall between ranMazeCell and the frontierCell
        if (frontierCell.row > ranMazeCell.row) {          // Maze Cell is on top of Frontier Cell
            frontierCell.edges.top = ranMazeCell;
            ranMazeCell.edges.bottom = frontierCell;
        } else if (frontierCell.row < ranMazeCell.row) {    //Maze Cell is on bottom of Frontier Cell
            frontierCell.edges.bottom = ranMazeCell;
            ranMazeCell.edges.top = frontierCell;
        } else if (frontierCell.col > ranMazeCell.col) {    //Maze Cell is on right of Frontier Cell
            frontierCell.edges.left = ranMazeCell;
            ranMazeCell.edges.right = frontierCell;
        } else if (frontierCell.col < ranMazeCell.col) {    //Maze Cell is on left of Frontier Cell
            frontierCell.edges.right = ranMazeCell;
            ranMazeCell.edges.left = frontierCell;
        }

        //Add frontierCell's neighbors to frontier
        for (let adjacentCell of frontierCell.neighbors) {
            if (adjacentCell.visited === false) {
                frontier.add(adjacentCell);
            }
        }
        //Recurse if still cells in frontier
        if (frontier.size > 0) {
            this.processFrontier(frontier);
        }
    }

    solveMaze() {
        //Go through maze and set cell visited status to false
        console.log("Building SOlution");
        //reset all cells visited status to false
        for (let j = 0; j < this.size; j++) {
            for (let k = 0; k < this.size; k++) {
                this.maze[j][k].visited = false;
            }
        }
        //Go through maze and maze each cell aware of it's previous cell
        let stack = [];
        let current = this.maze[0][0];
        stack.push(current);
        while (current !== this.maze[this.finish.col][this.finish.row]) {
            current = stack.pop()
            current.visited = true;

            for (let i in current.edges) {
                let temp = current.edges[i];
                if (temp !== "wall" && temp.visited !== true) {
                    temp.previous = current;
                    stack.push(temp);
                }
            }
        }
        // Populate solution array by iterating backward from finish to start
        this.solution = [];
        current = this.maze[this.finish.col][this.finish.row];
        while (current !== this.maze[0][0]) {
            current = current.previous;
            this.solution.push(current);
        }

        //Pop the [0,0] off
        this.solution.pop();
    }

    //Used to give the array a little extra shuffle to get truly random pick
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

}