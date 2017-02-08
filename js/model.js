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
    down: function() {
        game.currentScreenState = mapState;
        asyncRender = true;
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

// Land
// Each piece of land has a "state" and a set of cities
// each city has a set of "land types" and a step count to reach the center of the city
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
                land: [
                    LAND_TYPES.CITY,
                    LAND_TYPES.GRASSLAND
                ]
            })
        }
    })
};

function update() {
    // Need to figure out how to link this to a screen
    //game.currentScreenState.tick();
}

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: new Animal({
        name: "PET",
        stats: {
            hp: 10,
            attk: 5,
            spd: 7
        },
        evolution_state: EVOLUTION_STATES.BASIC
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
    currentMap: australia.NSW.cities.SYDNEY
};