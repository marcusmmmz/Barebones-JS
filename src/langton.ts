import { num2vec, Vec2 } from "./engine/utils.js"
import { canvas, draw } from "./engine/graphics.js"
import { gameObjects } from "./engine/main.js"

const grid : boolean[][] = []
const grid_size = 16
const grid_window_size = Vec2(
	Math.floor(canvas.width/grid_size),
	Math.floor(canvas.height/grid_size)
)

// Setup the grid
for (let x = 0; x < grid_window_size.x; x++) {
	grid.push( [] )
	for (let y = 0; y < grid_window_size.y; y++) {
		grid[x].push( false )
	}
}

// Graphical grid
gameObjects.push({
	draw() {
		for (let x = 0; x < grid_window_size.x; x++) {
			for (let y = 0; y < grid_window_size.y; y++) {
				draw.rect(
					Vec2(x, y).mulByNum(grid_size),
					num2vec(grid_size),
					grid[x][y] ? "black" : "white"
				)
			}
		}
	},
})

class Ant {
	pos = Vec2(
		Math.floor((canvas.width/2)/grid_size),
		Math.floor((canvas.height/2)/grid_size)
	)
	direction = 0

	draw() {
		draw.rect(
			this.pos.mulByNum(grid_size),
			num2vec(grid_size),
			"red"
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
gameObjects.push( new Ant() )
