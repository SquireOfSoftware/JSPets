/**
 * Created by JarvisWalker on 27/1/17.
 */

var animationFrameId;

function gameLoop () {
    //update();
    //draw();
    animationFrameId = requestAnimationFrame(gameLoop);
    addLine("Test");
}

requestAnimationFrame(gameLoop);