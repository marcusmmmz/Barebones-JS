import { draw } from "./graphics";
import { Vec2 } from "./utils";

export function checkRectCollision(
    pos1: Vec2, size1: Vec2,
    pos2: Vec2, size2: Vec2
) {
    return (
        pos1.x < pos2.x + size2.x &&
        pos1.x + size1.x > pos2.x &&
        pos1.y < pos2.y + size2.y &&
        pos1.y + size1.y > pos2.y
    )
}

export function checkCircleCollision(
    circ1: Vec2, circ1radius:number,
    circ2: Vec2, circ2radius:number,
) {
    let dx = circ1.x - circ2.x;
    let dy = circ1.y - circ2.y;
    
    let distance = Math.sqrt(
        dx * dx + dy * dy
    );

    return distance < circ1radius + circ2radius
}