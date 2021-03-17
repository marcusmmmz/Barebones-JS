import { Vec2 } from "./utils.js"

export let canvas = document.getElementById("canvas") as HTMLCanvasElement
export let ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export let camera = {
    pos: Vec2(0, 0)
}

export function clearCanvas() {
	ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export let draw = {
    rect(pos : Vec2, size : Vec2, color = "white") {
        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, size.x, size.y)
    },
    text(
        text : string,
        pos : Vec2,
        align : CanvasTextAlign = "start",
        font = "30px Arial",
        color = "white",
    ) {
        ctx.fillStyle = color
        ctx.font = font
        ctx.textAlign = align
        ctx.fillText(text, pos.x, pos.y, ctx.measureText(text).width)
    },
    line(points: Vec2[], color = "white") {
        ctx.strokeStyle = color

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const vec = points[i];
            ctx.lineTo(vec.x, vec.y);
        }

        ctx.stroke();
    },
    arc(
        pos : Vec2,
        radius = 50,
        width = 5,
        start = 0,
        end = Math.PI,
        color = "white",
        fill = false
    ) {
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.arc(pos.x, pos.y, radius, start, end);
        
        if (fill) {
            ctx.fillStyle = color
            ctx.fill()
        } else {
            ctx.strokeStyle = color
            ctx.stroke();
        }
    },
    circle(
        pos : Vec2,
        radius? : number,
        width? : number,
        color? : string,
        fill? : boolean
    ) {
        draw.arc(pos, radius, width, 0, 2 * Math.PI, color, fill);
    }
}