/**
 * Created by JarvisWalker on 27/1/17.
 */

var lastKeyPress = null;
var keyPressBuffer = {
    buffer: [],
    reset: function() {
        this.buffer = [];
    }
};

function Key (name, keyCode) {
    /*this.pressed = false;
    this.hold = false;
    this.released = false;*/
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

function enableKeyPress() {
    blockKeyPress = false;
    lastKeyPress = null;
    addLine("Key presses enabled");
}

function disableKeyPress() {
    blockKeyPress = true;
    lastKeyPress = null;
    addLine("Key presses disabled");
}

function interpretKeys() {
    // process this on the screen
    if (lastKeyPress !== null && !blockKeyPress) {
        addLine(lastKeyPress.name + " was pressed");
		var currentScreenState = game.currentScreenState.state;
        if(currentScreenState !== SCREEN_STATES.ATTACK_SEQUENCE) {
            switch (lastKeyPress.keyCode) {
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
        }
        else {
            keyPressBuffer.buffer.push(lastKeyPress);
        }
        lastKeyPress = null;
    }
}

function takeAStep() {
    game.stepCounter.total = game.stepCounter.total.add(1);
    game.stepCounter.currentSteps++;
    game.stepCounter.hasRecentlyStepped = true;
    game.stepCounter.resetWaitPeriod();

    incrementCooldowns();
}

function walk() {
    // this is triggered on click or on step
    if (!blockKeyPress) {
        if (game.pet.state === ANIMAL_STATES.IDLE ||
            game.pet.state === ANIMAL_STATES.WALKING) {
            takeAStep();
            document.getElementById("steps").value = game.stepCounter.total.toString();
            if (game.stepCounter.currentSteps % 100 === 0)
                game.pet.stats.walkingHeal();

        }
        if (game.stepCounter.currentSteps >= australia.TAS.regions[game.currentRegion][game.currentCity].stepCount) {
            disableKeyPress();
            foregroundBoard.clearEntireScreen();
            game.stepCounter.currentSteps = 0;
            game.pet.state = ANIMAL_STATES.IN_BATTLE;

            var currentCity = australia.TAS.regions[game.currentRegion][game.currentCity];

            var randomBiomeState = currentCity.getRandomBiome();

            game.currentEnemy = generateEnemy(randomBiomeState, currentCity.difficulty);

            game.currentEnemy.state = ANIMAL_STATES.IN_BATTLE;

            enemySprite = getSprite(game.currentEnemy.type, game.currentEnemy);
            //enemySprite.referenceObject = game.currentEnemy;
            enemySprite.isEvolved = game.currentEnemy.stats.currentLevel - 1;

            game.currentScreenState = cryState;//SCREEN_STATES.START_BATTLE.substates.CRY;
            // generate the enemy here and store it in the game variable
            updateScreens();
        }
    }
}

