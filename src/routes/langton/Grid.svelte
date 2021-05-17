<script>
	import { draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import { num2vec, Vec2 } from "$lib/engine/utils";

	export let grid_window_size;
	export let grid_size;
	export let grid;

	// Graphical grid
	onUpdate(() => {
		for (let x = 0; x < grid_window_size.x; x++) {
			for (let y = 0; y < grid_window_size.y; y++) {
				draw.rect(
					Vec2(x, y).mulByNum(grid_size),
					num2vec(grid_size),
					grid[x][y] ? "black" : "white"
				);
			}
		}
	});
</script>
