// ╔═╗╔═╗╦╔╗╔╔╦╗╔═╗╦═╗╔═╗
// ╠═╝║ ║║║║║ ║ ║╣ ╠╦╝╚═╗
// ╩  ╚═╝╩╝╚╝ ╩ ╚═╝╩╚═╚═╝

import canvas from './canvas';
import menu_top from './menu_top';
import pointers from './pointers';
import layers from './layers';
import figures from './figures';
import store from './store';

//menu pointer
export default {

	draw_border: function(next){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		var l_pointers = store.layers[store.project.layers.active].pointers;

		var width_pointer = l_pointers.size + l_pointers.padding_x,
				height_pointer = l_pointers.size + l_pointers.padding_y,
				none_color = "rgba(0,0,0,0)",
				border = {},
				data = {};
		
		var next = next || false;

		if((l_pointers.main_kind == 'square') || (l_pointers.main_kind == 'circle') || (l_pointers.main_kind == 'hexagon') || (l_pointers.main_kind == 'hexagon2')){
				
			l_canvas.context.globalAlpha=1;


			if(!next){
				l_canvas.context.fillStyle = 'rgba(255,255,255,1)';
			}
			else{
				l_canvas.context.fillStyle = l_pointers.color_border;
			}

			for(var row = 0; row < l_canvas.active_row; row++){
				for(var column = 0; column < l_canvas.active_column; column++){

					if(l_pointers.pointers[row][column] != 0){

						border = {
							top: false,
							top_left : false,
							top_right : false,
							right: false
						};

						//rysujemy połówkami
						//sprawdzamy czy mamy włączoną opcje modulo
						if(row-1 >= 0){
							if(!pointers.translate_modulo){
								//jeśli nie to sprawdzamy tradycyjnie włączoną granicę nad 
								if((l_pointers.pointers[row-1][column] != 0)&&(l_pointers.pointers[row-1][column] != l_pointers.pointers[row][column])){
									border.top = true;
								}
							}
							else{
								//jeśli tak to: sprawdzamy czy wiersz jest przesunięty
								if(row % 2 == 0){
									if((column-1) > 0){
										if((l_pointers.pointers[row-1][column] != 0)&&(l_pointers.pointers[row-1][column] != l_pointers.pointers[row][column])){
											border.top_left = true;
										}
									}
									if((l_pointers.pointers[row-1][column+1] != 0)&&(l_pointers.pointers[row-1][column+1] != l_pointers.pointers[row][column])){
										border.top_right = true;
									}
								}
								else{
									if((l_pointers.pointers[row-1][column-1] != 0)&&(l_pointers.pointers[row-1][column-1] != l_pointers.pointers[row][column])){
										border.top_left = true;
									}
									if((column+1) <= l_canvas.active_column){
										if((l_pointers.pointers[row-1][column] != 0)&&(l_pointers.pointers[row-1][column] != l_pointers.pointers[row][column])){
											border.top_right = true;
										}
									}
								}
							}	
						}

						if((column+1) <= l_canvas.active_column){
							if((l_pointers.pointers[row][column+1] != 0)&&(l_pointers.pointers[row][column+1] != l_pointers.pointers[row][column])){
								border.right = true;
							}
						}

						data = {
							x : column*width_pointer,
							y : row*height_pointer,
							size : l_pointers.size,
							border : border,
							line_width_x : pointers.padding_x,
							line_width_y : pointers.padding_y,
							t_modulo : false,
							ctx : l_canvas.context,
						}

						if( (row % 2 == 0) && (pointers.translate_modulo) ){
							data.x = column*width_pointer + width_pointer/2;
						}

						if(!next){
							figures.square_border_big(data);
						}
						else{
							figures.square_border_small(data);
						}
					}
				}	
			}
		}

		if(!next){
			this.draw_border(true);
		}
	},

	//rysowanie wszystkich punktów
	draw : function(){

		var l_pointers = store.layers[store.project.layers.active].pointers;
		var l_canvas = store.layers[store.project.layers.active].canvas;
		var width_pointer = l_pointers.size + l_pointers.padding_x;
		var height_pointer = l_pointers.size + l_pointers.padding_y;
		var none_color = "rgba(0,0,0,0)"

		if(l_pointers.show_all_point) none_color = "rgba(128,128,128,1)";

				for(var row = 0; row < l_canvas.active_row; row++){
				for(var column = 0; column < l_canvas.active_column; column++){

				if(l_pointers.pointers[row][column] == 0){
					l_canvas.context.fillStyle = none_color;
					l_canvas.context.globalAlpha = 0.5;
				}
				else{				

					if( (l_pointers.pointers[row][column] != menu_top.category) && (menu_top.category != 0) ){
						l_canvas.context.globalAlpha = 0.2
					}
					else{
						l_canvas.context.globalAlpha = 1
					}
					try{
						l_canvas.context.fillStyle = layers.category_colors[layers.active][ l_pointers.pointers[row][column] ];
					}
					catch(e){
						console.log('ERROR 39 LINE ! ',l_pointers.pointers[row][column],row,column);
					}
				}

				if( (row % 2 == 0) && (pointers.translate_modulo) ){
					var data = {
						x : column*width_pointer + width_pointer/2,
						y :row*height_pointer,
						size :l_pointers.size,
						ctx : l_canvas.context,
					}
				}
				else{
					var data = {
						x : column*width_pointer,
						y : row*height_pointer,
						size : l_pointers.size,
						ctx : l_canvas.context,
					}
				}

				figures[l_pointers.main_kind]( data );

			}
		}

		if(l_pointers.show_border){
			this.draw_border(false);
		}

	},

	//tworzymy tablice ponterów (jeśli jakiś ponter istnieje zostawiamy go, w przypadku gdy pointera nie ma tworzymy go na nowo)
	create_array : function(){

		var l_pointers = store.layers[store.project.layers.active].pointers;
		var l_canvas = store.layers[store.project.layers.active].canvas;
		
		l_canvas.active_row = parseInt( l_canvas.height / (l_pointers.size + l_pointers.padding_y) );
		l_canvas.active_column = parseInt( l_canvas.width / (l_pointers.size + l_pointers.padding_x) );

		if( (l_pointers.pointers.length < l_canvas.active_row) || (l_pointers.pointers[0].length < l_canvas.active_column) )
		{
			for (var row = 0; row < l_canvas.active_row; row++)
			{
				for (var column = 0; column < l_canvas.active_column; column++)
				{
					if(l_pointers.pointers[row] == undefined) l_pointers.pointers[row] = new Array();
					if(l_pointers.pointers[row][column] == undefined)	l_pointers.pointers[row][column] = 0;
				}
			}
		}
	},

	update_point : function(y,x,y_last,x_last){

		var l_pointers = store.layers[store.project.layers.active].pointers;
		l_pointers.pointers[y][x] = parseInt( menu_top.category );

		//wyznaczenie równania prostej
		if( ((y_last != y) || (x_last != x)) && (y_last != null) && (x_last != null) ){
			var a = (y_last - y) / (x_last - x);
			var b = y - a*x;

			if(x_last > x){
				var col_from = x;
				var col_to = x_last;
			}else{
				var col_to = x;
				var col_from = x_last;
			}

			if(y_last > y){
				var row_from = y;
				var row_to = y_last;
			}else{
				var row_to = y;
				var row_from = y_last;
			}

			var row = null;
			for(var col = col_from; col <= col_to; col++)
			{
				row = parseInt( a*col+b );
				if(!$.isNumeric(row)) row = y;
				l_pointers.pointers[row][col] = parseInt( menu_top.category );
			}

			var col = null;
			for(var row = row_from; row <= row_to; row++)
			{
				col = parseInt( (row-b)/a );
				if(!$.isNumeric(col)) col = x;
				l_pointers.pointers[row][col] = parseInt( menu_top.category );
			}
		}
		else{
			l_pointers.pointers[y][x] = parseInt( menu_top.category );
		}
	}
}
