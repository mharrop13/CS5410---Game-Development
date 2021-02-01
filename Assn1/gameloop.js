document.title = "CS5410 HW1 - Browser GameLoop";
const BODY = document.body;


//Initialize Game - Load Graphics
const HEADER = document.createElement('div');
HEADER.setAttribute('class', 'header bold blue');
BODY.appendChild(HEADER);

let title = document.createElement('h1');
title.textContent = "Browser GameLoop";
HEADER.appendChild(title);

let content = document.createElement('div');
content.setAttribute('class', 'white');
BODY.appendChild(content);

let consoleBox = document.createElement('div');
consoleBox.setAttribute('id', 'console')
consoleBox.setAttribute('class', 'consoleBox white');
content.appendChild(consoleBox);

let inputBox = document.createElement('div');
inputBox.setAttribute('class', 'inputBox  white');
content.appendChild(inputBox);

let footer = document.createElement('div');
footer.setAttribute('class', 'header blue');
BODY.appendChild(footer);

let signature = document.createElement('h3');
signature.textContent = "Created by Michael Harrop for CS5410";
footer.appendChild(signature);

let inputForm = document.createElement('form');
inputForm.setAttribute('id', 'myform');
inputBox.appendChild(inputForm);

let nameLabel = document.createElement('label')
nameLabel.setAttribute('for', "nameInput");
nameLabel.textContent = "Name: ";
inputForm.appendChild(nameLabel);

let nameInput = document.createElement('input');
nameInput.setAttribute('type', 'text');
nameInput.setAttribute('id', "nameInput");
nameInput.setAttribute('name', "nameInput");
nameInput.setAttribute('value', 'First');
inputForm.appendChild(nameInput);

let linebreak = document.createElement('br');
inputForm.appendChild(linebreak);

let intervalLabel = document.createElement('label')
intervalLabel.setAttribute('for', "intervalInput");
intervalLabel.textContent = "Interval: ";
inputForm.appendChild(intervalLabel);

let intervalInput = document.createElement('input');
intervalInput.setAttribute('type', 'number');
intervalInput.setAttribute('id', "intervalInput");
intervalInput.setAttribute('name', "intervalInput");
intervalInput.setAttribute('value', '1');
inputForm.appendChild(intervalInput);

let lineBreak2 = document.createElement('br');
inputForm.appendChild(lineBreak2);

let occurenceLabel = document.createElement('label')
occurenceLabel.setAttribute('for', "occurenceInput");
occurenceLabel.textContent = "# Times: ";
inputForm.appendChild(occurenceLabel);

let occurenceInput = document.createElement('input');
occurenceInput.setAttribute('type', 'number');
occurenceInput.setAttribute('id', "occurenceInput");
occurenceInput.setAttribute('name', "occurenceInput");
occurenceInput.setAttribute('value', '10');
inputForm.appendChild(occurenceInput);

let lineBreak3 = document.createElement('br');
inputForm.appendChild(lineBreak3);

let addEventButton = document.createElement('input');
addEventButton.setAttribute('type', 'button');
addEventButton.setAttribute('onclick', 'addEventToQueue()');
addEventButton.setAttribute('value', 'Compute');
inputForm.appendChild(addEventButton);

//Timed Event Class provides an easy structure for events to comply to when
//button is pressed. Receives values from nameInput, intervalInput, and occurenceInput
class TimedEvent {
    constructor(name, interval, occurences) {
        this.name = name;
        this.interval = interval;
        this.occurences = occurences;
        this.passedInterval = interval;
    }
}

//When button is clicked, this method makes an event and adds it to the
//array of events
function addEventToQueue() {
    let makeEvent = new TimedEvent(nameInput.value, intervalInput.value, occurenceInput.value);
    eventArray.push(makeEvent);

    //Lines 105 - 106 just used to verify button press is indeed working
    //incrementing list
    var output = document.getElementById("console");
    output.innerHTML += eventArray.length + "<br>";
}

//Update method goes through each event in the event array and checks it's progress
//if it is the correct time interval to fire event, it fires the event, resets
//the events timer til it fires again, and minuses one from the event's occurences
//When the event has no more occurences, it will remove it from the event array.
//When an event fires, it writes a message like: "Event: First (9 remaining)"
//and adds the message to the toRender array.
function update(progress) {
    if (eventArray.length > 0) {
        // for (let index in eventArray) {
        //     let event = eventArray[index];
        //     event.passedInterval -= progress;
        //     if (event.passedInterval <= 0) {
        //         event.occurences -= 1;
        //         event.passedInterval += event.interval;
        //         let message = "Event: " + event.name + "("
        //         + event.occurences + " remaining)";
        //         toRender.push(message);
        //         if (event.occurences = 0) {
        //             eventArray.splice(index,1);
        //         }
        //     }
        // }
    }
}

//This method takes messages from the event array and prints them out in the
//left hand window. Once it's done printing all the event fired messages,
//it clears the list in preparation for the new incoming events
function draw() {
    //  Draw the state of the world
    var output = document.getElementById("console");
    for (let spot in toRender) {
        output.innerHTML += toRender[spot] + "<br>";
    }
    toRender = [];                                                              // Clear the array
}

function gameLoop(timestamp) {
    let progress = timestamp - lastRender;
    // console.log(progress);
    update(progress);
    // // draw();
    lastRender = timestamp;
    // requestAnimationFrame(gameLoop(performance.now()));

    //Loop to control framerate to 60fps. May or may not work
    if (progress >= framerate) {
         requestAnimationFrame(gameLoop(performance.now()));
    } else {
        setTimeout(requestAnimationFrame(gameLoop(performance.now())), framerate - progress);
    }
}

let framerate = 1000/60;
let lastRender = 0;
var eventArray = [];
let toRender = []
//
// requestAnimationFrame(gameLoop(performance.now()));

//This is just a test function to make sure the buttom was working properly
function gimme() {
    // let makeEvent = {name:nameInput.value}
    let makeEvent = new TimedEvent(nameInput.value, intervalInput.value, occurenceInput.value);
    eventArray.push(makeEvent);
    var output = document.getElementById("console");
    // output.innerHTML += makeEvent.name + makeEvent.interval  + makeEvent.occurences + makeEvent.passedInterval + "<br>";
    output.innerHTML += eventArray.length + "<br>";


}
