/**
 * Created by JarvisWalker on 13/2/17.
 */

function AnimalSprite(options) {
    this.image = options.image;
    this.referenceObject = options.referenceObject;

    if(options.context !== undefined)
        this.context = options.context;
    else
        this.context = drawingBoard;

    if (options.idlePosition !== undefined)
        this.idlePosition = options.idlePosition;
    else
        this.idlePosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.IDLE,
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: context.width/2,
            canvasY: 0
        });

    this.currentPosition = this.idlePosition;

    if (options.walkingPosition !== undefined)
        this.walkingPosition = options.walkingPosition;
    else
        this.walkingPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.WALKING,
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.cryingOutPosition !== undefined) {
        this.cryingOutPosition = options.cryingOutPosition;
    }
    else
        this.cryingOutPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.ATTACK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.sickPosition !== undefined)
        this.sickPosition = options.sickPosition;
    else
        this.sickPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.SICK, // third position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.happyPosition !== undefined)
        this.happyPosition = options.happyPosition;
    else
        this.happyPosition = new SpritePosition({
            spriteSheetX: DEFAULT_SPRITE_POSITIONS.HAPPY, // fourth position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: this.context.width/2,
            canvasY: 0
        });

    if (options.slidingPosition !== undefined)
        this.slidingPosition = options.slidingPosition;

    if (options.barkingPosition !== undefined)
        this.barkingPosition = options.barkingPosition;

    var referenceState = ANIMAL_STATES.IDLE;

    if (options.flip !== undefined)
        this.flip = options.flip;
    else
        this.flip = false; // facing left

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
                    this.currentPosition = this.idlePosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.WALKING) {
                    referenceState = ANIMAL_STATES.WALKING;
                    this.currentPosition = this.walkingPosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.SICK) {
                    referenceState = ANIMAL_STATES.SICK;
                    this.currentPosition = this.sickPosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.IN_BATTLE) {
                    referenceState = ANIMAL_STATES.IN_BATTLE;
                    this.currentPosition = this.cryingOutPosition;
                }
            }
            this.currentPosition.update();
        };

    if (options.draw !== undefined)
        this.draw = options.draw;
    else
        this.draw = function() {
            var coordinates = this.currentPosition.getPosition();
            this.context.clearSection(coordinates.canvasX, coordinates.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                coordinates.spriteSheetX,
                coordinates.spriteSheetY,
                this.size.width,
                this.size.height,
                coordinates.canvasX,
                coordinates.canvasY,
                this.size.width,
                this.size.height
            );
        };
}

var petSprite = new AnimalSprite({
    image: generateImage("sprites/animals/duckling.png"),
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
    image: generateImage("sprites/animals/cat.png"),
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
        //if(this.slide !== undefined && this.slide === true) {
        if (currentScreen.referenceState === SCREEN_STATES.START_BATTLE.substates.SLIDE) {
            if (this.currentPosition !== this.slidingPosition)
                this.currentPosition = this.slidingPosition;
            this.currentPosition.updateCanvas();
        }
        else if (currentScreen.referenceState === SCREEN_STATES.START_BATTLE.substates.GROWL){
            if (this.currentPosition !== this.barkingPosition)
                this.currentPosition = this.barkingPosition;
            this.currentPosition.update();
        }
    }
});