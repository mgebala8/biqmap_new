// ╔═╗╔╗╔  ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║ ║║║║  ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╝╚╝  ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

import pointers from './pointers';
import categories from './categories';
import cloud from './cloud';
import mouse from './mouse';

//obiekt mówiący nam nad jaką kategoria jesteśmy
export default {
	
	canvas_offset_top : 187,
	canvas_offset_left : 10,
	name : null,
	number : null,

	//funkcja zwracająca aktualną kategorię nad którą znajduje się kursor
	set : function(){
		
		var left = mouse.left - this.canvas_offset_left;
		var top = mouse.top - this.canvas_offset_top;
		var row = Math.ceil( top / (pointers.size + pointers.padding_y) );
		//console.log(left,top,this.canvas_offset_left,this.canvas_offset_top);
		if((pointers.translate_modulo) && (row % 2 != 0)){
			var column = Math.ceil( (left + (pointers.size/2))/ (pointers.size + pointers.padding_x) ) - 1;
		}
		else{
			var column = Math.ceil( left / (pointers.size + pointers.padding_x) );
		}

		try{
			var category_num = pointers.pointers[row-1][column-1];
			var category_name = categories.category[category_num][0];
		}
		catch(e){
			this.name = null;
			this.number = null;
		}
		
		if((category_name == 'pusty') || (category_name == 'gumuj')){
			this.name = null;
			this.number = null;
		}
		else{
			this.name = category_name;
			this.number = category_num;
		}

	}

}


