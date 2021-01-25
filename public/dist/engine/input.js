var InputMap = /** @class */ (function () {
    function InputMap() {
    }
    InputMap.addAction = function (action, binds) {
        this.actions[action] = { binds: binds, pressed: false, handled: false };
    };
    InputMap.actions = {};
    return InputMap;
}());
export { InputMap };
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.pressed = function (button) {
        return InputMap.actions[button].pressed;
    };
    Input.justPressed = function (button) {
        var action = InputMap.actions[button];
        if (action.pressed && !action.handled) {
            action.handled = true;
            return true;
        }
    };
    return Input;
}());
export { Input };
document.addEventListener("keydown", function (event) {
    for (var action in InputMap.actions) {
        if (InputMap.actions[action].binds.includes(event.key)) {
            InputMap.actions[action].pressed = true;
        }
    }
});
document.addEventListener("keyup", function (event) {
    for (var action in InputMap.actions) {
        if (InputMap.actions[action].binds.includes(event.key)) {
            InputMap.actions[action].pressed = false;
            InputMap.actions[action].handled = false;
        }
    }
});
