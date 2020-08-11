//Esse é o core, ele gerencia todas as layers

class core {
	static _frame() {
		graphicsEngine2D.clearCanvas();

		//Gerencia os nodes
		nodeHandler.handleAll();

		//Desenha todos os nodes do canvas
		graphicsEngine2D.drawAll();
	}
}

//chama core._frame a cada 32 milisegundos
setInterval(core._frame, 32);
