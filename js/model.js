/**
 * Created by JarvisWalker on 6/1/17.
 */

var game = {
    state: GAME_STATES.PET_STATUS,
    pet: new Animal({
        name: "PET",
        stats: {
            hp: 10,
            attk: 5,
            spd: 7
        }
    })
};

function Animal(options) {
    this.name = options.name;
    this.stats = {
        hp: options.stats.hp,
        attk: options.stats.attk,
        spd: options.stats.spd
    };

    if (options.state !== undefined)
        this.state = options.state;
    else
        this.state = ANIMAL_STATES.IDLE;

}

function update() {
    // Need to figure out how to link this to a screen
    if (steps.hasRecentlyStepped) {
        game.pet.state = ANIMAL_STATES.WALKING;
        steps.waitPeriod--;
        if (steps.waitPeriod < 0) {
            steps.hasRecentlyStepped = false;
            game.pet.state = ANIMAL_STATES.IDLE;
            //steps.waitPeriod = 0;
        }
    }
}