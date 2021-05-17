import { Vec2 } from "$lib/engine/utils";
import { writable } from "svelte/store";
import { canvas } from "$lib/engine/graphics";

export let fruits = {
	...writable<Vec2[]>([]),
	remove(fruit: Vec2) {
		this.update((fruits) => fruits.filter((v) => v != fruit));
	},
	spawn(amount: number) {
		for (let i = 0; i < amount; i++) {
			this.update((fruits) => [
				...fruits,
				Vec2(
					Math.random() * (canvas.width - 30),
					Math.random() * (canvas.height - 30)
				),
			]);
		}
	},
};
export let score = writable(0);
export let level = writable(0);
