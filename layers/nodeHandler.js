export function handle() {
	for (const obj of gameObjects) {
		if (obj._frame) {
			obj._frame();
		}
	}
}
