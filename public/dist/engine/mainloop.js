import { clearCanvas } from "./graphics.js";
// Append objects to this so they appear on the game
export var gameObjects = [];
// Mainloop
export function step() {
    clearCanvas();
    for (var _i = 0, gameObjects_1 = gameObjects; _i < gameObjects_1.length; _i++) {
        var i = gameObjects_1[_i];
        i.draw();
        i.update();
    }
    requestAnimationFrame(step);
}
step();
