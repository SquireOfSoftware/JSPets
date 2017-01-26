/**
 * Created by JarvisWalker on 27/1/17.
 */

var animationFrameId;

function gameLoop () {
    interpretKeys();
    update();
    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function toggleGameLoop() {
    if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(gameLoop);
        addLine("Game loop has been started")
    }
    else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        addLine("Game loop has been stopped");
    }
}

requestAnimationFrame(gameLoop);