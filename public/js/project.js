(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//czyszczenie i rysowanie po canvasie
exports.default = {

	/*	
 	scale : 100,
 	width : 700,
 	height : 400,
 	canvas : null,
 	context : null,
 	thumbnail : null,
 	title_project : 'nowy projekt',
 
 	context_x : 0, //obecna pozycja contextu x
 	context_y : 0, //obecna pozycja contextu y
 	context_new_x : 0, //nowa pozycja contextu x
 	context_new_y : 0, //nowa pozycja contextu y
 
 	offset_left : null,
 	offset_top : null,
 	active_row : null, //liczba aktywnych wierszy i kolumn
 	active_column : null, //liczba aktywnych wierszy i kolumn
 */

	init: function init() {

		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;

		//przypisanie podstawowowych danych do obiektu canvas
		l_canvas.canvas = document.getElementById('main_canvas');
		l_canvas.context = l_canvas.canvas.getContext('2d');

		var offset = $('#canvas_box').offset();
		l_canvas.offset_left = offset.left;
		l_canvas.offset_top = offset.top;

		$('#width_canvas').val(l_canvas.width + 'px');
		$('#height_canvas').val(l_canvas.height + 'px');

		this.set_default();
		this.draw();
	},

	thumbnail: function thumbnail() {
		var canvas = document.getElementById("main_canvas");
		var dataURL = canvas.toDataURL();
		console.log(dataURL);
	},

	//rysujemy canvas ze zdjęciem
	draw: function draw() {
		this.clear();

		_pointers2.default.create_array();
		_pointers2.default.draw();

		if (_image2.default.obj !== undefined) _image2.default.draw();
	},

	draw_thumnail: function draw_thumnail() {
		/*
  		canvas.canvas = document.getElementById('thumbnail_canvas');
  		canvas.thumbnail = document.getElementById('thumbnail_canvas');
  		canvas.context = canvas.canvas.getContext('2d');
  
  		this.clear();
  
  		pointers.create_array();
  		pointers.draw();
  
  		canvas.canvas = document.getElementById('main_canvas');
  		canvas.context = canvas.canvas.getContext('2d');
  */
	},

	//resetujemy tło zdjęcia
	reset: function reset() {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		l_canvas.context.setTransform(1, 0, 0, 1, 0, 0);
		l_canvas.context.scale(l_canvas.scale / 100, l_canvas.scale / 100);
	},

	// czyścimy całe zdjęcie na canvasie
	clear: function clear() {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		l_canvas.context.clearRect(0, 0, l_canvas.width, l_canvas.height);
	},

	//zmieniamy szerokość canvasa o podaną liczbę pikseli
	resize_width: function resize_width(new_width) {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		l_canvas.width = new_width;
		$('#main_canvas, #canvas_wrapper, #canvas_box').attr('width', l_canvas.width + 'px').css({ 'width': l_canvas.width + 'px' });
		_menu_top2.default.show_info();
	},

	//zmieniamy wysokość canvasa o podaną liczbę pikseli
	resize_height: function resize_height(new_height) {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		l_canvas.height = new_height;
		$('#main_canvas, #canvas_wrapper, #canvas_box').attr('height', l_canvas.height + 'px').css({ 'height': l_canvas.height + 'px' });
		_menu_top2.default.show_info(); // aktualizujemy dane odnośnie rozmiarów canvasa w menu u góry
	},

	set_default: function set_default() {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;

		$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
		if (l_canvas.move_image) $('#canvas_box #image_resize').fadeIn(0);

		l_canvas.scale = 100;
		l_canvas.context_x = 0;
		l_canvas.context_y = 0;
		l_canvas.context.scale(l_canvas.scale / 100, l_canvas.scale / 100);

		var new_width = l_canvas.width * (l_canvas.scale / 100);
		var new_height = l_canvas.height * (l_canvas.scale / 100);

		$('#main_canvas, #canvas_wrapper,#canvas_box').css({ 'width': new_width + 'px', 'height': new_height + 'px' });

		this.reset();
		l_canvas.context.translate(l_canvas.context_x / (l_canvas.scale / 100), l_canvas.context_y / (l_canvas.scale / 100));
		_menu_top2.default.show_info();
		this.draw();
	}
}; // ╔═╗╔═╗╔╗╔╦  ╦╔═╗╔═╗
// ║  ╠═╣║║║╚╗╔╝╠═╣╚═╗
// ╚═╝╩ ╩╝╚╝ ╚╝ ╩ ╩╚═╝

},{"./canvas":1,"./image":9,"./menu_top":13,"./pointers":18,"./store":19}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _colorpicker = require('./colorpicker');

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _excel = require('./excel');

var _excel2 = _interopRequireDefault(_excel);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
exports.default = {

	add: function add() {
		var name = Array($('#category_box input[name="add_category"]').val(), '#ff0000');
		$('#category_box input[name="add_category"]').val('');

		alert();

		this.category.push(name);
		_menu_top2.default.category = this.category.length - 1;
		this.show_list();
		this.update_color();
	},

	update: function update(index, name) {

		console.log(index, name);

		this.category[index][0] = name;
		this.show_list();
		this.update_color();
	},

	//aktualizujemy tablicę kolorów
	update_color: function update_color() {

		//możliwa aktualizacja jedynie w przypadku wybrania konkretnej kolumny wartości i kategorii w excelu
		if (_crud2.default.map_json.length > 0 && _excel2.default.data.length > 0 && _layers2.default.category[_layers2.default.active] != -1 && _layers2.default.value[_layers2.default.active] != -1) {

			for (var i_category = 0, i_category_max = _layers2.default.category_name.length; i_category < i_category_max; i_category++) {
				var name = _layers2.default.category_name[i_category];
				var find = false;

				for (var i_layers = 0, i_layers_max = _layers2.default.list.length; i_layers < i_layers_max; i_layers++) {
					for (var i_exel = 0, i_exel_max = _excel2.default.data.length; i_exel < i_exel_max; i_exel++) {
						if (String(_excel2.default.data[i_exel][_layers2.default.category[i_layers]]).toLowerCase() == String(name).toLowerCase() && _excel2.default.data[i_exel][_layers2.default.category[i_layers]] != '') {

							find = true;
							//jeśli znaleźliśmy kategorię w excelu
							var value = String(_excel2.default.data[i_exel][_layers2.default.value[i_layers]]).replace(',', '.');
							//console.log(excel.data[i_exel][layers.value[i_layers]]+' | '+value);

							for (var i_legends = 0, i_legends_max = _layers2.default.legends[i_layers].length; i_legends < i_legends_max; i_legends++) {
								if (value >= _layers2.default.legends[i_layers][i_legends][0] && value <= _layers2.default.legends[i_layers][i_legends][1]) {
									//jeśli znaleźlismy
									_layers2.default.category_colors[i_layers][i_category] = _layers2.default.legends[i_layers][i_legends][3];
									i_legends = i_legends_max;
									i_exel = i_exel_max;
								}
							}

							//jeśli wartość wychodzi poza skale u tak przypisujemy jej odpowiedni kolor
							if (value < _layers2.default.legends[i_layers][0][0]) {
								_layers2.default.category_colors[i_layers][i_category] = _layers2.default.legends[i_layers][0][3];
							}

							if (value > _layers2.default.legends[i_layers][i_legends_max - 1][1]) {
								_layers2.default.category_colors[i_layers][i_category] = _layers2.default.legends[i_layers][i_legends_max - 1][3];
							}

							//jeśli dany kraj w excelu ma wartość null domyślnie otrzymuje kolor biały
							if (value == null) {
								_layers2.default.category_colors[i_layers][i_category] = '#fff';
							}
						}
					}

					//w przypadku gdy dany kraj nie występuje w pliku excel otrzymuje kolor biały
					if (!find) {
						_layers2.default.category_colors[i_layers][i_category] = '#fff';
					}
				}
			}
		}

		//po zaktualizowaniu kolorów w kategoriach rysujemy na nowo canvas
		_canvas2.default.draw();
	},

	remove: function remove(id) {
		var th = this;

		$.each(this.category, function (index, value) {
			if (index >= id) {
				th.category[index] = th.category[index + 1];
			}
		});

		for (var row = 0; row < _pointers2.default.pointers.length; row++) {
			for (var column = 0; column < _pointers2.default.pointers[row].length; column++) {

				if (_pointers2.default.pointers[row][column] == id) {
					_pointers2.default.pointers[row][column] = 0;
				}

				if (_pointers2.default.pointers[row][column] > id) {
					_pointers2.default.pointers[row][column] = parseInt(_pointers2.default.pointers[row][column]) - 1;
				}
			}
		}

		this.category.pop();
		this.show_list();

		//rysujemy na nową canvas
		_canvas2.default.draw();
	},

	show_list: function show_list() {

		var add_category = "<table>";

		for (var i = 1, i_max = this.category.length; i < i_max; i++) {
			add_category += '<tr><td><span>' + i + '</span></td><td><input type="text" name="category_name" id_category="' + i + '" value="' + this.category[i][0] + '" /></td></tr>';
		}

		add_category += "</table>";
		$('#palets_box #area > div').html(add_category);
	}
}; // ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩

},{"./canvas":1,"./colorpicker":4,"./crud":5,"./excel":6,"./layers":11,"./menu_top":13,"./pointers":18}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _on_category = require('./on_category');

var _on_category2 = _interopRequireDefault(_on_category);

var _excel = require('./excel');

var _excel2 = _interopRequireDefault(_excel);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

	set_textarea: function set_textarea() {
		$('#cloud .cloud_text').val(_layers2.default.cloud[_layers2.default.active]);
	},

	//ustawiamy poprawną pozycję dymka
	set_position: function set_position() {
		var left = _mouse2.default.left - _on_category2.default.canvas_offset_left;
		var top = _mouse2.default.top - _on_category2.default.canvas_offset_top;

		$("#canvas_cloud").css({ top: parseInt(top - $("#canvas_cloud").height() - 30) + 'px', left: left + 'px' });
	},

	//funkcja odpowiedzialna za wyświetlenie dymka z odpowiednią zawartością
	update_text: function update_text() {

		var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

		if (_on_category2.default.name != "" && _on_category2.default.name != 'null') {

			var tmp_row = null;
			var find = 0;
			for (var i_row = 0, i_row_max = l_excel.data.length; i_row < i_row_max; i_row++) {
				if (String(_on_category2.default.name).toLowerCase() == String(l_excel.data[i_row][_layers2.default.category[_layers2.default.active]]).toLowerCase()) {

					this.set_position();
					var text_tmp = _layers2.default.cloud[_layers2.default.active];

					for (var i = 0, i_max = l_excel.data[0].length; i < i_max; i++) {
						text_tmp = text_tmp.replace('{' + l_excel.data[0][i] + '}', l_excel.data[i_row][i]);
					}

					//dopiero jeśli dymek ma mieć jakaś konkretną zawartość wyświetlamy go
					if (text_tmp != "") {
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
		} else {
			$("#canvas_cloud").fadeOut(0);
		}
	}

}; // ╔═╗╦  ╔═╗╦ ╦╔╦╗
// ║  ║  ║ ║║ ║ ║║
// ╚═╝╩═╝╚═╝╚═╝═╩╝

},{"./excel":6,"./layers":11,"./mouse":15,"./on_category":16,"./store":19}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//sama nazwa wiele tłumaczy po prostu colorpicker
// ╔═╗╔═╗╦  ╔═╗╦═╗╔═╗╦╔═╗╦╔═╔═╗╦═╗
// ║  ║ ║║  ║ ║╠╦╝╠═╝║║  ╠╩╗║╣ ╠╦╝
// ╚═╝╚═╝╩═╝╚═╝╩╚═╩  ╩╚═╝╩ ╩╚═╝╩╚═

exports.default = {

	row: null,
	col_num: null,

	add: function add() {
		var that = this;

		$('.colorpicker_box').ColorPicker({

			color: '#ff0000',

			onShow: function onShow(colpkr) {
				if ($(colpkr).css('display') == 'none') {
					$(colpkr).fadeIn(200);
					that.row = $(this).attr('row');
					that.col_num = $(this).attr('col_num');
				}
				return false;
			},

			onHide: function onHide(colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},

			onChange: function onChange(hsb, hex, rgb) {
				$('#legends tr td[row="' + that.row + '"]').css('backgroundColor', '#' + hex);

				_palets2.default.color_arr[_palets2.default.color_arr.length - 1] = _palets2.default.color_arr[_layers2.default.palets_active[_layers2.default.active]].slice();
				_palets2.default.color_arr[_palets2.default.color_arr.length - 1][that.col_num] = '#' + hex;
				//layers.palets_active[layers.active] = layers.palets_active[layers.active]

				_layers2.default.palets_active[_layers2.default.active] = _palets2.default.color_arr.length - 1;
				_layers2.default.colors_active[_layers2.default.active][that.row] = '#' + hex;
				_layers2.default.legends[_layers2.default.active][that.row][3] = '#' + hex;

				_palets2.default.show();
				_categories2.default.update_color();
			}
		});
	},

	color_border: function color_border() {
		$('.color_border').ColorPicker({

			onBeforeShow: function onBeforeShow() {
				$(this).ColorPickerSetColor(_pointers2.default.color_border);
			},

			onShow: function onShow(colpkr) {
				if ($(colpkr).css('display') == 'none') {
					$(colpkr).fadeIn(200);
					//colorpicker.row = $(this).attr('row');
					//colorpicker.col_num = $(this).attr('col_num');
				}
				return false;
			},

			onHide: function onHide(colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},

			onChange: function onChange(hsb, hex, rgb) {

				_pointers2.default.color_border = '#' + hex;

				$('.color_border').css('backgroundColor', '#' + hex);

				if (_pointers2.default.show_border) {
					_pointers2.default.draw_border(false);
				}
			}
		});
	}
};

},{"./categories":2,"./layers":11,"./palets":17,"./pointers":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _excel = require('./excel');

var _excel2 = _interopRequireDefault(_excel);

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcja odpowiedzialna za tworzenie zapisywanie i aktualizacje danych dotycząćcyh mapy
// ╔═╗╦═╗╦ ╦╔╦╗
// ║  ╠╦╝║ ║ ║║
// ╚═╝╩╚═╚═╝═╩╝

exports.default = {

	map_json: Array(), //główna zmienna przechowująca wszystkie dane
	map_hash: null,
	layers: {},
	excel: Array(),
	project: {},
	project_hash: null, //główny hash dotyczący naszego projektu

	//pobieramy dane z porojektu i zapisujemy je do json-a
	parse_data: function parse_data() {

		//pobieramy dane dotyczące mapy (canvasa)

		//zerujemy na nowo całą tablicę pointerów
		this.map_json = Array();

		//data[x] = zmienne podstawowe dotyczące mapy
		this.map_json[0] = Array();
		this.map_json[0][0] = _canvas2.default.height_canvas;
		this.map_json[0][1] = _canvas2.default.width_canvas;
		this.map_json[0][2] = _pointers2.default.padding_x;
		this.map_json[0][3] = _pointers2.default.padding_y;
		this.map_json[0][4] = _pointers2.default.translate_modulo;
		this.map_json[0][5] = _pointers2.default.size;
		this.map_json[0][6] = _pointers2.default.main_kind;
		this.map_json[0][7] = _canvas2.default.title_project;
		this.map_json[0][8] = _pointers2.default.color_border;
		this.map_json[0][9] = _pointers2.default.show_border;

		// data[1] = tablica punktów (pointers.pointers) [wiersz][kolumna] = "none" || (numer kategorii)
		this.map_json[1] = _pointers2.default.pointers;

		// data[2] = tablica kategorii
		this.map_json[2] = _categories2.default.category;

		//data[3] = tablica wzorca (zdjęcia w tle do odrysowania)
		this.map_json[3] = Array();

		if (_image2.default.obj) {
			this.map_json[3][0] = _image2.default.obj.src;
			this.map_json[3][1] = _image2.default.x;
			this.map_json[3][2] = _image2.default.y;
			this.map_json[3][3] = _image2.default.width;
			this.map_json[3][4] = _image2.default.height;
			this.map_json[3][5] = _image2.default.alpha;
		}

		//pobieramy dane dotyczące projektów (layers)
		//tworzymy obiekt warstwy zawierający wszystkie dane dotyczące projektu

		this.layers.palets_active = _layers2.default.palets_active;
		this.layers.value = _layers2.default.value;
		this.layers.colors_pos = _layers2.default.colors_pos;
		this.layers.colors_active = _layers2.default.colors_active;
		this.layers.min_value = _layers2.default.min_value;
		this.layers.max_value = _layers2.default.max_value;
		this.layers.cloud = _layers2.default.cloud;
		this.layers.cloud_parser = _layers2.default.cloud_parser;
		this.layers.legends = _layers2.default.legends;
		this.layers.labels = _layers2.default.labels;
		this.layers.category = _layers2.default.category;
		this.layers.category_colors = _layers2.default.category_colors;
		this.layers.category_name = _layers2.default.category_name;
		this.layers.list = _layers2.default.list;

		//zmienne globalne dotyczące całego projektu
		this.project.name = _layers2.default.project_name;
		this.project.source = _layers2.default.source;

		//tworzymy obiekt excela
		this.excel = _excel2.default.data;
	},

	publish: function publish(event) {
		if (this.project_hash != null) {
			if (!event) {
				event = window.event;
			} //łata dla mozilli
			if ($('.publish .embed').css('display') == 'block' && $(event.target).hasClass('publish')) {
				$('.publish .embed').fadeOut(500);
			} else {
				$('.publish .embed').html('<iframe width="100%" height="' + _canvas2.default.height_canvas + 'px" border="0" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src="http://' + location.href.split('/')[2] + '/embed/' + this.project_hash + '"></iframe>');
				//$('#iframe').html('<iframe  onload="this.publish_getSize(this)" width="100%" height="'+canvas.height_canvas+'px" border="0" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src="http://'+location.href.split( '/' )[2]+'/embed/'+this.project_hash+'"></iframe>');

				$('.publish .embed').fadeIn(500);
			}
		} else {
			alert('najpierw zapisz projekt a następnie go publikuj');
		}
	},

	publish_getSize: function publish_getSize(obj) {
		console.log(obj.contentWindow.document.body);
		console.log($(obj.contentWindow.document.body).height(), $(obj.contentWindow.document.body).width());
		//obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	},

	//wczytanie zmiennych do obiektów mapy

	set_map: function set_map(data) {

		//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
		this.map_json = data;

		//pobieramy i wczytujemy dane o canvasie do obiektu
		_canvas2.default.height_canvas = parseInt(data[0][0]);
		_canvas2.default.width_canvas = parseInt(data[0][1]);
		_pointers2.default.padding_x = data[0][2];
		_pointers2.default.padding_y = data[0][3];
		_pointers2.default.translate_modulo = data[0][4];
		_pointers2.default.size = data[0][5];
		_pointers2.default.main_kind = data[0][6];
		_canvas2.default.title_project = data[0][7];

		if (typeof data[0][8] == 'undefined') {
			_pointers2.default.color_border = "#000";
		} else {
			_pointers2.default.color_border = data[0][8];
		}

		if (typeof data[0][9] == 'undefined') {
			_pointers2.default.show_border = false;
		} else {
			_pointers2.default.show_border = data[0][9];
		}

		$('#width_canvas').val(_canvas2.default.width_canvas + 'px');
		$('#height_canvas').val(_canvas2.default.height_canvas + 'px');

		$('#pointer_box .color_border').css('background-color', _pointers2.default.color_border);

		$('#pointer_box input[name="padding_x"]').val(data[0][2]);
		$('#pointer_box input[name="padding_y"]').val(data[0][3]);
		$('#pointer_box input[name="size"]').val(data[0][5]);
		$('input[name="title_project"]').val(data[0][7]);

		if (data[0][4]) {
			$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
			$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
		}

		if (_pointers2.default.show_border) {
			$('#pointer_box div[name="show_border"]').removeClass('switch-off');
			$('#pointer_box div[name="show_border"]').addClass('switch-on');
		}

		$('#pointer_box select[name="main_kind"]').html('');

		_pointers2.default.kinds.forEach(function (kind) {

			if (kind == data[0][6]) {
				$('#pointer_box select[name="main_kind"]').append('<option selected="selected" name="' + kind + '">' + kind + '</option>');
			} else {
				$('#pointer_box select[name="main_kind"]').append('<option name="' + kind + '">' + kind + '</option>');
			}
		});

		//pobieramy dane o pointerach
		_pointers2.default.pointers = data[1];

		//pobieramy dane o kategoriach
		_categories2.default.category = data[2];

		//po wczytaniu mapy aktyalizujemy dane dotyczącą kategorii i kolorów
		_layers2.default.category_colors[0] = [];
		_layers2.default.category_name = [];

		for (var i = 0, i_max = _categories2.default.category.length; i < i_max; i++) {
			console.log(_categories2.default.category[i][0]);
			_layers2.default.category_name.push(_categories2.default.category[i][0]);
			_layers2.default.category_colors[0].push(_categories2.default.category[i][1]);
		}

		8; /*	var html = "<ul>";
     
     //dodajemy listę kategorii
     for(var i = 1, i_max = categories.category.length; i < i_max; i++){
     	html += '<li><input name="categroy_name" id_category="'+i+'" value="'+categories.category[i][0]+'" /></li>';
     }
     	html += "</ul>";
     	$('#area > div').html(html);
     */
		//pobieranie danych o zdjęciu jeżeli istnieje
		if (data[3].length > 2) {
			_image2.default.obj = new Image();
			_image2.default.obj.src = data[3][0];
			_image2.default.x = parseInt(data[3][1]);
			_image2.default.y = parseInt(data[3][2]);
			_image2.default.width = parseInt(data[3][3]);
			_image2.default.height = parseInt(data[3][4]);
			_image2.default.alpha = parseInt(data[3][5]);

			//zaznaczenie odpowiedniego selecta alpha w menu top
			$('#alpha_image option[name="' + _image2.default.alpha + '"]').attr('selected', true);

			_image2.default.obj.onload = function () {
				_canvas2.default.draw();
			};
		}

		//zaktualizowanie danych w inputach
		$('#main_canvas').attr('width', _canvas2.default.width_canvas + 'px');
		$('#main_canvas').attr('height', _canvas2.default.height_canvas + 'px');
		$('#canvas_box, #canvas_wrapper').css({ 'width': _canvas2.default.width_canvas + 'px', 'height': _canvas2.default.height_canvas + 'px' });

		_canvas2.default.draw();
		_categories2.default.show_list();
	},

	set_project: function set_project(data) {

		//wczytujemy dane dotyczące mapy
		this.set_map(JSON.parse(data.map_json));

		_excel2.default.data = JSON.parse(data.excel);

		data.project = JSON.parse(data.project);
		data.layers = JSON.parse(data.layers);

		//wczytujemy dane dotyczące projektu
		_layers2.default.palets_active = data.layers.palets_active;
		_layers2.default.value = data.layers.value;
		_layers2.default.colors_pos = data.layers.colors_pos;
		_layers2.default.colors_active = data.layers.colors_active;
		_layers2.default.min_value = data.layers.min_value;
		_layers2.default.max_value = data.layers.max_value;
		_layers2.default.cloud = data.layers.cloud;
		_layers2.default.cloud_parser = data.layers.cloud_parser;
		_layers2.default.legends = data.layers.legends;
		_layers2.default.labels = data.layers.labels;
		_layers2.default.category = data.layers.category;
		_layers2.default.category_colors = data.layers.category_colors;
		_layers2.default.category_name = data.layers.category_name;
		_layers2.default.list = data.layers.list;

		//zmienne globalne dotyczące całego projektu
		_layers2.default.project_name = data.project.name;
		_layers2.default.source = data.project.source;

		$('input[name="project_name"]').val(_layers2.default.project_name);

		tinyMCE.editors[0].setContent(_layers2.default.cloud[_layers2.default.active]);
		tinyMCE.editors[1].setContent(_layers2.default.source);

		_excel2.default.show();
		_palets2.default.show();
		_legends2.default.show();
		_layers2.default.show();
		_labels2.default.show();
	},

	//pobranie mapy z bazy danych i przekazujemy do wczytania do obiektów mapy
	get_map: function get_map() {
		var th = this;
		$.ajax({
			url: '/api/map/' + th.map_hash,
			type: "GET",
			contentType: "application/json"
		}).done(function (data) {
			th.set_map(JSON.parse(data.data[0].map_json));
		});
	},

	//pobieranie projektu z bazy danych i wczytanie
	get_project: function get_project() {

		var th = this;
		$.ajax({
			url: '/api/project/' + th.project_hash,
			type: "GET",
			contentType: "application/json"
		}).done(function (data) {
			//console.log(data.data);
			if (data.status == 'ok') {
				th.set_project(data.data);
			} else {
				alert('nie udało się wczytać projektu');
				console.log(data);
			}
		});
	},

	//tworzymy nowy projekt
	create_project: function create_project() {

		//aktualizujemy jsona do wysłania ajaxem
		this.parse_data();
		var th = this; //zmienna pomocnicza

		var data = {
			map_json: JSON.stringify(th.map_json),
			map_hash: th.map_hash,
			layers: JSON.stringify(th.layers),
			excel: JSON.stringify(th.excel),
			project: JSON.stringify(th.project)
		};

		jQuery.ajax({
			url: "api/projects",
			data: data,
			type: 'POST',
			success: function success(response) {
				if (response.status == 'ok') {
					alert('zapisano nowy projekt');
					th.project_hash = response.project_hash;
					_menu_top2.default.get_projects();
				} else {
					alert('błąd podczas zapisu');
					//console.log(response);
				}
			}
		});
	},

	//aktualizujemy już istniejący projekt
	update_project: function update_project() {

		//aktualizujemy jsona do wysłania ajaxem
		this.parse_data();
		var th = this; //zmienna pomocnicza

		var data = {
			map_json: JSON.stringify(th.map_json),
			map_hash: th.map_hash,
			project_hash: th.project_hash,
			layers: JSON.stringify(th.layers),
			excel: JSON.stringify(th.excel),
			project: JSON.stringify(th.project)
		};

		jQuery.ajax({
			url: "api/projects",
			data: data,
			type: 'PUT',
			success: function success(response) {
				if (response.status == 'ok') {
					_menu_top2.default.get_projects();
					alert('zaktualizowano projekt');
				} else {
					alert('błąd podczas aktualizacji');
					console.log(response);
				}
			}
		});
	},

	//usuwamy mapę z bazy danych
	delete_project: function delete_project() {

		var th = this; //zmienna pomocnicza

		//sprawdzamy czy mapa do usunięcia posiada swoje id
		if (this.project_hash != null) {

			jQuery.ajax({
				url: "api/project/" + th.project_hash,
				type: 'DELETE',
				success: function success(response) {
					if (response.status == 'ok') {
						location.reload();
					} else {
						alert('błąd podczas usuwania');
						console.log(response);
					}
				}
			});
		} else {
			alert('brak identyfikatora projektu');
		}
	}
};

},{"./canvas":1,"./categories":2,"./excel":6,"./image":9,"./labels":10,"./layers":11,"./legends":12,"./menu_top":13,"./palets":17,"./pointers":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

	init: function init() {

		var that = this;
		//dodanie eventów przy kliknięciu excela
		$('#excel_box button').click(function () {
			$('#excel_box input').click();
		});
		$('#excel_box input').change(function () {
			that.send_file();
		});

		//funkcja tymczasowa do narysowania tabelki excela
		this.show();
	},

	//funkcja odpowiedziala za poprawne podpisanie osi
	show: function show() {

		var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

		var add_html = '';

		//jeśli ilośc wierszy jest większa aktualizujemy wielkość tablicy
		if (l_excel.data.length >= l_excel.min_row) l_excel.min_row = l_excel.data.length;
		if (l_excel.data[0].length >= l_excel.min_col) l_excel.min_col = l_excel.data[0].length + 1;

		//renderujemy całą tablicę excel
		for (var i = 0; i < l_excel.min_row; i++) {
			add_html += '<tr class="tr">';
			for (var j = 0; j < l_excel.min_col; j++) {
				if (j == 0 && i > 0) {
					add_html += '<td class="td" row="' + i + '" col="' + j + '" >' + i + '</td>';
				} else {
					try {
						if (typeof l_excel.data[i][j - 1] != "undefined") {
							add_html += '<td class="td" contenteditable="false" row="' + i + '" col="' + j + '">' + l_excel.data[i][j - 1] + '</td>';
						} else {
							add_html += '<td class="td"  row="' + i + '" col="' + j + '"></td>';
						}
						//console.log(l_excel.data[i][(j+1)]);
					} catch (error) {
						//console.log(error,i,j);
						add_html += '<td class="td" row="' + i + '" col="' + j + '"></td>';
					}
				}
			}
			add_html += '</tr>';
		}

		var that = this;

		$('#excel_box .table').html(add_html);

		$('#excel_box .table .td').dblclick(function () {
			$(this).attr('contenteditable', 'true');$(this).selectText();
		});

		//dodajemy możliwość edycji excela
		$('#excel_box .table .td').keyup(function () {
			that.edit(this);
		});

		$('#excel_box .table .td').blur(function () {
			$(this).attr('contenteditable', 'false');_palets2.default.show_select();
		});
	},

	//funkcja umożliwiająca edycje zawartości komórki
	edit: function edit(obj) {
		var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

		var val = $(obj).html();
		if ($.isNumeric(val)) {
			val = parseFloat(val);
		}

		l_excel.data[$(obj).attr('row')][$(obj).attr('col') - 1] = val;
		_categories2.default.update_color();
	},

	//pobieramy plik, z inputa i wyłamy do backendu w celu sparsowania a następnie przypisujemy do tablicy i wyświetlamyw formie tabelski
	send_file: function send_file() {

		var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

		excel_form.append("excel_file", $("#excel_box input")[0].files[0]);

		var that = this;

		$.ajax({

			url: '/api/projects/excel_parse',
			type: 'POST',
			data: excel_form,
			processData: false,
			contentType: fals

		}).done(function (response) {

			$("#excel_box input").remove();
			$("#excel_box").append('<input type="file" />');
			$('#excel_box input').change(function () {
				that.send_file();
			});

			//po wczytaniu pliku excel przypisujemy dane rysujemy na nowo tabelę oraz wyświetlamy wszystkie palety kolorów
			console.log(response);
			l_excel.data = response.excel[0].l_excel.data;
			that.transition();
			that.show();
			_palets2.default.show_select();
		});
	},

	//funckja zamieniająca krtopki na przecinki przy komórkach liczbowych
	transition: function transition() {

		var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

		for (var i = 0, i_max = this.l_excel.data.length; i < i_max; i++) {
			for (var j = 0, j_max = this.l_excel.data[0].length; j < j_max; j++) {

				//usuwamy spacje występujące za lub przed tekstem
				this.l_excel.data[i][j] = $.trim(this.l_excel.data[i][j]);

				//jeśli mamy pustą wartość null zamieniamy ją na zamknięty string
				if (this.l_excel.data[i][j] == null) {
					this.l_excel.data[i][j] = '';
				}

				if ($.isNumeric(this.l_excel.data[i][j])) {
					//console.log(excel.l_excel.data[i][j])
					this.l_excel.data[i][j] = String(this.l_excel.data[i][j]).replace('.', ',');
				}
			}
		}
	}
}; // ╔═╗═╗ ╦╔═╗╔═╗╦  
// ║╣ ╔╩╦╝║  ║╣ ║  
// ╚═╝╩ ╚═╚═╝╚═╝╩═╝

},{"./categories":2,"./palets":17,"./store":19}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcje rysujące pojedyńczy punkt (pointer)
exports.default = {

  square: function square(data) {
    data.ctx.fillRect(data.x, data.y, data.size, data.size);
  },

  circle: function circle(data) {
    data.size = data.size / 2;
    var center_x = data.x + data.size;
    var center_y = data.y + data.size;
    data.ctx.beginPath();
    data.ctx.arc(center_x, center_y, data.size, 0, 2 * Math.PI);
    data.ctx.fill();
  },

  hexagon: function hexagon(data) {
    var a = data.size / 4;
    var a2 = data.size / 2;
    var h = data.size / 2 * Math.sqrt(3) / 2;

    data.ctx.beginPath();
    data.ctx.moveTo(data.x, data.y + a2);
    data.ctx.lineTo(data.x + a, data.y + a2 - h);
    data.ctx.lineTo(data.x + a + a2, data.y + a2 - h);
    data.ctx.lineTo(data.x + data.size, data.y + a2);
    data.ctx.lineTo(data.x + data.size - a, data.y + a2 + h);
    data.ctx.lineTo(data.x + a, data.y + a2 + h);
    data.ctx.lineTo(data.x, data.y + a2);
    data.ctx.fill();
  },

  hexagon2: function hexagon2(data) {
    var a = data.size / 4;
    var a2 = data.size / 2;
    var h = data.size / 2 * Math.sqrt(3) / 2;

    data.ctx.beginPath();
    data.ctx.moveTo(data.x + a2, data.y);
    data.ctx.lineTo(data.x + a2 + h, data.y + a);
    data.ctx.lineTo(data.x + a2 + h, data.y + a2 + a);
    data.ctx.lineTo(data.x + a2, data.y + data.size);
    data.ctx.lineTo(data.x + a2 - h, data.y + a2 + a);
    data.ctx.lineTo(data.x + a2 - h, data.y + a);
    data.ctx.lineTo(data.x + a2, data.y);
    data.ctx.fill();
  },

  square_border_small: function square_border_small(data) {

    if (data.line_width_y < 2) {
      var y_trans = -2;
    } else {
      var y_trans = -3;
    }

    if (data.line_width_x < 3) {
      var x_trans = -2;
    } else {
      var x_trans = -1 * data.line_width_x;
    }

    if (data.border.top) {
      data.ctx.fillRect(data.x + x_trans + 1, data.y + y_trans + 1, data.size + data.line_width_x + 1, 1);
    }

    if (data.border.top_left) {
      data.ctx.fillRect(data.x + x_trans + 1, data.y + y_trans + 1, parseInt((data.size + data.line_width_x + 1) / 2), 1);
    }

    if (data.border.top_right) {
      data.ctx.fillRect(data.x + x_trans + 1 + parseInt((data.size + data.line_width_x + 1) / 2), data.y + y_trans + 1, Math.ceil((data.size + data.line_width_x + 1) / 2), 1);
    }

    if (data.border.right) {
      if (data.line_width_x < 2) {
        var x_trans = -1;
      } else {
        var x_trans = 0;
      }

      if (data.line_width_y < 2) {
        var y_trans = 2;
      } else {
        var y_trans = data.line_width_y;
      }

      data.ctx.fillRect(data.x + data.size + x_trans + 1, data.y - 1, 1, data.size + y_trans);
    }
  },

  square_border_big: function square_border_big(data) {

    if (data.line_width_y < 2) {
      var y_trans = -2;
    } else {
      var y_trans = -3;
    }

    if (data.line_width_x < 3) {
      var x_trans = -2;
    } else {
      var x_trans = -1 * data.line_width_x;
    }

    if (data.border.top) {
      data.ctx.fillRect(data.x + x_trans, data.y + y_trans, data.size + data.line_width_x + 3, 3);
    }

    if (data.border.top_left) {
      data.ctx.fillRect(data.x + x_trans, data.y + y_trans, parseInt((data.size + data.line_width_x + 3) / 2), 3);
    }

    if (data.border.top_right) {
      data.ctx.fillRect(data.x + x_trans + parseInt((data.size + data.line_width_x + 3) / 2), data.y + y_trans, Math.ceil((data.size + data.line_width_x + 3) / 2), 3);
    }

    if (data.border.right) {
      if (data.line_width_x < 2) {
        var x_trans = -1;
      } else {
        var x_trans = 0;
      }

      if (data.line_width_y < 2) {
        var y_trans = 2;
      } else {
        var y_trans = data.line_width_y;
      }

      data.ctx.fillRect(data.x + data.size + x_trans, data.y, 3, data.size + y_trans);
    }
  }
}; // ┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌─┐
// ├┤ ││ ┬│ │├┬┘├┤ └─┐
// └  ┴└─┘└─┘┴└─└─┘└─┘

},{"./canvas":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ╔═╗╦  ╔═╗╔╗ ╔═╗╦  
// ║ ╦║  ║ ║╠╩╗╠═╣║  
// ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝

//funkcje globalne kontener na wszystko i nic ;)
exports.default = {
  toogle_right: function toogle_right(obj) {
    //panel jest z prawej strony
    if ($(obj).parent().css('right') == '0px') {
      $(obj).parent().animate({ right: [-$(obj).parent().width() - 20, "swing"] }, 1000, function () {});
    } else {
      $(obj).parent().animate({ right: ["0px", "swing"] }, 1000, function () {});
    }
  },
  toogle_left: function toogle_left(obj) {
    //panel jest z lewej strony
    if ($(obj).parent().css('left') == '0px') {
      $(obj).parent().animate({ left: [-$(obj).parent().width() - 20, "swing"] }, 1000, function () {});
    } else {
      $(obj).parent().animate({ left: ["0px", "swing"] }, 1000, function () {});
    }
  },

  setCookie: function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie: function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  //dodajemy blokadę przed odświeżeniem strony
  refreshLock: function refreshLock(e) {
    window.onbeforeunload = function (e) {
      if (typeof e == 'undefined') {
        e = window.event;
      }
      if (e) {
        if (!confirm('Czy chcesz opuścić tę stronę')) return false;
      }
    };
  }
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//główne zdjęcie od którego odrysowujemy mapy
exports.default = {
	obj: undefined,
	x: null,
	y: null,
	width: null,
	height: null,
	alpha: 10,

	draw: function draw() {
		/*
  canvas.context.globalAlpha = this.alpha/10;
  canvas.context.drawImage(this.obj,this.x,this.y,this.width,this.height);
  $('#canvas_box #image_resize').css({'height':this.height,'top':this.y+'px','left':(this.x+this.width)+'px'});
  canvas.context.globalAlpha = 1;
  */
	},

	//funkcja pomocnicza konwertująca dataURI na plik
	dataURItoBlob: function dataURItoBlob(dataURI) {
		var binary = atob(dataURI.split(',')[1]);
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], { type: 'image/png' });
	}

}; // ╦╔╦╗╔═╗╔═╗╔═╗
// ║║║║╠═╣║ ╦║╣ 
// ╩╩ ╩╩ ╩╚═╝╚═╝

},{"./canvas":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ╦  ╔═╗╔╗ ╔═╗╦  ╔═╗
// ║  ╠═╣╠╩╗║╣ ║  ╚═╗
// ╩═╝╩ ╩╚═╝╚═╝╩═╝╚═╝

exports.default = {

	show: function show() {
		$('#layers .label_layer').val(_layers2.default.labels[_layers2.default.active]);
	},

	edit: function edit(obj) {
		_layers2.default.labels[_layers2.default.active] = $(obj).val();
	}
};

},{"./labels":10,"./layers":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ╦  ╔═╗╦ ╦╔═╗╦═╗╔═╗
// ║  ╠═╣╚╦╝║╣ ╠╦╝╚═╗
// ╩═╝╩ ╩ ╩ ╚═╝╩╚═╚═╝

exports.default = {

	//list : ['zakładka 1'],
	//active : 0,

	//tablica z podstawowywmi danymi zagregowanymi dla każdej warstwy
	palets_active: [0],

	value: [-1],
	colors_pos: [[1, 1, 1, 1, 1, 1, 1, 1, 1]],
	colors_active: [["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]],
	//min_value : [0],
	//max_value : [0],
	cloud: [""],
	cloud_parser: [""],
	legends: [[]],
	labels: [""],
	category: [-1],
	category_colors: [],
	category_name: [],

	//zmienne globalne dotyczące całego projektu
	project_name: 'nowy projekt',
	source: '',

	//tablica pól uzależnionych od aktualnej warstwy
	db_name: ["list", "palets_active", "category", "category_colors", "category_name", "value", "colors_pos", "colors_active", "min_value", "max_value", "cloud", "cloud_parser", "legends", "labels"],

	test: function test() {
		return 'tak';
	},

	show: function show() {

		var l_layers = _store2.default.layers;

		var html = "";
		var that = this;
		for (var i = 0, i_max = l_layers.length; i < i_max; i++) {
			if (i == this.active) {
				html += '<span num="' + i + '" contenteditable="true" class="active">' + l_layers[i].name + '</span>';
			} else {
				html += '<span num="' + i + '" contenteditable="true" >' + l_layers[i].name + '</span>';
			}
		}

		html += '<button class="add"> + </button><button class="remove"> - </button>';

		$('#layers .chapter').html(html);

		//dodajemy zdarzenia do edycji / zmiany kolejnosci i aktualizowania warstwy
		$('#layers .add').click(function () {
			if (spec.crud.map_hash != null) {
				that.add();
			} else {
				alert('Aby dodać zakładkę najpierw dodaj mapę');
			}
		});

		$('#layers .remove').click(function () {
			if (confirm('Czy chcesz usunąć zakładkę ?')) {
				that.remove();
			};
		});

		$('#layers .chapter span').click(function () {
			that.select(this);
		});

		$("#layers .chapter span").keyup(function () {
			that.list[that.active] = $(this).html();
		});

		$("#layers .chapter span").dblclick(function () {
			$(this).addClass('contenteditable');
			$(this).blur(function () {
				$(this).removeClass('contenteditable');
			});
		});

		$("#layers .chapter").sortable({
			axis: 'x',
			items: 'span',
			update: function update(event, ui) {
				$("#layers .chapter span").each(function (index, obj) {
					if (index != $(obj).attr('num')) {
						that.change_order($(obj).attr('num'), index);
						return false;
					}
				});
			},
			cancel: '.add,.remove,.contenteditable'
		});
	},

	select: function select(obj) {
		$('#layers .chapter span').removeClass('active');
		$(obj).addClass('active');
		this.active = $(obj).index();
		var that = this;
		tinyMCE.editors[0].setContent(that.cloud[that.active]);
		_palets2.default.show();
		_cloud2.default.set_textarea();
		_labels2.default.show();
		_legends2.default.show();
		_canvas2.default.draw();
	},

	//zmiana kolejnjości warstw
	change_order: function change_order(last, next) {
		for (var i = 0, i_max = this.db_name.length; i < i_max; i++) {
			var tmp = this[this.db_name[i]][next];
			this[this.db_name[i]][next] = this[this.db_name[i]][last];
			this[this.db_name[i]][last] = tmp;
		}
	},

	//dodajemy nową warstwę
	add: function add() {

		var tmp_layer = _store2.default.layers[_store2.default.layers.length - 1];
		Object.assign(_store2.default.layers, tmp_layer);
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
	remove: function remove() {

		var active = _store2.default.project.layers.active;
		var l_layers = _store2.default.layers[_store2.default.project.layers.active].layers;

		//sprawdzamy czy liczba warstw jest większa od 1
		if (_store2.default.layers.length > 0) {

			if (active == l_layers.length - 1) {
				var i_tmp = l_layers.length - 1;
				this.select($('#layers .chapter span').eq(i_tmp));
			}

			_store2.default.layers.splice(active, 1);

			//pobieramy numer ostatniej zakładki
			for (var i_layers = active, i_layers_max = l_layers.length - 1; i_layers < i_layers_max; i_layers++) {
				for (var i = 0, i_max = this.db_name.length; i < i_max; i++) {
					this[this.db_name[i]][i_layers] = this[this.db_name[i]][i_layers + 1];
				}
			}

			//usuwamy ostatnią zakładkę / warstwę
			var last_i = l_layers.length - 1;
			for (var i = 0, i_max = this.db_name.length; i < i_max; i++) {
				this[this.db_name[i]].pop();
				console.log(this[this.db_name[i]][last_i]);
			}

			this.show();
			this.select($('#layers .chapter span.active'));
		} else {
			alert('nie możesz usunąć pierwszej zakładki');
		}
	}
};

//zmienne pomocnicze

$.fn.selectText = function () {
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

},{"./canvas":1,"./cloud":3,"./labels":10,"./legends":12,"./palets":17,"./store":19}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _colorpicker = require('./colorpicker');

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt dotycząsy wyswietlania akutalizacji i edycji panelu legend
exports.default = {

	//wyświetlamy wszystkie legendy w panelu map
	show: function show() {

		var html = "<table><tr><th>kolor:</th><th>od:</th><th>do:</th><th>opis:</th></tr>";

		for (var i = 0, i_max = _layers2.default.legends[_layers2.default.active].length; i < i_max; i++) {
			html += "<tr row='" + i + "'><td row='" + i + "' col_num='' style='background-color:" + _layers2.default.legends[_layers2.default.active][i][3] + "' class='color colorpicker_box'></td><td class='from' name='from' contenteditable='true'>" + _layers2.default.legends[_layers2.default.active][i][0] + "</td><td class='to' name='to' contenteditable='true'>" + _layers2.default.legends[_layers2.default.active][i][1] + "</td><td class='description' name='description' contenteditable='true'>" + _layers2.default.legends[_layers2.default.active][i][2] + "</td></tr>";
		}

		html += "</table>";
		$('#legends').html(html);

		var row = 1;
		for (var i = 0, i_max = _layers2.default.colors_pos[_layers2.default.active].length; i < i_max; i++) {
			if (_layers2.default.colors_pos[_layers2.default.active][i] == 1) {
				$('#legends table tr').eq(row).children('td').eq(0).attr('col_num', i);
				row++;
			}
		}

		if (18 == _layers2.default.palets_active[_layers2.default.active]) {
			var row = 0;
			for (var i = 0, i_max = _layers2.default.colors_pos[_layers2.default.active].length; i < i_max; i++) {
				if (_layers2.default.colors_pos[_layers2.default.active][i] == 1) {
					_palets2.default.color_arr[18][i] = _layers2.default.colors_active[_layers2.default.active][row];
					row++;
				} else {
					_palets2.default.color_arr[18][i] = '#fff';
				}
			}
			_palets2.default.show();
		}

		$('#legends').on('keyup', 'td', function () {
			_legends2.default.edit(this);
		});
		_colorpicker2.default.add();
	},

	//funkcja akutalizująca kolory w palecie kolorów
	update: function update() {
		var color_count = _layers2.default.colors_active[_layers2.default.active].length; //ilosc kolorów
		var diffrent = Math.abs(_layers2.default.min_value[_layers2.default.active] - _layers2.default.max_value[_layers2.default.active]); // color_count;

		_layers2.default.legends[_layers2.default.active] = [];

		for (var i = 0, i_max = _layers2.default.colors_active[_layers2.default.active].length; i < i_max; i++) {

			console.log(parseInt(_layers2.default.min_value[_layers2.default.active]), _layers2.default.min_value[_layers2.default.active]);

			var now_tmp = Math.round((parseInt(_layers2.default.min_value[_layers2.default.active]) + diffrent / color_count * i) * 100) / 100;

			//console.log(layers.min_value[layers.active]+diffrent/color_count*i);


			if (i + 1 == i_max) {
				var next_tmp = _layers2.default.max_value[_layers2.default.active];
			} else {
				var next_tmp = Math.round((parseInt(_layers2.default.min_value[_layers2.default.active]) + diffrent / color_count * (i + 1) - 0.01) * 100) / 100;
			}

			_layers2.default.legends[_layers2.default.active].push([now_tmp, next_tmp, String(now_tmp).replace('.', ',') + ' - ' + String(next_tmp).replace('.', ','), _layers2.default.colors_active[_layers2.default.active][i]]);
		}
		this.show();
		_categories2.default.update_color();
	},

	edit: function edit(obj) {

		var row = $(obj).parent().attr('row');
		var name = $(obj).attr('name');
		var val = $(obj).html();

		switch (name) {

			case 'from':
				if (!$.isNumeric(val)) {
					$(obj).html(parseFloat(val));
				} //zabezpieczenie, jeśli wpisano tekst zamieniamy go na liczbę
				_layers2.default.legends[_layers2.default.active][row][0] = parseFloat(val);
				_categories2.default.update_color();
				break;

			case 'to':
				if (!$.isNumeric(val)) {
					$(obj).html(parseFloat(val));
				}
				_layers2.default.legends[_layers2.default.active][row][1] = parseFloat(val);
				_categories2.default.update_color();
				break;

			case 'description':
				_layers2.default.legends[_layers2.default.active][row][2] = val;
				break;

		}
	}
};

//dodajemy zdarzenie edycji wartości w legendzie
// ╦  ╔═╗╔═╗╔═╗╔╗╔╔╦╗╔═╗
// ║  ║╣ ║ ╦║╣ ║║║ ║║╚═╗
// ╩═╝╚═╝╚═╝╚═╝╝╚╝═╩╝╚═╝

},{"./categories":2,"./colorpicker":4,"./layers":11,"./legends":12,"./palets":17}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt menu_top
// ╔╦╗╔═╗╔╗╔╦ ╦  ╔╦╗╔═╗╔═╗
// ║║║║╣ ║║║║ ║   ║ ║ ║╠═╝
// ╩ ╩╚═╝╝╚╝╚═╝   ╩ ╚═╝╩ 

exports.default = {

	//zmiana aktualnej zakładki
	change_box: function change_box(obj) {
		var l_menu_top = _store2.default.project.menu_top;

		if (!l_menu_top.animate_box) {
			l_menu_top.animate_box = !l_menu_top.animate_box;

			$(obj).parent().children('li').removeClass('active');
			$(obj).addClass('active');

			var category = $(obj).attr('category');

			$(obj).parent().parent().children('div').css('display', 'none');
			$(obj).parent().parent().children('#' + category).css('display', 'block');
		}
	},

	//funkcja służąca do pobierania danych dotyczących map
	get_maps: function get_maps() {

		$.ajax({
			url: '/api/maps',
			type: "GET",
			contentType: "application/json"
		}).done(function (response) {

			//wyświetlamy listę map w panelu u góry
			if (response.status == "ok") {
				var add_html = '<option id="select_map">wybierz mapę</option>';
				for (var i = 0, i_max = response.data.length; i < i_max; i++) {
					if (response.data[i]._id == _crud2.default.map_hash) {
						add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					} else {
						add_html += '<option id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					}
				}
				$('#toolbar_top select.select_map').html(add_html);

				//dodajemu zdarzenie change map 
				$('.select_map').change(function () {
					//sprawdzamy czy wybraliśmy pole z hashem mapy
					if ($(this).find('option:selected').attr('id') != 'select_map') {
						//jeśli tak to sprawdzamy czy wczytujemy mapę po raz pierwszy czy drugi
						if (_crud2.default.map_hash != null) {
							//jeśli wczytujemy po raz kolejny to pytamy czy napewno chcemy ją wczytać
							if (confirm('Czy chcesz wczytać nową mapę ?')) {
								_crud2.default.map_hash = $(this).find('option:selected').attr('id');
								_crud2.default.get_map();
							}
						} else {
							$('.select_map option').eq(0).remove();
							_crud2.default.map_hash = $(this).find('option:selected').attr('id');
							_crud2.default.get_map();
						}
					}
				});
			} else {
				alert('nie mogę pobrać listy map');
				console.log(response);
			}
		});
	},

	//funkcja służąca do pobierania danych dotyczących map
	get_projects: function get_projects() {
		$.ajax({
			url: '/api/projects',
			type: "GET",
			contentType: "application/json"
		}).done(function (response) {

			//wyświetlamy listę projektów w panelu u góry
			if (response.status == "ok") {

				var add_html = '<option id="new_project">nowy projekt</option>';
				for (var i = 0, i_max = response.data.length; i < i_max; i++) {

					if (response.data[i]._id == _crud2.default.project_hash) {
						add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].project).name + '</option>';
					} else {
						add_html += '<option id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].project).name + '</option>';
					}
				}

				$('#toolbar_top select.select_project').html(add_html);

				//dodajemu zdarzenie change project 
				$('.select_project').change(function () {
					if (confirm('Czy chcesz wczytać nowy projekt ?')) {
						if ($(this).find('option:selected').attr('id') == 'new_project') {
							location.reload();
						} else {
							_crud2.default.project_hash = $(this).find('option:selected').attr('id');
							_crud2.default.get_project();
						}
					}
				});
			} else {
				alert('nie mogę pobrać listy projektów');
				console.log(response);
			}
		});
	},

	update_canvas_info: function update_canvas_info() {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		l_canvas.width = parseInt($('#width_canvas').val());
		l_canvas.height = parseInt($('#height_canvas').val());

		console.log('update_canvas_info', l_canvas.width, l_canvas.height);
		$('#width_canvas').val(l_canvas.width + 'px');
		$('#height_canvas').val(l_canvas.height + 'px');

		$('#canvas_box, #canvas_wrapper').css({ 'width': l_canvas.width + 'px', 'height': l_canvas.height + 'px' });
		$('#canvas_box #main_canvas').attr('width', l_canvas.width + 'px');
		$('#canvas_box #main_canvas').attr('height', l_canvas.height + 'px');
		_canvas2.default.draw();
	},

	change_alpha: function change_alpha() {
		_image2.default.alpha = $('#alpha_image').find('option:selected').attr('name');
		_canvas2.default.draw();
	},

	add_image: function add_image() {

		//jesli podany parametr nie jest pusty
		var src_image = prompt("Podaj ścieżkę do zdjęcia: ");

		if (src_image) {
			if (src_image.length > 0) {

				_image2.default.obj = new Image();

				//wczytanie zdjęcia:
				_image2.default.obj.onload = function () {
					_image2.default.width = _image2.default.obj.width;
					_image2.default.height = _image2.default.obj.height;
					_image2.default.draw();
				};

				_image2.default.x = 0;
				_image2.default.y = 0;
				_image2.default.obj.src = src_image;
				//simage.obj.setAttribute('crossOrigin', 'anonymous');
			}
		}
	},

	show_info: function show_info() {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		console.log('show_info', l_canvas.width, l_canvas.height);

		$('#width_canvas').val(parseInt(l_canvas.width) + 'px');
		$('#height_canvas').val(parseInt(l_canvas.height) + 'px');
	}

};

},{"./canvas":1,"./crud":5,"./image":9,"./store":19}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pobieranie danych z selekta inputa switchy (aktualizacja obiektów) button inkrement i dekrement
// ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗
// ║║║║ ║ ║║║╣ ║  ╚═╗
// ╩ ╩╚═╝═╩╝╚═╝╩═╝╚═╝

exports.default = {

	canvas: _canvas2.default,
	pointers: _pointers2.default,
	layers: _layers2.default,
	crud: _crud2.default,

	button_increment: function button_increment(obj) {

		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="' + input_to_update + '"]').val()) + 1;

		$('input[name="' + input_to_update + '"]').val(value);
		this.update_from_input($('input[name="' + input_to_update + '"]'));
	},

	button_decrement: function button_decrement(obj) {

		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="' + input_to_update + '"]').val()) - 1;

		$('input[name="' + input_to_update + '"]').val(value);
		this.update_from_input($('input[name="' + input_to_update + '"]'));
	},

	update_from_input: function update_from_input(obj) {
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		console.log(name_class, name_method, this[name_class]);
		console.log(this[name_class][name_method]);

		this[name_class][name_method] = parseInt($(obj).val());
		_canvas2.default.draw();
	},

	update_from_input_text: function update_from_input_text(obj) {
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		console.log(name_class, name_method);

		this[name_class][name_method] = $(obj).val();
		_canvas2.default.draw();
	},

	update_from_select: function update_from_select(obj) {
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		this[name_class][name_method] = $(obj).find('option:selected').attr('name');
		_canvas2.default.draw();
	},

	update_from_switch: function update_from_switch(obj) {

		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		if (!this[name_class][name_method]) {
			$(obj).attr("value", 'true');
			$(obj).removeClass('switch-off');
			$(obj).addClass('switch-on');
			this[name_class][name_method] = true;
		} else {
			//wyłączamy przełącznik
			$(obj).attr("value", 'false');
			$(obj).removeClass('switch-on');
			$(obj).addClass('switch-off');
			this[name_class][name_method] = false;
		}
		_canvas2.default.draw();
	}
};

},{"./canvas":1,"./crud":5,"./layers":11,"./pointers":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt myszki (do ogarniecia)
exports.default = {

	mouse_down: false,
	click_obj: null,

	tmp_mouse_x: null, //zmienne tymczasowe umożliwiające przesuwanie tła
	tmp_mouse_y: null, //zmienne tymczasowe umożliwiające przesuwanie tła

	left: null, //pozycja x myszki
	top: null, //pozycja y myszki
	padding_x: null, //pozycja x myszki od górnej krawędzi
	padding_y: null, //pozycja y myszki od górnej krawędzi
	offset_x: null, //offset x obiektu klikniętego
	offset_y: null, //offset y obiektu klikniętego

	//funckja wykrywająca w co kliknięto pobierająca padding kliknięcia oraz zapisująca kliknięcie
	set_mouse_down: function set_mouse_down(event) {

		if (!event) {
			event = window.event;
		} //lata dla mozilli
		var obj = event.target;

		//jeśli element na który kliknięto ma atrybut nameclick przypisujemy go do obiektu myszki
		if (typeof $(event.target).attr('nameclick') != "undefined") {
			this.click_obj = $(event.target).attr('nameclick');

			var position = $(obj).offset();
			this.offset_x = position.left;
			this.offset_y = position.top;
			this.padding_x = this.left - position.left;
			this.padding_y = this.top - position.top;
			_mouse2.default.mouse_down = true;

			this.tmp_mouse_x = _image2.default.x;
			this.tmp_mouse_y = _image2.default.y;
		}
	},

	set_position: function set_position(event) {
		this.left = event.pageX, this.top = event.pageY;
	},

	//funkcja wykonywana podczas wciśniecia przyciksku myszki (w zależności od klikniętego elementu wykonujemy różne rzeczy)
	mousemove: function mousemove() {
		switch (this.click_obj) {
			case 'right_resize':
				//rozszerzanie canvasa w prawo
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				var new_width = this.left - this.padding_x - position.left;
				if (new_width < screen.width - 100) {
					_canvas2.default.resize_width(new_width);
				}

				_canvas2.default.draw();
				break;

			case 'bottom_resize':
				//zmieniamy wysokość canvasa
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				var new_hight = this.top - this.padding_y - position.top;
				_canvas2.default.resize_height(new_hight);
				_canvas2.default.draw(new_hight);

				break;

			case 'image_resize':

				if (_image2.default.obj !== undefined) {

					var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
					var x_actual = this.left - position.left; //aktualna pozycja myszki
					var substract = _image2.default.x + _image2.default.width - x_actual + this.padding_x;
					var facor = _image2.default.width / _image2.default.height;

					if (_image2.default.width - substract > 100) {
						_image2.default.width -= substract;
						_image2.default.height -= substract / facor;
						_canvas2.default.draw();
					}
				}
				break;
		}
	}
}; // ╔╦╗╔═╗╦ ╦╔═╗╔═╗
// ║║║║ ║║ ║╚═╗║╣ 
// ╩ ╩╚═╝╚═╝╚═╝╚═╝

},{"./canvas":1,"./image":9,"./mouse":15}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt mówiący nam nad jaką kategoria jesteśmy
// ╔═╗╔╗╔  ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║ ║║║║  ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╝╚╝  ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

exports.default = {

	canvas_offset_top: 187,
	canvas_offset_left: 10,
	name: null,
	number: null,

	//funkcja zwracająca aktualną kategorię nad którą znajduje się kursor
	set: function set() {

		var left = _mouse2.default.left - this.canvas_offset_left;
		var top = _mouse2.default.top - this.canvas_offset_top;
		var row = Math.ceil(top / (_pointers2.default.size + _pointers2.default.padding_y));
		//console.log(left,top,this.canvas_offset_left,this.canvas_offset_top);
		if (_pointers2.default.translate_modulo && row % 2 != 0) {
			var column = Math.ceil((left + _pointers2.default.size / 2) / (_pointers2.default.size + _pointers2.default.padding_x)) - 1;
		} else {
			var column = Math.ceil(left / (_pointers2.default.size + _pointers2.default.padding_x));
		}

		try {
			var category_num = _pointers2.default.pointers[row - 1][column - 1];
			var category_name = _categories2.default.category[category_num][0];
		} catch (e) {
			this.name = null;
			this.number = null;
		}

		if (category_name == 'pusty' || category_name == 'gumuj') {
			this.name = null;
			this.number = null;
		} else {
			this.name = category_name;
			this.number = category_num;
		}
	}

};

},{"./categories":2,"./cloud":3,"./mouse":15,"./pointers":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _excel = require('./excel');

var _excel2 = _interopRequireDefault(_excel);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

var _palets = require('./palets');

var _palets2 = _interopRequireDefault(_palets);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ╔═╗╔═╗╦  ╔═╗╔╦╗╔═╗
// ╠═╝╠═╣║  ║╣  ║ ╚═╗
// ╩  ╩ ╩╩═╝╚═╝ ╩ ╚═╝

exports.default = {

  //val_max : null,
  //val_min : null,
  //val_interval : null,   
  //palets_active : 0,
  //value : -1, 
  //category : -1,

  //podstawowe palety kolorów ( ostatnia paleta jest naszą własną do zdefiniowania )


  show: function show() {
    this.show_color();
    this.show_palets();
    this.show_select();
    //layers.data.color_active[layers.active] = layers.colors_active[layers.active];
  },

  show_select: function show_select() {

    var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;

    //wyświetlamy panel do wyboru kolumny kategorii
    var add_html = '<option col="-1">wybierz</option>';
    for (var i = 0, i_max = l_excel.data[0].length; i < i_max; i++) {
      if (l_excel.data[0][i] != '') {
        if (i == _layers2.default.category[_layers2.default.active]) {
          add_html += '<option col="' + i + '" selected>' + l_excel.data[0][i] + '</option>';
        } else {
          add_html += '<option col="' + i + '">' + l_excel.data[0][i] + '</option>';
        }
      }
    }

    $('#excel_box select.category').html(add_html);

    //wyświetlamy panel do wyboru kolumny wartości
    add_html = '<option col="-1">wybierz</option>';
    for (var i = 0, i_max = l_excel.data[0].length; i < i_max; i++) {
      if (l_excel.data[0][i] != '') {
        if (i == _layers2.default.value[_layers2.default.active]) {
          add_html += '<option col="' + i + '" selected>' + l_excel.data[0][i] + '</option>';
        } else {
          add_html += '<option col="' + i + '">' + l_excel.data[0][i] + '</option>';
        }
      }
    }
    $('#excel_box select.value').html(add_html);

    //kolorujemy odpowiednio excela
    $('#excel_wrapper .td').removeClass("value");
    $('#excel_wrapper .td').removeClass("category");

    if (_layers2.default.value[_layers2.default.active] != -1) {
      $('#excel_wrapper .td[col="' + (_layers2.default.value[_layers2.default.active] + 1) + '"]').addClass("value");
    }

    if (_layers2.default.category[_layers2.default.active] != -1) {
      $('#excel_wrapper .td[col="' + (_layers2.default.category[_layers2.default.active] + 1) + '"]').addClass("category");
    }
  },

  //wybieramy kolumnę kategorii (obszarów)
  set_category: function set_category(obj) {
    _layers2.default.category[_layers2.default.active] = parseFloat($("#excel_box select.category option:selected").attr('col'));
    $('#excel_wrapper .td').removeClass("category");
    $('#excel_wrapper .td[col="' + (_layers2.default.category[_layers2.default.active] + 1) + '"]').addClass("category");
    //categories.update_color();
  },

  //wybieramy kolumne wartości i ustawiamy najmniejszą i największą wartość
  set_value: function set_value(obj) {
    var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;
    var value_tmp = parseFloat($("#excel_box select.value option:selected").attr('col'));

    //zabezpieczenie przed wybraniem kolumny zawierającej tekst
    var check = true;
    for (var i = 1, i_max = l_excel.data.length; i < i_max; i++) {
      if (!$.isNumeric(String(l_excel.data[i][value_tmp]).replace(',', '.')) && l_excel.data[i][value_tmp] != '') {

        check = false;
        console.log('to nie jest liczba!: ' + l_excel.data[i][value_tmp]);
      }
    }

    //sprawdzamy czy w zaznaczonej kolumnie znajduje się wiersz z tekstem
    if (check) {
      //jesli nie wybieramy daną kolumnę
      _layers2.default.value[_layers2.default.active] = value_tmp;
      $('#excel_wrapper .td').removeClass("value");
      $('#excel_wrapper .td[col="' + (_layers2.default.value[_layers2.default.active] + 1) + '"]').addClass("value");
      this.set_min_max_value();
    } else {
      //jeśli tak zwracamy błąd
      alert('wybrana kolumna zawiera wartości tekstowe');
      this.show_select();
    }
  },

  set_min_max_value: function set_min_max_value() {

    var l_excel = _store2.default.layers[_store2.default.project.layers.active].excel;
    var tmp_value = _layers2.default.value[_layers2.default.active];
    if (tmp_value != -1) {
      //wyszukujemy najmniejsza i największą wartość w kolumnie wartości
      if (_layers2.default.value[tmp_value] != -1) {

        var tmp_min = parseFloat(String(l_excel.data[1][tmp_value]).replace(',', '.'));
        var tmp_max = parseFloat(String(l_excel.data[1][tmp_value]).replace(',', '.'));

        for (var i = 1, i_max = l_excel.data.length; i < i_max; i++) {

          var num_tmp = parseFloat(String(l_excel.data[i][tmp_value]).replace(',', '.'));

          if (tmp_min > num_tmp && num_tmp != "") {
            tmp_min = num_tmp;
          }
          if (tmp_max < num_tmp && num_tmp != "") {
            tmp_max = num_tmp;
          }
        }
        //console.log("min max value: ",tmp_min, tmp_max);
      }

      console.log('wynik: ', tmp_min, tmp_max);

      _layers2.default.min_value[_layers2.default.active] = tmp_min;
      _layers2.default.max_value[_layers2.default.active] = tmp_max;

      //aktualizujemy tablicę legend
      _legends2.default.update();
    }
  },

  show_color: function show_color() {
    //wyświetlamy pierwszalistę kolorów
    var html = '';

    for (var i = 0, i_max = this.colors[0].length; i < i_max; i++) {

      if (_layers2.default.colors_pos[_layers2.default.active][i] == 1) {
        html += '<span class="active" style="background:' + this.colors[_layers2.default.palets_active[_layers2.default.active]][i] + '"></span>';
      } else {
        html += '<span style="background:' + this.colors[_layers2.default.palets_active[_layers2.default.active]][i] + '"></span>';
      }
    }

    $('#palets #select').html(html);

    $('#palets #select > span').click(function () {
      _palets2.default.select_color(this);
    });
  },

  show_palets: function show_palets() {

    //wyswietlamy wszystkie palety
    var html = '';
    for (var i = 0, i_max = this.colors.length; i < i_max; i++) {

      if (i == _layers2.default.palets_active[_layers2.default.active]) {
        html += '<span class="active">';
      } else {
        html += '<span>';
      }

      for (var j = 0, j_max = this.colors[0].length; j < j_max; j++) {
        html += '<span style="background:' + this.colors[i][j] + '"></span>';
      }
      html += '</span>';
    }
    $('#palets #all').html(html);
    $('#palets #all > span').click(function () {
      _palets2.default.select_palets(this);
    });
  },

  //zaznaczamy konkretne kolory do wyświetlenia
  select_color: function select_color(obj) {
    if (_layers2.default.value[_layers2.default.active] != -1 && _layers2.default.category[_layers2.default.active] != -1) {
      if ($(obj).hasClass('active')) {
        _layers2.default.colors_pos[_layers2.default.active][$(obj).index()] = 0;
        $(obj).removeClass('active');
      } else {
        _layers2.default.colors_pos[_layers2.default.active][$(obj).index()] = 1;
        $(obj).addClass('active');
      }
      this.parse_color();
      _palets2.default.set_min_max_value();
    }
  },

  //dodajemy do tablicy aktywnych kolorów te które są zaznaczone
  parse_color: function parse_color() {
    _layers2.default.colors_active[_layers2.default.active] = [];
    for (var i = 0, i_max = this.colors[0].length; i < i_max; i++) {

      if ($('#palets #select span').eq(i).hasClass('active')) {
        _layers2.default.colors_active[_layers2.default.active].push(rgb2hex($('#palets #select span').eq(i).css('background-color')));
      }
    }
    //categories.color_from_excel();
    //funkcja pomocnicza
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    _legends2.default.update();
  },

  //zaznaczamy palete kolorów
  select_palets: function select_palets(obj) {
    if (_layers2.default.value[_layers2.default.active] != -1 && _layers2.default.category[_layers2.default.active] != -1) {
      $('#palets #all > span').removeClass('active');
      $(obj).addClass('active');
      _layers2.default.palets_active[_layers2.default.active] = $(obj).index();

      //aktualizujemy paletę aktywnych kolorów
      _layers2.default.colors_active[_layers2.default.active] = [];
      for (var i = 0, i_max = _layers2.default.colors_pos[_layers2.default.active].length; i < i_max; i++) {
        if (_layers2.default.colors_pos[_layers2.default.active][i] == 1) {
          _layers2.default.colors_active[_layers2.default.active].push(_palets2.default.colors[_layers2.default.palets_active[_layers2.default.active]][i]);
        }
      }

      //aktualizujemy kolory w legendzie
      for (var i = 0, i_max = _layers2.default.legends[_layers2.default.active].length; i < i_max; i++) {
        _layers2.default.legends[_layers2.default.active][i][3] = _layers2.default.colors_active[_layers2.default.active][i];
      }

      //wyświetlamy okna kolorów do zaznaczenia
      _palets2.default.show_color();
      //wyświetlamy okno z legendami
      _legends2.default.show();

      //aktualizujemy kolory na mapie
      _categories2.default.update_color();
    }
  }
};

},{"./categories":2,"./excel":6,"./layers":11,"./legends":12,"./palets":17,"./store":19}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

var _figures = require('./figures');

var _figures2 = _interopRequireDefault(_figures);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//menu pointer
// ╔═╗╔═╗╦╔╗╔╔╦╗╔═╗╦═╗╔═╗
// ╠═╝║ ║║║║║ ║ ║╣ ╠╦╝╚═╗
// ╩  ╚═╝╩╝╚╝ ╩ ╚═╝╩╚═╚═╝

exports.default = {

	draw_border: function draw_border(next) {
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		var l_pointers = _store2.default.layers[_store2.default.project.layers.active].pointers;

		var width_pointer = l_pointers.size + l_pointers.padding_x,
		    height_pointer = l_pointers.size + l_pointers.padding_y,
		    none_color = "rgba(0,0,0,0)",
		    border = {},
		    data = {};

		var next = next || false;

		if (l_pointers.main_kind == 'square' || l_pointers.main_kind == 'circle' || l_pointers.main_kind == 'hexagon' || l_pointers.main_kind == 'hexagon2') {

			l_canvas.context.globalAlpha = 1;

			if (!next) {
				l_canvas.context.fillStyle = 'rgba(255,255,255,1)';
			} else {
				l_canvas.context.fillStyle = l_pointers.color_border;
			}

			for (var row = 0; row < l_canvas.active_row; row++) {
				for (var column = 0; column < l_canvas.active_column; column++) {

					if (l_pointers.pointers[row][column] != 0) {

						border = {
							top: false,
							top_left: false,
							top_right: false,
							right: false
						};

						//rysujemy połówkami
						//sprawdzamy czy mamy włączoną opcje modulo
						if (row - 1 >= 0) {
							if (!_pointers2.default.translate_modulo) {
								//jeśli nie to sprawdzamy tradycyjnie włączoną granicę nad 
								if (l_pointers.pointers[row - 1][column] != 0 && l_pointers.pointers[row - 1][column] != l_pointers.pointers[row][column]) {
									border.top = true;
								}
							} else {
								//jeśli tak to: sprawdzamy czy wiersz jest przesunięty
								if (row % 2 == 0) {
									if (column - 1 > 0) {
										if (l_pointers.pointers[row - 1][column] != 0 && l_pointers.pointers[row - 1][column] != l_pointers.pointers[row][column]) {
											border.top_left = true;
										}
									}
									if (l_pointers.pointers[row - 1][column + 1] != 0 && l_pointers.pointers[row - 1][column + 1] != l_pointers.pointers[row][column]) {
										border.top_right = true;
									}
								} else {
									if (l_pointers.pointers[row - 1][column - 1] != 0 && l_pointers.pointers[row - 1][column - 1] != l_pointers.pointers[row][column]) {
										border.top_left = true;
									}
									if (column + 1 <= l_canvas.active_column) {
										if (l_pointers.pointers[row - 1][column] != 0 && l_pointers.pointers[row - 1][column] != l_pointers.pointers[row][column]) {
											border.top_right = true;
										}
									}
								}
							}
						}

						if (column + 1 <= l_canvas.active_column) {
							if (l_pointers.pointers[row][column + 1] != 0 && l_pointers.pointers[row][column + 1] != l_pointers.pointers[row][column]) {
								border.right = true;
							}
						}

						data = {
							x: column * width_pointer,
							y: row * height_pointer,
							size: l_pointers.size,
							border: border,
							line_width_x: _pointers2.default.padding_x,
							line_width_y: _pointers2.default.padding_y,
							t_modulo: false,
							ctx: l_canvas.context
						};

						if (row % 2 == 0 && _pointers2.default.translate_modulo) {
							data.x = column * width_pointer + width_pointer / 2;
						}

						if (!next) {
							_figures2.default.square_border_big(data);
						} else {
							_figures2.default.square_border_small(data);
						}
					}
				}
			}
		}

		if (!next) {
			this.draw_border(true);
		}
	},

	//rysowanie wszystkich punktów
	draw: function draw() {

		var l_pointers = _store2.default.layers[_store2.default.project.layers.active].pointers;
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;
		var width_pointer = l_pointers.size + l_pointers.padding_x;
		var height_pointer = l_pointers.size + l_pointers.padding_y;
		var none_color = "rgba(0,0,0,0)";

		if (l_pointers.show_all_point) none_color = "rgba(128,128,128,1)";

		for (var row = 0; row < l_canvas.active_row; row++) {
			for (var column = 0; column < l_canvas.active_column; column++) {

				if (l_pointers.pointers[row][column] == 0) {
					l_canvas.context.fillStyle = none_color;
					l_canvas.context.globalAlpha = 0.5;
				} else {

					if (l_pointers.pointers[row][column] != _menu_top2.default.category && _menu_top2.default.category != 0) {
						l_canvas.context.globalAlpha = 0.2;
					} else {
						l_canvas.context.globalAlpha = 1;
					}
					try {
						l_canvas.context.fillStyle = _layers2.default.category_colors[_layers2.default.active][l_pointers.pointers[row][column]];
					} catch (e) {
						console.log('ERROR 39 LINE ! ', l_pointers.pointers[row][column], row, column);
					}
				}

				if (row % 2 == 0 && _pointers2.default.translate_modulo) {
					var data = {
						x: column * width_pointer + width_pointer / 2,
						y: row * height_pointer,
						size: l_pointers.size,
						ctx: l_canvas.context
					};
				} else {
					var data = {
						x: column * width_pointer,
						y: row * height_pointer,
						size: l_pointers.size,
						ctx: l_canvas.context
					};
				}

				_figures2.default[l_pointers.main_kind](data);
			}
		}

		if (l_pointers.show_border) {
			this.draw_border(false);
		}
	},

	//tworzymy tablice ponterów (jeśli jakiś ponter istnieje zostawiamy go, w przypadku gdy pointera nie ma tworzymy go na nowo)
	create_array: function create_array() {

		var l_pointers = _store2.default.layers[_store2.default.project.layers.active].pointers;
		var l_canvas = _store2.default.layers[_store2.default.project.layers.active].canvas;

		l_canvas.active_row = parseInt(l_canvas.height / (l_pointers.size + l_pointers.padding_y));
		l_canvas.active_column = parseInt(l_canvas.width / (l_pointers.size + l_pointers.padding_x));

		if (l_pointers.pointers.length < l_canvas.active_row || l_pointers.pointers[0].length < l_canvas.active_column) {
			for (var row = 0; row < l_canvas.active_row; row++) {
				for (var column = 0; column < l_canvas.active_column; column++) {
					if (l_pointers.pointers[row] == undefined) l_pointers.pointers[row] = new Array();
					if (l_pointers.pointers[row][column] == undefined) l_pointers.pointers[row][column] = 0;
				}
			}
		}
	},

	update_point: function update_point(y, x, y_last, x_last) {

		var l_pointers = _store2.default.layers[_store2.default.project.layers.active].pointers;
		l_pointers.pointers[y][x] = parseInt(_menu_top2.default.category);

		//wyznaczenie równania prostej
		if ((y_last != y || x_last != x) && y_last != null && x_last != null) {
			var a = (y_last - y) / (x_last - x);
			var b = y - a * x;

			if (x_last > x) {
				var col_from = x;
				var col_to = x_last;
			} else {
				var col_to = x;
				var col_from = x_last;
			}

			if (y_last > y) {
				var row_from = y;
				var row_to = y_last;
			} else {
				var row_to = y;
				var row_from = y_last;
			}

			var row = null;
			for (var col = col_from; col <= col_to; col++) {
				row = parseInt(a * col + b);
				if (!$.isNumeric(row)) row = y;
				l_pointers.pointers[row][col] = parseInt(_menu_top2.default.category);
			}

			var col = null;
			for (var row = row_from; row <= row_to; row++) {
				col = parseInt((row - b) / a);
				if (!$.isNumeric(col)) col = x;
				l_pointers.pointers[row][col] = parseInt(_menu_top2.default.category);
			}
		} else {
			l_pointers.pointers[y][x] = parseInt(_menu_top2.default.category);
		}
	}
};

},{"./canvas":1,"./figures":7,"./layers":11,"./menu_top":13,"./pointers":18,"./store":19}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ┌─┐┌┬┐┌─┐┬─┐┌─┐
// └─┐ │ │ │├┬┘├┤ 
// └─┘ ┴ └─┘┴└─└─┘

//Obiekt przechowujący wszystkie zmienne globalne


//konstrukcja bazy

//(numer mapy) (numer warstwy) (obiekt) (wlasciwosc) 


exports.default = {

  //zmienne dotyczące globalnych danych
  project: {

    layers: {
      active: 0
    },

    title: 'nowy projekt',

    menu_top: {
      move_image: false,
      move_canvas: false,
      auto_draw: false,
      mode_key: true,
      category: 0,
      disable_select: false,
      animate_box: false
    },

    palets: {
      colors: [['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'], ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'], ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'], ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'], ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'], ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'], ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'], ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'], ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'], ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'], ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'], ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'], ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'], ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'], ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'], ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'], ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'], ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'], ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']]
    }
  },

  layers: [{

    source: '',

    name: 'zakladka 1',

    excel: {
      data: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]],

      min_row: 12,
      min_col: 6,

      min_val: 0,
      max_val: 0
    },

    pointers: {

      show_all_point: true,
      show_border: false,
      padding_x: 1,
      padding_y: 1,
      translate_modulo: false,
      size: 10,
      main_kind: 'square',
      kinds: ['square', 'circle', 'hexagon', 'hexagon2'],
      color_border: '#333',
      pointers: [], //pointers.pointers[rzad][kolumna] : kategoria[numer]

      last_column: null, //kolumna pointera który został ostatnio zmieniony
      last_row: null },

    canvas: {

      scale: 100,
      width: 700,
      height: 400,
      canvas: null,
      context: null,
      thumbnail: null,

      context_x: 0, //obecna pozycja contextu x
      context_y: 0, //obecna pozycja contextu y
      context_new_x: 0, //nowa pozycja contextu x
      context_new_y: 0, //nowa pozycja contextu y

      offset_left: null,
      offset_top: null,
      active_row: null, //liczba aktywnych wierszy i kolumn
      active_column: null }

  }]

};

},{}],20:[function(require,module,exports){
'use strict';

var _menu_top = require('./modules/menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _layers = require('./modules/layers');

var _layers2 = _interopRequireDefault(_layers);

var _palets = require('./modules/palets');

var _palets2 = _interopRequireDefault(_palets);

var _colorpicker = require('./modules/colorpicker');

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _crud = require('./modules/crud');

var _crud2 = _interopRequireDefault(_crud);

var _mouse = require('./modules/mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _pointers = require('./modules/pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _canvas = require('./modules/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _categories = require('./modules/categories');

var _categories2 = _interopRequireDefault(_categories);

var _excel = require('./modules/excel');

var _excel2 = _interopRequireDefault(_excel);

var _legends = require('./modules/legends');

var _legends2 = _interopRequireDefault(_legends);

var _on_category = require('./modules/on_category');

var _on_category2 = _interopRequireDefault(_on_category);

var _cloud = require('./modules/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _global = require('./modules/global');

var _global2 = _interopRequireDefault(_global);

var _models = require('./modules/models');

var _models2 = _interopRequireDefault(_models);

var _labels = require('./modules/labels');

var _labels2 = _interopRequireDefault(_labels);

var _store = require('./modules/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//specjalny obiekt do badania stanu różnych obiektów
window.spec = {
	menu_top: _menu_top2.default,
	layers: _layers2.default,
	palets: _palets2.default,
	colorpicker: _colorpicker2.default,
	crud: _crud2.default,
	mouse: _mouse2.default,
	pointers: _pointers2.default,
	canvas: _canvas2.default,
	categories: _categories2.default,
	excel: _excel2.default,
	legends: _legends2.default,
	on_category: _on_category2.default,
	cloud: _cloud2.default,
	global: _global2.default,
	models: _models2.default,
	labels: _labels2.default,
	store: _store2.default
};

//dodajemy tinymce do 2 textarea (dymek źródło)
// ██████╗ ██╗ ██████╗ ███╗   ███╗ █████╗ ██████╗     ██████╗    ██╗
// ██╔══██╗██║██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ╚════██╗  ███║
// ██████╔╝██║██║   ██║██╔████╔██║███████║██████╔╝     █████╔╝  ╚██║
// ██╔══██╗██║██║▄▄ ██║██║╚██╔╝██║██╔══██║██╔═══╝      ╚═══██╗   ██║
// ██████╔╝██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║         ██████╔╝██╗██║
// ╚═════╝ ╚═╝ ╚══▀▀═╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚═════╝ ╚═╝╚═╝
// wersja: 3.1.5 autor: Marcin Gębala

tinymce.init({
	menubar: false,
	selector: '.tinyedit', // change this value according to your HTML
	toolbar: 'bold italic | link image',
	setup: function setup(editor) {
		editor.on('change', function (e) {
			var target = $(editor.targetElm).attr('name');

			//jeśli aktualizujemy dymek
			if (target == 'cloud') {
				console.log();
				_layers2.default.cloud[_layers2.default.active] = editor.getContent();
				//cloud.get_textarea( editor.getContent() );
			}

			//jeśli aktualizujemy żródło projektu
			if (target == 'source') {
				_layers2.default.source = editor.getContent();
			}
		});
	}
});

//dodajemy blokadę przed przypadkowym odświeżeniem strony
_global2.default.refreshLock();

//po kliknięciu zmieniay aktualny panel
$('.box > ul > li').click(function (e) {
	_menu_top2.default.change_box(e.currentTarget);
});

$(document).ready(function () {

	_menu_top2.default.get_maps();
	_menu_top2.default.get_projects();
	_layers2.default.show();
	_palets2.default.show();
	_colorpicker2.default.color_border();
	//tworzymy tablice pointerów
	_pointers2.default.create_array();
	_excel2.default.init();
	_legends2.default.show();
	_canvas2.default.init();

	//zablokowanie możliwości zaznaczania buttonów podczas edycji pola
	$(document).on("focusin", "input", function () {
		_menu_top2.default.disable_select = true;
	});
	$(document).on("focusout", "input", function () {
		_menu_top2.default.disable_select = false;
	});

	//zaznaczenie dymka do publikacji po kliknięciu
	$('.publish .embed').click(function () {
		$(undefined).select();
	});
	$('.publish').click(function (e) {
		_crud2.default.publish(e);
	});

	//jeśli chcemy zapisać / zaktualizować / opublikować projekt
	$('#toolbar_top button.save').click(function () {
		if (typeof _crud2.default.project_hash == 'string') {
			_crud2.default.update_project();
		} else {
			_crud2.default.create_project();
		}
	});

	//jeśli chcemy usunąć projekt
	$('#toolbar_top button.delete').click(function () {
		if (confirm('Czy chcesz usunąć projekt ?')) {
			_crud2.default.delete_project();
		}
	});

	//odznaczenie selecta przy zmianie
	$('#change_category').change(function () {
		$('#change_category').blur();
	});

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup(function () {
		_mouse2.default.mouse_down = false;
	});

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown(function (e) {
		if (!e) {
			e = window.event;
		} //łata dla mozilli
		_mouse2.default.set_mouse_down(e);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove(function (e) {
		if (!e) {
			e = window.event;
		} //lata dla mozilli
		_mouse2.default.set_position(e); //zarejestrowanie pozycji myszki

		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if (_mouse2.default.mouse_down) _mouse2.default.mousemove(event);
		if (_menu_top2.default.auto_draw) {
			_mouse2.default.click_obj = "canvas";_mouse2.default.mousemove(event);
		}
	});

	$('#main_canvas').mousedown(function (e) {
		if (!e) {
			e = window.event;
		} //lata dla mozilli
		_mouse2.default.set_mouse_down(e); //zarejestrowanie obiektuw  który klikamy
		_mouse2.default.set_position(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		_mouse2.default.mousemove(e);
	});

	$(document).mouseup(function () {
		_pointers2.default.last_column = null; //kolumna pointera który został ostatnio zmieniony
		_pointers2.default.last_row = null;
		_canvas2.default.context_x = _canvas2.default.context_new_x;
		_canvas2.default.context_y = _canvas2.default.context_new_y;
	});

	//dodanie nowej kategorii
	$('#add_category').click(function () {
		_categories2.default.add();
	});

	//dodanie nowej kategorii (po wciśnięciu enter)
	$('input[name="add_category"]').keypress(function (e) {
		if (e.which == 13) {
			_categories2.default.add();
		}
	});

	//podpięcie zdarzeń
	$('#pointers').delegate('input[name="project.name"]', 'keyup', function (e) {
		console.log('test', e.currentTarget.value);
	});

	//pokazanie / ukrycie panelu kategorii
	$('#excel_box h2').click(function (e) {
		_global2.default.toogle_left(e.currentTarget);
	});
	$('#pointer_box h2').click(function (e) {
		_global2.default.toogle_right(e.currentTarget);
	});
	$('#palets_box h2').click(function (e) {
		_global2.default.toogle_right(e.currentTarget);
	});

	//obsługa buttonów do inkrementacji i dekrementacji inputów
	$('button.increment').click(function (e) {
		_models2.default.button_increment($(e.currentTarget));
	});
	$('button.decrement').click(function (e) {
		_models2.default.button_decrement($(e.currentTarget));
	});

	//obługa inputów pobranie danych i zapisanie do bazy
	$('.switch').click(function (e) {
		_models2.default.update_from_switch($(e.currentTarget));
	}); //przyciski switch
	$('.input_base').change(function (e) {
		_models2.default.update_from_input($(e.currentTarget));
	}); //tradycyjne inputy
	$('.input_base_text').change(function (e) {
		_models2.default.update_from_input_text($(e.currentTarget));
	}); //tradycyjne inputy
	$('.select_base').change(function (e) {
		_models2.default.update_from_select($(e.currentTarget));
	}); //listy rozwijane select

	$('#menu_top #increment_canvas').click(function () {
		_menu_top2.default.increment_scale();
	});
	$('#menu_top #decrement_canvas').click(function () {
		_menu_top2.default.decrement_scale();
	});
	$('#menu_top #add_image').click(function () {
		_menu_top2.default.add_image();
	});

	$('#menu_top #reset_canvas').click(function () {
		_canvas2.default.set_default();
	});

	$('#layers .label_layer').keyup(function (e) {
		_labels2.default.edit(e.currentTarget);
	});
	//zdarzenia dotyczące palet
	$('#excel_box select.category').change(function (e) {
		_palets2.default.set_category(e.currentTarget);
	});
	$('#excel_box select.value').change(function (e) {
		_palets2.default.set_value(e.currentTarget);
	});

	//zaktualizowanie kategorii
	$("#area").delegate("input", "focusout", function (e) {
		_categories2.default.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val());
	});

	$("#area").delegate("input", "keypress", function (e) {
		if (e.which == 13) {
			_categories2.default.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val());
		}
	});

	$('#canvas_wrapper').mouseleave(function () {
		$("#canvas_cloud").fadeOut(200);
	});

	$('#canvas_wrapper').mousemove(function () {
		_on_category2.default.set();
		_cloud2.default.update_text();
		_cloud2.default.set_position();
	});

	//zmiana nazwy projektu przy wpisaniu nowej nazwy do inputa
	$('#pointers .project_name').keyup(function () {
		_layers2.default.project_name = $(undefined).val();
	});

	//$('#canvas_info #width').val(canvas.width_canvas+'px');
	//$('#canvas_info #height').val(canvas.height_canvas+'px');
	$('#canvas_box, #canvas_wrapper').css({ 'width': _canvas2.default.width_canvas + 'px', 'height': _canvas2.default.height_canvas + 'px' });
	$('#width_canvas, #height_canvas').change(function () {
		_menu_top2.default.update_canvas_info();
	});
});

},{"./modules/canvas":1,"./modules/categories":2,"./modules/cloud":3,"./modules/colorpicker":4,"./modules/crud":5,"./modules/excel":6,"./modules/global":8,"./modules/labels":10,"./modules/layers":11,"./modules/legends":12,"./modules/menu_top":13,"./modules/models":14,"./modules/mouse":15,"./modules/on_category":16,"./modules/palets":17,"./modules/pointers":18,"./modules/store":19}]},{},[20])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9jYW52YXMuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9jYXRlZ29yaWVzLmpzIiwicHVibGljLWRldi9qcy9wcm9qZWN0L21vZHVsZXMvY2xvdWQuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9jb2xvcnBpY2tlci5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL2NydWQuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9leGNlbC5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL2ZpZ3VyZXMuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9nbG9iYWwuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9pbWFnZS5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL2xhYmVscy5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL2xheWVycy5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL2xlZ2VuZHMuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9tZW51X3RvcC5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL21vZGVscy5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL21vdXNlLmpzIiwicHVibGljLWRldi9qcy9wcm9qZWN0L21vZHVsZXMvb25fY2F0ZWdvcnkuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9wYWxldHMuanMiLCJwdWJsaWMtZGV2L2pzL3Byb2plY3QvbW9kdWxlcy9wb2ludGVycy5qcyIsInB1YmxpYy1kZXYvanMvcHJvamVjdC9tb2R1bGVzL3N0b3JlLmpzIiwicHVibGljLWRldi9qcy9wcm9qZWN0L3By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U0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FMTyxFQU1QLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FOTyxFQU9QLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FQTyxFQVFQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FSTyxFQVNQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FUTyxFQVVQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FWTyxFQVdQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FYTyxFQVlQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMsU0FBekMsRUFBbUQsU0FBbkQsRUFBNkQsU0FBN0QsRUFBdUUsU0FBdkUsRUFBaUYsU0FBakYsQ0FaTyxFQWFQLENBQUMsU0FBRCxFQUFXLFNBQVgsRUFBcUIsU0FBckIsRUFBK0IsU0FBL0IsRUFBeUMs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WCxDQUFtQixFQUFFLEVBQUUsYUFBSixFQUFtQixJQUFuQixDQUF3QixhQUF4QixDQUFuQixFQUEyRCxFQUFFLEVBQUUsYUFBSixFQUFtQixHQUFuQixFQUEzRDtBQUF3RjtBQUM1RyxFQUZEOztBQUlBLEdBQUUsaUJBQUYsRUFBcUIsVUFBckIsQ0FBaUMsWUFBTTtBQUFFLElBQUUsZUFBRixFQUFtQixPQUFuQixDQUEyQixHQUEzQjtBQUFrQyxFQUEzRTs7QUFFQSxHQUFFLGlCQUFGLEVBQXFCLFNBQXJCLENBQWdDLFlBQU07QUFDcEMsd0JBQVksR0FBWjtBQUNBLGtCQUFNLFdBQU47QUFDQSxrQkFBTSxZQUFOO0FBQ0QsRUFKRDs7QUFNQTtBQUNBLEdBQUUseUJBQUYsRUFBNkIsS0FBN0IsQ0FBb0MsWUFBTTtBQUFFLG1CQUFPLFlBQVAsR0FBc0IsYUFBUSxHQUFSLEVBQXRCO0FBQXNDLEVBQWxGOztBQUVBO0FBQ0Q7QUFDQyxHQUFFLDhCQUFGLEVBQWtDLEdBQWxDLENBQXNDLEVBQUMsU0FBUyxpQkFBTyxZQUFQLEdBQXNCLElBQWhDLEVBQXFDLFVBQVMsaUJBQU8sYUFBUCxHQUF1QixJQUFyRSxFQUF0QztBQUNELEdBQUUsK0JBQUYsRUFBbUMsTUFBbkMsQ0FBMkMsWUFBTTtBQUFDLHFCQUFTLGtCQUFUO0FBQThCLEVBQWhGO0FBRUEsQ0F6SUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWX4pWU4pWmICDilabilZTilZDilZfilZTilZDilZdcbi8vIOKVkSAg4pWg4pWQ4pWj4pWR4pWR4pWR4pWa4pWX4pWU4pWd4pWg4pWQ4pWj4pWa4pWQ4pWXXG4vLyDilZrilZDilZ3ilakg4pWp4pWd4pWa4pWdIOKVmuKVnSDilakg4pWp4pWa4pWQ4pWdXG5cbmltcG9ydCBwb2ludGVycyBmcm9tICcuL3BvaW50ZXJzJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbWVudV90b3AnO1xuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG4vL2N6eXN6Y3plbmllIGkgcnlzb3dhbmllIHBvIGNhbnZhc2llXG5leHBvcnQgZGVmYXVsdCB7XG5cbi8qXHRcblx0c2NhbGUgOiAxMDAsXG5cdHdpZHRoIDogNzAwLFxuXHRoZWlnaHQgOiA0MDAsXG5cdGNhbnZhcyA6IG51bGwsXG5cdGNvbnRleHQgOiBudWxsLFxuXHR0aHVtYm5haWwgOiBudWxsLFxuXHR0aXRsZV9wcm9qZWN0IDogJ25vd3kgcHJvamVrdCcsXG5cblx0Y29udGV4dF94IDogMCwgLy9vYmVjbmEgcG96eWNqYSBjb250ZXh0dSB4XG5cdGNvbnRleHRfeSA6IDAsIC8vb2JlY25hIHBvenljamEgY29udGV4dHUgeVxuXHRjb250ZXh0X25ld194IDogMCwgLy9ub3dhIHBvenljamEgY29udGV4dHUgeFxuXHRjb250ZXh0X25ld195IDogMCwgLy9ub3dhIHBvenljamEgY29udGV4dHUgeVxuXG5cdG9mZnNldF9sZWZ0IDogbnVsbCxcblx0b2Zmc2V0X3RvcCA6IG51bGwsXG5cdGFjdGl2ZV9yb3cgOiBudWxsLCAvL2xpY3piYSBha3R5d255Y2ggd2llcnN6eSBpIGtvbHVtblxuXHRhY3RpdmVfY29sdW1uIDogbnVsbCwgLy9saWN6YmEgYWt0eXdueWNoIHdpZXJzenkgaSBrb2x1bW5cbiovXG5cblx0aW5pdCA6IGZ1bmN0aW9uKCl7XG5cdFx0XG5cdFx0dmFyIGxfY2FudmFzID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uY2FudmFzO1xuXG5cdFx0Ly9wcnp5cGlzYW5pZSBwb2RzdGF3b3dvd3ljaCBkYW55Y2ggZG8gb2JpZWt0dSBjYW52YXNcblx0XHRsX2NhbnZhcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbl9jYW52YXMnKTtcblx0ICBsX2NhbnZhcy5jb250ZXh0ID0gbF9jYW52YXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0ICB2YXIgb2Zmc2V0ID0gJCgnI2NhbnZhc19ib3gnKS5vZmZzZXQoKTtcblx0ICBsX2NhbnZhcy5vZmZzZXRfbGVmdCA9IG9mZnNldC5sZWZ0O1xuXHQgIGxfY2FudmFzLm9mZnNldF90b3AgPSBvZmZzZXQudG9wO1xuXG5cdCAgJCgnI3dpZHRoX2NhbnZhcycpLnZhbChsX2NhbnZhcy53aWR0aCsncHgnKTtcblx0ICAkKCcjaGVpZ2h0X2NhbnZhcycpLnZhbChsX2NhbnZhcy5oZWlnaHQrJ3B4Jyk7XG5cdFx0XG5cdFx0dGhpcy5zZXRfZGVmYXVsdCgpO1xuXHQgIHRoaXMuZHJhdygpO1xuXHR9LFxuXG5cdHRodW1ibmFpbCA6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbl9jYW52YXNcIik7XG5cdFx0dmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCk7XG5cdFx0Y29uc29sZS5sb2coZGF0YVVSTCk7XG5cdH0sXG5cblx0Ly9yeXN1amVteSBjYW52YXMgemUgemRqxJljaWVtXG5cdGRyYXcgOiBmdW5jdGlvbigpe1xuXHRcdHRoaXMuY2xlYXIoKTtcblxuXHRcdHBvaW50ZXJzLmNyZWF0ZV9hcnJheSgpO1xuXHRcdHBvaW50ZXJzLmRyYXcoKTtcblxuXHRcdGlmIChpbWFnZS5vYmogIT09IHVuZGVmaW5lZCkgIGltYWdlLmRyYXcoKTtcblx0fSxcblxuXHRkcmF3X3RodW1uYWlsIDogZnVuY3Rpb24oKXsgXG4vKlxuXHRcdGNhbnZhcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGh1bWJuYWlsX2NhbnZhcycpO1xuXHRcdGNhbnZhcy50aHVtYm5haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGh1bWJuYWlsX2NhbnZhcycpO1xuXHRcdGNhbnZhcy5jb250ZXh0ID0gY2FudmFzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0dGhpcy5jbGVhcigpO1xuXG5cdFx0cG9pbnRlcnMuY3JlYXRlX2FycmF5KCk7XG5cdFx0cG9pbnRlcnMuZHJhdygpO1xuXG5cdFx0Y2FudmFzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluX2NhbnZhcycpO1xuXHRcdGNhbnZhcy5jb250ZXh0ID0gY2FudmFzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuKi9cblx0fSxcblxuXHQvL3Jlc2V0dWplbXkgdMWCbyB6ZGrEmWNpYVxuXHRyZXNldCA6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGxfY2FudmFzID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uY2FudmFzO1xuXHRcdGxfY2FudmFzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuXHRcdGxfY2FudmFzLmNvbnRleHQuc2NhbGUoIGxfY2FudmFzLnNjYWxlIC8gMTAwICwgbF9jYW52YXMuc2NhbGUgLyAxMDAgKTtcblx0fSxcblxuXHQvLyBjennFm2NpbXkgY2HFgmUgemRqxJljaWUgbmEgY2FudmFzaWVcblx0Y2xlYXIgOiBmdW5jdGlvbigpe1xuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcblx0XHRsX2NhbnZhcy5jb250ZXh0LmNsZWFyUmVjdCAoIDAsIDAsIGxfY2FudmFzLndpZHRoLCBsX2NhbnZhcy5oZWlnaHQgKTtcblx0fSxcblxuXHQvL3ptaWVuaWFteSBzemVyb2tvxZvEhyBjYW52YXNhIG8gcG9kYW7EhSBsaWN6YsSZIHBpa3NlbGlcblx0cmVzaXplX3dpZHRoIDogZnVuY3Rpb24oIG5ld193aWR0aCApe1xuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcblx0XHRsX2NhbnZhcy53aWR0aCA9IG5ld193aWR0aDtcblx0XHQkKCcjbWFpbl9jYW52YXMsICNjYW52YXNfd3JhcHBlciwgI2NhbnZhc19ib3gnKS5hdHRyKCd3aWR0aCcsbF9jYW52YXMud2lkdGggKyAncHgnKS5jc3Moeyd3aWR0aCc6IGxfY2FudmFzLndpZHRoICsgJ3B4J30pO1xuXHRcdG1lbnVfdG9wLnNob3dfaW5mbygpO1xuXHR9LFxuXG5cdC8vem1pZW5pYW15IHd5c29rb8WbxIcgY2FudmFzYSBvIHBvZGFuxIUgbGljemLEmSBwaWtzZWxpXG5cdHJlc2l6ZV9oZWlnaHQgOiBmdW5jdGlvbiggbmV3X2hlaWdodCApe1xuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcblx0XHRsX2NhbnZhcy5oZWlnaHQgPSBuZXdfaGVpZ2h0O1xuXHRcdCQoJyNtYWluX2NhbnZhcywgI2NhbnZhc193cmFwcGVyLCAjY2FudmFzX2JveCcpLmF0dHIoJ2hlaWdodCcsbF9jYW52YXMuaGVpZ2h0ICsgJ3B4JykuY3NzKHsnaGVpZ2h0JzogbF9jYW52YXMuaGVpZ2h0ICsgJ3B4J30pO1xuXHRcdG1lbnVfdG9wLnNob3dfaW5mbygpOyAvLyBha3R1YWxpenVqZW15IGRhbmUgb2Rub8WbbmllIHJvem1pYXLDs3cgY2FudmFzYSB3IG1lbnUgdSBnw7NyeVxuXHR9LFxuXG5cdHNldF9kZWZhdWx0IDogZnVuY3Rpb24oKXtcblx0XHR2YXIgbF9jYW52YXMgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5jYW52YXM7XG5cdFx0XG5cdFx0JCgnI2NhbnZhc19ib3ggI3JpZ2h0X3Jlc2l6ZSwgI2NhbnZhc19ib3ggI2JvdHRvbV9yZXNpemUnKS5mYWRlSW4oNTAwKTtcblx0XHRpZihsX2NhbnZhcy5tb3ZlX2ltYWdlKSAkKCcjY2FudmFzX2JveCAjaW1hZ2VfcmVzaXplJykuZmFkZUluKDApO1xuXG5cdFx0bF9jYW52YXMuc2NhbGUgPSAxMDA7XG5cdFx0bF9jYW52YXMuY29udGV4dF94ID0gMDtcblx0XHRsX2NhbnZhcy5jb250ZXh0X3kgPSAwO1xuXHRcdGxfY2FudmFzLmNvbnRleHQuc2NhbGUoIGxfY2FudmFzLnNjYWxlIC8gMTAwICwgbF9jYW52YXMuc2NhbGUgLyAxMDAgKTtcblxuXHRcdHZhciBuZXdfd2lkdGggPSBsX2NhbnZhcy53aWR0aCAqIChsX2NhbnZhcy5zY2FsZS8xMDApO1xuXHRcdHZhciBuZXdfaGVpZ2h0ID0gbF9jYW52YXMuaGVpZ2h0ICogKGxfY2FudmFzLnNjYWxlLzEwMCk7XG5cblx0XHQkKCcjbWFpbl9jYW52YXMsICNjYW52YXNfd3JhcHBlciwjY2FudmFzX2JveCcpLmNzcyh7J3dpZHRoJzogbmV3X3dpZHRoICsgJ3B4JywnaGVpZ2h0JyA6IG5ld19oZWlnaHQgKyAncHgnfSk7XG5cblx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0bF9jYW52YXMuY29udGV4dC50cmFuc2xhdGUoICggbF9jYW52YXMuY29udGV4dF94IC8gKGxfY2FudmFzLnNjYWxlIC8gMTAwKSApLCggbF9jYW52YXMuY29udGV4dF95IC8gKGxfY2FudmFzLnNjYWxlIC8gMTAwKSApKTtcblx0XHRtZW51X3RvcC5zaG93X2luZm8oKTtcblx0XHR0aGlzLmRyYXcoKTtcblx0fVxufVxuIiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWm4pWQ4pWX4pWmIOKVplxuLy8g4pWRICDilaDilZDilaMg4pWRIOKVkeKVoyDilZEg4pWm4pWRIOKVkeKVoOKVpuKVneKVmuKVpuKVnVxuLy8g4pWa4pWQ4pWd4pWpIOKVqSDilakg4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWp4pWa4pWQIOKVqSBcblxuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbWVudV90b3AnO1xuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgY29sb3JwaWNrZXIgZnJvbSAnLi9jb2xvcnBpY2tlcic7XG5pbXBvcnQgcG9pbnRlcnMgZnJvbSAnLi9wb2ludGVycyc7XG5pbXBvcnQgY3J1ZCBmcm9tICcuL2NydWQnO1xuaW1wb3J0IGV4Y2VsIGZyb20gJy4vZXhjZWwnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5cbi8vb2JpZWt0IGthdGVnb3JpaSBkb2RhbmllIC8gYWt0dWFsaXphY2phIC8gdXN1bmnEmWNpZSAvIHBva2F6YW5pZSBrYXRlZ29yaWlcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHRhZGQgOiBmdW5jdGlvbigpe1xuXHRcdHZhciBuYW1lID0gQXJyYXkoJCgnI2NhdGVnb3J5X2JveCBpbnB1dFtuYW1lPVwiYWRkX2NhdGVnb3J5XCJdJykudmFsKCksJyNmZjAwMDAnKTtcblx0XHQkKCcjY2F0ZWdvcnlfYm94IGlucHV0W25hbWU9XCJhZGRfY2F0ZWdvcnlcIl0nKS52YWwoJycpO1xuXG5cdFx0YWxlcnQoICk7XG5cblx0XHR0aGlzLmNhdGVnb3J5LnB1c2gobmFtZSk7XG5cdFx0bWVudV90b3AuY2F0ZWdvcnkgPSAodGhpcy5jYXRlZ29yeS5sZW5ndGgtMSk7XG5cdFx0dGhpcy5zaG93X2xpc3QoKTtcblx0XHR0aGlzLnVwZGF0ZV9jb2xvcigpO1xuXHR9LFxuXG5cdHVwZGF0ZSA6IGZ1bmN0aW9uKGluZGV4LG5hbWUpe1xuXG5cdFx0Y29uc29sZS5sb2coaW5kZXgsIG5hbWUpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeVtpbmRleF1bMF0gPSBuYW1lO1xuXHRcdHRoaXMuc2hvd19saXN0KCk7XG5cdFx0dGhpcy51cGRhdGVfY29sb3IoKTtcblx0fSxcblxuXHQvL2FrdHVhbGl6dWplbXkgdGFibGljxJkga29sb3LDs3dcblx0dXBkYXRlX2NvbG9yIDogZnVuY3Rpb24oKXtcblxuXHRcdC8vbW/FvGxpd2EgYWt0dWFsaXphY2phIGplZHluaWUgdyBwcnp5cGFka3Ugd3licmFuaWEga29ua3JldG5laiBrb2x1bW55IHdhcnRvxZtjaSBpIGthdGVnb3JpaSB3IGV4Y2VsdVxuXHRcdGlmKChjcnVkLm1hcF9qc29uLmxlbmd0aCA+IDApICYmIChleGNlbC5kYXRhLmxlbmd0aCA+IDApICYmIChsYXllcnMuY2F0ZWdvcnlbbGF5ZXJzLmFjdGl2ZV0gIT0gLTEpICYmIChsYXllcnMudmFsdWVbbGF5ZXJzLmFjdGl2ZV0gIT0gLTEpKXtcblxuXHRcdFx0Zm9yICh2YXIgaV9jYXRlZ29yeSA9IDAsIGlfY2F0ZWdvcnlfbWF4ID1cdGxheWVycy5jYXRlZ29yeV9uYW1lLmxlbmd0aDsgaV9jYXRlZ29yeSA8IGlfY2F0ZWdvcnlfbWF4OyBpX2NhdGVnb3J5Kyspe1xuXHRcdFx0XHR2YXIgbmFtZSA9IGxheWVycy5jYXRlZ29yeV9uYW1lW2lfY2F0ZWdvcnldO1xuXHRcdFx0XHR2YXIgZmluZCA9IGZhbHNlO1xuXG5cdFx0XHRcdGZvciAodmFyIGlfbGF5ZXJzID0gMCwgaV9sYXllcnNfbWF4ID0gbGF5ZXJzLmxpc3QubGVuZ3RoOyBpX2xheWVycyA8IGlfbGF5ZXJzX21heDsgaV9sYXllcnMrKyl7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaV9leGVsID0gMCwgaV9leGVsX21heCA9IGV4Y2VsLmRhdGEubGVuZ3RoOyBpX2V4ZWwgPCBpX2V4ZWxfbWF4OyBpX2V4ZWwrKyl7XG5cdFx0XHRcdFx0XHRpZigoIFN0cmluZyhleGNlbC5kYXRhW2lfZXhlbF1bbGF5ZXJzLmNhdGVnb3J5W2lfbGF5ZXJzXV0pLnRvTG93ZXJDYXNlKCkgPT0gU3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKCkpICYmIChleGNlbC5kYXRhW2lfZXhlbF1bbGF5ZXJzLmNhdGVnb3J5W2lfbGF5ZXJzXV0gIT0gJycpKXtcblxuXHRcdFx0XHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0Ly9qZcWbbGkgem5hbGXFumxpxZtteSBrYXRlZ29yacSZIHcgZXhjZWx1XG5cdFx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IFN0cmluZyhleGNlbC5kYXRhW2lfZXhlbF1bbGF5ZXJzLnZhbHVlW2lfbGF5ZXJzXV0pLnJlcGxhY2UoJywnLCcuJyk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coZXhjZWwuZGF0YVtpX2V4ZWxdW2xheWVycy52YWx1ZVtpX2xheWVyc11dKycgfCAnK3ZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGZvciAoIHZhciBpX2xlZ2VuZHMgPSAwLCBpX2xlZ2VuZHNfbWF4ID0gbGF5ZXJzLmxlZ2VuZHNbaV9sYXllcnNdLmxlbmd0aDsgaV9sZWdlbmRzIDwgaV9sZWdlbmRzX21heDsgaV9sZWdlbmRzKysgKXtcblx0XHRcdFx0XHRcdFx0XHRpZiggKHZhbHVlID49IGxheWVycy5sZWdlbmRzW2lfbGF5ZXJzXVtpX2xlZ2VuZHNdWzBdKSAmJiAodmFsdWUgPD0gbGF5ZXJzLmxlZ2VuZHNbaV9sYXllcnNdW2lfbGVnZW5kc11bMV0pICl7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL2plxZtsaSB6bmFsZcW6bGlzbXlcblx0XHRcdFx0XHRcdFx0XHRcdGxheWVycy5jYXRlZ29yeV9jb2xvcnNbaV9sYXllcnNdW2lfY2F0ZWdvcnldID0gbGF5ZXJzLmxlZ2VuZHNbaV9sYXllcnNdW2lfbGVnZW5kc11bM107XG5cdFx0XHRcdFx0XHRcdFx0XHRpX2xlZ2VuZHMgPSBpX2xlZ2VuZHNfbWF4O1xuXHRcdFx0XHRcdFx0XHRcdFx0aV9leGVsID0gaV9leGVsX21heDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvL2plxZtsaSB3YXJ0b8WbxIcgd3ljaG9kemkgcG96YSBza2FsZSB1IHRhayBwcnp5cGlzdWplbXkgamVqIG9kcG93aWVkbmkga29sb3Jcblx0XHRcdFx0XHRcdFx0aWYodmFsdWUgPCBsYXllcnMubGVnZW5kc1tpX2xheWVyc11bMF1bMF0pe1xuXHRcdFx0XHRcdFx0XHRcdGxheWVycy5jYXRlZ29yeV9jb2xvcnNbaV9sYXllcnNdW2lfY2F0ZWdvcnldID0gbGF5ZXJzLmxlZ2VuZHNbaV9sYXllcnNdWzBdWzNdO1xuXHRcdFx0XHRcdFx0XHR9XHRcblxuXHRcdFx0XHRcdFx0XHRpZih2YWx1ZSA+IGxheWVycy5sZWdlbmRzW2lfbGF5ZXJzXVtpX2xlZ2VuZHNfbWF4LTFdWzFdKXtcblx0XHRcdFx0XHRcdFx0XHRsYXllcnMuY2F0ZWdvcnlfY29sb3JzW2lfbGF5ZXJzXVtpX2NhdGVnb3J5XSA9IGxheWVycy5sZWdlbmRzW2lfbGF5ZXJzXVtpX2xlZ2VuZHNfbWF4LTFdWzNdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvL2plxZtsaSBkYW55IGtyYWogdyBleGNlbHUgbWEgd2FydG/Fm8SHIG51bGwgZG9tecWbbG5pZSBvdHJ6eW11amUga29sb3IgYmlhxYJ5XG5cdFx0XHRcdFx0XHRcdGlmKHZhbHVlID09IG51bGwpe1xuXHRcdFx0XHRcdFx0XHRcdGxheWVycy5jYXRlZ29yeV9jb2xvcnNbaV9sYXllcnNdW2lfY2F0ZWdvcnldID0gJyNmZmYnO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvL3cgcHJ6eXBhZGt1IGdkeSBkYW55IGtyYWogbmllIHd5c3TEmXB1amUgdyBwbGlrdSBleGNlbCBvdHJ6eW11amUga29sb3IgYmlhxYJ5XG5cdFx0XHRcdFx0aWYoIWZpbmQpe1xuXHRcdFx0XHRcdFx0bGF5ZXJzLmNhdGVnb3J5X2NvbG9yc1tpX2xheWVyc11baV9jYXRlZ29yeV0gPSAnI2ZmZic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vcG8gemFrdHVhbGl6b3dhbml1IGtvbG9yw7N3IHcga2F0ZWdvcmlhY2ggcnlzdWplbXkgbmEgbm93byBjYW52YXNcblx0XHRjYW52YXMuZHJhdygpO1xuXG5cdH0sXG5cblx0cmVtb3ZlIDogZnVuY3Rpb24oaWQpe1xuXHRcdHZhciB0aCA9IHRoaXM7XG5cblx0XHQkLmVhY2godGhpcy5jYXRlZ29yeSxmdW5jdGlvbihpbmRleCx2YWx1ZSl7XG5cdFx0XHRpZihpbmRleCA+PSBpZCl7XG5cdFx0XHRcdHRoLmNhdGVnb3J5W2luZGV4XSA9IHRoLmNhdGVnb3J5W2luZGV4KzFdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Zm9yKHZhciByb3cgPSAwOyByb3cgPCBwb2ludGVycy5wb2ludGVycy5sZW5ndGg7IHJvdysrKXtcblx0XHRcdGZvcih2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgcG9pbnRlcnMucG9pbnRlcnNbcm93XS5sZW5ndGg7IGNvbHVtbisrKXtcblxuXHRcdFx0XHRpZihwb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0gPT0gaWQpe1xuXHRcdFx0XHRcdHBvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihwb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0gPiBpZCl7XG5cdFx0XHRcdFx0cG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dID0gcGFyc2VJbnQocG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dKSAtIDE7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuY2F0ZWdvcnkucG9wKCk7XG5cdFx0dGhpcy5zaG93X2xpc3QoKTtcblx0XHRcblx0XHQvL3J5c3VqZW15IG5hIG5vd8SFIGNhbnZhc1xuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH0sXG5cblx0c2hvd19saXN0IDogZnVuY3Rpb24oKXtcblxuXHRcdHZhciBhZGRfY2F0ZWdvcnkgPSBcIjx0YWJsZT5cIjtcblxuXHRcdGZvcih2YXIgaSA9IDEsIGlfbWF4ID0gdGhpcy5jYXRlZ29yeS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdGFkZF9jYXRlZ29yeSArPSAnPHRyPjx0ZD48c3Bhbj4nKyhpKSsnPC9zcGFuPjwvdGQ+PHRkPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXRlZ29yeV9uYW1lXCIgaWRfY2F0ZWdvcnk9XCInKyhpKSsnXCIgdmFsdWU9XCInK3RoaXMuY2F0ZWdvcnlbKGkpXVswXSsnXCIgLz48L3RkPjwvdHI+Jztcblx0XHR9XG5cblx0XHRhZGRfY2F0ZWdvcnkgKz0gXCI8L3RhYmxlPlwiO1xuXHRcdCQoJyNwYWxldHNfYm94ICNhcmVhID4gZGl2JykuaHRtbChhZGRfY2F0ZWdvcnkpO1xuXHRcdFxuXHR9XG59XG4iLCIvLyDilZTilZDilZfilaYgIOKVlOKVkOKVl+KVpiDilabilZTilabilZdcbi8vIOKVkSAg4pWRICDilZEg4pWR4pWRIOKVkSDilZHilZFcbi8vIOKVmuKVkOKVneKVqeKVkOKVneKVmuKVkOKVneKVmuKVkOKVneKVkOKVqeKVnVxuXG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb3VzZSc7XG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcbmltcG9ydCBvbl9jYXRlZ29yeSBmcm9tICcuL29uX2NhdGVnb3J5JztcbmltcG9ydCBleGNlbCBmcm9tICcuL2V4Y2VsJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdHNldF90ZXh0YXJlYSA6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnI2Nsb3VkIC5jbG91ZF90ZXh0JykudmFsKCBsYXllcnMuY2xvdWRbbGF5ZXJzLmFjdGl2ZV0gKTtcblx0fSxcblxuXHQvL3VzdGF3aWFteSBwb3ByYXduxIUgcG96eWNqxJkgZHlta2Fcblx0c2V0X3Bvc2l0aW9uIDogZnVuY3Rpb24oKXtcblx0XHR2YXIgbGVmdCA9IG1vdXNlLmxlZnQgLSBvbl9jYXRlZ29yeS5jYW52YXNfb2Zmc2V0X2xlZnQ7XG5cdFx0dmFyIHRvcCA9IG1vdXNlLnRvcCAtIG9uX2NhdGVnb3J5LmNhbnZhc19vZmZzZXRfdG9wO1xuXG5cdFx0JChcIiNjYW52YXNfY2xvdWRcIikuY3NzKHt0b3A6cGFyc2VJbnQodG9wIC0gJChcIiNjYW52YXNfY2xvdWRcIikuaGVpZ2h0KCktMzApKydweCcsbGVmdDpsZWZ0KydweCd9KTtcblx0fSxcblxuXHQvL2Z1bmtjamEgb2Rwb3dpZWR6aWFsbmEgemEgd3nFm3dpZXRsZW5pZSBkeW1rYSB6IG9kcG93aWVkbmnEhSB6YXdhcnRvxZtjacSFXG5cdHVwZGF0ZV90ZXh0IDogZnVuY3Rpb24oKXtcblxuXHRcdHZhciBsX2V4Y2VsID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uZXhjZWw7XG5cdFx0XG5cdFx0aWYoKG9uX2NhdGVnb3J5Lm5hbWUgIT0gXCJcIikgJiYgKG9uX2NhdGVnb3J5Lm5hbWUgIT0gJ251bGwnKSl7XG5cblx0XHRcdHZhciB0bXBfcm93ID0gbnVsbDtcblx0XHRcdHZhciBmaW5kID0gMDtcblx0XHRcdGZvcih2YXIgaV9yb3cgPSAwLCBpX3Jvd19tYXggPSBsX2V4Y2VsLmRhdGEubGVuZ3RoOyBpX3JvdyA8IGlfcm93X21heDsgaV9yb3crKyApe1xuXHRcdFx0XHRpZihTdHJpbmcob25fY2F0ZWdvcnkubmFtZSkudG9Mb3dlckNhc2UoKSA9PSBTdHJpbmcobF9leGNlbC5kYXRhW2lfcm93XVtsYXllcnMuY2F0ZWdvcnlbbGF5ZXJzLmFjdGl2ZV1dKS50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLnNldF9wb3NpdGlvbigpO1xuXHRcdFx0XHRcdHZhciB0ZXh0X3RtcCA9IGxheWVycy5jbG91ZFtsYXllcnMuYWN0aXZlXTtcblxuXHRcdFx0XHRcdGZvcih2YXIgaSA9IDAsIGlfbWF4ID0gbF9leGNlbC5kYXRhWzBdLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspe1xuXHRcdFx0XHRcdFx0dGV4dF90bXAgPSB0ZXh0X3RtcC5yZXBsYWNlKCd7JytsX2V4Y2VsLmRhdGFbMF1baV0rJ30nLGxfZXhjZWwuZGF0YVtpX3Jvd11baV0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vZG9waWVybyBqZcWbbGkgZHltZWsgbWEgbWllxIcgamFrYcWbIGtvbmtyZXRuxIUgemF3YXJ0b8WbxIcgd3nFm3dpZXRsYW15IGdvXG5cdFx0XHRcdFx0aWYodGV4dF90bXAhPVwiXCIpe1xuXHRcdFx0XHRcdFx0JChcIiNjYW52YXNfY2xvdWRcIikuZmFkZUluKDApO1xuXHRcdFx0XHRcdFx0JChcIiNjYW52YXNfY2xvdWRcIikuaHRtbCh0ZXh0X3RtcCk7XG5cdFx0XHRcdFx0XHRmaW5kID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly9qZcWbbGkgbmllIHpuYWxlemlvbm8gb2Rwb3dpZWRuaWVqIGthdGVnb3JpaVxuXHRcdFx0aWYgKCFmaW5kKSB7IFxuXHRcdFx0XHQkKFwiI2NhbnZhc19jbG91ZFwiKS5mYWRlT3V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHQkKFwiI2NhbnZhc19jbG91ZFwiKS5mYWRlT3V0KDApO1xuXHRcdH1cblx0fVxuXG59XG4iLCIvLyDilZTilZDilZfilZTilZDilZfilaYgIOKVlOKVkOKVl+KVpuKVkOKVl+KVlOKVkOKVl+KVpuKVlOKVkOKVl+KVpuKVlOKVkOKVlOKVkOKVl+KVpuKVkOKVl1xuLy8g4pWRICDilZEg4pWR4pWRICDilZEg4pWR4pWg4pWm4pWd4pWg4pWQ4pWd4pWR4pWRICDilaDilanilZfilZHilaMg4pWg4pWm4pWdXG4vLyDilZrilZDilZ3ilZrilZDilZ3ilanilZDilZ3ilZrilZDilZ3ilanilZrilZDilakgIOKVqeKVmuKVkOKVneKVqSDilanilZrilZDilZ3ilanilZrilZBcblxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgcGFsZXRzIGZyb20gJy4vcGFsZXRzJztcbmltcG9ydCBjYXRlZ29yaWVzIGZyb20gJy4vY2F0ZWdvcmllcyc7XG5pbXBvcnQgcG9pbnRlcnMgZnJvbSAnLi9wb2ludGVycyc7XG5cbi8vc2FtYSBuYXp3YSB3aWVsZSB0xYJ1bWFjenkgcG8gcHJvc3R1IGNvbG9ycGlja2VyXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0cm93IDogbnVsbCxcblx0Y29sX251bSA6IG51bGwsXG5cblx0YWRkIDogZnVuY3Rpb24oKXtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0XHQkKCcuY29sb3JwaWNrZXJfYm94JykuQ29sb3JQaWNrZXIoe1xuXG5cdFx0XHRjb2xvcjogJyNmZjAwMDAnLFxuXHRcdFx0XG5cdFx0XHRvblNob3c6IGZ1bmN0aW9uIChjb2xwa3IpIHtcblx0XHRcdFx0aWYoJChjb2xwa3IpLmNzcygnZGlzcGxheScpPT0nbm9uZScpe1xuXHRcdFx0XHRcdCQoY29scGtyKS5mYWRlSW4oMjAwKTtcblx0XHRcdFx0XHR0aGF0LnJvdyA9ICQodGhpcykuYXR0cigncm93Jyk7XG5cdFx0XHRcdFx0dGhhdC5jb2xfbnVtID0gJCh0aGlzKS5hdHRyKCdjb2xfbnVtJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0b25IaWRlOiBmdW5jdGlvbiAoY29scGtyKSB7XG5cdFx0XHRcdCQoY29scGtyKS5mYWRlT3V0KDIwMCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbiAoaHNiLCBoZXgsIHJnYikge1xuXHRcdFx0XHQkKCcjbGVnZW5kcyB0ciB0ZFtyb3c9XCInK3RoYXQucm93KydcIl0nKS5jc3MoJ2JhY2tncm91bmRDb2xvcicsICcjJyArIGhleCk7XG5cdFx0XHRcdFxuIFx0XHRcdFx0XHRwYWxldHMuY29sb3JfYXJyWyBwYWxldHMuY29sb3JfYXJyLmxlbmd0aC0xIF0gPSBwYWxldHMuY29sb3JfYXJyWyBsYXllcnMucGFsZXRzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXSBdLnNsaWNlKClcblx0XHRcdFx0XHRwYWxldHMuY29sb3JfYXJyWyBwYWxldHMuY29sb3JfYXJyLmxlbmd0aC0xIF1bdGhhdC5jb2xfbnVtXSA9ICcjJyArIGhleDtcblx0XHRcdFx0XHQvL2xheWVycy5wYWxldHNfYWN0aXZlW2xheWVycy5hY3RpdmVdID0gbGF5ZXJzLnBhbGV0c19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsYXllcnMucGFsZXRzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXSA9IHBhbGV0cy5jb2xvcl9hcnIubGVuZ3RoIC0xO1xuXHRcdFx0XHRcdGxheWVycy5jb2xvcnNfYWN0aXZlW2xheWVycy5hY3RpdmVdW3RoYXQucm93XSA9ICAnIycgKyBoZXg7XG5cdFx0XHRcdFx0bGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1bdGhhdC5yb3ddWzNdID0gICcjJyArIGhleDtcblxuXHRcdFx0XHRcdHBhbGV0cy5zaG93KCk7XG4gICAgICBcdFx0Y2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRjb2xvcl9ib3JkZXIgOiBmdW5jdGlvbigpe1xuXHRcdCQoJy5jb2xvcl9ib3JkZXInKS5Db2xvclBpY2tlcih7XG5cblx0XHRvbkJlZm9yZVNob3c6IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykuQ29sb3JQaWNrZXJTZXRDb2xvcihwb2ludGVycy5jb2xvcl9ib3JkZXIpO1xuXHRcdH0sXG5cdFx0XHRcdFxuXHRcdFx0b25TaG93OiBmdW5jdGlvbiAoY29scGtyKSB7XG5cdFx0XHRcdGlmKCQoY29scGtyKS5jc3MoJ2Rpc3BsYXknKT09J25vbmUnKXtcblx0XHRcdFx0XHQkKGNvbHBrcikuZmFkZUluKDIwMCk7XG5cdFx0XHRcdFx0Ly9jb2xvcnBpY2tlci5yb3cgPSAkKHRoaXMpLmF0dHIoJ3JvdycpO1xuXHRcdFx0XHRcdC8vY29sb3JwaWNrZXIuY29sX251bSA9ICQodGhpcykuYXR0cignY29sX251bScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uSGlkZTogZnVuY3Rpb24gKGNvbHBrcikge1xuXHRcdFx0XHQkKGNvbHBrcikuZmFkZU91dCgyMDApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24gKGhzYiwgaGV4LCByZ2IpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHBvaW50ZXJzLmNvbG9yX2JvcmRlciA9ICAnIycgKyBoZXg7XG5cblx0XHRcdFx0JCgnLmNvbG9yX2JvcmRlcicpLmNzcygnYmFja2dyb3VuZENvbG9yJywgJyMnICsgaGV4KTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHBvaW50ZXJzLnNob3dfYm9yZGVyKXtcblx0XHRcdFx0XHRwb2ludGVycy5kcmF3X2JvcmRlcihmYWxzZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG4iLCIvLyDilZTilZDilZfilabilZDilZfilaYg4pWm4pWU4pWm4pWXXG4vLyDilZEgIOKVoOKVpuKVneKVkSDilZEg4pWR4pWRXG4vLyDilZrilZDilZ3ilanilZrilZDilZrilZDilZ3ilZDilanilZ1cblxuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgcG9pbnRlcnNcdGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGNhdGVnb3JpZXMgZnJvbSAnLi9jYXRlZ29yaWVzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IGV4Y2VsIGZyb20gJy4vZXhjZWwnO1xuaW1wb3J0IHBhbGV0cyBmcm9tICcuL3BhbGV0cyc7XG5pbXBvcnQgbGVnZW5kcyBmcm9tICcuL2xlZ2VuZHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuL2xhYmVscyc7XG5pbXBvcnQgbWVudV90b3AgZnJvbSAnLi9tZW51X3RvcCc7XG5cbi8vZnVua2NqYSBvZHBvd2llZHppYWxuYSB6YSB0d29yemVuaWUgemFwaXN5d2FuaWUgaSBha3R1YWxpemFjamUgZGFueWNoIGRvdHljesSFxIdjeWggbWFweVxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdG1hcF9qc29uIDogQXJyYXkoKSwgLy9nxYLDs3duYSB6bWllbm5hIHByemVjaG93dWrEhWNhIHdzenlzdGtpZSBkYW5lXG5cdG1hcF9oYXNoIDpudWxsLFxuXHRsYXllcnMgOiB7fSxcblx0ZXhjZWwgOiBBcnJheSgpLFxuXHRwcm9qZWN0IDoge30sXG5cdHByb2plY3RfaGFzaCA6IG51bGwsIC8vZ8WCw7N3bnkgaGFzaCBkb3R5Y3rEhWN5IG5hc3plZ28gcHJvamVrdHVcblxuXHQvL3BvYmllcmFteSBkYW5lIHogcG9yb2pla3R1IGkgemFwaXN1amVteSBqZSBkbyBqc29uLWFcblx0cGFyc2VfZGF0YSA6IGZ1bmN0aW9uKCl7XG5cblx0XHQvL3BvYmllcmFteSBkYW5lIGRvdHljesSFY2UgbWFweSAoY2FudmFzYSlcblxuXHRcdC8vemVydWplbXkgbmEgbm93byBjYcWCxIUgdGFibGljxJkgcG9pbnRlcsOzd1xuXHRcdHRoaXMubWFwX2pzb24gPSBBcnJheSgpO1xuXG5cdFx0Ly9kYXRhW3hdID0gem1pZW5uZSBwb2RzdGF3b3dlIGRvdHljesSFY2UgbWFweVxuXHRcdHRoaXMubWFwX2pzb25bMF0gPSBBcnJheSgpO1xuXHRcdHRoaXMubWFwX2pzb25bMF1bMF0gPSBjYW52YXMuaGVpZ2h0X2NhbnZhcztcblx0XHR0aGlzLm1hcF9qc29uWzBdWzFdID0gY2FudmFzLndpZHRoX2NhbnZhcztcblx0XHR0aGlzLm1hcF9qc29uWzBdWzJdID0gcG9pbnRlcnMucGFkZGluZ194O1xuXHRcdHRoaXMubWFwX2pzb25bMF1bM10gPSBwb2ludGVycy5wYWRkaW5nX3k7XG5cdFx0dGhpcy5tYXBfanNvblswXVs0XSA9IHBvaW50ZXJzLnRyYW5zbGF0ZV9tb2R1bG87XG5cdFx0dGhpcy5tYXBfanNvblswXVs1XSA9IHBvaW50ZXJzLnNpemU7XG5cdFx0dGhpcy5tYXBfanNvblswXVs2XSA9IHBvaW50ZXJzLm1haW5fa2luZDtcblx0XHR0aGlzLm1hcF9qc29uWzBdWzddID0gY2FudmFzLnRpdGxlX3Byb2plY3Q7XG5cdFx0dGhpcy5tYXBfanNvblswXVs4XSA9IHBvaW50ZXJzLmNvbG9yX2JvcmRlcjtcblx0XHR0aGlzLm1hcF9qc29uWzBdWzldID0gcG9pbnRlcnMuc2hvd19ib3JkZXI7XG5cblx0XHQvLyBkYXRhWzFdID0gdGFibGljYSBwdW5rdMOzdyAocG9pbnRlcnMucG9pbnRlcnMpIFt3aWVyc3pdW2tvbHVtbmFdID0gXCJub25lXCIgfHwgKG51bWVyIGthdGVnb3JpaSlcblx0XHR0aGlzLm1hcF9qc29uWzFdID0gcG9pbnRlcnMucG9pbnRlcnM7XG5cblx0XHQvLyBkYXRhWzJdID0gdGFibGljYSBrYXRlZ29yaWlcblx0XHR0aGlzLm1hcF9qc29uWzJdID0gY2F0ZWdvcmllcy5jYXRlZ29yeTtcblxuXHRcdC8vZGF0YVszXSA9IHRhYmxpY2Egd3pvcmNhICh6ZGrEmWNpYSB3IHRsZSBkbyBvZHJ5c293YW5pYSlcblx0XHR0aGlzLm1hcF9qc29uWzNdID0gQXJyYXkoKTtcblxuXHRcdGlmKGltYWdlLm9iail7XG5cdFx0XHR0aGlzLm1hcF9qc29uWzNdWzBdID0gaW1hZ2Uub2JqLnNyYztcblx0XHRcdHRoaXMubWFwX2pzb25bM11bMV0gPSBpbWFnZS54O1xuXHRcdFx0dGhpcy5tYXBfanNvblszXVsyXSA9IGltYWdlLnk7XG5cdFx0XHR0aGlzLm1hcF9qc29uWzNdWzNdID0gaW1hZ2Uud2lkdGg7XG5cdFx0XHR0aGlzLm1hcF9qc29uWzNdWzRdID0gaW1hZ2UuaGVpZ2h0O1xuXHRcdFx0dGhpcy5tYXBfanNvblszXVs1XSA9IGltYWdlLmFscGhhO1xuXHRcdH1cblxuXHRcdC8vcG9iaWVyYW15IGRhbmUgZG90eWN6xIVjZSBwcm9qZWt0w7N3IChsYXllcnMpXG5cdFx0Ly90d29yenlteSBvYmlla3Qgd2Fyc3R3eSB6YXdpZXJhasSFY3kgd3N6eXN0a2llIGRhbmUgZG90eWN6xIVjZSBwcm9qZWt0dVxuXG5cdFx0dGhpcy5sYXllcnMucGFsZXRzX2FjdGl2ZSA9IGxheWVycy5wYWxldHNfYWN0aXZlO1xuXHRcdHRoaXMubGF5ZXJzLnZhbHVlID0gbGF5ZXJzLnZhbHVlO1xuXHRcdHRoaXMubGF5ZXJzLmNvbG9yc19wb3MgPSBsYXllcnMuY29sb3JzX3Bvcztcblx0XHR0aGlzLmxheWVycy5jb2xvcnNfYWN0aXZlID0gbGF5ZXJzLmNvbG9yc19hY3RpdmU7XG5cdFx0dGhpcy5sYXllcnMubWluX3ZhbHVlID0gbGF5ZXJzLm1pbl92YWx1ZTtcblx0XHR0aGlzLmxheWVycy5tYXhfdmFsdWUgPSBsYXllcnMubWF4X3ZhbHVlO1xuXHRcdHRoaXMubGF5ZXJzLmNsb3VkID0gbGF5ZXJzLmNsb3VkO1xuXHRcdHRoaXMubGF5ZXJzLmNsb3VkX3BhcnNlciA9IGxheWVycy5jbG91ZF9wYXJzZXI7XG5cdFx0dGhpcy5sYXllcnMubGVnZW5kcyA9IGxheWVycy5sZWdlbmRzO1xuXHRcdHRoaXMubGF5ZXJzLmxhYmVscyA9IGxheWVycy5sYWJlbHM7XG5cdFx0dGhpcy5sYXllcnMuY2F0ZWdvcnkgPSBsYXllcnMuY2F0ZWdvcnk7XG5cdFx0dGhpcy5sYXllcnMuY2F0ZWdvcnlfY29sb3JzID0gbGF5ZXJzLmNhdGVnb3J5X2NvbG9ycztcblx0XHR0aGlzLmxheWVycy5jYXRlZ29yeV9uYW1lID0gbGF5ZXJzLmNhdGVnb3J5X25hbWU7XG5cdFx0dGhpcy5sYXllcnMubGlzdCA9IGxheWVycy5saXN0O1xuXG5cdFx0Ly96bWllbm5lIGdsb2JhbG5lIGRvdHljesSFY2UgY2HFgmVnbyBwcm9qZWt0dVxuXHRcdHRoaXMucHJvamVjdC5uYW1lID0gbGF5ZXJzLnByb2plY3RfbmFtZTtcblx0XHR0aGlzLnByb2plY3Quc291cmNlID0gbGF5ZXJzLnNvdXJjZTtcblxuXHRcdC8vdHdvcnp5bXkgb2JpZWt0IGV4Y2VsYVxuXHRcdHRoaXMuZXhjZWwgPSBleGNlbC5kYXRhO1xuXG5cblx0fSxcblxuXHRwdWJsaXNoIDogZnVuY3Rpb24oZXZlbnQpe1xuXHRcdGlmKHRoaXMucHJvamVjdF9oYXNoICE9IG51bGwpe1xuXHRcdFx0aWYgKCFldmVudCkge2V2ZW50ID0gd2luZG93LmV2ZW50O30gLy/FgmF0YSBkbGEgbW96aWxsaVxuXHRcdFx0aWYoICgkKCcucHVibGlzaCAuZW1iZWQnKS5jc3MoJ2Rpc3BsYXknKSA9PSAnYmxvY2snKSAmJiAoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKCdwdWJsaXNoJykpICl7XG5cdFx0XHRcdCQoJy5wdWJsaXNoIC5lbWJlZCcpLmZhZGVPdXQoNTAwKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdCQoJy5wdWJsaXNoIC5lbWJlZCcpLmh0bWwoJzxpZnJhbWUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiJytjYW52YXMuaGVpZ2h0X2NhbnZhcysncHhcIiBib3JkZXI9XCIwXCIgZnJhbWVib3JkZXI9XCIwXCIgYm9yZGVyPVwiMFwiIGFsbG93dHJhbnNwYXJlbmN5PVwidHJ1ZVwiIHZzcGFjZT1cIjBcIiBoc3BhY2U9XCIwXCIgc3JjPVwiaHR0cDovLycrbG9jYXRpb24uaHJlZi5zcGxpdCggJy8nIClbMl0rJy9lbWJlZC8nK3RoaXMucHJvamVjdF9oYXNoKydcIj48L2lmcmFtZT4nKTtcblx0XHRcdFx0Ly8kKCcjaWZyYW1lJykuaHRtbCgnPGlmcmFtZSAgb25sb2FkPVwidGhpcy5wdWJsaXNoX2dldFNpemUodGhpcylcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCInK2NhbnZhcy5oZWlnaHRfY2FudmFzKydweFwiIGJvcmRlcj1cIjBcIiBmcmFtZWJvcmRlcj1cIjBcIiBib3JkZXI9XCIwXCIgYWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCIgdnNwYWNlPVwiMFwiIGhzcGFjZT1cIjBcIiBzcmM9XCJodHRwOi8vJytsb2NhdGlvbi5ocmVmLnNwbGl0KCAnLycgKVsyXSsnL2VtYmVkLycrdGhpcy5wcm9qZWN0X2hhc2grJ1wiPjwvaWZyYW1lPicpO1xuXG5cdFx0XHRcdCQoJy5wdWJsaXNoIC5lbWJlZCcpLmZhZGVJbig1MDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0YWxlcnQoJ25hanBpZXJ3IHphcGlzeiBwcm9qZWt0IGEgbmFzdMSZcG5pZSBnbyBwdWJsaWt1aicpO1xuXHRcdH1cblx0fSxcblxuXHRwdWJsaXNoX2dldFNpemUgOiBmdW5jdGlvbihvYmope1xuXHRcdGNvbnNvbGUubG9nKG9iai5jb250ZW50V2luZG93LmRvY3VtZW50LmJvZHkpO1xuXHRcdGNvbnNvbGUubG9nKCQob2JqLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkgLCQob2JqLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSkud2lkdGgoKSk7XG4gICAgLy9vYmouc3R5bGUuaGVpZ2h0ID0gb2JqLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgKyAncHgnO1xuXHR9LFxuXG5cblx0Ly93Y3p5dGFuaWUgem1pZW5ueWNoIGRvIG9iaWVrdMOzdyBtYXB5XG5cblx0c2V0X21hcCA6IGZ1bmN0aW9uKGRhdGEpe1xuXG5cblx0XHQvL3BvIHphcGlzYW5pdSBkYW55Y2ggZG8gYmF6eSBha3R1YWxpenVqZW15IGlkICh3IHByenlwYWRrdSBqZcWbbGkgaXN0bmllamUgbmFkcGlzdWplbXkgamUpXG5cdFx0dGhpcy5tYXBfanNvbiA9IGRhdGE7XG5cblx0XHQvL3BvYmllcmFteSBpIHdjenl0dWplbXkgZGFuZSBvIGNhbnZhc2llIGRvIG9iaWVrdHVcblx0XHRjYW52YXMuaGVpZ2h0X2NhbnZhcyA9IHBhcnNlSW50KGRhdGFbMF1bMF0pO1xuXHRcdGNhbnZhcy53aWR0aF9jYW52YXMgPSBwYXJzZUludChkYXRhWzBdWzFdKTtcblx0XHRwb2ludGVycy5wYWRkaW5nX3ggPSBkYXRhWzBdWzJdO1xuXHRcdHBvaW50ZXJzLnBhZGRpbmdfeSA9IGRhdGFbMF1bM107XG5cdFx0cG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbyA9IGRhdGFbMF1bNF07XG5cdFx0cG9pbnRlcnMuc2l6ZSA9IGRhdGFbMF1bNV07XG5cdFx0cG9pbnRlcnMubWFpbl9raW5kID0gZGF0YVswXVs2XTtcblx0XHRjYW52YXMudGl0bGVfcHJvamVjdCA9IGRhdGFbMF1bN107XG5cdFx0XHRcblx0XHRpZih0eXBlb2YgZGF0YVswXVs4XSA9PSAndW5kZWZpbmVkJyl7XG5cdFx0XHRwb2ludGVycy5jb2xvcl9ib3JkZXIgPSBcIiMwMDBcIjtcblx0XHR9ZWxzZXtcblx0XHRcdHBvaW50ZXJzLmNvbG9yX2JvcmRlciA9IGRhdGFbMF1bOF07XG5cdFx0fVxuXG5cdFx0aWYodHlwZW9mIGRhdGFbMF1bOV0gPT0gJ3VuZGVmaW5lZCcpe1xuXHRcdFx0cG9pbnRlcnMuc2hvd19ib3JkZXIgPSBmYWxzZTtcblx0XHR9ZWxzZXtcblx0XHRcdHBvaW50ZXJzLnNob3dfYm9yZGVyID0gZGF0YVswXVs5XTtcblx0XHR9XG4gXHRcdFxuIFx0XHQkKCcjd2lkdGhfY2FudmFzJykudmFsKGNhbnZhcy53aWR0aF9jYW52YXMrJ3B4Jyk7XG5cdFx0JCgnI2hlaWdodF9jYW52YXMnKS52YWwoY2FudmFzLmhlaWdodF9jYW52YXMrJ3B4Jyk7XG5cbiBcdFx0JCgnI3BvaW50ZXJfYm94IC5jb2xvcl9ib3JkZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLHBvaW50ZXJzLmNvbG9yX2JvcmRlcik7XG5cblx0XHQkKCcjcG9pbnRlcl9ib3ggaW5wdXRbbmFtZT1cInBhZGRpbmdfeFwiXScpLnZhbCggZGF0YVswXVsyXSApO1xuXHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwicGFkZGluZ195XCJdJykudmFsKCBkYXRhWzBdWzNdICk7XG5cdFx0JCgnI3BvaW50ZXJfYm94IGlucHV0W25hbWU9XCJzaXplXCJdJykudmFsKCBkYXRhWzBdWzVdICk7XG5cdFx0JCgnaW5wdXRbbmFtZT1cInRpdGxlX3Byb2plY3RcIl0nKS52YWwoIGRhdGFbMF1bN10gKTtcblxuXHRcdGlmKCBkYXRhWzBdWzRdICl7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggZGl2W25hbWU9XCJ0cmFuc2xhdGVfbW9kdWxvXCJdJykucmVtb3ZlQ2xhc3MoJ3N3aXRjaC1vZmYnKTtcblx0XHRcdCQoJyNwb2ludGVyX2JveCBkaXZbbmFtZT1cInRyYW5zbGF0ZV9tb2R1bG9cIl0nKS5hZGRDbGFzcygnc3dpdGNoLW9uJyk7XG5cdFx0fVxuXG5cdFx0aWYoIHBvaW50ZXJzLnNob3dfYm9yZGVyICl7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggZGl2W25hbWU9XCJzaG93X2JvcmRlclwiXScpLnJlbW92ZUNsYXNzKCdzd2l0Y2gtb2ZmJyk7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggZGl2W25hbWU9XCJzaG93X2JvcmRlclwiXScpLmFkZENsYXNzKCdzd2l0Y2gtb24nKTtcblx0XHR9XG5cblx0XHQkKCcjcG9pbnRlcl9ib3ggc2VsZWN0W25hbWU9XCJtYWluX2tpbmRcIl0nKS5odG1sKCcnKTtcblxuXHRcdHBvaW50ZXJzLmtpbmRzLmZvckVhY2goZnVuY3Rpb24oa2luZCl7XG5cblx0XHRcdGlmKGtpbmQgPT0gZGF0YVswXVs2XSl7XG5cdFx0XHRcdCQoJyNwb2ludGVyX2JveCBzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmFwcGVuZCgnPG9wdGlvbiBzZWxlY3RlZD1cInNlbGVjdGVkXCIgbmFtZT1cIicra2luZCsnXCI+JytraW5kKyc8L29wdGlvbj4nKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdCQoJyNwb2ludGVyX2JveCBzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmFwcGVuZCgnPG9wdGlvbiBuYW1lPVwiJytraW5kKydcIj4nK2tpbmQrJzwvb3B0aW9uPicpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHQvL3BvYmllcmFteSBkYW5lIG8gcG9pbnRlcmFjaFxuXHRcdHBvaW50ZXJzLnBvaW50ZXJzID0gZGF0YVsxXTtcblxuXHRcdC8vcG9iaWVyYW15IGRhbmUgbyBrYXRlZ29yaWFjaFxuXHRcdGNhdGVnb3JpZXMuY2F0ZWdvcnkgPSBkYXRhWzJdO1xuXG5cblx0XHQvL3BvIHdjenl0YW5pdSBtYXB5IGFrdHlhbGl6dWplbXkgZGFuZSBkb3R5Y3rEhWPEhSBrYXRlZ29yaWkgaSBrb2xvcsOzd1xuXHRcdGxheWVycy5jYXRlZ29yeV9jb2xvcnNbMF0gPSBbXTtcblx0XHRsYXllcnMuY2F0ZWdvcnlfbmFtZSA9IFtdO1xuXG5cdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBjYXRlZ29yaWVzLmNhdGVnb3J5Lmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspe1xuXHRcdFx0Y29uc29sZS5sb2coIGNhdGVnb3JpZXMuY2F0ZWdvcnlbaV1bMF0gKTtcblx0XHRcdGxheWVycy5jYXRlZ29yeV9uYW1lLnB1c2goY2F0ZWdvcmllcy5jYXRlZ29yeVtpXVswXSk7XG5cdFx0XHRsYXllcnMuY2F0ZWdvcnlfY29sb3JzWzBdLnB1c2goY2F0ZWdvcmllcy5jYXRlZ29yeVtpXVsxXSk7XG5cdFx0fVxuXG5cdDgvKlx0dmFyIGh0bWwgPSBcIjx1bD5cIjtcblx0XHRcblx0XHQvL2RvZGFqZW15IGxpc3TEmSBrYXRlZ29yaWlcblx0XHRmb3IodmFyIGkgPSAxLCBpX21heCA9IGNhdGVnb3JpZXMuY2F0ZWdvcnkubGVuZ3RoOyBpIDwgaV9tYXg7IGkrKyl7XG5cdFx0XHRodG1sICs9ICc8bGk+PGlucHV0IG5hbWU9XCJjYXRlZ3JveV9uYW1lXCIgaWRfY2F0ZWdvcnk9XCInK2krJ1wiIHZhbHVlPVwiJytjYXRlZ29yaWVzLmNhdGVnb3J5W2ldWzBdKydcIiAvPjwvbGk+Jztcblx0XHR9XG5cblx0XHRodG1sICs9IFwiPC91bD5cIjtcblxuXHRcdCQoJyNhcmVhID4gZGl2JykuaHRtbChodG1sKTtcbiovXG5cdFx0Ly9wb2JpZXJhbmllIGRhbnljaCBvIHpkasSZY2l1IGplxbxlbGkgaXN0bmllamVcblx0XHRpZiggZGF0YVszXS5sZW5ndGggPiAyKXtcblx0XHRcdGltYWdlLm9iaiA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0aW1hZ2Uub2JqLnNyYyA9IGRhdGFbM11bMF07XG5cdFx0XHRpbWFnZS54ID0gcGFyc2VJbnQoIGRhdGFbM11bMV0gKTtcblx0XHRcdGltYWdlLnkgPSBwYXJzZUludCggZGF0YVszXVsyXSApO1xuXHRcdFx0aW1hZ2Uud2lkdGggPSBwYXJzZUludCggZGF0YVszXVszXSApO1xuXHRcdFx0aW1hZ2UuaGVpZ2h0ID0gcGFyc2VJbnQoIGRhdGFbM11bNF0gKTtcblx0XHRcdGltYWdlLmFscGhhID0gcGFyc2VJbnQoIGRhdGFbM11bNV0gKTtcblxuXHRcdFx0Ly96YXpuYWN6ZW5pZSBvZHBvd2llZG5pZWdvIHNlbGVjdGEgYWxwaGEgdyBtZW51IHRvcFxuXHRcdFx0JCgnI2FscGhhX2ltYWdlIG9wdGlvbltuYW1lPVwiJytcdGltYWdlLmFscGhhICsnXCJdJykuYXR0cignc2VsZWN0ZWQnLHRydWUpO1xuXG5cdFx0XHRpbWFnZS5vYmoub25sb2FkID0gZnVuY3Rpb24oKSB7IGNhbnZhcy5kcmF3KCk7IH07XG5cdFx0fVxuXG5cdFx0Ly96YWt0dWFsaXpvd2FuaWUgZGFueWNoIHcgaW5wdXRhY2hcblx0XHQkKCcjbWFpbl9jYW52YXMnKS5hdHRyKCd3aWR0aCcsIGNhbnZhcy53aWR0aF9jYW52YXMrJ3B4Jyk7XG5cdFx0JCgnI21haW5fY2FudmFzJykuYXR0cignaGVpZ2h0JywgY2FudmFzLmhlaWdodF9jYW52YXMrJ3B4Jyk7XG5cdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzpjYW52YXMud2lkdGhfY2FudmFzKydweCcsJ2hlaWdodCc6Y2FudmFzLmhlaWdodF9jYW52YXMrJ3B4J30pO1xuXG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRjYXRlZ29yaWVzLnNob3dfbGlzdCgpO1xuXG5cdH0sXG5cblx0c2V0X3Byb2plY3QgOiBmdW5jdGlvbihkYXRhKXtcblxuXHRcdC8vd2N6eXR1amVteSBkYW5lIGRvdHljesSFY2UgbWFweVxuXHRcdHRoaXMuc2V0X21hcCggSlNPTi5wYXJzZShkYXRhLm1hcF9qc29uKSApO1xuXHRcdFxuXHRcdGV4Y2VsLmRhdGEgPSBKU09OLnBhcnNlKGRhdGEuZXhjZWwpO1xuXG5cdFx0ZGF0YS5wcm9qZWN0ID0gSlNPTi5wYXJzZShkYXRhLnByb2plY3QpOyAgXG5cdFx0ZGF0YS5sYXllcnMgPSBKU09OLnBhcnNlKGRhdGEubGF5ZXJzKTsgXG5cblx0XHQvL3djenl0dWplbXkgZGFuZSBkb3R5Y3rEhWNlIHByb2pla3R1XG5cdFx0bGF5ZXJzLnBhbGV0c19hY3RpdmUgPSBkYXRhLmxheWVycy5wYWxldHNfYWN0aXZlO1xuXHRcdGxheWVycy52YWx1ZSA9IGRhdGEubGF5ZXJzLnZhbHVlO1xuXHRcdGxheWVycy5jb2xvcnNfcG9zID0gZGF0YS5sYXllcnMuY29sb3JzX3Bvcztcblx0XHRsYXllcnMuY29sb3JzX2FjdGl2ZSA9IGRhdGEubGF5ZXJzLmNvbG9yc19hY3RpdmU7XG5cdFx0bGF5ZXJzLm1pbl92YWx1ZSA9IGRhdGEubGF5ZXJzLm1pbl92YWx1ZTtcblx0XHRsYXllcnMubWF4X3ZhbHVlID0gZGF0YS5sYXllcnMubWF4X3ZhbHVlO1xuXHRcdGxheWVycy5jbG91ZCA9IGRhdGEubGF5ZXJzLmNsb3VkO1xuXHRcdGxheWVycy5jbG91ZF9wYXJzZXIgPSBkYXRhLmxheWVycy5jbG91ZF9wYXJzZXI7XG5cdFx0bGF5ZXJzLmxlZ2VuZHMgPSBkYXRhLmxheWVycy5sZWdlbmRzO1xuXHRcdGxheWVycy5sYWJlbHMgPSBkYXRhLmxheWVycy5sYWJlbHM7XG5cdCBcdGxheWVycy5jYXRlZ29yeSA9IFx0ZGF0YS5sYXllcnMuY2F0ZWdvcnk7XG5cdFx0bGF5ZXJzLmNhdGVnb3J5X2NvbG9ycyA9IGRhdGEubGF5ZXJzLmNhdGVnb3J5X2NvbG9ycztcblx0XHRsYXllcnMuY2F0ZWdvcnlfbmFtZSA9IGRhdGEubGF5ZXJzLmNhdGVnb3J5X25hbWU7XG5cdFx0bGF5ZXJzLmxpc3QgPSBkYXRhLmxheWVycy5saXN0O1xuXG5cblxuXHRcdC8vem1pZW5uZSBnbG9iYWxuZSBkb3R5Y3rEhWNlIGNhxYJlZ28gcHJvamVrdHVcblx0XHRsYXllcnMucHJvamVjdF9uYW1lID0gZGF0YS5wcm9qZWN0Lm5hbWU7XG5cdFx0bGF5ZXJzLnNvdXJjZSA9IGRhdGEucHJvamVjdC5zb3VyY2U7XG5cblx0XHQkKCdpbnB1dFtuYW1lPVwicHJvamVjdF9uYW1lXCJdJykudmFsKGxheWVycy5wcm9qZWN0X25hbWUpO1xuXG5cdFx0dGlueU1DRS5lZGl0b3JzWzBdLnNldENvbnRlbnQoIGxheWVycy5jbG91ZFtsYXllcnMuYWN0aXZlXSApO1xuXHRcdHRpbnlNQ0UuZWRpdG9yc1sxXS5zZXRDb250ZW50KCBsYXllcnMuc291cmNlICk7XG5cblx0XHRleGNlbC5zaG93KCk7XG5cdFx0cGFsZXRzLnNob3coKTtcblx0XHRsZWdlbmRzLnNob3coKTtcblx0XHRsYXllcnMuc2hvdygpO1xuXHRcdGxhYmVscy5zaG93KCk7XG5cblx0fSxcblxuXHQvL3BvYnJhbmllIG1hcHkgeiBiYXp5IGRhbnljaCBpIHByemVrYXp1amVteSBkbyB3Y3p5dGFuaWEgZG8gb2JpZWt0w7N3IG1hcHlcblx0Z2V0X21hcCA6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHRoID0gdGhpcztcblx0XHQkLmFqYXgoe1xuXHRcdFx0ICB1cmw6ICcvYXBpL21hcC8nICsgdGgubWFwX2hhc2gsXG5cdFx0ICBcdHR5cGU6IFwiR0VUXCIsXG5cdFx0ICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHsgdGguc2V0X21hcCggSlNPTi5wYXJzZShkYXRhLmRhdGFbMF0ubWFwX2pzb24pICk7IH0pO1xuXHR9LFxuXG5cdC8vcG9iaWVyYW5pZSBwcm9qZWt0dSB6IGJhenkgZGFueWNoIGkgd2N6eXRhbmllXG5cdGdldF9wcm9qZWN0IDogZnVuY3Rpb24oKXtcblx0XHRcblx0XHR2YXIgdGggPSB0aGlzO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0ICB1cmw6ICcvYXBpL3Byb2plY3QvJyArIHRoLnByb2plY3RfaGFzaCxcblx0XHRcdCAgXHR0eXBlOiBcIkdFVFwiLFxuXHRcdFx0ICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkgeyBcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEuZGF0YSk7XG5cdFx0XHRcdFx0aWYoZGF0YS5zdGF0dXMgPT0gJ29rJyl7XG5cdFx0XHRcdFx0XHR0aC5zZXRfcHJvamVjdCggZGF0YS5kYXRhICk7IFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0YWxlcnQoJ25pZSB1ZGHFgm8gc2nEmSB3Y3p5dGHEhyBwcm9qZWt0dScpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cblx0Ly90d29yenlteSBub3d5IHByb2pla3Rcblx0Y3JlYXRlX3Byb2plY3QgOiBmdW5jdGlvbigpe1xuXG5cdFx0Ly9ha3R1YWxpenVqZW15IGpzb25hIGRvIHd5c8WCYW5pYSBhamF4ZW1cblx0XHR0aGlzLnBhcnNlX2RhdGEoKTtcblx0XHR2YXIgdGggPSB0aGlzOyAvL3ptaWVubmEgcG9tb2NuaWN6YVxuXG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRtYXBfanNvbiA6IEpTT04uc3RyaW5naWZ5KHRoLm1hcF9qc29uKSxcblx0XHRcdG1hcF9oYXNoIDogdGgubWFwX2hhc2gsXG5cdFx0XHRsYXllcnMgOiBKU09OLnN0cmluZ2lmeSh0aC5sYXllcnMpLFxuXHRcdFx0ZXhjZWwgOiBKU09OLnN0cmluZ2lmeSh0aC5leGNlbCksXG5cdFx0XHRwcm9qZWN0IDogSlNPTi5zdHJpbmdpZnkodGgucHJvamVjdClcblx0XHR9XG5cblx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHR1cmw6IFwiYXBpL3Byb2plY3RzXCIsXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT0gJ29rJyl7XG5cdFx0XHRcdFx0YWxlcnQoJ3phcGlzYW5vIG5vd3kgcHJvamVrdCcpO1xuXHRcdFx0XHRcdHRoLnByb2plY3RfaGFzaCA9IHJlc3BvbnNlLnByb2plY3RfaGFzaDtcblx0XHRcdFx0XHRtZW51X3RvcC5nZXRfcHJvamVjdHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGFsZXJ0KCdixYLEhWQgcG9kY3phcyB6YXBpc3UnKTtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0Ly9ha3R1YWxpenVqZW15IGp1xbwgaXN0bmllasSFY3kgcHJvamVrdFxuXHR1cGRhdGVfcHJvamVjdCA6IGZ1bmN0aW9uKCl7IFxuXG5cdFx0Ly9ha3R1YWxpenVqZW15IGpzb25hIGRvIHd5c8WCYW5pYSBhamF4ZW1cblx0XHR0aGlzLnBhcnNlX2RhdGEoKTtcblx0XHR2YXIgdGggPSB0aGlzOyAvL3ptaWVubmEgcG9tb2NuaWN6YVxuXG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRtYXBfanNvbiA6IEpTT04uc3RyaW5naWZ5KHRoLm1hcF9qc29uKSxcblx0XHRcdG1hcF9oYXNoIDogdGgubWFwX2hhc2gsXG5cdFx0XHRwcm9qZWN0X2hhc2ggOiB0aC5wcm9qZWN0X2hhc2gsXG5cdFx0XHRsYXllcnMgOiBKU09OLnN0cmluZ2lmeSh0aC5sYXllcnMpLFxuXHRcdFx0ZXhjZWwgOiBKU09OLnN0cmluZ2lmeSh0aC5leGNlbCksXG5cdFx0XHRwcm9qZWN0IDogSlNPTi5zdHJpbmdpZnkodGgucHJvamVjdClcblx0XHR9XG5cblx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHR1cmw6IFwiYXBpL3Byb2plY3RzXCIsXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0dHlwZTogJ1BVVCcsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAnb2snKXtcblx0XHRcdFx0XHRtZW51X3RvcC5nZXRfcHJvamVjdHMoKTtcblx0XHRcdFx0XHRhbGVydCgnemFrdHVhbGl6b3dhbm8gcHJvamVrdCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0YWxlcnQoJ2LFgsSFZCBwb2RjemFzIGFrdHVhbGl6YWNqaScpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0Ly91c3V3YW15IG1hcMSZIHogYmF6eSBkYW55Y2hcblx0ZGVsZXRlX3Byb2plY3QgOiBmdW5jdGlvbigpe1xuXG5cdFx0dmFyIHRoID0gdGhpczsgLy96bWllbm5hIHBvbW9jbmljemFcblxuXHRcdC8vc3ByYXdkemFteSBjenkgbWFwYSBkbyB1c3VuacSZY2lhIHBvc2lhZGEgc3dvamUgaWRcblx0XHRpZih0aGlzLnByb2plY3RfaGFzaCAhPSBudWxsKXtcdFx0XHRcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6IFwiYXBpL3Byb2plY3QvXCIrdGgucHJvamVjdF9oYXNoLFxuXHRcdFx0XHR0eXBlOiAnREVMRVRFJyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAnb2snKXtcblx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0YWxlcnQoJ2LFgsSFZCBwb2RjemFzIHVzdXdhbmlhJyk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGFsZXJ0KCdicmFrIGlkZW50eWZpa2F0b3JhIHByb2pla3R1Jyk7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyDilZTilZDilZfilZDilZcg4pWm4pWU4pWQ4pWX4pWU4pWQ4pWX4pWmICBcbi8vIOKVkeKVoyDilZTilanilabilZ3ilZEgIOKVkeKVoyDilZEgIFxuLy8g4pWa4pWQ4pWd4pWpIOKVmuKVkOKVmuKVkOKVneKVmuKVkOKVneKVqeKVkOKVnVxuXG5pbXBvcnQgcGFsZXRzIGZyb20gJy4vcGFsZXRzJztcblxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IGNhdGVnb3JpZXMgZnJvbSAnLi9jYXRlZ29yaWVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdGluaXQgOiBmdW5jdGlvbigpe1xuXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdC8vZG9kYW5pZSBldmVudMOzdyBwcnp5IGtsaWtuacSZY2l1IGV4Y2VsYVxuXHRcdCQoJyNleGNlbF9ib3ggYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXsgJCgnI2V4Y2VsX2JveCBpbnB1dCcpLmNsaWNrKCk7IH0pO1xuXHRcdCQoJyNleGNlbF9ib3ggaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKXsgdGhhdC5zZW5kX2ZpbGUoKTsgfSk7XG5cblx0XHQvL2Z1bmtjamEgdHltY3phc293YSBkbyBuYXJ5c293YW5pYSB0YWJlbGtpIGV4Y2VsYVxuXHRcdHRoaXMuc2hvdygpO1xuXHR9LFxuXG5cdC8vZnVua2NqYSBvZHBvd2llZHppYWxhIHphIHBvcHJhd25lIHBvZHBpc2FuaWUgb3NpXG5cdHNob3cgOiBmdW5jdGlvbigpe1xuXHRcdFx0XG5cdFx0dmFyIGxfZXhjZWwgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5leGNlbDtcblxuXHRcdHZhciBhZGRfaHRtbCA9ICcnO1xuXG5cdFx0Ly9qZcWbbGkgaWxvxZtjIHdpZXJzenkgamVzdCB3acSZa3N6YSBha3R1YWxpenVqZW15IHdpZWxrb8WbxIcgdGFibGljeVxuXHRcdGlmKGxfZXhjZWwuZGF0YS5sZW5ndGggPj0gbF9leGNlbC5taW5fcm93KSBsX2V4Y2VsLm1pbl9yb3cgPSBsX2V4Y2VsLmRhdGEubGVuZ3RoO1xuXHRcdGlmKGxfZXhjZWwuZGF0YVswXS5sZW5ndGggPj0gbF9leGNlbC5taW5fY29sKSBsX2V4Y2VsLm1pbl9jb2wgPSBsX2V4Y2VsLmRhdGFbMF0ubGVuZ3RoKzE7XG5cblx0XHQvL3JlbmRlcnVqZW15IGNhxYLEhSB0YWJsaWPEmSBleGNlbFxuXHRcdGZvcih2YXIgaSA9IDA7aSA8IGxfZXhjZWwubWluX3JvdzsgaSsrKXtcblx0XHRcdGFkZF9odG1sICs9ICc8dHIgY2xhc3M9XCJ0clwiPic7XG5cdFx0XHRmb3IodmFyIGogPSAwO2ogPCBsX2V4Y2VsLm1pbl9jb2w7IGorKyl7XG5cdFx0XHRcdGlmKChqID09IDApICYmIChpID4gMCkpe1xuXHRcdFx0XHRcdGFkZF9odG1sICs9ICc8dGQgY2xhc3M9XCJ0ZFwiIHJvdz1cIicgKyBpICsgJ1wiIGNvbD1cIicgKyBqICsgJ1wiID4nKyBpICsnPC90ZD4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdFx0aWYodHlwZW9mKGxfZXhjZWwuZGF0YVtpXVsoai0xKV0pICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0XHRcdFx0XHRhZGRfaHRtbCArPSAnPHRkIGNsYXNzPVwidGRcIiBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiIHJvdz1cIicgKyBpICsgJ1wiIGNvbD1cIicgKyBqICsgJ1wiPicrbF9leGNlbC5kYXRhW2ldWyhqLTEpXSsnPC90ZD4nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0YWRkX2h0bWwgKz0gJzx0ZCBjbGFzcz1cInRkXCIgIHJvdz1cIicgKyBpICsgJ1wiIGNvbD1cIicgKyBqICsgJ1wiPjwvdGQ+Jztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2cobF9leGNlbC5kYXRhW2ldWyhqKzEpXSk7XG5cdFx0XHRcdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coZXJyb3IsaSxqKTtcblx0XHRcdFx0XHRcdGFkZF9odG1sICs9ICc8dGQgY2xhc3M9XCJ0ZFwiIHJvdz1cIicgKyBpICsgJ1wiIGNvbD1cIicgKyBqICsgJ1wiPjwvdGQ+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdFx0YWRkX2h0bWwgKz0gJzwvdHI+Jztcblx0XHR9XG5cblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XG5cdFx0JCgnI2V4Y2VsX2JveCAudGFibGUnKS5odG1sKCBhZGRfaHRtbCApO1xuXG5cdFx0JCgnI2V4Y2VsX2JveCAudGFibGUgLnRkJykuZGJsY2xpY2soZnVuY3Rpb24oKXsgJCh0aGlzKS5hdHRyKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJyk7ICQodGhpcykuc2VsZWN0VGV4dCgpOyB9KTtcblxuXHRcdC8vZG9kYWplbXkgbW/FvGxpd2/Fm8SHIGVkeWNqaSBleGNlbGFcblx0XHQkKCcjZXhjZWxfYm94IC50YWJsZSAudGQnKS5rZXl1cChmdW5jdGlvbigpeyB0aGF0LmVkaXQodGhpcyk7IH0pO1xuXG5cdFx0JCgnI2V4Y2VsX2JveCAudGFibGUgLnRkJykuYmx1cihmdW5jdGlvbigpeyAkKHRoaXMpLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsJ2ZhbHNlJyk7ICBwYWxldHMuc2hvd19zZWxlY3QoKTsgfSk7XG5cblx0fSxcblxuXHQvL2Z1bmtjamEgdW1vxbxsaXdpYWrEhWNhIGVkeWNqZSB6YXdhcnRvxZtjaSBrb23Ds3JraVxuXHRlZGl0IDogZnVuY3Rpb24ob2JqKXtcdFxuXHRcdHZhciBsX2V4Y2VsID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uZXhjZWw7XG5cblx0XHR2YXIgdmFsID0gJChvYmopLmh0bWwoKVxuXHRcdGlmKCQuaXNOdW1lcmljKHZhbCkpIHsgdmFsID0gcGFyc2VGbG9hdCh2YWwpOyB9XG5cdFx0XG5cdFx0bF9leGNlbC5kYXRhWyQob2JqKS5hdHRyKCdyb3cnKV1bKCQob2JqKS5hdHRyKCdjb2wnKS0xKV0gPSB2YWw7XG5cdFx0Y2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcblx0fSxcblxuXHQvL3BvYmllcmFteSBwbGlrLCB6IGlucHV0YSBpIHd5xYJhbXkgZG8gYmFja2VuZHUgdyBjZWx1IHNwYXJzb3dhbmlhIGEgbmFzdMSZcG5pZSBwcnp5cGlzdWplbXkgZG8gdGFibGljeSBpIHd5xZt3aWV0bGFteXcgZm9ybWllIHRhYmVsc2tpXG5cdHNlbmRfZmlsZSA6IGZ1bmN0aW9uKCkge1xuXHRcblx0XHR2YXIgbF9leGNlbCA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmV4Y2VsO1xuXG5cdFx0ZXhjZWxfZm9ybS5hcHBlbmQoXCJleGNlbF9maWxlXCIsICQoXCIjZXhjZWxfYm94IGlucHV0XCIpWzBdLmZpbGVzWzBdKTtcblxuXHRcdHZhciB0aGF0ID0gdGhpcztcblxuIFx0XHQkLmFqYXgoIHtcbiAgICAgIFxuICAgICAgdXJsOiAnL2FwaS9wcm9qZWN0cy9leGNlbF9wYXJzZScsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBleGNlbF9mb3JtLFxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgY29udGVudFR5cGU6IGZhbHNcblxuICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuICAgIFx0XG5cdFx0XHQkKFwiI2V4Y2VsX2JveCBpbnB1dFwiKS5yZW1vdmUoKTtcblx0XHRcdCQoXCIjZXhjZWxfYm94XCIpLmFwcGVuZCgnPGlucHV0IHR5cGU9XCJmaWxlXCIgLz4nKVxuXHRcdFx0JCgnI2V4Y2VsX2JveCBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpeyB0aGF0LnNlbmRfZmlsZSgpOyB9KTtcblxuICAgIFx0Ly9wbyB3Y3p5dGFuaXUgcGxpa3UgZXhjZWwgcHJ6eXBpc3VqZW15IGRhbmUgcnlzdWplbXkgbmEgbm93byB0YWJlbMSZIG9yYXogd3nFm3dpZXRsYW15IHdzenlzdGtpZSBwYWxldHkga29sb3LDs3dcblx0XHRcdGNvbnNvbGUubG9nKCByZXNwb25zZSApXG4gICAgXHRsX2V4Y2VsLmRhdGEgPSByZXNwb25zZS5leGNlbFswXS5sX2V4Y2VsLmRhdGE7XG4gICAgXHR0aGF0LnRyYW5zaXRpb24oKTsgXG4gICAgXHR0aGF0LnNob3coKTtcbiAgICBcdHBhbGV0cy5zaG93X3NlbGVjdCgpO1xuICAgIH0pO1xuXHR9LCBcblxuXHQvL2Z1bmNramEgemFtaWVuaWFqxIVjYSBrcnRvcGtpIG5hIHByemVjaW5raSBwcnp5IGtvbcOzcmthY2ggbGljemJvd3ljaFxuXHR0cmFuc2l0aW9uIDogZnVuY3Rpb24oKXtcblx0XHRcblx0XHR2YXIgbF9leGNlbCA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmV4Y2VsO1xuXG5cdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSB0aGlzLmxfZXhjZWwuZGF0YS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdGZvcih2YXIgaiA9IDAsIGpfbWF4ID0gdGhpcy5sX2V4Y2VsLmRhdGFbMF0ubGVuZ3RoOyBqIDwgal9tYXg7IGorKyl7XG5cdFx0XHRcdFxuXHRcdFx0XHQvL3VzdXdhbXkgc3BhY2plIHd5c3TEmXB1asSFY2UgemEgbHViIHByemVkIHRla3N0ZW1cblx0XHRcdFx0dGhpcy5sX2V4Y2VsLmRhdGFbaV1bal0gPSAkLnRyaW0odGhpcy5sX2V4Y2VsLmRhdGFbaV1bal0pXG5cblx0XHRcdFx0Ly9qZcWbbGkgbWFteSBwdXN0xIUgd2FydG/Fm8SHIG51bGwgemFtaWVuaWFteSBqxIUgbmEgemFta25pxJl0eSBzdHJpbmdcblx0XHRcdFx0aWYodGhpcy5sX2V4Y2VsLmRhdGFbaV1bal0gPT0gbnVsbCl7IHRoaXMubF9leGNlbC5kYXRhW2ldW2pdID0gJyc7IH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmKCQuaXNOdW1lcmljKCB0aGlzLmxfZXhjZWwuZGF0YVtpXVtqXSApKXtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGV4Y2VsLmxfZXhjZWwuZGF0YVtpXVtqXSlcblx0XHRcdFx0XHR0aGlzLmxfZXhjZWwuZGF0YVtpXVtqXSA9IFN0cmluZyh0aGlzLmxfZXhjZWwuZGF0YVtpXVtqXSkucmVwbGFjZSgnLicsJywnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiLy8g4pSM4pSA4pSQ4pSs4pSM4pSA4pSQ4pSsIOKUrOKUrOKUgOKUkOKUjOKUgOKUkOKUjOKUgOKUkFxuLy8g4pSc4pSkIOKUguKUgiDilKzilIIg4pSC4pSc4pSs4pSY4pSc4pSkIOKUlOKUgOKUkFxuLy8g4pSUICDilLTilJTilIDilJjilJTilIDilJjilLTilJTilIDilJTilIDilJjilJTilIDilJhcblxuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5cbi8vZnVua2NqZSByeXN1asSFY2UgcG9qZWR5xYRjenkgcHVua3QgKHBvaW50ZXIpXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0c3F1YXJlIDogZnVuY3Rpb24oZGF0YSl7XG5cdFx0ZGF0YS5jdHguZmlsbFJlY3QoZGF0YS54LGRhdGEueSxkYXRhLnNpemUsZGF0YS5zaXplKTtcblx0fSxcblxuXHRjaXJjbGUgOiBmdW5jdGlvbihkYXRhKXtcblx0XHRkYXRhLnNpemUgPSBkYXRhLnNpemUgLyAyO1xuXHRcdHZhciBjZW50ZXJfeCA9IGRhdGEueCArIGRhdGEuc2l6ZTtcblx0XHR2YXIgY2VudGVyX3kgPSBkYXRhLnkgKyBkYXRhLnNpemU7XG5cdFx0ZGF0YS5jdHguYmVnaW5QYXRoKCk7XG5cdFx0ZGF0YS5jdHguYXJjKGNlbnRlcl94LCBjZW50ZXJfeSwgZGF0YS5zaXplLCAwLCAyICogTWF0aC5QSSk7XG5cdFx0ZGF0YS5jdHguZmlsbCgpO1xuXHR9LFxuXG5cdGhleGFnb24gIDogZnVuY3Rpb24oZGF0YSl7XG5cdFx0dmFyIGEgPSBkYXRhLnNpemUvNDtcblx0XHR2YXIgYTIgPSBkYXRhLnNpemUvMjtcblx0XHR2YXIgaCA9IGRhdGEuc2l6ZS8yKk1hdGguc3FydCgzKS8yO1xuXG5cdFx0ZGF0YS5jdHguYmVnaW5QYXRoKCk7XG5cdFx0ZGF0YS5jdHgubW92ZVRvKGRhdGEueCxkYXRhLnkrYTIpO1xuICAgIGRhdGEuY3R4LmxpbmVUbyhkYXRhLngrYSxkYXRhLnkrYTItaCk7XG4gIFx0ZGF0YS5jdHgubGluZVRvKGRhdGEueCthK2EyLGRhdGEueSthMi1oKTtcblx0XHRkYXRhLmN0eC5saW5lVG8oZGF0YS54K2RhdGEuc2l6ZSxkYXRhLnkrYTIpO1xuXHRcdGRhdGEuY3R4LmxpbmVUbyhkYXRhLngrZGF0YS5zaXplLWEsZGF0YS55K2EyK2gpO1xuXHRcdGRhdGEuY3R4LmxpbmVUbyhkYXRhLngrYSxkYXRhLnkrYTIraCk7XG5cdFx0ZGF0YS5jdHgubGluZVRvKGRhdGEueCxkYXRhLnkrYTIpO1xuXHRcdGRhdGEuY3R4LmZpbGwoKTtcblx0fSxcblxuXHRoZXhhZ29uMiA6IGZ1bmN0aW9uKGRhdGEpe1xuXHRcdHZhciBhID0gZGF0YS5zaXplLzQ7XG5cdFx0dmFyIGEyID0gZGF0YS5zaXplLzI7XG5cdFx0dmFyIGggPSBkYXRhLnNpemUvMipNYXRoLnNxcnQoMykvMjtcblxuXHRcdGRhdGEuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdGRhdGEuY3R4Lm1vdmVUbyhkYXRhLngrYTIsZGF0YS55KTtcbiAgICBkYXRhLmN0eC5saW5lVG8oZGF0YS54K2EyK2gsZGF0YS55K2EpO1xuICBcdGRhdGEuY3R4LmxpbmVUbyhkYXRhLngrYTIraCxkYXRhLnkrYTIrYSk7XG4gICAgZGF0YS5jdHgubGluZVRvKGRhdGEueCthMixkYXRhLnkrZGF0YS5zaXplKTtcbiAgICBkYXRhLmN0eC5saW5lVG8oZGF0YS54K2EyLWgsZGF0YS55K2EyK2EpO1xuICAgIGRhdGEuY3R4LmxpbmVUbyhkYXRhLngrYTItaCxkYXRhLnkrYSk7XG4gICAgZGF0YS5jdHgubGluZVRvKGRhdGEueCthMixkYXRhLnkpO1xuXHRcdGRhdGEuY3R4LmZpbGwoKTtcblx0fSxcblxuICBzcXVhcmVfYm9yZGVyX3NtYWxsIDogZnVuY3Rpb24oZGF0YSl7XG5cbiAgICBpZihkYXRhLmxpbmVfd2lkdGhfeSA8IDIpeyB2YXIgeV90cmFucyA9IC0yOyB9XG4gICAgZWxzZXsgdmFyIHlfdHJhbnMgPSAtMzsgfVxuXG4gICAgaWYoZGF0YS5saW5lX3dpZHRoX3ggPCAzKXsgdmFyIHhfdHJhbnMgPSAtMjsgfVxuICAgIGVsc2V7IHZhciB4X3RyYW5zID0gLTEqZGF0YS5saW5lX3dpZHRoX3g7IH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnRvcCl7XG4gICAgICBkYXRhLmN0eC5maWxsUmVjdChcbiAgICAgICAgZGF0YS54K3hfdHJhbnMrMSxcbiAgICAgICAgZGF0YS55K3lfdHJhbnMrMSxcbiAgICAgICAgZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzEsXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYoZGF0YS5ib3JkZXIudG9wX2xlZnQpe1xuICAgICAgZGF0YS5jdHguZmlsbFJlY3QoXG4gICAgICAgIGRhdGEueCt4X3RyYW5zKzEsXG4gICAgICAgIGRhdGEueSt5X3RyYW5zKzEsXG4gICAgICAgIHBhcnNlSW50KChkYXRhLnNpemUrZGF0YS5saW5lX3dpZHRoX3grMSkvMiksXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYoZGF0YS5ib3JkZXIudG9wX3JpZ2h0KXtcbiAgICAgIGRhdGEuY3R4LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngreF90cmFucysxK3BhcnNlSW50KChkYXRhLnNpemUrZGF0YS5saW5lX3dpZHRoX3grMSkvMiksXG4gICAgICAgIGRhdGEueSt5X3RyYW5zKzEsXG4gICAgICAgIE1hdGguY2VpbCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzEpLzIpLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnJpZ2h0KXtcbiAgICAgIGlmKGRhdGEubGluZV93aWR0aF94IDwgMil7IHZhciB4X3RyYW5zID0gLTE7IH1cbiAgICAgIGVsc2V7IHZhciB4X3RyYW5zID0gMDsgfVxuXG4gICAgICBpZihkYXRhLmxpbmVfd2lkdGhfeSA8IDIpeyB2YXIgeV90cmFucyA9IDI7IH1cbiAgICAgIGVsc2V7IHZhciB5X3RyYW5zID0gZGF0YS5saW5lX3dpZHRoX3k7IH1cblxuICAgICAgZGF0YS5jdHguZmlsbFJlY3QoXG4gICAgICAgIGRhdGEueCtkYXRhLnNpemUreF90cmFucysxLFxuICAgICAgICBkYXRhLnktMSxcbiAgICAgICAgMSxcbiAgICAgICAgZGF0YS5zaXplK3lfdHJhbnMgXG4gICAgICApO1xuICAgIH1cbiAgfSxcblxuICBzcXVhcmVfYm9yZGVyX2JpZyA6IGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgaWYoZGF0YS5saW5lX3dpZHRoX3kgPCAyKXsgdmFyIHlfdHJhbnMgPSAtMjsgfVxuICAgIGVsc2V7IHZhciB5X3RyYW5zID0gLTM7IH1cblxuICAgIGlmKGRhdGEubGluZV93aWR0aF94IDwgMyl7IHZhciB4X3RyYW5zID0gLTI7IH1cbiAgICBlbHNleyB2YXIgeF90cmFucyA9IC0xKmRhdGEubGluZV93aWR0aF94OyB9XG5cbiAgICBpZihkYXRhLmJvcmRlci50b3Ape1xuICAgICAgZGF0YS5jdHguZmlsbFJlY3QoXG4gICAgICAgIGRhdGEueCt4X3RyYW5zLFxuICAgICAgICBkYXRhLnkreV90cmFucyxcbiAgICAgICAgZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzMsXG4gICAgICAgIDNcbiAgICAgICk7XG4gICAgfSAgXG5cbiAgICBpZihkYXRhLmJvcmRlci50b3BfbGVmdCl7XG4gICAgICBkYXRhLmN0eC5maWxsUmVjdChcbiAgICAgICAgZGF0YS54K3hfdHJhbnMsXG4gICAgICAgIGRhdGEueSt5X3RyYW5zLFxuICAgICAgICBwYXJzZUludCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzMpLzIpLFxuICAgICAgICAzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnRvcF9yaWdodCl7XG4gICAgICBkYXRhLmN0eC5maWxsUmVjdChcbiAgICAgICAgZGF0YS54K3hfdHJhbnMrcGFyc2VJbnQoKGRhdGEuc2l6ZStkYXRhLmxpbmVfd2lkdGhfeCszKS8yKSxcbiAgICAgICAgZGF0YS55K3lfdHJhbnMsXG4gICAgICAgIE1hdGguY2VpbCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzMpLzIpLFxuICAgICAgICAzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnJpZ2h0KXtcbiAgICAgIGlmKGRhdGEubGluZV93aWR0aF94IDwgMil7dmFyIHhfdHJhbnMgPSAtMTsgfVxuICAgICAgZWxzZXt2YXIgeF90cmFucyA9IDA7IH1cblxuICAgICAgaWYoZGF0YS5saW5lX3dpZHRoX3kgPCAyKXsgdmFyIHlfdHJhbnMgPSAyOyB9XG4gICAgICBlbHNleyB2YXIgeV90cmFucyA9IGRhdGEubGluZV93aWR0aF95O31cblxuICAgICAgZGF0YS5jdHguZmlsbFJlY3QoXG4gICAgICAgIGRhdGEueCtkYXRhLnNpemUreF90cmFucyxcbiAgICAgICAgZGF0YS55LFxuICAgICAgICAzLFxuICAgICAgICBkYXRhLnNpemUreV90cmFucyBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCIvLyDilZTilZDilZfilaYgIOKVlOKVkOKVl+KVlOKVlyDilZTilZDilZfilaYgIFxuLy8g4pWRIOKVpuKVkSAg4pWRIOKVkeKVoOKVqeKVl+KVoOKVkOKVo+KVkSAgXG4vLyDilZrilZDilZ3ilanilZDilZ3ilZrilZDilZ3ilZrilZDilZ3ilakg4pWp4pWp4pWQ4pWdXG5cbi8vZnVua2NqZSBnbG9iYWxuZSBrb250ZW5lciBuYSB3c3p5c3RrbyBpIG5pYyA7KVxuZXhwb3J0IGRlZmF1bHQge1xuXHR0b29nbGVfcmlnaHQgIDogKG9iaikgPT4ge1xuXHRcdC8vcGFuZWwgamVzdCB6IHByYXdlaiBzdHJvbnlcblx0XHRpZiggJChvYmopLnBhcmVudCgpLmNzcygncmlnaHQnKSA9PSAnMHB4JyApe1xuXHRcdFx0JChvYmopLnBhcmVudCgpLmFuaW1hdGUoe3JpZ2h0OiBbLSQob2JqKS5wYXJlbnQoKS53aWR0aCgpLTIwLFwic3dpbmdcIl19LCAxMDAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICBcdCAkKG9iaikucGFyZW50KCkuYW5pbWF0ZSh7cmlnaHQ6IFtcIjBweFwiLFwic3dpbmdcIl19LCAxMDAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICB9IFxuXHR9LFxuXHR0b29nbGVfbGVmdCAgOiAob2JqKSA9PiB7XG5cdFx0Ly9wYW5lbCBqZXN0IHogbGV3ZWogc3Ryb255XG5cdFx0aWYoICQob2JqKS5wYXJlbnQoKS5jc3MoJ2xlZnQnKSA9PSAnMHB4JyApe1xuXHRcdFx0JChvYmopLnBhcmVudCgpLmFuaW1hdGUoe2xlZnQ6IFstJChvYmopLnBhcmVudCgpLndpZHRoKCktMjAsXCJzd2luZ1wiXX0sIDEwMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgIH1cbiAgICBlbHNle1xuICAgIFx0ICQob2JqKS5wYXJlbnQoKS5hbmltYXRlKHtsZWZ0OiBbXCIwcHhcIixcInN3aW5nXCJdfSwgMTAwMCwgZnVuY3Rpb24oKSB7fSk7XG5cdCAgfVxuXHR9LFxuXG4gIHNldENvb2tpZSA6IChjbmFtZSwgY3ZhbHVlLCBleGRheXMpID0+IHtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKGV4ZGF5cyoyNCo2MCo2MCoxMDAwKSk7XG4gICAgdmFyIGV4cGlyZXMgPSBcImV4cGlyZXM9XCIrIGQudG9VVENTdHJpbmcoKTtcbiAgICBkb2N1bWVudC5jb29raWUgPSBjbmFtZSArIFwiPVwiICsgY3ZhbHVlICsgXCI7XCIgKyBleHBpcmVzICsgXCI7cGF0aD0vXCI7XG4gIH0sXG5cbiAgZ2V0Q29va2llIDogKGNuYW1lKSA9PiB7XG4gICAgdmFyIG5hbWUgPSBjbmFtZSArIFwiPVwiO1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gY2FbaV07XG4gICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKT09JyAnKSB7XG4gICAgICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsYy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9LFxuXG4gIC8vZG9kYWplbXkgYmxva2FkxJkgcHJ6ZWQgb2TFm3dpZcW8ZW5pZW0gc3Ryb255XG4gIHJlZnJlc2hMb2NrIDogKGUpID0+IHtcbiAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoZSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGUgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoZSkge1xuICAgICAgICBpZighY29uZmlybSgnQ3p5IGNoY2VzeiBvcHXFm2NpxIcgdMSZIHN0cm9uxJknKSkgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59ICAiLCIvLyDilabilZTilabilZfilZTilZDilZfilZTilZDilZfilZTilZDilZdcbi8vIOKVkeKVkeKVkeKVkeKVoOKVkOKVo+KVkSDilabilZHilaMgXG4vLyDilanilakg4pWp4pWpIOKVqeKVmuKVkOKVneKVmuKVkOKVnVxuXG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcblxuLy9nxYLDs3duZSB6ZGrEmWNpZSBvZCBrdMOzcmVnbyBvZHJ5c293dWplbXkgbWFweVxuZXhwb3J0IGRlZmF1bHQge1xuXHRvYmogOiB1bmRlZmluZWQsXG5cdHggOiBudWxsLFxuXHR5IDogbnVsbCxcblx0d2lkdGggOiBudWxsLFxuXHRoZWlnaHQgOiBudWxsLFxuXHRhbHBoYSA6IDEwLFxuXG5cdGRyYXcgOiBmdW5jdGlvbigpe1xuICAgIC8qXG5cdFx0Y2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLmFscGhhLzEwO1xuXHRcdGNhbnZhcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLm9iaix0aGlzLngsdGhpcy55LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xuXG5cdFx0JCgnI2NhbnZhc19ib3ggI2ltYWdlX3Jlc2l6ZScpLmNzcyh7J2hlaWdodCc6dGhpcy5oZWlnaHQsJ3RvcCc6dGhpcy55KydweCcsJ2xlZnQnOih0aGlzLngrdGhpcy53aWR0aCkrJ3B4J30pO1xuXHRcdGNhbnZhcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblx0Ki9cbiAgfSxcblxuXHQvL2Z1bmtjamEgcG9tb2NuaWN6YSBrb253ZXJ0dWrEhWNhIGRhdGFVUkkgbmEgcGxpa1xuXHRkYXRhVVJJdG9CbG9iIDogZnVuY3Rpb24oZGF0YVVSSSkge1xuICAgIHZhciBiaW5hcnkgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldLCB7dHlwZTogJ2ltYWdlL3BuZyd9KTtcblx0fVxuXG59XG4iLCIvLyDilaYgIOKVlOKVkOKVl+KVlOKVlyDilZTilZDilZfilaYgIOKVlOKVkOKVl1xuLy8g4pWRICDilaDilZDilaPilaDilanilZfilZHilaMg4pWRICDilZrilZDilZdcbi8vIOKVqeKVkOKVneKVqSDilanilZrilZDilZ3ilZrilZDilZ3ilanilZDilZ3ilZrilZDilZ1cblxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4vbGFiZWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdHNob3cgOiBmdW5jdGlvbigpe1xuXHRcdCQoJyNsYXllcnMgLmxhYmVsX2xheWVyJykudmFsKCBsYXllcnMubGFiZWxzW2xheWVycy5hY3RpdmVdICk7XG5cdH0sXG5cblx0ZWRpdCA6IGZ1bmN0aW9uKG9iaikge1xuXHRcdGxheWVycy5sYWJlbHNbbGF5ZXJzLmFjdGl2ZV0gPSAkKG9iaikudmFsKCk7XG5cdH1cbn1cblxuXG4iLCIvLyDilaYgIOKVlOKVkOKVl+KVpiDilabilZTilZDilZfilabilZDilZfilZTilZDilZdcbi8vIOKVkSAg4pWg4pWQ4pWj4pWa4pWm4pWd4pWR4pWjIOKVoOKVpuKVneKVmuKVkOKVl1xuLy8g4pWp4pWQ4pWd4pWpIOKVqSDilakg4pWa4pWQ4pWd4pWp4pWa4pWQ4pWa4pWQ4pWdXG5cbmltcG9ydCBwYWxldHMgZnJvbSAnLi9wYWxldHMnO1xuaW1wb3J0IGxlZ2VuZHMgZnJvbSAnLi9sZWdlbmRzJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IGNsb3VkIGZyb20gJy4vY2xvdWQnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuL2xhYmVscyc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHQvL2xpc3QgOiBbJ3pha8WCYWRrYSAxJ10sXG5cdC8vYWN0aXZlIDogMCxcblxuXHQvL3RhYmxpY2EgeiBwb2RzdGF3b3d5d21pIGRhbnltaSB6YWdyZWdvd2FueW1pIGRsYSBrYcW8ZGVqIHdhcnN0d3lcblx0cGFsZXRzX2FjdGl2ZSA6IFswXSxcblxuXHR2YWx1ZSA6IFstMV0sXG5cdGNvbG9yc19wb3MgOiBbWzEsMSwxLDEsMSwxLDEsMSwxXV0sXG5cdGNvbG9yc19hY3RpdmUgOiBbW1wiI2Y3ZmNmZFwiLCBcIiNlNWY1ZjlcIiwgXCIjY2NlY2U2XCIsIFwiIzk5ZDhjOVwiLCBcIiM2NmMyYTRcIiwgXCIjNDFhZTc2XCIsIFwiIzIzOGI0NVwiLCBcIiMwMDZkMmNcIiwgXCIjMDA0NDFiXCJdXSxcblx0Ly9taW5fdmFsdWUgOiBbMF0sXG5cdC8vbWF4X3ZhbHVlIDogWzBdLFxuXHRjbG91ZCA6IFtcIlwiXSxcblx0Y2xvdWRfcGFyc2VyIDogW1wiXCJdLFxuXHRsZWdlbmRzIDogW1tdXSxcblx0bGFiZWxzIDogW1wiXCJdLFxuXHRjYXRlZ29yeSA6IFstMV0sXG5cdGNhdGVnb3J5X2NvbG9ycyA6IFtdLFxuXHRjYXRlZ29yeV9uYW1lIDogW10sXG5cblx0Ly96bWllbm5lIGdsb2JhbG5lIGRvdHljesSFY2UgY2HFgmVnbyBwcm9qZWt0dVxuXHRwcm9qZWN0X25hbWUgOiAnbm93eSBwcm9qZWt0Jyxcblx0c291cmNlIDogJycsXG5cblx0Ly90YWJsaWNhIHDDs2wgdXphbGXFvG5pb255Y2ggb2QgYWt0dWFsbmVqIHdhcnN0d3lcblx0ZGJfbmFtZSA6IFtcImxpc3RcIixcInBhbGV0c19hY3RpdmVcIixcImNhdGVnb3J5XCIsXCJjYXRlZ29yeV9jb2xvcnNcIixcImNhdGVnb3J5X25hbWVcIixcInZhbHVlXCIsXCJjb2xvcnNfcG9zXCIsXCJjb2xvcnNfYWN0aXZlXCIsXCJtaW5fdmFsdWVcIixcIm1heF92YWx1ZVwiLFwiY2xvdWRcIixcImNsb3VkX3BhcnNlclwiLFwibGVnZW5kc1wiLFwibGFiZWxzXCJdLFxuXHRcblx0dGVzdCA6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICd0YWsnO1xuXHR9LFxuXG5cdHNob3cgOiBmdW5jdGlvbigpe1xuXHRcdFxuXHRcdHZhciBsX2xheWVycyA9IHN0b3JlLmxheWVycztcblxuXHRcdHZhciBodG1sID0gXCJcIjtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBsX2xheWVycy5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdGlmKGkgPT0gdGhpcy5hY3RpdmUpe1xuXHRcdFx0XHRodG1sICs9ICc8c3BhbiBudW09XCInK2krJ1wiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBjbGFzcz1cImFjdGl2ZVwiPicgKyBsX2xheWVyc1tpXS5uYW1lICsgJzwvc3Bhbj4nO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0aHRtbCArPSAnPHNwYW4gbnVtPVwiJytpKydcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPicgKyBsX2xheWVyc1tpXS5uYW1lICsgJzwvc3Bhbj4nO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJhZGRcIj4gKyA8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+IC0gPC9idXR0b24+JztcblxuXHRcdCQoJyNsYXllcnMgLmNoYXB0ZXInKS5odG1sKGh0bWwpO1xuXG5cblx0XHQvL2RvZGFqZW15IHpkYXJ6ZW5pYSBkbyBlZHljamkgLyB6bWlhbnkga29sZWpub3NjaSBpIGFrdHVhbGl6b3dhbmlhIHdhcnN0d3lcblx0XHQkKCcjbGF5ZXJzIC5hZGQnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0aWYoc3BlYy5jcnVkLm1hcF9oYXNoICE9IG51bGwpe1xuXHRcdFx0XHR0aGF0LmFkZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0YWxlcnQoJ0FieSBkb2RhxIcgemFrxYJhZGvEmSBuYWpwaWVydyBkb2RhaiBtYXDEmScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdCQoJyNsYXllcnMgLnJlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihjb25maXJtKCdDenkgY2hjZXN6IHVzdW7EhcSHIHpha8WCYWRrxJkgPycpKXtcblx0XHRcdFx0dGhhdC5yZW1vdmUoKTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0XG5cdFx0JCgnI2xheWVycyAuY2hhcHRlciBzcGFuJykuY2xpY2soZnVuY3Rpb24oKXsgdGhhdC5zZWxlY3QodGhpcyk7IH0pO1xuXG5cdFx0JCggXCIjbGF5ZXJzIC5jaGFwdGVyIHNwYW5cIiApLmtleXVwKGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0Lmxpc3RbdGhhdC5hY3RpdmVdID0gJCh0aGlzKS5odG1sKCk7XG5cdFx0fSk7XG5cblx0XHQkKCBcIiNsYXllcnMgLmNoYXB0ZXIgc3BhblwiICkuZGJsY2xpY2soZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2NvbnRlbnRlZGl0YWJsZScpO1xuXHRcdFx0JCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCl7ICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRlZGl0YWJsZScpIH0pO1xuXHRcdH0pO1xuXG5cdFx0JCggXCIjbGF5ZXJzIC5jaGFwdGVyXCIgKS5zb3J0YWJsZSh7IFxuXHRcdFx0YXhpczogJ3gnLFxuXHRcdFx0aXRlbXM6ICdzcGFuJyxcblx0XHQgXHR1cGRhdGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0XHRcdCQoIFwiI2xheWVycyAuY2hhcHRlciBzcGFuXCIgKS5lYWNoKGZ1bmN0aW9uKGluZGV4LG9iail7XG5cdFx0XHRcdFx0aWYoaW5kZXggIT0gJChvYmopLmF0dHIoJ251bScpKXtcblx0XHRcdFx0XHRcdHRoYXQuY2hhbmdlX29yZGVyKCQob2JqKS5hdHRyKCdudW0nKSxpbmRleClcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdCBcdH0sXG5cdFx0IFx0Y2FuY2VsOiAnLmFkZCwucmVtb3ZlLC5jb250ZW50ZWRpdGFibGUnXG5cdFx0fSk7XG5cdH0sXG5cblx0c2VsZWN0IDogZnVuY3Rpb24ob2JqKXtcblx0XHQkKCcjbGF5ZXJzIC5jaGFwdGVyIHNwYW4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0JChvYmopLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLmFjdGl2ZSA9ICQob2JqKS5pbmRleCgpO1xuXHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHR0aW55TUNFLmVkaXRvcnNbMF0uc2V0Q29udGVudCggdGhhdC5jbG91ZFt0aGF0LmFjdGl2ZV0gKTtcblx0XHRwYWxldHMuc2hvdygpO1xuXHRcdGNsb3VkLnNldF90ZXh0YXJlYSgpO1xuXHRcdGxhYmVscy5zaG93KCk7XG5cdFx0bGVnZW5kcy5zaG93KCk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXHQvL3ptaWFuYSBrb2xlam5qb8WbY2kgd2Fyc3R3XG5cdGNoYW5nZV9vcmRlciA6IGZ1bmN0aW9uKGxhc3QsbmV4dCl7XG5cdFx0Zm9yICh2YXIgaT0gMCwgaV9tYXggPSB0aGlzLmRiX25hbWUubGVuZ3RoOyBpIDwgaV9tYXg7IGkrKykge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXNbdGhpcy5kYl9uYW1lW2ldXVtuZXh0XTtcblx0XHRcdHRoaXNbdGhpcy5kYl9uYW1lW2ldXVtuZXh0XSA9IHRoaXNbdGhpcy5kYl9uYW1lW2ldXVtsYXN0XVxuXHRcdFx0dGhpc1t0aGlzLmRiX25hbWVbaV1dW2xhc3RdID0gdG1wO1xuXHRcdH1cblx0fSxcblxuXHQvL2RvZGFqZW15IG5vd8SFIHdhcnN0d8SZXG5cdGFkZCA6IGZ1bmN0aW9uKCl7XG5cdFx0XG5cdFx0dmFyIHRtcF9sYXllciA9IHN0b3JlLmxheWVyc1tzdG9yZS5sYXllcnMubGVuZ3RoLTFdO1xuXHRcdE9iamVjdC5hc3NpZ24oc3RvcmUubGF5ZXJzLHRtcF9sYXllcik7XG5cdFx0Ly9zdG9yZS5sYXllcnMucHVzaCh0bXBfbGF5ZXIpXG4vKlxuXG5cdFx0bF9sYXllcnMucHVzaCgnemFrxYJhZGthICcgKyBwYXJzZUludChsX2xheWVycy5sZW5ndGgrMSkpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeS5wdXNoKC0xKTtcblx0XHR0aGlzLmNhdGVnb3J5X2NvbG9ycy5wdXNoKCB0aGlzLmNhdGVnb3J5X2NvbG9yc1t0aGlzLmNhdGVnb3J5X2NvbG9ycy5sZW5ndGgtMV0uc2xpY2UoKSApO1xuXHRcdHRoaXMudmFsdWUucHVzaCgtMSk7XG5cdFx0dGhpcy5wYWxldHNfYWN0aXZlLnB1c2goMCk7XG5cdFx0dGhpcy5jb2xvcnNfYWN0aXZlLnB1c2goWycjZjdmY2ZkJywnI2U1ZjVmOScsJyNjY2VjZTYnLCcjOTlkOGM5JywnIzY2YzJhNCcsJyM0MWFlNzYnLCcjMjM4YjQ1JywnIzAwNmQyYycsJyMwMDQ0MWInXSk7XG5cdFx0dGhpcy5jb2xvcnNfcG9zLnB1c2goWzEsMSwxLDEsMSwxLDEsMSwxXSk7XG5cdFx0dGhpcy5taW5fdmFsdWUucHVzaCgwKTtcblx0XHR0aGlzLm1heF92YWx1ZS5wdXNoKDApO1xuXHRcdHRoaXMuY2xvdWQucHVzaChcIlwiKTtcblx0XHR0aGlzLmNsb3VkX3BhcnNlci5wdXNoKFwiXCIpO1xuXHRcdHRoaXMubGVnZW5kcy5wdXNoKFtdKTtcblx0XHR0aGlzLmxhYmVscy5wdXNoKFwiXCIpO1xuXHRcdHRoaXMuc2hvdygpO1xuKi9cblx0fSxcblxuXHQvL3VzdXdhbXkgYWt0dWFsbsSFIHdhcnN0d8SZXG5cdHJlbW92ZSA6IGZ1bmN0aW9uKCl7XG5cdFx0XG5cblx0XHR2YXIgYWN0aXZlID0gc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlO1xuXHRcdHZhciBsX2xheWVycyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmxheWVycztcblxuXHRcdC8vc3ByYXdkemFteSBjenkgbGljemJhIHdhcnN0dyBqZXN0IHdpxJlrc3phIG9kIDFcblx0XHRpZihzdG9yZS5sYXllcnMubGVuZ3RoID4gMCl7XG5cblxuXHRcdFx0aWYoYWN0aXZlID09IChsX2xheWVycy5sZW5ndGggLSAxKSl7XG5cdFx0XHRcdHZhciBpX3RtcCA9IGxfbGF5ZXJzLmxlbmd0aCAtIDE7XG5cdFx0XHRcdHRoaXMuc2VsZWN0KCAkKCcjbGF5ZXJzIC5jaGFwdGVyIHNwYW4nKS5lcSggaV90bXAgKSApO1xuXHRcdFx0fSBcblxuXHRcdFx0c3RvcmUubGF5ZXJzLnNwbGljZShhY3RpdmUsIDEpO1xuXG5cdFx0XHQvL3BvYmllcmFteSBudW1lciBvc3RhdG5pZWogemFrxYJhZGtpXG5cdFx0XHRmb3IgKHZhciBpX2xheWVycyA9IGFjdGl2ZSwgaV9sYXllcnNfbWF4ID0gbF9sYXllcnMubGVuZ3RoLTE7IGlfbGF5ZXJzIDwgaV9sYXllcnNfbWF4OyBpX2xheWVycysrKSB7XG5cdFx0XHRcdGZvciAodmFyIGk9IDAsIGlfbWF4ID0gdGhpcy5kYl9uYW1lLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspIHtcblx0XHRcdFx0XHR0aGlzW3RoaXMuZGJfbmFtZVtpXV1baV9sYXllcnNdID0gdGhpc1t0aGlzLmRiX25hbWVbaV1dW2lfbGF5ZXJzKzFdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vdXN1d2FteSBvc3RhdG5pxIUgemFrxYJhZGvEmSAvIHdhcnN0d8SZXG5cdFx0XHR2YXIgbGFzdF9pID0gbF9sYXllcnMubGVuZ3RoIC0gMTtcblx0XHRcdGZvciAodmFyIGk9IDAsIGlfbWF4ID0gdGhpcy5kYl9uYW1lLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspIHtcblx0XHRcdFx0dGhpc1t0aGlzLmRiX25hbWVbaV1dLnBvcCgpXG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXNbdGhpcy5kYl9uYW1lW2ldXVtsYXN0X2ldKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0XHR0aGlzLnNlbGVjdCgkKCcjbGF5ZXJzIC5jaGFwdGVyIHNwYW4uYWN0aXZlJykpOyBcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGFsZXJ0KCduaWUgbW/FvGVzeiB1c3VuxIXEhyBwaWVyd3N6ZWogemFrxYJhZGtpJyk7XG5cdFx0fVxuXHR9XG59XG5cblxuLy96bWllbm5lIHBvbW9jbmljemVcbiQuZm4uc2VsZWN0VGV4dCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIGVsZW1lbnQgPSB0aGlzWzBdO1xuICAvL2NvbnNvbGUubG9nKHRoaXMsIGVsZW1lbnQpO1xuICBpZiAoZG9jLmJvZHkuY3JlYXRlVGV4dFJhbmdlKSB7XG4gIFx0dmFyIHJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChlbGVtZW50KTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gIFx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTsgICAgICAgIFxuICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW1lbnQpO1xuICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgXHRzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuXHR9XG59O1xuIiwiLy8g4pWmICDilZTilZDilZfilZTilZDilZfilZTilZDilZfilZTilZfilZTilZTilabilZfilZTilZDilZdcbi8vIOKVkSAg4pWR4pWjIOKVkSDilabilZHilaMg4pWR4pWR4pWRIOKVkeKVkeKVmuKVkOKVl1xuLy8g4pWp4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWd4pWa4pWd4pWQ4pWp4pWd4pWa4pWQ4pWdXG5cbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IHBhbGV0cyBmcm9tICcuL3BhbGV0cyc7XG5pbXBvcnQgY29sb3JwaWNrZXIgZnJvbSAnLi9jb2xvcnBpY2tlcic7XG5pbXBvcnQgY2F0ZWdvcmllcyBmcm9tICcuL2NhdGVnb3JpZXMnO1xuaW1wb3J0IGxlZ2VuZHMgZnJvbSAnLi9sZWdlbmRzJztcblxuLy9vYmlla3QgZG90eWN6xIVzeSB3eXN3aWV0bGFuaWEgYWt1dGFsaXphY2ppIGkgZWR5Y2ppIHBhbmVsdSBsZWdlbmRcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHQvL3d5xZt3aWV0bGFteSB3c3p5c3RraWUgbGVnZW5keSB3IHBhbmVsdSBtYXBcblx0c2hvdyA6IGZ1bmN0aW9uKCl7XG5cblx0XHR2YXIgaHRtbCA9IFwiPHRhYmxlPjx0cj48dGg+a29sb3I6PC90aD48dGg+b2Q6PC90aD48dGg+ZG86PC90aD48dGg+b3Bpczo8L3RoPjwvdHI+XCI7XG5cblx0XHRmb3IodmFyIGkgPSAwLCBpX21heCA9IGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspe1xuXHRcdFx0aHRtbCArPSBcIjx0ciByb3c9J1wiK2krXCInPjx0ZCByb3c9J1wiK2krXCInIGNvbF9udW09Jycgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6XCIrbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1baV1bM10rXCInIGNsYXNzPSdjb2xvciBjb2xvcnBpY2tlcl9ib3gnPjwvdGQ+PHRkIGNsYXNzPSdmcm9tJyBuYW1lPSdmcm9tJyBjb250ZW50ZWRpdGFibGU9J3RydWUnPlwiK2xheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW2ldWzBdK1wiPC90ZD48dGQgY2xhc3M9J3RvJyBuYW1lPSd0bycgY29udGVudGVkaXRhYmxlPSd0cnVlJz5cIitsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXVtpXVsxXStcIjwvdGQ+PHRkIGNsYXNzPSdkZXNjcmlwdGlvbicgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnRlZGl0YWJsZT0ndHJ1ZSc+XCIrbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1baV1bMl0rXCI8L3RkPjwvdHI+XCI7XG5cdFx0fVxuXG5cdFx0aHRtbCArPSBcIjwvdGFibGU+XCI7XG5cdFx0JCgnI2xlZ2VuZHMnKS5odG1sKGh0bWwpO1xuXG5cdFx0dmFyIHJvdyA9IDE7XG5cdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBsYXllcnMuY29sb3JzX3Bvc1tsYXllcnMuYWN0aXZlXS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdGlmKCBsYXllcnMuY29sb3JzX3Bvc1tsYXllcnMuYWN0aXZlXVtpXSA9PSAxKXtcblx0XHRcdFx0JCgnI2xlZ2VuZHMgdGFibGUgdHInKS5lcShyb3cpLmNoaWxkcmVuKCd0ZCcpLmVxKDApLmF0dHIoJ2NvbF9udW0nLCBpKTtcblx0XHRcdFx0cm93Kys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoMTggPT0gbGF5ZXJzLnBhbGV0c19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV0pIHtcblx0XHRcdHZhciByb3cgPSAwO1xuXHRcdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBsYXllcnMuY29sb3JzX3Bvc1tsYXllcnMuYWN0aXZlXS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdFx0aWYoIGxheWVycy5jb2xvcnNfcG9zW2xheWVycy5hY3RpdmVdW2ldID09IDEpe1xuXHRcdFx0XHRcdHBhbGV0cy5jb2xvcl9hcnJbMThdW2ldID0gbGF5ZXJzLmNvbG9yc19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV1bcm93XTtcblx0XHRcdFx0XHRyb3crKztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHBhbGV0cy5jb2xvcl9hcnJbMThdW2ldID0gJyNmZmYnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwYWxldHMuc2hvdygpXG5cdFx0fVxuXG5cdFx0JCgnI2xlZ2VuZHMnKS5vbigna2V5dXAnLCd0ZCcsIGZ1bmN0aW9uKCl7IGxlZ2VuZHMuZWRpdCh0aGlzKTsgfSk7XG5cdFx0Y29sb3JwaWNrZXIuYWRkKCk7XG5cdH0sXG5cblx0Ly9mdW5rY2phIGFrdXRhbGl6dWrEhWNhIGtvbG9yeSB3IHBhbGVjaWUga29sb3LDs3dcblx0dXBkYXRlIDogZnVuY3Rpb24oKXtcblx0XHR2YXIgY29sb3JfY291bnQgPSBsYXllcnMuY29sb3JzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXS5sZW5ndGggLy9pbG9zYyBrb2xvcsOzd1xuXHRcdHZhciBkaWZmcmVudCA9IE1hdGguYWJzKCBsYXllcnMubWluX3ZhbHVlW2xheWVycy5hY3RpdmVdIC0gbGF5ZXJzLm1heF92YWx1ZVtsYXllcnMuYWN0aXZlXSApOyAvLyBjb2xvcl9jb3VudDtcblx0XHRcblx0XHRsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXSA9IFtdO1xuXG5cdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBsYXllcnMuY29sb3JzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblxuXHRcdFx0Y29uc29sZS5sb2coIHBhcnNlSW50KGxheWVycy5taW5fdmFsdWVbbGF5ZXJzLmFjdGl2ZV0pLGxheWVycy5taW5fdmFsdWVbbGF5ZXJzLmFjdGl2ZV0gKTtcblxuXHRcdFx0dmFyIG5vd190bXAgPSBNYXRoLnJvdW5kKCAocGFyc2VJbnQobGF5ZXJzLm1pbl92YWx1ZVtsYXllcnMuYWN0aXZlXSkrZGlmZnJlbnQvY29sb3JfY291bnQqaSkqMTAwKSAvIDEwMFxuXHRcdFx0XG5cdFx0XHQvL2NvbnNvbGUubG9nKGxheWVycy5taW5fdmFsdWVbbGF5ZXJzLmFjdGl2ZV0rZGlmZnJlbnQvY29sb3JfY291bnQqaSk7XG5cblxuXHRcdFx0aWYoaSsxID09IGlfbWF4ICl7XG5cdFx0XHRcdHZhciBuZXh0X3RtcCA9IGxheWVycy5tYXhfdmFsdWVbbGF5ZXJzLmFjdGl2ZV1cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHZhciBuZXh0X3RtcCA9IE1hdGgucm91bmQoICgocGFyc2VJbnQobGF5ZXJzLm1pbl92YWx1ZVtsYXllcnMuYWN0aXZlXSkrZGlmZnJlbnQvY29sb3JfY291bnQqKGkrMSkpIC0gMC4wMSkgICoxMDApIC8gMTAwIFxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXS5wdXNoKFtub3dfdG1wLG5leHRfdG1wLCAgU3RyaW5nKG5vd190bXApLnJlcGxhY2UoJy4nLCcsJykrJyAtICcrU3RyaW5nKG5leHRfdG1wKS5yZXBsYWNlKCcuJywnLCcpLCBsYXllcnMuY29sb3JzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXVtpXSBdKTtcblx0XHRcblx0XHR9XG5cdFx0dGhpcy5zaG93KCk7XG5cdFx0Y2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcblx0fSxcblxuXHRlZGl0OiBmdW5jdGlvbihvYmope1xuXG5cdFx0dmFyIHJvdyA9ICQob2JqKS5wYXJlbnQoKS5hdHRyKCdyb3cnKTtcblx0XHR2YXIgbmFtZSA9ICQob2JqKS5hdHRyKCduYW1lJyk7XG5cdFx0dmFyIHZhbCA9ICQob2JqKS5odG1sKCk7XG5cblx0XHRzd2l0Y2gobmFtZSl7XG5cdFx0XHRcblx0XHRcdGNhc2UgJ2Zyb20nOlxuXHRcdFx0XHRpZighJC5pc051bWVyaWModmFsKSkgeyAkKG9iaikuaHRtbChwYXJzZUZsb2F0KHZhbCkpIH0gLy96YWJlenBpZWN6ZW5pZSwgamXFm2xpIHdwaXNhbm8gdGVrc3QgemFtaWVuaWFteSBnbyBuYSBsaWN6YsSZXG5cdFx0XHRcdGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW3Jvd11bMF0gPSBwYXJzZUZsb2F0KHZhbCk7XG5cdFx0XHRcdGNhdGVnb3JpZXMudXBkYXRlX2NvbG9yKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdFxuXHRcdFx0Y2FzZSAndG8nOlxuXHRcdFx0XHRpZighJC5pc051bWVyaWModmFsKSkgeyAkKG9iaikuaHRtbChwYXJzZUZsb2F0KHZhbCkpIH1cblx0XHRcdFx0bGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1bcm93XVsxXSA9IHBhcnNlRmxvYXQodmFsKTtcblx0XHRcdFx0Y2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0XG5cdFx0XHRjYXNlICdkZXNjcmlwdGlvbic6XG5cdFx0XHRcdGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW3Jvd11bMl0gPSB2YWw7XG5cdFx0XHRicmVhaztcdFx0XG5cdFx0XG5cdFx0fVxuXHR9XG59XG5cblxuXG5cbi8vZG9kYWplbXkgemRhcnplbmllIGVkeWNqaSB3YXJ0b8WbY2kgdyBsZWdlbmR6aWVcblxuIiwiLy8g4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWX4pWU4pWmIOKVpiAg4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilZHilZHilZHilZHilaMg4pWR4pWR4pWR4pWRIOKVkSAgIOKVkSDilZEg4pWR4pWg4pWQ4pWdXG4vLyDilakg4pWp4pWa4pWQ4pWd4pWd4pWa4pWd4pWa4pWQ4pWdICAg4pWpIOKVmuKVkOKVneKVqSBcblxuaW1wb3J0IGNydWQgZnJvbSAnLi9jcnVkJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xuXG4vL29iaWVrdCBtZW51X3RvcFxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdC8vem1pYW5hIGFrdHVhbG5laiB6YWvFgmFka2lcblx0Y2hhbmdlX2JveCA6IGZ1bmN0aW9uKG9iail7XG5cdFx0dmFyIGxfbWVudV90b3AgPSBzdG9yZS5wcm9qZWN0Lm1lbnVfdG9wO1xuXG5cdFx0aWYoIWxfbWVudV90b3AuYW5pbWF0ZV9ib3gpe1xuXHRcdFx0bF9tZW51X3RvcC5hbmltYXRlX2JveCA9ICFsX21lbnVfdG9wLmFuaW1hdGVfYm94O1xuXHRcdFx0XG5cdFx0XHQkKG9iaikucGFyZW50KCkuY2hpbGRyZW4oJ2xpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JChvYmopLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0dmFyIGNhdGVnb3J5ID0gJChvYmopLmF0dHIoJ2NhdGVnb3J5Jyk7XG5cdFx0XHRcblx0XHRcdCQob2JqKS5wYXJlbnQoKS5wYXJlbnQoKS5jaGlsZHJlbignZGl2JykuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuXHRcdFx0JChvYmopLnBhcmVudCgpLnBhcmVudCgpLmNoaWxkcmVuKCcjJytjYXRlZ29yeSkuY3NzKCdkaXNwbGF5JywnYmxvY2snKTtcblxuXHRcdH1cblx0fSxcblxuXHQvL2Z1bmtjamEgc8WCdcW8xIVjYSBkbyBwb2JpZXJhbmlhIGRhbnljaCBkb3R5Y3rEhWN5Y2ggbWFwXG5cdGdldF9tYXBzIDogZnVuY3Rpb24oKXtcblx0XHRcblx0XHQkLmFqYXgoe1xuICAgXHRcdHVybDogJy9hcGkvbWFwcycsXG4gICAgXHR0eXBlOiBcIkdFVFwiLFxuICAgIFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdFx0fSkuZG9uZSggZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdFx0XG5cdFx0XHQvL3d5xZt3aWV0bGFteSBsaXN0xJkgbWFwIHcgcGFuZWx1IHUgZ8Ozcnlcblx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcIm9rXCIpe1xuXHRcdFx0XHR2YXIgYWRkX2h0bWwgPSAnPG9wdGlvbiBpZD1cInNlbGVjdF9tYXBcIj53eWJpZXJ6IG1hcMSZPC9vcHRpb24+Jztcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGlfbWF4ID0gcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkgPCBpX21heCA7aSsrKXtcblx0XHRcdFx0XHRpZihyZXNwb25zZS5kYXRhW2ldLl9pZCA9PSBjcnVkLm1hcF9oYXNoKXtcblx0XHRcdFx0XHRcdGFkZF9odG1sICs9ICc8b3B0aW9uIHNlbGVjdGVkIGlkPVwiJyArIHJlc3BvbnNlLmRhdGFbaV0uX2lkICsgJ1wiPicgKyBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGFbaV0ubWFwX2pzb24pWzBdWzddICsgJzwvb3B0aW9uPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRhZGRfaHRtbCArPSAnPG9wdGlvbiBpZD1cIicgKyByZXNwb25zZS5kYXRhW2ldLl9pZCArICdcIj4nICsgSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhW2ldLm1hcF9qc29uKVswXVs3XSArICc8L29wdGlvbj4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkKCcjdG9vbGJhcl90b3Agc2VsZWN0LnNlbGVjdF9tYXAnKS5odG1sKCBhZGRfaHRtbCApO1xuXG5cdFx0XHRcdC8vZG9kYWplbXUgemRhcnplbmllIGNoYW5nZSBtYXAgXG5cdFx0XHRcdCQoJy5zZWxlY3RfbWFwJykuY2hhbmdlKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Ly9zcHJhd2R6YW15IGN6eSB3eWJyYWxpxZtteSBwb2xlIHogaGFzaGVtIG1hcHlcblx0XHRcdFx0XHRpZiggJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCdpZCcpICE9ICdzZWxlY3RfbWFwJyl7XG5cdFx0XHRcdFx0XHQvL2plxZtsaSB0YWsgdG8gc3ByYXdkemFteSBjenkgd2N6eXR1amVteSBtYXDEmSBwbyByYXogcGllcndzenkgY3p5IGRydWdpXG5cdFx0XHRcdFx0XHRpZihjcnVkLm1hcF9oYXNoICE9IG51bGwpe1xuXHRcdFx0XHRcdFx0XHQvL2plxZtsaSB3Y3p5dHVqZW15IHBvIHJheiBrb2xlam55IHRvIHB5dGFteSBjenkgbmFwZXdubyBjaGNlbXkgasSFIHdjenl0YcSHXG5cdFx0XHRcdFx0XHRcdGlmIChjb25maXJtKCdDenkgY2hjZXN6IHdjenl0YcSHIG5vd8SFIG1hcMSZID8nKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNydWQubWFwX2hhc2ggPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0XHRcdFx0Y3J1ZC5nZXRfbWFwKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdCQoJy5zZWxlY3RfbWFwIG9wdGlvbicpLmVxKDApLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRjcnVkLm1hcF9oYXNoID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRcdFx0XHRjcnVkLmdldF9tYXAoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHRhbGVydCgnbmllIG1vZ8SZIHBvYnJhxIcgbGlzdHkgbWFwJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCByZXNwb25zZSApO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHQvL2Z1bmtjamEgc8WCdcW8xIVjYSBkbyBwb2JpZXJhbmlhIGRhbnljaCBkb3R5Y3rEhWN5Y2ggbWFwXG5cdGdldF9wcm9qZWN0cyA6IGZ1bmN0aW9uKCl7XG5cdFx0JC5hamF4KHtcbiAgIFx0XHR1cmw6ICcvYXBpL3Byb2plY3RzJyxcbiAgICBcdHR5cGU6IFwiR0VUXCIsXG4gICAgXHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHR9KS5kb25lKCBmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG5cblx0XHRcdC8vd3nFm3dpZXRsYW15IGxpc3TEmSBwcm9qZWt0w7N3IHcgcGFuZWx1IHUgZ8Ozcnlcblx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcIm9rXCIpe1xuXG5cdFx0XHRcdHZhciBhZGRfaHRtbCA9ICc8b3B0aW9uIGlkPVwibmV3X3Byb2plY3RcIj5ub3d5IHByb2pla3Q8L29wdGlvbj4nO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgaV9tYXggPSByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSA8IGlfbWF4IDtpKyspe1xuXG5cdFx0XHRcdFx0aWYocmVzcG9uc2UuZGF0YVtpXS5faWQgPT0gY3J1ZC5wcm9qZWN0X2hhc2gpe1xuXHRcdFx0XHRcdFx0YWRkX2h0bWwgKz0gJzxvcHRpb24gc2VsZWN0ZWQgaWQ9XCInICsgcmVzcG9uc2UuZGF0YVtpXS5faWQgKyAnXCI+JyArIEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YVtpXS5wcm9qZWN0KS5uYW1lICsgJzwvb3B0aW9uPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRhZGRfaHRtbCArPSAnPG9wdGlvbiBpZD1cIicgKyByZXNwb25zZS5kYXRhW2ldLl9pZCArICdcIj4nICsgSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhW2ldLnByb2plY3QpLm5hbWUgKyAnPC9vcHRpb24+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0JCgnI3Rvb2xiYXJfdG9wIHNlbGVjdC5zZWxlY3RfcHJvamVjdCcpLmh0bWwoIGFkZF9odG1sICk7XG5cdFx0XHRcblx0XHRcdFx0Ly9kb2RhamVtdSB6ZGFyemVuaWUgY2hhbmdlIHByb2plY3QgXG5cdFx0XHRcdCQoJy5zZWxlY3RfcHJvamVjdCcpLmNoYW5nZShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGlmIChjb25maXJtKCdDenkgY2hjZXN6IHdjenl0YcSHIG5vd3kgcHJvamVrdCA/JykpIHtcblx0XHRcdFx0XHRcdGlmKCAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ2lkJykgPT0gJ25ld19wcm9qZWN0JyApe1xuXHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdGNydWQucHJvamVjdF9oYXNoID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRcdFx0XHRjcnVkLmdldF9wcm9qZWN0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0YWxlcnQoJ25pZSBtb2fEmSBwb2JyYcSHIGxpc3R5IHByb2pla3TDs3cnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coIHJlc3BvbnNlICk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fSxcblxuXHR1cGRhdGVfY2FudmFzX2luZm8gOiBmdW5jdGlvbigpe1xuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcblx0XHRsX2NhbnZhcy53aWR0aCA9IHBhcnNlSW50KCAkKCcjd2lkdGhfY2FudmFzJykudmFsKCkgKTtcblx0XHRsX2NhbnZhcy5oZWlnaHQgPSBwYXJzZUludCggJCgnI2hlaWdodF9jYW52YXMnKS52YWwoKSApO1xuXG5cdFx0Y29uc29sZS5sb2coICd1cGRhdGVfY2FudmFzX2luZm8nLCBsX2NhbnZhcy53aWR0aCwgbF9jYW52YXMuaGVpZ2h0ICk7XG5cdFx0JCgnI3dpZHRoX2NhbnZhcycpLnZhbCggbF9jYW52YXMud2lkdGggKyAncHgnICk7XG5cdFx0JCgnI2hlaWdodF9jYW52YXMnKS52YWwoIGxfY2FudmFzLmhlaWdodCArICdweCcgKTtcblxuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3Moeyd3aWR0aCc6IGxfY2FudmFzLndpZHRoICsgJ3B4JywnaGVpZ2h0JzpsX2NhbnZhcy5oZWlnaHQgKyAncHgnfSk7XG5cdFx0JCgnI2NhbnZhc19ib3ggI21haW5fY2FudmFzJykuYXR0cignd2lkdGgnLGxfY2FudmFzLndpZHRoICsgJ3B4Jyk7XG5cdFx0JCgnI2NhbnZhc19ib3ggI21haW5fY2FudmFzJykuYXR0cignaGVpZ2h0JyxsX2NhbnZhcy5oZWlnaHQgKyAncHgnKTtcblx0XHRjYW52YXMuZHJhdygpO1xuXHR9LFxuXG5cdGNoYW5nZV9hbHBoYSA6IGZ1bmN0aW9uKCl7XG5cdFx0aW1hZ2UuYWxwaGEgPSAkKCcjYWxwaGFfaW1hZ2UnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCduYW1lJyk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXHRhZGRfaW1hZ2UgOiBmdW5jdGlvbigpe1xuXG5cdFx0Ly9qZXNsaSBwb2RhbnkgcGFyYW1ldHIgbmllIGplc3QgcHVzdHlcblx0XHR2YXIgc3JjX2ltYWdlID0gcHJvbXB0KFwiUG9kYWogxZtjaWXFvGvEmSBkbyB6ZGrEmWNpYTogXCIpO1xuXG5cdFx0aWYoc3JjX2ltYWdlKXtcblx0XHRcdGlmKHNyY19pbWFnZS5sZW5ndGggPiAwKXtcblxuXHRcdFx0XHRpbWFnZS5vYmogPSBuZXcgSW1hZ2UoKTtcblxuXHRcdFx0XHQvL3djenl0YW5pZSB6ZGrEmWNpYTpcblx0XHRcdFx0aW1hZ2Uub2JqLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdGltYWdlLndpZHRoID0gaW1hZ2Uub2JqLndpZHRoO1xuXHQgICAgXHRcdGltYWdlLmhlaWdodCA9IGltYWdlLm9iai5oZWlnaHQ7XG5cdCAgICBcdFx0aW1hZ2UuZHJhdygpO1xuXHQgIFx0XHR9O1xuXG5cdFx0XHQgIGltYWdlLnggPSAwO1xuXHRcdFx0ICBpbWFnZS55ID0gMDtcblx0XHRcdCAgaW1hZ2Uub2JqLnNyYyA9IHNyY19pbWFnZTtcblx0XHRcdFx0Ly9zaW1hZ2Uub2JqLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHNob3dfaW5mbyA6IGZ1bmN0aW9uKCl7IFxuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcbmNvbnNvbGUubG9nKCAnc2hvd19pbmZvJywgbF9jYW52YXMud2lkdGgsIGxfY2FudmFzLmhlaWdodCApO1xuXHRcdFxuXHRcdCQoJyN3aWR0aF9jYW52YXMnKS52YWwocGFyc2VJbnQobF9jYW52YXMud2lkdGgpICsgJ3B4Jyk7XG5cdFx0JCgnI2hlaWdodF9jYW52YXMnKS52YWwocGFyc2VJbnQobF9jYW52YXMuaGVpZ2h0KSArICdweCcpO1xuXHR9XG5cbn1cbiIsIi8vIOKVlOKVpuKVl+KVlOKVkOKVl+KVlOKVpuKVl+KVlOKVkOKVl+KVpiAg4pWU4pWQ4pWXXG4vLyDilZHilZHilZHilZEg4pWRIOKVkeKVkeKVkeKVoyDilZEgIOKVmuKVkOKVl1xuLy8g4pWpIOKVqeKVmuKVkOKVneKVkOKVqeKVneKVmuKVkOKVneKVqeKVkOKVneKVmuKVkOKVnVxuXG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBwb2ludGVycyBmcm9tICcuL3BvaW50ZXJzJztcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IGNydWQgZnJvbSAnLi9jcnVkJztcblxuLy8gcG9iaWVyYW5pZSBkYW55Y2ggeiBzZWxla3RhIGlucHV0YSBzd2l0Y2h5IChha3R1YWxpemFjamEgb2JpZWt0w7N3KSBidXR0b24gaW5rcmVtZW50IGkgZGVrcmVtZW50XG5leHBvcnQgZGVmYXVsdCB7XG5cdFxuXHRjYW52YXMgOiBjYW52YXMsXG5cdHBvaW50ZXJzIDogcG9pbnRlcnMsXG5cdGxheWVycyA6IGxheWVycyxcblx0Y3J1ZCA6IGNydWQsXG5cblx0YnV0dG9uX2luY3JlbWVudCA6IGZ1bmN0aW9uKG9iail7XG5cblx0XHR2YXIgaW5wdXRfdG9fdXBkYXRlID0gJChvYmopLmF0dHIoJ25hbWVpbnB1dCcpO1xuXHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KCQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykudmFsKCkpICsgMTtcblxuXHRcdCQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykudmFsKHZhbHVlKTtcblx0XHR0aGlzLnVwZGF0ZV9mcm9tX2lucHV0KCAkKCdpbnB1dFtuYW1lPVwiJytpbnB1dF90b191cGRhdGUrJ1wiXScpICk7XG5cdH0sXG5cblx0YnV0dG9uX2RlY3JlbWVudCA6IGZ1bmN0aW9uKG9iail7XG5cblx0XHR2YXIgaW5wdXRfdG9fdXBkYXRlID0gJChvYmopLmF0dHIoJ25hbWVpbnB1dCcpO1xuXHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KCQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykudmFsKCkpIC0gMTtcblxuXHRcdCQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykudmFsKHZhbHVlKTtcblx0XHR0aGlzLnVwZGF0ZV9mcm9tX2lucHV0KCAkKCdpbnB1dFtuYW1lPVwiJytpbnB1dF90b191cGRhdGUrJ1wiXScpICk7XG5cdH0sXG5cblx0dXBkYXRlX2Zyb21faW5wdXQgOiBmdW5jdGlvbihvYmope1xuXHRcdHZhciBuYW1lX2NsYXNzID0gJChvYmopLmF0dHIoJ29iaicpO1xuXHRcdHZhciBuYW1lX21ldGhvZCA9ICQob2JqKS5hdHRyKCduYW1lJyk7XG5cblx0Y29uc29sZS5sb2cobmFtZV9jbGFzcyxuYW1lX21ldGhvZCx0aGlzW25hbWVfY2xhc3NdKTtcblx0Y29uc29sZS5sb2codGhpc1tuYW1lX2NsYXNzXVtuYW1lX21ldGhvZF0pO1xuXG5cdFx0dGhpc1tuYW1lX2NsYXNzXVtuYW1lX21ldGhvZF0gPSBwYXJzZUludCgkKG9iaikudmFsKCkpO1xuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH0sXG5cblx0dXBkYXRlX2Zyb21faW5wdXRfdGV4dCA6IGZ1bmN0aW9uKG9iail7XG5cdFx0dmFyIG5hbWVfY2xhc3MgPSAkKG9iaikuYXR0cignb2JqJyk7XG5cdFx0dmFyIG5hbWVfbWV0aG9kID0gJChvYmopLmF0dHIoJ25hbWUnKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZyggbmFtZV9jbGFzcywgbmFtZV9tZXRob2QgKTtcblxuXHRcdHRoaXNbbmFtZV9jbGFzc11bbmFtZV9tZXRob2RdID0gJChvYmopLnZhbCgpO1xuXHRcdGNhbnZhcy5kcmF3KCk7IFxuXHR9LFxuXG5cdHVwZGF0ZV9mcm9tX3NlbGVjdCA6IGZ1bmN0aW9uKG9iail7XG5cdFx0dmFyIG5hbWVfY2xhc3MgPSAkKG9iaikuYXR0cignb2JqJyk7XG5cdFx0dmFyIG5hbWVfbWV0aG9kID0gJChvYmopLmF0dHIoJ25hbWUnKTsgXG5cblx0XHR0aGlzW25hbWVfY2xhc3NdW25hbWVfbWV0aG9kXSA9ICQob2JqKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCduYW1lJyk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSwgXG5cblx0dXBkYXRlX2Zyb21fc3dpdGNoIDogZnVuY3Rpb24ob2JqKXtcblxuXHRcdHZhciBuYW1lX2NsYXNzID0gJChvYmopLmF0dHIoJ29iaicpO1xuXHRcdHZhciBuYW1lX21ldGhvZCA9ICQob2JqKS5hdHRyKCduYW1lJyk7XG5cblx0XHRpZighdGhpc1tuYW1lX2NsYXNzXVtuYW1lX21ldGhvZF0gKXtcblx0XHRcdCQob2JqKS5hdHRyKFwidmFsdWVcIiwndHJ1ZScpO1xuXHRcdFx0JChvYmopLnJlbW92ZUNsYXNzKCdzd2l0Y2gtb2ZmJyk7XG5cdFx0XHQkKG9iaikuYWRkQ2xhc3MoJ3N3aXRjaC1vbicpO1xuXHRcdFx0dGhpc1tuYW1lX2NsYXNzXVtuYW1lX21ldGhvZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRlbHNleyAvL3d5xYLEhWN6YW15IHByemXFgsSFY3puaWtcblx0XHRcdCQob2JqKS5hdHRyKFwidmFsdWVcIiwnZmFsc2UnKTtcblx0XHRcdCQob2JqKS5yZW1vdmVDbGFzcygnc3dpdGNoLW9uJyk7XG5cdFx0XHQkKG9iaikuYWRkQ2xhc3MoJ3N3aXRjaC1vZmYnKTtcblx0XHRcdHRoaXNbbmFtZV9jbGFzc11bbmFtZV9tZXRob2RdID0gZmFsc2U7XG5cdFx0fVxuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH1cbn1cbiIsIi8vIOKVlOKVpuKVl+KVlOKVkOKVl+KVpiDilabilZTilZDilZfilZTilZDilZdcbi8vIOKVkeKVkeKVkeKVkSDilZHilZEg4pWR4pWa4pWQ4pWX4pWR4pWjIFxuLy8g4pWpIOKVqeKVmuKVkOKVneKVmuKVkOKVneKVmuKVkOKVneKVmuKVkOKVnVxuXG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb3VzZSc7XG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcblxuLy9vYmlla3QgbXlzemtpIChkbyBvZ2FybmllY2lhKVxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdG1vdXNlX2Rvd24gOiBmYWxzZSxcblx0Y2xpY2tfb2JqIDogbnVsbCxcblxuXHR0bXBfbW91c2VfeCA6IG51bGwsIC8vem1pZW5uZSB0eW1jemFzb3dlIHVtb8W8bGl3aWFqxIVjZSBwcnplc3V3YW5pZSB0xYJhXG5cdHRtcF9tb3VzZV95IDogbnVsbCwgLy96bWllbm5lIHR5bWN6YXNvd2UgdW1vxbxsaXdpYWrEhWNlIHByemVzdXdhbmllIHTFgmFcblxuXHRsZWZ0IDogbnVsbCwgLy9wb3p5Y2phIHggbXlzemtpXG5cdHRvcCA6IG51bGwsIC8vcG96eWNqYSB5IG15c3praVxuXHRwYWRkaW5nX3ggOiBudWxsLCAvL3BvenljamEgeCBteXN6a2kgb2QgZ8Ozcm5laiBrcmF3xJlkemlcblx0cGFkZGluZ195IDogbnVsbCwgLy9wb3p5Y2phIHkgbXlzemtpIG9kIGfDs3JuZWoga3Jhd8SZZHppXG5cdG9mZnNldF94IDogbnVsbCwgLy9vZmZzZXQgeCBvYmlla3R1IGtsaWtuacSZdGVnb1xuXHRvZmZzZXRfeSA6IG51bGwsIC8vb2Zmc2V0IHkgb2JpZWt0dSBrbGlrbmnEmXRlZ29cblxuXHQvL2Z1bmNramEgd3lrcnl3YWrEhWNhIHcgY28ga2xpa25pxJl0byBwb2JpZXJhasSFY2EgcGFkZGluZyBrbGlrbmnEmWNpYSBvcmF6IHphcGlzdWrEhWNhIGtsaWtuacSZY2llXG5cdHNldF9tb3VzZV9kb3duIDogZnVuY3Rpb24oZXZlbnQpe1xuXG5cdFx0aWYgKCFldmVudCkge2V2ZW50ID0gd2luZG93LmV2ZW50O30gLy9sYXRhIGRsYSBtb3ppbGxpXG5cdFx0dmFyIG9iaiA9IGV2ZW50LnRhcmdldDtcblxuXHRcdC8vamXFm2xpIGVsZW1lbnQgbmEga3TDs3J5IGtsaWtuacSZdG8gbWEgYXRyeWJ1dCBuYW1lY2xpY2sgcHJ6eXBpc3VqZW15IGdvIGRvIG9iaWVrdHUgbXlzemtpXG5cdFx0aWYodHlwZW9mKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCduYW1lY2xpY2snKSkgIT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHR0aGlzLmNsaWNrX29iaiA9ICQoZXZlbnQudGFyZ2V0KS5hdHRyKCduYW1lY2xpY2snKTtcblxuXHRcdFx0dmFyIHBvc2l0aW9uID0gJChvYmopLm9mZnNldCgpO1xuXHRcdFx0dGhpcy5vZmZzZXRfeCA9IHBvc2l0aW9uLmxlZnQ7XG5cdFx0XHR0aGlzLm9mZnNldF95ID0gcG9zaXRpb24udG9wO1xuXHRcdFx0dGhpcy5wYWRkaW5nX3ggPSB0aGlzLmxlZnQgLSBwb3NpdGlvbi5sZWZ0O1xuXHRcdFx0dGhpcy5wYWRkaW5nX3kgPSB0aGlzLnRvcCAtIHBvc2l0aW9uLnRvcDtcblx0XHRcdG1vdXNlLm1vdXNlX2Rvd24gPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnRtcF9tb3VzZV94ID0gaW1hZ2UueDtcblx0XHRcdHRoaXMudG1wX21vdXNlX3kgPSBpbWFnZS55O1xuXHRcdH1cblx0fSxcblxuXHRzZXRfcG9zaXRpb24gOiBmdW5jdGlvbihldmVudCl7XG5cdFx0dGhpcy5sZWZ0ID0gZXZlbnQucGFnZVgsXG5cdFx0dGhpcy50b3AgPSBldmVudC5wYWdlWVxuXHR9LFxuXG5cdC8vZnVua2NqYSB3eWtvbnl3YW5hIHBvZGN6YXMgd2NpxZtuaWVjaWEgcHJ6eWNpa3NrdSBteXN6a2kgKHcgemFsZcW8bm/Fm2NpIG9kIGtsaWtuacSZdGVnbyBlbGVtZW50dSB3eWtvbnVqZW15IHLDs8W8bmUgcnplY3p5KVxuXHRtb3VzZW1vdmUgOiBmdW5jdGlvbigpe1xuXHRcdHN3aXRjaCh0aGlzLmNsaWNrX29iail7XG5cdFx0XHRjYXNlICdyaWdodF9yZXNpemUnOlxuXHRcdFx0XHQvL3JvenN6ZXJ6YW5pZSBjYW52YXNhIHcgcHJhd29cblx0XHRcdFx0dmFyIHBvc2l0aW9uID0gJCgnI2NhbnZhc19ib3ggI2NhbnZhc193cmFwcGVyJykuY2hpbGRyZW4oJ2NhbnZhcycpLm9mZnNldCgpO1xuXHRcdFx0XHR2YXIgbmV3X3dpZHRoID0gdGhpcy5sZWZ0IC0gdGhpcy5wYWRkaW5nX3ggLSBwb3NpdGlvbi5sZWZ0XG5cdFx0XHRcdGlmKG5ld193aWR0aCA8IHNjcmVlbi53aWR0aCAtIDEwMCl7XG5cdFx0XHRcdFx0Y2FudmFzLnJlc2l6ZV93aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdib3R0b21fcmVzaXplJzpcblx0XHRcdFx0Ly96bWllbmlhbXkgd3lzb2tvxZvEhyBjYW52YXNhXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9ICQoJyNjYW52YXNfYm94ICNjYW52YXNfd3JhcHBlcicpLmNoaWxkcmVuKCdjYW52YXMnKS5vZmZzZXQoKTtcblx0XHRcdFx0dmFyIG5ld19oaWdodCA9IHRoaXMudG9wIC0gdGhpcy5wYWRkaW5nX3kgLSBwb3NpdGlvbi50b3A7XG5cdFx0XHRcdGNhbnZhcy5yZXNpemVfaGVpZ2h0KG5ld19oaWdodCk7XG5cdFx0XHRcdGNhbnZhcy5kcmF3KG5ld19oaWdodCk7XG5cblxuXHRcdFx0XHRcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdpbWFnZV9yZXNpemUnOlxuXG5cdFx0XHRcdGlmKGltYWdlLm9iaiAhPT0gdW5kZWZpbmVkKXtcblxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9ICQoJyNjYW52YXNfYm94ICNjYW52YXNfd3JhcHBlcicpLmNoaWxkcmVuKCdjYW52YXMnKS5vZmZzZXQoKTtcblx0XHRcdFx0XHR2YXIgeF9hY3R1YWwgPSB0aGlzLmxlZnQgLSBwb3NpdGlvbi5sZWZ0O1x0Ly9ha3R1YWxuYSBwb3p5Y2phIG15c3praVxuXHRcdFx0XHRcdHZhciBzdWJzdHJhY3QgPSBpbWFnZS54ICsgaW1hZ2Uud2lkdGggLSB4X2FjdHVhbCArIHRoaXMucGFkZGluZ194O1xuXHRcdFx0XHRcdHZhciBmYWNvciA9IGltYWdlLndpZHRoIC8gaW1hZ2UuaGVpZ2h0O1xuXG5cdFx0XHRcdFx0aWYgKGltYWdlLndpZHRoIC0gc3Vic3RyYWN0ID4gMTAwKXtcblx0XHRcdFx0XHRcdGltYWdlLndpZHRoIC09IHN1YnN0cmFjdDtcblx0XHRcdFx0XHRcdGltYWdlLmhlaWdodCAtPSBzdWJzdHJhY3QvZmFjb3I7XG5cdFx0XHRcdFx0XHRjYW52YXMuZHJhdygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyDilZTilZDilZfilZTilZfilZQgIOKVlOKVkOKVl+KVlOKVkOKVl+KVlOKVpuKVl+KVlOKVkOKVl+KVlOKVkOKVl+KVlOKVkOKVl+KVpuKVkOKVl+KVpiDilaZcbi8vIOKVkSDilZHilZHilZHilZEgIOKVkSAg4pWg4pWQ4pWjIOKVkSDilZHilaMg4pWRIOKVpuKVkSDilZHilaDilabilZ3ilZrilabilZ1cbi8vIOKVmuKVkOKVneKVneKVmuKVnSAg4pWa4pWQ4pWd4pWpIOKVqSDilakg4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWp4pWa4pWQIOKVqSBcblxuaW1wb3J0IHBvaW50ZXJzIGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGNhdGVnb3JpZXMgZnJvbSAnLi9jYXRlZ29yaWVzJztcbmltcG9ydCBjbG91ZCBmcm9tICcuL2Nsb3VkJztcbmltcG9ydCBtb3VzZSBmcm9tICcuL21vdXNlJztcblxuLy9vYmlla3QgbcOzd2nEhWN5IG5hbSBuYWQgamFrxIUga2F0ZWdvcmlhIGplc3RlxZtteVxuZXhwb3J0IGRlZmF1bHQge1xuXHRcblx0Y2FudmFzX29mZnNldF90b3AgOiAxODcsXG5cdGNhbnZhc19vZmZzZXRfbGVmdCA6IDEwLFxuXHRuYW1lIDogbnVsbCxcblx0bnVtYmVyIDogbnVsbCxcblxuXHQvL2Z1bmtjamEgendyYWNhasSFY2EgYWt0dWFsbsSFIGthdGVnb3JpxJkgbmFkIGt0w7NyxIUgem5hamR1amUgc2nEmSBrdXJzb3Jcblx0c2V0IDogZnVuY3Rpb24oKXtcblx0XHRcblx0XHR2YXIgbGVmdCA9IG1vdXNlLmxlZnQgLSB0aGlzLmNhbnZhc19vZmZzZXRfbGVmdDtcblx0XHR2YXIgdG9wID0gbW91c2UudG9wIC0gdGhpcy5jYW52YXNfb2Zmc2V0X3RvcDtcblx0XHR2YXIgcm93ID0gTWF0aC5jZWlsKCB0b3AgLyAocG9pbnRlcnMuc2l6ZSArIHBvaW50ZXJzLnBhZGRpbmdfeSkgKTtcblx0XHQvL2NvbnNvbGUubG9nKGxlZnQsdG9wLHRoaXMuY2FudmFzX29mZnNldF9sZWZ0LHRoaXMuY2FudmFzX29mZnNldF90b3ApO1xuXHRcdGlmKChwb2ludGVycy50cmFuc2xhdGVfbW9kdWxvKSAmJiAocm93ICUgMiAhPSAwKSl7XG5cdFx0XHR2YXIgY29sdW1uID0gTWF0aC5jZWlsKCAobGVmdCArIChwb2ludGVycy5zaXplLzIpKS8gKHBvaW50ZXJzLnNpemUgKyBwb2ludGVycy5wYWRkaW5nX3gpICkgLSAxO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0dmFyIGNvbHVtbiA9IE1hdGguY2VpbCggbGVmdCAvIChwb2ludGVycy5zaXplICsgcG9pbnRlcnMucGFkZGluZ194KSApO1xuXHRcdH1cblxuXHRcdHRyeXtcblx0XHRcdHZhciBjYXRlZ29yeV9udW0gPSBwb2ludGVycy5wb2ludGVyc1tyb3ctMV1bY29sdW1uLTFdO1xuXHRcdFx0dmFyIGNhdGVnb3J5X25hbWUgPSBjYXRlZ29yaWVzLmNhdGVnb3J5W2NhdGVnb3J5X251bV1bMF07XG5cdFx0fVxuXHRcdGNhdGNoKGUpe1xuXHRcdFx0dGhpcy5uYW1lID0gbnVsbDtcblx0XHRcdHRoaXMubnVtYmVyID0gbnVsbDtcblx0XHR9XG5cdFx0XG5cdFx0aWYoKGNhdGVnb3J5X25hbWUgPT0gJ3B1c3R5JykgfHwgKGNhdGVnb3J5X25hbWUgPT0gJ2d1bXVqJykpe1xuXHRcdFx0dGhpcy5uYW1lID0gbnVsbDtcblx0XHRcdHRoaXMubnVtYmVyID0gbnVsbDtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHRoaXMubmFtZSA9IGNhdGVnb3J5X25hbWU7XG5cdFx0XHR0aGlzLm51bWJlciA9IGNhdGVnb3J5X251bTtcblx0XHR9XG5cblx0fVxuXG59XG5cblxuIiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWmICDilZTilZDilZfilZTilabilZfilZTilZDilZdcbi8vIOKVoOKVkOKVneKVoOKVkOKVo+KVkSAg4pWR4pWjICDilZEg4pWa4pWQ4pWXXG4vLyDilakgIOKVqSDilanilanilZDilZ3ilZrilZDilZ0g4pWpIOKVmuKVkOKVnVxuXG5pbXBvcnQgY2F0ZWdvcmllcyBmcm9tICcuL2NhdGVnb3JpZXMnO1xuaW1wb3J0IGV4Y2VsIGZyb20gJy4vZXhjZWwnO1xuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgbGVnZW5kcyBmcm9tICcuL2xlZ2VuZHMnO1xuaW1wb3J0IHBhbGV0cyBmcm9tICcuL3BhbGV0cyc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXG4gIC8vdmFsX21heCA6IG51bGwsXG4gIC8vdmFsX21pbiA6IG51bGwsXG4gIC8vdmFsX2ludGVydmFsIDogbnVsbCwgICBcbiAgLy9wYWxldHNfYWN0aXZlIDogMCxcbiAgLy92YWx1ZSA6IC0xLCBcbiAgLy9jYXRlZ29yeSA6IC0xLFxuXG4gIC8vcG9kc3Rhd293ZSBwYWxldHkga29sb3LDs3cgKCBvc3RhdG5pYSBwYWxldGEgamVzdCBuYXN6xIUgd8WCYXNuxIUgZG8gemRlZmluaW93YW5pYSApXG5cblxuICBzaG93IDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLnNob3dfY29sb3IoKTtcbiAgICB0aGlzLnNob3dfcGFsZXRzKCk7XG4gICAgdGhpcy5zaG93X3NlbGVjdCgpO1xuICAgIC8vbGF5ZXJzLmRhdGEuY29sb3JfYWN0aXZlW2xheWVycy5hY3RpdmVdID0gbGF5ZXJzLmNvbG9yc19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV07XG4gIH0sXG5cbiAgc2hvd19zZWxlY3QgOiBmdW5jdGlvbigpe1xuICAgIFxuICAgIHZhciBsX2V4Y2VsID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uZXhjZWw7XG5cbiAgICAvL3d5xZt3aWV0bGFteSBwYW5lbCBkbyB3eWJvcnUga29sdW1ueSBrYXRlZ29yaWlcbiAgICB2YXIgYWRkX2h0bWwgPSAnPG9wdGlvbiBjb2w9XCItMVwiPnd5Ymllcno8L29wdGlvbj4nO1xuICAgIGZvcih2YXIgaSA9IDAsIGlfbWF4ID0gbF9leGNlbC5kYXRhWzBdLmxlbmd0aDsgIGkgPCBpX21heDsgaSsrKXtcbiAgICAgIGlmKGxfZXhjZWwuZGF0YVswXVtpXSE9ICcnKXtcbiAgICAgICAgaWYoaSA9PSBsYXllcnMuY2F0ZWdvcnlbbGF5ZXJzLmFjdGl2ZV0pe1xuICAgICAgICAgIGFkZF9odG1sICs9ICc8b3B0aW9uIGNvbD1cIicraSsnXCIgc2VsZWN0ZWQ+JyArbF9leGNlbC5kYXRhWzBdW2ldKyAnPC9vcHRpb24+JzsgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgYWRkX2h0bWwgKz0gJzxvcHRpb24gY29sPVwiJytpKydcIj4nICtsX2V4Y2VsLmRhdGFbMF1baV0rICc8L29wdGlvbj4nOyAgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAkKCcjZXhjZWxfYm94IHNlbGVjdC5jYXRlZ29yeScpLmh0bWwoIGFkZF9odG1sICk7XG5cbiAgICAvL3d5xZt3aWV0bGFteSBwYW5lbCBkbyB3eWJvcnUga29sdW1ueSB3YXJ0b8WbY2lcbiAgICBhZGRfaHRtbCA9ICc8b3B0aW9uIGNvbD1cIi0xXCI+d3liaWVyejwvb3B0aW9uPic7XG4gICAgZm9yKHZhciBpID0gMCwgaV9tYXggPSBsX2V4Y2VsLmRhdGFbMF0ubGVuZ3RoOyAgaSA8IGlfbWF4OyBpKyspe1xuICAgICAgaWYobF9leGNlbC5kYXRhWzBdW2ldIT0gJycpe1xuICAgICAgICBpZihpID09IGxheWVycy52YWx1ZVtsYXllcnMuYWN0aXZlXSl7XG4gICAgICAgICAgYWRkX2h0bWwgKz0gJzxvcHRpb24gY29sPVwiJytpKydcIiBzZWxlY3RlZD4nICtsX2V4Y2VsLmRhdGFbMF1baV0rICc8L29wdGlvbj4nOyAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICBhZGRfaHRtbCArPSAnPG9wdGlvbiBjb2w9XCInK2krJ1wiPicgK2xfZXhjZWwuZGF0YVswXVtpXSsgJzwvb3B0aW9uPic7ICBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAkKCcjZXhjZWxfYm94IHNlbGVjdC52YWx1ZScpLmh0bWwoIGFkZF9odG1sICk7XG5cbiAgICAvL2tvbG9ydWplbXkgb2Rwb3dpZWRuaW8gZXhjZWxhXG4gICAgJCgnI2V4Y2VsX3dyYXBwZXIgLnRkJykucmVtb3ZlQ2xhc3MoXCJ2YWx1ZVwiKTtcbiAgICAkKCcjZXhjZWxfd3JhcHBlciAudGQnKS5yZW1vdmVDbGFzcyhcImNhdGVnb3J5XCIpO1xuICAgIFxuICAgIGlmKCBsYXllcnMudmFsdWVbbGF5ZXJzLmFjdGl2ZV0gIT0gLTEpe1xuICAgICAgJCgnI2V4Y2VsX3dyYXBwZXIgLnRkW2NvbD1cIicrKGxheWVycy52YWx1ZVtsYXllcnMuYWN0aXZlXSsxKSsnXCJdJykuYWRkQ2xhc3MoXCJ2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICBpZiggbGF5ZXJzLmNhdGVnb3J5W2xheWVycy5hY3RpdmVdICE9IC0xKXtcbiAgICAgICQoJyNleGNlbF93cmFwcGVyIC50ZFtjb2w9XCInKyhsYXllcnMuY2F0ZWdvcnlbbGF5ZXJzLmFjdGl2ZV0rMSkrJ1wiXScpLmFkZENsYXNzKFwiY2F0ZWdvcnlcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vd3liaWVyYW15IGtvbHVtbsSZIGthdGVnb3JpaSAob2JzemFyw7N3KVxuICBzZXRfY2F0ZWdvcnkgOiBmdW5jdGlvbihvYmope1xuICAgIGxheWVycy5jYXRlZ29yeVtsYXllcnMuYWN0aXZlXSA9IHBhcnNlRmxvYXQoJChcIiNleGNlbF9ib3ggc2VsZWN0LmNhdGVnb3J5IG9wdGlvbjpzZWxlY3RlZFwiKS5hdHRyKCdjb2wnKSk7XG4gICAgJCgnI2V4Y2VsX3dyYXBwZXIgLnRkJykucmVtb3ZlQ2xhc3MoXCJjYXRlZ29yeVwiKTtcbiAgICAkKCcjZXhjZWxfd3JhcHBlciAudGRbY29sPVwiJysobGF5ZXJzLmNhdGVnb3J5W2xheWVycy5hY3RpdmVdKzEpKydcIl0nKS5hZGRDbGFzcyhcImNhdGVnb3J5XCIpO1xuICAgIC8vY2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcbiAgfSwgXG5cbiAgLy93eWJpZXJhbXkga29sdW1uZSB3YXJ0b8WbY2kgaSB1c3Rhd2lhbXkgbmFqbW5pZWpzesSFIGkgbmFqd2nEmWtzesSFIHdhcnRvxZvEh1xuICBzZXRfdmFsdWUgOiBmdW5jdGlvbihvYmope1xuICAgIHZhciBsX2V4Y2VsID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uZXhjZWw7XG4gICAgdmFyIHZhbHVlX3RtcCA9IHBhcnNlRmxvYXQoJChcIiNleGNlbF9ib3ggc2VsZWN0LnZhbHVlIG9wdGlvbjpzZWxlY3RlZFwiKS5hdHRyKCdjb2wnKSk7XG5cblxuICAgIC8vemFiZXpwaWVjemVuaWUgcHJ6ZWQgd3licmFuaWVtIGtvbHVtbnkgemF3aWVyYWrEhWNlaiB0ZWtzdFxuICAgIHZhciBjaGVjayA9IHRydWU7XG4gICAgZm9yKHZhciBpID0gMSwgaV9tYXggPSBsX2V4Y2VsLmRhdGEubGVuZ3RoOyBpIDwgaV9tYXg7IGkrKyl7XG4gICAgICBpZiAoKCEkLmlzTnVtZXJpYyhTdHJpbmcobF9leGNlbC5kYXRhW2ldW3ZhbHVlX3RtcF0pLnJlcGxhY2UoJywnLCcuJykpKSAmJiAgKGxfZXhjZWwuZGF0YVtpXVt2YWx1ZV90bXBdICE9ICcnKSl7IFxuXG4gICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBuaWUgamVzdCBsaWN6YmEhOiAnK2xfZXhjZWwuZGF0YVtpXVt2YWx1ZV90bXBdKTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zcHJhd2R6YW15IGN6eSB3IHphem5hY3pvbmVqIGtvbHVtbmllIHpuYWpkdWplIHNpxJkgd2llcnN6IHogdGVrc3RlbVxuICAgIGlmKGNoZWNrKXtcbiAgICAgIC8vamVzbGkgbmllIHd5YmllcmFteSBkYW7EhSBrb2x1bW7EmVxuICAgICAgbGF5ZXJzLnZhbHVlW2xheWVycy5hY3RpdmVdID0gdmFsdWVfdG1wO1xuICAgICAgJCgnI2V4Y2VsX3dyYXBwZXIgLnRkJykucmVtb3ZlQ2xhc3MoXCJ2YWx1ZVwiKTtcbiAgICAgICQoJyNleGNlbF93cmFwcGVyIC50ZFtjb2w9XCInKyhsYXllcnMudmFsdWVbbGF5ZXJzLmFjdGl2ZV0rMSkrJ1wiXScpLmFkZENsYXNzKFwidmFsdWVcIik7XG4gICAgICB0aGlzLnNldF9taW5fbWF4X3ZhbHVlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAvL2plxZtsaSB0YWsgendyYWNhbXkgYsWCxIVkXG4gICAgICBhbGVydCgnd3licmFuYSBrb2x1bW5hIHphd2llcmEgd2FydG/Fm2NpIHRla3N0b3dlJylcbiAgICAgIHRoaXMuc2hvd19zZWxlY3QoKTtcbiAgICB9XG5cbiAgfSxcblxuICBzZXRfbWluX21heF92YWx1ZSA6IGZ1bmN0aW9uKCl7IFxuXG4gICAgdmFyIGxfZXhjZWwgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5leGNlbDtcbiAgICB2YXIgdG1wX3ZhbHVlID0gbGF5ZXJzLnZhbHVlW2xheWVycy5hY3RpdmVdO1xuICAgIGlmKHRtcF92YWx1ZSAhPSAtMSl7XG4gICAgICAvL3d5c3p1a3VqZW15IG5ham1uaWVqc3phIGkgbmFqd2nEmWtzesSFIHdhcnRvxZvEhyB3IGtvbHVtbmllIHdhcnRvxZtjaVxuICAgICAgaWYoIGxheWVycy52YWx1ZVt0bXBfdmFsdWVdICE9IC0xICl7XG4gICAgICAgIFxuICAgICAgICB2YXIgdG1wX21pbiA9IHBhcnNlRmxvYXQoU3RyaW5nKGxfZXhjZWwuZGF0YVsxXVt0bXBfdmFsdWVdKS5yZXBsYWNlKCcsJywnLicpKTtcbiAgICAgICAgdmFyIHRtcF9tYXggPSAgcGFyc2VGbG9hdChTdHJpbmcobF9leGNlbC5kYXRhWzFdW3RtcF92YWx1ZV0pLnJlcGxhY2UoJywnLCcuJykpO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDEsIGlfbWF4ID0gbF9leGNlbC5kYXRhLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspe1xuXG4gICAgICAgICAgdmFyIG51bV90bXAgPSBwYXJzZUZsb2F0KFN0cmluZyhsX2V4Y2VsLmRhdGFbaV1bdG1wX3ZhbHVlXSkucmVwbGFjZSgnLCcsJy4nKSk7XG5cbiAgICAgICAgICBpZigodG1wX21pbiA+IG51bV90bXApICYmIChudW1fdG1wICE9IFwiXCIpKXsgdG1wX21pbiA9IG51bV90bXA7IH1cbiAgICAgICAgICBpZigodG1wX21heCA8IG51bV90bXApICYmIChudW1fdG1wICE9IFwiXCIpKXsgdG1wX21heCA9IG51bV90bXA7IH1cbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwibWluIG1heCB2YWx1ZTogXCIsdG1wX21pbiwgdG1wX21heCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCd3eW5pazogJyx0bXBfbWluLHRtcF9tYXgpO1xuXG4gICAgICBsYXllcnMubWluX3ZhbHVlW2xheWVycy5hY3RpdmVdID0gdG1wX21pblxuICAgICAgbGF5ZXJzLm1heF92YWx1ZVtsYXllcnMuYWN0aXZlXSA9IHRtcF9tYXg7XG5cbiAgICAgIC8vYWt0dWFsaXp1amVteSB0YWJsaWPEmSBsZWdlbmRcbiAgICAgIGxlZ2VuZHMudXBkYXRlKCk7XG4gICAgfVxuICB9LFxuXG4gIHNob3dfY29sb3IgOiBmdW5jdGlvbigpe1xuICAgIC8vd3nFm3dpZXRsYW15IHBpZXJ3c3phbGlzdMSZIGtvbG9yw7N3XG4gICAgdmFyIGh0bWwgPSAnJzsgXG4gXG4gICAgZm9yICh2YXIgaSA9IDAsIGlfbWF4ID0gdGhpcy5jb2xvcnNbMF0ubGVuZ3RoOyBpPGlfbWF4OyBpKyspe1xuXG4gICAgICBpZihsYXllcnMuY29sb3JzX3Bvc1tsYXllcnMuYWN0aXZlXVtpXSA9PSAxKXtcbiAgICAgICAgaHRtbCArPSAnPHNwYW4gY2xhc3M9XCJhY3RpdmVcIiBzdHlsZT1cImJhY2tncm91bmQ6Jyt0aGlzLmNvbG9yc1tsYXllcnMucGFsZXRzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXV1baV0rJ1wiPjwvc3Bhbj4nO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgaHRtbCArPSAnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kOicrdGhpcy5jb2xvcnNbbGF5ZXJzLnBhbGV0c19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV1dW2ldKydcIj48L3NwYW4+JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkKCcjcGFsZXRzICNzZWxlY3QnKS5odG1sKCBodG1sICk7XG4gICAgXG4gICAgJCgnI3BhbGV0cyAjc2VsZWN0ID4gc3BhbicpLmNsaWNrKGZ1bmN0aW9uKCl7IHBhbGV0cy5zZWxlY3RfY29sb3IodGhpcyk7IH0pO1xuXG4gIH0sXG5cbiAgc2hvd19wYWxldHMgOiBmdW5jdGlvbigpe1xuICAgIFxuICAgIC8vd3lzd2lldGxhbXkgd3N6eXN0a2llIHBhbGV0eVxuICAgIHZhciBodG1sID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlfbWF4ID0gdGhpcy5jb2xvcnMubGVuZ3RoO2kgPCBpX21heDsgaSsrKXtcbiAgICAgIFxuICAgICAgaWYoaSA9PSBsYXllcnMucGFsZXRzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXSl7XG4gICAgICAgIGh0bWwgKz0gJzxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+JztcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGh0bWwgKz0gJzxzcGFuPic7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBqX21heCA9IHRoaXMuY29sb3JzWzBdLmxlbmd0aDsgaiA8IGpfbWF4OyBqKyspe1xuICAgICAgICBodG1sICs9ICc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQ6JyArIHRoaXMuY29sb3JzW2ldW2pdICsgJ1wiPjwvc3Bhbj4nO1xuICAgICAgfVxuICAgICAgaHRtbCArPSAnPC9zcGFuPic7XG5cbiAgICB9XG4gICAgJCgnI3BhbGV0cyAjYWxsJykuaHRtbCggaHRtbCApO1xuICAgICQoJyNwYWxldHMgI2FsbCA+IHNwYW4nKS5jbGljayhmdW5jdGlvbigpeyBwYWxldHMuc2VsZWN0X3BhbGV0cyh0aGlzKTt9KTtcbiBcbiAgfSxcblxuICAvL3phem5hY3phbXkga29ua3JldG5lIGtvbG9yeSBkbyB3ecWbd2lldGxlbmlhXG4gIHNlbGVjdF9jb2xvciA6IGZ1bmN0aW9uKG9iail7XG4gICAgaWYoKGxheWVycy52YWx1ZVtsYXllcnMuYWN0aXZlXSAhPSAtMSkgJiYgKGxheWVycy5jYXRlZ29yeVtsYXllcnMuYWN0aXZlXSAhPSAtMSkpe1xuICAgICAgaWYoICQob2JqKS5oYXNDbGFzcygnYWN0aXZlJykgKXtcbiAgICAgICAgbGF5ZXJzLmNvbG9yc19wb3NbbGF5ZXJzLmFjdGl2ZV1bJChvYmopLmluZGV4KCldID0gMDtcbiAgICAgICAgJChvYmopLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGxheWVycy5jb2xvcnNfcG9zW2xheWVycy5hY3RpdmVdWyQob2JqKS5pbmRleCgpXSA9IDE7XG4gICAgICAgICQob2JqKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnNlX2NvbG9yKCk7XG4gICAgICBwYWxldHMuc2V0X21pbl9tYXhfdmFsdWUoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy9kb2RhamVteSBkbyB0YWJsaWN5IGFrdHl3bnljaCBrb2xvcsOzdyB0ZSBrdMOzcmUgc8SFIHphem5hY3pvbmVcbiAgcGFyc2VfY29sb3IgOiBmdW5jdGlvbigpe1xuICAgIGxheWVycy5jb2xvcnNfYWN0aXZlW2xheWVycy5hY3RpdmVdID0gW107XG4gICAgIGZvciAodmFyIGkgPSAwLCBpX21heCA9IHRoaXMuY29sb3JzWzBdLmxlbmd0aDsgaTxpX21heDsgaSsrKXtcblxuICAgICAgaWYoICQoJyNwYWxldHMgI3NlbGVjdCBzcGFuJykuZXEoaSkuaGFzQ2xhc3MoJ2FjdGl2ZScpICl7XG4gICAgICAgIGxheWVycy5jb2xvcnNfYWN0aXZlW2xheWVycy5hY3RpdmVdLnB1c2goIHJnYjJoZXgoJCgnI3BhbGV0cyAjc2VsZWN0IHNwYW4nKS5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKSkgKTtcbiAgICAgIH1cbiAgICAgfVxuICAgIC8vY2F0ZWdvcmllcy5jb2xvcl9mcm9tX2V4Y2VsKCk7XG4gICAgLy9mdW5rY2phIHBvbW9jbmljemFcbiAgICBmdW5jdGlvbiByZ2IyaGV4KHJnYikge1xuICAgICAgcmdiID0gcmdiLm1hdGNoKC9ecmdiXFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKVxcKSQvKTtcbiAgICAgIFxuICAgICAgZnVuY3Rpb24gaGV4KHgpIHtcbiAgICAgICAgcmV0dXJuIChcIjBcIiArIHBhcnNlSW50KHgpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiI1wiICsgaGV4KHJnYlsxXSkgKyBoZXgocmdiWzJdKSArIGhleChyZ2JbM10pO1xuICAgIH1cbiAgICBsZWdlbmRzLnVwZGF0ZSgpO1xuICB9LFxuXG4gIC8vemF6bmFjemFteSBwYWxldGUga29sb3LDs3dcbiAgc2VsZWN0X3BhbGV0cyA6IGZ1bmN0aW9uKG9iail7XG4gICAgaWYoKGxheWVycy52YWx1ZVtsYXllcnMuYWN0aXZlXSAhPSAtMSkgJiYgKGxheWVycy5jYXRlZ29yeVtsYXllcnMuYWN0aXZlXSAhPSAtMSkpe1xuICAgICAgJCgnI3BhbGV0cyAjYWxsID4gc3BhbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQob2JqKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICBsYXllcnMucGFsZXRzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXSA9ICQob2JqKS5pbmRleCgpO1xuICAgICAgXG4gICAgICAvL2FrdHVhbGl6dWplbXkgcGFsZXTEmSBha3R5d255Y2gga29sb3LDs3dcbiAgICAgIGxheWVycy5jb2xvcnNfYWN0aXZlW2xheWVycy5hY3RpdmVdID0gW107XG4gICAgICBmb3IodmFyIGkgPSAwLCBpX21heCA9IGxheWVycy5jb2xvcnNfcG9zW2xheWVycy5hY3RpdmVdLmxlbmd0aDsgaSA8IGlfbWF4OyBpKyspe1xuICAgICAgICBpZihsYXllcnMuY29sb3JzX3Bvc1tsYXllcnMuYWN0aXZlXVtpXSA9PSAxKXtcbiAgICAgICAgICBsYXllcnMuY29sb3JzX2FjdGl2ZVtsYXllcnMuYWN0aXZlXS5wdXNoKCBwYWxldHMuY29sb3JzW2xheWVycy5wYWxldHNfYWN0aXZlW2xheWVycy5hY3RpdmVdXVtpXSApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vYWt0dWFsaXp1amVteSBrb2xvcnkgdyBsZWdlbmR6aWVcbiAgICAgIGZvcih2YXIgaSA9IDAsIGlfbWF4ID0gbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV0ubGVuZ3RoOyBpIDwgaV9tYXg7IGkrKyl7XG4gICAgICAgIGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW2ldWzNdID0gbGF5ZXJzLmNvbG9yc19hY3RpdmVbbGF5ZXJzLmFjdGl2ZV1baV07XG4gICAgICB9XG5cbiAgICAgIC8vd3nFm3dpZXRsYW15IG9rbmEga29sb3LDs3cgZG8gemF6bmFjemVuaWFcbiAgICAgIHBhbGV0cy5zaG93X2NvbG9yKCk7XG4gICAgICAvL3d5xZt3aWV0bGFteSBva25vIHogbGVnZW5kYW1pXG4gICAgICBsZWdlbmRzLnNob3coKTtcblxuICAgICAgLy9ha3R1YWxpenVqZW15IGtvbG9yeSBuYSBtYXBpZVxuICAgICAgY2F0ZWdvcmllcy51cGRhdGVfY29sb3IoKTtcbiAgICB9XG4gIH1cbn1cblxuIiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWm4pWU4pWX4pWU4pWU4pWm4pWX4pWU4pWQ4pWX4pWm4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilaDilZDilZ3ilZEg4pWR4pWR4pWR4pWR4pWRIOKVkSDilZHilaMg4pWg4pWm4pWd4pWa4pWQ4pWXXG4vLyDilakgIOKVmuKVkOKVneKVqeKVneKVmuKVnSDilakg4pWa4pWQ4pWd4pWp4pWa4pWQ4pWa4pWQ4pWdXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbWVudV90b3AnO1xuaW1wb3J0IHBvaW50ZXJzIGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgZmlndXJlcyBmcm9tICcuL2ZpZ3VyZXMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG4vL21lbnUgcG9pbnRlclxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdGRyYXdfYm9yZGVyOiBmdW5jdGlvbihuZXh0KXtcblx0XHR2YXIgbF9jYW52YXMgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5jYW52YXM7XG5cdFx0dmFyIGxfcG9pbnRlcnMgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5wb2ludGVycztcblxuXHRcdHZhciB3aWR0aF9wb2ludGVyID0gbF9wb2ludGVycy5zaXplICsgbF9wb2ludGVycy5wYWRkaW5nX3gsXG5cdFx0XHRcdGhlaWdodF9wb2ludGVyID0gbF9wb2ludGVycy5zaXplICsgbF9wb2ludGVycy5wYWRkaW5nX3ksXG5cdFx0XHRcdG5vbmVfY29sb3IgPSBcInJnYmEoMCwwLDAsMClcIixcblx0XHRcdFx0Ym9yZGVyID0ge30sXG5cdFx0XHRcdGRhdGEgPSB7fTtcblx0XHRcblx0XHR2YXIgbmV4dCA9IG5leHQgfHwgZmFsc2U7XG5cblx0XHRpZigobF9wb2ludGVycy5tYWluX2tpbmQgPT0gJ3NxdWFyZScpIHx8IChsX3BvaW50ZXJzLm1haW5fa2luZCA9PSAnY2lyY2xlJykgfHwgKGxfcG9pbnRlcnMubWFpbl9raW5kID09ICdoZXhhZ29uJykgfHwgKGxfcG9pbnRlcnMubWFpbl9raW5kID09ICdoZXhhZ29uMicpKXtcblx0XHRcdFx0XG5cdFx0XHRsX2NhbnZhcy5jb250ZXh0Lmdsb2JhbEFscGhhPTE7XG5cblxuXHRcdFx0aWYoIW5leHQpe1xuXHRcdFx0XHRsX2NhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJztcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdGxfY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gbF9wb2ludGVycy5jb2xvcl9ib3JkZXI7XG5cdFx0XHR9XG5cblx0XHRcdGZvcih2YXIgcm93ID0gMDsgcm93IDwgbF9jYW52YXMuYWN0aXZlX3Jvdzsgcm93Kyspe1xuXHRcdFx0XHRmb3IodmFyIGNvbHVtbiA9IDA7IGNvbHVtbiA8IGxfY2FudmFzLmFjdGl2ZV9jb2x1bW47IGNvbHVtbisrKXtcblxuXHRcdFx0XHRcdGlmKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dICE9IDApe1xuXG5cdFx0XHRcdFx0XHRib3JkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdHRvcDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHRvcF9sZWZ0IDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHRvcF9yaWdodCA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRyaWdodDogZmFsc2Vcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8vcnlzdWplbXkgcG/FgsOzd2thbWlcblx0XHRcdFx0XHRcdC8vc3ByYXdkemFteSBjenkgbWFteSB3xYLEhWN6b27EhSBvcGNqZSBtb2R1bG9cblx0XHRcdFx0XHRcdGlmKHJvdy0xID49IDApe1xuXHRcdFx0XHRcdFx0XHRpZighcG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbyl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9qZcWbbGkgbmllIHRvIHNwcmF3ZHphbXkgdHJhZHljeWpuaWUgd8WCxIVjem9uxIUgZ3JhbmljxJkgbmFkIFxuXHRcdFx0XHRcdFx0XHRcdGlmKChsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvdy0xXVtjb2x1bW5dICE9IDApJiYobF9wb2ludGVycy5wb2ludGVyc1tyb3ctMV1bY29sdW1uXSAhPSBsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9yZGVyLnRvcCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Ly9qZcWbbGkgdGFrIHRvOiBzcHJhd2R6YW15IGN6eSB3aWVyc3ogamVzdCBwcnplc3VuacSZdHlcblx0XHRcdFx0XHRcdFx0XHRpZihyb3cgJSAyID09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKGNvbHVtbi0xKSA+IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZigobF9wb2ludGVycy5wb2ludGVyc1tyb3ctMV1bY29sdW1uXSAhPSAwKSYmKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93LTFdW2NvbHVtbl0gIT0gbF9wb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0pKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3JkZXIudG9wX2xlZnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZigobF9wb2ludGVycy5wb2ludGVyc1tyb3ctMV1bY29sdW1uKzFdICE9IDApJiYobF9wb2ludGVycy5wb2ludGVyc1tyb3ctMV1bY29sdW1uKzFdICE9IGxfcG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJvcmRlci50b3BfcmlnaHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93LTFdW2NvbHVtbi0xXSAhPSAwKSYmKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93LTFdW2NvbHVtbi0xXSAhPSBsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRib3JkZXIudG9wX2xlZnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKGNvbHVtbisxKSA8PSBsX2NhbnZhcy5hY3RpdmVfY29sdW1uKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93LTFdW2NvbHVtbl0gIT0gMCkmJihsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvdy0xXVtjb2x1bW5dICE9IGxfcG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ym9yZGVyLnRvcF9yaWdodCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cdFxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZigoY29sdW1uKzEpIDw9IGxfY2FudmFzLmFjdGl2ZV9jb2x1bW4pe1xuXHRcdFx0XHRcdFx0XHRpZigobF9wb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbisxXSAhPSAwKSYmKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW4rMV0gIT0gbF9wb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0pKXtcblx0XHRcdFx0XHRcdFx0XHRib3JkZXIucmlnaHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGRhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdHggOiBjb2x1bW4qd2lkdGhfcG9pbnRlcixcblx0XHRcdFx0XHRcdFx0eSA6IHJvdypoZWlnaHRfcG9pbnRlcixcblx0XHRcdFx0XHRcdFx0c2l6ZSA6IGxfcG9pbnRlcnMuc2l6ZSxcblx0XHRcdFx0XHRcdFx0Ym9yZGVyIDogYm9yZGVyLFxuXHRcdFx0XHRcdFx0XHRsaW5lX3dpZHRoX3ggOiBwb2ludGVycy5wYWRkaW5nX3gsXG5cdFx0XHRcdFx0XHRcdGxpbmVfd2lkdGhfeSA6IHBvaW50ZXJzLnBhZGRpbmdfeSxcblx0XHRcdFx0XHRcdFx0dF9tb2R1bG8gOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Y3R4IDogbF9jYW52YXMuY29udGV4dCxcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoIChyb3cgJSAyID09IDApICYmIChwb2ludGVycy50cmFuc2xhdGVfbW9kdWxvKSApe1xuXHRcdFx0XHRcdFx0XHRkYXRhLnggPSBjb2x1bW4qd2lkdGhfcG9pbnRlciArIHdpZHRoX3BvaW50ZXIvMjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoIW5leHQpe1xuXHRcdFx0XHRcdFx0XHRmaWd1cmVzLnNxdWFyZV9ib3JkZXJfYmlnKGRhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0ZmlndXJlcy5zcXVhcmVfYm9yZGVyX3NtYWxsKGRhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoIW5leHQpe1xuXHRcdFx0dGhpcy5kcmF3X2JvcmRlcih0cnVlKTtcblx0XHR9XG5cdH0sXG5cblx0Ly9yeXNvd2FuaWUgd3N6eXN0a2ljaCBwdW5rdMOzd1xuXHRkcmF3IDogZnVuY3Rpb24oKXtcblxuXHRcdHZhciBsX3BvaW50ZXJzID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0ucG9pbnRlcnM7XG5cdFx0dmFyIGxfY2FudmFzID0gc3RvcmUubGF5ZXJzW3N0b3JlLnByb2plY3QubGF5ZXJzLmFjdGl2ZV0uY2FudmFzO1xuXHRcdHZhciB3aWR0aF9wb2ludGVyID0gbF9wb2ludGVycy5zaXplICsgbF9wb2ludGVycy5wYWRkaW5nX3g7XG5cdFx0dmFyIGhlaWdodF9wb2ludGVyID0gbF9wb2ludGVycy5zaXplICsgbF9wb2ludGVycy5wYWRkaW5nX3k7XG5cdFx0dmFyIG5vbmVfY29sb3IgPSBcInJnYmEoMCwwLDAsMClcIlxuXG5cdFx0aWYobF9wb2ludGVycy5zaG93X2FsbF9wb2ludCkgbm9uZV9jb2xvciA9IFwicmdiYSgxMjgsMTI4LDEyOCwxKVwiO1xuXG5cdFx0XHRcdGZvcih2YXIgcm93ID0gMDsgcm93IDwgbF9jYW52YXMuYWN0aXZlX3Jvdzsgcm93Kyspe1xuXHRcdFx0XHRmb3IodmFyIGNvbHVtbiA9IDA7IGNvbHVtbiA8IGxfY2FudmFzLmFjdGl2ZV9jb2x1bW47IGNvbHVtbisrKXtcblxuXHRcdFx0XHRpZihsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9PSAwKXtcblx0XHRcdFx0XHRsX2NhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IG5vbmVfY29sb3I7XG5cdFx0XHRcdFx0bF9jYW52YXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDAuNTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1x0XHRcdFx0XG5cblx0XHRcdFx0XHRpZiggKGxfcG9pbnRlcnMucG9pbnRlcnNbcm93XVtjb2x1bW5dICE9IG1lbnVfdG9wLmNhdGVnb3J5KSAmJiAobWVudV90b3AuY2F0ZWdvcnkgIT0gMCkgKXtcblx0XHRcdFx0XHRcdGxfY2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdGxfY2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRcdGxfY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gbGF5ZXJzLmNhdGVnb3J5X2NvbG9yc1tsYXllcnMuYWN0aXZlXVsgbF9wb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0gXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2goZSl7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnRVJST1IgMzkgTElORSAhICcsbF9wb2ludGVycy5wb2ludGVyc1tyb3ddW2NvbHVtbl0scm93LGNvbHVtbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoIChyb3cgJSAyID09IDApICYmIChwb2ludGVycy50cmFuc2xhdGVfbW9kdWxvKSApe1xuXHRcdFx0XHRcdHZhciBkYXRhID0ge1xuXHRcdFx0XHRcdFx0eCA6IGNvbHVtbip3aWR0aF9wb2ludGVyICsgd2lkdGhfcG9pbnRlci8yLFxuXHRcdFx0XHRcdFx0eSA6cm93KmhlaWdodF9wb2ludGVyLFxuXHRcdFx0XHRcdFx0c2l6ZSA6bF9wb2ludGVycy5zaXplLFxuXHRcdFx0XHRcdFx0Y3R4IDogbF9jYW52YXMuY29udGV4dCxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdFx0XHRcdHggOiBjb2x1bW4qd2lkdGhfcG9pbnRlcixcblx0XHRcdFx0XHRcdHkgOiByb3cqaGVpZ2h0X3BvaW50ZXIsXG5cdFx0XHRcdFx0XHRzaXplIDogbF9wb2ludGVycy5zaXplLFxuXHRcdFx0XHRcdFx0Y3R4IDogbF9jYW52YXMuY29udGV4dCxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaWd1cmVzW2xfcG9pbnRlcnMubWFpbl9raW5kXSggZGF0YSApO1xuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYobF9wb2ludGVycy5zaG93X2JvcmRlcil7XG5cdFx0XHR0aGlzLmRyYXdfYm9yZGVyKGZhbHNlKTtcblx0XHR9XG5cblx0fSxcblxuXHQvL3R3b3J6eW15IHRhYmxpY2UgcG9udGVyw7N3IChqZcWbbGkgamFracWbIHBvbnRlciBpc3RuaWVqZSB6b3N0YXdpYW15IGdvLCB3IHByenlwYWRrdSBnZHkgcG9pbnRlcmEgbmllIG1hIHR3b3J6eW15IGdvIG5hIG5vd28pXG5cdGNyZWF0ZV9hcnJheSA6IGZ1bmN0aW9uKCl7XG5cblx0XHR2YXIgbF9wb2ludGVycyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLnBvaW50ZXJzO1xuXHRcdHZhciBsX2NhbnZhcyA9IHN0b3JlLmxheWVyc1tzdG9yZS5wcm9qZWN0LmxheWVycy5hY3RpdmVdLmNhbnZhcztcblx0XHRcblx0XHRsX2NhbnZhcy5hY3RpdmVfcm93ID0gcGFyc2VJbnQoIGxfY2FudmFzLmhlaWdodCAvIChsX3BvaW50ZXJzLnNpemUgKyBsX3BvaW50ZXJzLnBhZGRpbmdfeSkgKTtcblx0XHRsX2NhbnZhcy5hY3RpdmVfY29sdW1uID0gcGFyc2VJbnQoIGxfY2FudmFzLndpZHRoIC8gKGxfcG9pbnRlcnMuc2l6ZSArIGxfcG9pbnRlcnMucGFkZGluZ194KSApO1xuXG5cdFx0aWYoIChsX3BvaW50ZXJzLnBvaW50ZXJzLmxlbmd0aCA8IGxfY2FudmFzLmFjdGl2ZV9yb3cpIHx8IChsX3BvaW50ZXJzLnBvaW50ZXJzWzBdLmxlbmd0aCA8IGxfY2FudmFzLmFjdGl2ZV9jb2x1bW4pIClcblx0XHR7XG5cdFx0XHRmb3IgKHZhciByb3cgPSAwOyByb3cgPCBsX2NhbnZhcy5hY3RpdmVfcm93OyByb3crKylcblx0XHRcdHtcblx0XHRcdFx0Zm9yICh2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgbF9jYW52YXMuYWN0aXZlX2NvbHVtbjsgY29sdW1uKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd10gPT0gdW5kZWZpbmVkKSBsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd10gPSBuZXcgQXJyYXkoKTtcblx0XHRcdFx0XHRpZihsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9PSB1bmRlZmluZWQpXHRsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0dXBkYXRlX3BvaW50IDogZnVuY3Rpb24oeSx4LHlfbGFzdCx4X2xhc3Qpe1xuXG5cdFx0dmFyIGxfcG9pbnRlcnMgPSBzdG9yZS5sYXllcnNbc3RvcmUucHJvamVjdC5sYXllcnMuYWN0aXZlXS5wb2ludGVycztcblx0XHRsX3BvaW50ZXJzLnBvaW50ZXJzW3ldW3hdID0gcGFyc2VJbnQoIG1lbnVfdG9wLmNhdGVnb3J5ICk7XG5cblx0XHQvL3d5em5hY3plbmllIHLDs3duYW5pYSBwcm9zdGVqXG5cdFx0aWYoICgoeV9sYXN0ICE9IHkpIHx8ICh4X2xhc3QgIT0geCkpICYmICh5X2xhc3QgIT0gbnVsbCkgJiYgKHhfbGFzdCAhPSBudWxsKSApe1xuXHRcdFx0dmFyIGEgPSAoeV9sYXN0IC0geSkgLyAoeF9sYXN0IC0geCk7XG5cdFx0XHR2YXIgYiA9IHkgLSBhKng7XG5cblx0XHRcdGlmKHhfbGFzdCA+IHgpe1xuXHRcdFx0XHR2YXIgY29sX2Zyb20gPSB4O1xuXHRcdFx0XHR2YXIgY29sX3RvID0geF9sYXN0O1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBjb2xfdG8gPSB4O1xuXHRcdFx0XHR2YXIgY29sX2Zyb20gPSB4X2xhc3Q7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHlfbGFzdCA+IHkpe1xuXHRcdFx0XHR2YXIgcm93X2Zyb20gPSB5O1xuXHRcdFx0XHR2YXIgcm93X3RvID0geV9sYXN0O1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciByb3dfdG8gPSB5O1xuXHRcdFx0XHR2YXIgcm93X2Zyb20gPSB5X2xhc3Q7XG5cdFx0XHR9XG5cblx0XHRcdHZhciByb3cgPSBudWxsO1xuXHRcdFx0Zm9yKHZhciBjb2wgPSBjb2xfZnJvbTsgY29sIDw9IGNvbF90bzsgY29sKyspXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA9IHBhcnNlSW50KCBhKmNvbCtiICk7XG5cdFx0XHRcdGlmKCEkLmlzTnVtZXJpYyhyb3cpKSByb3cgPSB5O1xuXHRcdFx0XHRsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sXSA9IHBhcnNlSW50KCBtZW51X3RvcC5jYXRlZ29yeSApO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29sID0gbnVsbDtcblx0XHRcdGZvcih2YXIgcm93ID0gcm93X2Zyb207IHJvdyA8PSByb3dfdG87IHJvdysrKVxuXHRcdFx0e1xuXHRcdFx0XHRjb2wgPSBwYXJzZUludCggKHJvdy1iKS9hICk7XG5cdFx0XHRcdGlmKCEkLmlzTnVtZXJpYyhjb2wpKSBjb2wgPSB4O1xuXHRcdFx0XHRsX3BvaW50ZXJzLnBvaW50ZXJzW3Jvd11bY29sXSA9IHBhcnNlSW50KCBtZW51X3RvcC5jYXRlZ29yeSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0bF9wb2ludGVycy5wb2ludGVyc1t5XVt4XSA9IHBhcnNlSW50KCBtZW51X3RvcC5jYXRlZ29yeSApO1xuXHRcdH1cblx0fVxufVxuIiwiLy8g4pSM4pSA4pSQ4pSM4pSs4pSQ4pSM4pSA4pSQ4pSs4pSA4pSQ4pSM4pSA4pSQXHJcbi8vIOKUlOKUgOKUkCDilIIg4pSCIOKUguKUnOKUrOKUmOKUnOKUpCBcclxuLy8g4pSU4pSA4pSYIOKUtCDilJTilIDilJjilLTilJTilIDilJTilIDilJhcclxuXHJcbi8vT2JpZWt0IHByemVjaG93dWrEhWN5IHdzenlzdGtpZSB6bWllbm5lIGdsb2JhbG5lXHJcblxyXG5cclxuLy9rb25zdHJ1a2NqYSBiYXp5XHJcblxyXG4vLyhudW1lciBtYXB5KSAobnVtZXIgd2Fyc3R3eSkgKG9iaWVrdCkgKHdsYXNjaXdvc2MpIFxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBcclxuICAvL3ptaWVubmUgZG90eWN6xIVjZSBnbG9iYWxueWNoIGRhbnljaFxyXG4gIHByb2plY3QgOiB7XHJcblxyXG4gICAgbGF5ZXJzOiB7XHJcbiAgICAgIGFjdGl2ZSA6IDAsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB0aXRsZSA6ICdub3d5IHByb2pla3QnLFxyXG5cclxuICAgIG1lbnVfdG9wIDoge1xyXG4gICAgICBtb3ZlX2ltYWdlIDogZmFsc2UsXHJcbiAgICAgIG1vdmVfY2FudmFzIDogZmFsc2UsXHJcbiAgICAgIGF1dG9fZHJhdyA6IGZhbHNlLFxyXG4gICAgICBtb2RlX2tleSA6IHRydWUsXHJcbiAgICAgIGNhdGVnb3J5IDogMCxcclxuICAgICAgZGlzYWJsZV9zZWxlY3QgOiBmYWxzZSxcclxuICAgICAgYW5pbWF0ZV9ib3ggOiBmYWxzZSxcclxuICAgIH0sXHJcblxyXG4gICAgcGFsZXRzIDoge1xyXG4gICAgICBjb2xvcnMgOiBbXHJcbiAgICAgICAgWycjZjdmY2ZkJywnI2U1ZjVmOScsJyNjY2VjZTYnLCcjOTlkOGM5JywnIzY2YzJhNCcsJyM0MWFlNzYnLCcjMjM4YjQ1JywnIzAwNmQyYycsJyMwMDQ0MWInXSxcclxuICAgICAgICBbJyNmN2ZjZmQnLCcjZTBlY2Y0JywnI2JmZDNlNicsJyM5ZWJjZGEnLCcjOGM5NmM2JywnIzhjNmJiMScsJyM4ODQxOWQnLCcjODEwZjdjJywnIzRkMDA0YiddLFxyXG4gICAgICAgIFsnI2Y3ZmNmMCcsJyNlMGYzZGInLCcjY2NlYmM1JywnI2E4ZGRiNScsJyM3YmNjYzQnLCcjNGViM2QzJywnIzJiOGNiZScsJyMwODY4YWMnLCcjMDg0MDgxJ10sXHJcbiAgICAgICAgWycjZmZmN2VjJywnI2ZlZThjOCcsJyNmZGQ0OWUnLCcjZmRiYjg0JywnI2ZjOGQ1OScsJyNlZjY1NDgnLCcjZDczMDFmJywnI2IzMDAwMCcsJyM3ZjAwMDAnXSxcclxuICAgICAgICBbJyNmZmY3ZmInLCcjZWNlN2YyJywnI2QwZDFlNicsJyNhNmJkZGInLCcjNzRhOWNmJywnIzM2OTBjMCcsJyMwNTcwYjAnLCcjMDQ1YThkJywnIzAyMzg1OCddLFxyXG4gICAgICAgIFsnI2ZmZjdmYicsJyNlY2UyZjAnLCcjZDBkMWU2JywnI2E2YmRkYicsJyM2N2E5Y2YnLCcjMzY5MGMwJywnIzAyODE4YScsJyMwMTZjNTknLCcjMDE0NjM2J10sXHJcbiAgICAgICAgWycjZjdmNGY5JywnI2U3ZTFlZicsJyNkNGI5ZGEnLCcjYzk5NGM3JywnI2RmNjViMCcsJyNlNzI5OGEnLCcjY2UxMjU2JywnIzk4MDA0MycsJyM2NzAwMWYnXSxcclxuICAgICAgICBbJyNmZmY3ZjMnLCcjZmRlMGRkJywnI2ZjYzVjMCcsJyNmYTlmYjUnLCcjZjc2OGExJywnI2RkMzQ5NycsJyNhZTAxN2UnLCcjN2EwMTc3JywnIzQ5MDA2YSddLFxyXG4gICAgICAgIFsnI2ZmZmZlNScsJyNmN2ZjYjknLCcjZDlmMGEzJywnI2FkZGQ4ZScsJyM3OGM2NzknLCcjNDFhYjVkJywnIzIzODQ0MycsJyMwMDY4MzcnLCcjMDA0NTI5J10sXHJcbiAgICAgICAgWycjZmZmZmQ5JywnI2VkZjhiMScsJyNjN2U5YjQnLCcjN2ZjZGJiJywnIzQxYjZjNCcsJyMxZDkxYzAnLCcjMjI1ZWE4JywnIzI1MzQ5NCcsJyMwODFkNTgnXSxcclxuICAgICAgICBbJyNmZmZmZTUnLCcjZmZmN2JjJywnI2ZlZTM5MScsJyNmZWM0NGYnLCcjZmU5OTI5JywnI2VjNzAxNCcsJyNjYzRjMDInLCcjOTkzNDA0JywnIzY2MjUwNiddLFxyXG4gICAgICAgIFsnI2ZmZmZjYycsJyNmZmVkYTAnLCcjZmVkOTc2JywnI2ZlYjI0YycsJyNmZDhkM2MnLCcjZmM0ZTJhJywnI2UzMWExYycsJyNiZDAwMjYnLCcjODAwMDI2J10sXHJcbiAgICAgICAgWycjZjdmYmZmJywnI2RlZWJmNycsJyNjNmRiZWYnLCcjOWVjYWUxJywnIzZiYWVkNicsJyM0MjkyYzYnLCcjMjE3MWI1JywnIzA4NTE5YycsJyMwODMwNmInXSxcclxuICAgICAgICBbJyNmN2ZjZjUnLCcjZTVmNWUwJywnI2M3ZTljMCcsJyNhMWQ5OWInLCcjNzRjNDc2JywnIzQxYWI1ZCcsJyMyMzhiNDUnLCcjMDA2ZDJjJywnIzAwNDQxYiddLFxyXG4gICAgICAgIFsnI2ZmZmZmZicsJyNmMGYwZjAnLCcjZDlkOWQ5JywnI2JkYmRiZCcsJyM5Njk2OTYnLCcjNzM3MzczJywnIzUyNTI1MicsJyMyNTI1MjUnLCcjMDAwMDAwJ10sXHJcbiAgICAgICAgWycjZmZmNWViJywnI2ZlZTZjZScsJyNmZGQwYTInLCcjZmRhZTZiJywnI2ZkOGQzYycsJyNmMTY5MTMnLCcjZDk0ODAxJywnI2E2MzYwMycsJyM3ZjI3MDQnXSxcclxuICAgICAgICBbJyNmY2ZiZmQnLCcjZWZlZGY1JywnI2RhZGFlYicsJyNiY2JkZGMnLCcjOWU5YWM4JywnIzgwN2RiYScsJyM2YTUxYTMnLCcjNTQyNzhmJywnIzNmMDA3ZCddLFxyXG4gICAgICAgIFsnI2ZmZjVmMCcsJyNmZWUwZDInLCcjZmNiYmExJywnI2ZjOTI3MicsJyNmYjZhNGEnLCcjZWYzYjJjJywnI2NiMTgxZCcsJyNhNTBmMTUnLCcjNjcwMDBkJ10sXHJcbiAgICAgICAgWycjZmZmZmZmJywnI2ZmZmZmZicsJyNmZmZmZmYnLCcjZmZmZmZmJywnI2ZmZmZmZicsJyNmZmZmZmYnLCcjZmZmZmZmJywnI2ZmZmZmZicsJyNmZmZmZmYnXVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbGF5ZXJzIDogW3tcclxuXHJcbiAgICBzb3VyY2UgOiAnJyxcclxuICAgIFxyXG4gICAgbmFtZSA6ICd6YWtsYWRrYSAxJyxcclxuICAgIFxyXG4gICAgZXhjZWwgOiB7XHJcbiAgICAgIGRhdGEgOiBbXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl0sXHJcbiAgICAgICAgW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIl1cclxuICAgICAgXSxcclxuICAgIFxyXG4gICAgICBtaW5fcm93IDogMTIsXHJcbiAgICAgIG1pbl9jb2wgOiA2LCBcclxuICAgICAgXHJcbiAgICAgIG1pbl92YWwgOiAwLFxyXG4gICAgICBtYXhfdmFsIDogMCxcclxuICAgIH0sXHJcblxyXG4gICAgcG9pbnRlcnMgOiB7XHJcblxyXG4gICAgICBzaG93X2FsbF9wb2ludCA6IHRydWUsXHJcbiAgICAgIHNob3dfYm9yZGVyIDogZmFsc2UsXHJcbiAgICAgIHBhZGRpbmdfeCA6IDEsXHJcbiAgICAgIHBhZGRpbmdfeSA6IDEsXHJcbiAgICAgIHRyYW5zbGF0ZV9tb2R1bG8gOiBmYWxzZSxcclxuICAgICAgc2l6ZTogMTAsXHJcbiAgICAgIG1haW5fa2luZCA6ICdzcXVhcmUnLFxyXG4gICAgICBraW5kcyA6IFsnc3F1YXJlJywnY2lyY2xlJywnaGV4YWdvbicsJ2hleGFnb24yJ10sXHJcbiAgICAgIGNvbG9yX2JvcmRlcjogJyMzMzMnLFxyXG4gICAgICBwb2ludGVycyA6IFtdLCAvL3BvaW50ZXJzLnBvaW50ZXJzW3J6YWRdW2tvbHVtbmFdIDoga2F0ZWdvcmlhW251bWVyXVxyXG5cclxuICAgICAgbGFzdF9jb2x1bW4gOiBudWxsLCAvL2tvbHVtbmEgcG9pbnRlcmEga3TDs3J5IHpvc3RhxYIgb3N0YXRuaW8gem1pZW5pb255XHJcbiAgICAgIGxhc3Rfcm93IDogbnVsbCwgIC8vd2llcnN6IHBvaW50ZXJhIGt0w7NyeSB6b3N0YcWCIG9zdGF0bmlvIHptaWVuaW9ueVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGNhbnZhcyA6IHtcclxuXHJcbiAgICAgIHNjYWxlIDogMTAwLFxyXG4gICAgICB3aWR0aCA6IDcwMCxcclxuICAgICAgaGVpZ2h0IDogNDAwLFxyXG4gICAgICBjYW52YXMgOiBudWxsLFxyXG4gICAgICBjb250ZXh0IDogbnVsbCxcclxuICAgICAgdGh1bWJuYWlsIDogbnVsbCxcclxuXHJcbiAgICAgIGNvbnRleHRfeCA6IDAsIC8vb2JlY25hIHBvenljamEgY29udGV4dHUgeFxyXG4gICAgICBjb250ZXh0X3kgOiAwLCAvL29iZWNuYSBwb3p5Y2phIGNvbnRleHR1IHlcclxuICAgICAgY29udGV4dF9uZXdfeCA6IDAsIC8vbm93YSBwb3p5Y2phIGNvbnRleHR1IHhcclxuICAgICAgY29udGV4dF9uZXdfeSA6IDAsIC8vbm93YSBwb3p5Y2phIGNvbnRleHR1IHlcclxuXHJcbiAgICAgIG9mZnNldF9sZWZ0IDogbnVsbCxcclxuICAgICAgb2Zmc2V0X3RvcCA6IG51bGwsXHJcbiAgICAgIGFjdGl2ZV9yb3cgOiBudWxsLCAvL2xpY3piYSBha3R5d255Y2ggd2llcnN6eSBpIGtvbHVtblxyXG4gICAgICBhY3RpdmVfY29sdW1uIDogbnVsbCwgLy9saWN6YmEgYWt0eXdueWNoIHdpZXJzenkgaSBrb2x1bW5cclxuXHJcbiAgICB9XHJcblxyXG4gIH1dXHJcblxyXG59O1xyXG5cclxuIiwiLy8g4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVlyDilojilojilojilojilojilojilZcg4paI4paI4paI4pWXICAg4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilojilojilojilojilZcgICAgIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyAgICDilojilojilZdcbi8vIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkeKWiOKWiOKVlOKVkOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKVlyDilojilojilojilojilZHilojilojilZTilZDilZDilojilojilZfilojilojilZTilZDilZDilojilojilZcgICAg4pWa4pWQ4pWQ4pWQ4pWQ4paI4paI4pWXICDilojilojilojilZFcbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkeKWiOKWiOKVkSAgIOKWiOKWiOKVkeKWiOKWiOKVlOKWiOKWiOKWiOKWiOKVlOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVnSAgICAg4paI4paI4paI4paI4paI4pWU4pWdICDilZrilojilojilZFcbi8vIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkeKWiOKWiOKVkeKWhOKWhCDilojilojilZHilojilojilZHilZrilojilojilZTilZ3ilojilojilZHilojilojilZTilZDilZDilojilojilZHilojilojilZTilZDilZDilZDilZ0gICAgICDilZrilZDilZDilZDilojilojilZcgICDilojilojilZFcbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkeKVmuKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkSDilZrilZDilZ0g4paI4paI4pWR4paI4paI4pWRICDilojilojilZHilojilojilZEgICAgICAgICDilojilojilojilojilojilojilZTilZ3ilojilojilZfilojilojilZFcbi8vIOKVmuKVkOKVkOKVkOKVkOKVkOKVnSDilZrilZDilZ0g4pWa4pWQ4pWQ4paA4paA4pWQ4pWdIOKVmuKVkOKVnSAgICAg4pWa4pWQ4pWd4pWa4pWQ4pWdICDilZrilZDilZ3ilZrilZDilZ0gICAgICAgICDilZrilZDilZDilZDilZDilZDilZ0g4pWa4pWQ4pWd4pWa4pWQ4pWdXG4vLyB3ZXJzamE6IDMuMS41IGF1dG9yOiBNYXJjaW4gR8SZYmFsYVxuXG5pbXBvcnQgbWVudV90b3AgZnJvbSAnLi9tb2R1bGVzL21lbnVfdG9wJztcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9tb2R1bGVzL2xheWVycyc7XG5pbXBvcnQgcGFsZXRzIGZyb20gJy4vbW9kdWxlcy9wYWxldHMnO1xuaW1wb3J0IGNvbG9ycGlja2VyIGZyb20gJy4vbW9kdWxlcy9jb2xvcnBpY2tlcic7XG5pbXBvcnQgY3J1ZCBmcm9tICcuL21vZHVsZXMvY3J1ZCc7XG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb2R1bGVzL21vdXNlJztcbmltcG9ydCBwb2ludGVycyBmcm9tICcuL21vZHVsZXMvcG9pbnRlcnMnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL21vZHVsZXMvY2FudmFzJztcbmltcG9ydCBjYXRlZ29yaWVzIGZyb20gJy4vbW9kdWxlcy9jYXRlZ29yaWVzJzsgXG5pbXBvcnQgZXhjZWwgZnJvbSAnLi9tb2R1bGVzL2V4Y2VsJzsgXG5pbXBvcnQgbGVnZW5kcyBmcm9tICcuL21vZHVsZXMvbGVnZW5kcyc7ICBcbmltcG9ydCBvbl9jYXRlZ29yeSBmcm9tICcuL21vZHVsZXMvb25fY2F0ZWdvcnknO1xuaW1wb3J0IGNsb3VkIGZyb20gJy4vbW9kdWxlcy9jbG91ZCc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vbW9kdWxlcy9nbG9iYWwnO1xuaW1wb3J0IG1vZGVscyBmcm9tICcuL21vZHVsZXMvbW9kZWxzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi9tb2R1bGVzL2xhYmVscyc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9tb2R1bGVzL3N0b3JlJztcblxuXG4vL3NwZWNqYWxueSBvYmlla3QgZG8gYmFkYW5pYSBzdGFudSByw7PFvG55Y2ggb2JpZWt0w7N3XG53aW5kb3cuc3BlYyA9IHtcbiAgbWVudV90b3AgOiBtZW51X3RvcCwgXG4gIGxheWVycyA6IGxheWVycywgXG4gIHBhbGV0cyA6IHBhbGV0cywgXG4gIGNvbG9ycGlja2VyIDogY29sb3JwaWNrZXIsXG4gIGNydWQgOiBjcnVkLCAgXG4gIG1vdXNlIDogbW91c2UsIFxuICBwb2ludGVycyA6IHBvaW50ZXJzLCBcbiAgY2FudmFzIDogY2FudmFzLCBcbiAgY2F0ZWdvcmllcyA6IGNhdGVnb3JpZXMsIFxuICBleGNlbCA6IGV4Y2VsLCBcbiAgbGVnZW5kcyA6IGxlZ2VuZHMsIFxuICBvbl9jYXRlZ29yeSA6IG9uX2NhdGVnb3J5LCBcbiAgY2xvdWQgOiBjbG91ZCwgXG4gIGdsb2JhbCA6IGdsb2JhbCxcbiAgbW9kZWxzIDogbW9kZWxzLCBcbiAgbGFiZWxzIDogbGFiZWxzLFxuICBzdG9yZSA6IHN0b3JlXG59XG5cbi8vZG9kYWplbXkgdGlueW1jZSBkbyAyIHRleHRhcmVhIChkeW1layDFunLDs2TFgm8pXG50aW55bWNlLmluaXQoe1xuXHRtZW51YmFyOmZhbHNlLFxuICBzZWxlY3RvcjogJy50aW55ZWRpdCcsICAvLyBjaGFuZ2UgdGhpcyB2YWx1ZSBhY2NvcmRpbmcgdG8geW91ciBIVE1MXG4gIHRvb2xiYXI6ICdib2xkIGl0YWxpYyB8IGxpbmsgaW1hZ2UnLFxuICAgIHNldHVwOiAoZWRpdG9yKSA9PiB7XG4gICAgICBlZGl0b3Iub24oJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgIHZhciB0YXJnZXQgPSAkKGVkaXRvci50YXJnZXRFbG0pLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vamXFm2xpIGFrdHVhbGl6dWplbXkgZHltZWtcbiAgICAgICAgaWYodGFyZ2V0ID09ICdjbG91ZCcpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKClcbiAgICAgICAgXHRsYXllcnMuY2xvdWRbbGF5ZXJzLmFjdGl2ZV0gPSBlZGl0b3IuZ2V0Q29udGVudCgpO1xuICAgICAgICBcdC8vY2xvdWQuZ2V0X3RleHRhcmVhKCBlZGl0b3IuZ2V0Q29udGVudCgpICk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2plxZtsaSBha3R1YWxpenVqZW15IMW8csOzZMWCbyBwcm9qZWt0dVxuICAgICAgICBpZih0YXJnZXQgPT0gJ3NvdXJjZScpe1xuICAgXHRcdFx0XHRsYXllcnMuc291cmNlID0gZWRpdG9yLmdldENvbnRlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG59KTtcblxuLy9kb2RhamVteSBibG9rYWTEmSBwcnplZCBwcnp5cGFka293eW0gb2TFm3dpZcW8ZW5pZW0gc3Ryb255XG5nbG9iYWwucmVmcmVzaExvY2soKTtcblxuLy9wbyBrbGlrbmnEmWNpdSB6bWllbmlheSBha3R1YWxueSBwYW5lbFxuJCgnLmJveCA+IHVsID4gbGknKS5jbGljaygoZSkgPT4geyBtZW51X3RvcC5jaGFuZ2VfYm94KGUuY3VycmVudFRhcmdldCkgfSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblxuXHRtZW51X3RvcC5nZXRfbWFwcygpO1xuXHRtZW51X3RvcC5nZXRfcHJvamVjdHMoKTtcbiAgbGF5ZXJzLnNob3coKTtcbiAgcGFsZXRzLnNob3coKTtcbiAgY29sb3JwaWNrZXIuY29sb3JfYm9yZGVyKCk7XG4gIC8vdHdvcnp5bXkgdGFibGljZSBwb2ludGVyw7N3XG4gIHBvaW50ZXJzLmNyZWF0ZV9hcnJheSgpO1xuICBleGNlbC5pbml0KCk7XG4gIGxlZ2VuZHMuc2hvdygpOyBcbiAgY2FudmFzLmluaXQoKTtcblxuXHQvL3phYmxva293YW5pZSBtb8W8bGl3b8WbY2kgemF6bmFjemFuaWEgYnV0dG9uw7N3IHBvZGN6YXMgZWR5Y2ppIHBvbGFcblx0JChkb2N1bWVudCkub24oXCJmb2N1c2luXCIsXCJpbnB1dFwiLCAoKSA9PiB7IG1lbnVfdG9wLmRpc2FibGVfc2VsZWN0ID0gdHJ1ZTsgfSk7XG5cdCQoZG9jdW1lbnQpLm9uKFwiZm9jdXNvdXRcIixcImlucHV0XCIsICgpID0+IHsgbWVudV90b3AuZGlzYWJsZV9zZWxlY3QgPSBmYWxzZTsgfSk7XG5cblx0Ly96YXpuYWN6ZW5pZSBkeW1rYSBkbyBwdWJsaWthY2ppIHBvIGtsaWtuacSZY2l1XG5cdCQoJy5wdWJsaXNoIC5lbWJlZCcpLmNsaWNrKCAoKSA9PiB7XHQkKHRoaXMpLnNlbGVjdCgpO1x0fSk7XG5cdCQoJy5wdWJsaXNoJykuY2xpY2soIChlKSA9PiB7IGNydWQucHVibGlzaChlKTsgfSk7IFxuXG5cdC8vamXFm2xpIGNoY2VteSB6YXBpc2HEhyAvIHpha3R1YWxpem93YcSHIC8gb3B1Ymxpa293YcSHIHByb2pla3Rcblx0JCgnI3Rvb2xiYXJfdG9wIGJ1dHRvbi5zYXZlJykuY2xpY2soICgpID0+IHsgXG5cdFx0aWYodHlwZW9mIGNydWQucHJvamVjdF9oYXNoID09ICdzdHJpbmcnKXtcdGNydWQudXBkYXRlX3Byb2plY3QoKTsgfVxuXHRcdGVsc2V7IGNydWQuY3JlYXRlX3Byb2plY3QoKTsgfVxuXHR9KTtcblxuXHQvL2plxZtsaSBjaGNlbXkgdXN1bsSFxIcgcHJvamVrdFxuXHQkKCcjdG9vbGJhcl90b3AgYnV0dG9uLmRlbGV0ZScpLmNsaWNrKCAoKSA9PiB7IFxuXHRcdGlmKGNvbmZpcm0oJ0N6eSBjaGNlc3ogdXN1bsSFxIcgcHJvamVrdCA/JykpeyBjcnVkLmRlbGV0ZV9wcm9qZWN0KCk7IH1cblx0fSk7XG5cblx0Ly9vZHpuYWN6ZW5pZSBzZWxlY3RhIHByenkgem1pYW5pZVxuXHQkKCcjY2hhbmdlX2NhdGVnb3J5JykuY2hhbmdlKCAoKSA9PiB7ICQoJyNjaGFuZ2VfY2F0ZWdvcnknKS5ibHVyKCk7IH0pO1xuXG5cdC8vcmVqZXN0cmFjamEgemRhcnplbmlhIHcgbW9tZW5jaWUgcHVzY3plbmlhIHByenljaXNrdSBteXN6a2lcblx0JChkb2N1bWVudCkubW91c2V1cCggKCkgPT4geyBtb3VzZS5tb3VzZV9kb3duID0gZmFsc2U7IH0pO1xuXG5cdC8vcmVqZXN0cmFjamEgemRhcnplbmlhIHcgbW9tZW5jaWUgd2NpxZtuacSZY2lhIHByenljaXNrdSBteXN6a2lcblx0JChkb2N1bWVudCkubW91c2Vkb3duKCAoZSkgPT4geyBcblx0XHRpZiAoIWUpIHtlID0gd2luZG93LmV2ZW50O30gLy/FgmF0YSBkbGEgbW96aWxsaVxuXHRcdG1vdXNlLnNldF9tb3VzZV9kb3duKGUpO1xuXHR9KTtcblxuXHQvL3d5d2/FgmFuaWUgZnVua2NqaSBwb2RjemFzIHBvcnVzemFuaWEgbXlzemvEhVxuXHQkKGRvY3VtZW50KS5tb3VzZW1vdmUoIChlKSA9PiB7XG5cdFx0aWYgKCFlKSB7ZSA9IHdpbmRvdy5ldmVudDt9IC8vbGF0YSBkbGEgbW96aWxsaVxuXHRcdG1vdXNlLnNldF9wb3NpdGlvbihlKTsgLy96YXJlamVzdHJvd2FuaWUgcG96eWNqaSBteXN6a2lcblxuXHRcdC8vamVzbGkgcHJ6eWNpc2sgamVzdCB3Y2nFm25pxJl0eSB3eWtvbnVqZW15IGRvZGF0a293ZSB6ZGFyemVuaWEgKHByenkgcnVzemFuaXUgbXlzemvEhSlcblx0XHRpZihtb3VzZS5tb3VzZV9kb3duKSBtb3VzZS5tb3VzZW1vdmUoZXZlbnQpO1xuXHRcdGlmKG1lbnVfdG9wLmF1dG9fZHJhdyl7IG1vdXNlLmNsaWNrX29iaiA9IFwiY2FudmFzXCI7IG1vdXNlLm1vdXNlbW92ZShldmVudCk7fVxuXHRcblx0fSk7XG5cblx0JCgnI21haW5fY2FudmFzJykubW91c2Vkb3duKCAoZSkgPT4ge1xuXHRcdGlmICghZSkge2UgPSB3aW5kb3cuZXZlbnQ7fSAvL2xhdGEgZGxhIG1vemlsbGlcblx0XHRtb3VzZS5zZXRfbW91c2VfZG93bihlKTsvL3phcmVqZXN0cm93YW5pZSBvYmlla3R1dyAga3TDs3J5IGtsaWthbXlcblx0XHRtb3VzZS5zZXRfcG9zaXRpb24oZSk7IC8vemFyZWplc3Ryb3dhbmllIHBvenljamkgbXlzemtpXG5cdFx0Ly9qZXNsaSBwcnp5Y2lzayBqZXN0IHdjacWbbmnEmXR5IHd5a29udWplbXkgZG9kYXRrb3dlIHpkYXJ6ZW5pYSAocHJ6eSBydXN6YW5pdSBteXN6a8SFKVxuXHRcdG1vdXNlLm1vdXNlbW92ZShlKTtcblx0fSk7XG5cblx0JChkb2N1bWVudCkubW91c2V1cCggKCkgPT4ge1xuXHRcdHBvaW50ZXJzLmxhc3RfY29sdW1uID0gbnVsbDtcdC8va29sdW1uYSBwb2ludGVyYSBrdMOzcnkgem9zdGHFgiBvc3RhdG5pbyB6bWllbmlvbnlcblx0XHRwb2ludGVycy5sYXN0X3JvdyA9IG51bGw7XG5cdFx0Y2FudmFzLmNvbnRleHRfeCA9IGNhbnZhcy5jb250ZXh0X25ld194O1xuXHRcdGNhbnZhcy5jb250ZXh0X3kgPSBjYW52YXMuY29udGV4dF9uZXdfeTtcblx0fSk7XG5cblx0Ly9kb2RhbmllIG5vd2VqIGthdGVnb3JpaVxuXHQkKCcjYWRkX2NhdGVnb3J5JykuY2xpY2soICgpID0+IHsgY2F0ZWdvcmllcy5hZGQoKTsgfSk7XG5cblx0Ly9kb2RhbmllIG5vd2VqIGthdGVnb3JpaSAocG8gd2NpxZtuacSZY2l1IGVudGVyKVxuXHQkKCdpbnB1dFtuYW1lPVwiYWRkX2NhdGVnb3J5XCJdJykua2V5cHJlc3MoIChlKSA9PiB7XG4gICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgIFx0Y2F0ZWdvcmllcy5hZGQoKTtcbiAgICB9IFxuXHR9KTtcblxuXG5cdC8vcG9kcGnEmWNpZSB6ZGFyemXFhFxuICAkKCcjcG9pbnRlcnMnKS5kZWxlZ2F0ZSgnaW5wdXRbbmFtZT1cInByb2plY3QubmFtZVwiXScsJ2tleXVwJywgKGUpID0+IHsgXG5cdFx0Y29uc29sZS5sb2coICd0ZXN0JywgZS5jdXJyZW50VGFyZ2V0LnZhbHVlICk7XG5cdH0pO1xuXG5cdC8vcG9rYXphbmllIC8gdWtyeWNpZSBwYW5lbHUga2F0ZWdvcmlpXG5cdCQoJyNleGNlbF9ib3ggaDInKS5jbGljayggKGUpID0+IHsgZ2xvYmFsLnRvb2dsZV9sZWZ0KGUuY3VycmVudFRhcmdldCk7IH0pO1xuICAkKCcjcG9pbnRlcl9ib3ggaDInKS5jbGljayggKGUpID0+IHsgZ2xvYmFsLnRvb2dsZV9yaWdodChlLmN1cnJlbnRUYXJnZXQpOyB9KTsgXG4gICQoJyNwYWxldHNfYm94IGgyJykuY2xpY2soIChlKSA9PiB7IGdsb2JhbC50b29nbGVfcmlnaHQoZS5jdXJyZW50VGFyZ2V0KTsgfSk7XG5cblx0Ly9vYnPFgnVnYSBidXR0b27Ds3cgZG8gaW5rcmVtZW50YWNqaSBpIGRla3JlbWVudGFjamkgaW5wdXTDs3dcblx0JCgnYnV0dG9uLmluY3JlbWVudCcpLmNsaWNrKCAoZSkgPT4geyBtb2RlbHMuYnV0dG9uX2luY3JlbWVudCggJChlLmN1cnJlbnRUYXJnZXQpICkgfSk7XG5cdCQoJ2J1dHRvbi5kZWNyZW1lbnQnKS5jbGljayggKGUpID0+IHsgbW9kZWxzLmJ1dHRvbl9kZWNyZW1lbnQoICQoZS5jdXJyZW50VGFyZ2V0KSApIH0pO1xuXG5cdC8vb2LFgnVnYSBpbnB1dMOzdyBwb2JyYW5pZSBkYW55Y2ggaSB6YXBpc2FuaWUgZG8gYmF6eVxuXHQkKCcuc3dpdGNoJykuY2xpY2soIChlKSA9PiB7IG1vZGVscy51cGRhdGVfZnJvbV9zd2l0Y2goICQoZS5jdXJyZW50VGFyZ2V0KSApOyB9KTsgLy9wcnp5Y2lza2kgc3dpdGNoXG5cdCQoJy5pbnB1dF9iYXNlJykuY2hhbmdlKCAoZSkgPT4geyBtb2RlbHMudXBkYXRlX2Zyb21faW5wdXQoICQoZS5jdXJyZW50VGFyZ2V0KSApOyB9KTsgLy90cmFkeWN5am5lIGlucHV0eVxuXHQkKCcuaW5wdXRfYmFzZV90ZXh0JykuY2hhbmdlKCAoZSkgPT4geyBtb2RlbHMudXBkYXRlX2Zyb21faW5wdXRfdGV4dCggJChlLmN1cnJlbnRUYXJnZXQpICk7IH0pOyAvL3RyYWR5Y3lqbmUgaW5wdXR5XG5cdCQoJy5zZWxlY3RfYmFzZScpLmNoYW5nZSggKGUpID0+IHsgbW9kZWxzLnVwZGF0ZV9mcm9tX3NlbGVjdCggJChlLmN1cnJlbnRUYXJnZXQpICk7IH0pOyAvL2xpc3R5IHJvendpamFuZSBzZWxlY3RcblxuXHQkKCcjbWVudV90b3AgI2luY3JlbWVudF9jYW52YXMnKS5jbGljayggKCkgPT4geyBtZW51X3RvcC5pbmNyZW1lbnRfc2NhbGUoKTsgfSk7XG5cdCQoJyNtZW51X3RvcCAjZGVjcmVtZW50X2NhbnZhcycpLmNsaWNrKCAoKSA9PiB7IG1lbnVfdG9wLmRlY3JlbWVudF9zY2FsZSgpOyB9KTtcblx0JCgnI21lbnVfdG9wICNhZGRfaW1hZ2UnKS5jbGljayggKCkgPT4geyBtZW51X3RvcC5hZGRfaW1hZ2UoKTsgfSk7XG5cblx0JCgnI21lbnVfdG9wICNyZXNldF9jYW52YXMnKS5jbGljayggKCkgPT4geyBjYW52YXMuc2V0X2RlZmF1bHQoKTsgfSk7XG5cbiAgJCgnI2xheWVycyAubGFiZWxfbGF5ZXInKS5rZXl1cCggKGUpID0+IHsgbGFiZWxzLmVkaXQoZS5jdXJyZW50VGFyZ2V0KTsgfSk7IFxuICAvL3pkYXJ6ZW5pYSBkb3R5Y3rEhWNlIHBhbGV0XG4gICQoJyNleGNlbF9ib3ggc2VsZWN0LmNhdGVnb3J5JykuY2hhbmdlKCAoZSkgPT4geyBwYWxldHMuc2V0X2NhdGVnb3J5KGUuY3VycmVudFRhcmdldCk7IH0pO1xuICAkKCcjZXhjZWxfYm94IHNlbGVjdC52YWx1ZScpLmNoYW5nZSggKGUpID0+IHsgcGFsZXRzLnNldF92YWx1ZShlLmN1cnJlbnRUYXJnZXQpOyB9KTtcblxuICAgIC8vemFrdHVhbGl6b3dhbmllIGthdGVnb3JpaVxuICAkKFwiI2FyZWFcIikuZGVsZWdhdGUoXCJpbnB1dFwiLFwiZm9jdXNvdXRcIiwgKGUpID0+IHsgXG4gICAgY2F0ZWdvcmllcy51cGRhdGUoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2lkX2NhdGVnb3J5JyksICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKSApOyBcbiAgfSk7XG4gXG4gICQoXCIjYXJlYVwiKS5kZWxlZ2F0ZShcImlucHV0XCIsXCJrZXlwcmVzc1wiLCAoZSkgPT4geyBcbiAgICBpZihlLndoaWNoID09IDEzKXsgY2F0ZWdvcmllcy51cGRhdGUoICQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdpZF9jYXRlZ29yeScpLCAkKGUuY3VycmVudFRhcmdldCkudmFsKCkgKTsgfSBcbiAgfSk7XG4gXG4gICQoJyNjYW52YXNfd3JhcHBlcicpLm1vdXNlbGVhdmUoICgpID0+IHsgJChcIiNjYW52YXNfY2xvdWRcIikuZmFkZU91dCgyMDApOyB9KTtcblxuICAkKCcjY2FudmFzX3dyYXBwZXInKS5tb3VzZW1vdmUoICgpID0+IHsgIFxuICAgIG9uX2NhdGVnb3J5LnNldCgpO1xuICAgIGNsb3VkLnVwZGF0ZV90ZXh0KCk7XG4gICAgY2xvdWQuc2V0X3Bvc2l0aW9uKCk7XG4gIH0pO1xuXG4gIC8vem1pYW5hIG5hend5IHByb2pla3R1IHByenkgd3Bpc2FuaXUgbm93ZWogbmF6d3kgZG8gaW5wdXRhXG4gICQoJyNwb2ludGVycyAucHJvamVjdF9uYW1lJykua2V5dXAoICgpID0+IHsgbGF5ZXJzLnByb2plY3RfbmFtZSA9ICQodGhpcykudmFsKCk7IH0pO1xuXG4gIC8vJCgnI2NhbnZhc19pbmZvICN3aWR0aCcpLnZhbChjYW52YXMud2lkdGhfY2FudmFzKydweCcpO1xuXHQvLyQoJyNjYW52YXNfaW5mbyAjaGVpZ2h0JykudmFsKGNhbnZhcy5oZWlnaHRfY2FudmFzKydweCcpO1xuICAkKCcjY2FudmFzX2JveCwgI2NhbnZhc193cmFwcGVyJykuY3NzKHsnd2lkdGgnOiBjYW52YXMud2lkdGhfY2FudmFzICsgJ3B4JywnaGVpZ2h0JzpjYW52YXMuaGVpZ2h0X2NhbnZhcyArICdweCd9KTtcblx0JCgnI3dpZHRoX2NhbnZhcywgI2hlaWdodF9jYW52YXMnKS5jaGFuZ2UoICgpID0+IHttZW51X3RvcC51cGRhdGVfY2FudmFzX2luZm8oKX0pO1xuXG59KTtcbiJdfQ==
