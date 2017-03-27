/**
 * Created by JarvisWalker on 27/3/17.
 */

// this purely holds the steps, the buff aspect is related to the actual screen states
function Cooldown(state, maxSteps) {
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
        }
    }
}

var buffCooldowns = {
    hp: new Cooldown(COOLDOWN_TYPES.HP_HEAL, 100), // heals only 50% max
    attack: new Cooldown(COOLDOWN_TYPES.ATTACK_BUFF, 700),
    speed: new Cooldown(COOLDOWN_TYPES.SPEED_BUFF, 300),
    championEvolve: new Cooldown(COOLDOWN_TYPES.CHAMPION_BUFF, 500),
    ultimateEvolve: new Cooldown(COOLDOWN_TYPES.ULTIMATE_BUFF, 1000)
};