//Convert this file to JSON if I get time
function loadObjects(dim) {
    let player = function(imageSource, location) {
        let myLocation = location;
        let image = new Image();
        image.isReady = false;
        image.onload = function() {
            this.isReady = true;
        };
        image.src = imageSource;
        let moveLeft = function() {
            console.log(myLocation.edges.left);
            if (myLocation.edges.left !== "wall") {
                myLocation = myLocation.edges.left; 
                console.log("character moved to " + myLocation.x + " , " + myLocation.y);
            }
            
        };
        let moveRight = function() {
            console.log(myLocation.edges.right);
            if (myLocation.edges.right !== "wall") {
                myLocation = myLocation.edges.right; 
                console.log("character moved to " + myLocation.x + " , " + myLocation.y);
            }
            
        };
        let moveUp = function() {
            console.log(myLocation.edges.top);
            if (myLocation.edges.top !== "wall") {
                myLocation = myLocation.edges.top; 
                console.log("character moved to " + myLocation.x + " , " + myLocation.y);
            }
        };
        let moveDown = function() {
            console.log(myLocation.edges.bottom);
            if (myLocation.edges.bottom !== "wall") {
                myLocation = myLocation.edges.bottom; 
                console.log("character moved to " + myLocation.x + " , " + myLocation.y);
            }
            
        };
        
        return {
            location: myLocation,
            image: image,
            deficit: 30,
            moveLeft: moveLeft,
            moveRight: moveRight,
            moveUp: moveUp,
            moveDown:moveDown,
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
            image: image, 
            deficit: 0.5
        };
    }('images/start.png', maze[0][1]);

    //Prevent end space being on same space as start space
    let randomX = 0;
    let randomY = 0;
    while (randomX === 0 && randomY === 0) {
        randomX = Math.floor(Math.random() * dim);
        randomY = Math.floor(Math.random() * dim);
    }

    let endSpace = function(imageSource, location) {
        let image = new Image();
        image.isReady = false;
        image.onload = function() {
            this.isReady = true;
        };
        image.src = imageSource;

        return {
            location: location,
            image: image,
            deficit: -10
        };
    }('images/destination.png', maze[randomY][randomX]);
    

    return [startSpace, endSpace, player]
}