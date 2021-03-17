export function clamp(
    value: number,
    min: number,
    max: number
) {
    return Math.max(
        Math.min(value, max)
    , min)
}

export function lerp(
    start: number,
    end: number,
    time: number
) {
    return start * (1-time) + end * time
}

function deg2rad(degrees : number) {
    return degrees * (Math.PI/180);
}

export class Vector2 {
    constructor(
        public x = 0,
        public y = 0,
    ) {}

    /** returns a vector multiplied by a number */
    mulByNum(n : number) {
        return new Vector2(
            this.x * n,
            this.y * n
        )
    }

    inverted() {
        return new Vector2(
            this.x * -1,
            this.y * -1
        )
    }

    rotated(degrees : number) {
        let sin = Math.sin(deg2rad(degrees));
        let cos = Math.cos(deg2rad(degrees));
        
        let vec = new Vector2(this.x, this.y)
        let tx = vec.x;
        let ty = vec.y;
        vec.x = (cos * tx) - (sin * ty);
        vec.y = (sin * tx) + (cos * ty);
        return vec;
    }

    toString() {
        return `(x:${this.x},y:${this.y})`
    }
}

//shorthands
export type Vec2 = Vector2
export let Vec2 = (x=0, y=0)=>new Vector2(x, y)
export let num2vec = (n=0) => Vec2(n, n)