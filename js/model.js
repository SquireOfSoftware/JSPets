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
    //this.name = options.name;
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
    //name: "PET_STATE",
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
    state: SCREEN_STATES.STEPS.substates[0],
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

function update() {
    // Need to figure out how to link this to a screen
    if (game.stepCounter.hasRecentlyStepped) {
        game.pet.state = ANIMAL_STATES.WALKING;
        game.stepCounter.waitPeriod--;
        if (game.stepCounter.waitPeriod < 0) {
            game.stepCounter.hasRecentlyStepped = false;
            game.pet.state = ANIMAL_STATES.IDLE;
        }
    }
}

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: new Animal({
        name: "PET",
        stats: {
            hp: 10,
            attk: 5,
            spd: 7
        }
    }),
    stepCounter: {
        total: bigInt(1),
        hasRecentlyStepped: false,
        delay: 50,
        waitPeriod: this.delay,
        resetWaitPeriod: function() {this.waitPeriod = this.delay;}
    },
    currentScreenState: stepsState//petState
};