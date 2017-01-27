// ╔═╗╔═╗╦  ╔═╗╦═╗╔═╗╦╔═╗╦╔═╔═╗╦═╗
// ║  ║ ║║  ║ ║╠╦╝╠═╝║║  ╠╩╗║╣ ╠╦╝
// ╚═╝╚═╝╩═╝╚═╝╩╚═╩  ╩╚═╝╩ ╩╚═╝╩╚═

import layers from './layers';
import palets from './palets';
import categories from './categories';
import pointers from './pointers';

//sama nazwa wiele tłumaczy po prostu colorpicker
export default {

	row : null,
	col_num : null,

	add : function(){
		var that = this;

		$('.colorpicker_box').ColorPicker({

			color: '#ff0000',
			
			onShow: function (colpkr) {
				if($(colpkr).css('display')=='none'){
					$(colpkr).fadeIn(200);
					that.row = $(this).attr('row');
					that.col_num = $(this).attr('col_num');
				}
				return false;
			},
			
			onHide: function (colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},
			
			onChange: function (hsb, hex, rgb) {
				$('#legends tr td[row="'+that.row+'"]').css('backgroundColor', '#' + hex);
				
 					palets.color_arr[ palets.color_arr.length-1 ] = palets.color_arr[ layers.palets_active[layers.active] ].slice()
					palets.color_arr[ palets.color_arr.length-1 ][that.col_num] = '#' + hex;
					//layers.palets_active[layers.active] = layers.palets_active[layers.active]
					
					layers.palets_active[layers.active] = palets.color_arr.length -1;
					layers.colors_active[layers.active][that.row] =  '#' + hex;
					layers.legends[layers.active][that.row][3] =  '#' + hex;

					palets.show();
      		categories.update_color();
			}
		});
	},

	color_border : function(){
		$('.color_border').ColorPicker({

		onBeforeShow: function () {
			$(this).ColorPickerSetColor(pointers.color_border);
		},
				
			onShow: function (colpkr) {
				if($(colpkr).css('display')=='none'){
					$(colpkr).fadeIn(200);
					//colorpicker.row = $(this).attr('row');
					//colorpicker.col_num = $(this).attr('col_num');
				}
				return false;
			},
			
			onHide: function (colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},
			
			onChange: function (hsb, hex, rgb) {
				
				pointers.color_border =  '#' + hex;

				$('.color_border').css('backgroundColor', '#' + hex);
				
				if(pointers.show_border){
					pointers.draw_border(false);
				}

			}
		});
	}
}
