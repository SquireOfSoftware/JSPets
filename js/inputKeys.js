/**
 * Created by JarvisWalker on 27/1/17.
 */

var lastKeyPress = null;
var keyPressBuffer = [];

function Key (name, keyCode) {
    this.pressed = false;
    this.hold = false;
    this.released = false;
    this.name = name;
    this.keyCode = keyCode;
}

var keys = {
    up: new Key("UP", ARROW_KEYS.UP),
    down: new Key("DOWN", ARROW_KEYS.DOWN),
    right: new Key("RIGHT", ARROW_KEYS.RIGHT),
    left: new Key("LEFT", ARROW_KEYS.LEFT)
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

var asyncRender = false;

var blockKeyPress = false;

function toggleKeyPress() {
    blockKeyPress = !blockKeyPress;
    lastKeyPress = null; // clear whatever was pressed if it was pressed
    if(blockKeyPress)
        addLine("Key presses disabled");
    else
        addLine("Key presses enabled");
}

function interpretKeys() {
    // process this on the screen
    if (lastKeyPress !== null && !blockKeyPress) {
        addLine(lastKeyPress.name + " was pressed");
        switch(lastKeyPress.keyCode) {
            case ARROW_KEYS.DOWN:
                game.currentScreenState.down();
                break;
            case ARROW_KEYS.UP:
                game.currentScreenState.up();
                break;
            case ARROW_KEYS.LEFT:
                game.currentScreenState.left();
                break;
            case ARROW_KEYS.RIGHT:
                game.currentScreenState.right();
                break;
        }
        updateScreens();

        console.log(game.currentScreenState.state.name);
        lastKeyPress = null;
    }
}

function walk() {
    // this is triggered on click or on step
    if (game.pet.state === ANIMAL_STATES.IDLE ||
        game.pet.state === ANIMAL_STATES.WALKING) {
        game.stepCounter.total = game.stepCounter.total.add(1);
        game.stepCounter.currentSteps++;
        game.stepCounter.hasRecentlyStepped = true;
        game.stepCounter.resetWaitPeriod();
        //petScreen.resetTickPeriod();
        document.getElementById("steps").value = game.stepCounter.total.toString();

    }
    if (game.stepCounter.currentSteps > game.currentMap.stepCount) {
        toggleKeyPress();
        game.stepCounter.currentSteps = 0;
        game.pet.state = ANIMAL_STATES.IN_BATTLE;
        game.currentEnemy.state = ANIMAL_STATES.IN_BATTLE;
        game.currentScreenState = cryState;//SCREEN_STATES.START_BATTLE.substates.CRY;
        // generate the enemy here and store it in the game variable
        updateScreens();
    }
    //console.log(game.pet.state, game.currentScreenState);
}
