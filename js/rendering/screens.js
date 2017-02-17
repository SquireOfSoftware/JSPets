/**
 * Created by JarvisWalker on 13/2/17.
 */

function ScreenPosition(options) {
    var firstScreenX = options.firstScreenX;
    var firstScreenY = options.firstScreenY;
    this.currentPosition = {
        x: firstScreenX,
        y: firstScreenY
    };
    if (options.canvasX !== undefined)
        this.canvasX = options.canvasX;
    else
        this.canvasX = 0;

    if (options.canvasY !== undefined)
        this.canvasY = options.canvasY;
    else
        this.canvasY = 0;

    var multiplier;
    if (options.multiplier !== undefined)
        multiplier = options.multiplier;
    else
        multiplier = DEFAULT_SCREEN_SIZE.X;
}

function ScreenSprite(options) {
    this.name = options.name;
    this.image = options.image;
    if(options.context !== undefined)
        this.context = options.context;
    else
        this.context = drawingBoard;

    this.referenceState = options.referenceState;

    var size;
    if (options.size !== undefined)
        size = options.size;
    else
        size = {width: DEFAULT_SCREEN_SIZE.X, height: DEFAULT_SCREEN_SIZE.Y};

    if (options.update !== undefined)
        this.update = options.update;
    else
        this.update = function() {};

    if (options.screenPosition !== undefined)
        this.screenPosition = options.screenPosition;
    else
        this.screenPosition = new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 0,
            canvasX: 0,
            canvasY: 0
        }); // this is just a dummy frame

    if (options.draw !== undefined)
        this.draw = options.draw;
    else {
        this.draw = function () {
            // Need to figure out xy coordinates
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                size.width,
                size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                size.width,
                size.height
            );
        };
    }
}

var blackBar = new ScreenSprite({
    name: "BLACK_BAR",
    image: generateImage("sprites/black-bar.png"),
    context: drawingBoard,
    screenPosition: new ScreenPosition({
        firstScreenX: 0,
        firstScreenY: 20 - 7,
        maxScreens: 0,
        canvasX: 0,
        canvasY: 20 - 7
    }),
    size: {
        width: 45,
        height: 7
    },
    update: function() {

    }
});

var petScreen = new ScreenSprite({
    name: "PET_SCREEN",
    image: null,
    context: null,
    referenceState: SCREEN_STATES.PETS,
    update: function() {
        // check whether a button has been pressed
        // handle button press accordingly
        game.stepCounter.updateWalkingFrame();
        petSprite.update();

    },
    draw: function() {
        petSprite.draw();
    }
});

