/**
 * Created by JarvisWalker on 6/1/17.
 */

function Animal(options) {
    this.name = options.name;
	
	this.evolvedStats = options.evolvedStats;
	
    this.stats = this.evolvedStats[0];

    if (options.isPet !== undefined)
        this.isPet = options.isPet;
    else
        this.isPet = false;

    if (options.state !== undefined)
        this.state = options.state;
    else
        this.state = ANIMAL_STATES.IDLE;

    this.type = options.type;

    this.resetStats = options.resetStats;
	
	this.resetAllStats = options.resetAllStats;
}

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
        game.currentScreenState = mapScreenState.NORTH;
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
        game.currentScreenState = autoBattleState;
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
		
		if (game.pet.stats.state === EVOLUTION_STATES.BASIC) {
			game.pet.stats.resetStats();
			game.pet.stats = game.pet.evolvedStats[EVOLUTION_STATES.CHAMPION.value];
		}
		else if (game.pet.stats.state === EVOLUTION_STATES.CHAMPION) {
			game.pet.stats.resetStats();
			game.pet.stats = game.pet.evolvedStats[EVOLUTION_STATES.ULTIMATE.value];
		}

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
            //currentScreen = statusScreens.SADDENED_DEVOLVE_ANIMATION;
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
            //currentScreen = statusScreens.SADDENED_DEVOLVE_ANIMATION;
			if (game.pet.stats.state === EVOLUTION_STATES.BASIC)
				game.currentScreenState = sadSequenceState;
			else
				game.currentScreenState = sadDevolvingAnimationstate;
        }
        else {
			game.pet.state = ANIMAL_STATES.IDLE;
			if (game.pet.stats.state === EVOLUTION_STATES.BASIC) {
				game.currentScreenState = petState;
			}
			else 
				game.currentScreenState = idleDevolvingAnimationstate;
        }
	
        game.stepCounter.resetWaitPeriod();
    },
    left: function() {
        game.currentScreenState = autoBattleState;
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
            asyncRender = true;
        },
        down: function() {

        },
        left: function() {
            game.currentScreenState = mapScreenState.SOUTH;
            asyncRender = true;
        },
        right: function() {
            game.currentScreenState = mapScreenState.SOUTH;
            asyncRender = true;
        }
    }),
    SOUTH: new ScreenState({
        state: SCREEN_STATES.MAP.substates.TAS.substates.SOUTH,
        up: function() {
            game.currentScreenState = mapState;
            asyncRender = true;
        },
        down: function() {

        },
        left: function() {
            game.currentScreenState = mapScreenState.NORTH;
            asyncRender = true;
        },
        right: function() {
            game.currentScreenState = mapScreenState.NORTH;
            asyncRender = true;
        }
    })
};

// Land
// Each piece of land has a "state" and a set of cities
// each city has a set of "biomes" and a step count to reach the center of the city
function State(options) {
    this.name = options.name;
    this.cities = options.cities;
}

function City(referenceState, coordinates, stepCount, isCurrentCity){
    
	this.coordinates = coordinates;
    this.stepCount = stepCount;
	this.isCurrentCity = isCurrentCity;
    this.referenceState = referenceState;
	
	this.name = this.referenceState.name;
}

function getCoordinates(x, y) {
	return {x: x, y: y}; // need to figure out how to display stuff on to the next map
}

