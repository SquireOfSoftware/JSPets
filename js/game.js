/**
 * Created by JarvisWalker on 17/12/16.
 */

// I have been following this tutorial
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var petSprite, menuScreenIMG, mapScreenIMG, aboutScreenIMG;

petSprite = new Image();
petSprite.src = "sprites/duckling.png";

// this is the initial screen that is seen
petSprite.onload = function() {
    loopPet();
};

mapScreenIMG = new Image();
mapScreenIMG.src = "sprites/map-screens.png";

menuScreenIMG = new Image();
menuScreenIMG.src = "sprites/menu-screen.png";

aboutScreenIMG = new Image();
aboutScreenIMG.src = "sprites/about-screen.png";

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
    menu: 2,
    about: 14,
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

var pet = sprite({
    context: context,
    width: 16,
    height: 16,
    image: petSprite,
    togglePosition: {x: 0, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2
});


var petFrame = null;

function loopPet() {
    petFrame = requestAnimationFrame(loopPet);
    currentScreenState = screenState.pet;
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
    self.width = options.width;
    self.height = options.height;
    self.internalCounter = 0;
    self.frameLimit = options.frameLimit;

    self.render = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);

        var framePosition = self.width * self.internalCounter;
        console.log(self.image, self.width, self.height);

        self.context.drawImage(
            self.image,
            framePosition, // x position
            0,
            self.width - 1, // width on spritesheet
            self.height,// height on spritesheet
            0, // x position on canvas
            0,  // y position on canvas
            self.width - 1, // width on canvas
            self.height// height on canvas
        );
    };

    self.update = function() {
        self.internalCounter++;
        if (self.internalCounter >= self.frameLimit) {
            self.internalCounter = 0;
        }
    };

    self.reset = function() {
        self.internalCounter = 0;
    };

    self.clear = function() {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
    };

    self.image.onload = function() {
        if (self.frameLimit === undefined) {
            self.frameLimit = self.image.width / self.width;
        }
        console.log("number of frames", self.frameLimit);
    };

    return self;
}

var menuScreen = screen({
    image: menuScreenIMG,
    context: context,
    name: "menu",
    width: 45,
    height: 20
});

console.log("total screens", menuScreenIMG.width / 45);

menuScreen.previousFrame = function() {
    this.internalCounter--;
    if (this.internalCounter < 0){
        this.internalCounter = this.frameLimit - 1;
    }
};

var mapScreen = screen({
    image: mapScreenIMG,
    context: context,
    name: "map",
    // do you need screen sate?
    width: 45,
    height: 20,
    frameLimit: 5
});

var aboutScreen = screen({
    image: aboutScreenIMG,
    context: context,
    name: "about",
    width: 45,
    height: 20
});

function clearScreen() {
    console.log(context.canvas.width, context.canvas.height);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreenState = screenState.pet;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    cancelAnimationFrame(petFrame);
    console.log("current screen state: ",currentScreenState);
    switch(event.keyCode) {
        case 37: // left
            console.log("left");
            switch (currentScreenState) {
                case screenState.menu: // map screen
                    menuScreen.previousFrame();
                    menuScreen.render();
                    break;
                case screenState.map:
                    break;
                case screenState.pet: // walking screen
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        case 38: // up, cancel
            console.log("up");
            switch (currentScreenState) {
                case screenState.map: // map screen
                    currentScreenState = screenState.menu;
                    menuScreen.render();
                    break;
                case screenState.menu: // map screen
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
                case screenState.pet: // walking screen
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        case 39: // right
            console.log("right");
            switch (currentScreenState) {
                case screenState.menu: // map screen
                    menuScreen.update();
                    menuScreen.render();
                    break;
                case screenState.map: // map screen
                    break;
                case screenState.pet: // walking screen
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        case 40: // down - represents menu and item selection
            console.log("down");
            switch (currentScreenState) {
                case screenState.pet: // walking screen
                    currentScreenState = screenState.menu;
                    menuScreen.render();
                    console.log("Trying to render map screen");
                    break;
                case screenState.menu:
                    switch(menuScreen.internalCounter) {
                        case 0: // map screen
                            currentScreenState = screenState.map;
                            mapScreen.render();
                            break;
                        case 2: // about screen
                            currentScreenState = screenState.about;
                            aboutScreen.render();
                            break;
                        default:
                            break;
                    }
                    break;
                case screenState.map: // map screen
                    break;
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        default:
            return false;
    }

}

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/