/**
 * Created by JarvisWalker on 6/1/17.
 */

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: new Animal({
        name: "PET",
        stats: {
            hp: 10,
            attk: 5,
            spd: 7
        }
    })
};

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
    this.name = options.name;
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
    name: "PET_STATE",
    down: function() {
        //game.state = GAME_STATES.MENU;
        currentScreenState = mapState;
        asyncRender = true;
    }
});

// MENU
var careState = new ScreenState({
    name: "CARE_STATE",
    up: function() {
        currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {

    },
    left: function() {
        currentScreenState = statsState;
        asyncRender = true;
    },
    right: function() {
        currentScreenState = mapState;
        asyncRender = true;
    }
});

var statsState = new ScreenState({
    name: "STATS_STATE",
    up: function() {
        currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {

    },
    left: function() {
        currentScreenState = stepsState;
        asyncRender = true;
    },
    right: function() {
        currentScreenState = careState;
        asyncRender = true;
    }
});

var stepsState = new ScreenState({
    name: "STEP_STATE",
    up: function() {
        currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {

    },
    left: function() {
        currentScreenState = mapState;
        asyncRender = true;
    },
    right: function() {
        currentScreenState = statsState;
        asyncRender = true;
    }
});

var mapState = new ScreenState({
    name: "MAP_STATE",
    up: function() {
        currentScreenState = petState;
        asyncRender = true;
    },
    down: function() {

    },
    left: function() {
        currentScreenState = careState;
        asyncRender = true;
    },
    right: function() {
        currentScreenState = stepsState;
        asyncRender = true;
    }
});

var currentScreenState = petState;

function update() {
    // Need to figure out how to link this to a screen
    if (steps.hasRecentlyStepped) {
        game.pet.state = ANIMAL_STATES.WALKING;
        steps.waitPeriod--;
        if (steps.waitPeriod < 0) {
            steps.hasRecentlyStepped = false;
            game.pet.state = ANIMAL_STATES.IDLE;
            //steps.waitPeriod = 0;
        }
    }
}