var menuScreen = [
    new ScreenSprite({
        name: "MAP_MENU",
        image: generateImage("sprites/screens/map-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.MAP,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "CARE_MENU",
        image: generateImage("sprites/screens/care-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.CARE,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "STATS_MENU",
        image: generateImage("sprites/screens/stats-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.STATS,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "STEPS_MENU",
        image: generateImage("sprites/screens/steps-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.STEPS,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    })
];

var totalStepsScreen = new ScreenSprite({
    name: "STEPS_SCREEN",
    image: generateImage("sprites/step-alphabet.png"),
    context: drawingBoard,
    referenceState: SCREEN_STATES.STEPS.substates.TOTAL_STEPS,
    update: function() {
        game.stepCounter.updateWalkingFrame();
        this.totalSteps = game.stepCounter.total.toString();
    },
    draw: function() {
        var digitPositionCounter = {
            column: 10,
            row: 2
        };
        if (this.previousStepsCounted === undefined)
            this.previousStepsCounted = "0";

        for(var index = this.totalSteps.length - 1; index > -1; index --) {
            if (this.newScreen || this.newScreen === undefined) {
                this.context.drawImage(
                    this.image,
                    NUMBER_POSITIONS[parseInt(this.totalSteps.charAt(index))], // x position
                    0,
                    NUMBER_PX_SIZE.WIDTH, // width on spritesheet
                    NUMBER_PX_SIZE.HEIGHT, // height on spritesheet
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH, // width on canvas
                    NUMBER_PX_SIZE.HEIGHT // height on canvas
                );
            }
            else if (this.previousStepsCounted.charAt(index) !== this.totalSteps.charAt(index)) {
                this.context.clearSection(
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH,
                    NUMBER_PX_SIZE.HEIGHT);
                this.context.drawImage(
                    this.image,
                    NUMBER_POSITIONS[parseInt(this.totalSteps.charAt(index))], // x position
                    0,
                    NUMBER_PX_SIZE.WIDTH, // width on spritesheet
                    NUMBER_PX_SIZE.HEIGHT, // height on spritesheet
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH, // width on canvas
                    NUMBER_PX_SIZE.HEIGHT // height on canvas
                );
            }
            digitPositionCounter.column--;
            if (digitPositionCounter.column === -1) {
                digitPositionCounter.column = 10;
                digitPositionCounter.row--;
                // will still draw I believe even off screen
            }
        }
        this.newScreen = false;
        this.previousStepsCounted = this.totalSteps;
    }
});

var cryingOutSprite = new ScreenSprite({
    name: "CRYING_OUT_SPRITE",
    image: generateImage("sprites/battle-seq-circle.png"),
    context: drawingBoard,
    update: function() {
        if(this.tick === undefined || this.tick < 0)
            this.tick = 6;
        this.tick--;
    },
    draw: function() {
        if (this.tick % 2 === 0)
            this.context.drawImage(
                this.image,
                0,
                0,
                45,
                20,
                0,
                0,
                45,
                20
            );
    }
});

var battleScreens = {
    CRY: new ScreenSprite({
        name: "CRY_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.CRY,
        update: function() {
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = -1;//6; // -1; // TEST
            this.tick--;
            petSprite.update();
            cryingOutSprite.update();
            if (this.tick < 0){
                petSprite.currentPosition.reset();
                currentScreen = battleScreens.SLIDE;
                currentScreen.update();
                this.context.flipHorizontally();
                /* For testing purposes*/
/*
                 currentScreen = battleMenuScreen.FIGHT;
                 game.currentScreenState = fightBattleState;
                 toggleKeyPress();*/
            }
        },
        draw: function() {
            this.context.clearEntireScreen();
            petSprite.draw();
            cryingOutSprite.draw();
        }
    }),
    SLIDE: new ScreenSprite({
        name: "SLIDE_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.SLIDE,
        update: function() {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 3;
                this.context.clearEntireScreen(); // for some odd reason the screen isnt cleared properly
            }
            this.tick--;
            if (this.enemySprite === undefined ||
                this.enemySprite.referenceObject !== game.currentEnemy) {
                if (game.currentEnemy.type === ANIMAL_TYPES.CAT) {
                    this.enemySprite = catSprite;
                }
            }
            this.enemySprite.update();

            if (this.tick < 0){
                this.enemySprite.currentPosition.reset();
                currentScreen = battleScreens.GROWL;
                currentScreen.update();

            }
        },
        draw: function() {
            this.enemySprite.draw();
        }
    }),
    GROWL: new ScreenSprite({
        name: "GROWL_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.GROWL,
        update: function() {
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = 6;
            this.tick--;

            if (this.enemySprite === undefined ||
                this.enemySprite.referenceObject !== game.currentEnemy) {
                if (game.currentEnemy.type === ANIMAL_TYPES.CAT) {
                    this.enemySprite = catSprite;
                }
            }
            this.enemySprite.update();
			
            if (this.tick < 0){
                this.enemySprite.currentPosition.reset();
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                this.context.restore();
                enableKeyPress();
            }
        },
        draw: function() {
            this.enemySprite.draw();
        }
    })
};

var battleMenuScreen = {
    FIGHT: new ScreenSprite({
        name: "FIGHT",
        image: generateImage("sprites/screens/fight-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.FIGHT
    }),
    POWER_UP: new ScreenSprite({
        name: "POWER_UP",
        image: generateImage("sprites/screens/power-up-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP
    }),
    AUTO: new ScreenSprite({
        name: "AUTO",
        image: generateImage("sprites/screens/auto-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.AUTO
    }),
    RUN: new ScreenSprite({
        name: "RUN",
        image: generateImage("sprites/screens/run-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.RUN
    })
};

var petSpriteStates = {
    faster: undefined,
    slower: undefined,
    hasDeath: false
};

var attackSequenceScreen = {
    LAUNCHING_ATTACK: new ScreenSprite({
        name: "LAUNCHING_ATTACK",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.ATTACK_SEQUENCE.substates.LAUNCHING_ATTACK,
        update: function() {
            if(this.rounds === undefined || this.rounds > 1) {
                this.rounds = 0; // use rounds to repeat
            }

            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 3;
                disableKeyPress();

                if (this.rounds === 0 ) {
                    if (game.currentEnemy.stats.spd > game.pet.stats.spd) {
                        if (game.currentEnemy.type === ANIMAL_TYPES.CAT) {
                            petSpriteStates.faster = catSprite;
                        }
                        this.context.flipHorizontally();
                        foregroundBoard.flipHorizontally();

                        petSpriteStates.slower = petSprite;
                    }
                    else {
                        petSpriteStates.faster = petSprite;
                        petSpriteStates.slower = catSprite;
                    }
                }
                else {
                    var tempSprite = petSpriteStates.faster;

                    petSpriteStates.faster = petSpriteStates.slower;
                    petSpriteStates.slower = tempSprite;
                }

                fireball.currentPosition = fireball.positions.launchingPosition;

                console.log("LAUNCHING ATTACK");
            }
            this.tick--;
            // need fireball

            petSpriteStates.faster.currentPosition = petSpriteStates.faster.attackingPosition;
            fireball.update();

            // need enemySprite to hold a position in one shot
            if (this.tick < 0){
                currentScreen = attackSequenceScreen.ATTACK;
                //currentScreen = attackSequenceScreen.CALCULATING_DAMAGE; // TEST
                currentScreen.update();
                this.rounds++;
            }

        },
        draw: function() {
            petSpriteStates.faster.draw();
            fireball.draw();
        }
    }),
    ATTACK: new ScreenSprite({
        name: "ATTACK",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.ATTACK_SEQUENCE.substates.ATTACK,
        update: function() {
            if(this.rounds === undefined || this.rounds > 1) {
                this.rounds = 0; // use rounds to repeat

            }

            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 4;
                console.log("ATTACKING");
                this.context.clearEntireScreen();
                addLine("ATTACKING");
                enableKeyPress();
                // figure out which bit to flip, using this.rounds variable to flip the fireball

            }
            this.tick--;
            // need fireball
            fireball.update();

            // need enemySprite to hold a position in one shot
            if (this.tick < 0){
                // need to calculate dodge value, based on speed
                disableKeyPress();
                currentScreen = attackSequenceScreen.RECEIVING_DAMAGE;
                currentScreen.update();
                this.context.clearEntireScreen();
                foregroundBoard.clearEntireScreen();
                this.rounds++; // for the second round
            }
        },
        draw: function() {
            fireball.draw();
        }
    }),
    RECEIVING_DAMAGE: new ScreenSprite({
        name: "RECEIVING_DAMAGE",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.ATTACK_SEQUENCE.substates.RECEIVING_DAMAGE,
        update: function() {
            if(this.rounds === undefined || this.rounds > 1) {
                this.rounds = 0; // use rounds to repeat
            }

            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 4;

                this.context.clearEntireScreen();
                console.log("RECEIVING");

                if (petSpriteStates.faster.referenceObject.isPet) {
                    // flip the canvas
                    this.context.flipHorizontally();
                    addLine("Flipping the canvas");
                }
                else {
                    addLine("Restoring the canvas");
                    this.context.restore();
                }

                petSpriteStates.slower.currentPosition = petSpriteStates.slower.receivingPosition;
            }
            this.tick--;

            // need fireball
            fireball.update();

            // need enemySprite to hold a position in one shot
            if (this.tick < 0){
                // need to calculate dodge value, based on speed
                currentScreen = attackSequenceScreen.GETTING_HIT;
                currentScreen.update();
                this.rounds++;
            }
        },
        draw: function() {
            fireball.draw();
            petSpriteStates.slower.draw();
        }
    }),
    GETTING_HIT: new ScreenSprite({
        name: "GETTING_HIT",
        image: null,
        context: drawingBoard,
        referenceSTate: SCREEN_STATES.ATTACK_SEQUENCE.substates.GETTING_HIT,
        update: function() {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                foregroundBoard.clearEntireScreen();
                this.context.clearEntireScreen();
                console.log("GETTING HIT");
            }

            this.tick--;

            damageSprite.update();

            if (this.tick < 0){
                // need to calculate dodge value, based on speed
                currentScreen = attackSequenceScreen.CALCULATING_DAMAGE;
                currentScreen.update();
                this.context.clearEntireScreen();
                foregroundBoard.restore();
                foregroundBoard.clearEntireScreen();
                this.rounds++;
            }
        },
        draw: function() {
            damageSprite.draw();
        }
    }),
    DODGING: new ScreenSprite({

    }),
    CALCULATING_DAMAGE: new ScreenSprite({
        name: "CALCULATING_DAMAGE",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.ATTACK_SEQUENCE.substates.CALCULATING_DAMAGE,
        update: function() {
            if(this.rounds === undefined || this.rounds > 1) {
                this.rounds = 0; // use rounds to repeat
            }

            // this state is to be entered upon if the pet has received damage and has not dodged it
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                console.log("CALCULATING");
                petSpriteStates.slower.currentPosition = petSpriteStates.slower.idlePosition;
                petSpriteStates.slower.currentPosition.reset();
            }
            this.tick--;

            healthRemainingSprite.update();

            switch(this.tick) {
                case 6:
                    break;
                case 5:
                    break;
                case 4:
                    break;
                case 3:
                    petSpriteStates.slower.referenceObject.stats.hp -= petSpriteStates.faster.referenceObject.stats.attk;
                    if (petSpriteStates.slower.referenceObject.stats.hp < 1) {
                        petSpriteStates.hasDeath = true;
                        petSpriteStates.slower.referenceObject.stats.hp = 0;
                        console.log("Someone has died");
                    }
                    addLine(petSpriteStates.slower.referenceObject.stats.hp + " hp left");
                    break;
                case 2:
                    break;
                case 1:
                    break;
                case 0:
                    break;
                default: // assume this is -1
                    break;
            }

            if (this.tick < 0) {
                foregroundBoard.clearEntireScreen();
                if (this.rounds === 0 && !petSpriteStates.hasDeath) {
                    this.rounds++;
                    currentScreen = attackSequenceScreen.LAUNCHING_ATTACK;
                    currentScreen.update();
                    this.context.restore();
                    addLine("Returning the attack");
                }
                else if (!petSpriteStates.hasDeath) { // the second round has been done, jump out and switch to fight menu
                    foregroundBoard.restore();
                    this.context.restore();
                    currentScreen = battleMenuScreen.FIGHT;
                    game.currentScreenState = fightBattleState;
                    enableKeyPress();
                    this.rounds++;
                }
                else if (petSpriteStates.hasDeath) {
                    this.rounds++;
                    disableKeyPress();
                    // figure out who died
                    // if your pet died, change state to sick, switch to petScreen
                    if (petSprite.referenceObject.stats.hp < 1) {
                        currentScreen = statusScreens.SADDENED_ANIMATION;
                        game.currentScreenState = sadSequenceState;

                        console.log("LOST");
                    }
                    // if your pet won, change state to happy, switch to petScreen
                    else {
                        //game.pet.state = ANIMAL_STATES.IDLE;
                        currentScreen = statusScreens.HAPPY_ANIMATION;
                        game.currentScreenState = happySequenceState;
                        console.log("WIN!");
                        // select next city
                    }
                    game.pet.stats.resetStats();
                    game.currentEnemy.stats.resetStats();

                    this.context.restore();
                    foregroundBoard.restore();

                    petSprite.update();
                    game.stepCounter.hasRecentlyStepped = false;
                    petSpriteStates.hasDeath = false;
                    addLine("Battle is over");

                    currentScreen.update();
                }
            }
        },
        draw: function() {
            petSpriteStates.slower.draw();
            if (this.tick < 5) {
                blackBar.draw(); // note that this is 7 pixels high from the bottom
                healthRemainingSprite.draw();
            }
        }
    })
};

var statusScreens = {
    HAPPY_ANIMATION: new ScreenSprite({
        name: "HAPPY_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.HAPPY_PET,
        update: function () {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                console.log("HAPPY-ing?");
                petSprite.currentPosition = petSprite.rejoicingPosition;
                this.context.restore();
                foregroundBoard.restore();
            }
            this.tick--;

            petSprite.update();
            statusSprites.SUN.update();

            if (this.tick < 0) {
                game.pet.state = ANIMAL_STATES.IDLE;
                game.currentScreenState = petState;
                currentScreen = petScreen;
                petSprite.update();
                enableKeyPress();
            }
        },
        draw: function() {
            petSprite.draw();
            statusSprites.SUN.draw();
        }
    }),
    SADDENED_ANIMATION: new ScreenSprite({
        name: "SADDENED_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.SADDENED_PET,
        update: function () {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                console.log("SADDENING");
                petSprite.currentPosition = petSprite.saddenedPosition;
            }
            this.tick--;

            petSprite.update();
            statusSprites.BANDAID.update();

            if (this.tick < 0) {
                game.pet.state = ANIMAL_STATES.SICK;
                game.currentScreenState = petState;
                currentScreen = petScreen;
                petSprite.currentPosition = petSprite.sickPosition;
                petSprite.update();
                enableKeyPress();
                console.log(game.pet.state);
            }
        },
        draw: function() {
            petSprite.draw();
            statusSprites.BANDAID.draw();
        }
    })
};