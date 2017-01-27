// ╔═╗╦  ╔═╗╦ ╦╔╦╗
// ║  ║  ║ ║║ ║ ║║
// ╚═╝╩═╝╚═╝╚═╝═╩╝

import mouse from './mouse';
import layers from './layers';
import on_category from './on_category';
import excel from './excel';
import store from './store';

export default {

	set_textarea : function(){
		$('#cloud .cloud_text').val( layers.cloud[layers.active] );
	},

	//ustawiamy poprawną pozycję dymka
	set_position : function(){
		var left = mouse.left - on_category.canvas_offset_left;
		var top = mouse.top - on_category.canvas_offset_top;

		$("#canvas_cloud").css({top:parseInt(top - $("#canvas_cloud").height()-30)+'px',left:left+'px'});
	},

	//funkcja odpowiedzialna za wyświetlenie dymka z odpowiednią zawartością
	update_text : function(){

		var l_excel = store.layers[store.project.layers.active].excel;
		
		if((on_category.name != "") && (on_category.name != 'null')){

			var tmp_row = null;
			var find = 0;
			for(var i_row = 0, i_row_max = l_excel.data.length; i_row < i_row_max; i_row++ ){
				if(String(on_category.name).toLowerCase() == String(l_excel.data[i_row][layers.category[layers.active]]).toLowerCase()){
					
					this.set_position();
					var text_tmp = layers.cloud[layers.active];

					for(var i = 0, i_max = l_excel.data[0].length; i < i_max; i++){
						text_tmp = text_tmp.replace('{'+l_excel.data[0][i]+'}',l_excel.data[i_row][i]);
					}

					//dopiero jeśli dymek ma mieć jakaś konkretną zawartość wyświetlamy go
					if(text_tmp!=""){
						$("#canvas_cloud").fadeIn(0);
						$("#canvas_cloud").html(text_tmp);
						find = 1;
					}
				}
			}

			//jeśli nie znaleziono odpowiedniej kategorii
			if (!find) { 
				$("#canvas_cloud").fadeOut(0);
			}

		}
		else{
			$("#canvas_cloud").fadeOut(0);
		}
	}

}
