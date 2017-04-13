/**
 * Created by JarvisWalker on 13/2/17.
 */

var petSprite = getSprite(ANIMAL_TYPES.DUCK, game.pet);

var enemySprite;

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
            maxFrame: 1,
            multiplier: 16,
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
    if (options.presentationPosition !== undefined)
        this.presentationPosition = options.presentationPosition;
    else
        this.presentationPosition = new SpritePosition({
            name: "presentationPosition",
            spriteSheetX: 0,
            spriteSheetY: 0,
            maxFrame: 1,
            canvasX: 3,
            canvasY: 2
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
            }
            else if (this.referenceObject.state !== referenceState) {
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
            else if (currentScreen.referenceState === SCREEN_STATES.STATS.substates.CURRENT_STATS) {
                this.currentPosition = this.presentationPosition;
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
            var drawnSize = this.size;
            
            if (this.currentPosition === this.presentationPosition) {
                drawSize = {
                    width: DEFAULT_SPRITE_SIZE,
                    height: DEFAULT_SPRITE_SIZE
                };
            }
            else
                this.context.clearEntireScreen();
            
            this.context.drawImage(
                this.image,
                coordinates.spriteSheetX,
                coordinates.spriteSheetY + this.isEvolved * DEFAULT_SPRITE_SIZE,
                drawnSize.width,
                drawnSize.height,
                coordinates.canvasX,
                coordinates.canvasY,
                drawnSize.width,
                drawnSize.height
            );
        };
		
	if (options.evolve !== undefined)
		this.evolve = options.evolve;
    else 
        this.evolve = function() {
            this.isEvolved = this.referenceObject.stats.currentLevel - 1;
        };
	
	if (options.devolve !== undefined)
		this.devolve = options.devolve;
    else 
        this.devolve = function() {
            this.isEvolved = 0;
        }
}

function AnimalSprite32Width(image, drawingBoard, referenceObject) {
    return new AnimalSprite({
            image: image,
            context: drawingBoard,
            referenceObject: referenceObject,
            size: {width: DEFAULT_SPRITE_SIZE * 2, height: DEFAULT_SPRITE_SIZE},
            idlePosition: new SpritePosition({
                name: "idlePosition",
                spriteSheetX: 0,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: 32,
                canvasX: 15,
                canvasY: 0
            }),
            walkingPosition: new SpritePosition({
                name: "walkingPosition",
                spriteSheetX: 160, // fifth position on the sprite sheet
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: 32,
                canvasX: 15,
                canvasY: 0
            }),
            cryingOutPosition: new SpritePosition({
                name: "cryingOutPosition",
                spriteSheetX: 64,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: -64,
                canvasX: 15,
                canvasY: 0
            }),
            sickPosition: new SpritePosition({
                name: "sickPosition",
                spriteSheetX: 96,
                spriteSheetY: 0,
                maxFrame: 0,
                multiplier: 32,
                canvasX: 15,
                canvasY: 0
            }),
            barkingPosition: new SpritePosition({
                name: "barkingPosition",
                spriteSheetX: 64,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: -64,
                canvasX: 15, 
                canvasY: 0
            }),
            attackingPosition: new SpritePosition({
                name: "attackingPosition",
                spriteSheetX: 64,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: -64,
                canvasX: 45 - 16,
                canvasY: 0
            }),
            receivingPosition: new SpritePosition({
                name: "receivingPosition",
                spriteSheetX: 0,
                spriteSheetY: 0,
                maxFrame: 0,
                multiplier: 0,
                canvasX: 29,
                canvasY: 0
            }),
            rejoicingPosition: new SpritePosition({
                name: "rejoicingPosition",
                spriteSheetX: 0,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: 128,
                canvasX: 15,
                canvasY: 0
            }),
            saddenedPosition: new SpritePosition({
                name: "saddenedPosition",
                spriteSheetX: 0,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: 96,
                canvasX: 15,
                canvasY: 0
            }),
            presentationPosition: new SpritePosition({
                name: "presentationPosition",
                spriteSheetX: 0,
                spriteSheetY: 0,
                maxFrame: 1,
                multiplier: 32,
                canvasX: 3,
                canvasY: 2
            })
        });
}

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
        return new AnimalSprite32Width(
            generateImage("sprites/animals/crocodile.png"),
            drawingBoard,
            referenceObject
            );
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
            image: generateImage("sprites/animals/duck.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.ECHIDNA) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/echidna.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.FOX) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/fox.png"),
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
            image: generateImage("sprites/animals/frog.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.KANGAROO) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/kangaroo.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.KOOKABURRA) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/kookaburra.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.LORIKEET) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/lorikeet.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.OWL) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/owl.png"),
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
            image: generateImage("sprites/animals/pig.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.PLATYPUS) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/platypus.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.RABBIT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/rabbit.png"),
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
            image: generateImage("sprites/animals/snake.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.SNOWMAN) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/snowman.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TASMANIAN_DEVIL) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/tasmanian-devil.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TASMANIAN_TIGER) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/tasmanian-tiger.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.TURTLE) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/turtle.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else if (animalType === ANIMAL_TYPES.WHALE) {
        return new AnimalSprite32Width(
            generateImage("sprites/animals/whale.png"),
            drawingBoard,
            referenceObject
        );
    }
    else if (animalType === ANIMAL_TYPES.WOMBAT) {
        return new AnimalSprite({
            image: generateImage("sprites/animals/wombat.png"),
            context: drawingBoard,
            referenceObject: referenceObject
        });
    }
    else
        console.log("Unrecognisable animal type: ", enemyType);
}
