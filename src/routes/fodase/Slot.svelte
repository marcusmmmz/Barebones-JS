<script lang="ts">
	import { Vec2 } from "$lib/engine/utils";
	import { draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import type { Item } from "./global";

	export let item: Item = null;
	export let pos = Vec2(0, 0);

	onUpdate(() => {
		draw.rect(pos, Vec2(64, 64), "#ffffff");
		draw.rect(Vec2(pos.x + 2, pos.y + 2), Vec2(60, 60), "#888888");
		item?.render(pos);
	});
</script>
