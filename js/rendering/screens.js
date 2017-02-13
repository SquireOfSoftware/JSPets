/**
 * Created by JarvisWalker on 13/2/17.
 */

function ScreenPosition(options) {
    var firstScreenX = options.firstScreenX;
    var firstScreenY = options.firstScreenY;
    this.currentPosition = {
        x: firstScreenX,
        y: firstScreenY
    };
    if (options.canvasX !== undefined)
        this.canvasX = options.canvasX;
    else
        this.canvasX = 0;

    if (options.canvasY !== undefined)
        this.canvasY = options.canvasY;
    else
        this.canvasY = 0;

    var multiplier;
    if (options.multiplier !== undefined)
        multiplier = options.multiplier;
    else
        multiplier = DEFAULT_SCREEN_SIZE.X;
}

function ScreenSprite(options) {
    this.name = options.name;
    this.image = options.image;
    if(options.context !== undefined)
        this.context = options.context;
    else
        this.context = drawingBoard;

    this.referenceState = options.referenceState;

    var size;
    if (options.size !== undefined)
        size = options.size;
    else
        size = {width: DEFAULT_SCREEN_SIZE.X, height: DEFAULT_SCREEN_SIZE.Y};

    if (options.update !== undefined)
        this.update = options.update;
    else
        this.update = function() {};

    if (options.screenPosition !== undefined)
        this.screenPosition = options.screenPosition;
    else
        this.screenPosition = new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 0,
            canvasX: 0,
            canvasY: 0
        }); // this is just a dummy frame

    if (options.draw !== undefined)
        this.draw = options.draw;
    else {
        this.draw = function () {
            // Need to figure out xy coordinates
            //this.context.clearRect(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);
            this.context.clearSection(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);
            this.context.drawImage(
                this.image,
                this.screenPosition.currentPosition.x,
                this.screenPosition.currentPosition.y,
                size.width,
                size.height,
                this.screenPosition.canvasX,
                this.screenPosition.canvasY,
                size.width,
                size.height
            );
        };
    }
}

var petScreen = new ScreenSprite({
    name: "PET_SCREEN",
    image: null,
    context: null,
    referenceState: SCREEN_STATES.PETS,
    update: function() {
        // check whether a button has been pressed
        // handle button press accordingly
        game.stepCounter.updateWalkingFrame();
        petSprite.update();

    },
    draw: function() {
        petSprite.draw();
    }
});

