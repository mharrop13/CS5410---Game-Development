document.title = "CS5410 HW1 - Browser GameLoop";

//HTML/Browser Variables
let canvas;
let context;
let scoreOutput;
let localStorageName = "CS5410MazeGameHighScore";
let highScore;
//Game Variables
let maze;
let player;
let score;
let gameOver;
let gameObjects;
let hintToggle;
let breadCrumbToggle;
let pathToFinishToggle;
var input = new Set();

function processInput() {
    for (let i of input) {
        if (i.key == 'a' || i.key == 'j' || i.key == "ArrowLeft") {
            player.moveLeft(maze);
        } else if (i.key == 'd' || i.key == 'l' || i.key == "ArrowRight") {
            player.moveRight(maze);
        } else if (i.key == 'w' || i.key == 'i' || i.key == "ArrowUp") {
            player.moveUp(maze);
        } else if (i.key == 's' || i.key == 'k' || i.key == "ArrowDown") {
            player.moveDown(maze);
        }
        if (i.key == 'h') {
            hintToggle = !hintToggle;
        }
        if (i.key == 'b') {
            breadCrumbToggle != breadCrumbToggle;
        }
        if (i.key == 'p') {
            pathToFinishToggle != pathToFinishToggle;
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
}


function render() {
    context.clearRect(0,0, canvas.width, canvas.height);
    renderMaze(context, maze, player);

    //Check for Game Over
    if (gameOver) {
        renderGameOver(context, canvas);
        return;
    }
    for(let item of gameObjects) {
        renderObject(context, item, maze.size);
    }
    //Render Player Last to keep on top of other items
    renderObject(context, player, maze.size);
}

function gameLoop() {
    processInput();
    update()
    render();
    requestAnimationFrame(gameLoop);
}

function initialize(gridParam) {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    scoreOutput = document.getElementById('Score');
    highScoreOutput = document.getElementById('HighScore');

    //Generate Maze and Player
    gameOver = false;
    maze = new Maze(gridParam);
    gameObjects = new Set();
    player = new mazeObject("player", 0, 0, -10, 'images/character.png');
    score = 0;

    //Check for high score and if so, display it
    if (localStorage.getItem(localStorageName) == null) {
        highScore = 0
    } else {
        highScore = localStorage.getItem(localStorageName);
    }
    highScoreOutput.innerHTML = highScore;
    

    //Generate Money for Score
    for (let j = 0; j < Math.ceil(maze.size / 2); j++) {
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

    document.onkeyup = function(e) {
        e.preventDefault();
        input.add(e);
    }

    requestAnimationFrame(gameLoop);
}