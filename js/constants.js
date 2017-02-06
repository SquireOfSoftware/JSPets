/**
 * Created by JarvisWalker on 6/1/17.
 */

function LogicState(options) {
    this.name = options.name;
    if (options.substates !== undefined)
        this.substates = options.substates;
    this.getName = function() { return this.name};
}

var ANIMAL_STATES = {
    IDLE: new LogicState({
        name: "IDLE"
        // default state
        // timeeout state as well
        // if you win you land on this
    }),
    WALKING: new LogicState({
        name: "WALKING"
        // triggered by a step
    }),
    IN_BATTLE: new LogicState({
        name: "IN_BATTLE"
        // no steps allowed
        // hp can be subtracted in this state
    }),
    SICK: new LogicState({
        name: "SICK"
        // no steps allowed
        // land on this if you run (chance) or you lose a battle
    })
};

var GAME_STATES = {
    PET_STATUS: new LogicState({
        name: "PET_STATUS"
    }),
    MENU: new LogicState({
        name: "MENU"
    }),
    IN_BATTLE: new LogicState({
        name: "IN_BATTLE"
    })
};

var SCREEN_STATES = {
    CARE: new LogicState({
        name: "CARE"
    }),
    MAP: new LogicState({
        name: "MAP",
        substates: [
            new LogicState({
                name: "NT"
            }),
            new LogicState({
                name: "QLD"
            }),
            new LogicState({
                name: "NSW"
            })
        ]
    }),
    STATS: new LogicState({
        name: "STATS"
    }),
    STEPS: new LogicState({
        name: "STEPS",
        substates: [
            new LogicState({
                name: "TOTAL_STEPS"
            })
        ]
    }),
    PETS: new LogicState({
        name: "PETS"
    })
};

var BATTLE_STATES = {
    START_BATTLE: new LogicState({name: "START_BATTLE"}),
    BATTLE_MENU: new LogicState({name: "BATTLE_MENU"}),
    FASTER_ATTACKS: new LogicState({name: "FASTER_ATTACKS"}),
    SLOWER_ATTACKS: new LogicState({name: "SLOWER_ATTACKS"}),
    FINISH_BATTLE: new LogicState({name: "FINISH_BATTLE"})
};

var ARROW_KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

var DEBUG_KEY = 68; // the letter d

var ESCAPE_KEY = 27; // the escape key

var S_KEY = 83; // the s key

// === SPRITE CONSTANTS === //

var drawingBoard = document.getElementById("ctx").getContext("2d");

var DEFAULT_SPRITE_SIZE = 16;
var DEFAULT_SCREEN_SIZE = {
    X: 45,
    Y: 20
};

var DEFAULT_SPRITE_POSITIONS = {
    IDLE: 0,
    IDLE2: 16,
    ATTACK: 32,
    SICK: 48,
    HAPPY: 64,
    WALKING: 80,
    WALKING2: 96
};

var NUMBER_PX_SIZE = {
    HEIGHT: 5,
    WIDTH: 5
};

var NUMBER_POSITIONS = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];