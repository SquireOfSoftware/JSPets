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
            name: "idlePosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: 15,
            canvasY: 0
        });

    this.currentPosition = this.idlePosition;

    if (options.walkingPosition !== undefined)
        this.walkingPosition = options.walkingPosition;
    else
        this.walkingPosition = new SpritePosition({
            name: "walkingPosition",
            spriteSheetX: 80, // fifth position on the sprite sheet
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: 15,
            canvasY: 0
        });

    if (options.cryingOutPosition !== undefined) {
        this.cryingOutPosition = options.cryingOutPosition;
    }
    else
        this.cryingOutPosition = new SpritePosition({
            name: "cryingOutPosition",
            spriteSheetX: 32,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: -32,
            canvasX: 15,
            canvasY: 0
        });

    if (options.sickPosition !== undefined)
        this.sickPosition = options.sickPosition;
    else
        this.sickPosition = new SpritePosition({
            name: "sickPosition",
            spriteSheetX: 48,
            spriteSheetY: 0,
            maxFrame: 0,
            canvasX: 15,
            canvasY: 0
        });

    if (options.happyPosition !== undefined)
        this.happyPosition = options.happyPosition;

    if (options.slidingPosition !== undefined)
        this.slidingPosition = options.slidingPosition;
    else
        this.slidingPosition = new SpritePosition({
            name: "slidingPosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 4,
            multiplier: -8,
            canvasX: DEFAULT_SCREEN_SIZE.X,
            canvasY: 0
        });

    if (options.barkingPosition !== undefined)
        this.barkingPosition = options.barkingPosition;
    else
        this.barkingPosition = new SpritePosition({
            name: "barkingPosition",
            spriteSheetX: 32,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: -32,
            canvasX: 15, //DEFAULT_SCREEN_SIZE.X,//DEFAULT_SCREEN_SIZE.X - DEFAULT_SPRITE_SIZE,
            canvasY: 0
        });

    if (options.attackingPosition !== undefined)
        this.attackingPosition = options.attackingPosition;
    else
        this.attackingPosition = new SpritePosition({
            name: "attackingPosition",
            spriteSheetX: 32,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: -32,
            canvasX: 45 - 16,
            canvasY: 0
        });

    if (options.receivingPosition !== undefined)
        this.receivingPosition = options.receivingPosition;
    else
        this.receivingPosition = new SpritePosition({
            name: "receivingPosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 0,
            multiplier: 0,
            canvasX: 29,
            canvasY: 0
        });

    if (options.rejoicingPosition !== undefined)
        this.rejoicingPosition = options.rejoicingPosition;
    else
        this.rejoicingPosition = new SpritePosition({
            name: "rejoicingPosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: 64,
            canvasX: 15,
            canvasY: 0
        });

    if (options.saddenedPosition !== undefined)
        this.saddenedPosition = options.saddenedPosition;
    else
        this.saddenedPosition = new SpritePosition({
            name: "saddenedPosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 1,
            multiplier: 48,
            canvasX: 15,
            canvasY: 0
        });
	
	if (options.isEvolved !== undefined)
		this.isEvolved = options.isEvolved;
	else
		this.isEvolved = 0;

    var referenceState = ANIMAL_STATES.IDLE;

    if (options.size !== undefined)
        this.size = options.size;
    else
        this.size = {width: DEFAULT_SPRITE_SIZE, height: DEFAULT_SPRITE_SIZE};

    if (options.update !== undefined)
        this.update = options.update;
    else // default to a pet object
        this.update = function() {
            if (currentScreen.referenceState === SCREEN_STATES.START_BATTLE.substates.SLIDE) {
                if (this.currentPosition !== this.slidingPosition)
                    this.currentPosition = this.slidingPosition;
                //this.currentPosition.updateCanvas();
            }
            else if (this.referenceObject.state !== referenceState) {
                if (this.referenceObject.state === ANIMAL_STATES.IDLE) {
                    referenceState = ANIMAL_STATES.IDLE;
                    this.currentPosition = this.idlePosition;
                }
                else if (this.referenceObject.state === ANIMAL_STATES.WALKING) {
                    referenceState = ANIMAL_STATES.WALKING;
                    this.currentPosition = this.walkingPosition;
                    console.log("WALKING STATE");
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
            else if (game.currentScreenState.state === SCREEN_STATES.ATTACK_SEQUENCE) {
                this.currentPosition = this.attackingPosition;
            }
            else if (game.currentScreenState.state === SCREEN_STATES.HAPPY_PET) {
                this.currentPosition = this.rejoicingPosition;
            }
            else if (game.currentScreenState.state === SCREEN_STATES.SADDENED_PET) {
                this.currentPosition = this.saddenedPosition;
            }
            
            if (this.currentPosition !== this.slidingPosition)
                this.currentPosition.update();
            else
                this.currentPosition.updateCanvas();
        };

    if (options.draw !== undefined)
        this.draw = options.draw;
    else
        this.draw = function() {
            var coordinates = this.currentPosition.getPosition();
            this.context.clearEntireScreen();
            //console.log(this.isEvolved);
            //this.context.clearSection(coordinates.canvasX, coordinates.canvasY, this.size.width, this.size.height);
            this.context.drawImage(
                this.image,
                coordinates.spriteSheetX,
                coordinates.spriteSheetY + this.isEvolved * DEFAULT_SPRITE_SIZE,
                this.size.width,
                this.size.height,
                coordinates.canvasX,
                coordinates.canvasY,
                this.size.width,
                this.size.height
            );
        };
		
	if (options.evolve !== undefined)
		this.evolve = options.evolve;
    else 
        this.evolve = function() {
            this.isEvolved ++;
            if (this.isEvolved >= this.referenceObject.stats.maxLevel)
                this.isEvolved = this.referenceObject.stats.maxLevel - 1;
        }
	
	if (options.devolve !== undefined)
		this.devolve = options.devolve;
    else 
        this.devolve = function() {
            this.isEvolved = 0;
        }
}

var petSprite = getSprite(ANIMAL_TYPES.CROCODILE, game.pet);

var enemySprite;

function getSprite(animalType, referenceObject) {
    if (animalType === ANIMAL_TYPES.BAT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/bat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.BEE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/bee.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.BUTTERFLY) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/butterfly.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.CAT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.COCKATOO) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cockatoo.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.CROCODILE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/crocodile.png"),
            context: drawingBoard,
            referenceObject: referenceObject,
            size: {width: DEFAULT_SPRITE_SIZE * 2, height: DEFAULT_SPRITE_SIZE}
        });
    }
    else if (animalType === ANIMAL_TYPES.DOG) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/dog.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.DUCK) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/crocodile.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.ECHIDNA) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.FOX) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.KANGAROO) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.FRIDGE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/fridge.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.FROG) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.KOOKABURRA) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.LORIKEET) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.OWL) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.PELICAN) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/pelican.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.PENGUIN) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/penguin.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.PIG) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.PLATYPUS) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.RABBIT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.SANDCASTLE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/sandcastle.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.SEAL) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/seal.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.SNAKE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.SNOWMAN) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TASMANIAN_DEVIL) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TASMANIAN_TIGER) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TURTLE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.WHALE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.WOMBAT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/cat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else
        console.log("Unrecognisable animal type: ", enemyType);
}

