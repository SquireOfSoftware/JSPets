/**
 * Created by JarvisWalker on 17/12/16.
 */

// I have been following this tutorial
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var petSprite, catSprite, statusSprite, menuScreenIMG, mapScreenIMG, aboutScreenIMG;

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

catSprite = new Image();
catSprite.src = "sprites/cat.png";

statusSprite = new Image();
statusSprite.src = "sprites/status-sprites.png";

var WIDTHOFSCREEN = 45;
var HEIGHTOFSCREEN = 20;

// the sprite state
var spriteState = {
    idle: 0,
    attack: 1,
    hurt: 2,
    healing: 3,
    evolving: 4,
    devolving: 5,
    running: 6
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

var ARROWS = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
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
    self.canvasPosition = options.canvasPosition;
    self.state = spriteState.hurt;

    self.stats = options.stats;

    self.render = function() {
        self.context.clearRect(self.canvasPosition.x, self.canvasPosition.y, self.width, self.height);
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
                self.context.drawImage(statusSprite, 8, 0, 8, 8, self.context.canvas.width - 8, 0, 8, 8);
                break;
            }
            case spriteState.healing: {
                framePosition = self.width * 4;
                self.context.drawImage(statusSprite, 0, 0, 8, 8, self.context.canvas.width - 8, 0, 8, 8);
                break;
            }
            case spriteState.running: {
                framePosition = self.width * (5 + frameIndex);
                break;
            }
        }
        self.context.drawImage(
            self.image,
            framePosition, // x position
            0,
            self.width, // width on spritesheet
            self.height,// height on spritesheet
            self.canvasPosition.x, // x position on canvas
            self.canvasPosition.y,  // y position on canvas
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
    canvasPosition: {x: 15, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2,
    stats: {
        hp: 20,
        attack: 10,
        speed: 10
    }
});

