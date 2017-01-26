/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true;

function draw() {
    if (DRAW_TO_SCREEN === true) {

    }
    else
        addLine("Drawing disabled");
}

function toggleDrawing() {
    DRAW_TO_SCREEN = !DRAW_TO_SCREEN;
}