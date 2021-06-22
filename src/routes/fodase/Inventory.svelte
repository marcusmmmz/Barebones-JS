<script lang="ts">
	import Slot from "./Slot.svelte";
	import { Vec2, Vector2 } from "$lib/engine/utils";
	import { canvas, draw } from "$lib/engine/graphics";
	import { itemHolding } from "./global";
	import { onUpdate } from "$lib/engine/main";
	import { Item } from "./global";

	let slots: Item[] = new Array(3 * 9);
	$itemHolding = Item((pos) => {
		draw.rect(Vec2(pos.x + 8, pos.y + 8), Vec2(48, 48), "red");
	});
	const slotSize = 64;
	const horizontalLimit = 9;

	let mousePosition = Vec2(0, 0);

	onUpdate(() => {
		$itemHolding?.render(
			Vec2(mousePosition.x - 48 / 2, mousePosition.y - 48 / 2)
		);
	});

	// totally not copied from Stack Overflow
	function onMousemove({ clientX, clientY }) {
		let rect = canvas.getBoundingClientRect();
		mousePosition.x =
			((clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
		mousePosition.y =
			((clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
	}

	function onMousedown() {
		let slotIndex = getSlotFromPosition(mousePosition);
		if (slotIndex > slots.length) return;

		if ($itemHolding == null) {
			$itemHolding = slots[slotIndex];
			slots[slotIndex] = null;
		} else {
			slots[slotIndex] = $itemHolding;
			$itemHolding = null;
		}
	}

	function getSlotFromPosition(pos: Vec2) {
		const slotPos = Vec2(
			Math.floor(pos.x / slotSize) - 1,
			Math.floor(pos.y / slotSize) - 1
		);
		return slotPos.x + slotPos.y * horizontalLimit;
	}

	function getSlotPosition(i: number) {
		return Vec2(
			((i + 1) % horizontalLimit) * slotSize,
			Math.ceil((i + 1) / horizontalLimit) * slotSize
		);
	}
</script>

<svelte:window on:mousemove={onMousemove} on:mousedown={onMousedown} />

{#each slots as slot, i}
	<Slot item={slot} pos={getSlotPosition(i)} />
{/each}
