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
    help: 4,
    battle: 5,
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
    //pet.state = spriteState.hurt;
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

    runningTotal: bigInt(0),
    previousCount: "0",

    meats: bigInt(0),
    alphabet: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36],

    update: function() {
        if(this.runningTotal.add(1).toString().length < 34) {
            this.runningTotal = this.runningTotal.add(1);
            if (this.runningTotal.mod(10) === 0) {
                this.meats = this.meats.add(1);
            }
        }
        else {
            console.log("Number is too big for the screen, no of digits are: ", this.runningTotal.toString().length);
        }

    },

    render: function() { // only update when walking, problem is: "how fast is a walk?"
        // we have 45 by 20 pixels
        // 45 / 4 px wide char ~ 11 digits - with 1 px spaces in 4px
        // 20 / 6 px high char ~ 3 digits - with 1 px spaces in 5px
        // can fit approximate 33 digits, height will look a little funny
        if(this.previousCount === "0")
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // every 11 digits, bring up to new line
        var column = 10;
        var row = 2;
        var previousCountIndex = this.previousCount.length - 1;
        // change running total into string
        for(var index = this.runningTotal.toString().length - 1; index > -1 && row > -1; index--){
            // assumes runningTotal is always larger than previousCount
            // goal of this code is to just clear what needs to be cleared, if its a large number
            // only the bits that get updated are redrawn
            if (previousCountIndex > -1  &&
                this.runningTotal.toString().charAt(index) !== this.previousCount.charAt(previousCountIndex)) {
                this.context.clearRect(column * 4, row * 6, 4, 5);
                // clear a single character
                previousCountIndex--;
            }
            // write a single character
            context.drawImage(
                this.image,
                this.alphabet[parseInt(this.runningTotal.toString().charAt(index))], // x position
                0,
                4, // width on spritesheet
                5,// height on spritesheet
                column * 4, // x position on canvas
                row * 6,  // y position on canvas
                4, // width on canvas
                5// height on canvas
            );
            previousCountIndex--;
            column--;
            if (column === -1) {
                column = 10;
                row--;
            }
        }
        this.previousCount = this.runningTotal.toString();
    },

    resetPreviousCount: function () {
        this.previousCount = "0";
    },

    isAtABattle: function() {
        return this.runningTotal.mod(500).equals(0);
    }
};

function clearScreen() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreenState = screenState.pet;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    cancelAnimationFrame(animationFrame);
    //console.log("current screen state: ",currentScreenState);
    switch(event.keyCode) {
        case 37: // left
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
            switch (currentScreenState) {
                case screenState.step:
                    stepScreen.resetPreviousCount();
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
            switch (currentScreenState) {
                case screenState.pet: // walking screen
                    currentScreenState = screenState.menu;
                    menuScreen.render();
                    break;
                case screenState.menu:
                    switch(menuScreen.internalCounter) {
                        case 0: // map screen
                            currentScreenState = screenState.map;
                            mapScreen.render();
                            break;
                        case 1: // care screen
                            if (pet.state === spriteState.hurt) {
                                pet.state = spriteState.idle;
                                clearScreen();
                                pet.render();
                            }
                            menuScreen.reset();
                            clearScreen();
                            loopPet();
                            break;
                        case 2: // about screen
                            currentScreenState = screenState.about;
                            aboutScreen.render();
                            break;
                        case 3: // steps screen
                            currentScreenState = screenState.step;
                            stepScreen.render();
                            break;
                        default:
                            break;
                    }
                    break;
                case screenState.map: // map screen
                    break;
                case screenState.step:
                    break;
                /*case screenState.care:
                    if (pet.state === spriteState.hurt) {
                        pet.state = spriteState.idle;
                        pet.render();
                    }
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;*/
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

function walk() {
    stepScreen.update();
    document.getElementById("test").value = stepScreen.runningTotal.toString();
    if (stepScreen.isAtABattle()) { // player is at a battle, need to determine which battle
        currentScreenState = screenState.battle;
    }
    else if (currentScreenState === screenState.step)
        stepScreen.render();
}

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/