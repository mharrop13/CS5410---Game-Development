document.title = "CS5410 HW1 - Browser GameLoop";

let lastRender = 0;
var eventArray = [];
let toRender = []

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
function processInput() {
    let makeEvent = new TimedEvent(nameInput.value, intervalInput.value, occurenceInput.value);
    eventArray.push(makeEvent);
}

//Update method goes through each event in the event array and checks it's progress
//if it is the correct time interval to fire event, it fires the event, resets
//the events timer til it fires again, and minuses one from the event's occurences
//When the event has no more occurences, it will remove it from the event array.
//When an event fires, it writes a message like: "Event: First (9 remaining)"
//and adds the message to the toRender array.
function update(timestamp) {
    let progress = timestamp - lastRender;
    if (eventArray.length > 0) {
        for (let index in eventArray) {
            let event = eventArray[index];
            event.passedInterval -= progress;
            if (event.passedInterval <= 0 && event.occurences > 0) {
                event.occurences -= 1;
                event.passedInterval = event.interval;
                let message = "Event: " + event.name + "("
                + event.occurences + " remaining)";
                toRender.push(message);
            }

            if (event.occurences <= 0) {
                delete event;
            }
        }
    }
    lastRender = timestamp;
}

//This method takes messages from the event array and prints them out in the
//left hand window. Once it's done printing all the event fired messages,
//it clears the list in preparation for the new incoming events
function draw() {
    //  Draw the state of the world
    var output = document.getElementById("console");
    for (let spot in toRender) {
        output.innerHTML += toRender[spot] + "<br>";
        output.scrollTop = output.scrollHeight;
    }
    toRender = [];
}

function gameLoop(timestamp) {
    update(timestamp);
    draw();
    requestAnimationFrame(gameLoop);
}
