const d = document;

const e = d.documentElement;

canvas.width = e.clientWidth;
canvas.height = e.clientHeight;

globals.canvasBG = "rgb(143, 92, 78)";

class Cube extends RectangleSprite {
	constructor(pos, color, d) {
		super();

		this.globalPos = pos;
		this.color = color;

		//extensão (tamanho) do cubo
		this.extents = Vector2(10, 10);

		//velocidade
		this.vel = Vector2(Math.sin(d), Math.cos(d));

		//aceleração
		this.acc = Vector2(0, 0);

		this._frame = function () {
			//anda
			if (
				this.globalPos.x < 0 ||
				this.globalPos.x > canvas.width - this.extents.x
			) {
				this.vel.x *= -1;
			} //colisão em x
			if (
				this.globalPos.y < 0 ||
				this.globalPos.y > canvas.height - this.extents.y
			) {
				this.vel.y *= -1;
			} //colisão em y
			this.globalPos.x += this.vel.x;
			this.vel.x += this.acc.x;
			this.globalPos.y += this.vel.y;
			this.vel.y += this.acc.y;
			//anda e acelera
		};
	}
}

function addCube() {
	//gera um cubo aleatorio
	let x = Math.random() * (canvas.width - 10);
	let y = Math.random() * (canvas.height - 10);
	let d = Math.random() * 360;

	let choices = ["#dec5a2", "#c07931", "#ab7547", "#682f18", "#842414"];
	let color = choices[Math.round(Math.random() * 5)];

	new Cube(Vector2(x, y), color, d);
}

//Gera vários cubos
for (i = 0; i <= 4; i++) {
	addCube();
}

let player = new Cube(Vector2(250, 250), "#ff0000", 10);
player.extents = Vector2(20, 20);

//Extendendo a função frame do player
let old_frame = player._frame;
player._frame = function () {
	old_frame.apply(this, arguments);

	if (Input.pressed("Up")) {
		player.globalPos.y -= 4;
	}

	if (Input.pressed("Down")) {
		player.globalPos.y += 4;
	}

	if (Input.pressed("Left")) {
		player.globalPos.x -= 4;
	}

	if (Input.pressed("Right")) {
		player.globalPos.x += 4;
	}
};
