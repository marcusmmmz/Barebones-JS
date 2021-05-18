import { writable } from "svelte/store";
import type { Vec2 } from "./utils";

export let canvasStore = writable<HTMLCanvasElement>(
	document.createElement("canvas")
);

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

canvasStore.subscribe((value) => {
	canvas = value ?? document.createElement("canvas");
	ctx = canvas.getContext("2d");
});

export function clearCanvas(color: string = "black") {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width ?? 0, canvas.height ?? 0);
}

export let draw = {
	rect(pos: Vec2, size: Vec2, color = "white") {
		ctx.fillStyle = color;
		ctx.fillRect(pos.x, pos.y, size.x, size.y);
	},
	text(
		text: string,
		pos: Vec2,
		align: CanvasTextAlign = "start",
		font = "30px Arial",
		color = "white"
	) {
		ctx.fillStyle = color;
		ctx.font = font;
		ctx.textAlign = align;
		ctx.fillText(text, pos.x, pos.y, ctx.measureText(text).width);
	},
	line(points: Vec2[], color = "white") {
		ctx.strokeStyle = color;

		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			const vec = points[i];
			ctx.lineTo(vec.x, vec.y);
		}

		ctx.stroke();
	},
	image(imageURL: string, pos: Vec2, size?: Vec2) {
		const img = new Image();
		img.src = imageURL;
		ctx.drawImage(img, pos.x - size.x / 2, pos.y - size.y / 2, size.x, size.y);
	},
};
