(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _menu_top = require('./modules/menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _layers = require('./modules/layers');

var _layers2 = _interopRequireDefault(_layers);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import global from './modules/global'; 
//import models from './modules/models';

//po kliknięciu zmieniay aktualny panel
$('.box > ul > li').click(function () {
	_menu_top2.default.change_box(this);
});
//import palets from './modules/palets';
//import colorpicker from './modules/colorpicker';
// ██████╗ ██╗ ██████╗ ███╗   ███╗ █████╗ ██████╗     ██████╗    ██╗
// ██╔══██╗██║██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ╚════██╗  ███║
// ██████╔╝██║██║   ██║██╔████╔██║███████║██████╔╝     █████╔╝  ╚██║
// ██╔══██╗██║██║▄▄ ██║██║╚██╔╝██║██╔══██║██╔═══╝      ╚═══██╗   ██║
// ██████╔╝██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║         ██████╔╝██╗██║
// ╚═════╝ ╚═╝ ╚══▀▀═╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚═════╝ ╚═╝╚═╝
// wersja: 3.1.5 autor: Marcin Gębala

$(document).ready(function () {

	//przypisanie podstawowowych danych do obiektu canvas
	_canvas2.default.canvas = document.getElementById('main_canvas');
	_canvas2.default.context = _canvas2.default.canvas.getContext('2d');
	_canvas2.default.width_canvas = parseInt($('#main_canvas').attr('width'));
	_canvas2.default.height_canvas = parseInt($('#main_canvas').attr('height'));
	var offset = $('#canvas_box').offset();
	_canvas2.default.offset_left = offset.left;
	_canvas2.default.offset_top = offset.top;

	//tworzymy tablice pointerów
	_pointers2.default.create_array();

	//odznaczenie selecta przy zmianie
	//$//('#change_category').change(function(){ $('#change_category').blur(); });

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup(function () {
		_mouse2.default.mouse_down = false;
	});

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown(function (event) {
		if (!event) {
			event = window.event;
		} //łata dla mozilli
		_mouse2.default.set_mouse_down(event);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove(function (event) {
		if (!event) {
			event = window.event;
		} //lata dla mozilli
		_mouse2.default.set_position(event); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if (_mouse2.default.mouse_down) _mouse2.default.mousemove(event);
		if (_menu_top2.default.auto_draw) {
			_mouse2.default.click_obj = "canvas";_mouse2.default.mousemove(event);
		}
	});

	$('#main_canvas').mousedown(function (event) {

		if (!event) {
			event = window.event;
		} //lata dla mozilli
		_mouse2.default.set_mouse_down(event); //zarejestrowanie obiektuw  który klikamy
		_mouse2.default.set_position(event); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		_mouse2.default.mousemove(event);
	});

	$(document).mouseup(function () {

		_pointers2.default.last_column = null; //kolumna pointera który został ostatnio zmieniony
		_pointers2.default.last_row = null;
		_canvas2.default.context_x = _canvas2.default.context_new_x;
		_canvas2.default.context_y = _canvas2.default.context_new_y;
	});

	_crud2.default.get_project();

	//parent.postMessage($('body').height(),'http://'+location.href.split( '/' )[2]);
});

$('#canvas_wrapper').mouseleave(function () {
	$("#canvas_cloud").fadeOut(200);
});

$('#canvas_wrapper').mousemove(function () {
	_on_category2.default.set();
	_cloud2.default.update_text();
});

$("#canvas_cloud").mousemove(function () {
	_cloud2.default.set_position();
});

},{"./modules/canvas":2,"./modules/categories":3,"./modules/cloud":4,"./modules/crud":5,"./modules/excel":6,"./modules/layers":10,"./modules/legends":11,"./modules/menu_top":12,"./modules/mouse":13,"./modules/on_category":14,"./modules/pointers":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _scale$width_canvas$h;

var _pointers = require('./pointers');

var _pointers2 = _interopRequireDefault(_pointers);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // ╔═╗╔═╗╔╗╔╦  ╦╔═╗╔═╗
// ║  ╠═╣║║║╚╗╔╝╠═╣╚═╗
// ╚═╝╩ ╩╝╚╝ ╚╝ ╩ ╩╚═╝

//czyszczenie i rysowanie po canvasie
exports.default = (_scale$width_canvas$h = {

	scale: 100,
	width_canvas: 700,
	height_canvas: 400,
	canvas: null,
	context: null,
	thumbnail: null,
	title_project: 'nowy projekt',

	context_x: 0, //obecna pozycja contextu x
	context_y: 0, //obecna pozycja contextu y
	context_new_x: 0, //nowa pozycja contextu x
	context_new_y: 0, //nowa pozycja contextu y

	offset_left: null,
	offset_top: null,
	active_row: null, //liczba aktywnych wierszy i kolumn
	active_column: null }, _defineProperty(_scale$width_canvas$h, 'thumbnail', function thumbnail() {
	var canvas = document.getElementById("main_canvas");
	var dataURL = canvas.toDataURL();
	console.log(dataURL);
}), _defineProperty(_scale$width_canvas$h, 'draw', function draw() {
	//console.log('canvas draw');
	this.clear();

	_pointers2.default.create_array();
	_pointers2.default.draw();

	if (_image2.default.obj !== undefined) _image2.default.draw();
}), _defineProperty(_scale$width_canvas$h, 'draw_thumnail', function draw_thumnail() {

	_canvas2.default.canvas = document.getElementById('thumbnail_canvas');
	_canvas2.default.thumbnail = document.getElementById('thumbnail_canvas');
	_canvas2.default.context = _canvas2.default.canvas.getContext('2d');

	this.clear();

	_pointers2.default.create_array();
	_pointers2.default.draw();

	_canvas2.default.canvas = document.getElementById('main_canvas');
	_canvas2.default.context = _canvas2.default.canvas.getContext('2d');
}), _defineProperty(_scale$width_canvas$h, 'reset', function reset() {
	this.context.setTransform(1, 0, 0, 1, 0, 0);
	_canvas2.default.context.scale(_canvas2.default.scale / 100, _canvas2.default.scale / 100);
}), _defineProperty(_scale$width_canvas$h, 'clear', function clear() {
	this.context.clearRect(0, 0, this.width_canvas, this.height_canvas);
	//this.context.fillRect ( 0, 0, this.width_canvas, this.height_canvas );
}), _defineProperty(_scale$width_canvas$h, 'resize_width', function resize_width(new_width) {
	this.width_canvas = new_width;
	$('#main_canvas').attr('width', this.width_canvas + 'px');
	$('#canvas_box, #canvas_wrapper').css({ 'width': this.width_canvas + 'px' });
	$('#canvas_info #width').val(this.width_canvas + 'px');
	this.scale = 100;
	$('#canvas_info #size').val(this.scale + '%');
	_menu_top2.default.show_info();
}), _defineProperty(_scale$width_canvas$h, 'resize_height', function resize_height(new_height) {
	this.height_canvas = new_height;
	$('#main_canvas').attr('height', this.height_canvas + 'px');
	$('#canvas_box, #canvas_wrapper').css({ 'height': this.height_canvas + 'px' });
	$('#canvas_info #height').val(this.height_canvas + 'px');
	this.scale = 100;
	$('#canvas_info #size').val(this.scale + '%');
	_menu_top2.default.show_info(); // aktualizujemy dane odnośnie rozmiarów canvasa w menu u góry
	//this.draw(); //rysujemy na nowo canvas
}), _defineProperty(_scale$width_canvas$h, 'set_default', function set_default() {
	$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
	if (this.move_image) $('#canvas_box #image_resize').fadeIn(0);

	_canvas2.default.scale = 100;
	_canvas2.default.context_x = 0;
	_canvas2.default.context_y = 0;
	_canvas2.default.context.scale(_canvas2.default.scale / 100, _canvas2.default.scale / 100);

	var new_width = _canvas2.default.width_canvas * (_canvas2.default.scale / 100);
	var new_height = _canvas2.default.height_canvas * (_canvas2.default.scale / 100);
	$('#main_canvas').attr({ 'width': new_width + 'px', 'height': new_height + 'px' });
	$('#canvas_box, #canvas_wrapper').css({ 'width': new_width + 'px', 'height': new_height + 'px' });

	_canvas2.default.reset();
	_canvas2.default.context.translate(_canvas2.default.context_x / (_canvas2.default.scale / 100), _canvas2.default.context_y / (_canvas2.default.scale / 100));
	//canvas.draw();
	_menu_top2.default.show_info();
	//canvas.draw();
}), _scale$width_canvas$h);

},{"./canvas":2,"./image":8,"./menu_top":12,"./pointers":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
// ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
exports.default = {};

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
//var categories = {};
/*	

	//category : new Array(['pusty','#808080']),

	add : function(){
		var name = Array($('#category_box input[name="add_category"]').val(),'#ff0000');
		$('#category_box input[name="add_category"]').val('');

		this.category.push(name);
		menu_top.category = (this.category.length-1);
		this.show_list();
	},

	update : function(index,name){
		this.category[index][0] = name;
		this.show_list();
	},


	//aktualizujemy tablicę kolorów
	update_color : function(){

		//możliwa aktualizacja jedynie w przypadku wybrania konkretnej kolumny wartości i kategorii w excelu
		if((crud.map_json.length > 0) && (excel.data.length > 0) && (layers.category[layers.active] != -1) && (layers.value[layers.active] != -1)){

			for (var i_category = 0, i_category_max =	layers.category_name.length; i_category < i_category_max; i_category++){
				var name = layers.category_name[i_category];

				for (var i_exel = 0, i_exel_max = excel.data.length; i_exel < i_exel_max; i_exel++){
					if( excel.data[i_exel][layers.category[layers.active]] == name){
						//jeśli znaleźliśmy kategorię w excelu
						var value = excel.data[i_exel][layers.value[layers.active]];

						for ( var i_legends = 0, i_legends_max = layers.legends[layers.active].length; i_legends < i_legends_max; i_legends++ ){
							if( (value >= layers.legends[layers.active][i_legends][0]) && (value <= layers.legends[layers.active][i_legends][1]) ){
								//jeśli znaleźlismy
								layers.category_colors[layers.active][i_category] = layers.legends[layers.active][i_legends][3];
								i_legends = i_legends_max;
								i_exel = i_exel_max;
							}
						}

						//jeśli wartość wychodzi poza skale u tak przypisujemy jej odpowiedni kolor
						if(value < layers.legends[layers.active][0][0]){
							layers.category_colors[layers.active][i_category] = layers.legends[layers.active][0][3];
						}	

						if(value > layers.legends[layers.active][i_legends_max-1][1]){
							layers.category_colors[layers.active][i_category] = layers.legends[layers.active][i_legends_max-1][3];
						}

					}
				}
			}
		}

		//po zaktualizowaniu kolorów w kategoriach rysujemy na nowo canvas
		canvas.draw();


	},
}*/

},{}],4:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ╔═╗╦  ╔═╗╦ ╦╔╦╗
// ║  ║  ║ ║║ ║ ║║
// ╚═╝╩═╝╚═╝╚═╝═╩╝

exports.default = {

	set_textarea: function set_textarea() {
		$('#cloud .cloud_text').val(_layers2.default.cloud[_layers2.default.active]);
	},

	//ustawiamy poprawną pozycję dymka
	set_position: function set_position() {

		var left = _mouse2.default.left - _on_category2.default.canvas_offset_left;
		var top = _mouse2.default.top - _on_category2.default.canvas_offset_top;
		var width = $("#canvas_cloud").width();

		if (left + width > $("body").width() - 20) {
			left = left - width - 20;
		}

		$("#canvas_cloud").css({ top: parseInt(top - $("#canvas_cloud").height()) + 'px', left: left + 'px' });
	},

	//funkcja odpowiedzialna za wyświetlenie dymka z odpowiednią zawartością
	update_text: function update_text() {

		if (_on_category2.default.name != "" && _on_category2.default.name != 'null') {

			var tmp_row = null;
			var find = 0;

			for (var i_row = 0, i_row_max = _excel2.default.data.length; i_row < i_row_max; i_row++) {
				if (String(_on_category2.default.name).toLowerCase() == String(_excel2.default.data[i_row][_layers2.default.category[_layers2.default.active]]).toLowerCase()) {

					this.set_position();
					var text_tmp = _layers2.default.cloud[_layers2.default.active];

					for (var i = 0, i_max = _excel2.default.data[0].length; i < i_max; i++) {
						text_tmp = text_tmp.replace('{' + _excel2.default.data[0][i] + '}', _excel2.default.data[i_row][i]);
					}

					//dopiero jeśli dymek ma mieć jakaś konkretną zawartość wyświetlamy go
					if (text_tmp != "" && _excel2.default.data[i_row][_layers2.default.value[_layers2.default.active]] != null) {
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

};

},{"./excel":6,"./layers":10,"./mouse":13,"./on_category":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // ╔═╗╦═╗╦ ╦╔╦╗
// ║  ╠╦╝║ ║ ║║
// ╚═╝╩╚═╚═╝═╩╝

//import palets from './palets';


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

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

var _source = require('./source');

var _source2 = _interopRequireDefault(_source);

var _menu_top = require('./menu_top');

var _menu_top2 = _interopRequireDefault(_menu_top);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcja odpowiedzialna za tworzenie zapisywanie i aktualizacje danych dotycząćcyh mapy
exports.default = {

	map_json: Array(), //główna zmienna przechowująca wszystkie dane
	map_hash: null,
	layers: {},
	excel: Array(),
	project: {},
	project_hash: project_hash, //główny hash dotyczący naszego projektu

	//wczytanie zmiennych do obiektów mapy

	set_map: function set_map(data) {

		//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
		this.map_json = data;

		//pobieramy i wczytujemy dane o canvasie do obiektu
		_canvas2.default.height_canvas = data[0][0];
		_canvas2.default.width_canvas = data[0][1];
		_pointers2.default.padding_x = data[0][2];
		_pointers2.default.padding_y = data[0][3];
		_pointers2.default.translate_modulo = data[0][4];
		_pointers2.default.size = data[0][5];
		_pointers2.default.main_kind = data[0][6];
		_canvas2.default.title_project = data[0][7];

		if (_typeof(data[0][8]) == undefined) {
			_pointers2.default.color_border = "#000";
		} else {
			_pointers2.default.color_border = data[0][8];
		}

		if (_typeof(data[0][9]) == undefined) {
			_pointers2.default.show_border = false;
		} else {
			_pointers2.default.show_border = data[0][9];
		}

		$('#pointer_box input[name="padding_x"]').val(data[0][2]);
		$('#pointer_box input[name="padding_y"]').val(data[0][3]);
		$('#pointer_box input[name="size_pointer"]').val(data[0][5]);
		$('input[name="title_project"]').val(data[0][7]);

		if (data[0][4]) {
			$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
			$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
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
		var categories = {};
		categories.category = data[2];

		//po wczytaniu mapy aktyalizujemy dane dotyczącą kategorii i kolorów
		_layers2.default.category_colors[0] = [];
		_layers2.default.category_name = [];

		for (var i = 0, i_max = categories.category.length; i < i_max; i++) {
			_layers2.default.category_name.push(categories.category[i][0]);
			_layers2.default.category_colors[0].push(categories.category[i][1]);
		}

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

		//canvas.draw();
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

		//console.log( data.layers.category_colors );

		$('input[name="project_name"]').val(_layers2.default.project_name);

		//legends.show(); 
		_labels2.default.show();
		_layers2.default.show();
		_source2.default.show();

		var offset = $('#canvas_box').offset();
		_canvas2.default.offset_left = offset.left;
		_canvas2.default.offset_top = offset.top;
	},

	//pobieranie projektu z bazy danych i wczytanie
	get_project: function get_project() {

		var that = this;

		$.ajax({
			url: '/api/project/' + that.project_hash,
			type: "GET",
			contentType: "application/json"
		}).done(function (data) {
			that.set_project(data.data);
		});
	}

};

},{"./canvas":2,"./categories":3,"./excel":6,"./image":8,"./labels":9,"./layers":10,"./legends":11,"./menu_top":12,"./pointers":15,"./source":16}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ╔═╗═╗ ╦╔═╗╔═╗╦  
// ║╣ ╔╩╦╝║  ║╣ ║  
// ╚═╝╩ ╚═╚═╝╚═╝╩═╝

exports.default = {};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcje rysujące pojedyńczy punkt (pointer)
exports.default = {

  square: function square(x, y, size) {
    _canvas2.default.context.fillRect(x, y, size, size);
  },

  circle: function circle(x, y, size) {
    var size = size / 2;
    var center_x = x + size;
    var center_y = y + size;
    _canvas2.default.context.beginPath();
    _canvas2.default.context.arc(center_x, center_y, size, 0, 2 * Math.PI);
    _canvas2.default.context.fill();
  },

  hexagon: function hexagon(x, y, size) {
    var a = size / 4;
    var a2 = size / 2;
    var h = size / 2 * Math.sqrt(3) / 2;

    _canvas2.default.context.beginPath();
    _canvas2.default.context.moveTo(x, y + a2);
    _canvas2.default.context.lineTo(x + a, y + a2 - h);
    _canvas2.default.context.lineTo(x + a + a2, y + a2 - h);
    _canvas2.default.context.lineTo(x + size, y + a2);
    _canvas2.default.context.lineTo(x + size - a, y + a2 + h);
    _canvas2.default.context.lineTo(x + a, y + a2 + h);
    _canvas2.default.context.lineTo(x, y + a2);
    _canvas2.default.context.fill();
  },

  hexagon2: function hexagon2(x, y, size) {
    var a = size / 4;
    var a2 = size / 2;
    var h = size / 2 * Math.sqrt(3) / 2;

    _canvas2.default.context.beginPath();
    _canvas2.default.context.moveTo(x + a2, y);
    _canvas2.default.context.lineTo(x + a2 + h, y + a);
    _canvas2.default.context.lineTo(x + a2 + h, y + a2 + a);
    _canvas2.default.context.lineTo(x + a2, y + size);
    _canvas2.default.context.lineTo(x + a2 - h, y + a2 + a);
    _canvas2.default.context.lineTo(x + a2 - h, y + a);
    _canvas2.default.context.lineTo(x + a2, y);
    _canvas2.default.context.fill();
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
      _canvas2.default.context.fillRect(data.x + x_trans + 1, data.y + y_trans + 1, data.size + data.line_width_x + 1, 1);
    }

    if (data.border.top_left) {
      _canvas2.default.context.fillRect(data.x + x_trans + 1, data.y + y_trans + 1, parseInt((data.size + data.line_width_x + 1) / 2), 1);
    }

    if (data.border.top_right) {
      _canvas2.default.context.fillRect(data.x + x_trans + 1 + parseInt((data.size + data.line_width_x + 1) / 2), data.y + y_trans + 1, Math.ceil((data.size + data.line_width_x + 1) / 2), 1);
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

      _canvas2.default.context.fillRect(data.x + data.size + x_trans + 1, data.y - 1, 1, data.size + y_trans);
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
      _canvas2.default.context.fillRect(data.x + x_trans, data.y + y_trans, data.size + data.line_width_x + 3, 3);
    }

    if (data.border.top_left) {
      _canvas2.default.context.fillRect(data.x + x_trans, data.y + y_trans, parseInt((data.size + data.line_width_x + 3) / 2), 3);
    }

    if (data.border.top_right) {
      _canvas2.default.context.fillRect(data.x + x_trans + parseInt((data.size + data.line_width_x + 3) / 2), data.y + y_trans, Math.ceil((data.size + data.line_width_x + 3) / 2), 3);
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

      _canvas2.default.context.fillRect(data.x + data.size + x_trans, data.y, 3, data.size + y_trans);
    }
  }
}; // ┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌─┐
// ├┤ ││ ┬│ │├┬┘├┤ └─┐
// └  ┴└─┘└─┘┴└─└─┘└─┘

},{"./canvas":2}],8:[function(require,module,exports){
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
		_canvas2.default.context.globalAlpha = this.alpha / 10;
		_canvas2.default.context.drawImage(this.obj, this.x, this.y, this.width, this.height);

		$('#canvas_box #image_resize').css({ 'height': this.height, 'top': this.y + 'px', 'left': this.x + this.width + 'px' });
		_canvas2.default.context.globalAlpha = 1;
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

},{"./canvas":2}],9:[function(require,module,exports){
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
		$('#labels').html(_layers2.default.labels[_layers2.default.active]);
	}
};

},{"./labels":9,"./layers":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _legends = require('./legends');

var _legends2 = _interopRequireDefault(_legends);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _labels = require('./labels');

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ╦  ╔═╗╦ ╦╔═╗╦═╗╔═╗
// ║  ╠═╣╚╦╝║╣ ╠╦╝╚═╗
// ╩═╝╩ ╩ ╩ ╚═╝╩╚═╚═╝

//import palets from './palets';
exports.default = {

	list: ['zakładka 1'],
	active: 0,

	//tablica z podstawowywmi danymi zagregowanymi dla każdej warstwy
	palets_active: [0],

	value: [-1],
	colors_pos: [[1, 1, 1, 1, 1, 1, 1, 1, 1]],
	colors_active: [["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]],
	min_value: [0],
	max_value: [0],
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

	show: function show() {
		var that = this;
		if (this.list.length > 1) {
			var html = "";
			html += '<span num="' + 0 + '" class="active">' + this.list[0] + '</span>';

			for (var i = 1, i_max = this.list.length; i < i_max; i++) {
				html += '<span num="' + i + '">' + this.list[i] + '</span>';
			}

			$('#area').html(html);
			$('#area span').click(function () {
				that.select(this);
			});
		} else {
			$('#area').css('display', 'none');
		}
	},

	select: function select(obj) {

		$('#area span').removeClass('active');
		$(obj).addClass('active');

		this.active = $(obj).index();

		_labels2.default.show();
		_canvas2.default.draw();
	}
};

},{"./canvas":2,"./cloud":4,"./labels":9,"./legends":11}],11:[function(require,module,exports){
/*
//obiekt dotycząsy wyswietlania akutalizacji i edycji panelu legend
legends = {
	//wyświetlamy wszystkie legendy w panelu map
	show : function(){
  		var html = "";
  		for(var i = 0, i_max = layers.legends[layers.active].length; i < i_max; i++){
  			html += "<div> <span style='background-color:"+layers.legends[layers.active][i][3]+"'></span><span>"+layers.legends[layers.active][i][2]+"</span></div>";
  		}
      $('#legends').html(html);
	}
}*/
"use strict";

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt menu_top
exports.default = {

	move_image: false,
	move_canvas: false,
	auto_draw: false,
	mode_key: true,
	category: 0,
	disable_select: false,

	//zmiana aktualnej zakładki
	change_box: function change_box(obj) {
		console.log(obj);
		$(obj).parent().children('li').removeClass('active');
		$(obj).addClass('active');

		var category = $(obj).attr('category');
		$(obj).parent().parent().children('div').fadeOut(500, function () {
			$(obj).parent().parent().children('#' + category).delay(100).fadeIn(500);
		});
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
		_canvas2.default.scale = parseInt($('#canvas_info #size').val());
		_canvas2.default.width_canvas = parseInt($('#canvas_info #width').val());
		_canvas2.default.height_canvas = parseInt($('#canvas_info #height').val());

		$('#canvas_info #size').val(_canvas2.default.scale + '%');
		$('#canvas_info #width').val(_canvas2.default.width_canvas + 'px');
		$('#canvas_info #height').val(_canvas2.default.height_canvas + 'px');

		$('#canvas_box, #canvas_wrapper').css({ 'width': _canvas2.default.width_canvas + 'px', 'height': _canvas2.default.height_canvas + 'px' });
		$('#canvas_box #main_canvas').attr('width', _canvas2.default.width_canvas + 'px');
		$('#canvas_box #main_canvas').attr('height', _canvas2.default.height_canvas + 'px');
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
		$('#canvas_info #size').val(parseInt(_canvas2.default.scale) + '%');
		$('#canvas_info #width').val(parseInt(_canvas2.default.width_canvas) + 'px');
		$('#canvas_info #height').val(parseInt(_canvas2.default.height_canvas) + 'px');
	}

}; // ╔╦╗╔═╗╔╗╔╦ ╦  ╔╦╗╔═╗╔═╗
// ║║║║╣ ║║║║ ║   ║ ║ ║╠═╝
// ╩ ╩╚═╝╝╚╝╚═╝   ╩ ╚═╝╩

},{"./canvas":2,"./crud":5,"./image":8}],13:[function(require,module,exports){
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
				_canvas2.default.resize_height(this.top - this.padding_y - position.top);
				_canvas2.default.draw();
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

},{"./canvas":2,"./image":8,"./mouse":13}],14:[function(require,module,exports){
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

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt mówiący nam nad jaką kategoria jesteśmy
// ╔═╗╔╗╔  ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║ ║║║║  ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╝╚╝  ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩ 

exports.default = {

	canvas_offset_top: $('#canvas_wrapper').offset().top,
	canvas_offset_left: $('#canvas_wrapper').offset().left,
	name: null,
	number: null,

	//funkcja zwracająca aktualną kategorię nad którą znajduje się kursor
	set: function set() {

		var left = _mouse2.default.left - _canvas2.default.offset_left;
		var top = _mouse2.default.top - _canvas2.default.offset_top;
		//console.log(left,top);
		var row = Math.ceil(top / (_pointers2.default.size + _pointers2.default.padding_y));
		//console.log(left,top,this.canvas_offset_left,this.canvas_offset_top);
		if (_pointers2.default.translate_modulo && row % 2 != 0) {
			var column = Math.ceil((left + _pointers2.default.size / 2) / (_pointers2.default.size + _pointers2.default.padding_x)) - 1;
		} else {
			var column = Math.ceil(left / (_pointers2.default.size + _pointers2.default.padding_x));
		}

		try {

			var category_num = _pointers2.default.pointers[row - 1][column - 1];
			var category_name = _layers2.default.category_name[category_num];
			//console.log('test',category_name);
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

},{"./canvas":2,"./categories":3,"./cloud":4,"./layers":10,"./mouse":13,"./pointers":15}],15:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	show_all_point: true,
	padding_x: 1,
	padding_y: 1,
	show_border: false,
	color_border: '#333',
	translate_modulo: false,
	size: 10,
	main_kind: 'square',
	kinds: Array('square', 'circle', 'hexagon', 'hexagon2'),

	pointers: Array(), //pointers.pointers[rzad][kolumna] : kategoria[numer]

	last_column: null, //kolumna pointera który został ostatnio zmieniony
	last_row: null, //wiersz pointera który został ostatnio zmieniony

	draw_border: function draw_border(next) {

		var width_pointer = this.size + this.padding_x,
		    height_pointer = this.size + this.padding_y,
		    none_color = "rgba(0,0,0,0)",
		    border = {},
		    data = {};

		var next = next || false;

		if (this.main_kind == 'square' || this.main_kind == 'circle' || this.main_kind == 'hexagon') {

			//canvas.context.fillStyle = this.color_border;
			_canvas2.default.context.globalAlpha = 1;
			//canvas.context.fillStyle = 'rgba(128,0,0,1)';

			if (!next) {
				_canvas2.default.context.globalAlpha = 1;
				_canvas2.default.context.fillStyle = 'rgba(255,255,255,1)';
			} else {
				_canvas2.default.context.globalAlpha = 0.5;
				_canvas2.default.context.fillStyle = this.color_border;
			}

			for (var row = 0; row < _canvas2.default.active_row; row++) {
				for (var column = 0; column < _canvas2.default.active_column; column++) {

					if (this.pointers[row][column] != 0) {

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
								if (this.pointers[row - 1][column] != 0 && this.pointers[row - 1][column] != this.pointers[row][column]) {
									border.top = true;
								}
							} else {
								//jeśli tak to: sprawdzamy czy wiersz jest przesunięty
								if (row % 2 == 0) {
									if (column - 1 > 0) {
										if (this.pointers[row - 1][column] != 0 && this.pointers[row - 1][column] != this.pointers[row][column]) {
											border.top_left = true;
										}
									}
									if (this.pointers[row - 1][column + 1] != 0 && this.pointers[row - 1][column + 1] != this.pointers[row][column]) {
										border.top_right = true;
									}
								} else {
									if (this.pointers[row - 1][column - 1] != 0 && this.pointers[row - 1][column - 1] != this.pointers[row][column]) {
										border.top_left = true;
									}
									if (column + 1 <= _canvas2.default.active_column) {
										if (this.pointers[row - 1][column] != 0 && this.pointers[row - 1][column] != this.pointers[row][column]) {
											border.top_right = true;
										}
									}
								}
							}
						}

						if (column + 1 <= _canvas2.default.active_column) {
							if (this.pointers[row][column + 1] != 0 && this.pointers[row][column + 1] != this.pointers[row][column]) {
								border.right = true;
							}
						}

						data = {
							x: column * width_pointer,
							y: row * height_pointer,
							size: this.size,
							border: border,
							line_width_x: _pointers2.default.padding_x,
							line_width_y: _pointers2.default.padding_y,
							t_modulo: false
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
		//console.log('draw',this.size,layers.category_colors); 
		var width_pointer = this.size + this.padding_x;
		var height_pointer = this.size + this.padding_y;
		var none_color = "rgba(0,0,0,0)";

		//if(this.show_all_point) none_color = "rgba(128,128,128,1)";

		for (var row = 0; row < _canvas2.default.active_row; row++) {
			for (var column = 0; column < _canvas2.default.active_column; column++) {

				if (this.pointers[row][column] == 0) {
					_canvas2.default.context.fillStyle = none_color;
					_canvas2.default.context.globalAlpha = 0.5;
				} else {
					if (this.pointers[row][column] != _menu_top2.default.category && _menu_top2.default.category != 0) {
						_canvas2.default.context.globalAlpha = 0.2;
					} else {
						_canvas2.default.context.globalAlpha = 1;
					}
					try {
						_canvas2.default.context.fillStyle = _layers2.default.category_colors[_layers2.default.active][this.pointers[row][column]];
					} catch (e) {
						console.log('ERROR 39 LINE ! ', this.pointers[row][column], row, column);
					}
				}

				if (row % 2 == 0 && _pointers2.default.translate_modulo) {
					_figures2.default[this.main_kind](column * width_pointer + width_pointer / 2, row * height_pointer, this.size);
				} else {
					_figures2.default[this.main_kind](column * width_pointer, row * height_pointer, this.size);
				}
			}
		}

		if (this.show_border) {
			this.draw_border();
		}
	},

	//tworzymy tablice ponterów (jeśli jakiś ponter istnieje zostawiamy go, w przypadku gdy pointera nie ma tworzymy go na nowo)
	create_array: function create_array() {
		_canvas2.default.active_row = parseInt(_canvas2.default.height_canvas / (_pointers2.default.size + _pointers2.default.padding_y));
		_canvas2.default.active_column = parseInt(_canvas2.default.width_canvas / (_pointers2.default.size + _pointers2.default.padding_x));

		if (this.pointers.length < _canvas2.default.active_row || this.pointers[0].length < _canvas2.default.active_column) {
			for (var row = 0; row < _canvas2.default.active_row; row++) {
				for (var column = 0; column < _canvas2.default.active_column; column++) {
					if (this.pointers[row] == undefined) this.pointers[row] = new Array();
					if (this.pointers[row][column] == undefined) this.pointers[row][column] = 0;
				}
			}
		}
	},

	update_point: function update_point(y, x, y_last, x_last) {

		this.pointers[y][x] = parseInt(_menu_top2.default.category);

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
				this.pointers[row][col] = parseInt(_menu_top2.default.category);
			}

			var col = null;
			for (var row = row_from; row <= row_to; row++) {
				col = parseInt((row - b) / a);
				if (!$.isNumeric(col)) col = x;
				this.pointers[row][col] = parseInt(_menu_top2.default.category);
			}
		} else {
			this.pointers[y][x] = parseInt(_menu_top2.default.category);
		}
	}
};
// ╔═╗╔═╗╦╔╗╔╔╦╗╔═╗╦═╗╔═╗
// ╠═╝║ ║║║║║ ║ ║╣ ╠╦╝╚═╗
// ╩  ╚═╝╩╝╚╝ ╩ ╚═╝╩╚═╚═╝

},{"./canvas":2,"./figures":7,"./layers":10,"./menu_top":12,"./pointers":15}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layers = require('./layers');

var _layers2 = _interopRequireDefault(_layers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show() {
    //console.log( layers.source );
    $('#source').html(_layers2.default.source);
  }
};

},{"./layers":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL2VtYmVkLmpzIiwicHVibGljLWRldi9qcy9lbWJlZC9tb2R1bGVzL2NhbnZhcy5qcyIsInB1YmxpYy1kZXYvanMvZW1iZWQvbW9kdWxlcy9jYXRlZ29yaWVzLmpzIiwicHVibGljLWRldi9qcy9lbWJlZC9tb2R1bGVzL2Nsb3VkLmpzIiwicHVibGljLWRldi9qcy9lbWJlZC9tb2R1bGVzL2NydWQuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvZXhjZWwuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvZmlndXJlcy5qcyIsInB1YmxpYy1kZXYvanMvZW1iZWQvbW9kdWxlcy9pbWFnZS5qcyIsInB1YmxpYy1kZXYvanMvZW1iZWQvbW9kdWxlcy9sYWJlbHMuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvbGF5ZXJzLmpzIiwicHVibGljLWRldi9qcy9lbWJlZC9tb2R1bGVzL2xlZ2VuZHMuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvbWVudV90b3AuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvbW91c2UuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvb25fY2F0ZWdvcnkuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvcG9pbnRlcnMuanMiLCJwdWJsaWMtZGV2L2pzL2VtYmVkL21vZHVsZXMvc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNRQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSxnQkFBRixFQUFvQixLQUFwQixDQUEwQixZQUFVO0FBQUUsb0JBQVMsVUFBVCxDQUFv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SSxJQUFJLE1BQU0sUUFBZCxFQUF3QixPQUFPLE1BQS9CLEVBQXVDLEtBQXZDLEVBQ0E7QUFDQyxVQUFNLFNBQVUsQ0FBQyxNQUFJLENBQUwsSUFBUSxDQUFsQixDQUFOO0FBQ0EsUUFBRyxDQUFDLEVBQUUsU0FBRixDQUFZLEdBQVosQ0FBSixFQUFzQixNQUFNLENBQU47QUFDdEIsU0FBSyxRQUFMLENBQWMsR0FBZCxFQUFtQixHQUFuQixJQUEwQixTQUFVLG1CQUFTLFFBQW5CLENBQTFCO0FBQ0E7QUFDRCxHQW5DRCxNQW9DSTtBQUNILFFBQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsQ0FBakIsSUFBc0IsU0FBVSxtQkFBUyxRQUFuQixDQUF0QjtBQUNBO0FBQ0Q7QUF6T2EsQztBQVZmO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDSEE7Ozs7OztrQkFFZTtBQUNiLFFBQU8sZ0JBQVU7QUFDZjtBQUNBLE1BQUUsU0FBRixFQUFhLElBQWIsQ0FBbUIsaUJBQU8sTUFBMUI7QUFDRDtBQUpZLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8g4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVlyDilojilojilojilojilojilojilZcg4paI4paI4paI4pWXICAg4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilojilojilojilojilZcgICAgIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyAgICDilojilojilZdcbi8vIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkeKWiOKWiOKVlOKVkOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKVlyDilojilojilojilojilZHilojilojilZTilZDilZDilojilojilZfilojilojilZTilZDilZDilojilojilZcgICAg4pWa4pWQ4pWQ4pWQ4pWQ4paI4paI4pWXICDilojilojilojilZFcbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkeKWiOKWiOKVkSAgIOKWiOKWiOKVkeKWiOKWiOKVlOKWiOKWiOKWiOKWiOKVlOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVnSAgICAg4paI4paI4paI4paI4paI4pWU4pWdICDilZrilojilojilZFcbi8vIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkeKWiOKWiOKVkeKWhOKWhCDilojilojilZHilojilojilZHilZrilojilojilZTilZ3ilojilojilZHilojilojilZTilZDilZDilojilojilZHilojilojilZTilZDilZDilZDilZ0gICAgICDilZrilZDilZDilZDilojilojilZcgICDilojilojilZFcbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkeKVmuKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkSDilZrilZDilZ0g4paI4paI4pWR4paI4paI4pWRICDilojilojilZHilojilojilZEgICAgICAgICDilojilojilojilojilojilojilZTilZ3ilojilojilZfilojilojilZFcbi8vIOKVmuKVkOKVkOKVkOKVkOKVkOKVnSDilZrilZDilZ0g4pWa4pWQ4pWQ4paA4paA4pWQ4pWdIOKVmuKVkOKVnSAgICAg4pWa4pWQ4pWd4pWa4pWQ4pWdICDilZrilZDilZ3ilZrilZDilZ0gICAgICAgICDilZrilZDilZDilZDilZDilZDilZ0g4pWa4pWQ4pWd4pWa4pWQ4pWdXG4vLyB3ZXJzamE6IDMuMS41IGF1dG9yOiBNYXJjaW4gR8SZYmFsYVxuIFxuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbW9kdWxlcy9tZW51X3RvcCc7XG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbW9kdWxlcy9sYXllcnMnOyBcbi8vaW1wb3J0IHBhbGV0cyBmcm9tICcuL21vZHVsZXMvcGFsZXRzJztcbi8vaW1wb3J0IGNvbG9ycGlja2VyIGZyb20gJy4vbW9kdWxlcy9jb2xvcnBpY2tlcic7XG5pbXBvcnQgY3J1ZCBmcm9tICcuL21vZHVsZXMvY3J1ZCc7XG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb2R1bGVzL21vdXNlJzsgXG5pbXBvcnQgcG9pbnRlcnMgZnJvbSAnLi9tb2R1bGVzL3BvaW50ZXJzJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9tb2R1bGVzL2NhbnZhcyc7XG5pbXBvcnQgY2F0ZWdvcmllcyBmcm9tICcuL21vZHVsZXMvY2F0ZWdvcmllcyc7IFxuaW1wb3J0IGV4Y2VsIGZyb20gJy4vbW9kdWxlcy9leGNlbCc7IFxuaW1wb3J0IGxlZ2VuZHMgZnJvbSAnLi9tb2R1bGVzL2xlZ2VuZHMnOyAgXG5pbXBvcnQgb25fY2F0ZWdvcnkgZnJvbSAnLi9tb2R1bGVzL29uX2NhdGVnb3J5JztcbmltcG9ydCBjbG91ZCBmcm9tICcuL21vZHVsZXMvY2xvdWQnO1xuLy9pbXBvcnQgZ2xvYmFsIGZyb20gJy4vbW9kdWxlcy9nbG9iYWwnOyBcbi8vaW1wb3J0IG1vZGVscyBmcm9tICcuL21vZHVsZXMvbW9kZWxzJztcbiBcbi8vcG8ga2xpa25pxJljaXUgem1pZW5pYXkgYWt0dWFsbnkgcGFuZWxcbiQoJy5ib3ggPiB1bCA+IGxpJykuY2xpY2soZnVuY3Rpb24oKXsgbWVudV90b3AuY2hhbmdlX2JveCh0aGlzKSB9KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXsgXG5cblx0Ly9wcnp5cGlzYW5pZSBwb2RzdGF3b3dvd3ljaCBkYW55Y2ggZG8gb2JpZWt0dSBjYW52YXNcblx0Y2FudmFzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluX2NhbnZhcycpO1xuICBjYW52YXMuY29udGV4dCA9IGNhbnZhcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY2FudmFzLndpZHRoX2NhbnZhcyA9IHBhcnNlSW50KCAkKCcjbWFpbl9jYW52YXMnKS5hdHRyKCd3aWR0aCcpICk7XG4gIGNhbnZhcy5oZWlnaHRfY2FudmFzID0gcGFyc2VJbnQoICQoJyNtYWluX2NhbnZhcycpLmF0dHIoJ2hlaWdodCcpICk7IFxuICB2YXIgb2Zmc2V0ID0gJCgnI2NhbnZhc19ib3gnKS5vZmZzZXQoKTsgXG4gIGNhbnZhcy5vZmZzZXRfbGVmdCA9IG9mZnNldC5sZWZ0O1xuICBjYW52YXMub2Zmc2V0X3RvcCA9IG9mZnNldC50b3A7XG5cbiAgLy90d29yenlteSB0YWJsaWNlIHBvaW50ZXLDs3dcblx0cG9pbnRlcnMuY3JlYXRlX2FycmF5KCk7XG5cblx0Ly9vZHpuYWN6ZW5pZSBzZWxlY3RhIHByenkgem1pYW5pZVxuXHQvLyQvLygnI2NoYW5nZV9jYXRlZ29yeScpLmNoYW5nZShmdW5jdGlvbigpeyAkKCcjY2hhbmdlX2NhdGVnb3J5JykuYmx1cigpOyB9KTtcblxuXHQvL3JlamVzdHJhY2phIHpkYXJ6ZW5pYSB3IG1vbWVuY2llIHB1c2N6ZW5pYSBwcnp5Y2lza3UgbXlzemtpXG5cdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oKXsgbW91c2UubW91c2VfZG93biA9IGZhbHNlOyB9KTtcblxuXHQvL3JlamVzdHJhY2phIHpkYXJ6ZW5pYSB3IG1vbWVuY2llIHdjacWbbmnEmWNpYSBwcnp5Y2lza3UgbXlzemtpXG5cdCQoZG9jdW1lbnQpLm1vdXNlZG93bihmdW5jdGlvbihldmVudCl7XG5cdFx0aWYgKCFldmVudCkge2V2ZW50ID0gd2luZG93LmV2ZW50O30gLy/FgmF0YSBkbGEgbW96aWxsaVxuXHRcdG1vdXNlLnNldF9tb3VzZV9kb3duKGV2ZW50KTtcblx0fSk7XG5cblx0Ly93eXdvxYJhbmllIGZ1bmtjamkgcG9kY3phcyBwb3J1c3phbmlhIG15c3prxIVcblx0JChkb2N1bWVudCkubW91c2Vtb3ZlKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRpZiAoIWV2ZW50KSB7ZXZlbnQgPSB3aW5kb3cuZXZlbnQ7fSAvL2xhdGEgZGxhIG1vemlsbGlcblx0XHRtb3VzZS5zZXRfcG9zaXRpb24oZXZlbnQpOyAvL3phcmVqZXN0cm93YW5pZSBwb3p5Y2ppIG15c3praVxuXHRcdC8vamVzbGkgcHJ6eWNpc2sgamVzdCB3Y2nFm25pxJl0eSB3eWtvbnVqZW15IGRvZGF0a293ZSB6ZGFyemVuaWEgKHByenkgcnVzemFuaXUgbXlzemvEhSlcblx0XHRpZihtb3VzZS5tb3VzZV9kb3duKSBtb3VzZS5tb3VzZW1vdmUoZXZlbnQpO1xuXHRcdGlmKG1lbnVfdG9wLmF1dG9fZHJhdyl7IG1vdXNlLmNsaWNrX29iaiA9IFwiY2FudmFzXCI7IG1vdXNlLm1vdXNlbW92ZShldmVudCk7fVxuXHR9KTtcblxuXHQkKCcjbWFpbl9jYW52YXMnKS5tb3VzZWRvd24oZnVuY3Rpb24oZXZlbnQpe1xuXG5cdFx0aWYgKCFldmVudCkge2V2ZW50ID0gd2luZG93LmV2ZW50O30gLy9sYXRhIGRsYSBtb3ppbGxpXG5cdFx0bW91c2Uuc2V0X21vdXNlX2Rvd24oZXZlbnQpOy8vemFyZWplc3Ryb3dhbmllIG9iaWVrdHV3ICBrdMOzcnkga2xpa2FteVxuXHRcdG1vdXNlLnNldF9wb3NpdGlvbihldmVudCk7IC8vemFyZWplc3Ryb3dhbmllIHBvenljamkgbXlzemtpXG5cdFx0Ly9qZXNsaSBwcnp5Y2lzayBqZXN0IHdjacWbbmnEmXR5IHd5a29udWplbXkgZG9kYXRrb3dlIHpkYXJ6ZW5pYSAocHJ6eSBydXN6YW5pdSBteXN6a8SFKVxuXHRcdG1vdXNlLm1vdXNlbW92ZShldmVudCk7XG5cblx0fSk7XG5cblx0JChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbigpe1xuXG5cdFx0cG9pbnRlcnMubGFzdF9jb2x1bW4gPSBudWxsO1x0Ly9rb2x1bW5hIHBvaW50ZXJhIGt0w7NyeSB6b3N0YcWCIG9zdGF0bmlvIHptaWVuaW9ueVxuXHRcdHBvaW50ZXJzLmxhc3Rfcm93ID0gbnVsbDtcblx0XHRjYW52YXMuY29udGV4dF94ID0gY2FudmFzLmNvbnRleHRfbmV3X3g7XG5cdFx0Y2FudmFzLmNvbnRleHRfeSA9IGNhbnZhcy5jb250ZXh0X25ld195O1xuXG5cdH0pO1xuXG5cdGNydWQuZ2V0X3Byb2plY3QoKTtcblxuICAvL3BhcmVudC5wb3N0TWVzc2FnZSgkKCdib2R5JykuaGVpZ2h0KCksJ2h0dHA6Ly8nK2xvY2F0aW9uLmhyZWYuc3BsaXQoICcvJyApWzJdKTtcbn0pO1xuICAgXG4kKCcjY2FudmFzX3dyYXBwZXInKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCl7ICQoXCIjY2FudmFzX2Nsb3VkXCIpLmZhZGVPdXQoMjAwKTsgfSk7XG5cbiQoJyNjYW52YXNfd3JhcHBlcicpLm1vdXNlbW92ZShmdW5jdGlvbigpe1xuICBvbl9jYXRlZ29yeS5zZXQoKTtcbiAgY2xvdWQudXBkYXRlX3RleHQoKTsgIFxufSk7XG5cbiQoXCIjY2FudmFzX2Nsb3VkXCIpLm1vdXNlbW92ZShmdW5jdGlvbigpeyBjbG91ZC5zZXRfcG9zaXRpb24oKTsgfSk7XG4iLCIvLyDilZTilZDilZfilZTilZDilZfilZTilZfilZTilaYgIOKVpuKVlOKVkOKVl+KVlOKVkOKVl1xuLy8g4pWRICDilaDilZDilaPilZHilZHilZHilZrilZfilZTilZ3ilaDilZDilaPilZrilZDilZdcbi8vIOKVmuKVkOKVneKVqSDilanilZ3ilZrilZ0g4pWa4pWdIOKVqSDilanilZrilZDilZ1cblxuaW1wb3J0IHBvaW50ZXJzIGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgbWVudV90b3AgZnJvbSAnLi9tZW51X3RvcCc7XG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XG5cbi8vY3p5c3pjemVuaWUgaSByeXNvd2FuaWUgcG8gY2FudmFzaWVcbmV4cG9ydCBkZWZhdWx0IHtcblx0IFxuXHRzY2FsZSA6IDEwMCxcblx0d2lkdGhfY2FudmFzIDogNzAwLFxuXHRoZWlnaHRfY2FudmFzIDogNDAwLFxuXHRjYW52YXMgOiBudWxsLFxuXHRjb250ZXh0IDogbnVsbCxcblx0dGh1bWJuYWlsIDogbnVsbCxcblx0dGl0bGVfcHJvamVjdCA6ICdub3d5IHByb2pla3QnLFxuXG5cdGNvbnRleHRfeCA6IDAsIC8vb2JlY25hIHBvenljamEgY29udGV4dHUgeFxuXHRjb250ZXh0X3kgOiAwLCAvL29iZWNuYSBwb3p5Y2phIGNvbnRleHR1IHlcblx0Y29udGV4dF9uZXdfeCA6IDAsIC8vbm93YSBwb3p5Y2phIGNvbnRleHR1IHhcblx0Y29udGV4dF9uZXdfeSA6IDAsIC8vbm93YSBwb3p5Y2phIGNvbnRleHR1IHlcblxuXHRvZmZzZXRfbGVmdCA6IG51bGwsXG5cdG9mZnNldF90b3AgOiBudWxsLFxuXHRhY3RpdmVfcm93IDogbnVsbCwgLy9saWN6YmEgYWt0eXdueWNoIHdpZXJzenkgaSBrb2x1bW5cblx0YWN0aXZlX2NvbHVtbiA6IG51bGwsIC8vbGljemJhIGFrdHl3bnljaCB3aWVyc3p5IGkga29sdW1uXG5cblx0dGh1bWJuYWlsIDogZnVuY3Rpb24oKXtcblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluX2NhbnZhc1wiKTtcblx0XHR2YXIgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcblx0XHRjb25zb2xlLmxvZyhkYXRhVVJMKTtcblx0fSxcblxuXHQvL3J5c3VqZW15IGNhbnZhcyB6ZSB6ZGrEmWNpZW1cblx0ZHJhdyA6IGZ1bmN0aW9uKCl7XG5cdFx0Ly9jb25zb2xlLmxvZygnY2FudmFzIGRyYXcnKTtcblx0XHR0aGlzLmNsZWFyKCk7XG5cblx0XHRwb2ludGVycy5jcmVhdGVfYXJyYXkoKTtcblx0XHRwb2ludGVycy5kcmF3KCk7XG5cblx0XHRpZiAoaW1hZ2Uub2JqICE9PSB1bmRlZmluZWQpICBpbWFnZS5kcmF3KCk7XG5cdH0sXG5cblx0ZHJhd190aHVtbmFpbCA6IGZ1bmN0aW9uKCl7XG5cblx0XHRjYW52YXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RodW1ibmFpbF9jYW52YXMnKTtcblx0XHRjYW52YXMudGh1bWJuYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RodW1ibmFpbF9jYW52YXMnKTtcblx0XHRjYW52YXMuY29udGV4dCA9IGNhbnZhcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdHRoaXMuY2xlYXIoKTtcblxuXHRcdHBvaW50ZXJzLmNyZWF0ZV9hcnJheSgpO1xuXHRcdHBvaW50ZXJzLmRyYXcoKTtcblxuXHRcdGNhbnZhcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbl9jYW52YXMnKTtcblx0XHRjYW52YXMuY29udGV4dCA9IGNhbnZhcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHR9LFxuXG5cdC8vcmVzZXR1amVteSB0xYJvIHpkasSZY2lhXG5cdHJlc2V0IDogZnVuY3Rpb24oKXtcblx0XHR0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuXHRcdGNhbnZhcy5jb250ZXh0LnNjYWxlKCBjYW52YXMuc2NhbGUgLyAxMDAgLCBjYW52YXMuc2NhbGUgLyAxMDAgKTtcblx0fSxcblxuXHQvLyBjennFm2NpbXkgY2HFgmUgemRqxJljaWUgbmEgY2FudmFzaWVcblx0Y2xlYXIgOiBmdW5jdGlvbigpe1xuXHRcdHRoaXMuY29udGV4dC5jbGVhclJlY3QgKCAwLCAwLCB0aGlzLndpZHRoX2NhbnZhcywgdGhpcy5oZWlnaHRfY2FudmFzICk7XG5cdFx0Ly90aGlzLmNvbnRleHQuZmlsbFJlY3QgKCAwLCAwLCB0aGlzLndpZHRoX2NhbnZhcywgdGhpcy5oZWlnaHRfY2FudmFzICk7XG5cdH0sXG5cblx0cmVzaXplX3dpZHRoIDogZnVuY3Rpb24obmV3X3dpZHRoKXtcblx0XHR0aGlzLndpZHRoX2NhbnZhcyA9IG5ld193aWR0aDtcblx0XHQkKCcjbWFpbl9jYW52YXMnKS5hdHRyKCd3aWR0aCcsdGhpcy53aWR0aF9jYW52YXMgKyAncHgnKTtcblx0XHQkKCcjY2FudmFzX2JveCwgI2NhbnZhc193cmFwcGVyJykuY3NzKHsnd2lkdGgnOiB0aGlzLndpZHRoX2NhbnZhcyArICdweCd9KTtcblx0XHQkKCcjY2FudmFzX2luZm8gI3dpZHRoJykudmFsKHRoaXMud2lkdGhfY2FudmFzICsgJ3B4Jyk7XG5cdFx0dGhpcy5zY2FsZSA9IDEwMDtcblx0XHQkKCcjY2FudmFzX2luZm8gI3NpemUnKS52YWwodGhpcy5zY2FsZSArICclJyk7XG5cdFx0bWVudV90b3Auc2hvd19pbmZvKCk7XG5cdH0sXG5cblx0cmVzaXplX2hlaWdodCA6IGZ1bmN0aW9uKG5ld19oZWlnaHQpe1xuXHRcdHRoaXMuaGVpZ2h0X2NhbnZhcyA9IG5ld19oZWlnaHQ7XG5cdFx0JCgnI21haW5fY2FudmFzJykuYXR0cignaGVpZ2h0Jyx0aGlzLmhlaWdodF9jYW52YXMgKyAncHgnKTtcblx0XHQkKCcjY2FudmFzX2JveCwgI2NhbnZhc193cmFwcGVyJykuY3NzKHsnaGVpZ2h0JzogdGhpcy5oZWlnaHRfY2FudmFzICsgJ3B4J30pO1xuXHRcdCQoJyNjYW52YXNfaW5mbyAjaGVpZ2h0JykudmFsKHRoaXMuaGVpZ2h0X2NhbnZhcyArICdweCcpO1xuXHRcdHRoaXMuc2NhbGUgPSAxMDA7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNzaXplJykudmFsKHRoaXMuc2NhbGUrJyUnKTtcblx0XHRtZW51X3RvcC5zaG93X2luZm8oKTsgLy8gYWt0dWFsaXp1amVteSBkYW5lIG9kbm/Fm25pZSByb3ptaWFyw7N3IGNhbnZhc2EgdyBtZW51IHUgZ8Ozcnlcblx0XHQvL3RoaXMuZHJhdygpOyAvL3J5c3VqZW15IG5hIG5vd28gY2FudmFzXG5cdH0sXG5cblx0c2V0X2RlZmF1bHQgOiBmdW5jdGlvbigpe1xuXHRcdCQoJyNjYW52YXNfYm94ICNyaWdodF9yZXNpemUsICNjYW52YXNfYm94ICNib3R0b21fcmVzaXplJykuZmFkZUluKDUwMCk7XG5cdFx0aWYodGhpcy5tb3ZlX2ltYWdlKSAkKCcjY2FudmFzX2JveCAjaW1hZ2VfcmVzaXplJykuZmFkZUluKDApO1xuXG5cdFx0Y2FudmFzLnNjYWxlID0gMTAwO1xuXHRcdGNhbnZhcy5jb250ZXh0X3ggPSAwO1xuXHRcdGNhbnZhcy5jb250ZXh0X3kgPSAwO1xuXHRcdGNhbnZhcy5jb250ZXh0LnNjYWxlKCBjYW52YXMuc2NhbGUgLyAxMDAgLCBjYW52YXMuc2NhbGUgLyAxMDAgKTtcblxuXHRcdHZhciBuZXdfd2lkdGggPSBjYW52YXMud2lkdGhfY2FudmFzICogKGNhbnZhcy5zY2FsZS8xMDApO1xuXHRcdHZhciBuZXdfaGVpZ2h0ID0gY2FudmFzLmhlaWdodF9jYW52YXMgKiAoY2FudmFzLnNjYWxlLzEwMCk7XG5cdFx0JCgnI21haW5fY2FudmFzJykuYXR0cih7J3dpZHRoJzogbmV3X3dpZHRoICsgJ3B4JywnaGVpZ2h0JzogbmV3X2hlaWdodCArICdweCd9KTtcblx0XHQkKCcjY2FudmFzX2JveCwgI2NhbnZhc193cmFwcGVyJykuY3NzKHsnd2lkdGgnOiBuZXdfd2lkdGggKyAncHgnLCdoZWlnaHQnIDogbmV3X2hlaWdodCArICdweCd9KTtcblxuXHRcdGNhbnZhcy5yZXNldCgpO1xuXHRcdGNhbnZhcy5jb250ZXh0LnRyYW5zbGF0ZSggKCBjYW52YXMuY29udGV4dF94IC8gKGNhbnZhcy5zY2FsZSAvIDEwMCkgKSwoIGNhbnZhcy5jb250ZXh0X3kgLyAoY2FudmFzLnNjYWxlIC8gMTAwKSApKTtcblx0XHQvL2NhbnZhcy5kcmF3KCk7XG5cdFx0bWVudV90b3Auc2hvd19pbmZvKCk7XG5cdFx0Ly9jYW52YXMuZHJhdygpO1xuXHR9XG59IiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWm4pWQ4pWX4pWmIOKVplxuLy8g4pWRICDilaDilZDilaMg4pWRIOKVkeKVoyDilZEg4pWm4pWRIOKVkeKVoOKVpuKVneKVmuKVpuKVnVxuLy8g4pWa4pWQ4pWd4pWpIOKVqSDilakg4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWp4pWa4pWQIOKVqSBcblxuLy9vYmlla3Qga2F0ZWdvcmlpIGRvZGFuaWUgLyBha3R1YWxpemFjamEgLyB1c3VuacSZY2llIC8gcG9rYXphbmllIGthdGVnb3JpaVxuZXhwb3J0IGRlZmF1bHQge1xufVxuXG4vL29iaWVrdCBrYXRlZ29yaWkgZG9kYW5pZSAvIGFrdHVhbGl6YWNqYSAvIHVzdW5pxJljaWUgLyBwb2themFuaWUga2F0ZWdvcmlpXG4vL3ZhciBjYXRlZ29yaWVzID0ge307XG4vKlx0XG5cblx0Ly9jYXRlZ29yeSA6IG5ldyBBcnJheShbJ3B1c3R5JywnIzgwODA4MCddKSxcblxuXHRhZGQgOiBmdW5jdGlvbigpe1xuXHRcdHZhciBuYW1lID0gQXJyYXkoJCgnI2NhdGVnb3J5X2JveCBpbnB1dFtuYW1lPVwiYWRkX2NhdGVnb3J5XCJdJykudmFsKCksJyNmZjAwMDAnKTtcblx0XHQkKCcjY2F0ZWdvcnlfYm94IGlucHV0W25hbWU9XCJhZGRfY2F0ZWdvcnlcIl0nKS52YWwoJycpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeS5wdXNoKG5hbWUpO1xuXHRcdG1lbnVfdG9wLmNhdGVnb3J5ID0gKHRoaXMuY2F0ZWdvcnkubGVuZ3RoLTEpO1xuXHRcdHRoaXMuc2hvd19saXN0KCk7XG5cdH0sXG5cblx0dXBkYXRlIDogZnVuY3Rpb24oaW5kZXgsbmFtZSl7XG5cdFx0dGhpcy5jYXRlZ29yeVtpbmRleF1bMF0gPSBuYW1lO1xuXHRcdHRoaXMuc2hvd19saXN0KCk7XG5cdH0sXG5cblxuXHQvL2FrdHVhbGl6dWplbXkgdGFibGljxJkga29sb3LDs3dcblx0dXBkYXRlX2NvbG9yIDogZnVuY3Rpb24oKXtcblxuXHRcdC8vbW/FvGxpd2EgYWt0dWFsaXphY2phIGplZHluaWUgdyBwcnp5cGFka3Ugd3licmFuaWEga29ua3JldG5laiBrb2x1bW55IHdhcnRvxZtjaSBpIGthdGVnb3JpaSB3IGV4Y2VsdVxuXHRcdGlmKChjcnVkLm1hcF9qc29uLmxlbmd0aCA+IDApICYmIChleGNlbC5kYXRhLmxlbmd0aCA+IDApICYmIChsYXllcnMuY2F0ZWdvcnlbbGF5ZXJzLmFjdGl2ZV0gIT0gLTEpICYmIChsYXllcnMudmFsdWVbbGF5ZXJzLmFjdGl2ZV0gIT0gLTEpKXtcblxuXHRcdFx0Zm9yICh2YXIgaV9jYXRlZ29yeSA9IDAsIGlfY2F0ZWdvcnlfbWF4ID1cdGxheWVycy5jYXRlZ29yeV9uYW1lLmxlbmd0aDsgaV9jYXRlZ29yeSA8IGlfY2F0ZWdvcnlfbWF4OyBpX2NhdGVnb3J5Kyspe1xuXHRcdFx0XHR2YXIgbmFtZSA9IGxheWVycy5jYXRlZ29yeV9uYW1lW2lfY2F0ZWdvcnldO1xuXG5cdFx0XHRcdGZvciAodmFyIGlfZXhlbCA9IDAsIGlfZXhlbF9tYXggPSBleGNlbC5kYXRhLmxlbmd0aDsgaV9leGVsIDwgaV9leGVsX21heDsgaV9leGVsKyspe1xuXHRcdFx0XHRcdGlmKCBleGNlbC5kYXRhW2lfZXhlbF1bbGF5ZXJzLmNhdGVnb3J5W2xheWVycy5hY3RpdmVdXSA9PSBuYW1lKXtcblx0XHRcdFx0XHRcdC8vamXFm2xpIHpuYWxlxbpsacWbbXkga2F0ZWdvcmnEmSB3IGV4Y2VsdVxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gZXhjZWwuZGF0YVtpX2V4ZWxdW2xheWVycy52YWx1ZVtsYXllcnMuYWN0aXZlXV07XG5cblx0XHRcdFx0XHRcdGZvciAoIHZhciBpX2xlZ2VuZHMgPSAwLCBpX2xlZ2VuZHNfbWF4ID0gbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV0ubGVuZ3RoOyBpX2xlZ2VuZHMgPCBpX2xlZ2VuZHNfbWF4OyBpX2xlZ2VuZHMrKyApe1xuXHRcdFx0XHRcdFx0XHRpZiggKHZhbHVlID49IGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW2lfbGVnZW5kc11bMF0pICYmICh2YWx1ZSA8PSBsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXVtpX2xlZ2VuZHNdWzFdKSApe1xuXHRcdFx0XHRcdFx0XHRcdC8vamXFm2xpIHpuYWxlxbpsaXNteVxuXHRcdFx0XHRcdFx0XHRcdGxheWVycy5jYXRlZ29yeV9jb2xvcnNbbGF5ZXJzLmFjdGl2ZV1baV9jYXRlZ29yeV0gPSBsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXVtpX2xlZ2VuZHNdWzNdO1xuXHRcdFx0XHRcdFx0XHRcdGlfbGVnZW5kcyA9IGlfbGVnZW5kc19tYXg7XG5cdFx0XHRcdFx0XHRcdFx0aV9leGVsID0gaV9leGVsX21heDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvL2plxZtsaSB3YXJ0b8WbxIcgd3ljaG9kemkgcG96YSBza2FsZSB1IHRhayBwcnp5cGlzdWplbXkgamVqIG9kcG93aWVkbmkga29sb3Jcblx0XHRcdFx0XHRcdGlmKHZhbHVlIDwgbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1bMF1bMF0pe1xuXHRcdFx0XHRcdFx0XHRsYXllcnMuY2F0ZWdvcnlfY29sb3JzW2xheWVycy5hY3RpdmVdW2lfY2F0ZWdvcnldID0gbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1bMF1bM107XG5cdFx0XHRcdFx0XHR9XHRcblxuXHRcdFx0XHRcdFx0aWYodmFsdWUgPiBsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXVtpX2xlZ2VuZHNfbWF4LTFdWzFdKXtcblx0XHRcdFx0XHRcdFx0bGF5ZXJzLmNhdGVnb3J5X2NvbG9yc1tsYXllcnMuYWN0aXZlXVtpX2NhdGVnb3J5XSA9IGxheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW2lfbGVnZW5kc19tYXgtMV1bM107XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvL3BvIHpha3R1YWxpem93YW5pdSBrb2xvcsOzdyB3IGthdGVnb3JpYWNoIHJ5c3VqZW15IG5hIG5vd28gY2FudmFzXG5cdFx0Y2FudmFzLmRyYXcoKTtcblxuXG5cdH0sXG59Ki9cbiIsIi8vIOKVlOKVkOKVl+KVpiAg4pWU4pWQ4pWX4pWmIOKVpuKVlOKVpuKVl1xuLy8g4pWRICDilZEgIOKVkSDilZHilZEg4pWRIOKVkeKVkVxuLy8g4pWa4pWQ4pWd4pWp4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWQ4pWp4pWdXG5cbmltcG9ydCBtb3VzZSBmcm9tICcuL21vdXNlJztcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IG9uX2NhdGVnb3J5IGZyb20gJy4vb25fY2F0ZWdvcnknO1xuaW1wb3J0IGV4Y2VsIGZyb20gJy4vZXhjZWwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0c2V0X3RleHRhcmVhIDogZnVuY3Rpb24oKXtcblx0XHQkKCcjY2xvdWQgLmNsb3VkX3RleHQnKS52YWwoIGxheWVycy5jbG91ZFtsYXllcnMuYWN0aXZlXSApO1xuXHR9LFxuXG5cdC8vdXN0YXdpYW15IHBvcHJhd27EhSBwb3p5Y2rEmSBkeW1rYVxuXHRzZXRfcG9zaXRpb24gOiBmdW5jdGlvbigpe1xuXHRcblx0XHR2YXIgbGVmdCA9IG1vdXNlLmxlZnQgLSBvbl9jYXRlZ29yeS5jYW52YXNfb2Zmc2V0X2xlZnQ7XG5cdFx0dmFyIHRvcCA9IG1vdXNlLnRvcCAtIG9uX2NhdGVnb3J5LmNhbnZhc19vZmZzZXRfdG9wO1xuXHRcdHZhciB3aWR0aCA9ICQoXCIjY2FudmFzX2Nsb3VkXCIpLndpZHRoKCk7XG5cblx0XHRpZigobGVmdCArIHdpZHRoKSA+ICQoXCJib2R5XCIpLndpZHRoKCktMjApe1xuXHRcdFx0bGVmdCA9IGxlZnQgLSB3aWR0aC0yMDtcblx0XHR9XG5cbiBcdFx0JChcIiNjYW52YXNfY2xvdWRcIikuY3NzKHt0b3A6cGFyc2VJbnQodG9wIC0gJChcIiNjYW52YXNfY2xvdWRcIikuaGVpZ2h0KCkpKydweCcsbGVmdDpsZWZ0KydweCd9KTtcblx0XG5cdH0sXG5cblx0Ly9mdW5rY2phIG9kcG93aWVkemlhbG5hIHphIHd5xZt3aWV0bGVuaWUgZHlta2EgeiBvZHBvd2llZG5pxIUgemF3YXJ0b8WbY2nEhVxuXHR1cGRhdGVfdGV4dCA6IGZ1bmN0aW9uKCl7XG5cblx0XHRpZigob25fY2F0ZWdvcnkubmFtZSAhPSBcIlwiKSAmJiAob25fY2F0ZWdvcnkubmFtZSAhPSAnbnVsbCcpKXtcblxuXHRcdFx0dmFyIHRtcF9yb3cgPSBudWxsO1xuXHRcdFx0dmFyIGZpbmQgPSAwO1xuXHRcdFx0XG5cdFx0XHRmb3IoIHZhciBpX3JvdyA9IDAsIGlfcm93X21heCA9IGV4Y2VsLmRhdGEubGVuZ3RoOyBpX3JvdyA8IGlfcm93X21heDsgaV9yb3crKyApe1xuXHRcdFx0XHRpZihTdHJpbmcob25fY2F0ZWdvcnkubmFtZSkudG9Mb3dlckNhc2UoKSA9PSBTdHJpbmcoZXhjZWwuZGF0YVtpX3Jvd11bbGF5ZXJzLmNhdGVnb3J5W2xheWVycy5hY3RpdmVdXSkudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5zZXRfcG9zaXRpb24oKTtcblx0XHRcdFx0XHR2YXIgdGV4dF90bXAgPSBsYXllcnMuY2xvdWRbbGF5ZXJzLmFjdGl2ZV07XG5cblx0XHRcdFx0XHRmb3IodmFyIGkgPSAwLCBpX21heCA9IGV4Y2VsLmRhdGFbMF0ubGVuZ3RoOyBpIDwgaV9tYXg7IGkrKyl7XG5cdFx0XHRcdFx0XHR0ZXh0X3RtcCA9IHRleHRfdG1wLnJlcGxhY2UoJ3snK2V4Y2VsLmRhdGFbMF1baV0rJ30nLGV4Y2VsLmRhdGFbaV9yb3ddW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9kb3BpZXJvIGplxZtsaSBkeW1layBtYSBtaWXEhyBqYWthxZsga29ua3JldG7EhSB6YXdhcnRvxZvEhyB3ecWbd2lldGxhbXkgZ29cblx0XHRcdFx0XHRpZigodGV4dF90bXAhPVwiXCIpICYmICggZXhjZWwuZGF0YVtpX3Jvd11bbGF5ZXJzLnZhbHVlW2xheWVycy5hY3RpdmVdXSAhPSBudWxsICkpe1xuXHRcdFx0XHRcdFx0JChcIiNjYW52YXNfY2xvdWRcIikuZmFkZUluKDApO1xuXHRcdFx0XHRcdFx0JChcIiNjYW52YXNfY2xvdWRcIikuaHRtbCh0ZXh0X3RtcCk7XG5cdFx0XHRcdFx0XHRmaW5kID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly9qZcWbbGkgbmllIHpuYWxlemlvbm8gb2Rwb3dpZWRuaWVqIGthdGVnb3JpaVxuXHRcdFx0aWYgKCFmaW5kKSB7IFxuXHRcdFx0XHQkKFwiI2NhbnZhc19jbG91ZFwiKS5mYWRlT3V0KDApO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHQkKFwiI2NhbnZhc19jbG91ZFwiKS5mYWRlT3V0KDApO1xuXHRcdH1cblx0fVxuXG59XG4iLCIvLyDilZTilZDilZfilabilZDilZfilaYg4pWm4pWU4pWm4pWXXG4vLyDilZEgIOKVoOKVpuKVneKVkSDilZEg4pWR4pWRXG4vLyDilZrilZDilZ3ilanilZrilZDilZrilZDilZ3ilZDilanilZ1cblxuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgcG9pbnRlcnNcdGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGNhdGVnb3JpZXMgZnJvbSAnLi9jYXRlZ29yaWVzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IGV4Y2VsIGZyb20gJy4vZXhjZWwnO1xuLy9pbXBvcnQgcGFsZXRzIGZyb20gJy4vcGFsZXRzJztcbmltcG9ydCBsZWdlbmRzIGZyb20gJy4vbGVnZW5kcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4vbGFiZWxzJztcbmltcG9ydCBzb3VyY2UgZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbWVudV90b3AnOyBcblxuLy9mdW5rY2phIG9kcG93aWVkemlhbG5hIHphIHR3b3J6ZW5pZSB6YXBpc3l3YW5pZSBpIGFrdHVhbGl6YWNqZSBkYW55Y2ggZG90eWN6xIXEh2N5aCBtYXB5XG5leHBvcnQgZGVmYXVsdCB7XG5cblx0bWFwX2pzb24gOiBBcnJheSgpLCAvL2fFgsOzd25hIHptaWVubmEgcHJ6ZWNob3d1asSFY2Egd3N6eXN0a2llIGRhbmVcblx0bWFwX2hhc2ggOm51bGwsXG5cdGxheWVycyA6IHt9LFxuXHRleGNlbCA6IEFycmF5KCksXG5cdHByb2plY3QgOiB7fSxcblx0cHJvamVjdF9oYXNoIDogcHJvamVjdF9oYXNoLCAvL2fFgsOzd255IGhhc2ggZG90eWN6xIVjeSBuYXN6ZWdvIHByb2pla3R1XG4gXG5cdC8vd2N6eXRhbmllIHptaWVubnljaCBkbyBvYmlla3TDs3cgbWFweVxuXG5cdHNldF9tYXAgOiBmdW5jdGlvbihkYXRhKXtcblxuXHRcdC8vcG8gemFwaXNhbml1IGRhbnljaCBkbyBiYXp5IGFrdHVhbGl6dWplbXkgaWQgKHcgcHJ6eXBhZGt1IGplxZtsaSBpc3RuaWVqZSBuYWRwaXN1amVteSBqZSlcblx0XHR0aGlzLm1hcF9qc29uID0gZGF0YTtcblxuXHRcdC8vcG9iaWVyYW15IGkgd2N6eXR1amVteSBkYW5lIG8gY2FudmFzaWUgZG8gb2JpZWt0dVxuXHRcdGNhbnZhcy5oZWlnaHRfY2FudmFzID0gZGF0YVswXVswXTtcblx0XHRjYW52YXMud2lkdGhfY2FudmFzID0gZGF0YVswXVsxXTtcblx0XHRwb2ludGVycy5wYWRkaW5nX3ggPSBkYXRhWzBdWzJdO1xuXHRcdHBvaW50ZXJzLnBhZGRpbmdfeSA9IGRhdGFbMF1bM107XG5cdFx0cG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbyA9IGRhdGFbMF1bNF07XG5cdFx0cG9pbnRlcnMuc2l6ZSA9IGRhdGFbMF1bNV07XG5cdFx0cG9pbnRlcnMubWFpbl9raW5kID0gZGF0YVswXVs2XTtcblx0XHRjYW52YXMudGl0bGVfcHJvamVjdCA9IGRhdGFbMF1bN107XG5cblx0XHRpZih0eXBlb2YgZGF0YVswXVs4XSA9PSB1bmRlZmluZWQpe1xuXHRcdFx0cG9pbnRlcnMuY29sb3JfYm9yZGVyID0gXCIjMDAwXCI7XG5cdFx0fWVsc2V7XG5cdFx0XHRwb2ludGVycy5jb2xvcl9ib3JkZXIgPSBkYXRhWzBdWzhdO1xuXHRcdH1cblxuXHRcdGlmKHR5cGVvZiBkYXRhWzBdWzldID09IHVuZGVmaW5lZCl7XG5cdFx0XHRwb2ludGVycy5zaG93X2JvcmRlciA9IGZhbHNlO1xuXHRcdH1lbHNle1xuXHRcdFx0cG9pbnRlcnMuc2hvd19ib3JkZXIgPSBkYXRhWzBdWzldO1xuXHRcdH1cblxuXHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwicGFkZGluZ194XCJdJykudmFsKCBkYXRhWzBdWzJdICk7XG5cdFx0JCgnI3BvaW50ZXJfYm94IGlucHV0W25hbWU9XCJwYWRkaW5nX3lcIl0nKS52YWwoIGRhdGFbMF1bM10gKTtcblx0XHQkKCcjcG9pbnRlcl9ib3ggaW5wdXRbbmFtZT1cInNpemVfcG9pbnRlclwiXScpLnZhbCggZGF0YVswXVs1XSApO1xuXHRcdCQoJ2lucHV0W25hbWU9XCJ0aXRsZV9wcm9qZWN0XCJdJykudmFsKCBkYXRhWzBdWzddICk7XG5cblx0XHRpZiggZGF0YVswXVs0XSApe1xuXHRcdFx0JCgnI3BvaW50ZXJfYm94IGRpdltuYW1lPVwidHJhbnNsYXRlX21vZHVsb1wiXScpLnJlbW92ZUNsYXNzKCdzd2l0Y2gtb2ZmJyk7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggZGl2W25hbWU9XCJ0cmFuc2xhdGVfbW9kdWxvXCJdJykuYWRkQ2xhc3MoJ3N3aXRjaC1vbicpO1xuXHRcdH1cblxuXHRcdCQoJyNwb2ludGVyX2JveCBzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmh0bWwoJycpO1xuXG5cdFx0cG9pbnRlcnMua2luZHMuZm9yRWFjaChmdW5jdGlvbihraW5kKXtcblxuXHRcdFx0aWYoa2luZCA9PSBkYXRhWzBdWzZdKXtcblx0XHRcdFx0JCgnI3BvaW50ZXJfYm94IHNlbGVjdFtuYW1lPVwibWFpbl9raW5kXCJdJykuYXBwZW5kKCc8b3B0aW9uIHNlbGVjdGVkPVwic2VsZWN0ZWRcIiBuYW1lPVwiJytraW5kKydcIj4nK2tpbmQrJzwvb3B0aW9uPicpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0JCgnI3BvaW50ZXJfYm94IHNlbGVjdFtuYW1lPVwibWFpbl9raW5kXCJdJykuYXBwZW5kKCc8b3B0aW9uIG5hbWU9XCInK2tpbmQrJ1wiPicra2luZCsnPC9vcHRpb24+Jyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdC8vcG9iaWVyYW15IGRhbmUgbyBwb2ludGVyYWNoXG5cdFx0cG9pbnRlcnMucG9pbnRlcnMgPSBkYXRhWzFdO1xuXG5cdFx0Ly9wb2JpZXJhbXkgZGFuZSBvIGthdGVnb3JpYWNoXG5cdFx0dmFyIGNhdGVnb3JpZXMgPSB7fTtcblx0XHRjYXRlZ29yaWVzLmNhdGVnb3J5ID0gZGF0YVsyXTtcblxuXG5cdFx0Ly9wbyB3Y3p5dGFuaXUgbWFweSBha3R5YWxpenVqZW15IGRhbmUgZG90eWN6xIVjxIUga2F0ZWdvcmlpIGkga29sb3LDs3dcblx0XHRsYXllcnMuY2F0ZWdvcnlfY29sb3JzWzBdID0gW107XG5cdFx0bGF5ZXJzLmNhdGVnb3J5X25hbWUgPSBbXTtcblxuXHRcdGZvcih2YXIgaSA9IDAsIGlfbWF4ID0gY2F0ZWdvcmllcy5jYXRlZ29yeS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdGxheWVycy5jYXRlZ29yeV9uYW1lLnB1c2goY2F0ZWdvcmllcy5jYXRlZ29yeVtpXVswXSk7XG5cdFx0XHRsYXllcnMuY2F0ZWdvcnlfY29sb3JzWzBdLnB1c2goY2F0ZWdvcmllcy5jYXRlZ29yeVtpXVsxXSk7XG5cdFx0fVxuXG5cdFx0Ly9wb2JpZXJhbmllIGRhbnljaCBvIHpkasSZY2l1IGplxbxlbGkgaXN0bmllamVcblx0XHRpZiggZGF0YVszXS5sZW5ndGggPiAyKXtcblx0XHRcdGltYWdlLm9iaiA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0aW1hZ2Uub2JqLnNyYyA9IGRhdGFbM11bMF07XG5cdFx0XHRpbWFnZS54ID0gcGFyc2VJbnQoIGRhdGFbM11bMV0gKTtcblx0XHRcdGltYWdlLnkgPSBwYXJzZUludCggZGF0YVszXVsyXSApO1xuXHRcdFx0aW1hZ2Uud2lkdGggPSBwYXJzZUludCggZGF0YVszXVszXSApO1xuXHRcdFx0aW1hZ2UuaGVpZ2h0ID0gcGFyc2VJbnQoIGRhdGFbM11bNF0gKTtcblx0XHRcdGltYWdlLmFscGhhID0gcGFyc2VJbnQoIGRhdGFbM11bNV0gKTtcblxuXHRcdFx0Ly96YXpuYWN6ZW5pZSBvZHBvd2llZG5pZWdvIHNlbGVjdGEgYWxwaGEgdyBtZW51IHRvcFxuXHRcdFx0JCgnI2FscGhhX2ltYWdlIG9wdGlvbltuYW1lPVwiJytcdGltYWdlLmFscGhhICsnXCJdJykuYXR0cignc2VsZWN0ZWQnLHRydWUpO1xuXG5cdFx0XHRpbWFnZS5vYmoub25sb2FkID0gZnVuY3Rpb24oKSB7IGNhbnZhcy5kcmF3KCk7IH07XG5cdFx0fVxuXG5cdFx0Ly96YWt0dWFsaXpvd2FuaWUgZGFueWNoIHcgaW5wdXRhY2hcblx0XHQkKCcjbWFpbl9jYW52YXMnKS5hdHRyKCd3aWR0aCcsIGNhbnZhcy53aWR0aF9jYW52YXMrJ3B4Jyk7XG5cdFx0JCgnI21haW5fY2FudmFzJykuYXR0cignaGVpZ2h0JywgY2FudmFzLmhlaWdodF9jYW52YXMrJ3B4Jyk7XG5cdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzpjYW52YXMud2lkdGhfY2FudmFzKydweCcsJ2hlaWdodCc6Y2FudmFzLmhlaWdodF9jYW52YXMrJ3B4J30pO1xuXG5cdFx0Ly9jYW52YXMuZHJhdygpO1xuXG5cdH0sXG5cblx0c2V0X3Byb2plY3QgOiBmdW5jdGlvbihkYXRhKXtcblxuXHRcdC8vd2N6eXR1amVteSBkYW5lIGRvdHljesSFY2UgbWFweVxuXHRcdHRoaXMuc2V0X21hcCggSlNPTi5wYXJzZShkYXRhLm1hcF9qc29uKSApO1xuXHRcdGV4Y2VsLmRhdGEgPSBKU09OLnBhcnNlKGRhdGEuZXhjZWwpO1xuXG5cdFx0ZGF0YS5wcm9qZWN0ID0gSlNPTi5wYXJzZShkYXRhLnByb2plY3QpOyAgXG5cdFx0ZGF0YS5sYXllcnMgPSBKU09OLnBhcnNlKGRhdGEubGF5ZXJzKTsgXG5cblx0XHQvL3djenl0dWplbXkgZGFuZSBkb3R5Y3rEhWNlIHByb2pla3R1XG5cdFx0bGF5ZXJzLnBhbGV0c19hY3RpdmUgPSBkYXRhLmxheWVycy5wYWxldHNfYWN0aXZlO1xuXHRcdGxheWVycy52YWx1ZSA9IGRhdGEubGF5ZXJzLnZhbHVlO1xuXHRcdGxheWVycy5jb2xvcnNfcG9zID0gZGF0YS5sYXllcnMuY29sb3JzX3Bvcztcblx0XHRsYXllcnMuY29sb3JzX2FjdGl2ZSA9IGRhdGEubGF5ZXJzLmNvbG9yc19hY3RpdmU7XG5cdFx0bGF5ZXJzLm1pbl92YWx1ZSA9IGRhdGEubGF5ZXJzLm1pbl92YWx1ZTtcblx0XHRsYXllcnMubWF4X3ZhbHVlID0gZGF0YS5sYXllcnMubWF4X3ZhbHVlO1xuXHRcdGxheWVycy5jbG91ZCA9IGRhdGEubGF5ZXJzLmNsb3VkO1xuXHRcdGxheWVycy5jbG91ZF9wYXJzZXIgPSBkYXRhLmxheWVycy5jbG91ZF9wYXJzZXI7XG5cdFx0bGF5ZXJzLmxlZ2VuZHMgPSBkYXRhLmxheWVycy5sZWdlbmRzO1xuXHRcdGxheWVycy5sYWJlbHMgPSBkYXRhLmxheWVycy5sYWJlbHM7XG5cdCBcdGxheWVycy5jYXRlZ29yeSA9IFx0ZGF0YS5sYXllcnMuY2F0ZWdvcnk7XG5cdFx0bGF5ZXJzLmNhdGVnb3J5X2NvbG9ycyA9IGRhdGEubGF5ZXJzLmNhdGVnb3J5X2NvbG9ycztcblx0XHRsYXllcnMuY2F0ZWdvcnlfbmFtZSA9IGRhdGEubGF5ZXJzLmNhdGVnb3J5X25hbWU7XG5cdFx0bGF5ZXJzLmxpc3QgPSBkYXRhLmxheWVycy5saXN0O1xuXG5cdFx0Ly96bWllbm5lIGdsb2JhbG5lIGRvdHljesSFY2UgY2HFgmVnbyBwcm9qZWt0dVxuXHRcdGxheWVycy5wcm9qZWN0X25hbWUgPSBkYXRhLnByb2plY3QubmFtZTtcblx0XHRsYXllcnMuc291cmNlID0gZGF0YS5wcm9qZWN0LnNvdXJjZTtcblxuXHRcdC8vY29uc29sZS5sb2coIGRhdGEubGF5ZXJzLmNhdGVnb3J5X2NvbG9ycyApO1xuXG5cdFx0JCgnaW5wdXRbbmFtZT1cInByb2plY3RfbmFtZVwiXScpLnZhbChsYXllcnMucHJvamVjdF9uYW1lKTtcblxuXHRcdC8vbGVnZW5kcy5zaG93KCk7IFxuXHRcdGxhYmVscy5zaG93KCk7XG5cdFx0bGF5ZXJzLnNob3coKTtcblx0XHRzb3VyY2Uuc2hvdygpO1xuXG5cdFx0dmFyIG9mZnNldCA9ICQoJyNjYW52YXNfYm94Jykub2Zmc2V0KCk7XG4gIFx0Y2FudmFzLm9mZnNldF9sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gIFx0Y2FudmFzLm9mZnNldF90b3AgPSBvZmZzZXQudG9wO1xuXG5cdH0sXG5cblx0Ly9wb2JpZXJhbmllIHByb2pla3R1IHogYmF6eSBkYW55Y2ggaSB3Y3p5dGFuaWVcblx0Z2V0X3Byb2plY3QgOiBmdW5jdGlvbigpe1xuXHRcdFxuXHRcdHZhciB0aGF0ID0gdGhpcztcblxuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICcvYXBpL3Byb2plY3QvJyArIHRoYXQucHJvamVjdF9oYXNoLFxuXHRcdCAgdHlwZTogXCJHRVRcIixcblx0XHQgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7IHRoYXQuc2V0X3Byb2plY3QoIGRhdGEuZGF0YSApOyAgfSk7XG5cdH1cblxufVxuIiwiLy8g4pWU4pWQ4pWX4pWQ4pWXIOKVpuKVlOKVkOKVl+KVlOKVkOKVl+KVpiAgXG4vLyDilZHilaMg4pWU4pWp4pWm4pWd4pWRICDilZHilaMg4pWRICBcbi8vIOKVmuKVkOKVneKVqSDilZrilZDilZrilZDilZ3ilZrilZDilZ3ilanilZDilZ1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG59XG4iLCIvLyDilIzilIDilJDilKzilIzilIDilJDilKwg4pSs4pSs4pSA4pSQ4pSM4pSA4pSQ4pSM4pSA4pSQXG4vLyDilJzilKQg4pSC4pSCIOKUrOKUgiDilILilJzilKzilJjilJzilKQg4pSU4pSA4pSQXG4vLyDilJQgIOKUtOKUlOKUgOKUmOKUlOKUgOKUmOKUtOKUlOKUgOKUlOKUgOKUmOKUlOKUgOKUmFxuXG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcblxuLy9mdW5rY2plIHJ5c3VqxIVjZSBwb2plZHnFhGN6eSBwdW5rdCAocG9pbnRlcilcbmV4cG9ydCBkZWZhdWx0IHtcblxuICBzcXVhcmUgOiBmdW5jdGlvbih4LHksc2l6ZSl7XG4gICAgY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoeCx5LHNpemUsc2l6ZSk7XG4gIH0sXG5cbiAgY2lyY2xlIDogZnVuY3Rpb24oeCx5LHNpemUpe1xuICAgIHZhciBzaXplID0gc2l6ZSAvIDI7XG4gICAgdmFyIGNlbnRlcl94ID0geCArIHNpemU7XG4gICAgdmFyIGNlbnRlcl95ID0geSArIHNpemU7XG4gICAgY2FudmFzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY2FudmFzLmNvbnRleHQuYXJjKGNlbnRlcl94LCBjZW50ZXJfeSwgc2l6ZSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGNhbnZhcy5jb250ZXh0LmZpbGwoKTtcbiAgfSxcblxuICBoZXhhZ29uICA6IGZ1bmN0aW9uKHgseSxzaXplKXtcbiAgICB2YXIgYSA9IHNpemUvNDtcbiAgICB2YXIgYTIgPSBzaXplLzI7XG4gICAgdmFyIGggPSBzaXplLzIqTWF0aC5zcXJ0KDMpLzI7XG5cbiAgICBjYW52YXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjYW52YXMuY29udGV4dC5tb3ZlVG8oeCx5K2EyKTtcbiAgICBjYW52YXMuY29udGV4dC5saW5lVG8oeCthLHkrYTItaCk7XG4gICAgY2FudmFzLmNvbnRleHQubGluZVRvKHgrYSthMix5K2EyLWgpO1xuICAgIGNhbnZhcy5jb250ZXh0LmxpbmVUbyh4K3NpemUseSthMik7XG4gICAgY2FudmFzLmNvbnRleHQubGluZVRvKHgrc2l6ZS1hLHkrYTIraCk7XG4gICAgY2FudmFzLmNvbnRleHQubGluZVRvKHgrYSx5K2EyK2gpO1xuICAgIGNhbnZhcy5jb250ZXh0LmxpbmVUbyh4LHkrYTIpO1xuICAgIGNhbnZhcy5jb250ZXh0LmZpbGwoKTtcbiAgfSxcblxuICBoZXhhZ29uMiA6IGZ1bmN0aW9uKHgseSxzaXplKXtcbiAgICB2YXIgYSA9IHNpemUvNDtcbiAgICB2YXIgYTIgPSBzaXplLzI7XG4gICAgdmFyIGggPSBzaXplLzIqTWF0aC5zcXJ0KDMpLzI7XG5cbiAgICBjYW52YXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjYW52YXMuY29udGV4dC5tb3ZlVG8oeCthMix5KTtcbiAgICBjYW52YXMuY29udGV4dC5saW5lVG8oeCthMitoLHkrYSk7XG4gICAgY2FudmFzLmNvbnRleHQubGluZVRvKHgrYTIraCx5K2EyK2EpO1xuICAgIGNhbnZhcy5jb250ZXh0LmxpbmVUbyh4K2EyLHkrc2l6ZSk7XG4gICAgY2FudmFzLmNvbnRleHQubGluZVRvKHgrYTItaCx5K2EyK2EpO1xuICAgIGNhbnZhcy5jb250ZXh0LmxpbmVUbyh4K2EyLWgseSthKTtcbiAgICBjYW52YXMuY29udGV4dC5saW5lVG8oeCthMix5KTtcbiAgICBjYW52YXMuY29udGV4dC5maWxsKCk7XG4gIH0sXG5cbiAgc3F1YXJlX2JvcmRlcl9zbWFsbCA6IGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgaWYoZGF0YS5saW5lX3dpZHRoX3kgPCAyKXsgdmFyIHlfdHJhbnMgPSAtMjsgfVxuICAgIGVsc2V7IHZhciB5X3RyYW5zID0gLTM7IH1cblxuICAgIGlmKGRhdGEubGluZV93aWR0aF94IDwgMyl7IHZhciB4X3RyYW5zID0gLTI7IH1cbiAgICBlbHNleyB2YXIgeF90cmFucyA9IC0xKmRhdGEubGluZV93aWR0aF94OyB9XG5cbiAgICBpZihkYXRhLmJvcmRlci50b3Ape1xuICAgICAgY2FudmFzLmNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgIGRhdGEueCt4X3RyYW5zKzEsXG4gICAgICAgIGRhdGEueSt5X3RyYW5zKzEsXG4gICAgICAgIGRhdGEuc2l6ZStkYXRhLmxpbmVfd2lkdGhfeCsxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnRvcF9sZWZ0KXtcbiAgICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngreF90cmFucysxLFxuICAgICAgICBkYXRhLnkreV90cmFucysxLFxuICAgICAgICBwYXJzZUludCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzEpLzIpLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnRvcF9yaWdodCl7XG4gICAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgZGF0YS54K3hfdHJhbnMrMStwYXJzZUludCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzEpLzIpLFxuICAgICAgICBkYXRhLnkreV90cmFucysxLFxuICAgICAgICBNYXRoLmNlaWwoKGRhdGEuc2l6ZStkYXRhLmxpbmVfd2lkdGhfeCsxKS8yKSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZihkYXRhLmJvcmRlci5yaWdodCl7XG4gICAgICBpZihkYXRhLmxpbmVfd2lkdGhfeCA8IDIpeyB2YXIgeF90cmFucyA9IC0xOyB9XG4gICAgICBlbHNleyB2YXIgeF90cmFucyA9IDA7IH1cblxuICAgICAgaWYoZGF0YS5saW5lX3dpZHRoX3kgPCAyKXsgdmFyIHlfdHJhbnMgPSAyOyB9XG4gICAgICBlbHNleyB2YXIgeV90cmFucyA9IGRhdGEubGluZV93aWR0aF95OyB9XG5cbiAgICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngrZGF0YS5zaXplK3hfdHJhbnMrMSxcbiAgICAgICAgZGF0YS55LTEsXG4gICAgICAgIDEsXG4gICAgICAgIGRhdGEuc2l6ZSt5X3RyYW5zIFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG5cbiAgc3F1YXJlX2JvcmRlcl9iaWcgOiBmdW5jdGlvbihkYXRhKXtcblxuICAgIGlmKGRhdGEubGluZV93aWR0aF95IDwgMil7IHZhciB5X3RyYW5zID0gLTI7IH1cbiAgICBlbHNleyB2YXIgeV90cmFucyA9IC0zOyB9XG5cbiAgICBpZihkYXRhLmxpbmVfd2lkdGhfeCA8IDMpeyB2YXIgeF90cmFucyA9IC0yOyB9XG4gICAgZWxzZXsgdmFyIHhfdHJhbnMgPSAtMSpkYXRhLmxpbmVfd2lkdGhfeDsgfVxuXG4gICAgaWYoZGF0YS5ib3JkZXIudG9wKXtcbiAgICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngreF90cmFucyxcbiAgICAgICAgZGF0YS55K3lfdHJhbnMsXG4gICAgICAgIGRhdGEuc2l6ZStkYXRhLmxpbmVfd2lkdGhfeCszLFxuICAgICAgICAzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKGRhdGEuYm9yZGVyLnRvcF9sZWZ0KXtcbiAgICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngreF90cmFucyxcbiAgICAgICAgZGF0YS55K3lfdHJhbnMsXG4gICAgICAgIHBhcnNlSW50KChkYXRhLnNpemUrZGF0YS5saW5lX3dpZHRoX3grMykvMiksXG4gICAgICAgIDNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYoZGF0YS5ib3JkZXIudG9wX3JpZ2h0KXtcbiAgICAgIGNhbnZhcy5jb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICBkYXRhLngreF90cmFucytwYXJzZUludCgoZGF0YS5zaXplK2RhdGEubGluZV93aWR0aF94KzMpLzIpLFxuICAgICAgICBkYXRhLnkreV90cmFucyxcbiAgICAgICAgTWF0aC5jZWlsKChkYXRhLnNpemUrZGF0YS5saW5lX3dpZHRoX3grMykvMiksXG4gICAgICAgIDNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYoZGF0YS5ib3JkZXIucmlnaHQpe1xuICAgICAgaWYoZGF0YS5saW5lX3dpZHRoX3ggPCAyKXt2YXIgeF90cmFucyA9IC0xOyB9XG4gICAgICBlbHNle3ZhciB4X3RyYW5zID0gMDsgfVxuXG4gICAgICBpZihkYXRhLmxpbmVfd2lkdGhfeSA8IDIpeyB2YXIgeV90cmFucyA9IDI7IH1cbiAgICAgIGVsc2V7IHZhciB5X3RyYW5zID0gZGF0YS5saW5lX3dpZHRoX3k7fVxuXG4gICAgICBjYW52YXMuY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgZGF0YS54K2RhdGEuc2l6ZSt4X3RyYW5zLFxuICAgICAgICBkYXRhLnksXG4gICAgICAgIDMsXG4gICAgICAgIGRhdGEuc2l6ZSt5X3RyYW5zIFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIOKVpuKVlOKVpuKVl+KVlOKVkOKVl+KVlOKVkOKVl+KVlOKVkOKVl1xuLy8g4pWR4pWR4pWR4pWR4pWg4pWQ4pWj4pWRIOKVpuKVkeKVoyBcbi8vIOKVqeKVqSDilanilakg4pWp4pWa4pWQ4pWd4pWa4pWQ4pWdXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuXG4vL2fFgsOzd25lIHpkasSZY2llIG9kIGt0w7NyZWdvIG9kcnlzb3d1amVteSBtYXB5XG5leHBvcnQgZGVmYXVsdCB7XG5cdG9iaiA6IHVuZGVmaW5lZCxcblx0eCA6IG51bGwsXG5cdHkgOiBudWxsLFxuXHR3aWR0aCA6IG51bGwsXG5cdGhlaWdodCA6IG51bGwsXG5cdGFscGhhIDogMTAsIFxuXG5cdGRyYXcgOiBmdW5jdGlvbigpe1xuXHRcdGNhbnZhcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy5hbHBoYS8xMDtcblx0XHRjYW52YXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5vYmosdGhpcy54LHRoaXMueSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcblxuXHRcdCQoJyNjYW52YXNfYm94ICNpbWFnZV9yZXNpemUnKS5jc3MoeydoZWlnaHQnOnRoaXMuaGVpZ2h0LCd0b3AnOnRoaXMueSsncHgnLCdsZWZ0JzoodGhpcy54K3RoaXMud2lkdGgpKydweCd9KTtcblx0XHRjYW52YXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cdH0sXG5cblx0Ly9mdW5rY2phIHBvbW9jbmljemEga29ud2VydHVqxIVjYSBkYXRhVVJJIG5hIHBsaWtcblx0ZGF0YVVSSXRvQmxvYiA6IGZ1bmN0aW9uKGRhdGFVUkkpIHtcbiAgICB2YXIgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6ICdpbWFnZS9wbmcnfSk7XG5cdH1cblxufVxuIiwiLy8g4pWmICDilZTilZDilZfilZTilZcg4pWU4pWQ4pWX4pWmICDilZTilZDilZdcbi8vIOKVkSAg4pWg4pWQ4pWj4pWg4pWp4pWX4pWR4pWjIOKVkSAg4pWa4pWQ4pWXXG4vLyDilanilZDilZ3ilakg4pWp4pWa4pWQ4pWd4pWa4pWQ4pWd4pWp4pWQ4pWd4pWa4pWQ4pWdXG5cbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuL2xhYmVscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0c2hvdyA6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnI2xhYmVscycpLmh0bWwoIGxheWVycy5sYWJlbHNbbGF5ZXJzLmFjdGl2ZV0gKTtcblx0fVxufSAiLCIvLyDilaYgIOKVlOKVkOKVl+KVpiDilabilZTilZDilZfilabilZDilZfilZTilZDilZdcbi8vIOKVkSAg4pWg4pWQ4pWj4pWa4pWm4pWd4pWR4pWjIOKVoOKVpuKVneKVmuKVkOKVl1xuLy8g4pWp4pWQ4pWd4pWpIOKVqSDilakg4pWa4pWQ4pWd4pWp4pWa4pWQ4pWa4pWQ4pWdXG5cbi8vaW1wb3J0IHBhbGV0cyBmcm9tICcuL3BhbGV0cyc7XG5pbXBvcnQgbGVnZW5kcyBmcm9tICcuL2xlZ2VuZHMnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgY2xvdWQgZnJvbSAnLi9jbG91ZCc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4vbGFiZWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdGxpc3QgOiBbJ3pha8WCYWRrYSAxJ10sXG5cdGFjdGl2ZSA6IDAsXG5cblx0Ly90YWJsaWNhIHogcG9kc3Rhd293eXdtaSBkYW55bWkgemFncmVnb3dhbnltaSBkbGEga2HFvGRlaiB3YXJzdHd5XG5cdHBhbGV0c19hY3RpdmUgOiBbMF0sIFxuXG5cdHZhbHVlIDogWy0xXSxcblx0Y29sb3JzX3BvcyA6IFtbMSwxLDEsMSwxLDEsMSwxLDFdXSxcblx0Y29sb3JzX2FjdGl2ZSA6IFtbXCIjZjdmY2ZkXCIsIFwiI2U1ZjVmOVwiLCBcIiNjY2VjZTZcIiwgXCIjOTlkOGM5XCIsIFwiIzY2YzJhNFwiLCBcIiM0MWFlNzZcIiwgXCIjMjM4YjQ1XCIsIFwiIzAwNmQyY1wiLCBcIiMwMDQ0MWJcIl1dLFxuXHRtaW5fdmFsdWUgOiBbMF0sXG5cdG1heF92YWx1ZSA6IFswXSxcblx0Y2xvdWQgOiBbXCJcIl0sXG5cdGNsb3VkX3BhcnNlciA6IFtcIlwiXSxcblx0bGVnZW5kcyA6IFtbXV0sXG5cdGxhYmVscyA6IFtcIlwiXSxcblx0Y2F0ZWdvcnkgOiBbLTFdLFxuXHRjYXRlZ29yeV9jb2xvcnMgOiBbXSxcblx0Y2F0ZWdvcnlfbmFtZSA6IFtdLFxuXG5cdC8vem1pZW5uZSBnbG9iYWxuZSBkb3R5Y3rEhWNlIGNhxYJlZ28gcHJvamVrdHVcblx0cHJvamVjdF9uYW1lIDogJ25vd3kgcHJvamVrdCcsXG5cdHNvdXJjZSA6ICcnLFxuXG5cdHNob3cgOiBmdW5jdGlvbigpe1xuXHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRpZiggdGhpcy5saXN0Lmxlbmd0aCA+IDEgKXtcblx0XHRcdHZhciBodG1sID0gXCJcIjtcblx0XHRcdGh0bWwgKz0gJzxzcGFuIG51bT1cIicrMCsnXCIgY2xhc3M9XCJhY3RpdmVcIj4nICsgdGhpcy5saXN0WzBdICsgJzwvc3Bhbj4nO1xuXHRcdFx0XG5cdFx0XHRmb3IodmFyIGkgPSAxLCBpX21heCA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcblx0XHRcdFx0aHRtbCArPSAnPHNwYW4gbnVtPVwiJytpKydcIj4nICsgdGhpcy5saXN0W2ldICsgJzwvc3Bhbj4nO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcjYXJlYScpLmh0bWwoaHRtbCk7XG5cdFx0XHQkKCcjYXJlYSBzcGFuJykuY2xpY2soZnVuY3Rpb24oKXsgdGhhdC5zZWxlY3QodGhpcyk7IH0pO1xuXHRcdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHQkKCcjYXJlYScpLmNzcygnZGlzcGxheScsJ25vbmUnKTtcblx0XHR9XG5cdFx0XG5cdH0sIFxuXG5cdHNlbGVjdCA6IGZ1bmN0aW9uKG9iail7XG5cblx0XHQkKCcjYXJlYSBzcGFuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQob2JqKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0XHR0aGlzLmFjdGl2ZSA9ICQob2JqKS5pbmRleCgpO1xuXG5cdFx0bGFiZWxzLnNob3coKTtcblx0XHRjYW52YXMuZHJhdygpO1xuXHRcblx0fVxufSIsIi8qXG4vL29iaWVrdCBkb3R5Y3rEhXN5IHd5c3dpZXRsYW5pYSBha3V0YWxpemFjamkgaSBlZHljamkgcGFuZWx1IGxlZ2VuZFxubGVnZW5kcyA9IHtcblx0Ly93ecWbd2lldGxhbXkgd3N6eXN0a2llIGxlZ2VuZHkgdyBwYW5lbHUgbWFwXG5cdHNob3cgOiBmdW5jdGlvbigpe1xuICBcdFx0dmFyIGh0bWwgPSBcIlwiO1xuICBcdFx0Zm9yKHZhciBpID0gMCwgaV9tYXggPSBsYXllcnMubGVnZW5kc1tsYXllcnMuYWN0aXZlXS5sZW5ndGg7IGkgPCBpX21heDsgaSsrKXtcbiAgXHRcdFx0aHRtbCArPSBcIjxkaXY+IDxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2xheWVycy5sZWdlbmRzW2xheWVycy5hY3RpdmVdW2ldWzNdK1wiJz48L3NwYW4+PHNwYW4+XCIrbGF5ZXJzLmxlZ2VuZHNbbGF5ZXJzLmFjdGl2ZV1baV1bMl0rXCI8L3NwYW4+PC9kaXY+XCI7XG4gIFx0XHR9XG4gICAgICAkKCcjbGVnZW5kcycpLmh0bWwoaHRtbCk7XG5cdH1cbn0qLyIsIi8vIOKVlOKVpuKVl+KVlOKVkOKVl+KVlOKVl+KVlOKVpiDilaYgIOKVlOKVpuKVl+KVlOKVkOKVl+KVlOKVkOKVl1xuLy8g4pWR4pWR4pWR4pWR4pWjIOKVkeKVkeKVkeKVkSDilZEgICDilZEg4pWRIOKVkeKVoOKVkOKVnVxuLy8g4pWpIOKVqeKVmuKVkOKVneKVneKVmuKVneKVmuKVkOKVnSAgIOKVqSDilZrilZDilZ3ilakgXG5cbmltcG9ydCBjcnVkIGZyb20gJy4vY3J1ZCc7XG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcblxuLy9vYmlla3QgbWVudV90b3BcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHRtb3ZlX2ltYWdlIDogZmFsc2UsXG5cdG1vdmVfY2FudmFzIDogZmFsc2UsXG5cdGF1dG9fZHJhdyA6IGZhbHNlLFxuXHRtb2RlX2tleSA6IHRydWUsXG5cdGNhdGVnb3J5IDogMCxcblx0ZGlzYWJsZV9zZWxlY3QgOiBmYWxzZSxcblxuXHQvL3ptaWFuYSBha3R1YWxuZWogemFrxYJhZGtpXG5cdGNoYW5nZV9ib3ggOiBmdW5jdGlvbihvYmope1xuXHRcdGNvbnNvbGUubG9nKG9iaik7XG5cdFx0JChvYmopLnBhcmVudCgpLmNoaWxkcmVuKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKG9iaikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0dmFyIGNhdGVnb3J5ID0gJChvYmopLmF0dHIoJ2NhdGVnb3J5Jyk7XG5cdFx0JChvYmopLnBhcmVudCgpLnBhcmVudCgpLmNoaWxkcmVuKCdkaXYnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24oKXtcblx0XHRcdCQob2JqKS5wYXJlbnQoKS5wYXJlbnQoKS5jaGlsZHJlbignIycrY2F0ZWdvcnkpLmRlbGF5KDEwMCkuZmFkZUluKDUwMCk7XG5cdFx0fSk7XG5cdFxuXHQgXG5cdH0sXG5cblx0Ly9mdW5rY2phIHPFgnXFvMSFY2EgZG8gcG9iaWVyYW5pYSBkYW55Y2ggZG90eWN6xIVjeWNoIG1hcFxuXHRnZXRfbWFwcyA6IGZ1bmN0aW9uKCl7XG5cdFxuXHRcdCQuYWpheCh7XG4gICBcdFx0dXJsOiAnL2FwaS9tYXBzJyxcbiAgICBcdHR5cGU6IFwiR0VUXCIsXG4gICAgXHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHR9KS5kb25lKCBmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG5cdFx0XHRcblx0XHRcdC8vd3nFm3dpZXRsYW15IGxpc3TEmSBtYXAgdyBwYW5lbHUgdSBnw7NyeVxuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwib2tcIil7XG5cdFx0XHRcdHZhciBhZGRfaHRtbCA9ICc8b3B0aW9uIGlkPVwic2VsZWN0X21hcFwiPnd5YmllcnogbWFwxJk8L29wdGlvbj4nO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgaV9tYXggPSByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSA8IGlfbWF4IDtpKyspe1xuXHRcdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGFbaV0uX2lkID09IGNydWQubWFwX2hhc2gpe1xuXHRcdFx0XHRcdFx0YWRkX2h0bWwgKz0gJzxvcHRpb24gc2VsZWN0ZWQgaWQ9XCInICsgcmVzcG9uc2UuZGF0YVtpXS5faWQgKyAnXCI+JyArIEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YVtpXS5tYXBfanNvbilbMF1bN10gKyAnPC9vcHRpb24+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdGFkZF9odG1sICs9ICc8b3B0aW9uIGlkPVwiJyArIHJlc3BvbnNlLmRhdGFbaV0uX2lkICsgJ1wiPicgKyBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGFbaV0ubWFwX2pzb24pWzBdWzddICsgJzwvb3B0aW9uPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCQoJyN0b29sYmFyX3RvcCBzZWxlY3Quc2VsZWN0X21hcCcpLmh0bWwoIGFkZF9odG1sICk7XG5cblx0XHRcdFx0Ly9kb2RhamVtdSB6ZGFyemVuaWUgY2hhbmdlIG1hcCBcblx0XHRcdFx0JCgnLnNlbGVjdF9tYXAnKS5jaGFuZ2UoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQvL3NwcmF3ZHphbXkgY3p5IHd5YnJhbGnFm215IHBvbGUgeiBoYXNoZW0gbWFweVxuXHRcdFx0XHRcdGlmKCAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ2lkJykgIT0gJ3NlbGVjdF9tYXAnKXtcblx0XHRcdFx0XHRcdC8vamXFm2xpIHRhayB0byBzcHJhd2R6YW15IGN6eSB3Y3p5dHVqZW15IG1hcMSZIHBvIHJheiBwaWVyd3N6eSBjenkgZHJ1Z2lcblx0XHRcdFx0XHRcdGlmKGNydWQubWFwX2hhc2ggIT0gbnVsbCl7XG5cdFx0XHRcdFx0XHRcdC8vamXFm2xpIHdjenl0dWplbXkgcG8gcmF6IGtvbGVqbnkgdG8gcHl0YW15IGN6eSBuYXBld25vIGNoY2VteSBqxIUgd2N6eXRhxIdcblx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ0N6eSBjaGNlc3ogd2N6eXRhxIcgbm93xIUgbWFwxJkgPycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3J1ZC5tYXBfaGFzaCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cignaWQnKTtcblx0XHRcdFx0XHRcdFx0XHRjcnVkLmdldF9tYXAoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0JCgnLnNlbGVjdF9tYXAgb3B0aW9uJykuZXEoMCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdGNydWQubWFwX2hhc2ggPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0XHRcdGNydWQuZ2V0X21hcCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdGFsZXJ0KCduaWUgbW9nxJkgcG9icmHEhyBsaXN0eSBtYXAnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coIHJlc3BvbnNlICk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblx0fSxcblxuXG5cdC8vZnVua2NqYSBzxYJ1xbzEhWNhIGRvIHBvYmllcmFuaWEgZGFueWNoIGRvdHljesSFY3ljaCBtYXBcblx0Z2V0X3Byb2plY3RzIDogZnVuY3Rpb24oKXtcblx0XHQkLmFqYXgoe1xuICAgXHRcdHVybDogJy9hcGkvcHJvamVjdHMnLFxuICAgIFx0dHlwZTogXCJHRVRcIixcbiAgICBcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pLmRvbmUoIGZ1bmN0aW9uKCByZXNwb25zZSApIHtcblxuXHRcdFx0Ly93ecWbd2lldGxhbXkgbGlzdMSZIHByb2pla3TDs3cgdyBwYW5lbHUgdSBnw7NyeVxuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwib2tcIil7XG5cblx0XHRcdFx0dmFyIGFkZF9odG1sID0gJzxvcHRpb24gaWQ9XCJuZXdfcHJvamVjdFwiPm5vd3kgcHJvamVrdDwvb3B0aW9uPic7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBpX21heCA9IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpIDwgaV9tYXggO2krKyl7XG5cblx0XHRcdFx0XHRpZihyZXNwb25zZS5kYXRhW2ldLl9pZCA9PSBjcnVkLnByb2plY3RfaGFzaCl7XG5cdFx0XHRcdFx0XHRhZGRfaHRtbCArPSAnPG9wdGlvbiBzZWxlY3RlZCBpZD1cIicgKyByZXNwb25zZS5kYXRhW2ldLl9pZCArICdcIj4nICsgSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhW2ldLnByb2plY3QpLm5hbWUgKyAnPC9vcHRpb24+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdGFkZF9odG1sICs9ICc8b3B0aW9uIGlkPVwiJyArIHJlc3BvbnNlLmRhdGFbaV0uX2lkICsgJ1wiPicgKyBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGFbaV0ucHJvamVjdCkubmFtZSArICc8L29wdGlvbj4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCcjdG9vbGJhcl90b3Agc2VsZWN0LnNlbGVjdF9wcm9qZWN0JykuaHRtbCggYWRkX2h0bWwgKTtcblx0XHRcdFxuXHRcdFx0XHQvL2RvZGFqZW11IHpkYXJ6ZW5pZSBjaGFuZ2UgcHJvamVjdCBcblx0XHRcdFx0JCgnLnNlbGVjdF9wcm9qZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ0N6eSBjaGNlc3ogd2N6eXRhxIcgbm93eSBwcm9qZWt0ID8nKSkge1xuXHRcdFx0XHRcdFx0aWYoICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cignaWQnKSA9PSAnbmV3X3Byb2plY3QnICl7XG5cdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0Y3J1ZC5wcm9qZWN0X2hhc2ggPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ2lkJyk7XG5cdFx0XHRcdFx0XHRcdGNydWQuZ2V0X3Byb2plY3QoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHRhbGVydCgnbmllIG1vZ8SZIHBvYnJhxIcgbGlzdHkgcHJvamVrdMOzdycpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyggcmVzcG9uc2UgKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9LFxuXG5cdHVwZGF0ZV9jYW52YXNfaW5mbyA6IGZ1bmN0aW9uKCl7XG5cdFx0Y2FudmFzLnNjYWxlID0gcGFyc2VJbnQoICQoJyNjYW52YXNfaW5mbyAjc2l6ZScpLnZhbCgpICk7XG5cdFx0Y2FudmFzLndpZHRoX2NhbnZhcyA9IHBhcnNlSW50KCAkKCcjY2FudmFzX2luZm8gI3dpZHRoJykudmFsKCkgKTtcblx0XHRjYW52YXMuaGVpZ2h0X2NhbnZhcyA9IHBhcnNlSW50KCAkKCcjY2FudmFzX2luZm8gI2hlaWdodCcpLnZhbCgpICk7XG5cblx0XHQkKCcjY2FudmFzX2luZm8gI3NpemUnKS52YWwoIGNhbnZhcy5zY2FsZSArICclJyApO1xuXHRcdCQoJyNjYW52YXNfaW5mbyAjd2lkdGgnKS52YWwoIGNhbnZhcy53aWR0aF9jYW52YXMgKyAncHgnICk7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNoZWlnaHQnKS52YWwoIGNhbnZhcy5oZWlnaHRfY2FudmFzICsgJ3B4JyApO1xuXG5cdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzogY2FudmFzLndpZHRoX2NhbnZhcyArICdweCcsJ2hlaWdodCc6Y2FudmFzLmhlaWdodF9jYW52YXMgKyAncHgnfSk7XG5cdFx0JCgnI2NhbnZhc19ib3ggI21haW5fY2FudmFzJykuYXR0cignd2lkdGgnLGNhbnZhcy53aWR0aF9jYW52YXMgKyAncHgnKTtcblx0XHQkKCcjY2FudmFzX2JveCAjbWFpbl9jYW52YXMnKS5hdHRyKCdoZWlnaHQnLGNhbnZhcy5oZWlnaHRfY2FudmFzICsgJ3B4Jyk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXHRjaGFuZ2VfYWxwaGEgOiBmdW5jdGlvbigpe1xuXHRcdGltYWdlLmFscGhhID0gJCgnI2FscGhhX2ltYWdlJykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cignbmFtZScpO1xuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH0sXG5cblx0YWRkX2ltYWdlIDogZnVuY3Rpb24oKXtcblxuXHRcdC8vamVzbGkgcG9kYW55IHBhcmFtZXRyIG5pZSBqZXN0IHB1c3R5XG5cdFx0dmFyIHNyY19pbWFnZSA9IHByb21wdChcIlBvZGFqIMWbY2llxbxrxJkgZG8gemRqxJljaWE6IFwiKTtcblxuXHRcdGlmKHNyY19pbWFnZSl7XG5cdFx0XHRpZihzcmNfaW1hZ2UubGVuZ3RoID4gMCl7XG5cblx0XHRcdFx0aW1hZ2Uub2JqID0gbmV3IEltYWdlKCk7XG5cblx0XHRcdFx0Ly93Y3p5dGFuaWUgemRqxJljaWE6XG5cdFx0XHRcdFx0aW1hZ2Uub2JqLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdGltYWdlLndpZHRoID0gaW1hZ2Uub2JqLndpZHRoO1xuXHQgICAgXHRcdGltYWdlLmhlaWdodCA9IGltYWdlLm9iai5oZWlnaHQ7XG5cdCAgICBcdFx0aW1hZ2UuZHJhdygpO1xuXHQgIFx0XHR9O1xuXG5cdFx0XHQgIGltYWdlLnggPSAwO1xuXHRcdFx0ICBpbWFnZS55ID0gMDtcblx0XHRcdCAgaW1hZ2Uub2JqLnNyYyA9IHNyY19pbWFnZTtcblx0XHRcdFx0Ly9zaW1hZ2Uub2JqLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHNob3dfaW5mbyA6IGZ1bmN0aW9uKCl7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNzaXplJykudmFsKHBhcnNlSW50KGNhbnZhcy5zY2FsZSkgKyAnJScpO1xuXHRcdCQoJyNjYW52YXNfaW5mbyAjd2lkdGgnKS52YWwocGFyc2VJbnQoY2FudmFzLndpZHRoX2NhbnZhcykgKyAncHgnKTtcblx0XHQkKCcjY2FudmFzX2luZm8gI2hlaWdodCcpLnZhbChwYXJzZUludChjYW52YXMuaGVpZ2h0X2NhbnZhcykgKyAncHgnKTtcblx0fVxuXG59XG4iLCIvLyDilZTilabilZfilZTilZDilZfilaYg4pWm4pWU4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilZHilZHilZHilZEg4pWR4pWRIOKVkeKVmuKVkOKVl+KVkeKVoyBcbi8vIOKVqSDilanilZrilZDilZ3ilZrilZDilZ3ilZrilZDilZ3ilZrilZDilZ1cblxuaW1wb3J0IG1vdXNlIGZyb20gJy4vbW91c2UnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSc7XG5cbi8vb2JpZWt0IG15c3praSAoZG8gb2dhcm5pZWNpYSlcbmV4cG9ydCBkZWZhdWx0IHtcblx0bW91c2VfZG93biA6IGZhbHNlLFxuXHRjbGlja19vYmogOiBudWxsLFxuXG5cdHRtcF9tb3VzZV94IDogbnVsbCwgLy96bWllbm5lIHR5bWN6YXNvd2UgdW1vxbxsaXdpYWrEhWNlIHByemVzdXdhbmllIHTFgmFcblx0dG1wX21vdXNlX3kgOiBudWxsLCAvL3ptaWVubmUgdHltY3phc293ZSB1bW/FvGxpd2lhasSFY2UgcHJ6ZXN1d2FuaWUgdMWCYVxuXG5cdGxlZnQgOiBudWxsLCAvL3BvenljamEgeCBteXN6a2lcblx0dG9wIDogbnVsbCwgLy9wb3p5Y2phIHkgbXlzemtpXG5cdHBhZGRpbmdfeCA6IG51bGwsIC8vcG96eWNqYSB4IG15c3praSBvZCBnw7NybmVqIGtyYXfEmWR6aVxuXHRwYWRkaW5nX3kgOiBudWxsLCAvL3BvenljamEgeSBteXN6a2kgb2QgZ8Ozcm5laiBrcmF3xJlkemlcblx0b2Zmc2V0X3ggOiBudWxsLCAvL29mZnNldCB4IG9iaWVrdHUga2xpa25pxJl0ZWdvXG5cdG9mZnNldF95IDogbnVsbCwgLy9vZmZzZXQgeSBvYmlla3R1IGtsaWtuacSZdGVnb1xuXG5cdC8vZnVuY2tqYSB3eWtyeXdhasSFY2EgdyBjbyBrbGlrbmnEmXRvIHBvYmllcmFqxIVjYSBwYWRkaW5nIGtsaWtuacSZY2lhIG9yYXogemFwaXN1asSFY2Ega2xpa25pxJljaWVcblx0c2V0X21vdXNlX2Rvd24gOiBmdW5jdGlvbihldmVudCl7XG5cblx0XHRpZiAoIWV2ZW50KSB7ZXZlbnQgPSB3aW5kb3cuZXZlbnQ7fSAvL2xhdGEgZGxhIG1vemlsbGlcblx0XHR2YXIgb2JqID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly9qZcWbbGkgZWxlbWVudCBuYSBrdMOzcnkga2xpa25pxJl0byBtYSBhdHJ5YnV0IG5hbWVjbGljayBwcnp5cGlzdWplbXkgZ28gZG8gb2JpZWt0dSBteXN6a2lcblx0XHRpZih0eXBlb2YoJChldmVudC50YXJnZXQpLmF0dHIoJ25hbWVjbGljaycpKSAhPSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdHRoaXMuY2xpY2tfb2JqID0gJChldmVudC50YXJnZXQpLmF0dHIoJ25hbWVjbGljaycpO1xuXG5cdFx0XHR2YXIgcG9zaXRpb24gPSAkKG9iaikub2Zmc2V0KCk7XG5cdFx0XHR0aGlzLm9mZnNldF94ID0gcG9zaXRpb24ubGVmdDtcblx0XHRcdHRoaXMub2Zmc2V0X3kgPSBwb3NpdGlvbi50b3A7XG5cdFx0XHR0aGlzLnBhZGRpbmdfeCA9IHRoaXMubGVmdCAtIHBvc2l0aW9uLmxlZnQ7XG5cdFx0XHR0aGlzLnBhZGRpbmdfeSA9IHRoaXMudG9wIC0gcG9zaXRpb24udG9wO1xuXHRcdFx0bW91c2UubW91c2VfZG93biA9IHRydWU7XG5cblx0XHRcdHRoaXMudG1wX21vdXNlX3ggPSBpbWFnZS54O1xuXHRcdFx0dGhpcy50bXBfbW91c2VfeSA9IGltYWdlLnk7XG5cdFx0fVxuXHR9LFxuXG5cdHNldF9wb3NpdGlvbiA6IGZ1bmN0aW9uKGV2ZW50KXtcblx0XHR0aGlzLmxlZnQgPSBldmVudC5wYWdlWCxcblx0XHR0aGlzLnRvcCA9IGV2ZW50LnBhZ2VZXG5cdH0sXG5cblx0Ly9mdW5rY2phIHd5a29ueXdhbmEgcG9kY3phcyB3Y2nFm25pZWNpYSBwcnp5Y2lrc2t1IG15c3praSAodyB6YWxlxbxub8WbY2kgb2Qga2xpa25pxJl0ZWdvIGVsZW1lbnR1IHd5a29udWplbXkgcsOzxbxuZSByemVjenkpXG5cdG1vdXNlbW92ZSA6IGZ1bmN0aW9uKCl7XG5cdFx0c3dpdGNoKHRoaXMuY2xpY2tfb2JqKXtcblx0XHRcdGNhc2UgJ3JpZ2h0X3Jlc2l6ZSc6XG5cdFx0XHRcdC8vcm96c3plcnphbmllIGNhbnZhc2EgdyBwcmF3b1xuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSAkKCcjY2FudmFzX2JveCAjY2FudmFzX3dyYXBwZXInKS5jaGlsZHJlbignY2FudmFzJykub2Zmc2V0KCk7XG5cdFx0XHRcdHZhciBuZXdfd2lkdGggPSB0aGlzLmxlZnQgLSB0aGlzLnBhZGRpbmdfeCAtIHBvc2l0aW9uLmxlZnRcblx0XHRcdFx0aWYobmV3X3dpZHRoIDwgc2NyZWVuLndpZHRoIC0gMTAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FudmFzLnJlc2l6ZV93aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnYm90dG9tX3Jlc2l6ZSc6XG5cdFx0XHRcdC8vem1pZW5pYW15IHd5c29rb8WbxIcgY2FudmFzYVxuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSAkKCcjY2FudmFzX2JveCAjY2FudmFzX3dyYXBwZXInKS5jaGlsZHJlbignY2FudmFzJykub2Zmc2V0KCk7XG5cdFx0XHRcdGNhbnZhcy5yZXNpemVfaGVpZ2h0KHRoaXMudG9wIC0gdGhpcy5wYWRkaW5nX3kgLSBwb3NpdGlvbi50b3ApO1xuXHRcdFx0XHRjYW52YXMuZHJhdygpO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ2ltYWdlX3Jlc2l6ZSc6XG5cblx0XHRcdFx0aWYoaW1hZ2Uub2JqICE9PSB1bmRlZmluZWQpe1xuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gJCgnI2NhbnZhc19ib3ggI2NhbnZhc193cmFwcGVyJykuY2hpbGRyZW4oJ2NhbnZhcycpLm9mZnNldCgpO1xuXHRcdFx0XHRcdHZhciB4X2FjdHVhbCA9IHRoaXMubGVmdCAtIHBvc2l0aW9uLmxlZnQ7XHQvL2FrdHVhbG5hIHBvenljamEgbXlzemtpXG5cdFx0XHRcdFx0dmFyIHN1YnN0cmFjdCA9IGltYWdlLnggKyBpbWFnZS53aWR0aCAtIHhfYWN0dWFsICsgdGhpcy5wYWRkaW5nX3g7XG5cdFx0XHRcdFx0dmFyIGZhY29yID0gaW1hZ2Uud2lkdGggLyBpbWFnZS5oZWlnaHQ7XG5cblx0XHRcdFx0XHRpZiAoaW1hZ2Uud2lkdGggLSBzdWJzdHJhY3QgPiAxMDApe1xuXHRcdFx0XHRcdFx0aW1hZ2Uud2lkdGggLT0gc3Vic3RyYWN0O1xuXHRcdFx0XHRcdFx0aW1hZ2UuaGVpZ2h0IC09IHN1YnN0cmFjdC9mYWNvcjtcblx0XHRcdFx0XHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cbn1cbiIsIi8vIOKVlOKVkOKVl+KVlOKVl+KVlCAg4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWU4pWQ4pWX4pWm4pWQ4pWX4pWmIOKVplxuLy8g4pWRIOKVkeKVkeKVkeKVkSAg4pWRICDilaDilZDilaMg4pWRIOKVkeKVoyDilZEg4pWm4pWRIOKVkeKVoOKVpuKVneKVmuKVpuKVnVxuLy8g4pWa4pWQ4pWd4pWd4pWa4pWdICDilZrilZDilZ3ilakg4pWpIOKVqSDilZrilZDilZ3ilZrilZDilZ3ilZrilZDilZ3ilanilZrilZAg4pWpIFxuXG5pbXBvcnQgcG9pbnRlcnMgZnJvbSAnLi9wb2ludGVycyc7XG5pbXBvcnQgY2F0ZWdvcmllcyBmcm9tICcuL2NhdGVnb3JpZXMnO1xuaW1wb3J0IGNsb3VkIGZyb20gJy4vY2xvdWQnO1xuaW1wb3J0IG1vdXNlIGZyb20gJy4vbW91c2UnO1xuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcblxuLy9vYmlla3QgbcOzd2nEhWN5IG5hbSBuYWQgamFrxIUga2F0ZWdvcmlhIGplc3RlxZtteVxuZXhwb3J0IGRlZmF1bHQge1xuXHRcblx0Y2FudmFzX29mZnNldF90b3AgOiAkKCcjY2FudmFzX3dyYXBwZXInKS5vZmZzZXQoKS50b3AsXG5cdGNhbnZhc19vZmZzZXRfbGVmdCA6ICQoJyNjYW52YXNfd3JhcHBlcicpLm9mZnNldCgpLmxlZnQsXG5cdG5hbWUgOiBudWxsLFxuXHRudW1iZXIgOiBudWxsLCBcblxuXHQvL2Z1bmtjamEgendyYWNhasSFY2EgYWt0dWFsbsSFIGthdGVnb3JpxJkgbmFkIGt0w7NyxIUgem5hamR1amUgc2nEmSBrdXJzb3Jcblx0c2V0IDogZnVuY3Rpb24oKXtcblxuXHRcdHZhciBsZWZ0ID0gbW91c2UubGVmdCAtIGNhbnZhcy5vZmZzZXRfbGVmdDtcblx0XHR2YXIgdG9wID0gbW91c2UudG9wIC0gY2FudmFzLm9mZnNldF90b3A7XG5cdFx0Ly9jb25zb2xlLmxvZyhsZWZ0LHRvcCk7XG5cdFx0dmFyIHJvdyA9IE1hdGguY2VpbCggdG9wIC8gKHBvaW50ZXJzLnNpemUgKyBwb2ludGVycy5wYWRkaW5nX3kpICk7XG5cdFx0Ly9jb25zb2xlLmxvZyhsZWZ0LHRvcCx0aGlzLmNhbnZhc19vZmZzZXRfbGVmdCx0aGlzLmNhbnZhc19vZmZzZXRfdG9wKTtcblx0XHRpZigocG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbykgJiYgKHJvdyAlIDIgIT0gMCkpe1xuXHRcdFx0dmFyIGNvbHVtbiA9IE1hdGguY2VpbCggKGxlZnQgKyAocG9pbnRlcnMuc2l6ZS8yKSkvIChwb2ludGVycy5zaXplICsgcG9pbnRlcnMucGFkZGluZ194KSApIC0gMTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHZhciBjb2x1bW4gPSBNYXRoLmNlaWwoIGxlZnQgLyAocG9pbnRlcnMuc2l6ZSArIHBvaW50ZXJzLnBhZGRpbmdfeCkgKTtcblx0XHR9XG5cdFx0XG5cdFx0dHJ5e1xuXG5cdFx0XHR2YXIgY2F0ZWdvcnlfbnVtID0gcG9pbnRlcnMucG9pbnRlcnNbcm93LTFdW2NvbHVtbi0xXTtcblx0XHRcdHZhciBjYXRlZ29yeV9uYW1lID0gbGF5ZXJzLmNhdGVnb3J5X25hbWVbY2F0ZWdvcnlfbnVtXTtcblx0XHRcdC8vY29uc29sZS5sb2coJ3Rlc3QnLGNhdGVnb3J5X25hbWUpO1xuXG5cdFx0fVxuXHRcdGNhdGNoKGUpe1xuXHRcdFx0dGhpcy5uYW1lID0gbnVsbDtcblx0XHRcdHRoaXMubnVtYmVyID0gbnVsbDtcblx0XHR9XG5cdFx0XG5cdFx0aWYoKGNhdGVnb3J5X25hbWUgPT0gJ3B1c3R5JykgfHwgKGNhdGVnb3J5X25hbWUgPT0gJ2d1bXVqJykpe1xuXHRcdFx0dGhpcy5uYW1lID0gbnVsbDtcblx0XHRcdHRoaXMubnVtYmVyID0gbnVsbDtcblx0XHR9IFxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLm5hbWUgPSBjYXRlZ29yeV9uYW1lO1xuXHRcdFx0dGhpcy5udW1iZXIgPSBjYXRlZ29yeV9udW07XG5cdFx0fVxuXG5cdH1cblxufSIsIlxuLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWm4pWU4pWX4pWU4pWU4pWm4pWX4pWU4pWQ4pWX4pWm4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilaDilZDilZ3ilZEg4pWR4pWR4pWR4pWR4pWRIOKVkSDilZHilaMg4pWg4pWm4pWd4pWa4pWQ4pWXXG4vLyDilakgIOKVmuKVkOKVneKVqeKVneKVmuKVnSDilakg4pWa4pWQ4pWd4pWp4pWa4pWQ4pWa4pWQ4pWdXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IG1lbnVfdG9wIGZyb20gJy4vbWVudV90b3AnO1xuaW1wb3J0IHBvaW50ZXJzIGZyb20gJy4vcG9pbnRlcnMnO1xuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XG5pbXBvcnQgZmlndXJlcyBmcm9tICcuL2ZpZ3VyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHNob3dfYWxsX3BvaW50IDogdHJ1ZSxcblx0cGFkZGluZ194IDogMSxcblx0cGFkZGluZ195IDogMSxcblx0c2hvd19ib3JkZXIgOiBmYWxzZSxcblx0Y29sb3JfYm9yZGVyOiAnIzMzMycsXG5cdHRyYW5zbGF0ZV9tb2R1bG8gOiBmYWxzZSxcblx0c2l6ZSA6IDEwLFxuXHRtYWluX2tpbmQgOiAnc3F1YXJlJyxcblx0a2luZHMgOiBBcnJheSgnc3F1YXJlJywnY2lyY2xlJywnaGV4YWdvbicsJ2hleGFnb24yJyksXG5cblx0cG9pbnRlcnMgOiBBcnJheSgpLCAvL3BvaW50ZXJzLnBvaW50ZXJzW3J6YWRdW2tvbHVtbmFdIDoga2F0ZWdvcmlhW251bWVyXVxuXG5cdGxhc3RfY29sdW1uIDogbnVsbCxcdC8va29sdW1uYSBwb2ludGVyYSBrdMOzcnkgem9zdGHFgiBvc3RhdG5pbyB6bWllbmlvbnlcblx0bGFzdF9yb3cgOiBudWxsLFx0Ly93aWVyc3ogcG9pbnRlcmEga3TDs3J5IHpvc3RhxYIgb3N0YXRuaW8gem1pZW5pb255XG5cblx0XHRkcmF3X2JvcmRlcjogZnVuY3Rpb24obmV4dCl7XG5cblx0XHR2YXIgd2lkdGhfcG9pbnRlciA9IHRoaXMuc2l6ZSArIHRoaXMucGFkZGluZ194LFxuXHRcdFx0XHRoZWlnaHRfcG9pbnRlciA9IHRoaXMuc2l6ZSArIHRoaXMucGFkZGluZ195LFxuXHRcdFx0XHRub25lX2NvbG9yID0gXCJyZ2JhKDAsMCwwLDApXCIsXG5cdFx0XHRcdGJvcmRlciA9IHt9LFxuXHRcdFx0XHRkYXRhID0ge307XG5cdFx0XG5cdFx0dmFyIG5leHQgPSBuZXh0IHx8IGZhbHNlO1xuXG5cdFx0aWYoKHRoaXMubWFpbl9raW5kID09ICdzcXVhcmUnKSB8fCAodGhpcy5tYWluX2tpbmQgPT0gJ2NpcmNsZScpIHx8ICh0aGlzLm1haW5fa2luZCA9PSAnaGV4YWdvbicpKXtcblx0XHRcdFx0XG5cdFx0XHQvL2NhbnZhcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JfYm9yZGVyO1xuXHRcdFx0Y2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGE9MTtcblx0XHRcdC8vY2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMTI4LDAsMCwxKSc7XG5cblx0XHRcdGlmKCFuZXh0KXtcblx0XHRcdFx0Y2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGE9MTtcblx0XHRcdFx0Y2FudmFzLmNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMSknO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0Y2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGE9MC41O1xuXHRcdFx0XHRjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yX2JvcmRlcjtcblx0XHRcdH1cblxuXG5cdFx0XHRmb3IodmFyIHJvdyA9IDA7IHJvdyA8IGNhbnZhcy5hY3RpdmVfcm93OyByb3crKyl7XG5cdFx0XHRcdGZvcih2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgY2FudmFzLmFjdGl2ZV9jb2x1bW47IGNvbHVtbisrKXtcblxuXHRcdFx0XHRcdGlmKHRoaXMucG9pbnRlcnNbcm93XVtjb2x1bW5dICE9IDApe1xuXG5cdFx0XHRcdFx0XHRib3JkZXIgPSB7XG5cdFx0XHRcdFx0XHRcdHRvcDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHRvcF9sZWZ0IDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHRvcF9yaWdodCA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRyaWdodDogZmFsc2Vcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8vcnlzdWplbXkgcG/FgsOzd2thbWlcblx0XHRcdFx0XHRcdC8vc3ByYXdkemFteSBjenkgbWFteSB3xYLEhWN6b27EhSBvcGNqZSBtb2R1bG9cblx0XHRcdFx0XHRcdGlmKHJvdy0xID49IDApe1xuXHRcdFx0XHRcdFx0XHRpZighcG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbyl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9qZcWbbGkgbmllIHRvIHNwcmF3ZHphbXkgdHJhZHljeWpuaWUgd8WCxIVjem9uxIUgZ3JhbmljxJkgbmFkIFxuXHRcdFx0XHRcdFx0XHRcdGlmKCh0aGlzLnBvaW50ZXJzW3Jvdy0xXVtjb2x1bW5dICE9IDApJiYodGhpcy5wb2ludGVyc1tyb3ctMV1bY29sdW1uXSAhPSB0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Ym9yZGVyLnRvcCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Ly9qZcWbbGkgdGFrIHRvOiBzcHJhd2R6YW15IGN6eSB3aWVyc3ogamVzdCBwcnplc3VuacSZdHlcblx0XHRcdFx0XHRcdFx0XHRpZihyb3cgJSAyID09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKGNvbHVtbi0xKSA+IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZigodGhpcy5wb2ludGVyc1tyb3ctMV1bY29sdW1uXSAhPSAwKSYmKHRoaXMucG9pbnRlcnNbcm93LTFdW2NvbHVtbl0gIT0gdGhpcy5wb2ludGVyc1tyb3ddW2NvbHVtbl0pKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3JkZXIudG9wX2xlZnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZigodGhpcy5wb2ludGVyc1tyb3ctMV1bY29sdW1uKzFdICE9IDApJiYodGhpcy5wb2ludGVyc1tyb3ctMV1bY29sdW1uKzFdICE9IHRoaXMucG9pbnRlcnNbcm93XVtjb2x1bW5dKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJvcmRlci50b3BfcmlnaHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKHRoaXMucG9pbnRlcnNbcm93LTFdW2NvbHVtbi0xXSAhPSAwKSYmKHRoaXMucG9pbnRlcnNbcm93LTFdW2NvbHVtbi0xXSAhPSB0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRib3JkZXIudG9wX2xlZnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoKGNvbHVtbisxKSA8PSBjYW52YXMuYWN0aXZlX2NvbHVtbil7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKCh0aGlzLnBvaW50ZXJzW3Jvdy0xXVtjb2x1bW5dICE9IDApJiYodGhpcy5wb2ludGVyc1tyb3ctMV1bY29sdW1uXSAhPSB0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJvcmRlci50b3BfcmlnaHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XHRcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoKGNvbHVtbisxKSA8PSBjYW52YXMuYWN0aXZlX2NvbHVtbil7XG5cdFx0XHRcdFx0XHRcdGlmKCh0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uKzFdICE9IDApJiYodGhpcy5wb2ludGVyc1tyb3ddW2NvbHVtbisxXSAhPSB0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSkpe1xuXHRcdFx0XHRcdFx0XHRcdGJvcmRlci5yaWdodCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0eCA6IGNvbHVtbip3aWR0aF9wb2ludGVyLFxuXHRcdFx0XHRcdFx0XHR5IDogcm93KmhlaWdodF9wb2ludGVyLFxuXHRcdFx0XHRcdFx0XHRzaXplIDogdGhpcy5zaXplLFxuXHRcdFx0XHRcdFx0XHRib3JkZXIgOiBib3JkZXIsXG5cdFx0XHRcdFx0XHRcdGxpbmVfd2lkdGhfeCA6IHBvaW50ZXJzLnBhZGRpbmdfeCxcblx0XHRcdFx0XHRcdFx0bGluZV93aWR0aF95IDogcG9pbnRlcnMucGFkZGluZ195LFxuXHRcdFx0XHRcdFx0XHR0X21vZHVsbyA6IGZhbHNlXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCAocm93ICUgMiA9PSAwKSAmJiAocG9pbnRlcnMudHJhbnNsYXRlX21vZHVsbykgKXtcblx0XHRcdFx0XHRcdFx0ZGF0YS54ID0gY29sdW1uKndpZHRoX3BvaW50ZXIgKyB3aWR0aF9wb2ludGVyLzI7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKCFuZXh0KXtcblx0XHRcdFx0XHRcdFx0ZmlndXJlcy5zcXVhcmVfYm9yZGVyX2JpZyhkYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcdGZpZ3VyZXMuc3F1YXJlX2JvcmRlcl9zbWFsbChkYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKCFuZXh0KXtcblx0XHRcdHRoaXMuZHJhd19ib3JkZXIodHJ1ZSk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vcnlzb3dhbmllIHdzenlzdGtpY2ggcHVua3TDs3dcblx0ZHJhdyA6IGZ1bmN0aW9uKCl7XG5cdFx0Ly9jb25zb2xlLmxvZygnZHJhdycsdGhpcy5zaXplLGxheWVycy5jYXRlZ29yeV9jb2xvcnMpOyBcblx0XHR2YXIgd2lkdGhfcG9pbnRlciA9IHRoaXMuc2l6ZSArIHRoaXMucGFkZGluZ194O1xuXHRcdHZhciBoZWlnaHRfcG9pbnRlciA9IHRoaXMuc2l6ZSArIHRoaXMucGFkZGluZ195O1xuXHRcdHZhciBub25lX2NvbG9yID0gXCJyZ2JhKDAsMCwwLDApXCI7XG5cblx0XHQvL2lmKHRoaXMuc2hvd19hbGxfcG9pbnQpIG5vbmVfY29sb3IgPSBcInJnYmEoMTI4LDEyOCwxMjgsMSlcIjtcblxuXHRcdGZvcih2YXIgcm93ID0gMDsgcm93IDwgY2FudmFzLmFjdGl2ZV9yb3c7IHJvdysrKXtcblx0XHRcdGZvcih2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgY2FudmFzLmFjdGl2ZV9jb2x1bW47IGNvbHVtbisrKXtcblxuXHRcdFx0XHRpZih0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9PSAwKXtcblx0XHRcdFx0XHRjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBub25lX2NvbG9yO1xuXHRcdFx0XHRcdGNhbnZhcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMC41OyBcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGlmKCAodGhpcy5wb2ludGVyc1tyb3ddW2NvbHVtbl0gIT0gbWVudV90b3AuY2F0ZWdvcnkpICYmIChtZW51X3RvcC5jYXRlZ29yeSAhPSAwKSApe1xuXHRcdFx0XHRcdFx0Y2FudmFzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdGNhbnZhcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0cnl7XG5cdFx0XHRcdFx0XHRjYW52YXMuY29udGV4dC5maWxsU3R5bGUgPSBsYXllcnMuY2F0ZWdvcnlfY29sb3JzW2xheWVycy5hY3RpdmVdWyB0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaChlKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdFUlJPUiAzOSBMSU5FICEgJyx0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSxyb3csY29sdW1uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiggKHJvdyAlIDIgPT0gMCkgJiYgKHBvaW50ZXJzLnRyYW5zbGF0ZV9tb2R1bG8pICl7XG5cdFx0XHRcdFx0ZmlndXJlc1t0aGlzLm1haW5fa2luZF0oIGNvbHVtbip3aWR0aF9wb2ludGVyICsgd2lkdGhfcG9pbnRlci8yICwgcm93KmhlaWdodF9wb2ludGVyICwgdGhpcy5zaXplKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGZpZ3VyZXNbdGhpcy5tYWluX2tpbmRdKCBjb2x1bW4qd2lkdGhfcG9pbnRlciAsIHJvdypoZWlnaHRfcG9pbnRlciAsIHRoaXMuc2l6ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuc2hvd19ib3JkZXIpe1xuXHRcdFx0dGhpcy5kcmF3X2JvcmRlcigpO1xuXHRcdH1cblx0XHRcblx0fSxcblxuXHQvL3R3b3J6eW15IHRhYmxpY2UgcG9udGVyw7N3IChqZcWbbGkgamFracWbIHBvbnRlciBpc3RuaWVqZSB6b3N0YXdpYW15IGdvLCB3IHByenlwYWRrdSBnZHkgcG9pbnRlcmEgbmllIG1hIHR3b3J6eW15IGdvIG5hIG5vd28pXG5cdGNyZWF0ZV9hcnJheSA6IGZ1bmN0aW9uKCl7XG5cdFx0Y2FudmFzLmFjdGl2ZV9yb3cgPSBwYXJzZUludCggY2FudmFzLmhlaWdodF9jYW52YXMgLyAocG9pbnRlcnMuc2l6ZSArIHBvaW50ZXJzLnBhZGRpbmdfeSkgKTtcblx0XHRjYW52YXMuYWN0aXZlX2NvbHVtbiA9IHBhcnNlSW50KCBjYW52YXMud2lkdGhfY2FudmFzIC8gKHBvaW50ZXJzLnNpemUgKyBwb2ludGVycy5wYWRkaW5nX3gpICk7XG5cblx0XHRpZiggKHRoaXMucG9pbnRlcnMubGVuZ3RoIDwgY2FudmFzLmFjdGl2ZV9yb3cpIHx8ICh0aGlzLnBvaW50ZXJzWzBdLmxlbmd0aCA8IGNhbnZhcy5hY3RpdmVfY29sdW1uKSApXG5cdFx0e1xuXHRcdFx0Zm9yICh2YXIgcm93ID0gMDsgcm93IDwgY2FudmFzLmFjdGl2ZV9yb3c7IHJvdysrKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IgKHZhciBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjYW52YXMuYWN0aXZlX2NvbHVtbjsgY29sdW1uKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0aGlzLnBvaW50ZXJzW3Jvd10gPT0gdW5kZWZpbmVkKSB0aGlzLnBvaW50ZXJzW3Jvd10gPSBuZXcgQXJyYXkoKTtcblx0XHRcdFx0XHRpZih0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9PSB1bmRlZmluZWQpXHR0aGlzLnBvaW50ZXJzW3Jvd11bY29sdW1uXSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0dXBkYXRlX3BvaW50IDogZnVuY3Rpb24oeSx4LHlfbGFzdCx4X2xhc3Qpe1xuXG5cdFx0dGhpcy5wb2ludGVyc1t5XVt4XSA9IHBhcnNlSW50KCBtZW51X3RvcC5jYXRlZ29yeSApO1xuXG5cdFx0Ly93eXpuYWN6ZW5pZSByw7N3bmFuaWEgcHJvc3RlalxuXHRcdGlmKCAoKHlfbGFzdCAhPSB5KSB8fCAoeF9sYXN0ICE9IHgpKSAmJiAoeV9sYXN0ICE9IG51bGwpICYmICh4X2xhc3QgIT0gbnVsbCkgKXtcblx0XHRcdHZhciBhID0gKHlfbGFzdCAtIHkpIC8gKHhfbGFzdCAtIHgpO1xuXHRcdFx0dmFyIGIgPSB5IC0gYSp4O1xuXG5cdFx0XHRpZih4X2xhc3QgPiB4KXtcblx0XHRcdFx0dmFyIGNvbF9mcm9tID0geDtcblx0XHRcdFx0dmFyIGNvbF90byA9IHhfbGFzdDtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgY29sX3RvID0geDtcblx0XHRcdFx0dmFyIGNvbF9mcm9tID0geF9sYXN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZih5X2xhc3QgPiB5KXtcblx0XHRcdFx0dmFyIHJvd19mcm9tID0geTtcblx0XHRcdFx0dmFyIHJvd190byA9IHlfbGFzdDtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgcm93X3RvID0geTtcblx0XHRcdFx0dmFyIHJvd19mcm9tID0geV9sYXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcm93ID0gbnVsbDtcblx0XHRcdGZvcih2YXIgY29sID0gY29sX2Zyb207IGNvbCA8PSBjb2xfdG87IGNvbCsrKVxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgPSBwYXJzZUludCggYSpjb2wrYiApO1xuXHRcdFx0XHRpZighJC5pc051bWVyaWMocm93KSkgcm93ID0geTtcblx0XHRcdFx0dGhpcy5wb2ludGVyc1tyb3ddW2NvbF0gPSBwYXJzZUludCggbWVudV90b3AuY2F0ZWdvcnkgKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvbCA9IG51bGw7XG5cdFx0XHRmb3IodmFyIHJvdyA9IHJvd19mcm9tOyByb3cgPD0gcm93X3RvOyByb3crKylcblx0XHRcdHtcblx0XHRcdFx0Y29sID0gcGFyc2VJbnQoIChyb3ctYikvYSApO1xuXHRcdFx0XHRpZighJC5pc051bWVyaWMoY29sKSkgY29sID0geDtcblx0XHRcdFx0dGhpcy5wb2ludGVyc1tyb3ddW2NvbF0gPSBwYXJzZUludCggbWVudV90b3AuY2F0ZWdvcnkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHRoaXMucG9pbnRlcnNbeV1beF0gPSBwYXJzZUludCggbWVudV90b3AuY2F0ZWdvcnkgKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3cgOiBmdW5jdGlvbigpe1xyXG4gICAgLy9jb25zb2xlLmxvZyggbGF5ZXJzLnNvdXJjZSApO1xyXG4gICAgJCgnI3NvdXJjZScpLmh0bWwoIGxheWVycy5zb3VyY2UgKTsgXHJcbiAgfVxyXG59Il19
