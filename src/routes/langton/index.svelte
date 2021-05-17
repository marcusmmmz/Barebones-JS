<script lang="ts">
	import { Vec2 } from "$lib/engine/utils";
	import { canvas } from "$lib/engine/graphics";
	import { onMount } from "svelte";
	import Canvas from "$lib/Canvas.svelte";
	import Ant from "./Ant.svelte";
	import Grid from "./Grid.svelte";
	import Text from "$lib/Text.svelte";

	const grid_size = 16;
	let grid: boolean[][] = [];
	let grid_window_size = Vec2();

	let speed = 1;
	let stopped = false;

	onMount(() => {
		grid_window_size = Vec2(
			Math.floor(canvas.width / grid_size),
			Math.floor(canvas.height / grid_size)
		);

		// Setup the grid
		for (let x = 0; x < grid_window_size.x; x++) {
			grid.push([]);
			for (let y = 0; y < grid_window_size.y; y++) {
				grid[x].push(false);
			}
		}
	});

	function increaseSpeed() {
		speed += speed;
	}
	function decreaseSpeed() {
		if (speed > 1) speed -= Math.round(speed / 2);
	}
</script>

<div>
	<button on:click={increaseSpeed}>Increase speed</button>
	<button on:click={decreaseSpeed}>Decrease speed</button>
	<div>
		<Canvas size={Vec2(1000, 1000)}>
			{#if stopped}
				<Text
					color="black"
					fontSize={24}
					pos={Vec2(500, 25)}
					text={"The ant is now off-canvas."}
				/>
			{/if}
			<Grid bind:grid {grid_size} {grid_window_size} />
			<Ant bind:stopped bind:speed {grid_size} bind:grid />
		</Canvas>
	</div>
</div>

<style>
	button {
		padding: 1em;
	}
</style>
