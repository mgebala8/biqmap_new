// ╔═╗╔═╗╔╗╔╦  ╦╔═╗╔═╗
// ║  ╠═╣║║║╚╗╔╝╠═╣╚═╗
// ╚═╝╩ ╩╝╚╝ ╚╝ ╩ ╩╚═╝

import points from './points';
import canvas from './canvas';
import menuTop from './menuTop';
import image from './image';
import store from './store';

//czyszczenie i rysowanie po canvasie
export default {

	//przypisanie podstawowych danych do obiektu canvas
	init () {
	
		store.canvas.obj = document.getElementById('main_canvas');
		store.canvas.ctx = store.canvas.obj.getContext('2d');

		$('#main_canvas').attr({'width':store.map.canvas.width + 'px','height':store.map.canvas.height + 'px'})
		$('#canvas_box, #canvas_wrapper').css({'width': store.map.canvas.width + 'px','height' : store.map.canvas.height + 'px'});

  	let offset = $('#canvas_box').offset();
 		store.canvas.offsetLeft = offset.left;
   	store.canvas.offsetTop  = offset.top;
	},

	thumbnail () {
		var dataURL = store.canvas.obj.toDataURL();
		console.log(dataURL);
	},

	//rysujemy canvas ze zdjęciem
	draw () {
		this.clear();
	
		points.draw();
		if (store.map.image.src !== null){ image.draw();	 }
	},

	//resetujemy tło zdjęcia
	reset () {
		store.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
		store.canvas.ctx.scale( store.canvas.scale / 100 , store.canvas.scale / 100 );
	},

	// czyścimy całe zdjęcie na canvasie
	clear () {
		store.canvas.ctx.clearRect( 0, 0, store.map.canvas.width, store.map.canvas.height );
	},

	resizeWidth (width) {
		
		store.map.canvas.width = width;
		points.createDb();
		
		$('#main_canvas').attr('width',width + 'px');
		$('#canvas_box, #canvas_wrapper').css({'width': width + 'px'});
		$('#canvas_info #width').val(width + 'px');
		
		store.canvas.scale = 100;
		$('#canvas_info #size').val('100%');
		menuTop.showInfo();
	},

	resizeHeight (height) {
		
		store.map.canvas.height = height;
		points.createDb();

		$('#main_canvas').attr('height',height + 'px');
		$('#canvas_box, #canvas_wrapper').css({'height': height + 'px'});
		$('#canvas_info #height').val(height + 'px');
		
		store.canvas.scale = 100;
		
		$('#canvas_info #size').val('100%');
		menuTop.showInfo();

	},

	setDefault () {

		$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
		if(image.move_image) $('#canvas_box #image_resize').fadeIn(0);

		store.canvas.scale = 100;
		store.canvas.ctxX = 0;
		store.canvas.ctxY = 0;
		store.canvas.ctxNewX = 0;
		store.canvas.ctxNewY = 0;
		store.canvas.ctx.scale( store.canvas.scale / 100 , store.canvas.scale / 100 );

		var newWidth = store.map.canvas.width * (store.canvas.scale/100);
		var newHeight = store.map.canvas.height * (store.canvas.scale/100);
		$('#main_canvas').attr({'width': newWidth + 'px','height': newHeight + 'px'});
		$('#canvas_box, #canvas_wrapper').css({'width': newWidth + 'px','height' : newHeight + 'px'});

		canvas.reset();
		store.canvas.ctx.translate( ( store.canvas.ctxX / (store.canvas.scale / 100) ),( store.canvas.ctxY / (store.canvas.scale / 100) ));
		menuTop.showInfo();
		canvas.draw();
	}
}
