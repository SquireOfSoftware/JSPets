/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true; // the boolean that is controlled by debug

function SpritePosition(options) {
    var spriteSheetX = options.spriteSheetX;
    this.spriteSheetY = options.spriteSheetY;
    this.updatedSpriteSheetX = spriteSheetX;

    var canvasX = options.canvasX;
    this.canvasY = options.canvasY;
    this.updatedCanvasX = canvasX;

    var maxFrame = options.maxFrame;

    var multiplier;
    if (options.multiplier !== undefined)
        multiplier = options.multiplier;
    else
        multiplier = DEFAULT_SPRITE_SIZE;

    var currentFrameCounter = 0;
    this.update = function() {
        currentFrameCounter++;
        if (currentFrameCounter > maxFrame) {
            currentFrameCounter = 0;
        }
        this.updatedSpriteSheetX = spriteSheetX + multiplier * currentFrameCounter;
    };

    this.updateCanvas = function () {
        currentFrameCounter++;
        if (currentFrameCounter > maxFrame) {
            currentFrameCounter = 0;
        }
        this.updatedCanvasX = canvasX + multiplier * currentFrameCounter;
        //console.log(this.updatedCanvasX, this.canvasY);
    };

    this.getPosition = function () {
        return {
            spriteSheetX: this.updatedSpriteSheetX,
            spriteSheetY: this.spriteSheetY,
            canvasX: this.updatedCanvasX,
            canvasY: this.canvasY
        };
    };
}

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

function AnimalSprite(options) {
    this.image = options.image;
    this.referenceObject = options.referenceObject;

    //var context;
    if(options.context !== undefined)
        this.context = options.context;
    else
        this.context = drawingBoard;
/*
    if(options.visible !== undefined)
        this.visible = options.visible;
    else
        this.visible = false;
*/
    var idlePosition, walkingPosition, cryingOutPosition,
        sickPosition, happyPosition;
    if (options.idlePosition !== undefined)
        idlePosition = options.idlePosition;
    else
        idlePosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.IDLE,
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });

    this.currentPosition = idlePosition;

    if (options.walkingPosition !== undefined)
        walkingPosition = options.walkingPosition;
    else
        walkingPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.WALKING,
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.cryingOutPosition !== undefined) {
        cryingOutPosition = options.cryingOutPosition;
    }
    else
        cryingOutPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.ATTACK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.sickPosition !== undefined)
        sickPosition = options.sickPosition;
    else
        sickPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.SICK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.happyPosition !== undefined)
        happyPosition = options.happyPosition;
    else
        happyPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.HAPPY, // fourth position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.slidingPosition !== undefined)
        this.slidingPosition = options.slidingPosition;
    else
        this.slidingPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.IDLE, // fourth position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    var referenceState = ANIMAL_STATES.IDLE;

    if (options.flip !== undefined)
        this.flip = options.flip;
    else
        this.flip = false; // facing left

    //var size;
    if (options.size !== undefined)
        this.size = options.size;
    else
        this.size = {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE};

    if (options.update !== undefined)
        this.update = options.update;
    else // default to a pet object
        this.update = function() {
            if (this.referenceObject.state !== referenceState) {
                if (this.referenceObject.state === ANIMAL_STATES.IDLE) {
                    referenceState = ANIMAL_STATES.IDLE;
                    this.currentPosition = idlePosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.WALKING) {
                    referenceState = ANIMAL_STATES.WALKING;
                    this.currentPosition = walkingPosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.SICK) {
                    referenceState = ANIMAL_STATES.SICK;
                    this.currentPosition = sickPosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.IN_BATTLE) {
                    referenceState = ANIMAL_STATES.IN_BATTLE;
                    this.currentPosition = cryingOutPosition;
                }
            }
            this.currentPosition.update();
        };

    if (options.draw !== undefined)
        this.draw = options.draw;
    else
        this.draw = function() {
            var coordinates = this.currentPosition.getPosition();
            this.context.clearRect(coordinates.canvasX, coordinates.canvasY, this.size.width, this.size.height);
            //if(this.visible) {
                //var coordinates = this.currentPosition.getPosition();
                //console.log("Test", coordinates);
                this.context.drawImage(
                    this.image,
                    //this.currentPosition.updatedSpriteSheetX,
                    //this.currentPosition.spriteSheetY,
                    coordinates.spriteSheetX,
                    coordinates.spriteSheetY,
                    this.size.width,
                    this.size.height,
                    //this.currentPosition.canvasX,
                    //this.currentPosition.canvasY,
                    coordinates.canvasX,
                    coordinates.canvasY,
                    this.size.width,
                    this.size.height
                );
            //}
        };
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
            this.context.clearRect(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);

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

