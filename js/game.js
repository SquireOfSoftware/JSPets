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

var screenState = {
    map: 0,
    care: 1,
    pet: 15
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
        var framePosition = self.width;
        switch (self.state) {
            case spriteState.idle: {
                framePosition = self.width * frameIndex; // alternating between first and second sprite
                break;
            }
            case spriteState.attack: {
                framePosition = self.width * 2; // 3rd sprite
                break;
            }
            case spriteState.hurt: {
                framePosition = self.width * 3; // 4th sprite
                break;
            }
        }
        self.context.drawImage(
            self.image,
            framePosition, // x position
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
    pet.state = spriteState.idle;
    pet.update();
    pet.render();
}

function screen(options) {
    var self = {};
    self.screenPos = options.screenPos;
    self.image = options.image;
    self.context = options.context;
    self.name = options.name;
    self.state = options.state;
    self.width = options.weight;

    self.render = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);

        self.context.drawImage(self.image, self.width * self.state, 0);
    };

    self.clear = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
    };

    return self;
}
/*
var mapIMG = new Image();
mapIMG.src = "sprites/map-screen.png";

var careIMG = new Image();
careIMG.src = "sprites/care-screen.png";*/

var currentScreenSprite = new Image();
currentScreenSprite.src = "sprites/screens.png";
/*
var mapScreen = screen({
    screenPos: {x: 3, y: 3},
    state: screenState.map,
    image: mapIMG,
    context: context,
    name: "map"
});*/

function clearScreen() {
    console.log(context.canvas.width, context.canvas.height);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreenState = screenState.pet;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    //console.log(event.keyCode);
    cancelAnimationFrame(petFrame);
    switch(event.keyCode) {
        case 37: // left
            pet.state = spriteState.attack;
            pet.render();
            break;
        case 38: // up
            switch (currentScreenState.state) {
                case screenState.pet: // walking screen
                    loopPet();
                    break;
                case screenState.map: // map screen
            }
            break;
        case 39: // right
            loopPet();
            break;
        case 40: // down
            pet.state = spriteState.hurt;
            pet.render();
            break;
        default:
            return false;
    }
    console.log(currentScreenState);
}

//console.log(pet);

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/