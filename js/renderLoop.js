/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true;

function SpritePosition(options) {
    var spriteSheetX = options.spriteSheetX;
    this.spriteSheetY = options.spriteSheetY;
    this.updatedSpriteSheetX = spriteSheetX;

    this.canvasX = options.canvasX;
    this.canvasY = options.canvasY;

    var maxFrame = options.maxFrame;

    var currentFrameCounter = 0;
    this.update = function() {
        currentFrameCounter++;
        if (currentFrameCounter > maxFrame) {
            currentFrameCounter = 0;
        }
        this.updatedSpriteSheetX = spriteSheetX + DEFAULT_SPRITE_SIZE * currentFrameCounter;
    };

}

function AnimalSprite(options) {
    var image = options.image;
    //this.idleSprite = options.idleSprite;
    var context = options.context;

    if(options.visible !== undefined)
        this.visible = options.visible;
    else
        this.visible = false;
    var idleCounter = 0;

    var idlePosition = options.idlePosition;
    if (idlePosition === undefined)
        idlePosition = new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });
    var walkingPosition = options.walkingPosition;
    var attackPosition = options.attackPosition;
    var sickPosition = options.sickPosition;
    var happyPosition = options.happyPosition;
    var currentPosition = idlePosition;

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

    this.update = function() {
        //this.idleCounter ++;
        //console.log(game.pet.state !== referenceState);
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
        //console.log(context);
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

function draw() {
    if (DRAW_TO_SCREEN === true) {
        petSprite.update();
        addLine(game.pet.state.getName());
        petSprite.draw();
        //if (game.pet.state)
    }
}

function toggleDrawing() {
    DRAW_TO_SCREEN = !DRAW_TO_SCREEN;
    if (DRAW_TO_SCREEN === true)
        addLine("Rendering has been enabled");
    else
        addLine("Rendering has been disabled");
}
