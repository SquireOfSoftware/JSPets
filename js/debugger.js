/**
 * Created by JarvisWalker on 27/1/17.
 */

var counter = 0;

var DEBUG = true;

function addLine(text) {
    if (DEBUG === true) {
        var screenLines = document.getElementById("debugger").value;
        screenLines = counter++ + " " + text + "\n" + screenLines;
        document.getElementById("debugger").value = screenLines;
    }
}

function disableDebug() {
    DEBUG = false;
}

function enableDebug() {
    DEBUG = true;
}

function toggleDebug() {
    DEBUG = !DEBUG;
}