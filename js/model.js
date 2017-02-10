/**
 * Created by JarvisWalker on 6/1/17.
 */

function Animal(options) {
    this.name = options.name;
    this.stats = {
        hp: options.stats.hp,
        attk: options.stats.attk,
        spd: options.stats.spd
    };

    if (options.isPet !== undefined)
        this.isPet = options.isPet;
    else
        this.isPet = false;

    if (options.state !== undefined)
        this.state = options.state;
    else
        this.state = ANIMAL_STATES.IDLE;
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
        console.log(game.pet.state, game.currentScreenState);
        if (game.pet.state === ANIMAL_STATES.SICK) {
            game.pet.state = ANIMAL_STATES.IDLE;
            game.currentScreenState = petState;
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
    state: SCREEN_STATES.START_BATTLE.substates.CRY,
    up: function() {

    },
    down: function() {

    },
    left: function() {

    },
    right: function() {

    }
});

var fightBattleState = new ScreenState({
    state: SCREEN_STATES.FIGHT,
    up: function() {

    },
    down: function() {
        //game.currentScreenState = stepsState;
        //asyncRender = true;
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

var autoBattleState = new ScreenState({
    state: SCREEN_STATES.AUTO,
    up: function() {

    },
    down: function() {

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
        if (roll % 2 === 1)
            game.pet.state = ANIMAL_STATES.SICK;
        else
            game.pet.state = ANIMAL_STATES.IDLE;

        // remember that the trigger was that you took a step over the threshold
        game.stepCounter.hasRecentlyStepped = false;
        game.stepCounter.resetWaitPeriod();
        game.currentScreenState = petState;
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
                stepCount: 300,
                referenceState: MAP_STATES.NSW.substates.SYDNEY,
                biomes: [
                    BIOMES.CITY,
                    BIOMES.GRASSLAND
                ]
            })
        }
    })
};

function generateAnimalStats(hp, attk, spd, state) {
    return {
        hp: hp,
        attk: attk,
        spd: spd,
        state: state
    };
}

var currentEnemy = {
    name: "Enemy",
    currentEnemy: undefined,
    currentBiome: undefined,
    generateEnemy: function() {
        //game.currentMap.biomes
        var biomes = game.currentMap.biomes;
        this.currentBiome = biomes[Math.floor(Math.random() * (biomes.length + 1))];
        //this.states =
        // set up new stats
    },
    stats: generateAnimalStats(1, 1, 1, EVOLUTION_STATES.BASIC)
};

var cat = new Animal({
    name: "CAT",
    stats: generateAnimalStats(1, 1, 1, EVOLUTION_STATES.BASIC)
});

function update() {
    // Need to figure out how to link this to a screen
}

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: new Animal({
        name: "PET",
        isPet: true,
        stats: generateAnimalStats(10, 5, 7, EVOLUTION_STATES.BASIC)
    }),
    stepCounter: {
        currentSteps: 299,
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