//Essa camada gerencia os objetos do jogo

export function handle() {
	for (const obj of gameObjects) {
		if (obj._frame) {
			obj._frame();
		}
	}
}
