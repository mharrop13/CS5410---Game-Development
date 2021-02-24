let inputBuffer = {};
let canvas = null;
let context = null;
let maze = primMaze(5);
let mazeDim = 5;

let randomX = Math.floor(Math.random() * mazeDim);
let randomY = Math.floor(Math.random() * mazeDim);

let player = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}('images/character.png', maze[0][0]);

let startSpace = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}('images/start.png', maze[0][1]);

let endSpace = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;

    return {
        location: location,
        image: image
    };
}('images/destination.png', maze[randomY][randomX]);

objectsToRender = [player, startSpace, endSpace];

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderMaze(mazeDim);
    renderObjects(player, mazeDim);
    renderStart(startSpace, mazeDim);
    renderEnd(endSpace, mazeDim);
}


function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);

}

function initialize(gridParam) {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    if (gridParam) {
        mazeDim = gridParam;
        maze = primMaze(gridParam);
    }
    
    // window.addEventListener('keydown', function(event) {
    //     inputBuffer[event.key] = event.key;
    // });

    requestAnimationFrame(gameLoop);
}