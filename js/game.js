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

    self.render = function() {
        self.context.clearRect(15, 0, self.width, self.height);
        self.context.drawImage(
            self.image,
            self.width, // x position
            self.height - self.height * frameIndex, // the next sprite is 16 pixels down
            self.width -1, // width on spritesheet
            self.height -1,// height on spritesheet
            15,
            0,
            self.width -1, // width on canvas
            self.height -1// height on canvas
        )
    };

    self.update = function() {
        tickCount++;

        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames - 1)
                frameIndex++;
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
    togglePosition: {x: 15, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2
});

sprites.onload = function() {
    loopPet();
};

var animationFrame = null;

function loopPet() {
    animationFrame = requestAnimationFrame(loopPet);
    pet.update();
    pet.render();
}

function screen(options) {
    var self = {};
    self.home = options.home;
    self.left = options.left;
    self.right = options.right;
    self.screenPos = options.screenPos;
    self.image = options.image;
    self.context = options.context;

    self.processKeyDown = function(event) {
        switch(event.keyCode) {
            case 37: // left
                self.left();
                self.render();
                break;
            case 38: // up
                //self.home.update();
                self.render();
                break;
            case 39: // right
                self.right();
                self.render();
                break;
            case 40: // down
                self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
                console.log(self.context);
                loopPet();
                break;
            default:
                console.log("TEST");
        }
    };

    self.render = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
        self.context.drawImage(self.image, 0, 0);
    };

    self.image.onload = function(){
        console.log("LOADED MAP");
        console.log(this);
    };

    return self;
}

var mapIMG = new Image();
mapIMG.src = "sprites/map-screen.png";

var mapScreen = screen({
    home: this,
    left: function(){console.log("Hello")},
    right: function(){console.log("World")},
    screenPos: {x: 3, y: 3},
    image: mapIMG,
    context: context
});

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    //console.log(event.keyCode);
    cancelAnimationFrame(animationFrame);
    //context.clearRect(0, 0, self.context.width, self.context.height);
    //mapScreen.render();
    mapScreen.processKeyDown(event);

}

//console.log(pet);

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/