/**
 * Created by JarvisWalker on 6/1/17.
 */

function LogicState(options) {
    this.name = options.name;
    if (options.substates !== undefined)
        this.substates = options.substates;
	
	if (options.value !== undefined)
		this.value = options.value;
}

var ANIMAL_STATES = {
    IDLE: new LogicState({
        name: "IDLE"
        // default state
        // timeeout state as well
        // if you win you biomes on this
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
        // biomes on this if you run (chance) or you lose a battle
    })
};

// use this as a multiplier for stats as well
var EVOLUTION_STATES = {
    BASIC: new LogicState({
        name: "BASIC",
		value: 0
    }),
    CHAMPION: new LogicState({
        name: "CHAMPION",
		value: 1
    }),
    ULTIMATE: new LogicState({
        name: "ULTIMATE",
		value: 2
    })
};

var ANIMAL_TYPES = {
	BAT: new LogicState({
        name: "BAT"
    }),
    BEE: new LogicState({
        name: "BEE"
    }),
	BUTTERFLY: new LogicState({
        name: "BUTTERFLY"
    }),
    CAT: new LogicState({
        name: "CAT"
    }),
	COCKATOO: new LogicState({
        name: "COCKATOO"
    }),
	CROCODILE: new LogicState({
        name: "CROCODILE"
    }),
    DOG: new LogicState({
        name: "DOG"
    }),
    DUCK: new LogicState({
        name: "DUCK"
    }),
	ECHIDNA: new LogicState({
        name: "ECHIDNA"
    }),
	FOX: new LogicState({
        name: "FOX"
    }),
	FRIDGE: new LogicState({
        name: "FRIDGE"
    }),
	FROG: new LogicState({
        name: "FROG"
    }),
    KANGAROO: new LogicState({
        name: "KANGAROO"
    }),
	KOOKABURRA: new LogicState({
        name: "KOOKABURRA"
    }),
	LORIKEET: new LogicState({
        name: "LORIKEET"
    }),
	OWL: new LogicState({
        name: "OWL"
    }),
	PELICAN: new LogicState({
        name: "PELICAN"
    }),
	PENGUIN: new LogicState({
        name: "PENGUIN"
    }),
	PIG: new LogicState({
        name: "PIG"
    }),
	PLATYPUS: new LogicState({
        name: "PLATYPUS"
    }),
	RABBIT: new LogicState({
        name: "RABBIT"
    }),
	SANDCASTLE: new LogicState({
        name: "SANDCASTLE"
    }),
	SEAL: new LogicState({
        name: "SEAL"
    }),
	SNAKE: new LogicState({
        name: "SNAKE"
    }),
	SNOWMAN: new LogicState({
        name: "SNOWMAN"
    }),
	TURTLE: new LogicState({
        name: "TURTLE"
    }),
	TASMANIAN_DEVIL: new LogicState({
        name: "TASMANIAN_DEVIL"
    }),
	TASMANIAN_TIGER: new LogicState({
        name: "TASMANIAN_TIGER"
    }),
	WHALE: new LogicState({
        name: "WHALE"
    }),
	WOMBAT: new LogicState({
        name: "WOMBAT"
    }),
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
            TAS: new LogicState({
                name: "TAS",
                substates: {
                    NORTH: new LogicState({
                        name: "NORTH"
                    }),
                    SOUTH: new LogicState({
                        name: "SOUTH"
                    })
                }
            })
        }
    }),
    PETS: new LogicState({
        name: "PETS"
    }),
    STATS: new LogicState({
        name: "STATS",
        substates: {
            CURRENT_STATS: new LogicState ({
                name: "CURRENT_STATS"
            })
        }
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
                name: "EVOLVE",
                substates: {
                    TO_CHAMPION: new LogicState({
                        name: "TO_CHAMPION"
                    }),
                    TO_ULTIMATE: new LogicState({
                        name: "TO_ULTIMATE"
                    })
                }
            }),
			EVOLVING: new LogicState({
				name: "EVOLVING"
			}),
            BOOSTS: new LogicState({
                name: "BOOSTS"
            }),
            HEAL_HALF: new LogicState({
                name: "HEAL_HALF"
            }),
            DOUBLE_ATTACK: new LogicState({
                name: "DOUBLE_ATTACK"
            }),
            DOUBLE_SPEED: new LogicState({
                name: "DOUBLE_SPEED"
            })
        }
    }),
    AUTO: new LogicState({
        name: "AUTO"
    }),
    RUN: new LogicState({
        name: "RUN"
    }),
    ATTACK_SEQUENCE: new LogicState({
        name: "ATTACK_SEQUENCE",
        substates: {
            LAUNCHING_ATTACK: new LogicState({
                name: "LAUNCHING_ATTACK"
            }),
            ATTACK: new LogicState({
                name: "ATTACK"
            }),
            RECEIVING_ATTACK: new LogicState({
                name: "RECEIVING_ATTACK"
            }),
            GETTING_HIT: new LogicState({
                name: "GETTING_HIT"
            }),
            DODGING: new LogicState({
                name: "DODGING"
            }),
            CALCULATING_DAMAGE: new LogicState({
                name: "CALCULATING_DAMAGE"
            })
        }
    }),
    // == GENERAL == //
    HAPPY_PET: new LogicState({
        name: "HAPPY_PET"
    }),
    SADDENED_PET: new LogicState({
        name: "SADDENED_PET"
    }),
	DEVOLVING: new LogicState({
		name: "DEVOLVING",
		substates: {
			SAD: new LogicState({
				name: "SAD"
			}),
			IDLE: new LogicState({
				name: "IDLE"
			}),
			HAPPY: new LogicState({
				name: "HAPPY"
			})
		}
	}),
    ENDINGS: new LogicState({
        name: "ENDINGS",
        substates: {
            FINAL_SCENE: new LogicState({
                name: "FINAL_SCENE"
            }),
            THANK_YOU: new LogicState({
                name: "THANK_YOU"
            })
        }
    }),
    INTRO: new LogicState({
        name: "INTRO"
    }),
    BOOSTS_ANIMATIONS: new LogicState({
        name: "BOOSTS_ANIMATIONS",
        substates: {
            HEALING_HALF: new LogicState({
                name: "HEALING_HALF"
            }),
            DOUBLING_ATTACK: new LogicState({
                name: "DOUBLING_ATTACK"
            }),
            DOUBLING_SPEED: new LogicState({
                name: "DOUBLING_SPEED"
            }),
            TO_CHAMPION: new LogicState({
                name: "TO_CHAMPION"
            }),
            TO_ULTIMATE: new LogicState({
                name: "TO_ULTIMATE"
            })
        }
    })
};

