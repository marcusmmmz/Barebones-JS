import { GameObj, GameObj2D, Vec2 } from "./engine/classes.js"
import { canvas, ctx } from "./engine/graphics.js"
import { gameObjects } from "./engine/mainloop.js"

let grid : boolean[][] = []
let grid_size = 16
let grid_window_size = Vec2(
	Math.floor(canvas.width/grid_size),
	Math.floor(canvas.height/grid_size)
)

for (let x = 0; x < grid_window_size.x; x++) {
	grid.push( [] )
	for (let y = 0; y < grid_window_size.y; y++) {
		grid[x].push( false )
	}
}

// draw grid
gameObjects.push({
	draw() {
		for (let x = 0; x < grid_window_size.x; x++) {
			for (let y = 0; y < grid_window_size.y; y++) {
				if ( !ctx ) return

				ctx.fillStyle = grid[x][y] ? "black" : "white"
				ctx?.fillRect(
					x*grid_size, y*grid_size,
					grid_size, grid_size
				)
			}
		}
	},
})

class Ant implements GameObj2D {
	pos = Vec2(
		Math.floor((canvas.width/2)/grid_size),
		Math.floor((canvas.height/2)/grid_size)
	)
	direction = 0

	draw() {
		if ( !ctx ) return

		ctx.fillStyle = "red"
		ctx?.fillRect(
			this.pos.x*grid_size, this.pos.y*grid_size,
			grid_size, grid_size
		)
	}
	update() {
		let cell = grid[this.pos.x][this.pos.y]

		this.direction += cell ? 1 : -1
		if (this.direction > 3) this.direction = 0
		if (this.direction < 0) this.direction = 3

		grid[this.pos.x][this.pos.y] = !cell

		//checks which direction to go
		let positive = (this.direction < 2)
		let isX = this.direction % 2 == 0
		if (isX) this.pos.x += positive ? 1 : -1
		else this.pos.y += positive ? 1 : -1
	}
}
let ant = new Ant()
gameObjects.push( ant )
