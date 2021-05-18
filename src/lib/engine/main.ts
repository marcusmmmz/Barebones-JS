import { getContext, onMount } from "svelte";

export function createLoop(fn: (delta: number) => any) {
	let frame: number;
	let lastTime = performance.now();

	function loop() {
		frame = requestAnimationFrame(loop);
		const beginTime = performance.now();
		const delta = (beginTime - lastTime) / 1000;
		lastTime = beginTime;
		fn(delta);
	}

	loop();

	return () => cancelAnimationFrame(frame);
}

export function onUpdate(callback) {
	const { add, remove } = getContext("canvasLayer") ?? getContext("canvas");

	onMount(() => {
		add(callback);
		return () => remove(callback);
	});
}
