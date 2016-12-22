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

stepScreenIMG = new Image();
stepScreenIMG.src = "sprites/step-alphabet.png";

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
    step: 3,
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
            0,
            self.width, // width on spritesheet
            self.height,// height on spritesheet
            15, // x position on canvas
            0,  // y position on canvas
            self.width, // width on canvas
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

var animationFrame = null;

function loopPet() {
    animationFrame = requestAnimationFrame(loopPet);
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
            self.width, // width on spritesheet
            self.height,// height on spritesheet
            0, // x position on canvas
            0,  // y position on canvas
            self.width, // width on canvas
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

//console.log("total screens", menuScreenIMG.width / 45);

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

var stepScreen = {
    image: stepScreenIMG,
    context: context,
    name: "step",
    width: 45,
    height: 20,

    frameIndex: 0,

    runningTotal: 0, // should start at 0
    previousTotal: 0,
    meats: 0,
    alphabet: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36],

    update: function() {
        this.runningTotal++;
        console.log(this.runningTotal);
        if (this.runningTotal % 100) {
            this.meats++;
        }
    },

    render: function() { // only update when walking, problem is: "how fast is a walk?"
        // we have 45 by 20 pixels
        // 45 / 4 px wide char ~ 11 digits - with spaces in 4px
        // 20 / 5 px high char ~ 4 digits - with no spaces in 5px
        // can fit approximate 44 digits, height will look a little funny
        console.log("trying to render steps page");
        //console.log(this.alphabet, this.image);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        //this.context.drawImage(this.image, 0, 0, 4, 5, 0, 0, 4, 5);
        // every 11 digits, bring up to new line
        var column = 10;
        var row = 3;
        // change running total into string
        for(var index = this.runningTotal.toString().length - 1; index > -1 && row > -1; index--){
            console.log(index, column, row * 4);
            context.drawImage(
                this.image,
                this.alphabet[parseInt(this.runningTotal.toString().charAt(index))], // x position
                0,
                4, // width on spritesheet
                5,// height on spritesheet
                column * 4, // x position on canvas
                row * 5,  // y position on canvas
                //40, 15,
                4, // width on canvas
                5// height on canvas
            );
            column--;
            if (column === -1) {
                column = 10;
                row--;
            }
        }
    }
};

function loopStep() {
    animationFrame = requestAnimationFrame(loopStep);
    currentScreenState = screenState.step;
    stepScreen.render();
}

function clearScreen() {
    console.log(context.canvas.width, context.canvas.height);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreenState = screenState.pet;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    cancelAnimationFrame(animationFrame);
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
                case screenState.step:
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
                case screenState.step:
                case screenState.map: // map screen
                    currentScreenState = screenState.menu;
                    menuScreen.render();
                    break;

                case screenState.menu: // map screen
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
                case screenState.step:
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
                        case 3: // steps screen
                            currentScreenState = screenState.step;
                            stepScreen.render();
                            //loopStep();
                            break;
                        default:
                            break;
                    }
                    break;
                case screenState.map: // map screen
                    break;
                case screenState.step:
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
/*
var steps = {
    runningTotal: 0, // should start at 0
    meats: 0,

    update: function() {
        this.runningTotal++;
        console.log(this.runningTotal);
        if(this.runningTotal % 100) {
            this.meats++;
        }
    }
};*/

function walk() {
    //cancelAnimationFrame(animationFrame);
    //if (currentScreenState === screenState.pet ||
    //    currentScreenState === screenState.step) {
        //steps.runningTotal++;
        stepScreen.update();
        document.getElementById("test").value = stepScreen.runningTotal;
        if (currentScreenState === screenState.step)
            stepScreen.render();
        //loopStep();
    //}
}

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/