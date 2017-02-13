/**
 * Created by JarvisWalker on 13/2/17.
 */

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

function generateImage(source) {
    var image = new Image();
    image.src = source;
    return image;
}

function clearScreen() {
    drawingBoard.clearRect(0, 0, DEFAULT_SCREEN_SIZE.X, DEFAULT_SCREEN_SIZE.Y);
}

function DrawingBoard() {
    var drawingBoard = document.getElementById("ctx").getContext("2d");

    this.flipHorizontally = function () {
        drawingBoard.save();
        drawingBoard.scale(-1, 1);
    };

    this.restore = function() {
        drawingBoard.restore();
    };

    this.clearSection = function(x, y, width, height) {
        drawingBoard.clearRect(x, y, width, height);
    };

    this.clearEntireScreen = function() {
        drawingBoard.clearRect(0, 0, DEFAULT_SCREEN_SIZE.X, DEFAULT_SCREEN_SIZE.Y);
    };

    this.drawImage = function(image,
                              spriteDetailsX,
                              spriteDetailsY,
                              spriteDetailsWidth,
                              spriteDetailsHeight,
                              canvasDetailsX,
                              canvasDetailsY,
                              canvasDetailsWidth,
                              canvasDetailsHeight) {
        drawingBoard.drawImage(
            image,
            spriteDetailsX,
            spriteDetailsY,
            spriteDetailsWidth,
            spriteDetailsHeight,
            canvasDetailsX,
            canvasDetailsY,
            canvasDetailsWidth,
            canvasDetailsHeight
        );
    };

    this.getDrawingBoard = function() {
        return drawingBoard;
    };
}

//var drawingBoard = document.getElementById("ctx").getContext("2d");
var drawingBoard = new DrawingBoard();

