/**
 * Created by JarvisWalker on 17/12/16.
 */

// I have been following this tutorial
// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var petSprite, catSprite, statusSprite,
    damageSprite, attackSprites, blackbar,
    menuScreenIMG, mapScreenIMG, aboutScreenIMG;

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

var alphabet = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

catSprite = new Image();
catSprite.src = "sprites/cat.png";

statusSprite = new Image();
statusSprite.src = "sprites/status-sprites.png";

attackSprites = new Image();
attackSprites.src = "sprites/attacks.png";

damageSprite = new Image();
damageSprite.src = "sprites/damage-sprite.png";

blackbar = new Image();
blackbar.src = "sprites/black-bar.png";

var battleMenuIMG = new Image();
battleMenuIMG.src = "sprites/battle-menu-screens.png";

var battleCircleIMG = new Image(); // must be transparent
battleCircleIMG.src = "sprites/battle-seq-circle.png";


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
    self.frameIndex = 0;
    self.tickCount = 0;
    self.ticksPerFrame = options.ticksPerFrame || 0;
    self.numberOfFrames = options.numberOfFrames || 1;

    self.context = options.context;
    self.width = options.width;
    self.height = options.height;
    self.image = options.image;
    self.canvasPosition = options.canvasPosition;
    self.state = spriteState.idle;

    self.stats = options.stats;

    if (options.render === undefined) {
        self.render = function () {
            //console.log(self.canvasPosition);
            self.context.clearRect(self.canvasPosition.x, self.canvasPosition.y, self.width, self.height);
            var framePosition = self.width;
            switch (self.state) {
                case spriteState.idle: {
                    framePosition = self.width * self.frameIndex; // alternating between first and second sprite
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
                    framePosition = self.width * (5 + self.frameIndex);
                    break;
                }
            }
            self.context.drawImage(
                self.image,
                framePosition, // x position on spritesheet
                0, // y position on spritesheet
                self.width, // width on spritesheet
                self.height,// height on spritesheet
                self.canvasPosition.x, // x position on canvas
                self.canvasPosition.y,  // y position on canvas
                self.width, // width on canvas
                self.height// height on canvas
            );
        };
    }
    else {
        self.render = options.render;
    }

    self.update = function() {
        self.tickCount++;

        if (self.tickCount > self.ticksPerFrame) {
            self.tickCount = 0;
            if (self.frameIndex < self.numberOfFrames - 1) {
                self.frameIndex++;
            }
            else {
                self.frameIndex = 0;
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
        originalHp: 20,
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
        originalHp: 21,
        hp: 1,
        attack: 10,
        speed: 9
    }
});

var animationFrame = null;

