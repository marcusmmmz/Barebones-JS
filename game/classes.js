let gameObjects = [];

function Vector2(x, y) {
	x = x | 0;
	y = y | 0;
	return { x, y };
}

class BlankNode {
	constructor() {
		gameObjects.push(this);

		this.parent = null;
		this.children = [];

		this.addChild = function (child) {
			this.children.push(child);
			child.parent = this;
		};

		this.class = this.constructor.name;

		this.draw = function () {
			this.drawChildren();
		};

		this.drawChildren = function () {
			for (const child in children) {
				child.draw();
			}
		};
	}
}

class Node2D extends BlankNode {
	set global_position(value) {
		this._global_position = value;
	}

	get global_position() {
		return this._global_position;
	}

	set relative_position(value) {
		this._position = value;
	}

	get relative_position() {
		let vec;
		if (this.parent) {
			vec = Vector2(
				this.global_position.x + this.parent.global_position.x,
				this.global_position.y + this.parent.global_position.y
			);
		} else {
			vec = this.global_position;
		}

		return vec;
	}

	set position(value) {
		console.log("Pls don't change position value");
	}

	get position() {
		return Vector2(
			this.global_position.x + this.relative_position.x,
			this.global_position.y + this.relative_position.y
		);
	}

	constructor() {
		super();

		this.visible = true;
		this._global_position = Vector2(0, 0);
	}
}

class RectangleSprite extends Node2D {
	constructor(extents) {
		super();

		this.color = "#000000";
		this.extents = extents || Vector2(8, 8);
	}
}