function GenericSprite(image, context, positions, size, update, draw) {
    this.image = image;
    this.context = context;
    this.positions = positions;
    this.size = size;
    this.update = update;
    this.draw = draw;
}

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
            console.log("attackPower", petSpriteStates.faster.referenceObject.stats.currentStats.attack, this.attackPower);
            
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
    generateImage("sprites/step-alphabet.png"),
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
        this.context.clearEntireScreen();
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
			if (this.tick === undefined || this.tick > 1) {
                this.tick = -1;
            }
			
			this.tick++;
		},
		function() {
			
			if (this.tick % 2 === 1) {
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
				)
			}
			else
				this.context.clearEntireScreen();
		}
	)
};

function CitySprite(position, context) {
    var citySprite = new GenericSprite(
        generateImage("sprites/location-indicators.png"),
        context,
        position,
        {
            width: 3,
            height: 3
        },
        function () {
            if (this.tick === undefined || this.tick > 1) {
                this.tick = 0;
            }
            this.tick++;


        },
        function () {
            this.context.clearSection(this.x, this.y, this.size.width, this.size.height);
        }
    );

    citySprite.setCoordinates = function(x, y) {
        this.x = x;
        this.y = y;
    };

    return citySprite;
}

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

        for(var city = 0; city < region.length; city++) {
            if (city === game.currentCity && game.currentViewableRegion === game.currentRegion)
                this.currentPosition = this.positions.currentPosition;
            else if (game.currentViewableRegion < game.currentRegion ||
                game.currentViewableRegion === game.currentRegion && city < game.currentCity)
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