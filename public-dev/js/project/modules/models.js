// ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗
// ║║║║ ║ ║║║╣ ║  ╚═╗
// ╩ ╩╚═╝═╩╝╚═╝╩═╝╚═╝

import canvas from './canvas';
import pointers from './pointers';
import layers from './layers';
import crud from './crud';

// pobieranie danych z selekta inputa switchy (aktualizacja obiektów) button inkrement i dekrement
export default {
	
	canvas : canvas,
	pointers : pointers,
	layers : layers,
	crud : crud,

	button_increment : function(obj){

		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="'+input_to_update+'"]').val()) + 1;

		$('input[name="'+input_to_update+'"]').val(value);
		this.update_from_input( $('input[name="'+input_to_update+'"]') );
	},

	button_decrement : function(obj){

		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="'+input_to_update+'"]').val()) - 1;

		$('input[name="'+input_to_update+'"]').val(value);
		this.update_from_input( $('input[name="'+input_to_update+'"]') );
	},

	update_from_input : function(obj){
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

	console.log(name_class,name_method,this[name_class]);
	console.log(this[name_class][name_method]);

		this[name_class][name_method] = parseInt($(obj).val());
		canvas.draw();
	},

	update_from_input_text : function(obj){
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');
		
		console.log( name_class, name_method );

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

		if(!this[name_class][name_method] ){
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
