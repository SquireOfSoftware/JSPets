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

    var multipier;
    if (options.multiplier !== undefined)
        multipier = options.multiplier;
    else
        multipler = DEFAULT_SCREEN_SIZE.X;

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
            this.currentPosition.x += multipier;
    };

    this.previous = function() {
        screenCounter--;
        if (screenCounter < 0) {
            screenCounter = 0;
            this.currentPosition.x = maxScreens * multipler;
        }
        else
            this.currentPosition.x -= multipier;
    }
}

function AnimalSprite(options) {
    var image = options.image;
    var context;
    if(options.context !== undefined)
        context = options.context;
    else
        context = document.getElementById("ctx").getContext("2d");

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
    var image = options.image;

    var context;
    if(options.context !== undefined)
        context = options.context;
    else
        context = document.getElementById("ctx").getContext("2d");

    var size;
    if (options.size !== undefined)
        size = options.size;
    else
        size = {width: DEFAULT_SCREEN_SIZE.X, height: DEFAULT_SCREEN_SIZE.Y};
    this.update = options.update;

    if (options.draw !== undefined)
        this.draw = options.draw;
    else
        this.draw = function() {
            var currentPosition = new ScreenPosition({
                firstScreenX: 0,
                firstScreenY: 0,
                maxScreens: 0,
                canvasX: 0,
                canvasY: 0
            }); // this is just a dummy frame
            // Need to figure out xy coordinates
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

function generateImage(source) {
    var image = new Image();
    image.src = source;
    return image;
}

var petSprite = new AnimalSprite({
    image: generateImage("sprites/duckling.png"),
    context: document.getElementById("ctx").getContext("2d"),
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
    image: generateImage("sprites/menu-screen"),
    context: document.getElementById("ctx").getContext("2d"),
    update: function() {
        // check whether a button has been pressed
        // handle button press accordingly
        petSprite.update();
    },
    draw: function() {
        petSprite.draw();
    }
});

var currentScreen = petScreen;

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
