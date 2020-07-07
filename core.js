import * as graphics from "./layers/graphics.js";
import * as nodeHandler from "./layers/nodeHandler.js";

class core {
	static _frame() {
		graphics.clearCanvas();

		graphics.draw();

		nodeHandler.handle();
	}
}

setInterval(core._frame, 32);
