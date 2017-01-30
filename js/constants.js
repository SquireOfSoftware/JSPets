/**
 * Created by JarvisWalker on 6/1/17.
 */

function LogicState(options) {
    this.name = options.name;
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
    PET_STATUS: 0, // can be idle or walking
    MENU: 1, // status and battle menu - means limited
    IN_BATTLE: 2, // encountering a battle
    getState: function(number) {
        switch(number) {
            case 0: return "PET_STATUS";
            case 1: return "MENU";
            case 2: return "IN_BATTLE";
            default: return "UNDEFINED";
        }
    }
};

var BATTLE_STATES = {
    START_BATTLE: 0,
    BATTLE_MENU: 1,
    ATTACK_SEQUENCE: 2,
    FINISH_BATTLE: 3,
    getState: function(number) {
        switch(number) {
            case 0: return "START_BATTLE";
            case 1: return "BATTLE_MENU";
            case 2: return "ATTACK_SEQUENCE";
            case 3: return "FINISH_BATTLE";
            default: return "UNDEFINED";
        }
    }
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

var DEFAULT_SPRITE_SIZE = 16;