var australia = {
    TAS: new State({
        name: "TAS",
		cities: {
            NORTH:[
                // NORTH
                new City(
                    MAP_STATES.TAS.substates.REDPA,
                    getCoordinates(4, 3),
                    3,
                    true
                ),
                new City(
                    MAP_STATES.TAS.substates.SMITHTON,
                    getCoordinates(8, 2),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.BURNIE_SOMERSET,
                    getCoordinates(17, 6),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.CRADLE_MOUNTAIN,
                    getCoordinates(17, 12),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.DELORAINE,
                    getCoordinates(25, 11),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.GEORGE_TOWN,
                    getCoordinates(27, 6),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.MUSSELROE_BAY,
                    getCoordinates(41, 3),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.SCAMANDER,
                    getCoordinates(42, 12),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.LAUNCESTON,
                    getCoordinates(30, 10),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.CAMPBELL_TOWN,
                    getCoordinates(34, 17),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.DERWENT_BRIDGE,
                    getCoordinates(21, 18),
                    3,
                    false
                ),
                new City(
                    MAP_STATES.TAS.substates.QUEENSTOWN,
                    getCoordinates(13, 18),
                    3,
                    false
                )]
        },
        SOUTH: [
            // SOUTH
			new City(
				MAP_STATES.TAS.substates.STRAHAN,
				getCoordinates(19, 22), // next map
				3,
				false
			),
			new City(
				MAP_STATES.TAS.substates.STRATHGORDON,
				getCoordinates(19, 30),
				3,
				false
			),
			
			new City(
				MAP_STATES.TAS.substates.BOTHWELL,
				getCoordinates(29, 25),
				3,
				false
			),
			new City(
				MAP_STATES.TAS.substates.TRIABUNNA,
				getCoordinates(39, 27),
				3,
				false
			),
			new City(
				MAP_STATES.TAS.substates.HOBART,
				getCoordinates(32, 31),
				3,
				false
			),
			new City(
				MAP_STATES.TAS.substates.PORT_ARTHUR,
				getCoordinates(38, 36),
				3,
				false
			)
		]
    })
};

// ANIMALS

function generateAnimalStats(hp, attk, spd, state) {
    return {
        hp: hp,
        attk: attk,
        spd: spd,
        state: state,
        resetStats: function() {
            this.hp = hp;
            this.attk = attk;
            this.spd = spd;
            this.state = state;
			//console.log(this);
        }
    };
}
/*
var currentEnemy = {
    name: "Enemy",
    currentEnemy: undefined,
    currentBiome: undefined,
    generateEnemy: function() {
        //game.currentMap.biomes
        var biomes = game.currentMap.biomes;
        this.currentBiome = biomes[Math.floor(Math.random() * (biomes.length + 1))];
        // set up new stats
    },
    stats: generateAnimalStats(5, 1, 1, EVOLUTION_STATES.BASIC)
};*/

var cat = new Animal({
    name: "CAT",
    //stats: generateAnimalStats(10, 10, 2, EVOLUTION_STATES.BASIC),
	evolvedStats: [
		generateAnimalStats(10, 10, 2, EVOLUTION_STATES.BASIC),
		generateAnimalStats(20, 15, 5, EVOLUTION_STATES.CHAMPION),
		generateAnimalStats(35, 20, 10, EVOLUTION_STATES.ULTIMATE)
	],
    type: ANIMAL_TYPES.CAT
});

var duck = new Animal({
    name: "DUCK",
    //stats: generateAnimalStats(10, 12, 1, EVOLUTION_STATES.BASIC),
	evolvedStats: [
		generateAnimalStats(10, 12, 1, EVOLUTION_STATES.BASIC),
		generateAnimalStats(18, 2, 6, EVOLUTION_STATES.CHAMPION),
		generateAnimalStats(27, 22, 9, EVOLUTION_STATES.ULTIMATE)
	],
	type: ANIMAL_TYPES.DUCK,
	resetAllStats: function() {
		for(var i = 0; i < this.evolvedStats.length; i++) {
			this.evolvedStats[i].resetStats();
			console.log("Resetting", this.evolvedStats[i]);
		}
	}
});

function resetStats() {
	game.pet.stats.resetStats();
	game.currentEnemy.stats.resetStats();
	game.pet.stats = game.pet.evolvedStats[EVOLUTION_STATES.BASIC.value];
	
	game.stepCounter.hasRecentlyStepped = false;
}

function update() {
    // Need to figure out how to link this to a screen
}

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: duck,
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
    currentMap: australia.TAS.cities.NORTH[0],
    currentEnemy: cat
};

game.pet.isPet = true;