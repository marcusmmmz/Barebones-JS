<script lang="ts">
	import { getContext, setContext, onDestroy } from "svelte";
	import { createLoop } from "$lib/engine/main";

	export let name = "";
	name;

	let listeners = [];

	setContext("canvasLayer", {
		ctx: getContext<{ ctx: CanvasRenderingContext2D }>("canvas").ctx,
		add(fn) {
			listeners = [...listeners, fn];
		},
		remove(fn) {
			listeners = listeners.filter((v) => v != fn);
		},
	});

	const stopLoop = createLoop((delta: number) => {
		for (const fn of listeners) {
			fn(delta);
		}
	});

	onDestroy(stopLoop);
</script>

<slot />
