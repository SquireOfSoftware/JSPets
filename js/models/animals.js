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
        speed: speed,
        maxHp: hp
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
            this.currentStats.hp += this.buffs.hp * this.originalStats.hp;
            this.currentStats.attack += this.buffs.attack;
            this.currentStats.speed += this.buffs.speed;

            this.currentStats.maxHp += this.buffs.hp * this.originalStats.hp;
        }
    };
    
    this.devolveStats = function() {
        // be sure to round evenly off when devolving
        // goal is that you "take less damage" whilst evolved
        if (this.currentLevel > 1) {
            
            this.currentStats.hp = Math.floor(this.currentStats.hp / this.currentLevel);

            this.currentStats.attack = this.originalStats.attack;
            this.currentStats.speed = this.originalStats.speed;

            this.currentStats.maxHp = this.originalStats.hp;

            this.currentLevel = 1;
        }

        // aim to reset back to original state, but hp drops to whatever the equivalent is
    };

    this.setupDifficulty = function(difficulty) {
        if (this.maxLevel > 1){
            // generate a random number - scale this value according to maxLevel
            // this is equally distributed 
            // I want to skew this in accordance to what level it is
            // so that it is easier for easy levels, harder for harder levels
            var randomRoll = Math.random() * 10; // this gives us the value to place in equation
            
            var randomLevel = this.maxLevel * Math.exp(-((Math.pow(randomRoll - difficulty,2))/(this.maxLevel * 10)));
            // ceiling the value to closest integer
            
            randomLevel = Math.ceil(randomLevel);
            //randomLevel = 2; // This is a test
            // evolve it that many times
            
            for(var counter = 0; counter < randomLevel && randomLevel > 1; counter++){
                this.evolveStats();
            }
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
    
    this.getString = function() {
        return [
            this.currentStats.hp.toString(),
            this.currentStats.attack.toString(),
            this.currentStats.speed.toString()
        ];
    };
}

function getAnimalState(state) {
    if (state === ANIMAL_TYPES.BAT)
        return new AnimalState(
            "BAT",
            false,
            new Stats(
                6, 6, 1,
                1, 2, 2,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.BAT
        );
    else if (state === ANIMAL_TYPES.BEE)
        return new AnimalState(
            "BEE",
            false,
            new Stats(
                7, 5, 3, // hp, attack, speed
                1, 1, 1, // hpBuff, attackBuff, speedBuff
                3, 0, 0),// maxLvl, blockability, escapability
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.BEE
        );
    else if (state === ANIMAL_TYPES.BUTTERFLY)
        return new AnimalState(
            "BUTTERFLY",
            false,
            new Stats(
                8, 4, 1, 
                1, 1, 1, 
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.BUTTERFLY
        );
    else if (state === ANIMAL_TYPES.CAT)
        return new AnimalState(
            "CAT",
            false,
            new Stats(
                9, 6, 1, 
                1, 1, 1, 
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.CAT
        );
    else if (state === ANIMAL_TYPES.COCKATOO)
        return new AnimalState(
            "COCKATOO",
            false,
            new Stats(
                8, 5, 1, 
                1, 1, 1, 
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.COCKATOO
        );
    else if (state === ANIMAL_TYPES.CROCODILE)
        return new AnimalState(
            "CROCODILE",
            false,
            new Stats(
                16, 12, 0, 
                1, 1, 1, 
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.CROCODILE
        );
    else if (state === ANIMAL_TYPES.DOG)
        return new AnimalState(
            "DOG",
            false,
            new Stats(
                7, 7, 1,
                1, 3, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.DOG
        );
    else if (state === ANIMAL_TYPES.DUCK)
        return new AnimalState(
            "DUCK",
            false,
            new Stats(
                8, 4, 1,
                1, 4, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.DUCK
        );
    else if (state === ANIMAL_TYPES.ECHIDNA)
        return new AnimalState(
            "ECHIDNA",
            false,
            new Stats(
                8, 6, 1,
                1, 1, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.ECHIDNA
        );
    else if (state === ANIMAL_TYPES.FOX)
        return new AnimalState(
            "FOX",
            false,
            new Stats(
                8, 8, 1,
                1, 1, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.FOX
        );
    else if (state === ANIMAL_TYPES.FRIDGE)
        return new AnimalState(
            "KELVINATOR",
            false,
            new Stats(
                80, 10, 1,
                1, 0, 0,
                1, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.FRIDGE
        );
    else if (state === ANIMAL_TYPES.FROG)
        return new AnimalState(
            "FROG",
            false,
            new Stats(
                5, 5, 1,
                1, 2, 2,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.FROG
        );
    else if (state === ANIMAL_TYPES.KANGAROO)
        return new AnimalState(
            "KANGAROO",
            false,
            new Stats(
                8, 8, 2,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.KANGAROO
        );
    else if (state === ANIMAL_TYPES.KOOKABURRA)
        return new AnimalState(
            "KOOKABURRA",
            false,
            new Stats(
                9, 5, 1,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.KOOKABURRA
        );
    else if (state === ANIMAL_TYPES.LORIKEET)
        return new AnimalState(
            "LORIKEET",
            false,
            new Stats(
                7, 6, 1,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.LORIKEET
        );
    else if (state === ANIMAL_TYPES.OWL)
        return new AnimalState(
            "OWL",
            false,
            new Stats(
                9, 5, 1,
                1, 1, 0,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.OWL
        );
    else if (state === ANIMAL_TYPES.PELICAN)
        return new AnimalState(
            "PELICAN",
            false,
            new Stats(
                12, 6, 1,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PELICAN
        );
    else if (state === ANIMAL_TYPES.PENGUIN)
        return new AnimalState(
            "PENGUIN",
            false,
            new Stats(
                6, 5, 1,
                1, 3, 2,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PENGUIN
        );
    else if (state === ANIMAL_TYPES.PIG)
        return new AnimalState(
            "PIG",
            false,
            new Stats(
                10, 4, 1,
                1, 1, 0,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PIG
        );
    else if (state === ANIMAL_TYPES.PLATYPUS)
        return new AnimalState(
            "PLATYPUS",
            false,
            new Stats(
                8, 7, 1,
                1, 1, 2,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.PLATYPUS
        );
    else if (state === ANIMAL_TYPES.RABBIT)
        return new AnimalState(
            "RABBIT",
            false,
            new Stats(
                8, 3, 2,
                1, 1, 2,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.RABBIT
        );
    else if (state === ANIMAL_TYPES.SANDCASTLE)
        return new AnimalState(
            "SANDCASTLE",
            false,
            new Stats(
                20, 4, 0,
                1, 3, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SANDCASTLE
        );
    else if (state === ANIMAL_TYPES.SEAL)
        return new AnimalState(
            "SEAL",
            false,
            new Stats(
                12, 5, 1,
                1, 2, 0,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SEAL
        );
    else if (state === ANIMAL_TYPES.SNAKE)
        return new AnimalState(
            "SNAKE",
            false,
            new Stats(
                8, 10, 1,
                1, 1, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SNAKE
        );
    else if (state === ANIMAL_TYPES.SNOWMAN)
        return new AnimalState(
            "SNOWMAN",
            false,
            new Stats(
                36, 12, 1,
                1, 0, 0,
                1, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.SNOWMAN
        );
    else if (state === ANIMAL_TYPES.TASMANIAN_DEVIL)
        return new AnimalState(
            "TASMANIAN_DEVIL",
            false,
            new Stats(
                9, 4, 1,
                1, 1, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.TASMANIAN_DEVIL
        );
    else if (state === ANIMAL_TYPES.TASMANIAN_TIGER)
        return new AnimalState(
            "TASMANIAN_TIGER",
            false,
            new Stats(
                15, 15, 1,
                1, 1, 1,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.TASMANIAN_TIGER
        );
    else if (state === ANIMAL_TYPES.TURTLE)
        return new AnimalState(
            "TURTLE",
            false,
            new Stats(
                12, 3, 1,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.TURTLE
        );
    else if (state === ANIMAL_TYPES.WHALE)
        return new AnimalState(
            "WHALE",
            false,
            new Stats(
                36, 15, 1,
                1, 1, 0,
                2, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.WHALE
        );
    else if (state === ANIMAL_TYPES.WOMBAT)
        return new AnimalState(
            "WOMBAT",
            false,
            new Stats(
                7, 8, 1,
                1, 1, 1,
                3, 0, 0),
            ANIMAL_STATES.IDLE,
            ANIMAL_TYPES.WOMBAT
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
            if ((randomIndex - this.animalStates[counter].percentage) >= 0)
                randomIndex -= this.animalStates[counter].percentage;
            else {
                return this.animalStates[counter].animalState;
            }
        }

    };
}

function AnimalChance(animalState, percentage) {
    this.animalState = animalState;
    this.percentage = percentage;
}

var biomes = [
    new BiomeState(
        BIOMES.ALPINE,
        [
            new AnimalChance(ANIMAL_TYPES.ECHIDNA, 8),
            new AnimalChance(ANIMAL_TYPES.SNOWMAN, 3),
            new AnimalChance(ANIMAL_TYPES.FROG, 5),
            new AnimalChance(ANIMAL_TYPES.FRIDGE, 2)
        ]
    ),
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
            new AnimalChance(ANIMAL_TYPES.LORIKEET, 10),
            new AnimalChance(ANIMAL_TYPES.PELICAN, 10),
            new AnimalChance(ANIMAL_TYPES.PENGUIN, 6),
            new AnimalChance(ANIMAL_TYPES.PLATYPUS, 3),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 10),
            new AnimalChance(ANIMAL_TYPES.SEAL, 2),
            new AnimalChance(ANIMAL_TYPES.TASMANIAN_DEVIL, 10),
            new AnimalChance(ANIMAL_TYPES.WOMBAT, 1)
        ]
    ),
    new BiomeState(
        BIOMES.CRAGS,
        [
            new AnimalChance(ANIMAL_TYPES.BAT, 3),
            new AnimalChance(ANIMAL_TYPES.ECHIDNA, 3),
            new AnimalChance(ANIMAL_TYPES.FRIDGE, 2),
            new AnimalChance(ANIMAL_TYPES.TASMANIAN_DEVIL, 10),
            new AnimalChance(ANIMAL_TYPES.FROG, 3)
        ]
    ),
    new BiomeState(
        BIOMES.RAINFOREST,
        [
            new AnimalChance(ANIMAL_TYPES.BAT, 10),
            new AnimalChance(ANIMAL_TYPES.BEE, 8),
            new AnimalChance(ANIMAL_TYPES.COCKATOO, 5),
            new AnimalChance(ANIMAL_TYPES.ECHIDNA, 8),
            new AnimalChance(ANIMAL_TYPES.KANGAROO, 10),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 10),
            new AnimalChance(ANIMAL_TYPES.OWL, 10),
            new AnimalChance(ANIMAL_TYPES.PLATYPUS, 10),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 8),
            new AnimalChance(ANIMAL_TYPES.SNAKE, 3),
            new AnimalChance(ANIMAL_TYPES.TASMANIAN_DEVIL, 10)
        ]
    ),
    new BiomeState(
        BIOMES.GRASSLANDS,
        [
            new AnimalChance(ANIMAL_TYPES.BEE, 10),
            new AnimalChance(ANIMAL_TYPES.BUTTERFLY, 10),
            new AnimalChance(ANIMAL_TYPES.COCKATOO, 10),
            new AnimalChance(ANIMAL_TYPES.ECHIDNA, 6),
            new AnimalChance(ANIMAL_TYPES.KANGAROO, 8),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 5),
            new AnimalChance(ANIMAL_TYPES.OWL, 5),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 10),
            new AnimalChance(ANIMAL_TYPES.WOMBAT, 8)
        ]
    ),
    new BiomeState(
        BIOMES.LAKES,
        [
            new AnimalChance(ANIMAL_TYPES.DUCK, 10),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 5),
            new AnimalChance(ANIMAL_TYPES.LORIKEET, 5),
            new AnimalChance(ANIMAL_TYPES.PLATYPUS, 10),
            new AnimalChance(ANIMAL_TYPES.SANDCASTLE, 1),
            new AnimalChance(ANIMAL_TYPES.TURTLE, 5)
        ]
    ),
    new BiomeState(
        BIOMES.MARINE,
        [
            new AnimalChance(ANIMAL_TYPES.DUCK, 10),
            new AnimalChance(ANIMAL_TYPES.PELICAN, 3),
            new AnimalChance(ANIMAL_TYPES.PENGUIN, 1),
            new AnimalChance(ANIMAL_TYPES.SEAL, 2),
            new AnimalChance(ANIMAL_TYPES.TURTLE, 10),
            new AnimalChance(ANIMAL_TYPES.WHALE, 5)
        ]
    ),
    new BiomeState(
        BIOMES.PLAINS,
        [
            new AnimalChance(ANIMAL_TYPES.BUTTERFLY, 10),
            new AnimalChance(ANIMAL_TYPES.COCKATOO, 10),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 8),
            new AnimalChance(ANIMAL_TYPES.LORIKEET, 10),
            new AnimalChance(ANIMAL_TYPES.OWL, 5),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 10),
            new AnimalChance(ANIMAL_TYPES.SNAKE, 3)
        ]
    ),
    new BiomeState(
        BIOMES.SUPER_NATURAL,
        [
            new AnimalChance(ANIMAL_TYPES.CROCODILE, 1),
            new AnimalChance(ANIMAL_TYPES.FOX, 1),
            new AnimalChance(ANIMAL_TYPES.TASMANIAN_TIGER, 3)
        ]
    ),
    new BiomeState(
        BIOMES.URBAN,
        [
            new AnimalChance(ANIMAL_TYPES.BAT, 3),
            new AnimalChance(ANIMAL_TYPES.COCKATOO, 10),
            new AnimalChance(ANIMAL_TYPES.CAT, 10),
            new AnimalChance(ANIMAL_TYPES.DOG, 10),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 5),
            new AnimalChance(ANIMAL_TYPES.LORIKEET, 10),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 10),
            new AnimalChance(ANIMAL_TYPES.TASMANIAN_DEVIL, 2)
        ]
    ),
    new BiomeState(
        BIOMES.WETLANDS,
        [
            new AnimalChance(ANIMAL_TYPES.DUCK, 10),
            new AnimalChance(ANIMAL_TYPES.PIG, 10),
            new AnimalChance(ANIMAL_TYPES.KOOKABURRA, 3),
            new AnimalChance(ANIMAL_TYPES.PELICAN, 6),
            new AnimalChance(ANIMAL_TYPES.PLATYPUS, 10),
            new AnimalChance(ANIMAL_TYPES.RABBIT, 8),
            new AnimalChance(ANIMAL_TYPES.SNAKE, 3),
            new AnimalChance(ANIMAL_TYPES.TURTLE, 5),
            new AnimalChance(ANIMAL_TYPES.WOMBAT, 8)
        ]
    )
];

function generateEnemy(biomeState, difficulty) {
    // locate the biome

    for (var biomeCounter = 0; biomeCounter < biomes.length; biomeCounter++) {
        if (biomes[biomeCounter].state === biomeState) {
            var enemyState = biomes[biomeCounter].getRandomEnemyState();
            var enemy = getAnimalState(enemyState);
            enemy.stats.setupDifficulty(difficulty);
            return enemy;
        }
    }
    return undefined; // need to return enemy
}