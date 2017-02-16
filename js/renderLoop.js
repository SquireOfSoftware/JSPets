/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true; // the boolean that is controlled by debug

var currentScreen = petScreen;

function updateScreens() {
    // only triggered when a button is pressed or when a walk has reached a checkpoint
    // check if game state has changed
    if (currentScreen.referenceState !== game.currentScreenState.state) {
        // change screen
        var currentScreenState = game.currentScreenState.state;
        if(currentScreenState === SCREEN_STATES.PETS)
            currentScreen = petScreen;
        else if (currentScreenState === SCREEN_STATES.MAP)
            currentScreen = menuScreen[0];
        else if (currentScreenState === SCREEN_STATES.CARE)
            currentScreen = menuScreen[1];
        else if (currentScreenState === SCREEN_STATES.STATS)
            currentScreen = menuScreen[2];
        else if (currentScreenState === SCREEN_STATES.STEPS) {
            currentScreen = menuScreen[3];
        }
        else if (currentScreenState === SCREEN_STATES.STEPS.substates.TOTAL_STEPS) {
            currentScreen = totalStepsScreen;
            currentScreen.newScreen = true;
        }
        else if (currentScreenState === SCREEN_STATES.START_BATTLE) {
            currentScreen = battleScreens.CRY;
            addLine("Battle screen triggered");
        }
        else if (currentScreenState === SCREEN_STATES.FIGHT) {
            currentScreen = battleMenuScreen.FIGHT;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP) {
            currentScreen = battleMenuScreen.POWER_UP;
        }
        else if (currentScreenState === SCREEN_STATES.AUTO) {
            currentScreen = battleMenuScreen.AUTO;
        }
        else if (currentScreenState === SCREEN_STATES.RUN) {
            currentScreen = battleMenuScreen.RUN;
        }
        else if (currentScreenState === SCREEN_STATES.ATTACK_SEQUENCE) {
            currentScreen = attackSequenceScreen.LAUNCHING_ATTACK;
        }
        else if (currentScreenState === SCREEN_STATES.HAPPY_PET) {
            currentScreen = statusScreens.HAPPY_ANIMATION;
        }
        else if (currentScreenState === SCREEN_STATES.SADDENED_PET) {
            currentScreen = statusScreens.SADDENED_ANIMATION;
        }
        else {
            //currentScreen = petScreen;
            addLine("Cannot locate screen: " + game.state);
        }
        //clearScreen();
        drawingBoard.clearEntireScreen();
    }
}

function draw() {
    if (DRAW_TO_SCREEN === true) {
        currentScreen.update();
        currentScreen.draw();
    }
}

function toggleDrawing() {
    DRAW_TO_SCREEN = !DRAW_TO_SCREEN;
    if (DRAW_TO_SCREEN === true)
        addLine("Rendering has been enabled");
    else
        addLine("Rendering has been disabled");
}
