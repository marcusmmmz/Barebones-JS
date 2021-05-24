<script lang="ts">
	import { Input } from "$lib/engine/input";
	import { canvas, draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import { clamp, num2vec, Vec2 } from "$lib/engine/utils";
	import { radialDistance } from "$lib/engine/physics";
	import { fruits, score } from "./stores";
	import sprite from "$assets/fox.png";

	export let speed = 1.5;
	export let pos = Vec2(200, 200);

	const size = 30;

	onUpdate(() => {
		pos.y +=
			(Number(Input.pressed("down")) - Number(Input.pressed("up"))) * speed;

		pos.x +=
			(Number(Input.pressed("right")) - Number(Input.pressed("left"))) * speed;

		pos.x = clamp(pos.x, size / 2, 500 - size / 2);
		pos.y = clamp(pos.y, size / 2, 500 - size / 2);

		draw.image(sprite, pos.rounded(), num2vec(size));
	});

	$: for (let fruit of $fruits) {
		if (radialDistance(pos, fruit) <= size) {
			fruits.remove(fruit);
			$score++;
		}
	}
</script>
