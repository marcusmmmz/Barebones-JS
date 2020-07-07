/*
let player = {
	position: { x: 500, y: 50 },
};
*/

let player = new Node2D();
player.addChild(new RectangleSprite());
player.global_position = Vector2(250, 250);

player._frame = function (delta) {
	if (Input.pressed("Up")) {
		player.global_position.y -= 2;
	}

	if (Input.pressed("Down")) {
		player.global_position.y += 2;
	}

	if (Input.pressed("Left")) {
		player.global_position.x -= 2;
	}

	if (Input.pressed("Right")) {
		player.global_position.x += 2;
	}
};

//graphics.draw.rect(player.position, { x: 10, y: 10 }, "#000000");
