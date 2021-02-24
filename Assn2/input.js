// let input = (function() {
//     'use strict';

//     function Keyboard() {
//         let that = {
//                 keys : {},
//                 handlers : {}
//             };
//         let fired = false;
        
//         function keyPress(e) {
//             if (fired === false) {
//                 fired = true;
//                 that.keys[e.key] = e.timeStamp;
//             }
            
//         }
        
//         function keyRelease(e) {
//             fired = false;
//             delete that.keys[e.key];
//         }

//         that.registerCommand = function(key, handler) {
//             that.handlers[key] = handler;
//         };


//         that.update = function(elapsedTime) {
//             for (let key in that.keys) {
//                 if (that.keys.hasOwnProperty(key)) {
//                     if (that.handlers[key]) {
//                         that.handlers[key](elapsedTime);
//                     }
//                 }
//             }
//         };

//         //
//         // These are used to keep track of which keys are currently pressed
//         window.addEventListener('keydown', keyPress);
//         window.addEventListener('keyup', keyRelease);
        
//         return that;
//     }

//     return {
//         Keyboard : Keyboard
//     };
// }());

// function registerInput(inputDevice, gameItem) {
//     //WASD
//     inputDevice.registerCommand('a', gameItem.doLog("A"));
//     inputDevice.registerCommand('w', gameItem.moveUp);
//     inputDevice.registerCommand('d', gameItem.moveRight);
//     inputDevice.registerCommand('s', gameItem.moveDown);

//     // inputDevice.keyBind('j', gameItem.moveLeft);
//     // inputDevice.keyBind('i', gameItem.moveUp);
//     // inputDevice.keyBind('l', gameItem.moveRight);
//     // inputDevice.keyBind('k', gameItem.moveDown);
    
// }




