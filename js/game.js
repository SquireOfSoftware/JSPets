/**
 * Created by JarvisWalker on 17/12/16.
 */

// I have been following this tutorial
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "sprites/spritesheet.png";

function sprite(options) {
    var spriteObj = {};
    var frameIndex = 0;
    var tickCount = 0;
    ticksPerFrame = options.ticksPerFrame || 0;
    numberOfFrames = options.numberOfFrames || 1;

    spriteObj.context = options.context;
    spriteObj.width = options.width;
    spriteObj.height = options.height;
    spriteObj.image = options.image;
    spriteObj.togglePosition = options.togglePosition;
    //spriteObj.loop = options.loop;

    spriteObj.render = function() {
        spriteObj.context.clearRect(15, 0, spriteObj.width, spriteObj.height);
        spriteObj.context.drawImage(
            spriteObj.image,
            spriteObj.width, // x position
            //spriteObj.width / numberOfFrames,
            //frameIndex * spriteObj.width / numberOfFrames,
            //spriteObj.height,// y position
            //spriteObj.height / numberOfFrames,
            spriteObj.height - spriteObj.height * frameIndex,
            spriteObj.width -1, // width on spritesheet
            spriteObj.height -1,// height on spritesheet
            15,
            0,
            spriteObj.width -1, // width on canvas
            spriteObj.height -1// height on canvas
        )
    };

    spriteObj.update = function() {
        tickCount++;

        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames - 1)
                frameIndex++;
            else{ //if (spriteObj.loop) {
                frameIndex = 0;
            }
        }
    };

    return spriteObj;
}

var pet = sprite({
    context: context,
    width: 16,
    height: 16,
    image: sprites,
    togglePosition: {x: 15, y: 0},
    //loop: loopPet,
    ticksPerFrame: 20,
    numberOfFrames: 2
});

sprites.onload = function() {
    loopPet(pet);
};

function loopPet() {
    requestAnimationFrame(loopPet);
    pet.update();
    pet.render();
}

console.log(pet);

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/