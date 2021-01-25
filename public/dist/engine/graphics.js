export var canvas = document.getElementById("canvas");
export function adjustCanvasSize() {
    canvas.height = window.innerHeight - 6.1;
    canvas.width = window.innerWidth - 3;
}
window.onresize = adjustCanvasSize;
export function clearCanvas() {
    if (!ctx)
        return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
}
export var ctx = canvas.getContext("2d");
adjustCanvasSize();
