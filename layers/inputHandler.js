//Esse é o script que gerencia os inputs
//se precisar de mais opções de input, modifique o quanto quiser

class InputMap {
	static actions = {
		Up: {
			binds: ["ArrowUp", "w", "W"],
			pressed: false,
			handled: false,
		},
		Left: {
			binds: ["ArrowLeft", "a", "A"],
			pressed: false,
			handled: false,
		},
		Down: {
			binds: ["ArrowDown", "s", "S"],
			pressed: false,
			handled: false,
		},
		Right: {
			binds: ["ArrowRight", "d", "D"],
			pressed: false,
			handled: false,
		},
	};

	static addAction(action, binds) {
		if (typeof binds != "object") {
			binds = [binds];
		}

		this.actions[action] = { binds: binds, pressed: false, handled: false };
	}
}

document.addEventListener("keydown", (event) => {
	for (const action in InputMap.actions) {
		if (InputMap.actions[action].binds.includes(event.key)) {
			InputMap.actions[action].pressed = true;
		}
	}
});

document.addEventListener("keyup", (event) => {
	for (const action in InputMap.actions) {
		if (InputMap.actions[action].binds.includes(event.key)) {
			InputMap.actions[action].pressed = false;
			InputMap.actions[action].handled = false;
		}
	}
});

canvas.addEventListener("mousedown", (event) => {
	for (const action in InputMap.actions) {
		if (InputMap.actions[action].binds.includes(event.button)) {
			InputMap.actions[action].pressed = true;
			InputMap.actions[action].handled = false;
		}
	}
});

canvas.addEventListener("mouseup", (event) => {
	for (const action in InputMap.actions) {
		if (InputMap.actions[action].binds.includes(event.button)) {
			InputMap.actions[action].pressed = false;
		}
	}
});

class Input {
	static mouse_position = new Vector2(0, 0);

	static pressed(button) {
		return InputMap.actions[button].pressed;
	}

	static justPressed(button) {
		if (InputMap.actions[button].pressed) {
			if (!InputMap.actions[button].handled) {
				InputMap.actions[button].handled = true;
				return true;
			}
		}

		return false;

		/*
		if pressed and !handled
			handled = false
			return true
		*/
	}

	static get_global_mouse_position() {
		return new Vector2(
			this.mouse_position.x - canvas.offsetLeft,
			this.mouse_position.y - canvas.offsetTop
		);
	}

	static get_local_mouse_position() {
		return new Vector2(
			this.mouse_position.x -
				root.currentCamera.position.x -
				canvas.offsetLeft,
			this.mouse_position.y -
				root.currentCamera.position.y -
				canvas.offsetTop
		);
	}
}

canvas.addEventListener("mousemove", (event) => {
	Input.mouse_position = new Vector2(event.x, event.y);
});
