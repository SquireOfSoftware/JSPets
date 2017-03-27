/**
 * Created by JarvisWalker on 27/3/17.
 */

// this purely holds the steps, the buff aspect is related to the actual screen states
function Cooldown(state, maxSteps, specialFunction) {
    // step period
    // current steps at the moment
    // whether or not it is ready
    this.name = state.name;
    this.state = state;
    //var maxSteps = maxSteps;
    this.currentSteps = 0;

    this.isReady = false;

    // count a new step - should stop when hit the max
    // using the cooldown
    this.increment = function () {
        if (this.isReady === false) {
            if (this.currentSteps < maxSteps)
                this.currentSteps++;
            else {
                this.isReady = true;
            }
        }
    };

    this.use = function() {
        if (this.isReady === true) {
            this.isReady = false;
            this.currentSteps = 0;
            specialFunction();
        }
    }
}

var buffCooldowns = {
    hp: new Cooldown( // heals only 50% max, rounded up
        COOLDOWN_TYPES.HP_HEAL, 100,
        function() {
            game.pet.stats.currentStats.hp += Math.round(game.pet.stats.currentStats.maxHp / 2);

            var petHp = game.pet.stats.currentStats.hp;
            var maxPetHp = game.pet.stats.currentStats.maxHp;

            if (petHp >= maxPetHp) {
                game.pet.stats.currentStats.hp = game.pet.stats.currentStats.maxHp;
            }
        }
    ),
    attack: new Cooldown( // want to double the attack
        COOLDOWN_TYPES.ATTACK_BUFF, 700,
        function() {
            game.pet.stats.currentStats.attack *= 2;
        }
    ),
    speed: new Cooldown(
        COOLDOWN_TYPES.SPEED_BUFF, 300,
        function() {
            game.pet.stats.currentStats.speed *= 2;
        }
    ),
    championEvolve: new Cooldown(
        COOLDOWN_TYPES.CHAMPION_BUFF, 500,
        function() {
            if (game.pet.stats.currentLevel < 2)
                game.pet.stats.evolveStats();
            else
                console.log("There is no further evolution for this animal");
        }
    ),
    ultimateEvolve: new Cooldown(
        COOLDOWN_TYPES.ULTIMATE_BUFF, 1000,
        function() {
            var levelDifference = game.pet.stats.maxLevel - game.pet.stats.currentLevel;

            if (levelDifference > 0) {
                for(var counter = levelDifference; counter > 0; counter--)
                    game.pet.stats.evolveStats();
            }
            else
                console.log("There is no further evolution for this animal");
        }
    )
};

function incrementCooldowns() {
    buffCooldowns.hp.increment();
    buffCooldowns.attack.increment();
    buffCooldowns.speed.increment();
    buffCooldowns.championEvolve.increment();
    buffCooldowns.ultimateEvolve.increment();
}
