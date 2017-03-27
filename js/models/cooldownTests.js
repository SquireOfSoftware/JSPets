/**
 * Created by JarvisWalker on 27/3/17.
 */

function hp_can_heal_rounded_up_maxHP() {
    var originalHp = game.pet.stats.currentStats.hp;
    var originalMaxHp = game.pet.stats.currentStats.maxHp;

    game.pet.stats.currentStats.hp = 3;
    game.pet.stats.currentStats.maxHp = 9;

    var originalBuffState = buffCooldowns.hp.isReady;

    buffCooldowns.hp.isReady = true;

    buffCooldowns.hp.use();

    console.log("hp_can_heal_rounded_up_maxHP", game.pet.stats.currentStats.hp === 8);

    // resetting the environment
    game.pet.stats.currentStats.hp = originalHp;
    game.pet.stats.currentStats.maxHp = originalMaxHp;

    buffCooldowns.hp.isReady = originalBuffState;
}

function hp_cant_heal_full_hp () {
    var originalHp = game.pet.stats.currentStats.hp;
    var originalMaxHp = game.pet.stats.currentStats.maxHp;

    game.pet.stats.currentStats.hp = 8;
    game.pet.stats.currentStats.maxHp = 8;

    var originalBuffState = buffCooldowns.hp.isReady;

    buffCooldowns.hp.isReady = true;

    buffCooldowns.hp.use();

    console.log("hp_cant_heal_full_hp", game.pet.stats.currentStats.hp === 8);

    // resetting the environment
    game.pet.stats.currentStats.hp = originalHp;
    game.pet.stats.currentStats.maxHp = originalMaxHp;

    buffCooldowns.hp.isReady = originalBuffState;
}

// test that the evolution jumps work (basic to champion) and

function evolve_basic_to_champion () {
    var originalBuffState = buffCooldowns.championEvolve.isReady;

    buffCooldowns.championEvolve.isReady = true;

    buffCooldowns.championEvolve.use();

    console.log("evolve_basic_to_champion", game.pet.stats.currentLevel === 2);

    // resetting the environment
    game.pet.stats.devolveStats();

    buffCooldowns.championEvolve.isReady = originalBuffState;
}

// (champion to ultimate) and

function evolve_champion_to_ultimate () {
    var originalBuffState = buffCooldowns.ultimateEvolve.isReady;
    //var originalLevel = game.pet.stats.currentLevel;
    game.pet.stats.evolveStats(); // should be in champion

    buffCooldowns.ultimateEvolve.isReady = true;

    buffCooldowns.ultimateEvolve.use();

    console.log("evolve_champion_to_ultimate", game.pet.stats.currentLevel === 3);

    // resetting the environment
    game.pet.stats.devolveStats();

    buffCooldowns.ultimateEvolve.isReady = originalBuffState;
}

// (basic to ultimate)
function evolve_basic_to_ultimate () {
    var originalBuffState = buffCooldowns.ultimateEvolve.isReady;
    var originalLevel = game.pet.stats.currentLevel;

    buffCooldowns.ultimateEvolve.isReady = true;

    buffCooldowns.ultimateEvolve.use();

    console.log("evolve_basic_to_ultimate", originalLevel === 1, game.pet.stats.currentLevel === 3);

    // resetting the environment
    game.pet.stats.devolveStats();

    buffCooldowns.ultimateEvolve.isReady = originalBuffState;
}

// cannot evolve when max
function evolve_cant_evolve_when_level_is_max_but_cooldown_is_consumed () {
    var originalBuffState = buffCooldowns.ultimateEvolve.isReady;
    var originalLevel = game.pet.stats.currentLevel;
    var originalHp = game.pet.stats.currentStats.hp;

    game.pet.stats.currentLevel = game.pet.stats.maxLevel;

    buffCooldowns.ultimateEvolve.isReady = true;

    buffCooldowns.ultimateEvolve.use();

    console.log("evolve_cant_evolve_when_level_is_max_but_cooldown_is_consumed",
        game.pet.stats.currentStats.hp === originalHp, // no stats should have changed
        game.pet.stats.currentLevel === game.pet.stats.maxLevel,
        buffCooldowns.ultimateEvolve.isReady === false // buff is still consumed
    );

    // resetting the environment
    game.pet.stats.currentLevel = originalLevel;

    buffCooldowns.ultimateEvolve.isReady = originalBuffState;
}

function attack_buff_doubles_attack_in_basic() {
    var originalAttack = game.pet.stats.currentStats.attack;
    var originalBuffState = buffCooldowns.attack.isReady;

    // assume pet is in basic

    game.pet.stats.currentStats.attack = 10;

    buffCooldowns.attack.isReady = true;
    buffCooldowns.attack.use();

    console.log("attack_buff_doubles_attack_in_basic",
        game.pet.stats.currentLevel === 1,
        game.pet.stats.currentStats.attack / 10 === 2
    );

    game.pet.stats.currentStats.attack = originalAttack;
    buffCooldowns.attack.isReady = originalBuffState;

}

function attack_buff_doubles_attack_in_champion() {
    var originalBasicAttack = game.pet.stats.currentStats.attack;
    var originalBuffState = buffCooldowns.attack.isReady;
    var originalEvolveAttackBuff = game.pet.stats.buffs.attack;

    // assume pet is in basic

    game.pet.stats.currentStats.attack = 10;
    game.pet.stats.buffs.attack = 1;

    game.pet.stats.evolveStats();

    buffCooldowns.attack.isReady = true;
    buffCooldowns.attack.use();

    console.log("attack_buff_doubles_attack_in_champion",
        game.pet.stats.currentLevel === 2,
        game.pet.stats.currentStats.attack === 22
    );

    game.pet.stats.currentStats.attack = originalBasicAttack;
    game.pet.stats.buffs.attack = originalEvolveAttackBuff;
    game.pet.stats.devolveStats();

    buffCooldowns.attack.isReady = originalBuffState;
}

// checkout speedbuff
function speed_buff_doubles_speed_in_basic() {
    var originalSpeed = game.pet.stats.currentStats.speed;
    var originalBuffState = buffCooldowns.speed.isReady;

    // assume pet is in basic

    game.pet.stats.currentStats.speed = 1;

    buffCooldowns.speed.isReady = true;
    buffCooldowns.speed.use();

    console.log("speed_buff_doubles_speed_in_basic",
        game.pet.stats.currentLevel === 1,
        game.pet.stats.currentStats.speed === 2
    );

    game.pet.stats.currentStats.speed = originalSpeed;
    buffCooldowns.speed.isReady = originalBuffState;

}

function cooldownTests() {
    console.log("Running cooldown tests");
    hp_can_heal_rounded_up_maxHP();
    hp_cant_heal_full_hp();
    evolve_basic_to_champion();
    evolve_champion_to_ultimate();
    evolve_basic_to_ultimate();
    evolve_cant_evolve_when_level_is_max_but_cooldown_is_consumed();
    attack_buff_doubles_attack_in_basic();
    attack_buff_doubles_attack_in_champion();
    speed_buff_doubles_speed_in_basic();
}

cooldownTests();