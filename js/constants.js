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

var EVOLUTION_STATES = {
    BABY: new LogicState({
        name: "BABY"
    }),
    BASIC: new LogicState({
        name: "BASIC"
    }),
    CHAMPION: new LogicState({
        name: "CHAMPION"
    }),
    ULTIMATE: new LogicState({
        name: "ULTIMATE"
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
        name: "CARE",
        substates: {
            SWITCH: new LogicState({
                name: "SWITCH"
            })
        }
    }),
    MAP: new LogicState({
        name: "MAP",
        substates: {
            NT: new LogicState({
                name: "NT"
            }),
            QLD: new LogicState({
                name: "QLD"
            }),
            NSW: new LogicState({
                name: "NSW"
            }),
            VIC: new LogicState({
                name: "VIC"
            }),
            WA: new LogicState({
                name: "WA"
            }),
            TAS: new LogicState({
                name: "TAS"
            }),
            ACT: new LogicState({
                name: "ACT"
            })
        }
    }),
    PETS: new LogicState({
        name: "PETS"
    }),
    STATS: new LogicState({
        name: "STATS",
        substates: EVOLUTION_STATES
    }),
    STEPS: new LogicState({
        name: "STEPS",
        substates: {
            TOTAL_STEPS: new LogicState({
                name: "TOTAL_STEPS"
            }),
            NEXT_BATTLE: new LogicState({
                name: "NEXT_BATTLE"
            })
        }
    }),
    // == BATTLE STATES == //
    START_BATTLE: new LogicState({
        name: "BATTLE",
        substates: {
            CRY: new LogicState({
                name: "CRY"
            }),
            SLIDE: new LogicState({
                name: "SLIDE"
            }),
            GROWL: new LogicState({
                name: "GROWL"
            })
        }
    }),
    FIGHT: new LogicState({
        name: "FIGHT"
    }),
    POWER_UP: new LogicState({
        name: "POWER_UP",
        substates: {
            EVOLVE: new LogicState({
                name: "EVOLVE"
            })
        }
    }),
    AUTO: new LogicState({
        name: "AUTO"
    }),
    RUN: new LogicState({
        name: "RUN"
    })
};

var BATTLE_STATES = {
    START_BATTLE: new LogicState({name: "START_BATTLE"}),
    BATTLE_MENU: new LogicState({name: "BATTLE_MENU"}),
    FASTER_ATTACKS: new LogicState({name: "FASTER_ATTACKS"}),
    SLOWER_ATTACKS: new LogicState({name: "SLOWER_ATTACKS"}),
    FINISH_BATTLE: new LogicState({name: "FINISH_BATTLE"})
};

// === MAP CONSTANTS === //

// http://www.australia.gov.au/about-australia/australian-story/austn-weather-and-the-seasons
var LAND_TYPES = {
    COASTAL: new LogicState({
        name: "COASTAL"
    }),
    RAINFOREST: new LogicState({
        name: "RAINFOREST"
    }),
    GRASSLAND: new LogicState({
        name: "GRASSLAND"
    }),
    DESERT: new LogicState({
        name: "DESERT"
    }),
    SNOW: new LogicState({
        name: "SNOW"
    }),
    SWAMP: new LogicState({
        name: "SWAMP"
    }),
    FLOODLAND: new LogicState({
        name: "FLOODLAND"
    }),
    CITY: new LogicState({
        name: "CITY"
    }),
    UNDERGROUND: new LogicState({
        name: "UNDERGROUND"
    })
};

function MapStates(name, themes) {
    this.name = name;
    this.themes = themes;
}

var MAP_STATES = {
    NT: new MapStates("NT", []),
    QLD: new LogicState({
        name: "QLD"
    }),
    NSW: new LogicState({
        name: "NSW",
        substates: {
            SYDNEY: new LogicState({
                name: "SYDNEY"
            })
        }
    }),
    VIC: new LogicState({
        name: "VIC"
    }),
    WA: new LogicState({
        name: "WA"
    }),
    TAS: new LogicState({
        name: "TAS"
    }),
    ACT: new LogicState({
        name: "ACT"
    })
};

// === KEY CONSTANTS === //

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