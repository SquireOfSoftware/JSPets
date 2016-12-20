/**
 * Created by JarvisWalker on 17/12/16.
 */

// I have been following this tutorial
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var sprites = new Image();
sprites.src = "sprites/duckling.png";

// the sprite state
var spriteState = {
    idle: 0,
    attack: 1,
    hurt: 2,
    evolving: 3,
    devolving: 4
};

function sprite(options) {
    var self = {};
    var frameIndex = 0;
    var tickCount = 0;
    ticksPerFrame = options.ticksPerFrame || 0;
    numberOfFrames = options.numberOfFrames || 1;

    self.context = options.context;
    self.width = options.width;
    self.height = options.height;
    self.image = options.image;
    self.togglePosition = options.togglePosition;
    self.state = spriteState.idle;

    self.render = function() {
        self.context.clearRect(15, 0, self.width, self.height);
        switch (self.state) {
            case spriteState.idle: {
                self.context.drawImage(
                    self.image,
                    self.width * frameIndex, // x position
                    //self.height - self.height * frameIndex, // the next sprite is 16 pixels down
                    //self.height,
                    0,
                    self.width - 1, // width on spritesheet
                    self.height,// height on spritesheet
                    15, // x position on canvas
                    0,  // y position on canvas
                    self.width - 1, // width on canvas
                    self.height// height on canvas
                );
                break;
            }
            case spriteState.attack: {
                self.context.drawImage(
                    self.image,
                    self.width * 2, // x position
                    //self.height - self.height * frameIndex, // the next sprite is 16 pixels down
                    //self.height,
                    0,
                    self.width - 1, // width on spritesheet
                    self.height,// height on spritesheet
                    15, // x position on canvas
                    0,  // y position on canvas
                    self.width - 1, // width on canvas
                    self.height// height on canvas
                );
                break;
            }
        }
    };

    self.update = function() {
        tickCount++;

        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames - 1) {
                frameIndex++;
                console.log(frameIndex);
            }
            else {
                frameIndex = 0;
            }
        }
    };

    return self;
}

// animation relies on image loading

// same with the screens

var pet = sprite({
    context: context,
    width: 16,
    height: 16,
    image: sprites,
    togglePosition: {x: 0, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2
});

// this is the initial screen that is seen
sprites.onload = function() {
    loopPet();
};

var petFrame = null;

function loopPet() {
    petFrame = requestAnimationFrame(loopPet);
    pet.update();
    pet.render();
}

function screen(options) {
    var self = {};
    self.up = options.up;
    self.left = options.left;
    self.right = options.right;
    self.down = options.down;
    self.screenPos = options.screenPos;
    self.image = options.image;
    self.context = options.context;
    self.name = options.name;

    self.render = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);

        self.context.drawImage(self.image, 0, 0);
    };

    return self;
}

var mapIMG = new Image();
mapIMG.src = "sprites/map-screen.png";

var careIMG = new Image();
careIMG.src = "sprites/care-screen.png";

var mapScreen = screen({
    screenPos: {x: 3, y: 3},
    image: mapIMG,
    context: context,
    name: "map"
});

var careScreen = screen({
    screenPos: {x: 3, y: 3},
    image: careIMG,
    context: context,
    name: "care"
});


function clearScreen() {
    console.log(context.canvas.width, context.canvas.height);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreen = 0;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    //console.log(event.keyCode);
    cancelAnimationFrame(petFrame);
    switch(event.keyCode) {
        case 37: // left
            switch (currentScreen) {
                case 0: // walking screen
                    loopPet();
                case 1: // map screen
                    return;
            }
            break;
        case 38: // up
            //return self.up();
            pet.state = spriteState.attack;
            pet.render();
            break;
        case 39: // right
            //return self.right();
            pet.state = spriteState.idle;
            loopPet();
            break;
        case 40: // down
            //return self.down();
        default:
            return false;
    }
    console.log(updateScreen);
}

//console.log(pet);

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/