/**
 * Created by JarvisWalker on 6/1/17.
 */

var game = {
    state: GAME_STATES.PET_STATUS
};

function Animal(name, stats) {
    this.name = name;
    this.stats = {
        hp: stats.hp,
        attk: stats.attk,
        spd: stats.spd
    };
}

function update() {

}