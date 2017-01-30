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
            lastKeyPress = keys.up;
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

function interpretKeys() {
    if (lastKeyPress !== null) {
        addLine(lastKeyPress.name + " was pressed");
        lastKeyPress = null;
    }
}
