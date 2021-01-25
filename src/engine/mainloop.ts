import { canvas, clearCanvas, ctx } from "./graphics.js"
import { GameObj } from "./classes.js"

// Append objects to this so they appear on the game
export let gameObjects : GameObj[] = []
// Mainloop
export function step() {
    clearCanvas()

    for (let i of gameObjects) {
        i.draw()
        i.update()
    }
	requestAnimationFrame(step)
}

step()