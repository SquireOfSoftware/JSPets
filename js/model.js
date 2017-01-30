/**
 * Created by JarvisWalker on 6/1/17.
 */
/*
function Game() {
    this.state = GAME_STATES.PET_STATUS;
    this.pet = null;

    this.getPetState = function() {return this.pet.state;};
}*/

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
/*
var game = new Game();
game.pet = new Animal({
    name: "PET",
    stats: {
        hp: 10,
        attk: 5,
        spd: 7
    }
});*/

function update() {

}