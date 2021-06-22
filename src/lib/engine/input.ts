import { browser } from "$app/env";

export class InputMap {
	static actions: {
		[key: string]: {
			binds: string[];
			pressed: boolean;
			handled: boolean;
		};
	} = {};

	static addAction(action: string, binds: string[]) {
		this.actions[action] = { binds, pressed: false, handled: false };
	}
}
export class Input {
	static pressed(button: string) {
		return InputMap.actions[button].pressed;
	}

	static justPressed(button: string) {
		const action = InputMap.actions[button];
		if (action.pressed && !action.handled) {
			action.handled = true;
			return true;
		}
	}
}
if (browser) {
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
}
