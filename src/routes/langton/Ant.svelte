<script>
	import { canvas, draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import { num2vec, Vec2 } from "$lib/engine/utils";
	import { onMount } from "svelte";

	export let grid_size;
	export let grid;
	export let speed = 1;
	export let stopped = false;

	let pos = Vec2();
	let direction = 0;

	onMount(() => {
		pos = Vec2(
			Math.floor(canvas.width / 2 / grid_size),
			Math.floor(canvas.height / 2 / grid_size)
		);
	});

	onUpdate(() => {
		if (stopped) return;

		for (let i = 0; i < speed; i++) {
			let cell = grid[pos.x][pos.y];

			direction += cell ? 1 : -1;
			if (direction > 3) direction = 0;
			else if (direction < 0) direction = 3;

			if (grid[pos.x] != undefined && grid[pos.x][pos.y] != undefined) {
				grid[pos.x][pos.y] = !cell;
			} else {
				stopped = true;
				return;
			}

			//checks which direction to go
			let positive = direction < 2;
			let horizontal = direction % 2 == 0;
			if (horizontal) pos.x += positive ? 1 : -1;
			else pos.y += positive ? 1 : -1;
		}

		draw.rect(pos.mulByNum(grid_size), num2vec(grid_size), "red");
	});
</script>
