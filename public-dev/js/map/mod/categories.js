// ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

import menuTop from './menuTop';
import colpick from './colpick';
import points from './points';
import canvas from './canvas';
import store from './store';

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
export default {

	//dodajemy nową kategorię
	add () {
		store.map.categories.push({
			name : $('#category_box input[name="addCategory"]').val(),
			color : store.categories.colorDefault
		});
		
		if(store.map.categories.length == 2){
			store.menuTop.category = 1;
		};

		$('#category_box input[name="addCategory"]').val('');
		this.showList();
	},

	//aktualizujemy już istniejącą kategorię
	update (index,name) {
		store.map.categories[index].name = name;
		this.showList();
	},

	//usuwamy kategorię
	remove (id) {
store.map.categories.slice



		let th = this;
		$.each(store.map.categories,function(index,value){
			if(index >= id){
				th.category[index] = th.category[index+1];
			}
		});
		for(let row = 0; row < store.map.points.db.length; row++){
			for(let column = 0; column < store.map.points.db[row].length; column++){
				if(store.map.points.db[row][column] == id){ 
					store.map.points.db[row][column] = 0;
				}
				if(store.map.points.db[row][column] > id){
					store.map.points.db[row][column] = parseInt(store.map.points.db[row][column]) - 1;
				}
			}
		}

		store.map.categories.pop();
		this.showList();
		canvas.draw();
	},

	showList () {
		let addCategory = "<table>"; 
		let addSelect = '';

		for(let i = 1, iMax = store.map.categories.length; i < iMax; i++){
			addCategory += '<tr><td><span>' + i + '</span></td><td><input type="text" name="category_name" id_category="' + i + '" value="' + store.map.categories[i].name+ '" /></td><td><div class="colpick_box" style="background-color:' + store.map.categories[i].color + '" id_category="' + i + '"></div></td><td><button class="remove" id_category="' + i + '">usun</button></td></tr>';
			addSelect += '<option name="' + i + '">' + store.map.categories[i].name + '</option>';
		}

		if(store.map.categories.length > 1){
			$('select#change_category').html(addSelect).show(500);
			$('select#change_category option').eq( store.menuTop.category ).attr('selected');
		}else{
			$('select#change_category').hide(500);
		}

		addCategory += "</table>";
		$('#category_box #list').html(addCategory);
		
		colpick.add();
	}
}
