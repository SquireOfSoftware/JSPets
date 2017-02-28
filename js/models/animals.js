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

function Stats(hp, attack, speed, hpBuff, attackBuff, speedBuff, maxLevel, blockBonus, escapeBonus) {
	this.hp = hp;
	this.attack = attack;
	this.speed = speed;
	
	this.hpBuff = hpBuff;
	this.attackBuff = attackBuff;
	this.speedBuff = speedBuff;
	
	this.currentLevel = 0;
	this.maxLevel = maxLevel;
	
	this.blockBonus = blockBonus;
	this.escapeBonus = escapeBonus;
	
	this.evolveStats = function() {
		// buff the stats in accordance with the level and buffs
	}
	
	this.devolveStats = function() {
		// be sure to round evenly off when devolving
		// goal is that you "take less damage" whilst evolved
	}
	
	this.walkingHeal = function() {
		// heal whilst walking
	}
}

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

/*
function BiomeState(state, animals) {
	this.state = state;
	
}*/