import { clearCanvas } from "./graphics.js"

// Append objects to this so they appear on the game
export let gameObjects : {[index:string]:any}[] = []

// Mainloop
let lastRender = 0
function step(timestamp : number) {
    let delta = timestamp - lastRender

    clearCanvas()

    for (let i of gameObjects) {
        // ?. only calls a function if it exists in the object
        i.update?.(delta)
        i.draw?.()
    }
    lastRender = timestamp
    
	requestAnimationFrame(step)    
}

export function start() {
    requestAnimationFrame(step)
}

start()