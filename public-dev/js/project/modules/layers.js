// ╦  ╔═╗╦ ╦╔═╗╦═╗╔═╗
// ║  ╠═╣╚╦╝║╣ ╠╦╝╚═╗
// ╩═╝╩ ╩ ╩ ╚═╝╩╚═╚═╝

import palets from './palets';
import legends from './legends';
import canvas from './canvas';
import cloud from './cloud';
import labels from './labels';
import store from './store';

export default {

	//list : ['zakładka 1'],
	//active : 0,

	//tablica z podstawowywmi danymi zagregowanymi dla każdej warstwy
	palets_active : [0],

	value : [-1],
	colors_pos : [[1,1,1,1,1,1,1,1,1]],
	colors_active : [["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]],
	//min_value : [0],
	//max_value : [0],
	cloud : [""],
	cloud_parser : [""],
	legends : [[]],
	labels : [""],
	category : [-1],
	category_colors : [],
	category_name : [],

	//zmienne globalne dotyczące całego projektu
	project_name : 'nowy projekt',
	source : '',

	//tablica pól uzależnionych od aktualnej warstwy
	db_name : ["list","palets_active","category","category_colors","category_name","value","colors_pos","colors_active","min_value","max_value","cloud","cloud_parser","legends","labels"],
	
	test : function(){
		return 'tak';
	},

	show : function(){
		
		var l_layers = store.layers;

		var html = "";
		var that = this;
		for(var i = 0, i_max = l_layers.length; i < i_max; i++){
			if(i == this.active){
				html += '<span num="'+i+'" contenteditable="true" class="active">' + l_layers[i].name + '</span>';
			}
			else{
				html += '<span num="'+i+'" contenteditable="true" >' + l_layers[i].name + '</span>';
			}
		}

		html += '<button class="add"> + </button><button class="remove"> - </button>';

		$('#layers .chapter').html(html);


		//dodajemy zdarzenia do edycji / zmiany kolejnosci i aktualizowania warstwy
		$('#layers .add').click(function(){
			if(spec.crud.map_hash != null){
				that.add();
			}
			else{
				alert('Aby dodać zakładkę najpierw dodaj mapę');
			}
		});
		
		$('#layers .remove').click(function(){
			if(confirm('Czy chcesz usunąć zakładkę ?')){
				that.remove();
			};
		});
		
		$('#layers .chapter span').click(function(){ that.select(this); });

		$( "#layers .chapter span" ).keyup(function(){
			that.list[that.active] = $(this).html();
		});

		$( "#layers .chapter span" ).dblclick(function(){
			$(this).addClass('contenteditable');
			$(this).blur(function(){ $(this).removeClass('contenteditable') });
		});

		$( "#layers .chapter" ).sortable({ 
			axis: 'x',
			items: 'span',
		 	update: function( event, ui ) {
				$( "#layers .chapter span" ).each(function(index,obj){
					if(index != $(obj).attr('num')){
						that.change_order($(obj).attr('num'),index)
						return false;
					}
				});
		 	},
		 	cancel: '.add,.remove,.contenteditable'
		});
	},

	select : function(obj){
		$('#layers .chapter span').removeClass('active');
		$(obj).addClass('active');
		this.active = $(obj).index();
		var that = this;
		tinyMCE.editors[0].setContent( that.cloud[that.active] );
		palets.show();
		cloud.set_textarea();
		labels.show();
		legends.show();
		canvas.draw();
	},

	//zmiana kolejnjości warstw
	change_order : function(last,next){
		for (var i= 0, i_max = this.db_name.length; i < i_max; i++) {
			var tmp = this[this.db_name[i]][next];
			this[this.db_name[i]][next] = this[this.db_name[i]][last]
			this[this.db_name[i]][last] = tmp;
		}
	},

	//dodajemy nową warstwę
	add : function(){
		
		var tmp_layer = store.layers[store.layers.length-1];
		Object.assign(store.layers,tmp_layer);
		//store.layers.push(tmp_layer)
/*

		l_layers.push('zakładka ' + parseInt(l_layers.length+1));

		this.category.push(-1);
		this.category_colors.push( this.category_colors[this.category_colors.length-1].slice() );
		this.value.push(-1);
		this.palets_active.push(0);
		this.colors_active.push(['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']);
		this.colors_pos.push([1,1,1,1,1,1,1,1,1]);
		this.min_value.push(0);
		this.max_value.push(0);
		this.cloud.push("");
		this.cloud_parser.push("");
		this.legends.push([]);
		this.labels.push("");
		this.show();
*/
	},

	//usuwamy aktualną warstwę
	remove : function(){
		

		var active = store.project.layers.active;
		var l_layers = store.layers[store.project.layers.active].layers;

		//sprawdzamy czy liczba warstw jest większa od 1
		if(store.layers.length > 0){


			if(active == (l_layers.length - 1)){
				var i_tmp = l_layers.length - 1;
				this.select( $('#layers .chapter span').eq( i_tmp ) );
			} 

			store.layers.splice(active, 1);

			//pobieramy numer ostatniej zakładki
			for (var i_layers = active, i_layers_max = l_layers.length-1; i_layers < i_layers_max; i_layers++) {
				for (var i= 0, i_max = this.db_name.length; i < i_max; i++) {
					this[this.db_name[i]][i_layers] = this[this.db_name[i]][i_layers+1];
				}
			}

			//usuwamy ostatnią zakładkę / warstwę
			var last_i = l_layers.length - 1;
			for (var i= 0, i_max = this.db_name.length; i < i_max; i++) {
				this[this.db_name[i]].pop()
				console.log(this[this.db_name[i]][last_i]);
			}

			this.show();
			this.select($('#layers .chapter span.active')); 
		}
		else{
			alert('nie możesz usunąć pierwszej zakładki');
		}
	}
}


//zmienne pomocnicze
$.fn.selectText = function(){
  var doc = document;
  var element = this[0];
  //console.log(this, element);
  if (doc.body.createTextRange) {
  	var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
  	var selection = window.getSelection();        
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
  	selection.addRange(range);
	}
};
