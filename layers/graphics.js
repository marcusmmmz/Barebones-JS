let canvas = document.getElementById("barebones-canvas");
let ctx2D = canvas.getContext("2d");

export function clearCanvas() {
	ctx2D.clearRect(0, 0, canvas.width, canvas.height);
}

export function draw() {
	for (const obj of gameObjects) {
		if (obj.class == "RectangleSprite") {
			drawShape.rect(obj.position, obj.extents, obj.color);
		}
	}
}

export class drawShape {
	static rect(position, size, color) {
		ctx2D.fillStyle = color || "#000000";
		ctx2D.fillRect(position.x, position.y, size.x, size.y);
		//ctx2D.strokeRect(50, 50, 50, 50);
	}
}
