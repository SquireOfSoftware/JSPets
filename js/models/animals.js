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
    this.currentStats = {
        hp: hp,
        attack: attack,
        speed: speed
    };

    this.originalStats = {
        hp: hp,
        attack: attack,
        speed: speed
    };

    this.buffs = {
        hp: hpBuff,
        attack: attackBuff,
        speed: speedBuff,
        block: blockBonus,
        escape: escapeBonus
    };

    this.currentLevel = 1;
    this.maxLevel = maxLevel;

    this.evolveStats = function() {
        // buff the stats in accordance with the level and buffs
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            this.currentStats.hp *= this.buffs.hp;

            this.currentStats.speed += this.buffs.speed;

            console.log(this.currentStats);
        }
    };
    
    this.devolveStats = function() {
        // be sure to round evenly off when devolving
        // goal is that you "take less damage" whilst evolved
        if (this.currentLevel > 1) {
            // 10, 30, 90
            // 9, 27-29, 81-89

            var remainderHp = this.currentStats.hp % Math.pow(this.buffs.hp, this.currentLevel - 1);
            //var remainderHp = Math.pow((this.buffs.hp * this.originalStats.hp), this.currentLevel) - this.currentStats.hp;
            if (remainderHp > 0) {
                console.log(remainderHp);
                this.currentStats.hp -= remainderHp;
            }

            this.currentStats.hp /= Math.pow(this.buffs.hp, this.currentLevel - 1);
            //console.log(this.currentStats, this.buffs.hp, this.currentLevel);
            this.currentStats.attack = this.originalStats.attack;
            this.currentStats.speed = this.originalStats.speed;

            this.currentLevel = 1;
        }

        // aim to reset back to original state, but hp drops to whatever the equivalent is
    };
    
    this.walkingHeal = function() {
        // heal whilst walking
        if (this.currentStats.hp < this.originalStats.hp)
            this.currentStats.hp++;
    };
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

function BiomeState(state, animals) {
    this.state = state;
    
}