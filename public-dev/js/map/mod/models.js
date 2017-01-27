// ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗
// ║║║║ ║ ║║║╣ ║  ╚═╗
// ╩ ╩╚═╝═╩╝╚═╝╩═╝╚═╝

import canvas from './canvas';
import points from './points';
import menuTop from './menuTop';

// pobieranie danych z selekta inputa switchy (aktualizacja obiektów) button inkrement i dekrement
export default {

	points : points,
	menuTop : menuTop,
	canvas : canvas,

	buttonIncrement (obj) {
		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="'+input_to_update+'"]').val()) + 1;
		
		$('input[name="'+input_to_update+'"]').val(value);
		this.update_from_input( $('input[name="'+input_to_update+'"]') );
	},

	buttonDecrement (obj) {
		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="'+input_to_update+'"]').val()) - 1;
		
		$('input[name="'+input_to_update+'"]').val(value);
		this.update_from_input( $('input[name="'+input_to_update+'"]') );
	}, 

	update_from_input : function(obj){
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');
		
		console.log('update_from_input');

		this[name_class][name_method] = parseInt( $(obj).val() );
		canvas.draw();  
	},

	update_from_input_text : function(obj){
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');
		
		this[name_class][name_method] = $(obj).val();
		canvas.draw();
	},

	update_from_select : function(obj){
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');
		
		this[name_class][name_method] = $(obj).find('option:selected').attr('name');
		canvas.draw();
	},

	update_from_switch : function(obj){

		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		if( $(obj).attr("value") == 'false' ){
			$(obj).attr("value",'true');
			$(obj).removeClass('switch-off');
			$(obj).addClass('switch-on');
			this[name_class][name_method] = true;
		}
		else{ //wyłączamy przełącznik
			$(obj).attr("value",'false');
			$(obj).removeClass('switch-on');
			$(obj).addClass('switch-off');
			this[name_class][name_method] = false;
		}
		
		canvas.draw();

	}
}
