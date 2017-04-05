/**
 * Created by JarvisWalker on 30/3/17.
 */
/*
var blackBar = new ScreenSprite({
    name: "BLACK_BAR",
    image: generateImage("sprites/black-bar.png"),
    context: foregroundBoard,
    screenPosition: new ScreenPosition({
        firstScreenX: 0,
        firstScreenY: 20 - 7,
        maxScreens: 0,
        canvasX: 0,
        canvasY: //20 - 7
    }),
    size: {
        width: 45,
        height: 7
    },
    update: function() {

    }
});*/

function GenericSprite(image, context, positions, size, update, draw) {
    this.image = image;
    this.context = context;
    this.positions = positions;
    this.size = size;
    this.update = update;
    this.draw = draw;
}

var blackBar = new GenericSprite(
    generateImage("sprites/black-bar.png"),
    foregroundBoard,
    [],
    {
        width: 45,
        height: 20
    },
    function() {

    },
    function() {
        this.context.drawImage(
            this.image,
            0,
            0,
            this.size.width,
            this.size.height,
            0,
            0,
            this.size.width,
            this.size.height
        );
    }
);

var backgroundBlackBar = new GenericSprite(
    generateImage("sprites/black-bar.png"),
    drawingBoard,
    [],
    {
        width: 45,
        height: 20
    },
    function() {

    },
    function() {
        this.context.drawImage(
            this.image,
            0,
            0,
            this.size.width,
            this.size.height,
            0,
            0,
            this.size.width,
            this.size.height
        );
    }
);

var fireball = new GenericSprite(
    generateImage("sprites/fireball.png"),
    foregroundBoard,
    {
        launchingPosition: new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 5,
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
            maxFrame: 1,
            multiplier: 0,
            canvasX: 0,
            canvasY: 2
        })
    },
    {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE},
    function() {
        if(this.tick === undefined || this.tick < 0) {
            this.tick = 13;
            this.currentPosition = this.positions.launchingPosition;
            this.positions.launchingPosition.reset();
            this.positions.fullAttackPosition.reset();
            this.positions.receivingPosition.reset();
            this.attackPower = Math.round(petSpriteStates.faster.referenceObject.stats.currentStats.attack / 10);
            //console.log("attackPower", petSpriteStates.faster.referenceObject.stats.currentStats.attack, this.attackPower);

            // this bit is really interesting
            // 0 to 4 is a small attack
            // 5 to 14 is the next attack
            // 15 to 24 is the next largest attack
            // 25 to 34 is the largest attack
        }

        //this.attackPower = petSpriteStates.faster.referenceObject.stats.currentStats.attack;
        this.tick --;

        if (this.tick < 9) {
            this.context.clearEntireScreen();
            this.currentPosition = this.positions.fullAttackPosition;
        }
        else if (this.tick < 3) {
            this.context.clearEntireScreen();
            this.currentPosition = this.positions.receivingPosition;
        }

        this.currentPosition.updateCanvas();
    },
    function() {
        var coordinates = this.currentPosition.getPosition();
        this.context.clearSection(coordinates.canvasX, coordinates.canvasY, this.size.width * 2, this.size.height);
        this.context.drawImage(
            this.image,
            coordinates.spriteSheetX + DEFAULT_SPRITE_SIZE * (this.attackPower),
            coordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            coordinates.canvasX,
            coordinates.canvasY,
            this.size.width,
            this.size.height
        );
    });

