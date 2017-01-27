// ┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌─┐
// ├┤ ││ ┬│ │├┬┘├┤ └─┐
// └  ┴└─┘└─┘┴└─└─┘└─┘

import canvas from './canvas';
import store from './store'

//funkcje rysujące pojedyńczy punkt
export default {

	//square
	figure_0 (x,y,size) {
		store.canvas.ctx.fillRect(x,y,size,size);
	},

	//circle
	figure_1 (x,y,size) {
		var size = size / 2;
		var centerX = x + size;
		var centerY = y + size;
		store.canvas.ctx.beginPath();
		store.canvas.ctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
		store.canvas.ctx.fill();
	},

	//hexa
	figure_2 (x,y,size) {
		var a = size/4;
		var a2 = size/2;
		var h = size/2*Math.sqrt(3)/2;

		store.canvas.ctx.beginPath();
		store.canvas.ctx.moveTo(x,y+a2);
    store.canvas.ctx.lineTo(x+a,y+a2-h);
  	store.canvas.ctx.lineTo(x+a+a2,y+a2-h);
		store.canvas.ctx.lineTo(x+size,y+a2);
		store.canvas.ctx.lineTo(x+size-a,y+a2+h);
		store.canvas.ctx.lineTo(x+a,y+a2+h);
		store.canvas.ctx.lineTo(x,y+a2);
		store.canvas.ctx.fill();
	},

	//hexa2
	figure_3 (x,y,size) {
		var a = size/4;
		var a2 = size/2;
		var h = size/2*Math.sqrt(3)/2;

		store.canvas.ctx.beginPath();
		store.canvas.ctx.moveTo(x+a2,y);
    store.canvas.ctx.lineTo(x+a2+h,y+a);
  	store.canvas.ctx.lineTo(x+a2+h,y+a2+a);
    store.canvas.ctx.lineTo(x+a2,y+size);
    store.canvas.ctx.lineTo(x+a2-h,y+a2+a);
    store.canvas.ctx.lineTo(x+a2-h,y+a);
    store.canvas.ctx.lineTo(x+a2,y);
		store.canvas.ctx.fill();

	}
}
