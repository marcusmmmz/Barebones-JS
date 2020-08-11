//Essa camada controla como os gráficos serão desenhados

//let canvas = document.getElementById("barebones-canvas");
class graphicsEngine2D {
	static ctx2D = canvas.getContext("2d");

	static canvasBG = "rgb(64, 64, 64)";

	static clearCanvas() {
		this.ctx2D.fillStyle = this.canvasBG;
		this.ctx2D.fillRect(0, 0, canvas.width, canvas.height);
	}

	static drawAll() {
		for (const obj of nodeHandler.gameObjects) {
			if (!obj.visible) {
				return;
			}

			if (obj.inheritsClass("RectangleSprite")) {
				this.drawShapeRect(obj.relativePos, obj.extents, obj.color);
			}
		}
	}

	static drawShapeRect(pos, size, color) {
		this.ctx2D.fillStyle = color || "#000000";
		this.ctx2D.fillRect(pos.x, pos.y, size.x, size.y);
	}
}
