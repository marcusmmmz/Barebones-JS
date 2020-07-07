//Essa camada controla como os gráficos serão desenhados

let canvas = document.getElementById("barebones-canvas");
let ctx2D = canvas.getContext("2d");

export function clearCanvas() {
	ctx2D.fillStyle = globals.canvasBG;
	ctx2D.fillRect(0, 0, canvas.width, canvas.height);
}

export function draw() {
	for (const obj of gameObjects) {
		if (!obj.visible) {
			return;
		}

		if (obj.inheritsClass("RectangleSprite")) {
			drawShape.rect(obj.relativePos, obj.extents, obj.color);
		}
	}
}

export class drawShape {
	static rect(pos, size, color) {
		ctx2D.fillStyle = color || "#000000";
		ctx2D.fillRect(pos.x, pos.y, size.x, size.y);
	}
}
