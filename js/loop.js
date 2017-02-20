/**
 * Created by JarvisWalker on 27/1/17.
 */

var animationFrameId;

var MAX_FPS = 5;
var fpsInterval = 1000/MAX_FPS;
var now = Date.now();
var then = Date.now();
var elapsed;

function gameLoop () {
    update();
    now = Date.now();
    elapsed = now - then;
    interpretKeys();
    if (elapsed > fpsInterval || asyncRender) {
        draw();
        then = now - (elapsed % fpsInterval);
        updateFPS();
        asyncRender = false;
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
    //addLine(fpsInterval);
    document.getElementById("fps").value = elapsed/1000;
}

requestAnimationFrame(gameLoop);