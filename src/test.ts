import { draw } from "./engine/graphics.js"
import { Input, InputMap } from "./engine/input.js"
import { gameObjects } from "./engine/main.js"
import { Vec2 } from "./engine/utils.js"

InputMap.addAction("up", ["ArrowUp", "w"])
InputMap.addAction("left", ["ArrowLeft", "a"])
InputMap.addAction("down", ["ArrowDown", "s"])
InputMap.addAction("right", ["ArrowRight", "d"])

class MovingDot {
    constructor(
        public pos : Vec2,
        public speed : number,
        public color : string
    ) {}
    draw() {
        draw.rect(this.pos, Vec2(20, 20), this.color)
    }
}

class Player extends MovingDot {
    constructor() {
        super(Vec2(10, 10), 3, "green")
    }
    pos = Vec2(10, 10)
    speed = 3
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

class Enemy extends MovingDot {
    constructor() {
        super(Vec2(100, 100), 1, "red")
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