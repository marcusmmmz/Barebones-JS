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
		function isInsideCanvas(pos: Vec2) {
			const clamped = Vec2(
				clamp(pos.x, size / 2, canvas.width - size / 2),
				clamp(pos.y, size / 2, canvas.height - size / 2)
			);
			return clamped.x == pos.x && clamped.y == pos.y;
		}

		let tempPos = pos.mulByNum(1);
		if (Input.pressed("up")) tempPos.y -= speed;
		if (Input.pressed("down")) tempPos.y += speed;
		if (Input.pressed("left")) tempPos.x -= speed;
		if (Input.pressed("right")) tempPos.x += speed;

		if (isInsideCanvas(tempPos)) {
			pos.x = tempPos.x;
			pos.y = tempPos.y;
		}

		draw.image(sprite, pos.rounded(), num2vec(size));
	});

	$: for (let fruit of $fruits) {
		if (radialDistance(pos, fruit) <= 30) {
			fruits.remove(fruit);
			$score++;
		}
	}
</script>
