export type Vec2 = {
    x: number,
    y: number
}
export function Vec2(x : number, y : number) : Vec2 { return {x, y} }

export interface GameObj {
    draw() : void
    update?() : void
}
export interface GameObj2D extends GameObj{ 
    pos : Vec2
}