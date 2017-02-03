/**
 * Created by JarvisWalker on 27/1/17.
 */

var animationFrameId;

var MAX_FPS = 2;
var fpsInterval = 1000/MAX_FPS;
var now = Date.now();
var then = Date.now();
var elapsed;

function gameLoop () {

    //interpretKeys();
    update();
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        interpretKeys();
        updateScreens();
        draw();
        then = now - (elapsed % fpsInterval);
        updateFPS();
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}

function toggleGameLoop() {
    if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(gameLoop);
        addLine("Game loop has been started");
    }
    else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        addLine("Game loop has been stopped");
    }
}

function updateFPS() {
    document.getElementById("fps").value = elapsed/1000;
}

requestAnimationFrame(gameLoop);