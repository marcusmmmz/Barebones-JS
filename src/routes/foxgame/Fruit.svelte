<script lang="ts">
	import { draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import { num2vec, Vec2 } from "$lib/engine/utils";
	import sprite from "$assets/berry.png";

	export let pos: Vec2;

	const size = 30;

	onUpdate(() => {
		draw.image(sprite, pos.rounded(), num2vec(size));
	});
</script>
