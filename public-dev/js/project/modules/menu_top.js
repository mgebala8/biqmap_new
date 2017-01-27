// ╔╦╗╔═╗╔╗╔╦ ╦  ╔╦╗╔═╗╔═╗
// ║║║║╣ ║║║║ ║   ║ ║ ║╠═╝
// ╩ ╩╚═╝╝╚╝╚═╝   ╩ ╚═╝╩ 

import crud from './crud';
import store from './store';
import canvas from './canvas';
import image from './image';

//obiekt menu_top
export default {

	//zmiana aktualnej zakładki
	change_box : function(obj){
		var l_menu_top = store.project.menu_top;

		if(!l_menu_top.animate_box){
			l_menu_top.animate_box = !l_menu_top.animate_box;
			
			$(obj).parent().children('li').removeClass('active');
			$(obj).addClass('active');

			var category = $(obj).attr('category');
			
			$(obj).parent().parent().children('div').css('display','none');
			$(obj).parent().parent().children('#'+category).css('display','block');

		}
	},

	//funkcja służąca do pobierania danych dotyczących map
	get_maps : function(){
		
		$.ajax({
   		url: '/api/maps',
    	type: "GET",
    	contentType: "application/json"
		}).done( function( response ) {
			
			//wyświetlamy listę map w panelu u góry
			if(response.status == "ok"){
				var add_html = '<option id="select_map">wybierz mapę</option>';
				for (var i = 0, i_max = response.data.length; i < i_max ;i++){
					if(response.data[i]._id == crud.map_hash){
						add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					}
					else{
						add_html += '<option id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					}
				}
				$('#toolbar_top select.select_map').html( add_html );

				//dodajemu zdarzenie change map 
				$('.select_map').change(function(){
					//sprawdzamy czy wybraliśmy pole z hashem mapy
					if( $(this).find('option:selected').attr('id') != 'select_map'){
						//jeśli tak to sprawdzamy czy wczytujemy mapę po raz pierwszy czy drugi
						if(crud.map_hash != null){
							//jeśli wczytujemy po raz kolejny to pytamy czy napewno chcemy ją wczytać
							if (confirm('Czy chcesz wczytać nową mapę ?')) {
								crud.map_hash = $(this).find('option:selected').attr('id');
								crud.get_map();
							}
						}
						else{
							$('.select_map option').eq(0).remove();
							crud.map_hash = $(this).find('option:selected').attr('id');
							crud.get_map();
						}
					}
				});

			}
			else{
				alert('nie mogę pobrać listy map');
				console.log( response );
			}

		});

	},

	//funkcja służąca do pobierania danych dotyczących map
	get_projects : function(){
		$.ajax({
   		url: '/api/projects',
    	type: "GET",
    	contentType: "application/json"
		}).done( function( response ) {

			//wyświetlamy listę projektów w panelu u góry
			if(response.status == "ok"){

				var add_html = '<option id="new_project">nowy projekt</option>';
				for (var i = 0, i_max = response.data.length; i < i_max ;i++){

					if(response.data[i]._id == crud.project_hash){
						add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].project).name + '</option>';
					}
					else{
						add_html += '<option id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].project).name + '</option>';
					}
				
				}

				$('#toolbar_top select.select_project').html( add_html );
			
				//dodajemu zdarzenie change project 
				$('.select_project').change(function(){
					if (confirm('Czy chcesz wczytać nowy projekt ?')) {
						if( $(this).find('option:selected').attr('id') == 'new_project' ){
							location.reload();
						}
						else{
							crud.project_hash = $(this).find('option:selected').attr('id');
							crud.get_project();
						}
					}
				});

			}
			else{
				alert('nie mogę pobrać listy projektów');
				console.log( response );
			}

		});
	},

	update_canvas_info : function(){
		var l_canvas = store.layers[store.project.layers.active].canvas;
		l_canvas.width = parseInt( $('#width_canvas').val() );
		l_canvas.height = parseInt( $('#height_canvas').val() );

		console.log( 'update_canvas_info', l_canvas.width, l_canvas.height );
		$('#width_canvas').val( l_canvas.width + 'px' );
		$('#height_canvas').val( l_canvas.height + 'px' );

		$('#canvas_box, #canvas_wrapper').css({'width': l_canvas.width + 'px','height':l_canvas.height + 'px'});
		$('#canvas_box #main_canvas').attr('width',l_canvas.width + 'px');
		$('#canvas_box #main_canvas').attr('height',l_canvas.height + 'px');
		canvas.draw();
	},

	change_alpha : function(){
		image.alpha = $('#alpha_image').find('option:selected').attr('name');
		canvas.draw();
	},

	add_image : function(){

		//jesli podany parametr nie jest pusty
		var src_image = prompt("Podaj ścieżkę do zdjęcia: ");

		if(src_image){
			if(src_image.length > 0){

				image.obj = new Image();

				//wczytanie zdjęcia:
				image.obj.onload = function() {
	    		image.width = image.obj.width;
	    		image.height = image.obj.height;
	    		image.draw();
	  		};

			  image.x = 0;
			  image.y = 0;
			  image.obj.src = src_image;
				//simage.obj.setAttribute('crossOrigin', 'anonymous');
			}
		}
	},

	show_info : function(){ 
		var l_canvas = store.layers[store.project.layers.active].canvas;
console.log( 'show_info', l_canvas.width, l_canvas.height );
		
		$('#width_canvas').val(parseInt(l_canvas.width) + 'px');
		$('#height_canvas').val(parseInt(l_canvas.height) + 'px');
	}

}
