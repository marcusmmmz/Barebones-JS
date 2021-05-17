import { clearCanvas } from "./graphics";
import { onMount } from "svelte";

export let updateCallbacks: ((delta: number) => any)[] = [];

// Mainloop
let lastRender = 0;
export function step(timestamp: number) {
	let delta = timestamp - lastRender;

	clearCanvas("#333333");

	for (let callback of updateCallbacks) {
		callback(delta);
	}
	lastRender = timestamp;

	requestAnimationFrame(step);
}

export function onUpdate(callback) {
	onMount(() => {
		updateCallbacks.push(callback);
		return () => {
			updateCallbacks = updateCallbacks.filter((v) => v != callback);
		};
	});
}

requestAnimationFrame(step);
