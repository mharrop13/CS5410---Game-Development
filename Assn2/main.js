let canvas = null;
let context = null;
let keyboard = null;

let inputBuffer = {};
let prevTimeStamp = null;
let maze = primMaze(5);
let mazeDim = 5;
let character = null;

//Using set for all objects on board for easy add/removal
//This will make it easier to later implement monsters roaming
//and your hero killing them
let gameObjects = null;



function processInput(elapsedTime) {
    for (button in inputBuffer) {
        movePlayer(inputBuffer[button], character);
    }
    inputBuffer = {};
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderMaze(mazeDim);
    for (let item of gameObjects) {
        renderObject(item, mazeDim);
    }
}

function gameLoop() {

    processInput();
    render();
    requestAnimationFrame(gameLoop);

}

function initialize(gridParam) {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    
    mazeDim = gridParam;
    maze = primMaze(gridParam);
    gameObjects = new Set();

    let gameList = loadObjects(gridParam);
    for (let i of gameList) {
        gameObjects.add(i);
    }

    // keyboard = input.Keyboard();
    // console.log(keyboard);
    let tempObjects = [...gameObjects];
    character = tempObjects[gameObjects.size - 1];
    // registerInput(keyboard, tempObjects[gameObjects.size - 1]);

    window.addEventListener('keyup', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}