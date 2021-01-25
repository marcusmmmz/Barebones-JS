import { ctx } from "./engine/graphics.js"
import { Input, InputMap } from "./engine/input.js"
import { gameObjects } from "./engine/mainloop.js"
import { GameObj2D, Vec2 } from "./engine/classes.js"


InputMap.addAction("up", ["ArrowUp", "w", "W"])
InputMap.addAction("left", ["ArrowLeft", "a", "A"])
InputMap.addAction("down", ["ArrowDown", "s", "S"])
InputMap.addAction("right", ["ArrowRight", "d", "D"])

class Player implements GameObj2D {
    pos = Vec2(10, 10)
    speed = 3
    draw() {
        ctx?.fillRect(this.pos.x, this.pos.y, 10, 10)
    }
    update() {
        let keys : { [key: string]: Function } = {
            up   :()=>this.pos.y -= this.speed,
            down :()=>this.pos.y += this.speed,
            right:()=>this.pos.x += this.speed,
            left :()=>this.pos.x -= this.speed,
        }

        for (let key of Object.keys(keys)) {
            let func = keys[key]
            if ( Input.pressed(key) ) func()
        }
    }
}
let player = new Player()
gameObjects.push( player )

class Enemy implements GameObj2D {
    pos = Vec2(100, 100)
    speed = 1
    draw() {
        ctx?.fillRect(this.pos.x, this.pos.y, 10, 10)
    }
    update() {
        if (this.pos.x > player.pos.x)
        { this.pos.x -= this.speed }
        else { this.pos.x += this.speed }

        if (this.pos.y > player.pos.y)
        { this.pos.y -= this.speed }
        else { this.pos.y += this.speed }
    }
}
gameObjects.push( new Enemy() )