var menuScreen = [
    new ScreenSprite({
        name: "MAP_MENU",
        image: generateImage("sprites/screens/map-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.MAP,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "CARE_MENU",
        image: generateImage("sprites/screens/care-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.CARE,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "STATS_MENU",
        image: generateImage("sprites/screens/stats-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.STATS,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    }),
    new ScreenSprite({
        name: "STEPS_MENU",
        image: generateImage("sprites/screens/steps-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.STEPS,
        screenPosition: new ScreenPosition({
            firstScreenX: 0,
            firstScreenY: 0,
            maxScreens: 1
        }),
        update: function() {
            game.stepCounter.updateWalkingFrame();
        }
    })
];

var totalStepsScreen = new ScreenSprite({
    name: "STEPS_SCREEN",
    image: generateImage("sprites/step-alphabet.png"),
    context: drawingBoard,
    referenceState: SCREEN_STATES.STEPS.substates.TOTAL_STEPS,
    update: function() {
        game.stepCounter.updateWalkingFrame();
        this.totalSteps = game.stepCounter.total.toString();
    },
    draw: function() {
        var digitPositionCounter = {
            column: 10,
            row: 2
        };
        if (this.previousStepsCounted === undefined)
            this.previousStepsCounted = "0";

        for(var index = this.totalSteps.length - 1; index > -1; index --) {
            if (this.newScreen || this.newScreen === undefined) {
                this.context.drawImage(
                    this.image,
                    NUMBER_POSITIONS[parseInt(this.totalSteps.charAt(index))], // x position
                    0,
                    NUMBER_PX_SIZE.WIDTH, // width on spritesheet
                    NUMBER_PX_SIZE.HEIGHT, // height on spritesheet
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH, // width on canvas
                    NUMBER_PX_SIZE.HEIGHT // height on canvas
                );
            }
            else if (this.previousStepsCounted.charAt(index) !== this.totalSteps.charAt(index)) {
                this.context.clearSection(
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH,
                    NUMBER_PX_SIZE.HEIGHT);
                this.context.drawImage(
                    this.image,
                    NUMBER_POSITIONS[parseInt(this.totalSteps.charAt(index))], // x position
                    0,
                    NUMBER_PX_SIZE.WIDTH, // width on spritesheet
                    NUMBER_PX_SIZE.HEIGHT, // height on spritesheet
                    digitPositionCounter.column * 4,
                    digitPositionCounter.row * 6,
                    NUMBER_PX_SIZE.WIDTH, // width on canvas
                    NUMBER_PX_SIZE.HEIGHT // height on canvas
                );
            }
            digitPositionCounter.column--;
            if (digitPositionCounter.column === -1) {
                digitPositionCounter.column = 10;
                digitPositionCounter.row--;
                // will still draw I believe even off screen
            }
        }
        this.newScreen = false;
        this.previousStepsCounted = this.totalSteps;
    }
});

var battleScreens = {
    CRY: new ScreenSprite({
        name: "CRY_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.CRY,
        update: function() {
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = 6; // TEST
            this.tick--;
            petSprite.update();
            cryingOutSprite.update();
            if (this.tick < 0){
                currentScreen = battleScreens.SLIDE;
                currentScreen.update();
                this.context.flipHorizontally();
                /* For testing purposes
                 currentScreen = battleMenuScreen.FIGHT;
                 game.currentScreenState = fightBattleState;
                 toggleKeyPress();*/
            }
        },
        draw: function() {
            //clearScreen();
            this.context.clearEntireScreen();
            petSprite.draw();
            cryingOutSprite.draw();
        }
    }),
    SLIDE: new ScreenSprite({
        name: "SLIDE_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.SLIDE,
        update: function() {
            if (this.tick === undefined || this.tick < 0) { // the zero is to reset the animation
                this.tick = 3;
                this.context.clearEntireScreen(); // for some odd reason the screen isnt cleared properly
            }
            this.tick--;
            if (this.enemySprite === undefined ||
                this.enemySprite.referenceObject !== game.currentEnemy) {
                if (game.currentEnemy.type === ANIMAL_TYPES.CAT) {
                    this.enemySprite = catSprite;
                }
            }
            this.enemySprite.update();

            if (this.tick < 0){
                currentScreen = battleScreens.GROWL;
                currentScreen.update();
            }
        },
        draw: function() {
            this.enemySprite.draw();
        }
    }),
    GROWL: new ScreenSprite({
        name: "GROWL_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.GROWL,
        update: function() {
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = 6;
            this.tick--;

            if (this.enemySprite === undefined ||
                this.enemySprite.referenceObject !== game.currentEnemy) {
                if (game.currentEnemy.type === ANIMAL_TYPES.CAT) {
                    this.enemySprite = catSprite;
                }
            }
            this.enemySprite.update();

            if (this.tick < 0){
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                this.context.restore();
                toggleKeyPress();
            }
        },
        draw: function() {
            this.enemySprite.draw();
        }
    })
};

var battleMenuScreen = {
    FIGHT: new ScreenSprite({
        name: "FIGHT",
        image: generateImage("sprites/screens/fight-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.FIGHT
    }),
    POWER_UP: new ScreenSprite({
        name: "POWER_UP",
        image: generateImage("sprites/screens/evolve-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.POWER_UP
    }),
    AUTO: new ScreenSprite({
        name: "AUTO",
        image: generateImage("sprites/screens/care-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.AUTO
    }),
    RUN: new ScreenSprite({
        name: "RUN",
        image: generateImage("sprites/screens/run-battle-menu.png"),
        context: drawingBoard,
        referenceState: SCREEN_STATES.RUN
    })
};

var cryingOutSprite = new ScreenSprite({
    name: "CRYING_OUT_SPRITE",
    image: generateImage("sprites/battle-seq-circle.png"),
    context: drawingBoard,
    update: function() {
        if(this.tick === undefined || this.tick < 0)
            this.tick = 6;
        this.tick--;
    },
    draw: function() {
        if (this.tick % 2 === 0)
            this.context.drawImage(
                this.image,
                0,
                0,
                45,
                20,
                0,
                0,
                45,
                20
            );
    }
});

var attackSequenceScreen = {
    LAUNCHING_ATTACK: new ScreenSprite({
        name: "LAUNCHING_ATTACK",
        image: null,
        context: drawingBoard,
        update: function() {

        },
        draw: function() {

        }
    })
};