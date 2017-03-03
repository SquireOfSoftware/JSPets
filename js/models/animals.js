function AnimalState(name, isPet, stats, walkingStatus, animalType) {
    this.name = name;

    this.stats = stats;

    if (isPet !== undefined)
        this.isPet = isPet;
    else
        this.isPet = false;

    if (walkingStatus !== undefined)
        this.state = walkingStatus;
    else
        this.state = ANIMAL_STATES.IDLE;

    this.type = animalType;
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
            this.currentStats.attack += this.buffs.attack;
            this.currentStats.speed += this.buffs.speed;

            console.log(this.currentStats);
        }
    };
    
    this.devolveStats = function() {
        // be sure to round evenly off when devolving
        // goal is that you "take less damage" whilst evolved
        if (this.currentLevel > 1) {
            var remainderHp = this.currentStats.hp % Math.pow(this.buffs.hp, this.currentLevel - 1);
            if (remainderHp > 0) {
                console.log(remainderHp);
                this.currentStats.hp -= remainderHp;
            }

            this.currentStats.hp /= Math.pow(this.buffs.hp, this.currentLevel - 1);
            this.currentStats.attack = this.originalStats.attack;
            this.currentStats.speed = this.originalStats.speed;

            this.currentLevel = 1;
        }

        // aim to reset back to original state, but hp drops to whatever the equivalent is
    };

    this.setupDifficulty = function(difficulty) {
        if (this.maxLevel > 1){// && this.currentLevel > 1) {
            // generate a random number - scale this value according to maxLevel
            //var randomLevel = Math.ceil(Math.random() * (this.maxLevel));
            // this is equally distributed 
            // I want to skew this in accordance to what level it is
            // so that it is easier for easy levels, harder for harder levels
            var randomRoll = Math.random() * 10; // this gives us the value to place in equation
            
            var randomLevel = this.maxLevel * Math.exp(-((Math.pow(randomRoll - difficulty,2))/(this.maxLevel * 10)))
            
            // ceiling the value to closest integer
            
            randomLevel = Math.ceil(randomLevel);
            
            // evolve it that many times
            
            /*
            if (level > this.maxLevel)
                level = this.maxLevel; // prevent overflows
            */
            for(var counter = 0; counter < randomLevel; counter++){
                this.evolveStats();
            }
            //this.currentLevel = randomLevel;
            console.log(randomLevel, this.currentLevel, Math.ceil(randomLevel));
        }
    };

    this.fullyRestoreStats = function() {
        this.currentStats.hp = this.originalStats.hp;
        this.currentStats.attack = this.originalStats.attack;
        this.currentStats.speed = this.originalStats.speed;
    };
    
    this.walkingHeal = function() {
        // heal whilst walking
        if (this.currentStats.hp < this.originalStats.hp)
            this.currentStats.hp++;
    };
}

function getAnimalState(state) {
    if (state === ANIMAL_TYPES.DUCK)
        return new AnimalState(
            "DUCK",
            false,
            new Stats(
                8, 4, 1,
                3, 4, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.DUCK
        );
    else if (state === ANIMAL_TYPES.CAT)
        return new AnimalState(
            "CAT",
            false,
            new Stats(
                9, 4, 1, // hp, attack, speed
                2, 8, 1, // hpBuff, attackBuff, speedBuff
                2, 3, 6),// maxLvl, blockability, escapability
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.CAT
        );
    else if (state === ANIMAL_TYPES.PENGUIN)
        return new AnimalState(
            "PENGUIN",
            false,
            new Stats(
                8, 4, 1,
                3, 4, 2,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PENGUIN
        );    
    else if (state === ANIMAL_TYPES.PELICAN)
        return new AnimalState(
            "PELICAN",
            false,
            new Stats(
                12, 3, 1,
                3, 3, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PELICAN
        );
    else if (state === ANIMAL_TYPES.SEAL)
        return new AnimalState(
            "SEAL",
            false,
            new Stats(
                12, 5, 1,
                3, 2, 0,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SEAL
        );
    else if (state === ANIMAL_TYPES.SANDCASTLE)
        return new AnimalState(
            "SANDCASTLE",
            false,
            new Stats(
                20, 4, 1,
                3, 3, 0,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SANDCASTLE
        );
    else
        console.log("Unrecognised state for animal state creation: ", state);
}

function BiomeState(state, animalStates) {
    this.state = state;
    // add animals here, also need to test out if battle broke
    this.maxEncounter = 0;
    this.animalStates = animalStates;

    for(var counter = 0; counter < animalStates.length; counter++) {
        this.maxEncounter += animalStates[counter].percentage;
    }

    this.getRandomEnemyState = function() {
        var randomIndex = Math.floor(Math.random() * (this.maxEncounter));

        for(var counter = 0; counter < this.animalStates.length; counter++) {
            console.log("randomIndex:", randomIndex, this.animalStates[counter].animalState.name);
            if ((randomIndex - this.animalStates[counter].percentage) > 0)
                randomIndex -= this.animalStates[counter].percentage;
            else
                return this.animalStates[counter].animalState;
        }

    };
}

function AnimalChance(animalState, percentage) {
    this.animalState = animalState;
    this.percentage = percentage;
}

var biomes = [
    new BiomeState(
        BIOMES.BEACH,
        [
            new AnimalChance(ANIMAL_TYPES.SEAL, 8),
            new AnimalChance(ANIMAL_TYPES.PENGUIN, 4),
            new AnimalChance(ANIMAL_TYPES.PELICAN, 10),
            new AnimalChance(ANIMAL_TYPES.DUCK, 5),
            new AnimalChance(ANIMAL_TYPES.SANDCASTLE, 1)
        ]
    ),
    new BiomeState(
        BIOMES.COASTAL,
        [

        ]
    )
];

function generateEnemy(biomeState, difficulty) {
    // locate the biome

    for (var biomeCounter = 0; biomeCounter < biomes.length; biomeCounter++) {
        if (biomes[biomeCounter].state === biomeState) {
            //biome =
            var enemyState = biomes[biomeCounter].getRandomEnemyState();
            var enemy = getAnimalState(enemyState);
            enemy.stats.setupDifficulty(difficulty);
            console.log("stats", enemy.stats.currentStats);
            return enemy;
        }
    }
    return undefined; // need to return enemy
}