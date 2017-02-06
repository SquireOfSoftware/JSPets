/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true; // the boolean that is controlled by debug

function SpritePosition(options) {
    var spriteSheetX = options.spriteSheetX;
    this.spriteSheetY = options.spriteSheetY;
    this.updatedSpriteSheetX = spriteSheetX;

    this.canvasX = options.canvasX;
    this.canvasY = options.canvasY;

    var maxFrame = options.maxFrame;

    var multiplier;
    if (options.multipler !== undefined)
        multiplier = options.multipler;
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

    var maxScreens;
    if (options.maxScreens !== undefined)
        maxScreens = options.maxScreens;
    else
        maxScreens = 1;

    var screenCounter = 0;

    this.reset = function() {
        this.currentPosition = {
            x: firstScreenX,
            y: firstScreenY
        };
        screenCounter = 0;
    };

    this.next = function() {
        screenCounter++;
        if (screenCounter > maxScreens) {
            screenCounter = 0;
            this.currentPosition.x = 0;
        }
        else
            this.currentPosition.x += multiplier;
        console.log(screenCounter, this.currentPosition);
    };

    this.previous = function() {
        screenCounter--;
        if (screenCounter < 0) {
            screenCounter = maxScreens;
            this.currentPosition.x = maxScreens * multiplier;
        }
        else
            this.currentPosition.x -= multiplier;
        console.log(screenCounter, this.currentPosition);
    }
}

function AnimalSprite(options) {
    var image = options.image;
    var context;
    if(options.context !== undefined)
        context = options.context;
    else
        context = drawingBoard;

    if(options.visible !== undefined)
        this.visible = options.visible;
    else
        this.visible = false;

    var idlePosition, walkingPosition, attackPosition,
        sickPosition, happyPosition, currentPosition;
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

    currentPosition = idlePosition;

    if (options.walkingPosition !== undefined)
        walkingPosition = options.walkingPosition;
    else
        walkingPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.WALKING,
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: context.width/2,
            canvasY: 0
        });

    if (options.attackPosition !== undefined)
        attackPosition = options.attackPosition;
    else
        attackPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.ATTACK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });

    if (options.sickPosition !== undefined)
        sickPosition = options.sickPosition;
    else
        sickPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.SICK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });

    if (options.happyPosition !== undefined)
        happyPosition = options.happyPosition;
    else
        happyPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.HAPPY, // fourth position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });

    var referenceState = ANIMAL_STATES.IDLE;

    if (options.flip !== undefined)
        this.flip = options.flip;
    else
        this.flip = false; // facing left

    var size;
    if (options.size !== undefined)
        size = options.size;
    else
        size = {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE};

    if (options.update !== undefined)
        this.update = options.update;
    else // default to a pet object
        this.update = function() {
            if (game.pet.state !== referenceState) {
                if (game.pet.state === ANIMAL_STATES.IDLE) {
                    referenceState = ANIMAL_STATES.IDLE;
                    currentPosition = idlePosition;
                }
                else if (game.pet.state === ANIMAL_STATES.WALKING) {
                    referenceState = ANIMAL_STATES.WALKING;
                    currentPosition = walkingPosition;
                }
            }
            currentPosition.update();
        };

    this.draw = function() {
        context.clearRect(currentPosition.canvasX, currentPosition.canvasY, size.width, size.height);
        if(this.visible) {
            context.drawImage(
                image,
                currentPosition.updatedSpriteSheetX,
                currentPosition.spriteSheetY,
                size.width,
                size.height,
                currentPosition.canvasX,
                currentPosition.canvasY,
                size.width,
                size.height
            );
        }
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
    this.update = options.update;

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
    else
        this.draw = function() {
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

function generateImage(source) {
    var image = new Image();
    image.src = source;
    return image;
}

var petSprite = new AnimalSprite({
    image: generateImage("sprites/duckling.png"),
    context: drawingBoard,
    visible: true,
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
    })
});

var petScreen = new ScreenSprite({
    name: "PET_SCREEN",
    image: null,
    context: null,
    referenceState: SCREEN_STATES.PETS,
    update: function() {
        // check whether a button has been pressed
        // handle button press accordingly
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

        }
    })
];

var totalStepsScreen = new ScreenSprite({
    name: "STEPS_SCREEN",
    image: generateImage("sprites/step-alphabet.png"),
    context: drawingBoard,
    referenceState: SCREEN_STATES.STEPS.substates[0],
    update: function() {
        this.totalSteps = game.stepCounter.total.toString();
    },
    draw: function() {
        //if(this.previousStepsCounted === 0)
        //    clearScreen();
        var digitPositionCounter = {
            column: 10,
            row: 2
        };
        if (this.previousStepsCounted === undefined)
            this.previousStepsCounted = "0";

        for(var index = this.totalSteps.length - 1; index > -1; index --) {
            if (this.previousStepsCounted.charAt(index) === undefined ||
                this.previousStepsCounted.charAt(index) !== this.totalSteps.charAt(index)) {
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
            }
        }

        this.previousStepsCounted = this.totalSteps;

    }
});

function clearScreen() {
    drawingBoard.clearRect(0, 0, DEFAULT_SCREEN_SIZE.X, DEFAULT_SCREEN_SIZE.Y);
}

var currentScreen = petScreen;

function updateScreens() {
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
        else if (currentScreenState === SCREEN_STATES.STEPS)
            currentScreen = menuScreen[3];
        else if (currentScreenState === SCREEN_STATES.STEPS.substates[0])
            currentScreen = totalStepsScreen;
        /*else if (game.currentScreenState === )
            currentScreen = null;*/
        else {
            currentScreen = petScreen;
            addLine("Cannot locate screen: " + game.state);
        }
        clearScreen();
    }
}

function draw() {
    if (DRAW_TO_SCREEN === true) {
        currentScreen.update();
        addLine(game.pet.state.getName());
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
