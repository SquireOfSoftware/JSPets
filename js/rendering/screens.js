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
}

function ScreenSprite(options) {
    this.name = options.name;
    this.image = options.image;
    if(options.context !== undefined)
        this.context = options.context;
    else
        this.context = drawingBoard;

    this.referenceState = options.referenceState;

    if (options.size !== undefined)
        this.size = options.size;
    else
        this.size = {width: DEFAULT_SCREEN_SIZE.X, height: DEFAULT_SCREEN_SIZE.Y};

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
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        };
    }
}

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
    image: generateImage("sprites/step-numbers.png"),
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

var currentStatScreen = new ScreenSprite({
    name: "STATS_SCREEN",
    image: generateImage("sprites/screens/displaying-current-stats.png"),
    context: drawingBoard,
    referenceState: SCREEN_STATES.STATS.substates.CURRENT_STATS,
    update: function() {
        // set the pet into "display mode" at coordinates 3,2
        petSprite.update();
    },
    draw: function() {
        // clear the screen
        this.context.clearEntireScreen();
        // draw the screen
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
        
        petSprite.draw();
        
        var stats = game.pet.stats.getString();
        for(var statCounter = 0; statCounter < 3; statCounter++) {
            var position = 2;
            for (var digit = stats[statCounter].length - 1; digit >= 0 && position >= 0; digit--) {
                numberDrawingSprite.draw(stats[statCounter].charAt(digit), 30 + ((position) * 4), 2 + statCounter * 6, false);
                position--;
            }
        }
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
                this.tick = 6; // -1; // TEST
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
                 toggleKeyPress();
                //*/
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
                enemySprite.currentPosition = enemySprite.slidingPosition;
            }
            this.tick--;
            
            enemySprite.update();

            if (this.tick < 0){
                enemySprite.currentPosition.reset();
                currentScreen = battleScreens.GROWL;
                currentScreen.update();
            }
        },
        draw: function() {
            enemySprite.draw();
        }
    }),
    GROWL: new ScreenSprite({
        name: "GROWL_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.GROWL,
        update: function() {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                enemySprite.currentPosition = enemySprite.barkingPosition;
            }
            this.tick--;

            enemySprite.update();
			
            if (this.tick < 0){
                enemySprite.currentPosition.reset();
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                this.context.restore();
            }
        },
        draw: function() {
            enemySprite.draw();
        }
    })
};

