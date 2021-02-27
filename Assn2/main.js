document.title = "CS5410 HW1 - Browser GameLoop";

//HTML/Browser Variables
let canvas;
let context;
let scoreOutput;
let highScoreOutput;
let timerOutput;
let moveNumberOutput;
let localStorageName = "CS5410MazeGameHighScore";
//Game Variables
let time;
let score;
let highScore;
let moveNumber;
let maze;
let player;
let gameOver;
let gameObjects;
//Toggle Variables
let hintToggle;
let breadCrumbToggle = true;
let pathToFinishToggle;

//Updating variables
let input = new Set();
let breadCrumbs;
let playerTrailHistory;
let playerMoved;


function processInput() {
    for (let i of input) {
        playerMoved = false;
        if (i.key == 'a' || i.key == 'j' || i.key == "ArrowLeft") {
            playerMoved = player.moveLeft(maze);
        } else if (i.key == 'd' || i.key == 'l' || i.key == "ArrowRight") {
            playerMoved = player.moveRight(maze);
        } else if (i.key == 'w' || i.key == 'i' || i.key == "ArrowUp") {
            playerMoved = player.moveUp(maze);
        } else if (i.key == 's' || i.key == 'k' || i.key == "ArrowDown") {
            playerMoved = player.moveDown(maze);
        }
        if (i.key == 'h') {
            hintToggle = !hintToggle;
        }
        if (i.key == 'b') {
            breadCrumbToggle = !breadCrumbToggle;
        }
        if (i.key == 'p') {
            pathToFinishToggle = !pathToFinishToggle;
        }
        input.delete(i);
    }
}

function update() {
    //Check for gameOver
    if (!gameOver) {
        if (player.col === maze.finish.col && player.row === maze.finish.row) {
            score = score + 1000;
            scoreOutput.innerHTML = score;
            gameOver = true;
            localStorage.setItem(localStorageName, Math.max(score, highScore));
            
            return;
        }
    }

    //Update Score
    for (let ob of gameObjects) {
        if (player.col === ob.col && player.row === ob.row) {
            score = score +  ob.point;
            gameObjects.delete(ob);
        }
    }
    scoreOutput.innerHTML = score;

    //Update Move Number
    moveNumber = playerTrailHistory.length - 1;
    moveNumberOutput.innerHTML = moveNumber;

    //Update bread Crumb trail
    if (!breadCrumbs.has(maze.maze[player.col][player.row])) {
        breadCrumbs.add(maze.maze[player.col][player.row]);
    }

    //Update Solution Trail
    if (playerMoved) {
        let currentCell = maze.maze[player.col][player.row];
        playerTrailHistory.push(currentCell);
        playerMoved = false;
        let lastSolutionCell = maze.solution[maze.solution.length - 1];
        if (currentCell === lastSolutionCell) {     //Player  Moved into a cell contained in the solution
            maze.solution.splice(-1, 1);
        } else {    //Player moved to cell not in the solution so we need to add the players last cell to solution
            let lastCell = playerTrailHistory[playerTrailHistory.length - 2];
            maze.solution.push(lastCell);
        }
    }
}


function render() {
    //Clear Canvas
    context.clearRect(0,0, canvas.width, canvas.height);

    //Render Maze
    renderMaze(context, maze, player);

    //Check for Game Over
    if (gameOver) {
        renderGameOver(context, canvas);
        return;
    }

    //render Game Objects
    for(let item of gameObjects) {
        renderObject(context, item, maze.size);
    }

    //Render hint if toggled
    renderObject(context, player, maze.size);
    if (hintToggle) {
        renderHint(context, maze);
    }

    //Render bread crumb trail if toggled
    if (breadCrumbToggle) {
        renderBreadCrumbs(context, maze, breadCrumbs);
    }
    
    //Render solution path if toggled
    if (pathToFinishToggle) {
        renderSolution(context, maze);
    }
}

function gameLoop() {
    processInput();
    update()
    render();
    requestAnimationFrame(gameLoop);
}

function initialize(gridParam) {
    console.log("Initializing");
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    scoreOutput = document.getElementById('Score');
    highScoreOutput = document.getElementById('HighScore');
    timerOutput = document.getElementById('Timer');
    moveNumberOutput = document.getElementById('MoveNumber');

    //Generate Maze and Player
    gameOver = false;
    maze = new Maze(gridParam);
    gameObjects = new Set();
    player = new mazeObject("player", 0, 0, -10, 'images/character.png');
    score = 0;
    moveNumber = 0;
    breadCrumbs = new Set();
    playerTrailHistory = [];
    playerTrailHistory.push(maze.maze[0][0]);

    //Check for high score and if so, display it
    if (localStorage.getItem(localStorageName) == null) {
        highScore = 0
    } else {
        highScore = localStorage.getItem(localStorageName);
    }
    highScoreOutput.innerHTML = highScore;
    
    //Modifier for generating Money
    let modifier = 1;
    switch (gridParam) { 
        case 5:
            modifier = 1;
            break;
        case 10:
            modifier = 2;
            break;
        case 15:
            modifier = 3;
            break;
        case 20:
            modifier = 4;
            break;
    }
    
    //Generate Money for Score
    for (let j = 0; j < Math.ceil((maze.size / 2)) * modifier; j++) {
        let money;
        let ran = Math.floor(Math.random() * 3);
        let ranX = Math.floor(Math.random() * maze.size);
        let ranY = Math.floor(Math.random() * maze.size);
        //Avoid Putting money on Start and Finish. Note that money can stack on 1 space
        while (ranX === 0 && ranY === 0 || ranX === maze.finish.col || ranY === maze.finish.row) {
            ranX = Math.floor(Math.random() * maze.size);
            ranY = Math.floor(Math.random() * maze.size);
        }
        switch(ran) {
            case 0:
                money = new mazeObject("green", ranX, ranY, -30, 'images/greenMoney.png');
                money.setPointValue(10);
                break;
            case 1:
                money = new mazeObject("green", ranX, ranY, -30, 'images/blueMoney.png');
                money.setPointValue(50);
                break;
            case 2:
                money = new mazeObject("green", ranX, ranY, -30, 'images/redMoney.png');
                money.setPointValue(200);
                break;
        }
        gameObjects.add(money);
    }

    //Start Timer
    time = 0;
    timer();

    function timer() {
        setTimeout(function() {
            if (!gameOver) {
                time++;
                let min = Math.floor(time / 60);
                let seconds = time % 60;

                timeString = min.toString().padStart(2, '0') 
                + ':' + seconds.toString().padStart(2, '0');

                timerOutput.innerHTML = timeString;
                timer();
            }
            
        }, 1000)
    }

    document.onkeyup = function(e) {
        e.preventDefault();
        input.add(e);
    }

    requestAnimationFrame(gameLoop);
}