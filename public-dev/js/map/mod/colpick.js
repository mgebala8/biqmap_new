// ╔═╗╔═╗╦  ╔═╗╦═╗╔═╗╦╔═╗╦╔═╔═╗╦═╗
// ║  ║ ║║  ║ ║╠╦╝╠═╝║║  ╠╩╗║╣ ╠╦╝
// ╚═╝╚═╝╩═╝╚═╝╩╚═╩  ╩╚═╝╩ ╩╚═╝╩╚═

import categories from './categories';
import canvas from './canvas';
import store from './store';

//sama nazwa wiele tłumaczy po prostu colorpicker
export default  {
 
	add () { 
		this.remove();

		$('.colpick_box').ColorPicker({
			color: '#ff0000', 
			onShow: function(colpkr) {
				if($(colpkr).css('display')=='none'){
					$(colpkr).fadeIn(200);
					store.colpick.clickId = $(this).attr('id_category');
				}
				return false;
			},
			onHide: function(colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},
			onChange: function(hsb, hex, rgb) {
				$('.colpick_box[id_category="' + store.colpick.clickId +'"]').css('backgroundColor', '#' + hex);
				store.map.categories[ store.colpick.clickId ].color = '#' + hex;
				canvas.draw();
			}
		});
	}, 

	remove () {
		$('.colorpicker').remove();
	}
}