var battleMenuScreen = {
    FIGHT: new ScreenSprite({
        name: "FIGHT",
        image: generateImage("sprites/screens/fight-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.FIGHT,
        update: function() {
            if (blockKeyPress !== false) {
                enableKeyPress();
            }
        }
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
    }),
	EVOLVE: new ScreenSprite({
        name: "EVOLVE",
        image: generateImage("sprites/screens/evolve-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.EVOLVE
    })
};

var powerUpScreens = {
    HOME: new ScreenSprite({
        name: "BOOSTS_HOME",
        image: generateImage("sprites/screens/boosts-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.BOOSTS
    }),
    CHAMPION: new ScreenSprite({
        name: "TO_CHAMPION",
        image: generateImage("sprites/screens/champion-evolve-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.EVOLVE.substates.TO_CHAMPION,
        draw: function() {
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        }
    }),
    ULTIMATE: new ScreenSprite({
        name: "TO_ULTIMATE",
        image: generateImage("sprites/screens/ultimate-evolve-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.EVOLVE.substates.TO_ULTIMATE,
        draw: function() {
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        }
    }),
    HEAL_HALF: new ScreenSprite({
        name: "HEAL_HALF",
        image: generateImage("sprites/screens/cooldown-healing.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.HEAL_HALF,
        draw: function() {
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        }
    }),
    DOUBLE_ATTACK: new ScreenSprite({
        name: "DOUBLE_ATTACK",
        image: generateImage("sprites/screens/cooldown-attack-buff.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.DOUBLE_ATTACK,
        draw: function() {
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        }
    }),
    DOUBLE_SPEED: new ScreenSprite({
        name: "DOUBLE_SPEED",
        image: generateImage("sprites/screens/cooldown-speed-buff.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP.substates.DOUBLE_SPEED,
        draw: function() {
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                this.size.width,
                this.size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                this.size.width,
                this.size.height
            );
        }
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
				
                if (this.rounds === 0) {
                    if (game.currentEnemy.stats.currentStats.speed > game.pet.stats.currentStats.speed) {
                        petSpriteStates.faster = enemySprite;
                        this.context.flipHorizontally();
                        foregroundBoard.flipHorizontally();

                        petSpriteStates.slower = petSprite;
                    }
                    else {
                        petSpriteStates.faster = petSprite;
                        petSpriteStates.slower = enemySprite;
                    }
                }
                else {
                    var tempSprite = petSpriteStates.faster;

                    petSpriteStates.faster = petSpriteStates.slower;
                    petSpriteStates.slower = tempSprite;
					
					if (petSpriteStates.faster.referenceObject.isPet === false) {
						this.context.flipHorizontally();
                        foregroundBoard.flipHorizontally();
					}
                }

                fireball.currentPosition = fireball.positions.launchingPosition;
            }
            this.tick--;
            // need fireball

            petSpriteStates.faster.currentPosition = petSpriteStates.faster.attackingPosition;
            fireball.update();

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
            }

            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 4;
                this.context.clearEntireScreen();
                addLine("ATTACKING " + this.rounds);
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
        referenceState: SCREEN_STATES.ATTACK_SEQUENCE.substates.GETTING_HIT,
        update: function() {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                foregroundBoard.clearEntireScreen();
                this.context.clearEntireScreen();
                //console.log("GETTING HIT");
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
                //console.log("CALCULATING", this.rounds);
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
                    petSpriteStates.slower.referenceObject.stats.currentStats.hp -= petSpriteStates.faster.referenceObject.stats.currentStats.attack;
                    if (petSpriteStates.slower.referenceObject.stats.currentStats.hp < 1) {
                        petSpriteStates.hasDeath = true;
                        petSpriteStates.slower.referenceObject.stats.currentStats.hp = 0;
                        console.log("Someone has died");
                    }
                    addLine(petSpriteStates.slower.referenceObject.stats.currentStats.hp + " hp left");
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
					drawingBoard.restore();
					foregroundBoard.restore();
					if (petSprite.isEvolved > 0) {
						currentScreen = statusScreens.DEVOLVE_ANIMATION;
						currentScreen.update();
					}
					else
						performEndingAnimation();
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

function performEndingAnimation() {
	disableKeyPress();
	// figure out who died
	// if your pet died, change state to sick, switch to petScreen
	if (petSprite.referenceObject.stats.currentStats.hp < 1) {
		currentScreen = statusScreens.SADDENED_ANIMATION;
		game.currentScreenState = sadSequenceState;
	}
	// if your pet won, change state to happy, switch to petScreen
	else {
		// select next city
        var currentGameResets = gameResets;
        moveToNextCity();

        if (currentGameResets !== gameResets) {
            if (game.currentEnemy.type === ANIMAL_TYPES.TASMANIAN_TIGER) {
                currentScreen = endingGameScene.FINAL_SCENE;
                game.currentScreenState = endingScreenState.FINAL_SCENE;
            }
            else {
                currentScreen = endingGameScene.THANK_YOU;
                game.currentScreenState = endingScreenState.THANK_YOU;
            }
        }
        else { // normal city
            currentScreen = statusScreens.HAPPY_ANIMATION;
            game.currentScreenState = happySequenceState;
        }
	}
	
	resetStats();
	resetAttackSequence();
	
	petSpriteStates.hasDeath = false;

	petSprite.update();

	currentScreen.update();
}

function resetAttackSequence() {
	attackSequenceScreen.LAUNCHING_ATTACK.rounds = 0;
	attackSequenceScreen.ATTACK.rounds = 0;
	attackSequenceScreen.RECEIVING_DAMAGE.rounds = 0;
	attackSequenceScreen.CALCULATING_DAMAGE.rounds = 0;
}

var statusScreens = {
    HAPPY_ANIMATION: new ScreenSprite({
        name: "HAPPY_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.HAPPY_PET,
        update: function () {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
                //console.log("HAPPY-ing?");
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
            }
        },
        draw: function() {
            petSprite.draw();
            statusSprites.BANDAID.draw();
        }
    }),
	EVOLVE_ANIMATION: new ScreenSprite({
		name: "EVOLVE_ANIMATION",
		image: null,
		context: null,
		referenceState: SCREEN_STATES.POWER_UP.substates.EVOLVING,
		update: function () {
			if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 16;
				petSprite.currentPosition = petSprite.idlePosition;
				petSprite.currentPosition.reset();
            }
            this.tick--;
			
			if (this.tick > 3 && this.tick !== 16)
				evolutionSprites.EVOLVE.update();

			if (this.tick === 7) {
				petSprite.evolve();
			}

            if (this.tick < 0) {
                game.currentScreenState = fightBattleState;
                currentScreen = battleMenuScreen.FIGHT;
				currentScreen.update();
            }
		},
		draw: function () {
			petSprite.draw();
			if (this.tick > 3 && this.tick !== 16)
				evolutionSprites.EVOLVE.draw();
		}
	}),
	DEVOLVE_ANIMATION: new ScreenSprite({
		name: "DEVOLVE_ANIMATION",
		image: null,
		context: null,
		referenceState: SCREEN_STATES.DEVOLVING,
		update: function () {
			if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;
				petSprite.currentPosition = petSprite.idlePosition;
				petSprite.currentPosition.reset();
				
            }
            this.tick--;
			
			evolutionSprites.DEVOLVE.update();

			if (this.tick === 3) {
				petSprite.devolve();
			}

            if (this.tick < 0) {
				performEndingAnimation();
            }
		},
		draw: function () {
			petSprite.draw();
			evolutionSprites.DEVOLVE.draw();
		}
	}),
	IDLE_DEVOLVE_ANIMATION: new ScreenSprite({
		name: "IDLE_DEVOLVE_ANIMATION",
		image: null,
		context: null,
		referenceState: SCREEN_STATES.DEVOLVING.substates.IDLE,
		update: function () {
			if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 6;

				petSprite.currentPosition = petSprite.idlePosition;
				petSprite.currentPosition.reset();
            }
            this.tick--;
			
			evolutionSprites.DEVOLVE.update();

			if (this.tick === 3) {
				petSprite.devolve();
			}

            if (this.tick < 0) {
				resetStats();
				resetAttackSequence();
                foregroundBoard.clearEntireScreen();
                if (game.pet.state === ANIMAL_STATES.SICK) {
                    currentScreen = statusScreens.SADDENED_ANIMATION;
                    game.currentScreenState = sadSequenceState;
                }
                else {
                    currentScreen = petScreen;
                    game.currentScreenState = petState;
                }
            }
		},
		draw: function () {
			petSprite.draw();
			evolutionSprites.DEVOLVE.draw();
			
		}
	})
};

var boostAnimationsScreens = {
    HEALING_HALF: new ScreenSprite({
        referenceState: SCREEN_STATES.BOOSTS_ANIMATIONS.substates.HEALING_HALF,
        name: "HEALING_HALF",
        update: function() {
            if (this.tick === undefined || this.tick < 0) {
                this.tick = 6;
                petSprite.currentPosition = petSprite.idlePosition;
                petSprite.currentPosition.reset();
            }

            this.tick--;

            if (this.tick === 2) {
                buffCooldowns.hp.use();
            }

            if (this.tick < 0) {
                game.currentScreenState = fightBattleState;
                currentScreen = battleMenuScreen.FIGHT;
                currentScreen.update();
            }
        },
        draw: function() {
            petSprite.draw();
            backgroundBlackBar.draw();
            fullLetterSprite.draw("HP", 1, BOTTOM_TEXT_HEIGHT);

            fullNumberSprite.draw(game.pet.stats.currentStats.hp.toString(), 30, BOTTOM_TEXT_HEIGHT);
        }
    }),
    DOUBLING_ATTACK: new ScreenSprite({
        referenceState: SCREEN_STATES.BOOSTS_ANIMATIONS.substates.DOUBLING_ATTACK,
        name: "DOUBLING_ATTACK",
        update: function() {
            if (this.tick === undefined || this.tick < 0) {
                this.tick = 6;
                petSprite.currentPosition = petSprite.idlePosition;
                petSprite.currentPosition.reset();
            }

            this.tick--;

            if (this.tick === 2) {
                buffCooldowns.attack.use();
            }

            if (this.tick < 0) {
                game.currentScreenState = fightBattleState;
                currentScreen = battleMenuScreen.FIGHT;
                currentScreen.update();
            }
        },
        draw: function() {
            petSprite.draw();
            backgroundBlackBar.draw();
            fullLetterSprite.draw("ATTK", 1, BOTTOM_TEXT_HEIGHT);

            fullNumberSprite.draw(game.pet.stats.currentStats.attack.toString(), 30, BOTTOM_TEXT_HEIGHT);
        }
    }),
    DOUBLING_SPEED: new ScreenSprite({
        referenceState: SCREEN_STATES.BOOSTS_ANIMATIONS.substates.DOUBLING_SPEED,
        name: "DOUBLING_SPEED",
        update: function() {
            if (this.tick === undefined || this.tick < 0) {
                this.tick = 6;
                petSprite.currentPosition = petSprite.idlePosition;
                petSprite.currentPosition.reset();
            }

            this.tick--;

            if (this.tick === 2) {
                buffCooldowns.speed.use();
            }

            if (this.tick < 0) {
                game.currentScreenState = fightBattleState;
                currentScreen = battleMenuScreen.FIGHT;
                currentScreen.update();
            }
        },
        draw: function() {
            petSprite.draw();
            backgroundBlackBar.draw();
            fullLetterSprite.draw("SPD", 1, BOTTOM_TEXT_HEIGHT);

            fullNumberSprite.draw(game.pet.stats.currentStats.speed.toString(), 30, BOTTOM_TEXT_HEIGHT);
        }
    })
};

var endingGameScene = {
    FINAL_SCENE: new ScreenSprite({
        name: "FINAL_SCENE",
        referenceState: SCREEN_STATES.ENDINGS.substates.FINAL_SCENE,
        update: function() {
            if(this.tick === undefined || this.tick < 0) {
                disableKeyPress();
                this.tick = 18;
                drawingBoard.flipHorizontally();

                if (enemySprite === undefined) {
                    this.enemySprite = getSprite(ANIMAL_TYPES.TASMANIAN_TIGER, getAnimalState(ANIMAL_TYPES.TASMANIAN_TIGER));
                    this.enemySprite.isEvolved = 1;
                }
                else {
                    this.enemySprite = enemySprite;
                }
                this.enemySprite.currentPosition = this.enemySprite.receivingPosition;
            }
            this.tick --;
            this.enemySprite.update();
            
            if (this.tick === 12 || this.tick === 6) {
                finalTextSprite.update();
            } 
            else if (this.tick === -1) {
                currentScreen = endingGameScene.THANK_YOU;
                currentScreen.update();
            }
        },
        draw: function() {
            this.enemySprite.draw();
            finalTextSprite.draw();
        }
    }),
    THANK_YOU: new ScreenSprite({
        // this always appears at the end of the game
        name: "THANK_YOU",
        image: generateImage("sprites/thanks.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.ENDINGS.substates.THANK_YOU,
        update: function() {
            if (this.tick === undefined || this.tick < 0) {
                disableKeyPress();
                this.context.restore();
                this.tick = 18;
                this.context.clearEntireScreen();
            }
            
            this.tick --;

            if (this.tick > 15) {
                fadingOverlaySprite.update();
            }
            else if (this.tick === -1) {
                fadingOverlaySprite.currentPosition.reset();
                foregroundBoard.clearEntireScreen();
                drawingBoard.clearEntireScreen();
                currentScreen = petScreen;
                game.currentScreenState = petState;

                game.pet.state = ANIMAL_STATES.IDLE;
                petSprite.update();

                enableKeyPress();
            }
        },
        draw: function() {
            if (this.tick > 15 && this.tick < 18)
                fadingOverlaySprite.draw();
            else if (this.tick === 15) {
                foregroundBoard.clearEntireScreen();
            }
            
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
    })
};

var introScene = new ScreenSprite({
    name: "INTRO",
    referenceState: SCREEN_STATES.INTRO,
    update: function() {
        if(this.tick === undefined || this.tick < 0) {
            disableKeyPress();
            this.tick = 8;
            introSequenceSprite.positions.reset();
        }
        this.tick --;

        /*if (this.tick > 5)
            introSequenceSprite.update();*/

        if (this.tick > 5)
            fadingOverlaySprite.update();

        if (this.tick < 0) {
            //foregroundBoard.clearEntireScreen();
            drawingBoard.clearEntireScreen();
            currentScreen = petScreen;
            game.currentScreenState = petState;

            game.pet.state = ANIMAL_STATES.IDLE;
            petSprite.update();

            enableKeyPress();
        }
    },
    draw: function() {
        if (this.tick > 5)
            fadingOverlaySprite.draw();
        else if (this.tick === 5)
            foregroundBoard.clearEntireScreen();

        if (this.tick > 6)
            introSequenceSprite.draw();
    }
});