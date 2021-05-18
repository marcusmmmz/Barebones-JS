<script lang="ts">
	import { Vec2 } from "$lib/engine/utils";
	import { canvasStore, clearCanvas } from "$lib/engine/graphics";
	import { onDestroy, setContext } from "svelte";
	import { createLoop } from "$lib/engine/main";

	export let size = Vec2(500, 500);

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
		clearCanvas("#333333");
		for (const fn of listeners) {
			fn(delta);
		}
	});

	onDestroy(stopLoop);
</script>

<canvas bind:this={$canvasStore} width={size.x} height={size.y}>
	<slot />
</canvas>

<style>
	canvas {
		width: 90vmin;
		height: 90vmin;
	}
</style>
