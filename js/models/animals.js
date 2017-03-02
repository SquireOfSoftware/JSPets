function Animal(name, isPet, stats, walkingStatus, animalType) {
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

    this.setupLevel = function(level) {
        // this is used by the biome set up enemy function
        if (level > this.maxLevel)
            level = this.maxLevel; // prevent overflows
        for(var counter = 0; counter < level; counter++){
            this.evolveStats();
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

var cat = new Animal(
    "CAT",
    false,
    new Stats(
        9, 4, 1, // hp, attack, speed
        2, 8, 1, // hpBuff, attackBuff, speedBuff
        2, 3, 6),// maxLvl, blockability, escapability
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.CAT
);

var duck = new Animal(
    "DUCK",
    true,
    new Stats(
        8, 4, 1,
        3, 4, 1,
        3, 0, 0),
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.DUCK
);

var penguin = new Animal(
    "PENGUIN",
    false,
    new Stats(
        8, 4, 1,
        3, 4, 2,
        3, 0, 0),
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.PENGUIN
);

var pelican = new Animal(
    "PELICAN",
    false,
    new Stats(
        12, 3, 1,
        3, 3, 1,
        3, 0, 0),
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.PELICAN
);

var seal = new Animal(
    "SEAL",
    false,
    new Stats(
        12, 5, 1,
        3, 2, 0,
        3, 0, 0),
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.SEAL
);

var sandcastle = new Animal(
    "SANDCASTLE",
    false,
    new Stats(
        20, 4, 1,
        3, 3, 0,
        3, 0, 0),
    ANIMAL_STATES.IDLE,
    ANIMAL_TYPES.SANDCASTLE
);

function BiomeState(state, animals) {
    this.state = state;
    // add animals here, also need to test out if battle broke
    this.maxEncounter = 0;
    this.animals = animals;

    for(var counter = 0; counter < animals.length; counter++) {
        this.maxEncounter += animals[counter].percentage;
    }

    this.getRandomEnemy = function() {
        var randomIndex = Math.floor(Math.random() * (this.maxEncounter));

        for(var counter = 0; counter < this.animals.length; counter++) {
            console.log("randomIndex:", randomIndex, this.animals[counter].animal.name);
            if ((randomIndex - this.animals[counter].percentage) > 0)
                randomIndex -= this.animals[counter].percentage;
            else
                return this.animals[counter].animal;
        }

    };
}

function AnimalChance(animal, percentage) {
    this.animal = animal;
    this.percentage = percentage;
}

var biomes = [
    new BiomeState(
        BIOMES.BEACH,
        [
            new AnimalChance(seal, 8),
            new AnimalChance(penguin, 4),
            new AnimalChance(pelican, 10),
            new AnimalChance(duck, 5),
            new AnimalChance(sandcastle, 1)
        ]
    ),
    new BiomeState(
        BIOMES.COASTAL,
        [

        ]
    )
];

function generateEnemy(biomeState) {
    // locate the biome
    var biome = null;

    for (var biomeCounter = 0; biomeCounter < biomes.length; biomeCounter++) {
        if (biomes[biomeCounter].state === biomeState) {
            //biome =
            return biomes[biomeCounter].getRandomEnemy();
        }
    }
    return undefined; // need to return enemy
}
function getCurrentEnemySprite() {
    var enemyType = game.currentEnemy.type;
    if (enemyType === ANIMAL_TYPES.CAT) {
        return catSprite;
    }
    else if (enemyType === ANIMAL_TYPES.SEAL) {
        return sealSprite;
    }
    else if (enemyType === ANIMAL_TYPES.PENGUIN) {
        return penguinSprite;
    }
    else if (enemyType === ANIMAL_TYPES.PELICAN) {
        return pelicanSprite;
    }
    else if (enemyType === ANIMAL_TYPES.SANDCASTLE) {
        return sandcastleSprite;
    }
    else if (enemyType === ANIMAL_TYPES.DUCK) {
        return duckSprite;
    }
    else
        console.log("Unrecognisable animal type: ", enemyType);
}