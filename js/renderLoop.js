/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true; // the boolean that is controlled by debug

var currentScreen = petScreen;
//var currentScreen = endingGameScene.FINAL_SCENE;
//var currentScreen = introScene;

function updateScreens() {
    // only triggered when a button is pressed or when a walk has reached a checkpoint
    // check if game state has changed
    if (currentScreen.referenceState !== game.currentScreenState.state) {
        // change screen
        var currentScreenState = game.currentScreenState.state;
        //console.log(currentScreenState);
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
        else if (currentScreenState === SCREEN_STATES.CHANGE.substates.MENU) {
            currentScreen = changeScreens.MENU;
        }

        else if (currentScreenState === SCREEN_STATES.STEPS.substates.TOTAL_STEPS) {
            currentScreen = totalStepsScreen;
            currentScreen.newScreen = true;
        }
        else if (currentScreenState === SCREEN_STATES.START_BATTLE) {
            currentScreen = battleScreens.CRY;
        }
        else if (currentScreenState === SCREEN_STATES.FIGHT) {
            currentScreen = battleMenuScreen.FIGHT;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP) {
            currentScreen = battleMenuScreen.POWER_UP;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.BOOSTS) {
            currentScreen = powerUpScreens.HOME;
        }

        // Boosts and their animations
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.HEAL_HALF) {
            currentScreen = powerUpScreens.HEAL_HALF;
        }
        else if (currentScreenState === SCREEN_STATES.BOOSTS_ANIMATIONS.substates.HEALING_HALF) {
            currentScreen = boostAnimationsScreens.HEALING_HALF;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.DOUBLE_ATTACK) {
            currentScreen = powerUpScreens.DOUBLE_ATTACK;
        }
        else if (currentScreenState === SCREEN_STATES.BOOSTS_ANIMATIONS.substates.DOUBLING_ATTACK) {
            currentScreen = boostAnimationsScreens.DOUBLING_ATTACK;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.DOUBLE_SPEED) {
            currentScreen = powerUpScreens.DOUBLE_SPEED;
        }
        else if (currentScreenState === SCREEN_STATES.BOOSTS_ANIMATIONS.substates.DOUBLING_SPEED) {
            currentScreen = boostAnimationsScreens.DOUBLING_SPEED;
        }

        /*
        else if (currentScreenState === SCREEN_STATES.AUTO) {
            currentScreen = battleMenuScreen.AUTO;
        }*/
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
		else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.EVOLVE) {
			currentScreen = battleMenuScreen.EVOLVE;
		}
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.EVOLVE.substates.TO_CHAMPION) {
            currentScreen = powerUpScreens.CHAMPION;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.EVOLVE.substates.TO_ULTIMATE) {
            currentScreen = powerUpScreens.ULTIMATE;
        }

		else if (currentScreenState === SCREEN_STATES.DEVOLVING.substates.IDLE) {
			currentScreen = statusScreens.IDLE_DEVOLVE_ANIMATION;
		}
        else if (currentScreenState === SCREEN_STATES.MAP.substates.TAS.substates.NORTH) {
            currentScreen = mapScreens.NORTH;
        }
        else if (currentScreenState === SCREEN_STATES.MAP.substates.TAS.substates.SOUTH) {
            currentScreen = mapScreens.SOUTH;
        }
        else if (currentScreenState === SCREEN_STATES.STATS.substates.CURRENT_STATS) {
            currentScreen = currentStatScreen;
        }
        else if (currentScreenState === SCREEN_STATES.ENDINGS.substates.FINAL_SCENE) {
            currentScreen = endingGameScene.FINAL_SCENE;
        }
        else if (currentScreenState === SCREEN_STATES.INTRO) {
            currentScreen = introScene;
        }
        else if (currentScreenState === SCREEN_STATES.POWER_UP.substates.EVOLVING ||
            currentScreenState === SCREEN_STATES.BOOSTS_ANIMATIONS.substates.TO_CHAMPION ||
            currentScreenState === SCREEN_STATES.BOOSTS_ANIMATIONS.substates.TO_ULTIMATE) {
            currentScreen = statusScreens.EVOLVE_ANIMATION;
        }
        else {
            //currentScreen = petScreen;
            //addLine("Cannot locate screen: " + game.currentScreenState.state.name);
			console.log(game.currentScreenState);
        }
        drawingBoard.clearEntireScreen();
        foregroundBoard.clearEntireScreen();
    }
	/*else
		console.log("current screen state", game.currentScreenState);*/
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
