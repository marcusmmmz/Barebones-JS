export function clamp(value: number, min: number, max: number) {
	return Math.max(Math.min(value, max), min);
}

export function wrap(value: number, min: number, max: number) {
	if (value < min) return max;
	else if (value > max) return min;
	else return value;
}

export function lerp(start: number, end: number, time: number) {
	return start * (1 - time) + end * time;
}

function deg2rad(degrees: number) {
	return degrees * (Math.PI / 180);
}

export class Vector2 {
	constructor(public x = 0, public y = 0) {}

	/** returns a vector multiplied by a number */
	mulByNum(n: number) {
		return Vec2(this.x * n, this.y * n);
	}

	inverted() {
		return Vec2(this.x * -1, this.y * -1);
	}

	rotated(degrees: number) {
		let sin = Math.sin(deg2rad(degrees));
		let cos = Math.cos(deg2rad(degrees));

		let vec = Vec2(this.x, this.y);
		let tx = vec.x;
		let ty = vec.y;
		vec.x = cos * tx - sin * ty;
		vec.y = sin * tx + cos * ty;
		return vec;
	}

	rounded() {
		return Vec2(Math.round(this.x), Math.round(this.y));
	}

	clone() {
		return Vec2(this.x, this.y)
	}

	toString() {
		return `(${this.x},${this.y})`;
	}
}

//shorthands
export type Vec2 = Vector2;
export let Vec2 = (x = 0, y = 0) => new Vector2(x, y);
export let num2vec = (n = 0) => Vec2(n, n);

export function createObservable<T extends (...args: any[]) => any>() {
	type Args = Parameters<T>;
	type Callback = (...args: Args) => any;

	let subscribers: Callback[] = [];

	return {
		subscribe(callback: Callback) {
			if (!subscribers) subscribers = [];
			subscribers.push(callback);
			return callback;
		},
		emit(...args: Args) {
			if (!subscribers) subscribers = [];
			subscribers.forEach((callback) => {
				callback(...args);
			});
		},
		unsubscribe(callback: Callback) {
			subscribers = subscribers.filter((subscriber) => subscriber !== callback);
		},
	};
}
