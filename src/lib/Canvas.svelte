<script>
	import { Vec2 } from "$lib/engine/utils";
	import { canvasStore } from "$lib/engine/graphics";

	export let size = Vec2(500, 500);
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
