/**
 * Created by JarvisWalker on 27/1/17.
 */

function Key () {
    this.pressed = false;
    this.hold = false;
    this.released = false;
}

var keys = {
    up: new Key(),
    down: new Key(),
    right: new Key(),
    left: new Key()
};

function processKeyDown(event) {
    switch(event.keyCode) {
        case ARROW_KEYS.UP:
            break;
        case ARROW_KEYS.LEFT:
            break;
        case ARROW_KEYS.RIGHT:
            break;
        case ARROW_KEYS.DOWN:
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
    }
}
