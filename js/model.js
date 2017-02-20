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
        //game.currentScreenState = stepsState;
        //asyncRender = true;
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
		//addLine("EVOLVING", game.pet.stats.state);
		if (game.pet.stats.state === EVOLUTION_STATES.BASIC) {
			game.pet.stats = game.pet.evolvedStats[EVOLUTION_STATES.CHAMPION.value];
		}
		else if (game.pet.stats.state === EVOLUTION_STATES.CHAMPION) {
			game.pet.stats =  game.pet.evolvedStats[EVOLUTION_STATES.ULTIMATE.value];
		}
		
		// I think there is a bug here
		console.log(game.pet.stats.state);
		//currentScreen = statusScreens.EVOLVE_ANIMATION;
		game.currentScreenState = evolvingAnimationState;
		
		asyncRender = true;
    },
    left: function() {
		
    },
    right: function() {
		
    }
})

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
})

var autoBattleState = new ScreenState({
    state: SCREEN_STATES.AUTO,
    up: function() {

    },
    down: function() {
		var roll = Math.round(Math.random() * 10, 0);
        addLine("Auto battle rolled " + roll);
        if (roll % 2 === 1) {
            game.pet.state = ANIMAL_STATES.SICK;
            currentScreen = statusScreens.SADDENED_ANIMATION;
            game.currentScreenState = sadSequenceState;
        }
        else {
            currentScreen = statusScreens.HAPPY_ANIMATION;
            game.currentScreenState = happySequenceState;
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
            currentScreen = statusScreens.SADDENED_ANIMATION;
            game.currentScreenState = sadSequenceState;
        }
        else {
            game.pet.state = ANIMAL_STATES.IDLE;
            game.currentScreenState = petState;
        }

        // remember that the trigger was that you took a step over the threshold
        game.stepCounter.hasRecentlyStepped = false;
        game.stepCounter.resetWaitPeriod();

        // need to show sick animation
        console.log(game.currentScreenState, game.pet);

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

// Land
// Each piece of land has a "state" and a set of cities
// each city has a set of "biomes" and a step count to reach the center of the city
function State(options) {
    this.name = options.name;
    this.cities = options.cities;
}

function City(options){
    this.name = options.name;
    this.stepCount = options.stepCount;
    this.referenceState = options.referenceState;
}

var australia = {
    NSW: new State({
        name: "NSW",
        cities: {
            SYDNEY: new City({
                name: "Sydney",
                stepCount: 1,//300,
                referenceState: MAP_STATES.NSW.substates.SYDNEY,
                biomes: [
                    BIOMES.CITY,
                    BIOMES.GRASSLAND
                ]
            }),
            HUNTER_VALLEY: new City({
                name: "Hunter Valley",
                stepCount: 400,
                referenceState: MAP_STATES.NSW.substates.HUNTER_VALLEY,
                biomes: []
            }),
            BROKEN_HILL: new City({
                name: "Broken Hill",
                stepCount: 2000,
                referenceState: MAP_STATES.NSW.substates.BROKEN_HILL,
                biomes: []
            }),
            JINDABYNE: new City({
                name: "Jindabyne",
                stepCount: 850,
                referenceState: MAP_STATES.NSW.substates.JINDABYNE,
                biomes: []
            }),
            JERVIS_BAY: new City({
                name: "Jervis Bay",
                stepCount: 400,
                referenceState: MAP_STATES.NSW.substates.JERVIS_BAY,
                biomes: []
            })
        }
    }),
    QLD: new State({
        name: "QLD"
    }),
    NT: new State({
        name: "NT"
    }),
    WA: new State({
        name: "WA"
    }),
    SA: new State({
        name: "SA"
    }),
    VIC: new State({
        name: "VIC"
    }),
    TAS: new State({
        name: "TAS"
    })
};

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
	type: ANIMAL_TYPES.DUCK
});

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
    currentMap: australia.NSW.cities.SYDNEY,
    currentEnemy: cat
};

game.pet.isPet = true;