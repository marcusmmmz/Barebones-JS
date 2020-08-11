//Essa camada gerencia os objetos do jogo

class nodeHandler {
	static gameObjects = [];

	static registerNode(node) {
		this.gameObjects.push(node);
	}

	static handleAll() {
		for (const obj of this.gameObjects) {
			if (obj._frame) {
				obj._frame();
			}
		}
	}
}
