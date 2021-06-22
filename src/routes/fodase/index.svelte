<script>
	import Canvas from "$lib/Canvas.svelte";
	import { Vec2 } from "$lib/engine/utils";
	import Inventory from "./Inventory.svelte";
</script>

<Canvas style="width: 100vmin; height: 50vmin;" size={Vec2(1024, 512)}>
	<Inventory />
</Canvas>
