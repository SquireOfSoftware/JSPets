/**
 * Created by JarvisWalker on 23/2/17.
 */

function MapPiece(image, context, referenceState, update, draw) {
    this.image = image;
    this.context = context;
    this.referenceState = referenceState;

    this.update = update;
    this.draw = draw;
}

var mapScreens = {
    NORTH: new MapPiece(
        generateImage("sprites/maps/tasmania-45by40.png"),
        drawingBoard,
        SCREEN_STATES.MAP.substates.TAS.substates.NORTH,
        function() {
            citySprite.update();
        },
        function() {
            this.context.clearEntireScreen();
            this.context.drawImage(
                this.image,
                0,
                0,
                45,
                20,
                0,
                0,
                45,
                20
            );
            citySprite.draw();
        }
    ),
    SOUTH: new MapPiece(
        generateImage("sprites/maps/tasmania-45by40.png"),
        drawingBoard,
        SCREEN_STATES.MAP.substates.TAS.substates.SOUTH,
        function() {
            citySprite.update();
        },
        function() {
            this.context.clearEntireScreen();
            this.context.drawImage(
                this.image,
                0,
                21,
                45,
                20,
                0,
                0,
                45,
                20
            );
            citySprite.draw();
        }
    )
};
