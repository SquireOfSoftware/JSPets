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

    this.currentPosition = this.idlePosition;

    if (options.walkingPosition !== undefined)
        this.walkingPosition = options.walkingPosition;

    if (options.cryingOutPosition !== undefined) {
        this.cryingOutPosition = options.cryingOutPosition;
    }

    if (options.sickPosition !== undefined)
        this.sickPosition = options.sickPosition;

    if (options.happyPosition !== undefined)
        this.happyPosition = options.happyPosition;

    if (options.slidingPosition !== undefined)
        this.slidingPosition = options.slidingPosition;

    if (options.barkingPosition !== undefined)
        this.barkingPosition = options.barkingPosition;

    if (options.attackingPosition !== undefined)
        this.attackingPosition = options.attackingPosition;

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
            else if (game.currentScreenState === SCREEN_STATES.ATTACK_SEQUENCE) {
                this.currentPosition = this.attackingPosition;
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
    }),
    attackingPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: 45 - 16,
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
        canvasX: 0,
        canvasY: 0
    }),
    barkingPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: -DEFAULT_SPRITE_SIZE,//DEFAULT_SCREEN_SIZE.X - DEFAULT_SPRITE_SIZE,
        canvasY: 0
    }),
    attackingPosition: new SpritePosition({
        spriteSheetX: 32,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: -32,
        canvasX: 45 - 16,
        canvasY: 0
    }),
    update: function() {
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

function AttackSprite(image, context, positions, size, update, draw) {
    this.image = image;
    this.context = context;
    this.positions = positions;
    this.size = size;
    this.update = update;
    this.draw = draw;
}

var fireball = new AttackSprite(
    generateImage("sprites/fireball.png"),
    drawingBoard,
    {
        launchingPosition: new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 7,
            multiplier: -5,
            canvasX: 16,
            canvasY: 2
        }),
        fullAttackPosition: new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 5,
            multiplier: -8,
            canvasX: 39,
            canvasY: 2
        }),
        receivingPosition: new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 2,
            multiplier: 0,
            canvasX: 0,
            canvasY: 2
        })
    },
    {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE},
    function() {
        if(this.tick === undefined || this.tick < 0) {
            this.tick = 12;
            this.currentPosition = this.positions.launchingPosition;
            this.positions.launchingPosition.reset();
            this.positions.fullAttackPosition.reset();
            this.positions.receivingPosition.reset();
        }

        this.tick --;

        if (this.tick < 9) {
            this.currentPosition = this.positions.fullAttackPosition;
        }
        else if (this.tick < 3) {
            this.currentPosition = this.positions.receivingPosition;
        }

        this.currentPosition.updateCanvas();

        //console.log("fireball tick", this.tick, this.currentPosition);
    },
    function() {
        var coordinates = this.currentPosition.getPosition();
        if (this.flip) {
            this.context.clearSection(coordinates.canvasX, coordinates.canvasY, this.size.width * 2, this.size.height);
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
        }
        else {
            this.context.clearSection(coordinates.canvasX, coordinates.canvasY, this.size.width * 2, this.size.height);
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
        }
});