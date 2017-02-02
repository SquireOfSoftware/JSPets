/**
 * Created by JarvisWalker on 27/1/17.
 */

var lastKeyPress = null;
var keyPressBuffer = [];

function Key (name) {
    this.pressed = false;
    this.hold = false;
    this.released = false;
    this.name = name;
}

var keys = {
    up: new Key("UP"),
    down: new Key("DOWN"),
    right: new Key("RIGHT"),
    left: new Key("LEFT")
};

function processKeyDown(event) {
    switch(event.keyCode) {
        case ARROW_KEYS.UP:
            //keys.up.pressed = true;
            //keys.up.hold = true;
            lastKeyPress = keys.up.pressed;
            //addLine("I pressed UP");
            break;
        case ARROW_KEYS.LEFT:
            lastKeyPress = keys.left;
            break;
        case ARROW_KEYS.RIGHT:
            lastKeyPress = keys.right;
            break;
        case ARROW_KEYS.DOWN:
            lastKeyPress = keys.down;
            break;
        case DEBUG_KEY:
            toggleDebug();
            break;
        case S_KEY:
            toggleDrawing();
            break;
        case ESCAPE_KEY:
            toggleGameLoop();
            break;
        default:
            console.log(event.keyCode);
            lastKeyPress = null;
    }
}

//function

function interpretKeys() {
    if (lastKeyPress !== null) {
    //if (keys.up.pressed) {
        addLine(lastKeyPress.name + " was pressed");
        lastKeyPress = null;
        //addLine("I pressed UP");
    }
}

var steps = {
    total: bigInt(0),
    hasRecentlyStepped: false,
    delay: 50,
    waitPeriod: this.delay,
    resetWaitPeriod: function() {this.waitPeriod = this.delay;}
};

function walk() {
    // this is triggered on click or on step
    if (game.pet.state === ANIMAL_STATES.IDLE ||
        game.pet.state === ANIMAL_STATES.WALKING) {
        steps.total = steps.total.add(1);
        steps.hasRecentlyStepped = true;
        //steps.waitPeriod = 3;
        steps.resetWaitPeriod();
        document.getElementById("steps").value = steps.total.toString();
        addLine("Step was taken");
    }
}
