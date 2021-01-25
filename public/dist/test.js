import { ctx } from "./engine/graphics.js";
import { Input, InputMap } from "./engine/input.js";
import { gameObjects } from "./engine/mainloop.js";
import { Vec2 } from "./engine/classes.js";
InputMap.addAction("up", ["ArrowUp", "w", "W"]);
InputMap.addAction("left", ["ArrowLeft", "a", "A"]);
InputMap.addAction("down", ["ArrowDown", "s", "S"]);
InputMap.addAction("right", ["ArrowRight", "d", "D"]);
var Player = /** @class */ (function () {
    function Player() {
        this.pos = Vec2(10, 10);
        this.speed = 3;
    }
    Player.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    };
    Player.prototype.update = function () {
        var _this = this;
        var keys = {
            up: function () { return _this.pos.y -= _this.speed; },
            down: function () { return _this.pos.y += _this.speed; },
            right: function () { return _this.pos.x += _this.speed; },
            left: function () { return _this.pos.x -= _this.speed; }
        };
        for (var _i = 0, _a = Object.keys(keys); _i < _a.length; _i++) {
            var key = _a[_i];
            var func = keys[key];
            if (Input.pressed(key))
                func();
        }
    };
    return Player;
}());
var player = new Player();
gameObjects.push(player);
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.pos = Vec2(100, 100);
        this.speed = 1;
    }
    Enemy.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    };
    Enemy.prototype.update = function () {
        if (this.pos.x > player.pos.x) {
            this.pos.x -= this.speed;
        }
        else {
            this.pos.x += this.speed;
        }
        if (this.pos.y > player.pos.y) {
            this.pos.y -= this.speed;
        }
        else {
            this.pos.y += this.speed;
        }
    };
    return Enemy;
}());
gameObjects.push(new Enemy());
