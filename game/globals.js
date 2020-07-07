//Aqui ficam as classes e também o intermediário
//para a comunicação entre o core e o main

//Não crie classes que só servem para o seu jogo aqui
//Ao invés disso, coloque elas no main

let globals = {
	canvasBG: "#ffffff",
};

let gameObjects = [];

function Vector2(x, y) {
	x = x || 0;
	y = y || 0;
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

		this.inheritsClass = function (what) {
			let currentClass = this.__proto__;

			while (currentClass.constructor.name != what) {
				currentClass = currentClass.__proto__;
			}

			return currentClass.constructor.name == what;
		};

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
	set globalPos(value) {
		this._globalPos = value;
	}

	get globalPos() {
		return this._globalPos;
	}

	set relativePos(value) {
		console.log("Change globalPos instead");
	}

	get relativePos() {
		let vec;
		if (this.parent) {
			vec = Vector2(
				this.globalPos.x + this.parent.globalPos.x,
				this.globalPos.y + this.parent.globalPos.y
			);
		} else {
			vec = this.globalPos;
		}

		return vec;
	}

	constructor() {
		super();

		this.visible = true;
		this._globalPos = Vector2(0, 0);
	}
}

class RectangleSprite extends Node2D {
	constructor(extents) {
		super();

		this.color = "#000000";
		this.extents = extents || Vector2(8, 8);
	}
}
