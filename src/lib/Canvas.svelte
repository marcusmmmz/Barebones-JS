<script lang="ts">
	import { Vec2 } from "$lib/engine/utils";
	import { canvasStore, clearCanvas } from "$lib/engine/graphics";
	import { onDestroy, setContext } from "svelte";
	import { createLoop } from "$lib/engine/main";

	export let style = "";

	export let size = Vec2(500, 500);

	export let mainloop = (delta: number) => {
		clearCanvas("#333333");
	};

	let listeners = [];

	$: setContext("canvas", {
		ctx: $canvasStore.getContext("2d"),
		add(fn) {
			listeners.push(fn);
		},
		remove(fn) {
			listeners = listeners.filter((v) => v != fn);
		},
	});

	const stopLoop = createLoop((delta: number) => {
		mainloop(delta);
		for (const fn of listeners) {
			fn(delta);
		}
	});

	onDestroy(stopLoop);
</script>

<canvas {style} bind:this={$canvasStore} width={size.x} height={size.y}>
	<slot />
</canvas>

<style>
	canvas {
		width: 90vmin;
		height: 90vmin;
	}
</style>
