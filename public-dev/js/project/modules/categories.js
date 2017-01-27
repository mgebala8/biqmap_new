// ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

import menu_top from './menu_top';
import layers from './layers';
import colorpicker from './colorpicker';
import pointers from './pointers';
import crud from './crud';
import excel from './excel';
import canvas from './canvas';

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
export default {

	add : function(){
		var name = Array($('#category_box input[name="add_category"]').val(),'#ff0000');
		$('#category_box input[name="add_category"]').val('');

		alert( );

		this.category.push(name);
		menu_top.category = (this.category.length-1);
		this.show_list();
		this.update_color();
	},

	update : function(index,name){

		console.log(index, name);

		this.category[index][0] = name;
		this.show_list();
		this.update_color();
	},

	//aktualizujemy tablicę kolorów
	update_color : function(){

		//możliwa aktualizacja jedynie w przypadku wybrania konkretnej kolumny wartości i kategorii w excelu
		if((crud.map_json.length > 0) && (excel.data.length > 0) && (layers.category[layers.active] != -1) && (layers.value[layers.active] != -1)){

			for (var i_category = 0, i_category_max =	layers.category_name.length; i_category < i_category_max; i_category++){
				var name = layers.category_name[i_category];
				var find = false;

				for (var i_layers = 0, i_layers_max = layers.list.length; i_layers < i_layers_max; i_layers++){
					for (var i_exel = 0, i_exel_max = excel.data.length; i_exel < i_exel_max; i_exel++){
						if(( String(excel.data[i_exel][layers.category[i_layers]]).toLowerCase() == String(name).toLowerCase()) && (excel.data[i_exel][layers.category[i_layers]] != '')){

							find = true;
							//jeśli znaleźliśmy kategorię w excelu
							var value = String(excel.data[i_exel][layers.value[i_layers]]).replace(',','.');
							//console.log(excel.data[i_exel][layers.value[i_layers]]+' | '+value);
							
							for ( var i_legends = 0, i_legends_max = layers.legends[i_layers].length; i_legends < i_legends_max; i_legends++ ){
								if( (value >= layers.legends[i_layers][i_legends][0]) && (value <= layers.legends[i_layers][i_legends][1]) ){
									//jeśli znaleźlismy
									layers.category_colors[i_layers][i_category] = layers.legends[i_layers][i_legends][3];
									i_legends = i_legends_max;
									i_exel = i_exel_max;
								}
							}

							//jeśli wartość wychodzi poza skale u tak przypisujemy jej odpowiedni kolor
							if(value < layers.legends[i_layers][0][0]){
								layers.category_colors[i_layers][i_category] = layers.legends[i_layers][0][3];
							}	

							if(value > layers.legends[i_layers][i_legends_max-1][1]){
								layers.category_colors[i_layers][i_category] = layers.legends[i_layers][i_legends_max-1][3];
							}
							
							//jeśli dany kraj w excelu ma wartość null domyślnie otrzymuje kolor biały
							if(value == null){
								layers.category_colors[i_layers][i_category] = '#fff';
							}

						}
					}

					//w przypadku gdy dany kraj nie występuje w pliku excel otrzymuje kolor biały
					if(!find){
						layers.category_colors[i_layers][i_category] = '#fff';
					}
				}


			}
		}

		//po zaktualizowaniu kolorów w kategoriach rysujemy na nowo canvas
		canvas.draw();

	},

	remove : function(id){
		var th = this;

		$.each(this.category,function(index,value){
			if(index >= id){
				th.category[index] = th.category[index+1];
			}
		});

		for(var row = 0; row < pointers.pointers.length; row++){
			for(var column = 0; column < pointers.pointers[row].length; column++){

				if(pointers.pointers[row][column] == id){
					pointers.pointers[row][column] = 0;
				}

				if(pointers.pointers[row][column] > id){
					pointers.pointers[row][column] = parseInt(pointers.pointers[row][column]) - 1;
				}

			}
		}

		this.category.pop();
		this.show_list();
		
		//rysujemy na nową canvas
		canvas.draw();
	},

	show_list : function(){

		var add_category = "<table>";

		for(var i = 1, i_max = this.category.length; i < i_max; i++){
			add_category += '<tr><td><span>'+(i)+'</span></td><td><input type="text" name="category_name" id_category="'+(i)+'" value="'+this.category[(i)][0]+'" /></td></tr>';
		}

		add_category += "</table>";
		$('#palets_box #area > div').html(add_category);
		
	}
}
