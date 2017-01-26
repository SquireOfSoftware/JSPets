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

function toggleDebug() {
    DEBUG = !DEBUG;
    if (DEBUG === true)
        addLine("Debugger has been enabled");
    else {
        DEBUG = true;
        addLine("Debugger has been disabled");
        DEBUG = false;
    }
}