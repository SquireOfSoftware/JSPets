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
    var image = options.image;
    var context;
    if(options.context !== undefined)
        context = options.context;
    else
        context = drawingBoard;

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
            context.clearRect(this.screenPosition.canvasX, this.screenPosition.canvasY, size.width, size.height);

            context.drawImage(
                image,
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
    referenceState: GAME_STATES.PET_STATUS,
    update: function() {
        // check whether a button has been pressed
        // handle button press accordingly
        petSprite.update();
    },
    draw: function() {
        petSprite.draw();
    }
});

var mapScreen = new ScreenSprite({
    name: "MAP_SCREEN",
    image: generateImage("sprites/menu-screen.png"),
    context: drawingBoard,
    referenceState: GAME_STATES.MENU,
    screenPosition: new ScreenPosition({
        firstScreenX: 0,
        firstScreenY: 0,
        maxScreens: 3
    }),
    update: function() {
        //addLine("MAP SCREEN HAS BEEN SELECTED");

    }
});

function clearScreen() {
    drawingBoard.clearRect(0, 0, DEFAULT_SCREEN_SIZE.X, DEFAULT_SCREEN_SIZE.Y);
}

var currentScreen = petScreen;

function updateScreens() {
    // check if game state has changed
    if (currentScreen.referenceState !== game.state) {
        // change screen
        if(game.state === GAME_STATES.PET_STATUS)
            currentScreen = petScreen;
        else if (game.state === GAME_STATES.MENU)
            currentScreen = mapScreen;
        else if (game.state === GAME_STATES.IN_BATTLE)
            currentScreen = null;
        else {
            currentScreen = petScreen;
            addLine("Cannot locate screen: " + game.state);
        }
        clearScreen();
    }
}

function draw() {
    if (DRAW_TO_SCREEN === true) {
        //updateScreens();
        currentScreen.update();
        addLine(game.pet.state.getName());
        currentScreen.draw();
        //console.log(currentScreen);
    }
}

function toggleDrawing() {
    DRAW_TO_SCREEN = !DRAW_TO_SCREEN;
    if (DRAW_TO_SCREEN === true)
        addLine("Rendering has been enabled");
    else
        addLine("Rendering has been disabled");
}