function generateImage(source) {
    var image = new Image();
    image.src = source;
    return image;
}

var petSprite = new AnimalSprite({
    image: generateImage("sprites/duckling.png"),
    context: drawingBoard,
    referenceObject: game.pet,
    idlePosition: new SpritePosition({
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 1,
        canvasX: 15,
        canvasY: 0
    }),
    walkingPosition:  new SpritePosition({
        spriteSheetX: 80, // fifth position on the sprite sheet
        spriteSheetY: 0,
        maxFrame: 1,
        canvasX: 15,
        canvasY: 0
    }),
    sickPosition: new SpritePosition({
        spriteSheetX: 48,
        spriteSheetY: 0,
        maxFrame: 0,
        canvasX: 15,
        canvasY: 0
    }),
    cryingOutPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: 15,
        canvasY: 0
    })
});

var catSprite = new AnimalSprite({
    image: generateImage("sprites/cat.png"),
    context: drawingBoard,
    referenceObject: cat,
    idlePosition: new SpritePosition({
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 1,
        canvasX: 15,
        canvasY: 0
    }),
    cryingOutPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: 15,
        canvasY: 0
    }),
    slidingPosition: new SpritePosition({
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 4,
        multiplier: -4,
        canvasX: 45,
        canvasY: 0
    }),
    barkingPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: DEFAULT_SCREEN_SIZE.X - DEFAULT_SPRITE_SIZE,
        canvasY: 0
    }),
    update: function() {
        //console.log("CAT SPRITE UPDATE", this.slide);
        if(this.slide !== undefined && this.slide === true) {// && this.tick !== undefined) {
            /*if (this.slidingX === undefined || this.slidingX > 16)
                this.slidingX = 0;
            else
                this.slidingX += 5;*/
            if (this.currentPosition !== this.slidingPosition)
                this.currentPosition = this.slidingPosition;
            this.currentPosition.updateCanvas();
            console.log(this.currentPosition.getPosition());
            // need to figure out how to shift a sprite over
            // probably do it manually

        }
        else {
            this.currentPosition.update();
        }
    }/*,
    draw: function() {
        //if (this.slide === true) {
            //this.context.clearRect()
        console.log(this.context, this.image);
        this.context.drawImage(
            this.image,
            0,
            0,
            16,
            16,
            0,
            0,
            16,
            16
        );
        //}
    }*/
});

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
                this.context.clearRect(
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
                this.tick = -1;//6; // TEST
            this.tick--;
            petSprite.update();
            cryingOutSprite.update();
            if (this.tick < 0){
                currentScreen = battleScreens.SLIDE;
                currentScreen.update();
                /* For testing purposes
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                toggleKeyPress();*/
            }
        },
        draw: function() {
            clearScreen();
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
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = 4;
            this.tick--;
            catSprite.slide = true;
            catSprite.update();
            //console.log(catSprite.currentPosition);
            if (this.tick < 0){
                currentScreen = battleScreens.GROWL;
                currentScreen.update();
                catSprite.slide = false;
            }
        },
        draw: function() {
            clearScreen();
            catSprite.draw();
        }
    }),
    GROWL: new ScreenSprite({
        name: "GROWL_ANIMATION",
        image: null,
        context: drawingBoard,
        referenceState: SCREEN_STATES.START_BATTLE.substates.GROWL,
        update: function() {
            if (this.tick === undefined || this.tick < 0) // the zero is to reset the animation
                this.tick = 4;
            this.tick--;
            if (this.tick < 0){
                currentScreen = battleMenuScreen.FIGHT;
                game.currentScreenState = fightBattleState;
                toggleKeyPress();
            }
        },
        draw: function() {

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

function clearScreen() {
    drawingBoard.clearRect(0, 0, DEFAULT_SCREEN_SIZE.X, DEFAULT_SCREEN_SIZE.Y);
}

var currentScreen = petScreen;

function updateScreens() { // only triggered when a button is pressed or when a walk has reached a checkpoint
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
        else if (currentScreenState === SCREEN_STATES.START_BATTLE.substates.CRY) {
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
        else {
            //currentScreen = petScreen;
            addLine("Cannot locate screen: " + game.state);
        }
        clearScreen();
    }
}

function draw() {
    if (DRAW_TO_SCREEN === true) {
        currentScreen.update();
        //addLine(currentScreen.name);
        //addLine(game.pet.state.getName());
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
