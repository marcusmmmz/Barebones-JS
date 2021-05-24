<script lang="ts">
	import { fruits, score } from "./stores";
	import { getDistance2D, radialDistance } from "$lib/engine/physics";
	import { draw } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";
	import { num2vec, Vec2 } from "$lib/engine/utils";
	import sprite from "$assets/wolf.png";

	export const speed = 1;
	export let pos = Vec2(100, 100);

	const size = 30;

	let closestFruit = Vec2();

	$: searchClosestFruit(), $fruits;

	function searchClosestFruit() {
		closestFruit = $fruits[0];
		for (const fruit of $fruits) {
			if (radialDistance(pos, closestFruit) > radialDistance(pos, fruit)) {
				closestFruit = fruit;
			}
		}
	}

	onUpdate(() => {
		for (const fruit of $fruits) {
			if (radialDistance(pos, fruit) <= size) {
				fruits.remove(fruit);
				$score--;
			}
		}

		const distance = getDistance2D(pos, closestFruit);

		if (distance.x > 0) pos.x -= speed;
		else if (distance.x < 0) pos.x += speed;

		if (distance.y > 0) pos.y -= speed;
		else if (distance.y < 0) pos.y += speed;

		draw.image(sprite, pos.rounded(), num2vec(size));
	});
</script>
