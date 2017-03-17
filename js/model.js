/**
 * Created by JarvisWalker on 6/1/17.
 */

function ScreenState(options) {
    this.state = options.state;
    if (options.right !== undefined)
        this.right = options.right;
    else
        this.right = function() {};

    if (options.left !== undefined)
        this.left = options.left;
    else
        this.left = function() {};

    if (options.down !== undefined)
        this.down = options.down;
    else
        this.down = function() {};

    if (options.up !== undefined)
        this.up = options.up;
    else
        this.up = function() {};
}

var petState = new ScreenState({
    state: SCREEN_STATES.PETS,
    up: function() {
        //game.pet.state = ANIMAL_STATES.IN_BATTLE;
    },
    down: function() {
        game.currentScreenState = mapState;
        asyncRender = true;
    },
    left: function() {

    },
    right: function() {

    }
});

// MENU
var careState = new ScreenState({
    state: SCREEN_STATES.CARE,
    up: function() {
        game.currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {
        // show healing animation, has happy then idle
        if (game.pet.state === ANIMAL_STATES.SICK) {
            game.currentScreenState = happySequenceState;
            game.pet.stats.currentStats.hp = 1;
            asyncRender = true;
        }
    },
    left: function() {
        game.currentScreenState = statsState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = mapState;
        asyncRender = true;
    }
});

var statsState = new ScreenState({
    state: SCREEN_STATES.STATS,
    up: function() {
        game.currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {
        game.currentScreenState = currentStatsState;
        asyncRender = true;
    },
    left: function() {
        game.currentScreenState = stepsState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = careState;
        asyncRender = true;
    }
});

var currentStatsState = new ScreenState({
    state: SCREEN_STATES.STATS.substates.CURRENT_STATS,
    up: function() {
        game.currentScreenState = statsState;
        petSprite.currentPosition = petSprite.idlePosition;
        asyncRender = true;
    },
    down: function() {
        
    },
    left: function() {
        
    },
    right: function() {
        
    }
});

var stepsState = new ScreenState({
    state: SCREEN_STATES.STEPS,
    up: function() {
        game.currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {
        game.currentScreenState = totalStepsState;
    },
    left: function() {
        game.currentScreenState = mapState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = statsState;
        asyncRender = true;
    }
});

var mapState = new ScreenState({
    state: SCREEN_STATES.MAP,
    up: function() {
        game.currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {
        switch (game.currentRegion) {
            case 0:
                game.currentScreenState = mapScreenState.NORTH;
                break;
            case 1:
                game.currentScreenState = mapScreenState.SOUTH;
                break;

        }
        asyncRender = true;
    },
    left: function() {
        game.currentScreenState = careState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = stepsState;
        asyncRender = true;
    }
});

// STEPS

var totalStepsState = new ScreenState({
    state: SCREEN_STATES.STEPS.substates.TOTAL_STEPS,
    up: function() {
        game.currentScreenState = stepsState;
        asyncRender = true;
    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

// BATTLE

var cryState = new ScreenState({
    state: SCREEN_STATES.START_BATTLE,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

// BATTLE MENU

var fightBattleState = new ScreenState({
    state: SCREEN_STATES.FIGHT,
    up: function() {

    },
    down: function() {
        game.currentScreenState = attackSequenceState;
        asyncRender = true;
    },
    left: function() {
        game.currentScreenState = runBattleState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = powerupBattleState;
        asyncRender = true;
    }
});

var powerupBattleState = new ScreenState({
    state: SCREEN_STATES.POWER_UP,
    up: function() {

    },
    down: function() {
		if (game.pet.stats.state !== EVOLUTION_STATES.ULTIMATE) {
			game.currentScreenState = evolveBattleState;
			asyncRender = true;
		}
    },
    left: function() {
        game.currentScreenState = fightBattleState;
        asyncRender = true;
    },
    right: function() {
        //game.currentScreenState = autoBattleState; // until I sort out how AI will work in the game
        game.currentScreenState = runBattleState;
        asyncRender = true;
    }
});

var evolveBattleState = new ScreenState({
	state: SCREEN_STATES.POWER_UP.substates.EVOLVE,
	up: function() {
		game.currentScreenState = powerupBattleState;
        asyncRender = true;
    },
    down: function() {
		// disable key presses
		// evolution screen - this updates the pet sprite
		disableKeyPress();
		game.pet.stats.evolveStats();

		game.currentScreenState = evolvingAnimationState;
		
		asyncRender = true;
    },
    left: function() {
		
    },
    right: function() {
		
    }
});

var evolvingAnimationState = new ScreenState({
	state: SCREEN_STATES.POWER_UP.substates.EVOLVING,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var sadDevolvingAnimationstate = new ScreenState({
	state: SCREEN_STATES.DEVOLVING.substates.SAD,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var idleDevolvingAnimationstate = new ScreenState({
	state: SCREEN_STATES.DEVOLVING.substates.IDLE,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var happyDevolvingAnimationstate = new ScreenState({
	state: SCREEN_STATES.DEVOLVING.substates.HAPPY,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var autoBattleState = new ScreenState({
    state: SCREEN_STATES.AUTO,
    up: function() {

    },
    down: function() {

		var roll = Math.round(Math.random() * 10, 0);
        addLine("Auto battle rolled " + roll);
		
		if (roll % 2 === 1) {
            game.pet.state = ANIMAL_STATES.SICK;
            if (game.pet.stats.state === EVOLUTION_STATES.BASIC)
				game.currentScreenState = sadSequenceState;
			else
				game.currentScreenState = sadDevolvingAnimationstate;
        }
        else {
			if (game.pet.stats.state === EVOLUTION_STATES.BASIC) {
				currentScreen = statusScreens.HAPPY_ANIMATION;
				game.currentScreenState = happySequenceState;
			}
			else {
				game.currentScreenState = happyDevolvingAnimationstate;
				currentScreen = statusScreens.HAPPY_DEVOLVE_ANIMATION;
			}
        }
    },
    left: function() {
        game.currentScreenState = powerupBattleState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = runBattleState;
        asyncRender = true;
    }
});

var runBattleState = new ScreenState({
    state: SCREEN_STATES.RUN,
    up: function() {

    },
    down: function() {
        // should roll a chance of getting sick from running
        // note that the step counter for the given city does not reset, it is only goes to the next city if you beat it
        var roll = Math.round(Math.random() * 10, 0);
        addLine("Rolled " + roll);
		
        if (roll % 2 === 1) {
            game.pet.state = ANIMAL_STATES.SICK;
			if (game.pet.stats.currentLevel < 2)
				game.currentScreenState = sadSequenceState;
			else
				game.currentScreenState = sadDevolvingAnimationstate;
        }
        else {
			game.pet.state = ANIMAL_STATES.IDLE;
            if (game.pet.stats.currentLevel < 2)
				game.currentScreenState = petState;
			else 
				game.currentScreenState = idleDevolvingAnimationstate;
        }
	
        game.stepCounter.resetWaitPeriod();
    },
    left: function() {
        //game.currentScreenState = autoBattleState; // until I sort out how AI will work in the game
        game.currentScreenState = powerupBattleState;
        asyncRender = true;
    },
    right: function() {
        game.currentScreenState = fightBattleState;
        asyncRender = true;
    }
});

// ATTACKING SEQUENCE

var attackSequenceState = new ScreenState({
    state: SCREEN_STATES.ATTACK_SEQUENCE,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

// GENERAL SEQUENCES

var happySequenceState = new ScreenState({
    state: SCREEN_STATES.HAPPY_PET,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var sadSequenceState = new ScreenState({
    state: SCREEN_STATES.SADDENED_PET,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

// MAP

var mapScreenState = {
    NORTH: new ScreenState({
        state: SCREEN_STATES.MAP.substates.TAS.substates.NORTH,
        up: function() {
            game.currentScreenState = mapState;
            game.currentViewableRegion = game.currentRegion;
            foregroundBoard.clearEntireScreen();
            asyncRender = true;
        },
        down: function() {

        },
        left: function() {
            game.currentScreenState = mapScreenState.SOUTH;
            game.currentViewableRegion--;
            if(game.currentViewableRegion < 0)
                game.currentViewableRegion = australia.TAS.regions.length - 1;
            asyncRender = true;
            console.log("NORTH, left", game.currentViewableRegion);
        },
        right: function() {
            game.currentScreenState = mapScreenState.SOUTH;
            game.currentViewableRegion++;
            if(game.currentViewableRegion > australia.TAS.regions.length)
                game.currentViewableRegion = 0;
            asyncRender = true;
            console.log("NORTH, right", game.currentViewableRegion);
        }
    }),
    SOUTH: new ScreenState({
        state: SCREEN_STATES.MAP.substates.TAS.substates.SOUTH,
        up: function() {
            game.currentScreenState = mapState;
            game.currentViewableRegion = game.currentRegion;
            foregroundBoard.clearEntireScreen();
            asyncRender = true;
        },
        down: function() {

        },
        left: function() {
            game.currentScreenState = mapScreenState.NORTH;
            game.currentViewableRegion--;
            if(game.currentViewableRegion < 0)
                game.currentViewableRegion = australia.TAS.regions.length - 1;
            console.log("SOUTH, left", game.currentViewableRegion);
            asyncRender = true;
        },
        right: function() {
            game.currentScreenState = mapScreenState.NORTH;
            game.currentViewableRegion++;
            if(game.currentViewableRegion > australia.TAS.regions.length - 1)
                game.currentViewableRegion = 0;
            console.log("SOUTH, right", game.currentViewableRegion);
            asyncRender = true;
        }
    })
};

function update() {
    // Need to figure out how to link this to a screen
}

function resetStats() {
	game.stepCounter.hasRecentlyStepped = false;
    game.pet.stats.devolveStats();
    game.currentEnemy.stats.fullyRestoreStats();
}

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: getAnimalState(ANIMAL_TYPES.DUCK),
    stepCounter: {
        currentSteps: 0,
        total: bigInt(0),
        //bigInt("999999999999999999999999999999999"),
        hasRecentlyStepped: false,
        delay: 2, // number of update frame render loops
        waitPeriod: this.delay,
        resetWaitPeriod: function() {this.waitPeriod = this.delay;},
        updateWalkingFrame: function() {
            if (game.stepCounter.hasRecentlyStepped &&
                (game.pet.state === ANIMAL_STATES.WALKING ||
                game.pet.state === ANIMAL_STATES.IDLE)) {
                game.pet.state = ANIMAL_STATES.WALKING;
                game.stepCounter.waitPeriod--;
                if (game.stepCounter.waitPeriod < 0) {
                    game.stepCounter.hasRecentlyStepped = false;
                    game.pet.state = ANIMAL_STATES.IDLE;
                }
            }
        }
    },
    currentScreenState: petState,
    currentRegion: 1,
    currentViewableRegion: 1,
    currentCity: 5
    //currentEnemy: cat
};

game.pet.isPet = true;