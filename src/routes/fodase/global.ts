import type { Vector2 } from "$lib/engine/utils";
import { writable } from "svelte/store";

export function Item(render: (pos: Vector2) => any) {
	return {
		render,
	};
}
export type Item = ReturnType<typeof Item>;

export let itemHolding = writable<Item>(null);
