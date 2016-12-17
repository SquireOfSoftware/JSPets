/**
 * Created by JarvisWalker on 17/12/16.
 */
var image = new Image();
image.src = "sprites/digim-recreate.png";
var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
console.log(image);
image.onload = function () {
    context.drawImage(image, 0, 0);
};
// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/