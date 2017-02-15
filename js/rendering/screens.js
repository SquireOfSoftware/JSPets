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
            //this.context.clearRect(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);
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
    context: foregroundBoard,
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
                this.tick = -1; //6; // TEST
            this.tick--;
            petSprite.update();
            cryingOutSprite.update();
            if (this.tick < 0){
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
            //clearScreen();
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
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                this.context.restore();
                toggleKeyPress();
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
        image: generateImage("sprites/screens/evolve-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP
    }),
    AUTO: new ScreenSprite({
        name: "AUTO",
        image: generateImage("sprites/screens/care-battle-menu.png"),
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

                    // figure out whether to flip the canvas or not
                    //console.log("Swapping the sprites", this.rounds, petSpriteStates);
                    addLine("Swapping the sprites");
                }

                fireball.currentPosition = fireball.positions.launchingPosition;
                toggleKeyPress();
                console.log("LAUNCHING ATTACK");
            }
            this.tick--;
            // need fireball

            petSpriteStates.faster.currentPosition = petSpriteStates.faster.attackingPosition;
            fireball.update();

            //console.log("screen tick:", this.tick);
            // need enemySprite to hold a position in one shot
            if (this.tick < 0){
                currentScreen = attackSequenceScreen.ATTACK;
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
                toggleKeyPress();
            }

            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 4;
                console.log("ATTACKING");
                this.context.clearEntireScreen();
                addLine("ATTACKING");

                // figure out which bit to flip, using this.rounds variable to flip the fireball

            }
            this.tick--;
            // need fireball
            fireball.update();

            // need enemySprite to hold a position in one shot
            if (this.tick < 0){
                // need to calculate dodge value, based on speed
                toggleKeyPress();
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

                petSpriteStates.slower.currentPosition = petSpriteStates.slower.idlePosition;

            }
            this.tick--;

            // need fireball
            fireball.update();
            // need enemySprite to hold a position in one shot
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
            fireball.draw();
            petSpriteStates.slower.draw();
        }
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
                this.tick = 4;
                foregroundBoard.clearEntireScreen();
                console.log("CALCULATING");
            }
            this.tick--;

            this.leftoverHp = petSpriteStates.slower.referenceObject.stats.hp;

            switch(this.tick) {
                case 4:
                    break;
                case 3:
                    break;
                case 2:
                    //leftoverHp -= petSpriteStates.faster.stats.attk;
                    petSpriteStates.slower.referenceObject.stats.hp -= petSpriteStates.faster.referenceObject.stats.attk;
                    if (petSpriteStates.slower.referenceObject.stats.hp < 1) {
                        petSpriteStates.hasDeath = true;
                        console.log("Someone has died");
                    }
                    addLine(petSpriteStates.slower.referenceObject.stats.hp + " hp left");
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
                    console.log("rounds", this.rounds);
                }
                else if (!petSpriteStates.hasDeath) { // the second round has been done, jump out and switch to fight menu
                    foregroundBoard.restore();
                    this.context.restore();
                    //currentScreen.update();
                    currentScreen = battleMenuScreen.FIGHT;
                    game.currentScreenState = fightBattleState;
                    toggleKeyPress();
                    this.rounds++;
                    //console.log(game.currentScreenState, currentScreen);
                }
                else if (petSpriteStates.hasDeath) {
                    // figure out who died
                    // if your pet died, change state to sick, switch to petScreen
                    if (petSprite.referenceObject.stats.hp < 1) {
                        game.pet.state = ANIMAL_STATES.SICK;
                        game.pet.stats.resetStats();
                        this.context.restore();
                        foregroundBoard.restore();
                        console.log("LOST", game.pet.stats);
                    }
                    // if your pet won, change state to happy, switch to petScreen
                    else {
                        game.pet.state = ANIMAL_STATES.IDLE;
                        game.pet.stats.resetStats();
                        this.context.restore();
                        foregroundBoard.restore();
                        console.log("WIN!",game.pet.stats);
                        // select next city
                    }
                    petSprite.update();
                    game.stepCounter.hasRecentlyStepped = false;
                    game.currentScreenState = petState;
                    currentScreen = petScreen;
                    toggleKeyPress();
                    addLine("Battle is over");
                    //toggleKeyPress();

                }
            }
        },
        draw: function() {
            //catSprite.draw();
            petSpriteStates.slower.draw();
            blackBar.draw();
        }
    })
};