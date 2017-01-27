/**
 * Created by JarvisWalker on 27/1/17.
 */

var DRAW_TO_SCREEN = true;

function draw() {
    if (DRAW_TO_SCREEN === true) {
        addLine("Drawing now");
    }
}

function toggleDrawing() {
    DRAW_TO_SCREEN = !DRAW_TO_SCREEN;
    if (DRAW_TO_SCREEN === true)
        addLine("Rendering has been enabled");
    else
        addLine("Rendering has been disabled");
}