var cat = sprite({
    context:context,
    width: 16,
    height: 16,
    image: catSprite,
    canvasPosition: {x: 15, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2,
    stats: {
        hp: 21,
        attack: 10,
        speed: 9
    }
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

function animationSequence(options) {
    var self = {};
    self.petSprite = options.petSprite;
    self.enemySprite = options.enemySprite;
    self.context = options.context;
    self.frameIndex = 0;
    self.tickCount = 0;
    self.ticksPerFrame = options.ticksPerFrame || 0;
    self.numberOfFrames = options.numberOfFrames || 1;

    if (options.update === undefined)
        self.update = function() {
            self.tickCount++;

            if (self.tickCount > self.ticksPerFrame) {
                tickCount = 0;
                if (self.frameIndex < self.numberOfFrames - 1) {
                    self.frameIndex++;
                    console.log("Animation sequence: ", self.frameIndex);
                }
            }
        };
    else
        self.update = options.update;

    console.log("update", self.update);

    if (options.render === undefined)
        self.render = function() {
            console.log("Please redefine this render method");
            if (self.frameIndex < 4) {

            }
            else {

            }
        };
    else
        self.render = options.render;


    console.log("render", self.render);

    self.reset = function() {
        frameIndex = 0;
        tickCount = 0;
    };

    return self;
}

var menuScreen = screen({
    image: menuScreenIMG,
    context: context,
    name: "menu",
    width: WIDTHOFSCREEN,
    height: HEIGHTOFSCREEN
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
    width: WIDTHOFSCREEN,
    height: HEIGHTOFSCREEN,
    frameLimit: 5
});

var aboutScreen = screen({
    image: aboutScreenIMG,
    context: context,
    name: "about",
    width: WIDTHOFSCREEN,
    height: HEIGHTOFSCREEN
});

var stepScreen = {
    image: stepScreenIMG,
    context: context,
    name: "step",
    width: WIDTHOFSCREEN,
    height: HEIGHTOFSCREEN,

    runningTotal: bigInt(499),
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

var battleMenuStates = {
    fight: 0,
    care: 1,
    evolve: 2,
    escape: 3
};

var battleMenuIMG = new Image();
battleMenuIMG.src = "sprites/battle-menu-screens.png";

// formulated from: (JP original) https://www.youtube.com/watch?v=VjtTnl4juPk
// https://www.youtube.com/watch?v=MTDRCDDrDfY
var battleScreen = {
    setEnemy: {},
    currentPet: {},
    context: context,
    menu: {
        context: this.context,
        image: battleMenuIMG,
        internalCounter: 0,
        width: WIDTHOFSCREEN,
        height: HEIGHTOFSCREEN,
        frameLimit: 4,
        currentScreen: battleMenuStates.fight,

        render: function() {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            var framePosition = this.width * this.internalCounter;

            this.context.drawImage(
                this.image,
                framePosition, // x position
                0,
                this.width, // width on spritesheet
                this.height,// height on spritesheet
                0, // x position on canvas
                0,  // y position on canvas
                this.width, // width on canvas
                this.height// height on canvas
            );
        },

        update: function() {
            this.internalCounter++;
            if (this.internalCounter >= this.frameLimit) {
                this.internalCounter = 0;
            }
        },

        processKeyDown: function(keyCode) {
            switch(keyCode) {
                case ARROWS.left:
                    this.internalCounter--;
                    if (this.internalCounter < 0)
                        this.internalCounter = this.frameLimit - 1;
                    this.render();
                    break;
                case ARROWS.up:
                    break;
                case ARROWS.right:
                    this.internalCounter++;
                    if (this.internalCounter > (this.frameLimit - 1))
                        this.internalCounter = 0;
                    this.render();
                    break;
                case ARROWS.down:
                    switch(this.internalCounter) {
                        case battleMenuStates.fight:
                            break;
                        case battleMenuStates.care:
                            break;
                        case battleMenuStates.escape:
                            currentScreenState = screenState.pet;
                            clearScreen();
                            loopPet();
                            break;
                        case battleMenuStates.evolve:
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
    }
};

var battleCircleIMG = new Image(); // must be transparent
battleCircleIMG.src = "sprites/battle-seq-circle.png";

var battleSequenceState = {
    showPet: 0,
    showEnemy: 1,
    showEnemyAttk: 2,
    showMenu: 3,
    showAttack: 4,
    takeDamageOnEnemy: 5,
    takeDamageOnPet: 6
};

var initialiseBattle = {
    frameIndex: 0,
    tickCount: 0,
    ticksPerFrame: 20, // default for sprites
    numberOfFrames: 22, // depends on how large the battle sequence is
    context: context,
    width: WIDTHOFSCREEN,
    height: HEIGHTOFSCREEN,
    shiftingIndex: -15,
    pet: pet,
    enemy: cat,
    state: battleSequenceState.pet,

    render: function() {
        if (this.frameIndex < 6) { // flash attack animation
            clearScreen();
            if (this.frameIndex % 2 === 1)
                this.pet.state = spriteState.attack;
            else
                this.pet.state = spriteState.idle;

            this.pet.render();
            if (this.frameIndex % 2 === 1)
                this.context.drawImage(battleCircleIMG, 0, 0);
        }
        else if (this.frameIndex < 10) { // flash enemy
            clearScreen();
            this.state = battleSequenceState.showEnemy;
            this.enemy.canvasPosition.x = this.shiftingIndex;
            this.enemy.state = spriteState.idle;
            this.enemy.render();
        }
        else if (this.frameIndex < 18) {
            this.state = battleSequenceState.showEnemyAttk;
            clearScreen();
            this.shiftingIndex = 0;
            this.enemy.canvasPosition.x = this.shiftingIndex;
            if (this.frameIndex % 2 === 1)
                this.enemy.state = spriteState.attack;
            else
                this.enemy.state = spriteState.idle;

            this.enemy.render();
        }
        else {
            this.state = battleSequenceState.showMenu;
            battleScreen.menu.render();
        }
    },

    update: function() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
                if (this.state === battleSequenceState.showEnemy) {
                    this.shiftingIndex += 4;
                    if (this.shiftingIndex > 0) {
                        this.shiftingIndex = -15;
                    }
                }
            }
        }
    },

    isAtEnd: function () {
        return this.frameIndex >= this.numberOfFrames;
    }
};

var battleSequence = animationSequence({
    petSprite: pet,
    enemySprite: cat,
    context: context,
    tickCount: 0,
    frameIndex: 0,
    ticksPerFrame: 20,
    numberOfFrames: 10,
    /*update: function() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            }
        }
    },*/
    render: function() {
        if (this.frameIndex < 4) {
            // display pet/enemy in attack sprite

            // four frames of attack power moving out
        }
        else if (this.frameIndex < 12) {
            // display enemy/pet in idle sprite

            // (4 frames for attack to arrive)

            // take damage/dodge (4 frames for damage, 2 frames for dodge)

        }
        else if (this.frameIndex < 14) {
            // display health (2 frames)

        }
        else {
            // figure out if either pet or enemy is dead
            // if not dead, display battle menu
            // otherwise display win/lose screen
        }
    }
});

var healingSequence = animationSequence({
    petSprite: pet,
    context: context,
    tickCount: 0,
    frameIndex: 0,
    ticksPerFrame: 20,
    numberOfFrames: 8,
    render: function() {
        console.log("frameIndex:", this.frameIndex);
        if (this.frameIndex < 6) {
            if (this.frameIndex % 2 === 1) {
                this.petSprite.state = spriteState.healing;
            }
            else
                this.petSprite.state = spriteState.hurt;
        }
        else
            this.petSprite.state = spriteState.idle;
        clearScreen();
        this.petSprite.render();

        //console.log(this.petSprite.state);
        //loopPet();
    }
});

function loopHealing() {
    if (pet.state !== spriteState.idle) {
        console.log("Attempting to heal");
        animationFrame = requestAnimationFrame(loopHealing);
        //healingSequence.update();
        healingSequence.render();
        healingSequence.update();
    }
    else
        cancelAnimationFrame(animationFrame);
}

function loopBattleInitialisation() {
    if (!initialiseBattle.isAtEnd()) {
        animationFrame = requestAnimationFrame(loopBattleInitialisation);
        initialiseBattle.render();
        initialiseBattle.update();
    }
}

function clearScreen() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

var currentScreenState = screenState.pet;

// need onkeydown for arrow keys left:37, up:38, right:39, down:40
function processKeyDown(event) {
    cancelAnimationFrame(animationFrame);
    //console.log("current screen state: ",currentScreenState);
    switch(event.keyCode) {
        case ARROWS.left: // left
            switch (currentScreenState) {
                case screenState.menu: // map screen
                    menuScreen.previousFrame();
                    menuScreen.render();
                    break;
                case screenState.map:
                    break;
                case screenState.step:
                    break;
                case screenState.battle:
                    battleScreen.menu.processKeyDown(ARROWS.left);
                    break;
                case screenState.pet: // walking screen
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        case ARROWS.up: // up, cancel
            switch (currentScreenState) {
                case screenState.step:
                    stepScreen.resetPreviousCount();
                case screenState.map: // map screen
                    currentScreenState = screenState.menu;
                    menuScreen.render();
                    break;
                case screenState.battle:
                    battleScreen.menu.processKeyDown(ARROWS.up);
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
        case ARROWS.right: // right
            switch (currentScreenState) {
                case screenState.menu: // map screen
                    menuScreen.update();
                    menuScreen.render();
                    break;
                case screenState.map: // map screen
                    break;
                case screenState.step:
                    break;
                case screenState.battle:
                    battleScreen.menu.processKeyDown(ARROWS.right);
                    break;
                case screenState.pet: // walking screen
                default:
                    menuScreen.reset();
                    clearScreen();
                    loopPet();
                    break;
            }
            break;
        case ARROWS.down: // down - represents menu and item selection
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
                                pet.state = spriteState.healing;
                                clearScreen();
                                loopHealing();
                            }
                            //healingSequence.reset();
                                /*
                                pet.render();
                                pet.state = spriteState.idle;
                            }*/
                                /*
                            menuScreen.reset();
                            clearScreen();
                            loopPet();*/
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
                case screenState.battle:
                    battleScreen.menu.processKeyDown(ARROWS.down);
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

function walk() {
    if (currentScreenState !== screenState.battle && pet.state === spriteState.idle) {
        stepScreen.update();
        document.getElementById("test").value = stepScreen.runningTotal.toString();
    }
    //console.log(stepScreen.isAtABattle() && currentScreenState !== screenState.battle);
    if (stepScreen.isAtABattle() && currentScreenState !== screenState.battle) { // player is at a battle, need to determine which battle
        currentScreenState = screenState.battle;
        cancelAnimationFrame(animationFrame);
        loopBattleInitialisation();
        //battleScreen.menu.render();
    }
    else if (currentScreenState === screenState.step)
        stepScreen.render();
}



// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/