var damageSprite = new GenericSprite(
    generateImage("sprites/damage-sprite.png"),
    drawingBoard,
    {
        receivingPosition: new SpritePosition({
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: 16,
            canvasX: 29,
            canvasY: 2
        })
    },
    {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE},
    function() {
        // update

        if (this.currentPosition === undefined)
            this.currentPosition = this.positions.receivingPosition;
        this.currentPosition.update();
    },
    function () {
        // draw
        var coordinates = this.currentPosition.getPosition();
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
);

var healthRemainingSprite = new GenericSprite(
    generateImage("sprites/step-numbers.png"),
    foregroundBoard,
    {
        inverted: 5,
        normal: 0
    }, // its a number set it doesn't really have "next number"
    // x coordinates are with the constant NUMBER_POSITIONS
    {width: NUMBER_PX_SIZE.WIDTH, height: NUMBER_PX_SIZE.HEIGHT},
    function() {
        // constantly pull in the leftover health
        this.health = (petSpriteStates.slower.referenceObject.stats.currentStats.hp).toString();
        if (currentScreen.referenceState === SCREEN_STATES.ATTACK_SEQUENCE.substates.CALCULATING_DAMAGE)
            this.spriteHeight = this.positions.inverted;
        else
            this.spriteHeight = this.positions.normal;
    },
    function() {
        // draw numbers 1px up from bottom, 10px from the right
        var screenColumnPosition = 0;
        //this.context.clearEntireScreen();
        for (var index = this.health.length - 1; index > -1; index--) {
            // need to track positions
            this.context.drawImage(
                this.image,
                NUMBER_POSITIONS[parseInt(this.health.charAt(index))], // x position
                this.spriteHeight,
                NUMBER_PX_SIZE.WIDTH, // width on spritesheet
                NUMBER_PX_SIZE.HEIGHT, // height on spritesheet
                HP_BOUNDARIES.STARTING_X_COORD - NUMBER_PX_SIZE.WIDTH * screenColumnPosition,
                HP_BOUNDARIES.STARTING_HEIGHT,
                NUMBER_PX_SIZE.WIDTH, // width on canvas
                NUMBER_PX_SIZE.HEIGHT // height on canvas
            );
            screenColumnPosition++;
        }
    }
);


var statusSprites = {
    image: generateImage("sprites/status-sprites.png"),
    SUN: new GenericSprite(
        generateImage("sprites/status-sprites.png"),
        drawingBoard,
        [],
        {
            width: 8,
            height: 8
        },
        function() {
            if (this.tick === undefined || this.tick > 1) {
                this.tick = 0;
            }
            this.tick++;
        },
        function() {
            // you want to draw the item on the left

            this.context.drawImage(
                this.image,
                0, // x position
                0, // y position
                this.size.width, // width on spritesheet
                this.size.height, // height on spritesheet
                45 - 8, // x position
                0, // y position
                8, // width on canvas
                8 // height on canvas
            );
        }
    ),
    BANDAID: new GenericSprite(
        generateImage("sprites/status-sprites.png"),
        drawingBoard,
        [],
        {
            width: 8,
            height: 8
        },
        function() {
            if (this.tick === undefined || this.tick > 1) {
                this.tick = 0;
            }
            this.tick++;
        },
        function() {
            // you want to draw the item on the right
            this.context.drawImage(
                this.image,
                8, // x position
                0,
                this.size.width, // width on spritesheet
                this.size.height, // height on spritesheet
                45 - 8,
                0,
                8, // width on canvas
                8 // height on canvas
            );
        }
    )
};

var evolutionSprites = {
    EVOLVE: new GenericSprite(
        generateImage("sprites/evolution-screens.png"),
        foregroundBoard,
        [],
        {
            width: 45,
            height: 20
        },
        function() {
            if (this.tick === undefined || this.tick < 0) {
                this.tick = -1;
                this.invert = false;
            }

            if (this.tick >= 5) {
                this.invert = true;
            }

            if (this.invert) {
                this.tick--;
            }
            else {
                this.tick++;
            }
        },
        function() {
            this.context.clearEntireScreen();
            this.context.drawImage(
                this.image,
                this.tick * 45,
                0,
                this.size.width,
                this.size.height,
                0,
                0,
                this.size.width,
                this.size.height
            )
        }
    ),
    DEVOLVE: new GenericSprite(
        generateImage("sprites/devolving-cross-hatching.png"),
        foregroundBoard,
        [],
        {
            width: 45,
            height: 20
        },
        function() {
            if (this.tick === undefined || this.tick < 0) {
                this.tick = 6;
            }
            this.tick--;

        },
        function() {
            this.context.clearEntireScreen();
            if (this.tick % 2 === 1 && this.tick > 0) {
                this.context.drawImage(
                    this.image,
                    0,
                    0,
                    this.size.width,
                    this.size.height,
                    0,
                    0,
                    this.size.width,
                    this.size.height
                );
            }

        }
    )
};

var citySprite = new GenericSprite(
    generateImage("sprites/location-indicators.png"),
    foregroundBoard,
    {
        currentPosition: new SpritePosition({
            spriteSheetX: 14,
            spriteSheetY: 1,
            maxFrame: 0,
            multiplier: 0,
            canvasX: 0, // This is not used at all
            canvasY: 0  // this is not use at all
        }),
        defeatedPosition: new SpritePosition({
            spriteSheetX: 1,
            spriteSheetY: 7,
            maxFrame: 1,
            multiplier: 6,
            canvasX: 0, // This is not used at all
            canvasY: 0  // this is not use at all
        }),
        toBeVisitedPosition: new SpritePosition({
            spriteSheetX: 1,
            spriteSheetY: 1,
            maxFrame: 1,
            multiplier: 6,
            canvasX: 0, // This is not used at all
            canvasY: 0  // this is not use at all
        })
    },
    {
        width: 3,
        height: 3
    },
    function () {
        this.positions.toBeVisitedPosition.update();
    },
    function () {
        this.context.clearEntireScreen();

        var region = australia.TAS.regions[game.currentViewableRegion];
        //console.log(region.length);
        for(var city = 0; city < region.length; city++) {
            if ((city === game.currentCity) && (game.currentViewableRegion === game.currentRegion))
                this.currentPosition = this.positions.currentPosition;
            else if ((game.currentViewableRegion < game.currentRegion) ||
                (game.currentViewableRegion === game.currentRegion && city < game.currentCity))
                this.currentPosition = this.positions.defeatedPosition;
            else
                this.currentPosition = this.positions.toBeVisitedPosition;

            var spriteCoordinates = this.currentPosition.getPosition();
            this.context.drawImage(
                this.image,
                spriteCoordinates.spriteSheetX,
                spriteCoordinates.spriteSheetY,
                3,
                3,
                region[city].coordinates.x,
                region[city].coordinates.y,
                3,
                3
            );

        }
    }
);

var finalTextSprite = new GenericSprite(
    generateImage("sprites/finals.png"),
    foregroundBoard,
    new SpritePosition({
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 3,
        multiplier: 25,
        canvasX: 18,
        canvasY: 0
    }),
    {
        width: 25,
        height: 17
    },
    function() {
        this.positions.update();
    },
    function() {
        var spriteCoordinates = this.positions.getPosition();
        this.context.clearSection(
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );
        this.context.drawImage(
            this.image,
            spriteCoordinates.spriteSheetX,
            spriteCoordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );
    }
);

var arrow = new GenericSprite(
    generateImage("sprites/arrow.png"),
    foregroundBoard,
    new SpritePosition({
        name: "SWAP",
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 1,
        multiplier: 5,
        canvasX: 0, // not used
        canvasY: 0  // not used
    }),
    {
        width: 5,
        height: 4
    },
    function() {
        this.positions.update();
    },
    function(x, y) {

        var spriteCoordinates = this.positions.getPosition();
        this.context.clearSection(
            x,
            y,
            this.size.width,
            this.size.height
        );
        this.context.drawImage(
            this.image,
            spriteCoordinates.spriteSheetX,
            spriteCoordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            x,
            y,
            this.size.width,
            this.size.height
        );
    }
);

var fadingOverlaySprite = new GenericSprite(
    generateImage("sprites/fade.png"),
    foregroundBoard,
    {
        FADE_OUT: new SpritePosition({
            name: "FADE_OUT",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 2,
            multiplier: 45,
            canvasX: 0, // not used
            canvasY: 0  // not used
        }),
        FADE_IN: new SpritePosition({
            name: "FADE_IN",
            spriteSheetX: 90,
            spriteSheetY: 0,
            maxFrame: 2,
            multiplier: -45,
            canvasX: 0, // not used
            canvasY: 0  // not used
        })
    },
    {
        width: 45,
        height: 20
    },
    function() {
        if (this.currentPosition === undefined || this.reverse !== undefined) {
            if (this.reverse === true)
                this.currentPosition = this.positions.FADE_IN;
            else
                this.currentPosition = this.positions.FADE_OUT;
            this.currentPosition.reset();
        }

        this.currentPosition.update();
    },
    function() {
        var spriteCoordinates = this.currentPosition.getPosition();
        this.context.clearSection(
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );

        this.context.drawImage(
            this.image,
            spriteCoordinates.spriteSheetX,
            spriteCoordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );
    }
);

var readyInXSprite = new GenericSprite(
    generateImage("sprites/powerup-not-ready.png"),
    drawingBoard,
    new SpritePosition({
        name: "DEFAULT",
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 0,
        multiplier: 45,
        canvasX: 0,
        canvasY: 0
    }),
    {
        width: 45,
        height: 20
    },
    function() {},
    function(number) {
        var spriteCoordinates = this.positions.getPosition();
        this.context.drawImage(
            this.image,
            spriteCoordinates.spriteSheetX,
            spriteCoordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );

        var numberString = number.toString();
        var position = 2;

        for (var digit = numberString.length - 1; digit >= 0 && position >= 0; digit--) {
            numberDrawingSprite.draw(numberString.charAt(digit), 31 + ((position) * 4), 14, true);
            position--;
        }
    }
);

var introSequenceSprite = new GenericSprite(
    generateImage("sprites/intro-seq.png"),
    drawingBoard,
    new SpritePosition({
        name: "SLIDING_INTRO",
        spriteSheetX: 0,
        spriteSheetY: 0,
        maxFrame: 10,
        multiplier: 45,
        canvasX: 0, // not used
        canvasY: 0  // not used
    }),
    {
        width: 45,
        height: 20
    },
    function() {
        if(this.tick === undefined || this.tick < 0)
            this.tick = 10;
        this.tick--;

        this.positions.update();

        if (this.tick < 0) {
            this.positions.reset();
        }
    },
    function() {
        var spriteCoordinates = this.positions.getPosition();
        this.context.clearSection(
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );

        //console.log(this.positions.name, spriteCoordinates);

        this.context.drawImage(
            this.image,
            spriteCoordinates.spriteSheetX,
            spriteCoordinates.spriteSheetY,
            this.size.width,
            this.size.height,
            spriteCoordinates.canvasX,
            spriteCoordinates.canvasY,
            this.size.width,
            this.size.height
        );
    }
);

function NumberSprite () {
    var sprite = {};
    sprite.image = generateImage("sprites/step-numbers.png");
    sprite.context = drawingBoard;

    sprite.draw = function(character, canvasX, canvasY, isInverted) {
        var spriteSheetY = 0;
        this.context.drawImage(
            this.image,
            NUMBER_POSITIONS[parseInt(character)],
            spriteSheetY + isInverted * 5,
            NUMBER_PX_SIZE.WIDTH,
            NUMBER_PX_SIZE.HEIGHT,
            canvasX,
            canvasY,
            NUMBER_PX_SIZE.WIDTH,

            NUMBER_PX_SIZE.HEIGHT
        )
    };

    return sprite;
}

var numberDrawingSprite = new NumberSprite();

function LetterSprite () {
    var sprite = {};
    sprite.image = generateImage("sprites/alphabet.png");
    sprite.context = drawingBoard;

    sprite.draw = function(character, canvasX, canvasY, isInverted) {
        var spriteSheetY = 0;
        //A - 65, Z - 90
        var charCode = character.charCodeAt();

        var size = {
            width: 4,
            height: 5
        };

        var charPosition = 0;
        if (charCode < 77) {
            charPosition = (charCode - 65) * 4;
        }
        // note that M, Q, W pushes the assumptions out
        else if (charCode === 77) { // M
            charPosition = (charCode - 65) * 4;
            size.width = 5;
        }
        else if (charCode < 81) {
            charPosition = (charCode - 65) * 4 + 2;
        }
        else if (charCode === 81) { // Q
            charPosition = (charCode - 65) * 4 + 2;
            size.width = 5;
        }
        else if (charCode < 87) {
            charPosition = (charCode - 65) * 4 + 3;
        }
        else if (charCode === 87) { // W
            charPosition = (charCode - 65) * 4 + 3;
            size.width = 5;
        }
        else if (charCode <= 90) {
            charPosition = (charCode - 65) * 4 + 5;
        }

        // note that there is also commas, apostrophes and full stops

        this.context.drawImage(
            this.image,
            //NUMBER_POSITIONS[parseInt(character)],
            //(charCode - 65) * 4,
            charPosition,
            spriteSheetY + isInverted * 5, // 3 by 5
            size.width,
            size.height,
            canvasX,
            canvasY,
            size.width,
            size.height
        )
    };

    return sprite;
}

var letterDrawingSprite = new LetterSprite();

function FullNumberSprite() {
    this.draw = function(numberString, canvasX, canvasY) {
        for (var index = numberString.length - 1; index > -1; index--) {

            var position = 2;
            for (var digit = numberString.length - 1; digit >= 0 && position >= 0; digit--) {
                numberDrawingSprite.draw(numberString.charAt(digit), canvasX + ((position) * 4), canvasY, true);
                position--;
            }
        }
    }
}

var fullNumberSprite = new FullNumberSprite();

function FullLetterSprite() {
    this.draw = function(letterString, canvasX, canvasY) {
        for(var i = 0; i < letterString.length; i++) {
            letterDrawingSprite.draw(letterString.charAt(i), canvasX + i * 5, canvasY, true);
        }
    }
}

var fullLetterSprite = new FullLetterSprite();