function loopPet() {
    animationFrame = requestAnimationFrame(loopPet);
    currentScreenState = screenState.pet;
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
    self.fasterSprite = options.fasterSprite;
    self.slowerSprite = options.slowerSprite;
    self.context = options.context;
    self.frameIndex = 0;
    self.tickCount = 0;
    self.ticksPerFrame = options.ticksPerFrame || 0;
    self.numberOfFrames = options.numberOfFrames || 1;

    if (options.update === undefined)
        self.update = function() {
            self.tickCount++;

            if (self.tickCount > self.ticksPerFrame) {
                self.tickCount = 0;
                if (self.frameIndex < self.numberOfFrames - 1) {
                    self.frameIndex++;
                }
            }
        };
    else
        self.update = options.update;

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
                alphabet[parseInt(this.runningTotal.toString().charAt(index))], // x position
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

var attackingStates = {
    attacking: 0,
    won: 1,
    lost: 2,
    notInBattle: 3
};

// formulated from: (JP original) https://www.youtube.com/watch?v=VjtTnl4juPk
// https://www.youtube.com/watch?v=MTDRCDDrDfY
var battleScreen = {
    setEnemy: {},
    currentPet: {},
    context: context,
    currentBattleState: attackingStates.notInBattle,
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
                            clearScreen();
                            console.log("Trying to fight");
                            battleScreen.currentBattleState = attackingStates.attacking;
                            if (pet.stats.speed > cat.stats.speed) {
                                battleSequence.fasterSprite = pet;
                                battleSequence.slowerSprite = cat;
                            }
                            else {
                                battleSequence.fasterSprite = cat;
                                battleSequence.slowerSprite = pet;
                            }
                            //battleSequence.slowerSprite;
                            loopAttackSequence();
                            break;
                        case battleMenuStates.care:
                            break;
                        case battleMenuStates.escape:
                            currentScreenState = screenState.pet;
                            pet.canvasPosition = {x: 15, y: 0};
                            pet.state = spriteState.idle;
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

function loopAttackSequence() {
    cancelAnimationFrame(animationFrame);
    if (currentScreenState === screenState.battle &&
        battleScreen.currentBattleState === attackingStates.attacking) {
        animationFrame = requestAnimationFrame(loopAttackSequence);
        battleSequence.render();
        battleSequence.update();
    }
}

var attackSpriteObj = sprite({
    context: context,
    width: 16,
    height: 16,
    image: attackSprites,
    canvasPosition: {x: 0, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 4,
    render: function () {
        //console.log("frameIndex:", this.frameIndex);
        this.context.clearRect(
            this.canvasPosition.x,
            this.canvasPosition.y,
            this.width + 5, // apparently this isnt clearing properly
            this.height);

        this.context.drawImage(
            this.image,
            this.frameIndex * this.width,
            0,
            this.width,
            this.height,
            this.canvasPosition.x,
            this.canvasPosition.y,
            this.width,
            this.height
        );
    }
});

var damageSpriteObj = sprite({
    context: context,
    width: 16,
    height: 16,
    image: damageSprite,
    canvasPosition: {x: 0, y: 0},
    ticksPerFrame: 20,
    numberOfFrames: 2
});

var battleSequence = animationSequence({
    fasterSprite: pet,
    slowerSprite: cat, // need to figure out how to display this
    context: context,
    tickCount: 0,
    frameIndex: 0,
    ticksPerFrame: 20,
    numberOfFrames: 40, // doubling the frames for the response
    render: function() {

        if (this.frameIndex < 4) {
            // display pet/enemy in attack sprite
            attackSpriteObj.frameIndex = Math.round(this.fasterSprite.stats.attack / 10, 0) - 1;

            attackSpriteObj.canvasPosition = {x: 15 - this.frameIndex * 5, y: 3};
            attackSpriteObj.render();

            this.fasterSprite.canvasPosition = {x: this.context.canvas.width - this.fasterSprite.width, y: 0};
            this.fasterSprite.state = spriteState.attack;
            this.fasterSprite.render();
            // four frames of attack power moving out
        }
        else if (this.frameIndex < 12) {
            // display enemy/pet in idle sprite
            //console.log("receiving the attack");
            // (4 frames for attack to arrive)
            attackSpriteObj.canvasPosition = {x: this.context.canvas.width - this.frameIndex * 5, y: 3};

            if (this.context.canvas.width - this.frameIndex * 5 > 16) {
                attackSpriteObj.render();
                this.slowerSprite.canvasPosition.x = 0;
                this.slowerSprite.state = spriteState.idle;

                this.slowerSprite.render();
            }
            else {
                this.context.clearRect(16, 0, 16 + 5, 16);
                damageSpriteObj.render();
                damageSpriteObj.update();
            }

            // take damage/dodge (4 frames for damage, 2 frames for dodge)

        }
        else if (this.frameIndex < 18) {
            // display health (2 frames)
            this.context.clearRect(0, 0, 16, 16);
            this.slowerSprite.canvasPosition.x = 15;
            this.slowerSprite.render();

            this.context.drawImage(blackbar, 0, 0);
            var hp = this.slowerSprite.stats.hp.toString();
            if (this.frameIndex > 14) {
                if ((this.slowerSprite.stats.hp - this.fasterSprite.stats.attack) > 0)
                    hp = (this.slowerSprite.stats.hp - this.fasterSprite.stats.attack).toString();
                else
                    hp = "0";
            }
            for(var index = 0; index < hp.length; index++) {
                console.log("index:", hp);
                this.context.drawImage(
                    stepScreenIMG,
                    alphabet[parseInt(hp.charAt(index))],
                    5, // y position on spritesheet
                    4, // width
                    5, // height
                    this.context.canvas.width + (-1 * hp.length + index - 3) * 4, // x position on canvas
                    this.context.canvas.height - 6, // y position on canvas
                    4, // width on canvas
                    5 // height on canvas
                );
            }
            // figure out how to display the remaining health
            // get the stats
        }
        else {
            // figure out if either pet or enemy is dead
            // if not dead, display battle menu
            // otherwise display win/lose screen
            battleScreen.currentBattleState = attackingStates.notInBattle;
            this.frameIndex = 0;

            if ((this.slowerSprite.stats.hp - this.fasterSprite.stats.attack) > 0) {
                this.slowerSprite.stats.hp -= this.fasterSprite.stats.attack;
                battleScreen.menu.render();
            }
            else if (this.fasterSprite.stats.hp > 0) {
                clearScreen();
                cancelAnimationFrame(animationFrame);
                currentScreenState = screenState.pet;
                pet.stats.hp = pet.stats.originalHp;
                pet.canvasPosition = {x: 15, y: 0};
                pet.state = spriteState.idle;
                loopPet();
            }


        }
    },
    attack: function(attackSprites, fasterSprite, slowerSprite) {
        if (this.frameIndex < 4) {
            // display pet/enemy in attack sprite
            attackSprites.frameIndex = Math.round(fasterSprite.stats.attack / 10, 0) - 1;

            attackSprites.canvasPosition = {x: 15 - this.frameIndex * 5, y: 3};
            attackSprites.render();

            fasterSprite.canvasPosition = {x: this.context.canvas.width - fasterSprite.width, y: 0};
            fasterSprite.state = spriteState.attack;
            fasterSprite.render();
            // four frames of attack power moving out
        }
        else if (this.frameIndex < 12) {
            // display enemy/pet in idle sprite
            //console.log("receiving the attack");
            // (4 frames for attack to arrive)
            attackSprites.canvasPosition = {x: this.context.canvas.width - this.frameIndex * 5, y: 3};

            if (this.context.canvas.width - this.frameIndex * 5 > 16) {
                attackSprites.render();
                slowerSprite.canvasPosition.x = 0;
                slowerSprite.state = spriteState.idle;

                slowerSprite.render();
            }
            else {
                this.context.clearRect(16, 0, 16 + 5, 16);
                damageSpriteObj.render();
                damageSpriteObj.update();
            }

            // take damage/dodge (4 frames for damage, 2 frames for dodge)

        }
        else if (this.frameIndex < 18) {
            // display health (2 frames)
            this.context.clearRect(0, 0, 16, 16);
            slowerSprite.canvasPosition.x = 15;
            slowerSprite.render();

            this.context.drawImage(blackbar, 0, 0);
            var hp = slowerSprite.stats.hp.toString();
            if (this.frameIndex > 14) {
                if ((slowerSprite.stats.hp - fasterSprite.stats.attack) > 0)
                    hp = (slowerSprite.stats.hp - fasterSprite.stats.attack).toString();
                else
                    hp = "0";
            }
            for(var index = 0; index < hp.length; index++) {
                console.log("index:", hp);
                this.context.drawImage(
                    stepScreenIMG,
                    alphabet[parseInt(hp.charAt(index))],
                    5, // y position on spritesheet
                    4, // width
                    5, // height
                    this.context.canvas.width + (index - 3 - hp.length) * 4, // x position on canvas
                    this.context.canvas.height - 6, // y position on canvas
                    4, // width on canvas
                    5 // height on canvas
                );
            }
            // figure out how to display the remaining health
            // get the stats
        }
        return (slowerSprite.stats.hp - fasterSprite.stats.attack) > 0;
    }
});

var healingSequence = animationSequence({
    fasterSprite: pet,
    context: context,
    tickCount: 0,
    frameIndex: 0,
    ticksPerFrame: 20,
    numberOfFrames: 8,
    render: function() {
        //console.log("frameIndex:", this.frameIndex);
        if (this.frameIndex < 6) {
            if (this.frameIndex % 2 === 1) {
                this.fasterSprite.state = spriteState.healing;
            }
            else
                this.fasterSprite.state = spriteState.hurt;

            this.fasterSprite.render();
            if (this.frameIndex % 2 === 0)
               this.context.clearRect(self.context.canvas.width - 8, 0, 8, 8);
        }
        else {
            this.fasterSprite.state = spriteState.idle;
            clearScreen();
            loopPet();
        }
    }
});

function loopHealing() {
    cancelAnimationFrame(animationFrame);
    if (pet.state !== spriteState.idle) {
        animationFrame = requestAnimationFrame(loopHealing);
        healingSequence.render();
        healingSequence.update();
    }
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
    if (currentScreenState !== screenState.battle) { // prevent interruptions during battle
        cancelAnimationFrame(animationFrame);
        //console.log("current screen state: ",currentScreenState);
    }
        switch (event.keyCode) {
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
                        switch (menuScreen.internalCounter) {
                            case 0: // map screen
                                currentScreenState = screenState.map;
                                mapScreen.render();
                                break;
                            case 1: // care screen
                                if (pet.state === spriteState.hurt) {
                                    healingSequence.reset();
                                    pet.state = spriteState.healing;
                                    clearScreen();
                                    loopHealing();
                                    menuScreen.reset();
                                }
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