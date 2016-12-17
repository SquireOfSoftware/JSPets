/**
 * Created by JarvisWalker on 17/12/16.
 */

var canvas = document.getElementById("ctx");
var context = canvas.getContext("2d");
var loaded = false;
var pet = {
    reference: "sprites/spritesheet.png",
    position: {
        x: 16,
        y: 16
    },
    height: 15,
    width: 15
};

var image = new Image();
image.src = pet.reference;

image.onload = function () {
    //context.drawImage(image, 16, 16, 15, 15, 0, 0, 15, 15);
    requestAnimationFrame(drawPet);
    requestAnimationFrame(bobPet);
    loaded = true;
};

function animatePet() {
    console.log("drawing image");
    drawPet(pet);
    bobPet(pet)
}

function drawPet() {
    console.log(pet.position.x);
    context.drawImage(image, pet.position.x, pet.position.y, pet.height, pet.width, 15, 0, pet.height, pet.width);
}

function bobPet() {
    context.drawImage(image, pet.position.x, pet.position.y - 16, pet.height, pet.width, 15, 0, pet.height, pet.width);
}

// http://jsfiddle.net/Q98xZ/16/?utm_source=website&utm_medium=embed&utm_campaign=Q98xZ
// full description of canvas and how to use it well
// https://codepo8.github.io/canvas-images-and-pixels/