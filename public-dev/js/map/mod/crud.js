// ╔═╗╦═╗╦ ╦╔╦╗
// ║  ╠╦╝║ ║ ║║
// ╚═╝╩╚═╚═╝═╩╝

import canvas from './canvas';
import crud from './crud';
import points	from './points';
import categories from './categories';
import image from './image';
import menuTop from './menuTop';

import store from './store'

//funkcja odpowiedzialna za tworzenie zapisywanie i aktualizacje danych dotycząćcyh mapy
export default {

	//wyświetlamy listę map w panelu u góry
	getMaps () {
		$.ajax({
   		url: '/api/maps',
    	type: "GET",
    	contentType: "application/json"
		}).done( function( response ) {

			if(response.status == "ok"){

				store.mapsList = [];

				console.log( 'pobrane dane' + response);

				for (var i = 0, i_max = response.data.length; i < i_max ;i++){

					if( response.data[i].hasOwnProperty("data") ){
						store.mapsList.push({
							id : response.data[i]._id,
							title : response.data[i].data.title
						});
					}
					else{
						store.mapsList.push({
							id : response.data[i]._id,
							title : JSON.parse(response.data[i].map_json)[0][7]
						});
					}
				}
			}
		});
	},

	duplicate () {

		store.data.title = 	store.data.title + ' - kopia';
		//aktualizujemy jsona do wysłania ajaxem
		this.get_data();
		var th = this; //zmienna pomocnicza
		
		var data = {
			map_json: th.map_json
		}

		jQuery.ajax({
			url: "api/maps",
			data: { map_json: th.map_json },
			type: 'POST',
			success: function(response){
		
				if(response.status == 'ok'){
					th.map_hash = response.hash_map;
					crud.select_map(th.map_hash);
					th.getMaps(); //pobranie listy map i wyświetlenie jej w menuTop
				}

			}
		});

	},

	//pobieramy dane z porojektu i zapisujemy je do json-a
	getData () {

		//zerujemy na nowo całą tablicę pointerów
		this.map_json = Array();

		// data[x] = zmienne podstawowe dotyczące mapy
		this.map_json[0] = Array();
		this.map_json[0][0] = canvas.height_canvas;
		this.map_json[0][1] = canvas.width_canvas;
		this.map_json[0][2] = points.padding_x;
		this.map_json[0][3] = points.padding_y;
		this.map_json[0][4] = points.translate_modulo;
		this.map_json[0][5] = points.size_pointer;
		this.map_json[0][6] = points.main_kind;
		this.map_json[0][7] = canvas.title_project;

		// data[1] = tablica punktów (points.points) [wiersz][kolumna] = "none" || (numer kategorii)
		this.map_json[1] = points.points;

		// data[2] = tablica kategorii
		this.map_json[2] = categories.category;

		//data[3] = tablica wzorca (zdjęcia w tle do odrysowania)
		this.map_json[3] = Array();

		if(image.obj){
			this.map_json[3][0] = image.obj.src;
			this.map_json[3][1] = image.x;
			this.map_json[3][2] = image.y;
			this.map_json[3][3] = image.width;
			this.map_json[3][4] = image.height;
			this.map_json[3][5] = image.alpha;
		}

		//konwertujemy nasza tablice na json
		//console.log('MAP _ JSON', this.map_json, JSON.stringify( this.map_json ));
		this.map_json = JSON.stringify(this.map_json);

	},

	//pobranie mapy z bazy danych
	special () {

		var th = this;  

		//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
		var response = crud.data;

		//pobieramy i wczytujemy dane o canvasie do obiektu
		canvas.height_canvas = response[0][0];
		canvas.width_canvas = response[0][1];
		points.padding_x = response[0][2];
		points.padding_y = response[0][3];
		points.translate_modulo = response[0][4];
		points.size_pointer = response[0][5];
		points.main_kind = response[0][6];
		canvas.title_project = response[0][7];

		$('#pointer_box input[name="padding_x"]').val( response[0][2] );
		$('#pointer_box input[name="padding_y"]').val( response[0][3] );
		$('#pointer_box input[name="size_pointer"]').val( response[0][5] );
		$('input[name="title_project"]').val( response[0][7] );

		if( response[0][4] ){
			$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
			$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
		}

		$('#pointer_box select[name="main_kind"]').html('');

		points.kinds.forEach(function(kind){
			if(kind == response[0][6]){
				$('#pointer_box select[name="main_kind"]').append('<option selected="selected" name="'+kind+'">'+kind+'</option>');
			}
			else{
				$('#pointer_box select[name="main_kind"]').append('<option name="'+kind+'">'+kind+'</option>');
			}
		});

		//pobieramy dane o pointerach
		points.points = response[1];

		//pobieramy dane o kategoriach
		categories.category = response[2];

		//pobieranie danych o zdjęciu jeżeli istnieje
		if(response[3].length > 2){
			image.obj = new Image();
			image.obj.src = response[3][0];
			image.x = parseInt( response[3][1] );
			image.y = parseInt( response[3][2] );
			image.width = parseInt( response[3][3] );
			image.height = parseInt( response[3][4] );
			image.alpha = parseInt( response[3][5] );

			//zaznaczenie odpowiedniego selecta alpha w menu top
			$('#alpha_image option[name="'+	image.alpha +'"]').attr('selected',true);

			image.obj.onload = function() {
				canvas.draw();
			};
		}

		//zaktualizowanie danych w inputach
		$('#main_canvas').attr('width', canvas.width_canvas+'px');
		$('#main_canvas').attr('height', canvas.height_canvas+'px');
		$('#canvas_box, #canvas_wrapper').css({'width':canvas.width_canvas+'px','height':canvas.height_canvas+'px'});

		canvas.draw();
		categories.showList();

	},

	//pobranie mapy z bazy danych
	getMap () {

		var th = this;

		$.ajax({
			url: '/api/map/' + th.map_hash,
		  type: "GET",
		  contentType: "application/json"
		}).done(function(data){

			//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
			var response = JSON.parse(data.data[0].map_json);

			//pobieramy i wczytujemy dane o canvasie do obiektu
			canvas.height_canvas = response[0][0];
			canvas.width_canvas = response[0][1];
			points.padding_x = response[0][2];
			points.padding_y = response[0][3];
			points.translate_modulo = response[0][4];
			points.size_pointer = response[0][5];
			points.main_kind = response[0][6];
			canvas.title_project = response[0][7];

			$('#pointer_box input[name="padding_x"]').val( response[0][2] );
			$('#pointer_box input[name="padding_y"]').val( response[0][3] );
			$('#pointer_box input[name="size_pointer"]').val( response[0][5] );
			$('input[name="title_project"]').val( response[0][7] );

			if( response[0][4] ){
				$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
				$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
			}

			$('#pointer_box select[name="main_kind"]').html('');

			points.kinds.forEach(function(kind){

				if(kind == response[0][6]){
					$('#pointer_box select[name="main_kind"]').append('<option selected="selected" name="'+kind+'">'+kind+'</option>');
				}
				else{
					$('#pointer_box select[name="main_kind"]').append('<option name="'+kind+'">'+kind+'</option>');
				}

			});

			//pobieramy dane o pointerach
			points.points = response[1];

			//pobieramy dane o kategoriach
			categories.category = response[2];

			//pobieranie danych o zdjęciu jeżeli istnieje
			if( response[3].length > 2){
				image.obj = new Image();
				image.obj.src = response[3][0];
				image.x = parseInt( response[3][1] );
				image.y = parseInt( response[3][2] );
				image.width = parseInt( response[3][3] );
				image.height = parseInt( response[3][4] );
				image.alpha = parseInt( response[3][5] );

				//zaznaczenie odpowiedniego selecta alpha w menu top
				$('#alpha_image option[name="'+	image.alpha +'"]').attr('selected',true);

				image.obj.onload = function() {
					canvas.draw();
				};
			}

			//zaktualizowanie danych w inputach
			$('#main_canvas').attr('width', canvas.width_canvas+'px');
			$('#main_canvas').attr('height', canvas.height_canvas+'px');
			$('#canvas_box, #canvas_wrapper').css({'width':canvas.width_canvas+'px','height':canvas.height_canvas+'px'});

			canvas.draw();
			categories.show_list();
		});
	},

	//tworzymy nową mapę danych
	createMap () {
		//aktualizujemy jsona do wysłania ajaxem
		this.get_data();
		var th = this; //zmienna pomocnicza

		jQuery.ajax({
			url: "api/maps",
			data: { map_json: th.map_json },
			type: 'POST',
			success: function(response){
				th.map_hash = response.hash_map;
				th.getMaps();
			}
		});
	},

	//aktualizujemy mapę
	updateMap () {
		//aktualizujemy jsona do wysłania ajaxem
		this.get_data();
		var th = this; //zmienna pomocnicza

		jQuery.ajax({
			url: "api/maps",
			data: {
				map_hash: th.map_hash,
				map_json: th.map_json
			},
			type: 'PUT',
			success: function(response){
				th.getMaps();
				alert(response.message);
			}
		});
	},

	//usuwamy mapę z bazy danych
	deleteMap () {

		var th = this; //zmienna pomocnicza

		//sprawdzamy czy mapa do usunięcia posiada swoje id
		if(this.map_hash != null){			
			jQuery.ajax({
				url: "api/map/"+th.map_hash,
				type: 'DELETE',
				success: function(response){
					if(response.status == 'ok'){
						location.reload();
					}
					else{
						alert('błąd podczas usuwania');
					}
				}
			});
		}
		else{
			alert('brak identyfikatora projektu');
		}
	}
}
