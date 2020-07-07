//Esse é o core, ele gerencia todas as layers

import * as graphics from "./layers/graphics.js";
import * as nodeHandler from "./layers/nodeHandler.js";

class core {
	static _frame() {
		graphics.clearCanvas();

		//Gerencia os nodes
		nodeHandler.handle();

		//Desenha todos os Nodes do canvas
		graphics.draw();
	}
}

//chama core._frame a cada 32 milisegundos
setInterval(core._frame, 32);