// === MAP CONSTANTS === //

// http://www.australia.gov.au/about-australia/australian-story/austn-weather-and-the-seasons
var BIOMES = {
	ALPINE: new LogicState({ // snow
        name: "ALPINE"
    }),
	BEACH: new LogicState({
        name: "BEACH"
    }),
    COASTAL: new LogicState({
        name: "COASTAL"
    }),
	CRAGS: new LogicState({ // rocks
        name: "CRAGS"
    }),
    GRASSLANDS: new LogicState({ // plains
        name: "GRASSLANDS"
    }),
    LAKES: new LogicState({ 
        name: "LAKES"
    }),
    MARINE: new LogicState({ 
        name: "MARINE"
    }),
	PLAINS: new LogicState({ // valley
        name: "PLAINS"
    }),
    RAINFOREST: new LogicState({
        name: "RAINFOREST"
    }),
	SUPER_NATURAL: new LogicState({ // ghosts
        name: "SUPER NATURAL"
    }),
    URBAN: new LogicState({
        name: "URBAN"
    }),
    WETLANDS: new LogicState({
        name: "WETLANDS"
    })
};

var MAP_STATES = {
    TAS: new LogicState({
        name: "TAS",
		substates: {
			REDPA: new LogicState({
				name: "Redpa"
			}),
			SMITHTON: new LogicState({
				name: "Smithton"
			}),
			BURNIE_SOMERSET: new LogicState({
				name: "Burnie-Somerset"
			}),
			CRADLE_MOUNTAIN: new LogicState({
				name: "Cradle Mountain"
			}),
			DELORAINE: new LogicState({
				name: "Deloraine"
			}),
			GEORGE_TOWN: new LogicState({
				name: "George Town"
			}),
			MUSSELROE_BAY: new LogicState({
				name: "Musselroe Bay"
			}),
			SCAMANDER: new LogicState({
				name: "Scamander"
			}),
			LAUNCESTON: new LogicState({
				name: "Launceston"
			}),
			CAMPBELL_TOWN: new LogicState({
				name: "Campbell Town"
			}),
			DERWENT_BRIDGE: new LogicState({
				name: "Derwent Bridge"
			}),
			QUEENSTOWN: new LogicState({
				name: "Queenstown"
			}),
			STRAHAN: new LogicState({
				name: "Strahan"
			}),
			STRATHGORDON: new LogicState({
				name: "Strathgordon"
			}),
			BOTHWELL: new LogicState({
				name: "Bothwell"
			}),
			TRIABUNNA: new LogicState({
				name: "Triabunna"
			}),
			HOBART: new LogicState({
				name: "Hobart"
			}),
			PORT_ARTHUR: new LogicState({
				name: "Port Arthur"
			})
		}
    })
};

// === COOL DOWNS === //

var COOLDOWN_TYPES = {
    HP_HEAL: new LogicState({
        name: "HP_HEAL"
    }),
    ATTACK_BUFF: new LogicState({
        name: "ATTACK_BUFF"
    }),
    SPEED_BUFF: new LogicState({
        name: "SPEED_BUFF"
    }),
    CHAMPION_BUFF: new LogicState({
        name: "CHAMPION_BUFF"
    }),
    ULTIMATE_BUFF: new LogicState({
        name: "ULTIMATE_BUFF"
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

var DEFAULT_SPRITE_SIZE = 16;
var DEFAULT_SCREEN_SIZE = {
    X: 45,
    Y: 20
};

var NUMBER_PX_SIZE = {
    HEIGHT: 5,
    WIDTH: 5
};

var HP_BOUNDARIES = {
    STARTING_HEIGHT: DEFAULT_SCREEN_SIZE.Y - NUMBER_PX_SIZE.HEIGHT - 1,
    STARTING_X_COORD: DEFAULT_SCREEN_SIZE.X - NUMBER_PX_SIZE.WIDTH,
    INCREMENT: NUMBER_PX_SIZE
};

// LETTERS AND NUMBERS

var NUMBER_POSITIONS = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

//var LETTER_POSITIONS = [];