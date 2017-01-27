// ╔═╗╔═╗╔╗╔╦  ╦╔═╗╔═╗
// ║  ╠═╣║║║╚╗╔╝╠═╣╚═╗
// ╚═╝╩ ╩╝╚╝ ╚╝ ╩ ╩╚═╝

import pointers from './pointers';
import canvas from './canvas';
import menu_top from './menu_top';
import image from './image';
import store from './store';

//czyszczenie i rysowanie po canvasie
export default {

/*	
	scale : 100,
	width : 700,
	height : 400,
	canvas : null,
	context : null,
	thumbnail : null,
	title_project : 'nowy projekt',

	context_x : 0, //obecna pozycja contextu x
	context_y : 0, //obecna pozycja contextu y
	context_new_x : 0, //nowa pozycja contextu x
	context_new_y : 0, //nowa pozycja contextu y

	offset_left : null,
	offset_top : null,
	active_row : null, //liczba aktywnych wierszy i kolumn
	active_column : null, //liczba aktywnych wierszy i kolumn
*/

	init : function(){
		
		var l_canvas = store.layers[store.project.layers.active].canvas;

		//przypisanie podstawowowych danych do obiektu canvas
		l_canvas.canvas = document.getElementById('main_canvas');
	  l_canvas.context = l_canvas.canvas.getContext('2d');

	  var offset = $('#canvas_box').offset();
	  l_canvas.offset_left = offset.left;
	  l_canvas.offset_top = offset.top;

	  $('#width_canvas').val(l_canvas.width+'px');
	  $('#height_canvas').val(l_canvas.height+'px');
		
		this.set_default();
	  this.draw();
	},

	thumbnail : function(){
		var canvas = document.getElementById("main_canvas");
		var dataURL = canvas.toDataURL();
		console.log(dataURL);
	},

	//rysujemy canvas ze zdjęciem
	draw : function(){
		this.clear();

		pointers.create_array();
		pointers.draw();

		if (image.obj !== undefined)  image.draw();
	},

	draw_thumnail : function(){ 
/*
		canvas.canvas = document.getElementById('thumbnail_canvas');
		canvas.thumbnail = document.getElementById('thumbnail_canvas');
		canvas.context = canvas.canvas.getContext('2d');

		this.clear();

		pointers.create_array();
		pointers.draw();

		canvas.canvas = document.getElementById('main_canvas');
		canvas.context = canvas.canvas.getContext('2d');
*/
	},

	//resetujemy tło zdjęcia
	reset : function(){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		l_canvas.context.setTransform(1, 0, 0, 1, 0, 0);
		l_canvas.context.scale( l_canvas.scale / 100 , l_canvas.scale / 100 );
	},

	// czyścimy całe zdjęcie na canvasie
	clear : function(){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		l_canvas.context.clearRect ( 0, 0, l_canvas.width, l_canvas.height );
	},

	//zmieniamy szerokość canvasa o podaną liczbę pikseli
	resize_width : function( new_width ){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		l_canvas.width = new_width;
		$('#main_canvas, #canvas_wrapper, #canvas_box').attr('width',l_canvas.width + 'px').css({'width': l_canvas.width + 'px'});
		menu_top.show_info();
	},

	//zmieniamy wysokość canvasa o podaną liczbę pikseli
	resize_height : function( new_height ){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		l_canvas.height = new_height;
		$('#main_canvas, #canvas_wrapper, #canvas_box').attr('height',l_canvas.height + 'px').css({'height': l_canvas.height + 'px'});
		menu_top.show_info(); // aktualizujemy dane odnośnie rozmiarów canvasa w menu u góry
	},

	set_default : function(){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		
		$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
		if(l_canvas.move_image) $('#canvas_box #image_resize').fadeIn(0);

		l_canvas.scale = 100;
		l_canvas.context_x = 0;
		l_canvas.context_y = 0;
		l_canvas.context.scale( l_canvas.scale / 100 , l_canvas.scale / 100 );

		var new_width = l_canvas.width * (l_canvas.scale/100);
		var new_height = l_canvas.height * (l_canvas.scale/100);

		$('#main_canvas, #canvas_wrapper,#canvas_box').css({'width': new_width + 'px','height' : new_height + 'px'});

		this.reset();
		l_canvas.context.translate( ( l_canvas.context_x / (l_canvas.scale / 100) ),( l_canvas.context_y / (l_canvas.scale / 100) ));
		menu_top.show_info();
		this.draw();
	}
}
