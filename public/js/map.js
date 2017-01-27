(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _canvas = require('./mod/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _colpick = require('./mod/colpick');

var _colpick2 = _interopRequireDefault(_colpick);

var _categories = require('./mod/categories');

var _categories2 = _interopRequireDefault(_categories);

var _crud = require('./mod/crud');

var _crud2 = _interopRequireDefault(_crud);

var _figures = require('./mod/figures');

var _figures2 = _interopRequireDefault(_figures);

var _global = require('./mod/global');

var _global2 = _interopRequireDefault(_global);

var _image = require('./mod/image');

var _image2 = _interopRequireDefault(_image);

var _menuTop = require('./mod/menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

var _models = require('./mod/models');

var _models2 = _interopRequireDefault(_models);

var _mouse = require('./mod/mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _points = require('./mod/points');

var _points2 = _interopRequireDefault(_points);

var _store = require('./mod/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//specjalny obiekt do badania stanu różnych obiektów
window.spec = {
	canvas: _canvas2.default,
	categories: _categories2.default,
	colpick: _colpick2.default,
	crud: _crud2.default,
	figures: _figures2.default,
	global: _global2.default,
	image: _image2.default,
	menuTop: _menuTop2.default,
	models: _models2.default,
	mouse: _mouse2.default,
	points: _points2.default,
	store: _store2.default
};

$(document).ready(function () {

	_crud2.default.getMaps();
	_canvas2.default.init();
	_menuTop2.default.showInfo();
	_points2.default.showInfo();
	_canvas2.default.draw();

	//zablokowanie możliwości zaznaczania buttonów podczas edycji pola
	$(document).on("focusin", "input", function () {
		_store2.default.menuTop.disableSelect = true;
	});
	$(document).on("focusout", "input", function () {
		_store2.default.menuTop.disableSelect = false;
	});

	//jeśli nie mamy zdefiniowanega hasha tworzymy nową mapę w przeciwnym wypadku aktualizujemy już istniejącą
	$('#toolbar_top button.save').click(function () {
		if (typeof _crud2.default.mapHash == 'string') {
			_crud2.default.updateMap();
		} else {
			_crud2.default.createMap();
		}
	});

	$('#toolbar_top button.delete').click(function () {
		if (confirm('Czy chcesz usunąć mapę ?')) {
			if (typeof _store2.default.mapHash != null) {
				_crud2.default.deleteMap();
			}
		}
	});

	//odznaczenie selecta przy zmianie
	$('#change_category').change(function () {
		$('#change_category').blur();
	});

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup(function () {
		_store2.default.mouse.mouseDown = false;
	});

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown(function (e) {
		e = e || window.event;
		_mouse2.default.setMouseDown(e);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove(function (e) {
		e = e || window.event;
		_mouse2.default.setPosition(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if (_store2.default.mouse.mouseDown) {
			_mouse2.default.mouseMove(e);
		}

		if (_store2.default.menuTop.autoDraw) {
			_store2.default.mouse.clickObj = "canvas";
			_mouse2.default.mouseMove(e);
		}
	});

	$('#main_canvas').mousedown(function (e) {
		e = e || window.event;
		_mouse2.default.setMouseDown(e); //zarejestrowanie obiektuw  który klikamy
		_mouse2.default.setPosition(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		_mouse2.default.mouseMove(e);
	});

	$(document).mouseup(function () {
		_points2.default.lastColumn = null; //kolumna pointera który został ostatnio zmieniony
		_points2.default.lastRow = null;
		_store2.default.canvas.ctxX = _store2.default.canvas.ctxNewX;
		_store2.default.canvas.ctxY = _store2.default.canvas.ctxNewY;
	});

	$('#move_image').click(function () {
		_menuTop2.default.switchMode('moveImage');
	});
	$('#move_canvas').click(function () {
		_menuTop2.default.switchMode('moveCanvas');
	});
	$('#auto_draw').click(function () {
		_menuTop2.default.switchMode('autoDraw');
	});
	$('#rubber').click(function () {
		_menuTop2.default.switchMode('rubber');
	});

	// button paddingX
	$('button.increment.paddingX').click(function () {
		_store2.default.map.points.paddingX++;_points2.default.showInfo();
	});
	$('button.decrement.paddingX').click(function () {
		_store2.default.map.points.paddingX--;_points2.default.showInfo();
	});
	$('input.paddingX').keyup(function (e) {
		_store2.default.map.points.paddingX = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0;
		_points2.default.showInfo();
	});

	// button paddingY
	$('button.increment.paddingY').click(function () {
		_store2.default.map.points.paddingY++;_points2.default.showInfo();
	});
	$('button.decrement.paddingY').click(function () {
		_store2.default.map.points.paddingY--;_points2.default.showInfo();
	});
	$('input.paddingY').keyup(function (e) {
		_store2.default.map.points.paddingY = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0;
		_points2.default.showInfo();
	});

	//button sizePointer
	$('button.increment.sizePointer').click(function () {
		_store2.default.map.points.size++;_points2.default.showInfo();
	});
	$('button.decrement.sizePointer').click(function () {
		_store2.default.map.points.size--;_points2.default.showInfo();
	});
	$('input.sizePointer').keyup(function (e) {
		_store2.default.map.points.size = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0;
		_points2.default.showInfo();
	});

	$('.switch.showAllPoint').click(function (e) {
		if ($(e.currentTarget).hasClass('switch-off')) {
			_store2.default.points.showAll = true;
		} else {
			_store2.default.points.showAll = false;
		}
		_points2.default.showInfo();
	});

	$('.switch.translateModulo').click(function (e) {
		if ($(e.currentTarget).hasClass('switch-off')) {
			_store2.default.map.points.translate = true;
		} else {
			_store2.default.map.points.translate = false;
		}
		_points2.default.showInfo();
	});

	$('select[name="main_kind"]').change(function (e) {
		_store2.default.map.points.type = $(e.currentTarget)[0].selectedIndex;
		_points2.default.showInfo();
	});

	$('#change_category').change(function (e) {
		_store2.default.menuTop.category = $(e.currentTarget)[0].selectedIndex + 1;
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

	$(document).keypress(function (e) {
		_menuTop2.default.switchMode(e.which);
	});

	//zaktualizowanie kategorii
	$("#list").delegate("input", "focusout", function (e) {
		_categories2.default.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val());
	});

	$("#list").delegate("input", "keypress", function (e) {
		if (e.which == 13) {
			_categories2.default.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val());
		}
	});

	//usunięcie kategorii
	$("#list").delegate("button.remove", "click", function (e) {
		_categories2.default.remove($(e.currentTarget).attr('id_category'));
	});

	//zaktualizowanie kategorii
	$(document).delegate("input", "click", function () {
		_store2.default.menuTop.modeKey = false;
	});
	$(document).delegate("input", "focusout", function () {
		_store2.default.menuTop.modeKey = true;
	});

	//pokazanie / ukrycie panelu kategorii
	$('#category_box h2, #pointer_box h2').click(function (e) {
		_global2.default.toogle_panel(e);
	});

	//obługa inputów pobranie danych i zapisanie do bazy
	//$('.switch').click( (e) => { models.update_from_switch( $(e.currentTarget) ); }); //przyciski switch
	//$('.input_base').change( (e) => { models.update_from_input( $(e.currentTarget) ); }); //tradycyjne inputy
	//$('.input_base_text').change( (e) => { models.update_from_input_text( $(e.currentTarget) ); }); //tradycyjne inputy
	//$('.select_base').change( (e) => { models.update_from_select( $(e.currentTarget) ); }); //listy rozwijane select

	$('#increment_canvas').click(function () {
		_menuTop2.default.incrementScale();
	});
	$('#decrement_canvas').click(function () {
		_menuTop2.default.decrementScale();
	});
	$('#add_image').click(function () {
		_image2.default.add();
	});

	$('#reset_canvas').click(function () {
		_canvas2.default.setDefault();
	});

	$('#duplicate').click(function () {
		if (confirm("Czy chcesz skopiować aktualną mapę ?")) {
			_crud2.default.duplicate();
		}
	});

	$('#canvas_info #width,#canvas_info #height,#canvas_info #size').change(function () {
		_menuTop2.default.updateCanvasInfo();
	});

	$('#alpha_image').mousemove(function (e) {
		if ($(e.currentTarget).val() / 100 != _store2.default.map.image.alpha) {
			_store2.default.map.image.alpha = $(e.currentTarget).val() / 100;
			_canvas2.default.draw();
		}
	});

	$('input').click(function () {
		_store2.default.menuTop.modeKey = false;
	});
	$('input').focusout(function () {
		_store2.default.menuTop.modeKey = true;
	});

	$(document).mouseup(function () {
		_canvas2.default.draw();
	});

	//zapisujemy lub aktualizujemy mapę po kliknięciu w buttow w zależności od tego czy mamy zdefiniowane id mapy
	$('.menu_right .save').click(function () {
		if (_store2.default.mapHash == null) {
			_crud2.default.createMap();
		} else {
			_crud2.default.updateMap();
		}
	});

	//usuwamy mapę po kliknięciu w button
	$('.menu_right .remove').click(function () {
		if (confirm("czy napewno usunąć mapę ?")) {
			_crud2.default.deleteMap();
		}
	});
});

},{"./mod/canvas":2,"./mod/categories":3,"./mod/colpick":4,"./mod/crud":5,"./mod/figures":6,"./mod/global":7,"./mod/image":8,"./mod/menuTop":9,"./mod/models":10,"./mod/mouse":11,"./mod/points":12,"./mod/store":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//czyszczenie i rysowanie po canvasie
exports.default = {

	//przypisanie podstawowych danych do obiektu canvas
	init: function init() {

		_store2.default.canvas.obj = document.getElementById('main_canvas');
		_store2.default.canvas.ctx = _store2.default.canvas.obj.getContext('2d');

		$('#main_canvas').attr({ 'width': _store2.default.map.canvas.width + 'px', 'height': _store2.default.map.canvas.height + 'px' });
		$('#canvas_box, #canvas_wrapper').css({ 'width': _store2.default.map.canvas.width + 'px', 'height': _store2.default.map.canvas.height + 'px' });

		var offset = $('#canvas_box').offset();
		_store2.default.canvas.offsetLeft = offset.left;
		_store2.default.canvas.offsetTop = offset.top;
	},
	thumbnail: function thumbnail() {
		var dataURL = _store2.default.canvas.obj.toDataURL();
		console.log(dataURL);
	},


	//rysujemy canvas ze zdjęciem
	draw: function draw() {
		this.clear();

		_points2.default.draw();
		if (_store2.default.map.image.src !== null) {
			_image2.default.draw();
		}
	},


	//resetujemy tło zdjęcia
	reset: function reset() {
		_store2.default.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
		_store2.default.canvas.ctx.scale(_store2.default.canvas.scale / 100, _store2.default.canvas.scale / 100);
	},


	// czyścimy całe zdjęcie na canvasie
	clear: function clear() {
		_store2.default.canvas.ctx.clearRect(0, 0, _store2.default.map.canvas.width, _store2.default.map.canvas.height);
	},
	resizeWidth: function resizeWidth(width) {

		_store2.default.map.canvas.width = width;
		_points2.default.createDb();

		$('#main_canvas').attr('width', width + 'px');
		$('#canvas_box, #canvas_wrapper').css({ 'width': width + 'px' });
		$('#canvas_info #width').val(width + 'px');

		_store2.default.canvas.scale = 100;
		$('#canvas_info #size').val('100%');
		_menuTop2.default.showInfo();
	},
	resizeHeight: function resizeHeight(height) {

		_store2.default.map.canvas.height = height;
		_points2.default.createDb();

		$('#main_canvas').attr('height', height + 'px');
		$('#canvas_box, #canvas_wrapper').css({ 'height': height + 'px' });
		$('#canvas_info #height').val(height + 'px');

		_store2.default.canvas.scale = 100;

		$('#canvas_info #size').val('100%');
		_menuTop2.default.showInfo();
	},
	setDefault: function setDefault() {

		$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
		if (_image2.default.move_image) $('#canvas_box #image_resize').fadeIn(0);

		_store2.default.canvas.scale = 100;
		_store2.default.canvas.ctxX = 0;
		_store2.default.canvas.ctxY = 0;
		_store2.default.canvas.ctxNewX = 0;
		_store2.default.canvas.ctxNewY = 0;
		_store2.default.canvas.ctx.scale(_store2.default.canvas.scale / 100, _store2.default.canvas.scale / 100);

		var newWidth = _store2.default.map.canvas.width * (_store2.default.canvas.scale / 100);
		var newHeight = _store2.default.map.canvas.height * (_store2.default.canvas.scale / 100);
		$('#main_canvas').attr({ 'width': newWidth + 'px', 'height': newHeight + 'px' });
		$('#canvas_box, #canvas_wrapper').css({ 'width': newWidth + 'px', 'height': newHeight + 'px' });

		_canvas2.default.reset();
		_store2.default.canvas.ctx.translate(_store2.default.canvas.ctxX / (_store2.default.canvas.scale / 100), _store2.default.canvas.ctxY / (_store2.default.canvas.scale / 100));
		_menuTop2.default.showInfo();
		_canvas2.default.draw();
	}
}; // ╔═╗╔═╗╔╗╔╦  ╦╔═╗╔═╗
// ║  ╠═╣║║║╚╗╔╝╠═╣╚═╗
// ╚═╝╩ ╩╝╚╝ ╚╝ ╩ ╩╚═╝

},{"./canvas":2,"./image":8,"./menuTop":9,"./points":12,"./store":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

var _colpick = require('./colpick');

var _colpick2 = _interopRequireDefault(_colpick);

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt kategorii dodanie / aktualizacja / usunięcie / pokazanie kategorii
exports.default = {

	//dodajemy nową kategorię
	add: function add() {
		_store2.default.map.categories.push({
			name: $('#category_box input[name="addCategory"]').val(),
			color: _store2.default.categories.colorDefault
		});

		if (_store2.default.map.categories.length == 2) {
			_store2.default.menuTop.category = 1;
		};

		$('#category_box input[name="addCategory"]').val('');
		this.showList();
	},


	//aktualizujemy już istniejącą kategorię
	update: function update(index, name) {
		_store2.default.map.categories[index].name = name;
		this.showList();
	},


	//usuwamy kategorię
	remove: function remove(id) {
		var th = this;
		$.each(_store2.default.map.categories, function (index, value) {
			if (index >= id) {
				th.category[index] = th.category[index + 1];
			}
		});
		for (var row = 0; row < _store2.default.map.points.db.length; row++) {
			for (var column = 0; column < _store2.default.map.points.db[row].length; column++) {
				if (_store2.default.map.points.db[row][column] == id) {
					_store2.default.map.points.db[row][column] = 0;
				}
				if (_store2.default.map.points.db[row][column] > id) {
					_store2.default.map.points.db[row][column] = parseInt(_store2.default.map.points.db[row][column]) - 1;
				}
			}
		}

		_store2.default.map.categories.pop();
		this.showList();
		_canvas2.default.draw();
	},
	showList: function showList() {
		var addCategory = "<table>";
		var addSelect = '';

		for (var i = 1, iMax = _store2.default.map.categories.length; i < iMax; i++) {
			addCategory += '<tr><td><span>' + i + '</span></td><td><input type="text" name="category_name" id_category="' + i + '" value="' + _store2.default.map.categories[i].name + '" /></td><td><div class="colpick_box" style="background-color:' + _store2.default.map.categories[i].color + '" id_category="' + i + '"></div></td><td><button class="remove" id_category="' + i + '">usun</button></td></tr>';
			addSelect += '<option name="' + i + '">' + _store2.default.map.categories[i].name + '</option>';
		}

		if (_store2.default.map.categories.length > 1) {
			$('select#change_category').html(addSelect).show(500);
			$('select#change_category option').eq(_store2.default.menuTop.category).attr('selected');
		} else {
			$('select#change_category').hide(500);
		}

		addCategory += "</table>";
		$('#category_box #list').html(addCategory);

		_colpick2.default.add();
	}
}; // ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦ ╦
// ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝╚╦╝
// ╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═ ╩

},{"./canvas":2,"./colpick":4,"./menuTop":9,"./points":12,"./store":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//sama nazwa wiele tłumaczy po prostu colorpicker
exports.default = {
	add: function add() {
		this.remove();

		$('.colpick_box').ColorPicker({
			color: '#ff0000',
			onShow: function onShow(colpkr) {
				if ($(colpkr).css('display') == 'none') {
					$(colpkr).fadeIn(200);
					_store2.default.colpick.clickId = $(this).attr('id_category');
				}
				return false;
			},
			onHide: function onHide(colpkr) {
				$(colpkr).fadeOut(200);
				return false;
			},
			onChange: function onChange(hsb, hex, rgb) {
				$('.colpick_box[id_category="' + _store2.default.colpick.clickId + '"]').css('backgroundColor', '#' + hex);
				_store2.default.map.categories[_store2.default.colpick.clickId].color = '#' + hex;
				_canvas2.default.draw();
			}
		});
	},
	remove: function remove() {
		$('.colorpicker').remove();
	}
}; // ╔═╗╔═╗╦  ╔═╗╦═╗╔═╗╦╔═╗╦╔═╔═╗╦═╗
// ║  ║ ║║  ║ ║╠╦╝╠═╝║║  ╠╩╗║╣ ╠╦╝
// ╚═╝╚═╝╩═╝╚═╝╩╚═╩  ╩╚═╝╩ ╩╚═╝╩╚═

},{"./canvas":2,"./categories":3,"./store":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcja odpowiedzialna za tworzenie zapisywanie i aktualizacje danych dotycząćcyh mapy
exports.default = {

	//wyświetlamy listę map w panelu u góry
	getMaps: function getMaps() {
		$.ajax({
			url: '/api/maps',
			type: "GET",
			contentType: "application/json"
		}).done(function (response) {

			if (response.status == "ok") {

				_store2.default.mapsList = [];

				console.log('pobrane dane' + response);

				for (var i = 0, i_max = response.data.length; i < i_max; i++) {

					if (response.data[i].hasOwnProperty("data")) {
						_store2.default.mapsList.push({
							id: response.data[i]._id,
							title: response.data[i].data.title
						});
					} else {
						_store2.default.mapsList.push({
							id: response.data[i]._id,
							title: JSON.parse(response.data[i].map_json)[0][7]
						});
					}
				}
			}
		});
	},
	duplicate: function duplicate() {

		_store2.default.data.title = _store2.default.data.title + ' - kopia';
		//aktualizujemy jsona do wysłania ajaxem
		this.get_data();
		var th = this; //zmienna pomocnicza

		var data = {
			map_json: th.map_json
		};

		jQuery.ajax({
			url: "api/maps",
			data: { map_json: th.map_json },
			type: 'POST',
			success: function success(response) {

				if (response.status == 'ok') {
					th.map_hash = response.hash_map;
					_crud2.default.select_map(th.map_hash);
					th.getMaps(); //pobranie listy map i wyświetlenie jej w menuTop
				}
			}
		});
	},


	//pobieramy dane z porojektu i zapisujemy je do json-a
	getData: function getData() {

		//zerujemy na nowo całą tablicę pointerów
		this.map_json = Array();

		// data[x] = zmienne podstawowe dotyczące mapy
		this.map_json[0] = Array();
		this.map_json[0][0] = _canvas2.default.height_canvas;
		this.map_json[0][1] = _canvas2.default.width_canvas;
		this.map_json[0][2] = _points2.default.padding_x;
		this.map_json[0][3] = _points2.default.padding_y;
		this.map_json[0][4] = _points2.default.translate_modulo;
		this.map_json[0][5] = _points2.default.size_pointer;
		this.map_json[0][6] = _points2.default.main_kind;
		this.map_json[0][7] = _canvas2.default.title_project;

		// data[1] = tablica punktów (points.points) [wiersz][kolumna] = "none" || (numer kategorii)
		this.map_json[1] = _points2.default.points;

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

		//konwertujemy nasza tablice na json
		//console.log('MAP _ JSON', this.map_json, JSON.stringify( this.map_json ));
		this.map_json = JSON.stringify(this.map_json);
	},


	//pobranie mapy z bazy danych
	special: function special() {

		var th = this;

		//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
		var response = _crud2.default.data;

		//pobieramy i wczytujemy dane o canvasie do obiektu
		_canvas2.default.height_canvas = response[0][0];
		_canvas2.default.width_canvas = response[0][1];
		_points2.default.padding_x = response[0][2];
		_points2.default.padding_y = response[0][3];
		_points2.default.translate_modulo = response[0][4];
		_points2.default.size_pointer = response[0][5];
		_points2.default.main_kind = response[0][6];
		_canvas2.default.title_project = response[0][7];

		$('#pointer_box input[name="padding_x"]').val(response[0][2]);
		$('#pointer_box input[name="padding_y"]').val(response[0][3]);
		$('#pointer_box input[name="size_pointer"]').val(response[0][5]);
		$('input[name="title_project"]').val(response[0][7]);

		if (response[0][4]) {
			$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
			$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
		}

		$('#pointer_box select[name="main_kind"]').html('');

		_points2.default.kinds.forEach(function (kind) {
			if (kind == response[0][6]) {
				$('#pointer_box select[name="main_kind"]').append('<option selected="selected" name="' + kind + '">' + kind + '</option>');
			} else {
				$('#pointer_box select[name="main_kind"]').append('<option name="' + kind + '">' + kind + '</option>');
			}
		});

		//pobieramy dane o pointerach
		_points2.default.points = response[1];

		//pobieramy dane o kategoriach
		_categories2.default.category = response[2];

		//pobieranie danych o zdjęciu jeżeli istnieje
		if (response[3].length > 2) {
			_image2.default.obj = new Image();
			_image2.default.obj.src = response[3][0];
			_image2.default.x = parseInt(response[3][1]);
			_image2.default.y = parseInt(response[3][2]);
			_image2.default.width = parseInt(response[3][3]);
			_image2.default.height = parseInt(response[3][4]);
			_image2.default.alpha = parseInt(response[3][5]);

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
		_categories2.default.showList();
	},


	//pobranie mapy z bazy danych
	getMap: function getMap() {

		var th = this;

		$.ajax({
			url: '/api/map/' + th.map_hash,
			type: "GET",
			contentType: "application/json"
		}).done(function (data) {

			//po zapisaniu danych do bazy aktualizujemy id (w przypadku jeśli istnieje nadpisujemy je)
			var response = JSON.parse(data.data[0].map_json);

			//pobieramy i wczytujemy dane o canvasie do obiektu
			_canvas2.default.height_canvas = response[0][0];
			_canvas2.default.width_canvas = response[0][1];
			_points2.default.padding_x = response[0][2];
			_points2.default.padding_y = response[0][3];
			_points2.default.translate_modulo = response[0][4];
			_points2.default.size_pointer = response[0][5];
			_points2.default.main_kind = response[0][6];
			_canvas2.default.title_project = response[0][7];

			$('#pointer_box input[name="padding_x"]').val(response[0][2]);
			$('#pointer_box input[name="padding_y"]').val(response[0][3]);
			$('#pointer_box input[name="size_pointer"]').val(response[0][5]);
			$('input[name="title_project"]').val(response[0][7]);

			if (response[0][4]) {
				$('#pointer_box div[name="translate_modulo"]').removeClass('switch-off');
				$('#pointer_box div[name="translate_modulo"]').addClass('switch-on');
			}

			$('#pointer_box select[name="main_kind"]').html('');

			_points2.default.kinds.forEach(function (kind) {

				if (kind == response[0][6]) {
					$('#pointer_box select[name="main_kind"]').append('<option selected="selected" name="' + kind + '">' + kind + '</option>');
				} else {
					$('#pointer_box select[name="main_kind"]').append('<option name="' + kind + '">' + kind + '</option>');
				}
			});

			//pobieramy dane o pointerach
			_points2.default.points = response[1];

			//pobieramy dane o kategoriach
			_categories2.default.category = response[2];

			//pobieranie danych o zdjęciu jeżeli istnieje
			if (response[3].length > 2) {
				_image2.default.obj = new Image();
				_image2.default.obj.src = response[3][0];
				_image2.default.x = parseInt(response[3][1]);
				_image2.default.y = parseInt(response[3][2]);
				_image2.default.width = parseInt(response[3][3]);
				_image2.default.height = parseInt(response[3][4]);
				_image2.default.alpha = parseInt(response[3][5]);

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
		});
	},


	//tworzymy nową mapę danych
	createMap: function createMap() {
		//aktualizujemy jsona do wysłania ajaxem
		this.get_data();
		var th = this; //zmienna pomocnicza

		jQuery.ajax({
			url: "api/maps",
			data: { map_json: th.map_json },
			type: 'POST',
			success: function success(response) {
				th.map_hash = response.hash_map;
				th.getMaps();
			}
		});
	},


	//aktualizujemy mapę
	updateMap: function updateMap() {
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
			success: function success(response) {
				th.getMaps();
				alert(response.message);
			}
		});
	},


	//usuwamy mapę z bazy danych
	deleteMap: function deleteMap() {

		var th = this; //zmienna pomocnicza

		//sprawdzamy czy mapa do usunięcia posiada swoje id
		if (this.map_hash != null) {
			jQuery.ajax({
				url: "api/map/" + th.map_hash,
				type: 'DELETE',
				success: function success(response) {
					if (response.status == 'ok') {
						location.reload();
					} else {
						alert('błąd podczas usuwania');
					}
				}
			});
		} else {
			alert('brak identyfikatora projektu');
		}
	}
}; // ╔═╗╦═╗╦ ╦╔╦╗
// ║  ╠╦╝║ ║ ║║
// ╚═╝╩╚═╚═╝═╩╝

},{"./canvas":2,"./categories":3,"./crud":5,"./image":8,"./menuTop":9,"./points":12,"./store":13}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//funkcje rysujące pojedyńczy punkt
// ┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌─┐
// ├┤ ││ ┬│ │├┬┘├┤ └─┐
// └  ┴└─┘└─┘┴└─└─┘└─┘

exports.default = {

	//square
	figure_0: function figure_0(x, y, size) {
		_store2.default.canvas.ctx.fillRect(x, y, size, size);
	},


	//circle
	figure_1: function figure_1(x, y, size) {
		var size = size / 2;
		var centerX = x + size;
		var centerY = y + size;
		_store2.default.canvas.ctx.beginPath();
		_store2.default.canvas.ctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
		_store2.default.canvas.ctx.fill();
	},


	//hexa
	figure_2: function figure_2(x, y, size) {
		var a = size / 4;
		var a2 = size / 2;
		var h = size / 2 * Math.sqrt(3) / 2;

		_store2.default.canvas.ctx.beginPath();
		_store2.default.canvas.ctx.moveTo(x, y + a2);
		_store2.default.canvas.ctx.lineTo(x + a, y + a2 - h);
		_store2.default.canvas.ctx.lineTo(x + a + a2, y + a2 - h);
		_store2.default.canvas.ctx.lineTo(x + size, y + a2);
		_store2.default.canvas.ctx.lineTo(x + size - a, y + a2 + h);
		_store2.default.canvas.ctx.lineTo(x + a, y + a2 + h);
		_store2.default.canvas.ctx.lineTo(x, y + a2);
		_store2.default.canvas.ctx.fill();
	},


	//hexa2
	figure_3: function figure_3(x, y, size) {
		var a = size / 4;
		var a2 = size / 2;
		var h = size / 2 * Math.sqrt(3) / 2;

		_store2.default.canvas.ctx.beginPath();
		_store2.default.canvas.ctx.moveTo(x + a2, y);
		_store2.default.canvas.ctx.lineTo(x + a2 + h, y + a);
		_store2.default.canvas.ctx.lineTo(x + a2 + h, y + a2 + a);
		_store2.default.canvas.ctx.lineTo(x + a2, y + size);
		_store2.default.canvas.ctx.lineTo(x + a2 - h, y + a2 + a);
		_store2.default.canvas.ctx.lineTo(x + a2 - h, y + a);
		_store2.default.canvas.ctx.lineTo(x + a2, y);
		_store2.default.canvas.ctx.fill();
	}
};

},{"./canvas":2,"./store":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// ╔═╗╦  ╔═╗╔╗ ╔═╗╦  
// ║ ╦║  ║ ║╠╩╗╠═╣║  
// ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝

//funkcje globalne kontener na wszystko i nic ;)
exports.default = {
	toogle_panel: function toogle_panel(e) {
		e = e || window.e; //latka dla mozilli
		if ($(e.target).parent().css('right') == '0px') {
			$(e.target).parent().animate({ right: [-$(e.target).parent().width() - 20, "swing"] }, 1000, function () {});
		} else {
			$(e.target).parent().animate({ right: ["0px", "swing"] }, 1000, function () {});
		}
	}
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//główne zdjęcie od którego odrysowujemy mapy
// ╦╔╦╗╔═╗╔═╗╔═╗
// ║║║║╠═╣║ ╦║╣ 
// ╩╩ ╩╩ ╩╚═╝╚═╝

exports.default = {
	draw: function draw() {
		_store2.default.canvas.ctx.globalAlpha = _store2.default.map.image.alpha;
		_store2.default.canvas.ctx.drawImage(_store2.default.image.obj, _store2.default.map.image.x, _store2.default.map.image.y, _store2.default.map.image.width, _store2.default.map.image.height);

		$('#canvas_box #image_resize').css({ 'height': _store2.default.map.image.height, 'top': _store2.default.map.image.y + 'px', 'left': _store2.default.map.image.x + _store2.default.map.image.width + 'px' });
		_store2.default.canvas.ctx.globalAlpha = 1;
	},
	add: function add() {
		var _this = this;

		//jesli podany parametr nie jest pusty
		var srcImage = prompt("Podaj ścieżkę do zdjęcia: ");

		if (srcImage) {
			if (srcImage.length > 0) {

				_store2.default.image.obj = new Image();

				//wczytanie zdjęcia: 
				_store2.default.image.obj.onload = function () {
					_store2.default.map.image.width = _store2.default.image.obj.width;
					_store2.default.map.image.height = _store2.default.image.obj.height;
					_this.draw();
				};

				_store2.default.map.image.x = 0;
				_store2.default.map.image.y = 0;
				_store2.default.image.obj.src = srcImage;
				_store2.default.map.image.src = srcImage;
				//simage.obj.setAttribute('crossOrigin', 'anonymous');
			}
		}
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
};

},{"./canvas":2,"./store":13}],9:[function(require,module,exports){
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

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt menu_top
exports.default = {
	showMapsList: function showMapsList() {

		/*	if(response.data[i]._id == crud.map_hash){
  				add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
  			}
  			else{
  				add_html += '<option id="' +  + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
  			}
  		}
  		$('#toolbar_top select.select_maps').append( add_html );*/

		//dodajemu zdarzenie change map
		$('.select_maps').change(function () {
			if (confirm('Czy chcesz wczytać nową mapę ?')) {
				if ($(this).find('option:selected').attr('id') == 'new_map') {
					location.reload();
				} else {
					_crud2.default.select_map($(this).find('option:selected').attr('id'));
				}
			}
		});
	},
	selectMap: function selectMap(idMap) {
		//jeśli uruchomimy
		if (idMap == 'new_map') {
			_crud2.default.createMap();
		} else {
			_store2.default.mapHash = idMap;
			_crud2.default.getMap();
		}
	},


	updateCanvasInfo: function updateCanvasInfo() {
		_store2.default.canvas.scale = parseInt($('#canvas_info #size').val());
		_store2.default.map.canvas.width = parseInt($('#canvas_info #width').val());
		_store2.default.map.canvas.height = parseInt($('#canvas_info #height').val());

		$('#canvas_info #size').val(_store2.default.canvas.scale + '%');
		$('#canvas_info #width').val(_store2.default.map.canvas.width + 'px');
		$('#canvas_info #height').val(_store2.default.map.canvas.height + 'px');

		$('#canvas_box, #canvas_wrapper').css({ 'width': _store2.default.map.canvas.width + 'px', 'height': _store2.default.map.canvas.height + 'px' });
		$('#canvas_box #main_canvas').attr({ 'width': _store2.default.map.canvas.width + 'px', 'height': _store2.default.map.canvas.height + 'px' });

		_canvas2.default.draw();
	},

	showInfo: function showInfo() {
		$('#canvas_info #size').val(parseInt(_store2.default.canvas.scale) + '%');
		$('#canvas_info #width').val(parseInt(_store2.default.map.canvas.width) + 'px');
		$('#canvas_info #height').val(parseInt(_store2.default.map.canvas.height) + 'px');
	},
	incrementScale: function incrementScale() {
		_canvas2.default.reset();
		_store2.default.canvas.scale += 5;

		if (_store2.default.canvas.scale == 100) {
			$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
			if (_store2.default.menuTop.moveImage) $('#canvas_box #image_resize').fadeIn(0);
		} else {
			$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeOut(500);
			$('#canvas_box #image_resize').fadeOut(0);
		}

		var newWidth = _store2.default.map.canvas.width * (_store2.default.canvas.scale / 100);
		var newHeight = _store2.default.map.canvas.height * (_store2.default.canvas.scale / 100);
		$('#main_canvas').attr({ 'width': newWidth + 'px', 'height': newHeight + 'px' });
		$('#canvas_box, #canvas_wrapper').css({ 'width': newWidth + 'px', 'height': newHeight + 'px' });

		_store2.default.canvas.ctx.scale(_store2.default.canvas.scale / 100, _store2.default.canvas.scale / 100);
		_store2.default.canvas.ctx.translate(_store2.default.canvas.ctxX / (_store2.default.canvas.scale / 100), _store2.default.canvas.ctxY / (_store2.default.canvas.scale / 100));

		this.showInfo();
		_canvas2.default.draw();
	},
	decrementScale: function decrementScale() {
		if (_store2.default.canvas.scale > 100) {
			_canvas2.default.reset();
			_store2.default.canvas.scale -= 5;

			if (_canvas2.default.scale == 100) {
				$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
				if (_store2.default.menuTop.moveImage) $('#canvas_box #image_resize').fadeIn(0);
			} else {
				$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeOut(500);
				$('#canvas_box #image_resize').fadeOut(0);
			}

			var newWidth = _store2.default.map.canvas.width * (_store2.default.canvas.scale / 100);
			var newHeight = _store2.default.map.canvas.height * (_store2.default.canvas.scale / 100);
			$('#main_canvas').attr({ 'width': newWidth + 'px', 'height': newHeight + 'px' });
			$('#canvas_box, #canvas_wrapper').css({ 'width': newWidth + 'px', 'height': newHeight + 'px' });

			_store2.default.canvas.ctx.scale(_store2.default.canvas.scale / 100, _store2.default.canvas.scale / 100);
			_store2.default.canvas.ctx.translate(_store2.default.canvas.ctxX / (_store2.default.canvas.scale / 100), _store2.default.canvas.ctxY / (_canvas2.default.scale / 100));

			this.showInfo();
			_canvas2.default.draw();
		}
	},
	switchMode: function switchMode(key) {
		console.log('key: ' + key);
		//if(!store.menuTop.disableSelect){
		if (_store2.default.menuTop.modeKey) {

			switch (key) {

				//poruszanie zdjęciem 
				case 'moveImage':
				case 73:
				case 105:

					if (_store2.default.image.obj) {
						if (_store2.default.menuTop.moveImage) {

							_store2.default.menuTop.moveImage = false;
							$('#menu_top div#move_image').css('background', '#aaa');
							$('#canvas_wrapper #image_resize').hide();
						} else {

							_store2.default.menuTop.moveImage = true;
							_store2.default.menuTop.autoDraw = false;
							_store2.default.menuTop.moveCanvas = false;
							$('#menu_top div#move_image').css('background', '#34a81c');
							$('#menu_top div#auto_draw').css('background', '#aaa');
							$('#menu_top div#move_canvas').css('background', '#aaa');
							$('#canvas_wrapper #image_resize').show();
						}
					}
					break;

				//rysowanie bez wcisnięcia przycisku
				case 'autoDraw':
				case 68:
				case 100:

					_store2.default.points.lastRow = null;
					_store2.default.points.lastCol = null;

					if (_store2.default.menuTop.autoDraw) {

						_store2.default.menuTop.autoDraw = false;
						$('#menu_top div#auto_draw').css('background', '#aaa');
					} else {

						_store2.default.menuTop.autoDraw = true;
						_store2.default.menuTop.moveCanvas = false;
						_store2.default.menuTop.moveImage = false;
						$('#menu_top div#move_canvas').css('background', '#aaa');
						$('#menu_top div#move_image').css('background', '#aaa');
						$('#menu_top div#auto_draw').css('background', '#34a81c');
					}
					break;

				//poruszanie całym canvasem
				case 'moveCanvas':
				case 67:
				case 99:

					console.log('moveCanvas');

					if (_store2.default.menuTop.moveCanvas) {

						_store2.default.menuTop.moveCanvas = false;
						$('#menu_top div#move_canvas').css('background', '#aaa');
					} else {

						_store2.default.menuTop.moveCanvas = true;
						_store2.default.menuTop.moveImage = false;
						_store2.default.menuTop.autoDraw = false;
						$('#menu_top div#move_canvas').css('background', '#34a81c');
						$('#menu_top div#move_image').css('background', '#aaa');
						$('#menu_top div#auto_draw').css('background', '#aaa');
					}
					break;

				case 'rubber':
				case 71:
				case 103:

					if (_store2.default.menuTop.rubber) {

						_store2.default.menuTop.rubber = false;
						$('#menu_top div#rubber').css('background', '#aaa');
					} else {

						_store2.default.menuTop.rubber = true;
						_store2.default.menuTop.moveCanvas = false;
						_store2.default.menuTop.moveImage = false;

						$('#menu_top div#rubber').css('background', '#34a81c');
						$('#menu_top div#move_canvas').css('background', '#aaa');
						$('#menu_top div#move_image').css('background', '#aaa');
					}

					break;
			}
		}
		//}
	}
}; // ╔╦╗╔═╗╔╗╔╦ ╦  ╔╦╗╔═╗╔═╗
// ║║║║╣ ║║║║ ║   ║ ║ ║╠═╝
// ╩ ╩╚═╝╝╚╝╚═╝   ╩ ╚═╝╩

},{"./canvas":2,"./crud":5,"./image":8,"./points":12,"./store":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pobieranie danych z selekta inputa switchy (aktualizacja obiektów) button inkrement i dekrement
exports.default = {

	points: _points2.default,
	menuTop: _menuTop2.default,
	canvas: _canvas2.default,

	buttonIncrement: function buttonIncrement(obj) {
		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="' + input_to_update + '"]').val()) + 1;

		$('input[name="' + input_to_update + '"]').val(value);
		this.update_from_input($('input[name="' + input_to_update + '"]'));
	},
	buttonDecrement: function buttonDecrement(obj) {
		var input_to_update = $(obj).attr('nameinput');
		var value = parseInt($('input[name="' + input_to_update + '"]').val()) - 1;

		$('input[name="' + input_to_update + '"]').val(value);
		this.update_from_input($('input[name="' + input_to_update + '"]'));
	},


	update_from_input: function update_from_input(obj) {
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

		console.log('update_from_input');

		this[name_class][name_method] = parseInt($(obj).val());
		_canvas2.default.draw();
	},

	update_from_input_text: function update_from_input_text(obj) {
		var name_class = $(obj).attr('obj');
		var name_method = $(obj).attr('name');

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

		if ($(obj).attr("value") == 'false') {
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
}; // ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗
// ║║║║ ║ ║║║╣ ║  ╚═╗
// ╩ ╩╚═╝═╩╝╚═╝╩═╝╚═╝

},{"./canvas":2,"./menuTop":9,"./points":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//obiekt myszki (do ogarniecia)
// ╔╦╗╔═╗╦ ╦╔═╗╔═╗
// ║║║║ ║║ ║╚═╗║╣ 
// ╩ ╩╚═╝╚═╝╚═╝╚═╝

exports.default = {

	//funckja wykrywająca w co kliknięto pobierająca padding kliknięcia oraz zapisująca kliknięcie
	setMouseDown: function setMouseDown(e) {

		e = e || window.e;

		var obj = e.target;

		//jeśli element na który kliknięto ma atrybut nameclick przypisujemy go do obiektu myszki
		if (typeof $(e.target).attr('nameclick') != "undefined") {
			_store2.default.mouse.clickObj = $(e.target).attr('nameclick');

			var position = $(obj).offset();
			_store2.default.mouse.offsetX = position.left;
			_store2.default.mouse.offsetY = position.top;
			_store2.default.mouse.paddingX = _store2.default.mouse.x - position.left;
			_store2.default.mouse.paddingY = _store2.default.mouse.y - position.top;
			_store2.default.mouse.mouseDown = true;

			_store2.default.mouse.tmpX = _store2.default.map.image.x;
			_store2.default.mouse.tmpY = _store2.default.map.image.y;
		}
	},
	setPosition: function setPosition(e) {
		_store2.default.mouse.x = e.pageX, _store2.default.mouse.y = e.pageY;
	},


	//funkcja wykonywana podczas wciśniecia przyciksku myszki (w zależności od klikniętego elementu wykonujemy różne rzeczy)
	mouseMove: function mouseMove() {

		switch (_store2.default.mouse.clickObj) {

			case 'right_resize':
				//rozszerzanie canvasa w prawo
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				var newWidth = _store2.default.mouse.x - _store2.default.mouse.paddingX - position.left;
				if (newWidth < screen.width - 100) {
					_canvas2.default.resizeWidth(newWidth);
				}
				_canvas2.default.draw();
				break;

			case 'bottom_resize':
				//zmieniamy wysokość canvasa
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				_canvas2.default.resizeHeight(_store2.default.mouse.y - _store2.default.mouse.paddingY - position.top);
				_canvas2.default.draw();
				break;

			case 'image_resize':

				if (_store2.default.image.obj !== null) {

					var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
					var xActual = _store2.default.mouse.x - position.left; //aktualna pozycja myszki
					var substract = _store2.default.map.image.x + _store2.default.map.image.width - xActual + _store2.default.mouse.paddingX;
					var facor = _store2.default.map.image.width / _store2.default.map.image.height;

					if (_store2.default.map.image.width - substract > 100) {
						_store2.default.map.image.width -= substract;
						_store2.default.map.image.height -= substract / facor;
						_canvas2.default.draw();
					}
				}
				break;

			case 'canvas':
				console.log('moveCanvas', _store2.default.menuTop.moveImage, _store2.default.image.obj, _store2.default.menuTop.moveCanvas);
				//przesuwanie zdjęciem (np. mapa / wzorzec)


				if (_store2.default.menuTop.moveImage && _store2.default.image.obj !== null) {

					var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();

					var xActual = _store2.default.mouse.x - position.left; //aktualna pozycja myszki
					var yActual = _store2.default.mouse.y - position.top; // aktualna pozycja myszki

					var xTranslate = xActual - _store2.default.mouse.paddingX + _store2.default.mouse.tmpX; //przesunięcie obrazka względem aktualnej pozycji myszki
					var yTranslate = yActual - _store2.default.mouse.paddingY + _store2.default.mouse.tmpY; //przesuniecie obrazka względem aktualnej pozycji myszki

					var xNew = xTranslate;
					var yNew = yTranslate;

					_store2.default.map.image.x = xNew;
					_store2.default.map.image.y = yNew;
					_canvas2.default.draw();
				}

				//rysowanie
				else if (!_store2.default.menuTop.moveImage && !_store2.default.menuTop.moveCanvas) {
						var rowClick = parseInt((_store2.default.mouse.y - _store2.default.canvas.offsetTop + _store2.default.canvas.ctxY * -1) / ((_store2.default.map.points.size + _store2.default.map.points.paddingY) * (_store2.default.canvas.scale / 100)));
						var colClick = parseInt((_store2.default.mouse.x - _store2.default.canvas.offsetLeft + _store2.default.canvas.ctxX * -1) / ((_store2.default.map.points.size + _store2.default.map.points.paddingX) * (_store2.default.canvas.scale / 100)));

						//	console.log('klik',rowClick,colClick,store.canvas.ctxX,store.canvas.ctxY);

						if (_store2.default.map.points.translate && rowClick % 2 == 0) {
							//colClick = parseInt( (store.mouse.x - store.canvas.offsetLeft - store.map.points.size/2) / ((store.map.points.size + points.padding_x)*(canvas.scale / 100))  );
							colClick = parseInt((_store2.default.mouse.x - _store2.default.canvas.offsetLeft + _store2.default.canvas.ctxX * -1 - _store2.default.map.points.size / 2) / ((_store2.default.map.points.size + _store2.default.map.points.paddingX) * (_store2.default.canvas.scale / 100)));
						}

						if (rowClick >= 0 && rowClick < _store2.default.points.activeRow && colClick >= 0 && colClick < _store2.default.points.activeCol) {
							_points2.default.updatePoint(rowClick, colClick, _points2.default.lastRow, _points2.default.lastCol);
							_points2.default.lastCol = colClick;
							_points2.default.lastRow = rowClick;
							_canvas2.default.draw();
						} else {
							_points2.default.lastRow = null;
							_points2.default.lastCol = null;
						}
					}

					//przesuwanie całym canvasem
					else if (_store2.default.menuTop.moveCanvas) {

							_canvas2.default.reset();
							_canvas2.default.clear();

							_store2.default.canvas.ctxNewX = _store2.default.mouse.x - _store2.default.mouse.offsetX - _store2.default.mouse.paddingX + _store2.default.canvas.ctxX;
							_store2.default.canvas.ctxNewY = _store2.default.mouse.y - _store2.default.mouse.offsetY - _store2.default.mouse.paddingY + _store2.default.canvas.ctxY;

							if (_store2.default.canvas.ctxNewX > 0) _store2.default.canvas.ctxNewX = 0;
							if (_store2.default.canvas.ctxNewY > 0) _store2.default.canvas.ctxNewY = 0;

							console.log('przesuwamy całym obszarem', _store2.default.canvas.ctxNewX, _store2.default.canvas.scale, _store2.default.canvas.ctxNewY);
							_store2.default.canvas.ctx.translate(_store2.default.canvas.ctxNewX / (_store2.default.canvas.scale / 100), _store2.default.canvas.ctxNewY / (_store2.default.canvas.scale / 100));
							_canvas2.default.draw();
						}

				break;
		}
	}
};

},{"./canvas":2,"./image":8,"./menuTop":9,"./mouse":11,"./points":12,"./store":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _points = require('./points');

var _points2 = _interopRequireDefault(_points);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _menuTop = require('./menuTop');

var _menuTop2 = _interopRequireDefault(_menuTop);

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

	//rysowanie wszystkich punktów
	draw: function draw() {
		var widthPoint = _store2.default.map.points.size + _store2.default.map.points.paddingX;
		var heightPoint = _store2.default.map.points.size + _store2.default.map.points.paddingY;
		var noneColor = "rgba(0,0,0,0)";

		if (_store2.default.points.showAll) noneColor = "rgba(128,128,128,1)";

		for (var row = 0; row < _store2.default.points.activeRow; row++) {
			for (var col = 0; col < _store2.default.points.activeCol; col++) {

				if (_store2.default.map.points.db[row][col] == 0) {
					_store2.default.canvas.ctx.fillStyle = noneColor;
					_store2.default.canvas.ctx.globalAlpha = 0.5;
				} else {
					if (_store2.default.map.points.db[row][col] != _store2.default.menuTop.category && _store2.default.menuTop.category != 0) {
						_store2.default.canvas.ctx.globalAlpha = 0.2;
					} else {
						_store2.default.canvas.ctx.globalAlpha = 1;
					}
					try {
						_store2.default.canvas.ctx.fillStyle = _store2.default.map.categories[_store2.default.map.points.db[row][col]].color;
					} catch (e) {
						console.log('ERROR 39 LINE ! ', _store2.default.map.points.db[row][col], row, col, _store2.default.points.activeRow, _store2.default.points.activeCol);
					}
				}

				if (row % 2 == 0 && _store2.default.map.points.translate) {

					_figures2.default['figure_' + _store2.default.map.points.type](col * widthPoint + widthPoint / 2, row * heightPoint, _store2.default.map.points.size);
				} else {
					_figures2.default['figure_' + _store2.default.map.points.type](col * widthPoint, row * heightPoint, _store2.default.map.points.size);
				}
			}
		}
	},


	//tworzymy tablice ponterów (jeśli jakiś ponter istnieje zostawiamy go, w przypadku gdy pointera nie ma tworzymy go na nowo)
	createDb: function createDb() {
		_store2.default.points.activeRow = parseInt(_store2.default.map.canvas.height / (_store2.default.map.points.size + _store2.default.map.points.paddingY)) + 1;
		_store2.default.points.activeCol = parseInt(_store2.default.map.canvas.width / (_store2.default.map.points.size + _store2.default.map.points.paddingX)) + 1;

		if (_store2.default.map.points.db.length <= _store2.default.points.activeRow || _store2.default.map.points.db[0].length <= _store2.default.points.activeCol) {
			for (var row = 0; row < _store2.default.points.activeRow; row++) {
				for (var col = 0; col < _store2.default.points.activeCol; col++) {
					if (typeof _store2.default.map.points.db[row] == 'undefined') {
						_store2.default.map.points.db[row] = new Array();
					}
					if (typeof _store2.default.map.points.db[row][col] == 'undefined') {
						_store2.default.map.points.db[row][col] = 0;
					}
				}
			}
		}
	},
	updatePoint: function updatePoint(y, x, yLast, xLast) {

		var cat = _store2.default.menuTop.rubber ? 0 : _store2.default.menuTop.category;

		_store2.default.map.points.db[y][x] = cat;

		//wyznaczenie równania prostej
		if ((yLast != y || xLast != x) && yLast != null && xLast != null) {
			var a = (yLast - y) / (xLast - x);
			var b = y - a * x;

			if (xLast > x) {
				var colFrom = x;
				var colTo = xLast;
			} else {
				var colTo = x;
				var colFrom = xLast;
			}

			if (yLast > y) {
				var rowFrom = y;
				var rowTo = yLast;
			} else {
				var rowTo = y;
				var rowFrom = yLast;
			}

			var row = null;
			for (var col = colFrom; col <= colTo; col++) {
				row = parseInt(a * col + b);
				if (!$.isNumeric(row)) row = y;
				_store2.default.map.points.db[row][col] = cat;
			}

			var col = null;
			for (var row = rowFrom; row <= rowTo; row++) {
				col = parseInt((row - b) / a);
				if (!$.isNumeric(col)) col = x;
				_store2.default.map.points.db[row][col] = cat;
			}
		} else {
			_store2.default.map.points.db[y][x] = cat;
		}
	},
	showInfo: function showInfo() {
		$('input.paddingX').val(_store2.default.map.points.paddingX);
		$('input.paddingY').val(_store2.default.map.points.paddingY);
		$('input.sizePointer').val(_store2.default.map.points.size);

		$('.switch.showAllPoint').removeClass('switch-on').removeClass('switch-off');
		if (_store2.default.points.showAll) {
			$('.switch.showAllPoint').addClass('switch-on');
		} else {
			$('.switch.showAllPoint').addClass('switch-off');
		}

		$('.switch.translateModulo').removeClass('switch-on').removeClass('switch-off');
		if (_store2.default.map.points.translate) {
			$('.switch.translateModulo').addClass('switch-on');
		} else {
			$('.switch.translateModulo').addClass('switch-off');
		}

		var addHtml = '';
		for (var i = 0, iMax = _store2.default.points.types.length; i < iMax; i++) {
			addHtml += '<option>' + _store2.default.points.types[i].name + '</option>';
		}

		$('select[name="main_kind"]').html(addHtml);

		//console.log( 'points', store.map.points );


		$('select[name="main_kind"] option').eq(_store2.default.map.points.type).attr('selected', 'selected');

		this.createDb();
		_canvas2.default.draw();
	}
};

},{"./canvas":2,"./categories":3,"./figures":6,"./menuTop":9,"./points":12,"./store":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// ┌─┐┌┬┐┌─┐┬─┐┌─┐
// └─┐ │ │ │├┬┘├┤ 
// └─┘ ┴ └─┘┴└─└─┘

exports.default = {

	map: {

		//obiekt przechowujący dane dotyczące zdjęcia	
		image: {
			src: null,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			alpha: 1
		},

		//obiekt przechowujący podstawowe dane dotyczące mapy
		title: '',

		canvas: {
			width: 700,
			height: 400
		},

		points: {
			paddingX: 1,
			paddingY: 1,
			translate: false,
			size: 10,
			type: 2,

			//dwu wymiarowa tablica zawierająca wszystkie dane dotyczące punktów [row][col] 
			db: []
		},

		//tablica zawierająca obiekty kategorii (pierwszy obiekt jest kategorią domyślną / pustą )
		categories: [{
			name: 'empty',
			color: '#808080'
		}]

	},

	//hash mapy na której pracujemy
	mapHash: null,

	mapsList: [],

	//objekt przechowujący dane canvasa
	canvas: {
		obj: null,
		ctx: null,
		ctxX: 0,
		ctxY: 0,
		ctxNewX: 0,
		ctxNewY: 0,

		offsetLeft: 0,
		offsetTop: 0,
		scale: 100
	},

	image: {
		obj: null
	},

	categories: {
		colorDefault: '#ff0000'
	},

	points: {
		activeRow: 0,
		activeCol: 0,
		lastRow: 0,
		lastCol: 0,
		showAll: true,

		//główne typy punktów
		types: [{
			id: 'square',
			name: 'kwadrat'
		}, {
			id: 'circle',
			name: 'koło'
		}, {
			id: 'hexagon',
			name: 'plaster miodu I'
		}, {
			id: 'hexagon2',
			name: 'plaster miodu II'
		}]

	},

	//zmienne pomocnicze obiektu menu Top
	menuTop: {
		moveImage: false,
		moveCanvas: false,
		autoDraw: false,
		rubber: false,
		modeKey: true,
		disableSelect: false,
		category: 0
	},

	mouse: {
		mouseDown: false,
		clickObj: null,

		tmpX: null, //zmienne tymczasowe umożliwiające przesuwanie tła
		tmpY: null, //zmienne tymczasowe umożliwiające przesuwanie tła

		x: null, //pozycja x myszki
		y: null, //pozycja y myszki
		paddingX: null, //pozycja x myszki od górnej krawędzi
		paddingY: null, //pozycja y myszki od górnej krawędzi
		offsetX: null, //offset x obiektu klikniętego
		offsetY: null },

	colpick: {
		clickId: null
	}

};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMtZGV2L2pzL21hcC9tYXAuanMiLCJwdWJsaWMtZGV2L2pzL21hcC9tb2QvY2FudmFzLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL2NhdGVnb3JpZXMuanMiLCJwdWJsaWMtZGV2L2pzL21hcC9tb2QvY29scGljay5qcyIsInB1YmxpYy1kZXYvanMvbWFwL21vZC9jcnVkLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL2ZpZ3VyZXMuanMiLCJwdWJsaWMtZGV2L2pzL21hcC9tb2QvZ2xvYmFsLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL2ltYWdlLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL21lbnVUb3AuanMiLCJwdWJsaWMtZGV2L2pzL21hcC9tb2QvbW9kZWxzLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL21vdXNlLmpzIiwicHVibGljLWRldi9qcy9tYXAvbW9kL3BvaW50cy5qcyIsInB1YmxpYy1kZXYvanMvbWFwL21vZC9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFHQTtBQUNBLE9BQU8sSUFBUCxHQUFjO0FBQ1oseUJBRFk7QUFFWixpQ0FGWTtBQUdaLDJCQUhZO0FBSVoscUJBSlk7QUFLWiwyQkFMWTtBQU1aLHlCQU5ZO0FBT1osdUJBUFk7QUFRWiwyQkFSWTtBQVNaLHlCQVRZO0FBVVosdUJBVlk7QUFXWix5QkFYWTtBQVlaO0FBWlksQ0FBZDs7QUFlQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQU07O0FBRXZCLGdCQUFLLE9BQUw7QUFDQSxrQkFBTyxJQUFQO0FBQ0EsbUJBQVEsUUFBUjtBQUNBLGtCQUFPLFFBQVA7QUFDQSxr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VVU7QUFDakIsV0FBVSxJQVhILEVBV1M7QUFDaEIsV0FBVSxJQVpILEVBMUdNOztBQXlIZCxVQUFVO0FBQ1QsV0FBVTtBQUREOztBQXpISSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBjYW52YXMgZnJvbSAnLi9tb2QvY2FudmFzJztcbmltcG9ydCBjb2xwaWNrIGZyb20gJy4vbW9kL2NvbHBpY2snO1xuXG5pbXBvcnQgY2F0ZWdvcmllcyBmcm9tICcuL21vZC9jYXRlZ29yaWVzJztcbmltcG9ydCBjcnVkIGZyb20gJy4vbW9kL2NydWQnO1xuaW1wb3J0IGZpZ3VyZXMgZnJvbSAnLi9tb2QvZmlndXJlcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vbW9kL2dsb2JhbCc7XG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9tb2QvaW1hZ2UnO1xuaW1wb3J0IG1lbnVUb3AgZnJvbSAnLi9tb2QvbWVudVRvcCc7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vbW9kL21vZGVscyc7XG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb2QvbW91c2UnO1xuaW1wb3J0IHBvaW50cyBmcm9tICcuL21vZC9wb2ludHMnO1xuIFxuaW1wb3J0IHN0b3JlIGZyb20gJy4vbW9kL3N0b3JlJ1xuXG5cbi8vc3BlY2phbG55IG9iaWVrdCBkbyBiYWRhbmlhIHN0YW51IHLDs8W8bnljaCBvYmlla3TDs3dcbndpbmRvdy5zcGVjID0ge1xuICBjYW52YXM6Y2FudmFzLFxuICBjYXRlZ29yaWVzOmNhdGVnb3JpZXMsIFxuICBjb2xwaWNrOmNvbHBpY2ssIFxuICBjcnVkOmNydWQsXG4gIGZpZ3VyZXM6ZmlndXJlcywgXG4gIGdsb2JhbDpnbG9iYWwsIFxuICBpbWFnZTppbWFnZSxcbiAgbWVudVRvcDptZW51VG9wLCBcbiAgbW9kZWxzOm1vZGVscywgXG4gIG1vdXNlOm1vdXNlLFxuICBwb2ludHM6cG9pbnRzLFxuICBzdG9yZTpzdG9yZSxcbn07ICBcdFxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdFxuXHRjcnVkLmdldE1hcHMoKTtcblx0Y2FudmFzLmluaXQoKTtcblx0bWVudVRvcC5zaG93SW5mbygpOyBcblx0cG9pbnRzLnNob3dJbmZvKCk7XG5cdGNhbnZhcy5kcmF3KCk7IFxuXG5cdC8vemFibG9rb3dhbmllIG1vxbxsaXdvxZtjaSB6YXpuYWN6YW5pYSBidXR0b27Ds3cgcG9kY3phcyBlZHljamkgcG9sYVxuXHQkKGRvY3VtZW50KS5vbihcImZvY3VzaW5cIixcImlucHV0XCIsKCkgPT4geyBzdG9yZS5tZW51VG9wLmRpc2FibGVTZWxlY3QgPSB0cnVlOyB9KTtcblx0JChkb2N1bWVudCkub24oXCJmb2N1c291dFwiLFwiaW5wdXRcIiwoKSA9PiB7IHN0b3JlLm1lbnVUb3AuZGlzYWJsZVNlbGVjdCA9IGZhbHNlOyB9KTtcblxuXHQvL2plxZtsaSBuaWUgbWFteSB6ZGVmaW5pb3dhbmVnYSBoYXNoYSB0d29yenlteSBub3fEhSBtYXDEmSB3IHByemVjaXdueW0gd3lwYWRrdSBha3R1YWxpenVqZW15IGp1xbwgaXN0bmllasSFY8SFXG5cdCQoJyN0b29sYmFyX3RvcCBidXR0b24uc2F2ZScpLmNsaWNrKCgpID0+IHsgXG5cdFx0aWYodHlwZW9mIGNydWQubWFwSGFzaCA9PSAnc3RyaW5nJyl7IGNydWQudXBkYXRlTWFwKCk7IH1cblx0XHRlbHNleyBjcnVkLmNyZWF0ZU1hcCgpOyB9XG5cdH0pO1xuXG5cdCQoJyN0b29sYmFyX3RvcCBidXR0b24uZGVsZXRlJykuY2xpY2soKCkgPT4geyBcblx0XHRpZihjb25maXJtKCdDenkgY2hjZXN6IHVzdW7EhcSHIG1hcMSZID8nKSl7XG5cdFx0XHRpZih0eXBlb2Ygc3RvcmUubWFwSGFzaCAhPSBudWxsKXsgY3J1ZC5kZWxldGVNYXAoKTsgfVxuXHRcdH1cblx0fSk7XG5cblx0Ly9vZHpuYWN6ZW5pZSBzZWxlY3RhIHByenkgem1pYW5pZVxuXHQkKCcjY2hhbmdlX2NhdGVnb3J5JykuY2hhbmdlKCgpID0+IHsgJCgnI2NoYW5nZV9jYXRlZ29yeScpLmJsdXIoKTsgfSk7XG5cblx0Ly9yZWplc3RyYWNqYSB6ZGFyemVuaWEgdyBtb21lbmNpZSBwdXNjemVuaWEgcHJ6eWNpc2t1IG15c3praVxuXHQkKGRvY3VtZW50KS5tb3VzZXVwKCgpID0+IHsgc3RvcmUubW91c2UubW91c2VEb3duID0gZmFsc2U7IH0pO1xuXG5cdC8vcmVqZXN0cmFjamEgemRhcnplbmlhIHcgbW9tZW5jaWUgd2NpxZtuacSZY2lhIHByenljaXNrdSBteXN6a2lcblx0JChkb2N1bWVudCkubW91c2Vkb3duKChlKSA9PiB7XG5cdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50OyBcblx0XHRtb3VzZS5zZXRNb3VzZURvd24oZSk7XG5cdH0pO1xuXG5cdC8vd3l3b8WCYW5pZSBmdW5rY2ppIHBvZGN6YXMgcG9ydXN6YW5pYSBteXN6a8SFXG5cdCQoZG9jdW1lbnQpLm1vdXNlbW92ZSgoZSkgPT4ge1xuXHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDsgXG5cdFx0bW91c2Uuc2V0UG9zaXRpb24oZSk7IC8vemFyZWplc3Ryb3dhbmllIHBvenljamkgbXlzemtpXG5cdFx0Ly9qZXNsaSBwcnp5Y2lzayBqZXN0IHdjacWbbmnEmXR5IHd5a29udWplbXkgZG9kYXRrb3dlIHpkYXJ6ZW5pYSAocHJ6eSBydXN6YW5pdSBteXN6a8SFKVxuXHRcdGlmKHN0b3JlLm1vdXNlLm1vdXNlRG93bil7IG1vdXNlLm1vdXNlTW92ZShlKTsgfVxuXHRcdFxuXHRcdGlmKHN0b3JlLm1lbnVUb3AuYXV0b0RyYXcpeyBcblx0XHRcdHN0b3JlLm1vdXNlLmNsaWNrT2JqID0gXCJjYW52YXNcIjtcblx0XHRcdG1vdXNlLm1vdXNlTW92ZShlKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJyNtYWluX2NhbnZhcycpLm1vdXNlZG93biggKGUpID0+IHtcblx0XHRlID0gZSB8fCB3aW5kb3cuZXZlbnQ7IFxuXHRcdG1vdXNlLnNldE1vdXNlRG93bihlKTsvL3phcmVqZXN0cm93YW5pZSBvYmlla3R1dyAga3TDs3J5IGtsaWthbXlcblx0XHRtb3VzZS5zZXRQb3NpdGlvbihlKTsgLy96YXJlamVzdHJvd2FuaWUgcG96eWNqaSBteXN6a2lcblx0XHQvL2plc2xpIHByenljaXNrIGplc3Qgd2NpxZtuacSZdHkgd3lrb251amVteSBkb2RhdGtvd2UgemRhcnplbmlhIChwcnp5IHJ1c3phbml1IG15c3prxIUpXG5cdFx0bW91c2UubW91c2VNb3ZlKGUpO1xuXHR9KTtcblxuXHQkKGRvY3VtZW50KS5tb3VzZXVwKCAoKSA9PiB7XG5cdFx0cG9pbnRzLmxhc3RDb2x1bW4gPSBudWxsO1x0Ly9rb2x1bW5hIHBvaW50ZXJhIGt0w7NyeSB6b3N0YcWCIG9zdGF0bmlvIHptaWVuaW9ueVxuXHRcdHBvaW50cy5sYXN0Um93ID0gbnVsbDtcblx0XHRzdG9yZS5jYW52YXMuY3R4WCA9IHN0b3JlLmNhbnZhcy5jdHhOZXdYO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHhZID0gc3RvcmUuY2FudmFzLmN0eE5ld1k7XG5cdH0pO1xuXG5cdCQoJyNtb3ZlX2ltYWdlJykuY2xpY2soICgpID0+IHsgbWVudVRvcC5zd2l0Y2hNb2RlKCdtb3ZlSW1hZ2UnKTsgfSk7XG5cdCQoJyNtb3ZlX2NhbnZhcycpLmNsaWNrKCAoKSA9PiB7IG1lbnVUb3Auc3dpdGNoTW9kZSgnbW92ZUNhbnZhcycpOyB9KTtcblx0JCgnI2F1dG9fZHJhdycpLmNsaWNrKCAoKSA9PiB7IG1lbnVUb3Auc3dpdGNoTW9kZSgnYXV0b0RyYXcnKTsgfSk7XG5cdCQoJyNydWJiZXInKS5jbGljayggKCkgPT4geyBtZW51VG9wLnN3aXRjaE1vZGUoJ3J1YmJlcicpOyB9KTtcblxuXHQvLyBidXR0b24gcGFkZGluZ1hcblx0JCgnYnV0dG9uLmluY3JlbWVudC5wYWRkaW5nWCcpLmNsaWNrKCAoKSA9PiB7IHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1grKzsgcG9pbnRzLnNob3dJbmZvKCk7IH0pO1xuXHQkKCdidXR0b24uZGVjcmVtZW50LnBhZGRpbmdYJykuY2xpY2soICgpID0+IHsgc3RvcmUubWFwLnBvaW50cy5wYWRkaW5nWC0tOyBwb2ludHMuc2hvd0luZm8oKTsgfSk7XG5cdCQoJ2lucHV0LnBhZGRpbmdYJykua2V5dXAoIChlKSA9PiB7IFxuXHRcdHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1ggPSBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKSkpID8gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpKSA6IDAgO1xuXHRcdHBvaW50cy5zaG93SW5mbygpO1xuXHR9KTsgXG5cblx0Ly8gYnV0dG9uIHBhZGRpbmdZXG5cdCQoJ2J1dHRvbi5pbmNyZW1lbnQucGFkZGluZ1knKS5jbGljayggKCkgPT4geyBzdG9yZS5tYXAucG9pbnRzLnBhZGRpbmdZKys7IHBvaW50cy5zaG93SW5mbygpOyB9KTtcblx0JCgnYnV0dG9uLmRlY3JlbWVudC5wYWRkaW5nWScpLmNsaWNrKCAoKSA9PiB7IHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1ktLTsgcG9pbnRzLnNob3dJbmZvKCk7IH0pO1xuXHQkKCdpbnB1dC5wYWRkaW5nWScpLmtleXVwKCAoZSkgPT4geyBcblx0XHRzdG9yZS5tYXAucG9pbnRzLnBhZGRpbmdZID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZUludCgkKGUuY3VycmVudFRhcmdldCkudmFsKCkpKSA/IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKSkgOiAwIDtcblx0XHRwb2ludHMuc2hvd0luZm8oKTtcblx0fSk7XG5cblx0Ly9idXR0b24gc2l6ZVBvaW50ZXJcblx0JCgnYnV0dG9uLmluY3JlbWVudC5zaXplUG9pbnRlcicpLmNsaWNrKCAoKSA9PiB7IHN0b3JlLm1hcC5wb2ludHMuc2l6ZSsrOyBwb2ludHMuc2hvd0luZm8oKTsgfSk7XG5cdCQoJ2J1dHRvbi5kZWNyZW1lbnQuc2l6ZVBvaW50ZXInKS5jbGljayggKCkgPT4geyBzdG9yZS5tYXAucG9pbnRzLnNpemUtLTsgcG9pbnRzLnNob3dJbmZvKCk7IH0pO1xuXHQkKCdpbnB1dC5zaXplUG9pbnRlcicpLmtleXVwKCAoZSkgPT4geyBcblx0XHRzdG9yZS5tYXAucG9pbnRzLnNpemUgPSBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKSkpID8gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpKSA6IDAgO1xuXHRcdHBvaW50cy5zaG93SW5mbygpO1xuXHR9KTtcblxuXHQkKCcuc3dpdGNoLnNob3dBbGxQb2ludCcpLmNsaWNrKCAoZSkgPT4geyBcblx0XHRpZiggJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdzd2l0Y2gtb2ZmJykgKXsgc3RvcmUucG9pbnRzLnNob3dBbGwgPSB0cnVlOyB9XG5cdFx0ZWxzZXsgc3RvcmUucG9pbnRzLnNob3dBbGwgPSBmYWxzZTsgfVxuXHRcdHBvaW50cy5zaG93SW5mbygpO1xuXHR9KTtcblxuXHQkKCcuc3dpdGNoLnRyYW5zbGF0ZU1vZHVsbycpLmNsaWNrKCAoZSkgPT4geyBcblx0XHRpZiggJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdzd2l0Y2gtb2ZmJykgKXsgc3RvcmUubWFwLnBvaW50cy50cmFuc2xhdGUgPSB0cnVlOyB9XG5cdFx0ZWxzZXsgc3RvcmUubWFwLnBvaW50cy50cmFuc2xhdGUgPSBmYWxzZTsgfVxuXHRcdHBvaW50cy5zaG93SW5mbygpO1xuXHR9KTtcblxuXHQkKCdzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmNoYW5nZSggKGUpID0+IHtcblx0XHRzdG9yZS5tYXAucG9pbnRzLnR5cGUgPSAkKGUuY3VycmVudFRhcmdldClbMF0uc2VsZWN0ZWRJbmRleDtcblx0XHRwb2ludHMuc2hvd0luZm8oKTtcblx0fSk7XG5cblx0JCgnI2NoYW5nZV9jYXRlZ29yeScpLmNoYW5nZSggKGUpID0+IHtcblx0XHRzdG9yZS5tZW51VG9wLmNhdGVnb3J5ID0gJChlLmN1cnJlbnRUYXJnZXQpWzBdLnNlbGVjdGVkSW5kZXgrMTtcblx0fSk7XG5cblx0Ly9kb2RhbmllIG5vd2VqIGthdGVnb3JpaVxuXHQkKCcjYWRkX2NhdGVnb3J5JykuY2xpY2soICgpID0+IHsgY2F0ZWdvcmllcy5hZGQoKTsgfSk7XG5cblx0Ly9kb2RhbmllIG5vd2VqIGthdGVnb3JpaSAocG8gd2NpxZtuacSZY2l1IGVudGVyKVxuXHQkKCdpbnB1dFtuYW1lPVwiYWRkX2NhdGVnb3J5XCJdJykua2V5cHJlc3MoIChlKSA9PiB7IGlmKGUud2hpY2ggPT0gMTMpIHsgY2F0ZWdvcmllcy5hZGQoKTsgfSB9KTtcblxuXHQkKGRvY3VtZW50KS5rZXlwcmVzcyggKGUpID0+IHsgbWVudVRvcC5zd2l0Y2hNb2RlKCBlLndoaWNoICk7IH0pO1xuXG5cdC8vemFrdHVhbGl6b3dhbmllIGthdGVnb3JpaVxuXHQkKFwiI2xpc3RcIikuZGVsZWdhdGUoXCJpbnB1dFwiLFwiZm9jdXNvdXRcIiwgKGUpID0+IHsgXG5cdFx0Y2F0ZWdvcmllcy51cGRhdGUoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2lkX2NhdGVnb3J5JyksICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKSApOyBcblx0fSk7XG5cblx0JChcIiNsaXN0XCIpLmRlbGVnYXRlKFwiaW5wdXRcIixcImtleXByZXNzXCIsIChlKSA9PiB7IFxuXHRcdGlmKGUud2hpY2ggPT0gMTMpeyBjYXRlZ29yaWVzLnVwZGF0ZSgkKGUuY3VycmVudFRhcmdldCkuYXR0cignaWRfY2F0ZWdvcnknKSAsJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpICk7IH0gXG5cdH0pO1xuXG5cdC8vdXN1bmnEmWNpZSBrYXRlZ29yaWlcblx0JChcIiNsaXN0XCIpLmRlbGVnYXRlKFwiYnV0dG9uLnJlbW92ZVwiLFwiY2xpY2tcIiwgKGUpID0+IHsgY2F0ZWdvcmllcy5yZW1vdmUoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2lkX2NhdGVnb3J5JykpOyB9KTtcblxuXHQvL3pha3R1YWxpem93YW5pZSBrYXRlZ29yaWlcblx0JChkb2N1bWVudCkuZGVsZWdhdGUoXCJpbnB1dFwiLFwiY2xpY2tcIiwgKCkgPT4geyBzdG9yZS5tZW51VG9wLm1vZGVLZXkgPSBmYWxzZTsgIH0pO1xuXHQkKGRvY3VtZW50KS5kZWxlZ2F0ZShcImlucHV0XCIsXCJmb2N1c291dFwiLCAoKSA9PiB7IHN0b3JlLm1lbnVUb3AubW9kZUtleSA9IHRydWU7ICB9KTtcblxuXHQvL3Bva2F6YW5pZSAvIHVrcnljaWUgcGFuZWx1IGthdGVnb3JpaVxuXHQkKCcjY2F0ZWdvcnlfYm94IGgyLCAjcG9pbnRlcl9ib3ggaDInKS5jbGljayggKGUpID0+IHsgZ2xvYmFsLnRvb2dsZV9wYW5lbChlKTsgfSk7XG5cblx0Ly9vYsWCdWdhIGlucHV0w7N3IHBvYnJhbmllIGRhbnljaCBpIHphcGlzYW5pZSBkbyBiYXp5XG5cdC8vJCgnLnN3aXRjaCcpLmNsaWNrKCAoZSkgPT4geyBtb2RlbHMudXBkYXRlX2Zyb21fc3dpdGNoKCAkKGUuY3VycmVudFRhcmdldCkgKTsgfSk7IC8vcHJ6eWNpc2tpIHN3aXRjaFxuXHQvLyQoJy5pbnB1dF9iYXNlJykuY2hhbmdlKCAoZSkgPT4geyBtb2RlbHMudXBkYXRlX2Zyb21faW5wdXQoICQoZS5jdXJyZW50VGFyZ2V0KSApOyB9KTsgLy90cmFkeWN5am5lIGlucHV0eVxuXHQvLyQoJy5pbnB1dF9iYXNlX3RleHQnKS5jaGFuZ2UoIChlKSA9PiB7IG1vZGVscy51cGRhdGVfZnJvbV9pbnB1dF90ZXh0KCAkKGUuY3VycmVudFRhcmdldCkgKTsgfSk7IC8vdHJhZHljeWpuZSBpbnB1dHlcblx0Ly8kKCcuc2VsZWN0X2Jhc2UnKS5jaGFuZ2UoIChlKSA9PiB7IG1vZGVscy51cGRhdGVfZnJvbV9zZWxlY3QoICQoZS5jdXJyZW50VGFyZ2V0KSApOyB9KTsgLy9saXN0eSByb3p3aWphbmUgc2VsZWN0XG5cblx0JCgnI2luY3JlbWVudF9jYW52YXMnKS5jbGljayggKCkgPT4geyBtZW51VG9wLmluY3JlbWVudFNjYWxlKCk7IH0pO1xuXHQkKCcjZGVjcmVtZW50X2NhbnZhcycpLmNsaWNrKCAoKSA9PiB7IG1lbnVUb3AuZGVjcmVtZW50U2NhbGUoKTsgfSk7XG5cdCQoJyNhZGRfaW1hZ2UnKS5jbGljayggKCkgPT4geyBpbWFnZS5hZGQoKTsgfSk7XG5cblx0JCgnI3Jlc2V0X2NhbnZhcycpLmNsaWNrKCAoKSA9PiB7IGNhbnZhcy5zZXREZWZhdWx0KCk7IH0pO1xuXG5cdCQoJyNkdXBsaWNhdGUnKS5jbGljayggKCkgPT4geyBpZihjb25maXJtKFwiQ3p5IGNoY2VzeiBza29waW93YcSHIGFrdHVhbG7EhSBtYXDEmSA/XCIpKXsgY3J1ZC5kdXBsaWNhdGUoKTsgfSB9KTtcblxuXHQkKCcjY2FudmFzX2luZm8gI3dpZHRoLCNjYW52YXNfaW5mbyAjaGVpZ2h0LCNjYW52YXNfaW5mbyAjc2l6ZScpLmNoYW5nZSgoKSA9PiB7bWVudVRvcC51cGRhdGVDYW52YXNJbmZvKCl9KTtcblxuXHQkKCcjYWxwaGFfaW1hZ2UnKS5tb3VzZW1vdmUoKGUpID0+IHsgXG5cdFx0aWYoICgkKGUuY3VycmVudFRhcmdldCkudmFsKCkvMTAwKSAhPSBzdG9yZS5tYXAuaW1hZ2UuYWxwaGEgKXtcblx0XHRcdHN0b3JlLm1hcC5pbWFnZS5hbHBoYSA9ICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKS8xMDA7XG5cdFx0XHRjYW52YXMuZHJhdygpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnaW5wdXQnKS5jbGljaygoKSA9PiB7IHN0b3JlLm1lbnVUb3AubW9kZUtleSA9IGZhbHNlOyB9KTtcblx0JCgnaW5wdXQnKS5mb2N1c291dCgoKSA9PiB7IHN0b3JlLm1lbnVUb3AubW9kZUtleSA9IHRydWU7IH0pO1xuXG5cdCQoZG9jdW1lbnQpLm1vdXNldXAoKCkgPT4geyBjYW52YXMuZHJhdygpOyB9KTtcblx0XG5cdC8vemFwaXN1amVteSBsdWIgYWt0dWFsaXp1amVteSBtYXDEmSBwbyBrbGlrbmnEmWNpdSB3IGJ1dHRvdyB3IHphbGXFvG5vxZtjaSBvZCB0ZWdvIGN6eSBtYW15IHpkZWZpbmlvd2FuZSBpZCBtYXB5XG5cdCQoJy5tZW51X3JpZ2h0IC5zYXZlJykuY2xpY2soKCkgPT4ge1xuXHRcdGlmKHN0b3JlLm1hcEhhc2ggPT0gbnVsbCl7IGNydWQuY3JlYXRlTWFwKCk7IH1cblx0XHRlbHNleyBjcnVkLnVwZGF0ZU1hcCgpOyB9XG5cdH0pO1xuXG5cdC8vdXN1d2FteSBtYXDEmSBwbyBrbGlrbmnEmWNpdSB3IGJ1dHRvblxuXHQkKCcubWVudV9yaWdodCAucmVtb3ZlJykuY2xpY2soKCkgPT4geyBpZihjb25maXJtKFwiY3p5IG5hcGV3bm8gdXN1bsSFxIcgbWFwxJkgP1wiKSl7IGNydWQuZGVsZXRlTWFwKCk7IH0gfSk7XG5cbn0pOyIsIi8vIOKVlOKVkOKVl+KVlOKVkOKVl+KVlOKVl+KVlOKVpiAg4pWm4pWU4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilZEgIOKVoOKVkOKVo+KVkeKVkeKVkeKVmuKVl+KVlOKVneKVoOKVkOKVo+KVmuKVkOKVl1xuLy8g4pWa4pWQ4pWd4pWpIOKVqeKVneKVmuKVnSDilZrilZ0g4pWpIOKVqeKVmuKVkOKVnVxuXG5pbXBvcnQgcG9pbnRzIGZyb20gJy4vcG9pbnRzJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IG1lbnVUb3AgZnJvbSAnLi9tZW51VG9wJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuLy9jenlzemN6ZW5pZSBpIHJ5c293YW5pZSBwbyBjYW52YXNpZVxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdC8vcHJ6eXBpc2FuaWUgcG9kc3Rhd293eWNoIGRhbnljaCBkbyBvYmlla3R1IGNhbnZhc1xuXHRpbml0ICgpIHtcblx0XG5cdFx0c3RvcmUuY2FudmFzLm9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluX2NhbnZhcycpO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHggPSBzdG9yZS5jYW52YXMub2JqLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHQkKCcjbWFpbl9jYW52YXMnKS5hdHRyKHsnd2lkdGgnOnN0b3JlLm1hcC5jYW52YXMud2lkdGggKyAncHgnLCdoZWlnaHQnOnN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ICsgJ3B4J30pXG5cdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzogc3RvcmUubWFwLmNhbnZhcy53aWR0aCArICdweCcsJ2hlaWdodCcgOiBzdG9yZS5tYXAuY2FudmFzLmhlaWdodCArICdweCd9KTtcblxuICBcdGxldCBvZmZzZXQgPSAkKCcjY2FudmFzX2JveCcpLm9mZnNldCgpO1xuIFx0XHRzdG9yZS5jYW52YXMub2Zmc2V0TGVmdCA9IG9mZnNldC5sZWZ0O1xuICAgXHRzdG9yZS5jYW52YXMub2Zmc2V0VG9wICA9IG9mZnNldC50b3A7XG5cdH0sXG5cblx0dGh1bWJuYWlsICgpIHtcblx0XHR2YXIgZGF0YVVSTCA9IHN0b3JlLmNhbnZhcy5vYmoudG9EYXRhVVJMKCk7XG5cdFx0Y29uc29sZS5sb2coZGF0YVVSTCk7XG5cdH0sXG5cblx0Ly9yeXN1amVteSBjYW52YXMgemUgemRqxJljaWVtXG5cdGRyYXcgKCkge1xuXHRcdHRoaXMuY2xlYXIoKTtcblx0XG5cdFx0cG9pbnRzLmRyYXcoKTtcblx0XHRpZiAoc3RvcmUubWFwLmltYWdlLnNyYyAhPT0gbnVsbCl7IGltYWdlLmRyYXcoKTtcdCB9XG5cdH0sXG5cblx0Ly9yZXNldHVqZW15IHTFgm8gemRqxJljaWFcblx0cmVzZXQgKCkge1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguc2NhbGUoIHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCAsIHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCApO1xuXHR9LFxuXG5cdC8vIGN6ecWbY2lteSBjYcWCZSB6ZGrEmWNpZSBuYSBjYW52YXNpZVxuXHRjbGVhciAoKSB7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5jbGVhclJlY3QoIDAsIDAsIHN0b3JlLm1hcC5jYW52YXMud2lkdGgsIHN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ICk7XG5cdH0sXG5cblx0cmVzaXplV2lkdGggKHdpZHRoKSB7XG5cdFx0XG5cdFx0c3RvcmUubWFwLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuXHRcdHBvaW50cy5jcmVhdGVEYigpO1xuXHRcdFxuXHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoJ3dpZHRoJyx3aWR0aCArICdweCcpO1xuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3Moeyd3aWR0aCc6IHdpZHRoICsgJ3B4J30pO1xuXHRcdCQoJyNjYW52YXNfaW5mbyAjd2lkdGgnKS52YWwod2lkdGggKyAncHgnKTtcblx0XHRcblx0XHRzdG9yZS5jYW52YXMuc2NhbGUgPSAxMDA7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNzaXplJykudmFsKCcxMDAlJyk7XG5cdFx0bWVudVRvcC5zaG93SW5mbygpO1xuXHR9LFxuXG5cdHJlc2l6ZUhlaWdodCAoaGVpZ2h0KSB7XG5cdFx0XG5cdFx0c3RvcmUubWFwLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0cG9pbnRzLmNyZWF0ZURiKCk7XG5cblx0XHQkKCcjbWFpbl9jYW52YXMnKS5hdHRyKCdoZWlnaHQnLGhlaWdodCArICdweCcpO1xuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3MoeydoZWlnaHQnOiBoZWlnaHQgKyAncHgnfSk7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNoZWlnaHQnKS52YWwoaGVpZ2h0ICsgJ3B4Jyk7XG5cdFx0XG5cdFx0c3RvcmUuY2FudmFzLnNjYWxlID0gMTAwO1xuXHRcdFxuXHRcdCQoJyNjYW52YXNfaW5mbyAjc2l6ZScpLnZhbCgnMTAwJScpO1xuXHRcdG1lbnVUb3Auc2hvd0luZm8oKTtcblxuXHR9LFxuXG5cdHNldERlZmF1bHQgKCkge1xuXG5cdFx0JCgnI2NhbnZhc19ib3ggI3JpZ2h0X3Jlc2l6ZSwgI2NhbnZhc19ib3ggI2JvdHRvbV9yZXNpemUnKS5mYWRlSW4oNTAwKTtcblx0XHRpZihpbWFnZS5tb3ZlX2ltYWdlKSAkKCcjY2FudmFzX2JveCAjaW1hZ2VfcmVzaXplJykuZmFkZUluKDApO1xuXG5cdFx0c3RvcmUuY2FudmFzLnNjYWxlID0gMTAwO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHhYID0gMDtcblx0XHRzdG9yZS5jYW52YXMuY3R4WSA9IDA7XG5cdFx0c3RvcmUuY2FudmFzLmN0eE5ld1ggPSAwO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHhOZXdZID0gMDtcblx0XHRzdG9yZS5jYW52YXMuY3R4LnNjYWxlKCBzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDAgLCBzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDAgKTtcblxuXHRcdHZhciBuZXdXaWR0aCA9IHN0b3JlLm1hcC5jYW52YXMud2lkdGggKiAoc3RvcmUuY2FudmFzLnNjYWxlLzEwMCk7XG5cdFx0dmFyIG5ld0hlaWdodCA9IHN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ICogKHN0b3JlLmNhbnZhcy5zY2FsZS8xMDApO1xuXHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoeyd3aWR0aCc6IG5ld1dpZHRoICsgJ3B4JywnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3Moeyd3aWR0aCc6IG5ld1dpZHRoICsgJ3B4JywnaGVpZ2h0JyA6IG5ld0hlaWdodCArICdweCd9KTtcblxuXHRcdGNhbnZhcy5yZXNldCgpO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHgudHJhbnNsYXRlKCAoIHN0b3JlLmNhbnZhcy5jdHhYIC8gKHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCkgKSwoIHN0b3JlLmNhbnZhcy5jdHhZIC8gKHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCkgKSk7XG5cdFx0bWVudVRvcC5zaG93SW5mbygpO1xuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH1cbn1cbiIsIi8vIOKVlOKVkOKVl+KVlOKVkOKVl+KVlOKVpuKVl+KVlOKVkOKVl+KVlOKVkOKVl+KVlOKVkOKVl+KVpuKVkOKVl+KVpiDilaZcbi8vIOKVkSAg4pWg4pWQ4pWjIOKVkSDilZHilaMg4pWRIOKVpuKVkSDilZHilaDilabilZ3ilZrilabilZ1cbi8vIOKVmuKVkOKVneKVqSDilakg4pWpIOKVmuKVkOKVneKVmuKVkOKVneKVmuKVkOKVneKVqeKVmuKVkCDilakgXG5cbmltcG9ydCBtZW51VG9wIGZyb20gJy4vbWVudVRvcCc7XG5pbXBvcnQgY29scGljayBmcm9tICcuL2NvbHBpY2snO1xuaW1wb3J0IHBvaW50cyBmcm9tICcuL3BvaW50cyc7XG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuLy9vYmlla3Qga2F0ZWdvcmlpIGRvZGFuaWUgLyBha3R1YWxpemFjamEgLyB1c3VuacSZY2llIC8gcG9rYXphbmllIGthdGVnb3JpaVxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdC8vZG9kYWplbXkgbm93xIUga2F0ZWdvcmnEmVxuXHRhZGQgKCkge1xuXHRcdHN0b3JlLm1hcC5jYXRlZ29yaWVzLnB1c2goe1xuXHRcdFx0bmFtZSA6ICQoJyNjYXRlZ29yeV9ib3ggaW5wdXRbbmFtZT1cImFkZENhdGVnb3J5XCJdJykudmFsKCksXG5cdFx0XHRjb2xvciA6IHN0b3JlLmNhdGVnb3JpZXMuY29sb3JEZWZhdWx0XG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYoc3RvcmUubWFwLmNhdGVnb3JpZXMubGVuZ3RoID09IDIpe1xuXHRcdFx0c3RvcmUubWVudVRvcC5jYXRlZ29yeSA9IDE7XG5cdFx0fTtcblxuXHRcdCQoJyNjYXRlZ29yeV9ib3ggaW5wdXRbbmFtZT1cImFkZENhdGVnb3J5XCJdJykudmFsKCcnKTtcblx0XHR0aGlzLnNob3dMaXN0KCk7XG5cdH0sXG5cblx0Ly9ha3R1YWxpenVqZW15IGp1xbwgaXN0bmllasSFY8SFIGthdGVnb3JpxJlcblx0dXBkYXRlIChpbmRleCxuYW1lKSB7XG5cdFx0c3RvcmUubWFwLmNhdGVnb3JpZXNbaW5kZXhdLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuc2hvd0xpc3QoKTtcblx0fSxcblxuXHQvL3VzdXdhbXkga2F0ZWdvcmnEmVxuXHRyZW1vdmUgKGlkKSB7XG5cdFx0bGV0IHRoID0gdGhpcztcblx0XHQkLmVhY2goc3RvcmUubWFwLmNhdGVnb3JpZXMsZnVuY3Rpb24oaW5kZXgsdmFsdWUpe1xuXHRcdFx0aWYoaW5kZXggPj0gaWQpe1xuXHRcdFx0XHR0aC5jYXRlZ29yeVtpbmRleF0gPSB0aC5jYXRlZ29yeVtpbmRleCsxXTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRmb3IobGV0IHJvdyA9IDA7IHJvdyA8IHN0b3JlLm1hcC5wb2ludHMuZGIubGVuZ3RoOyByb3crKyl7XG5cdFx0XHRmb3IobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IHN0b3JlLm1hcC5wb2ludHMuZGJbcm93XS5sZW5ndGg7IGNvbHVtbisrKXtcblx0XHRcdFx0aWYoc3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbHVtbl0gPT0gaWQpeyBcblx0XHRcdFx0XHRzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd11bY29sdW1uXSA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoc3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbHVtbl0gPiBpZCl7XG5cdFx0XHRcdFx0c3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbHVtbl0gPSBwYXJzZUludChzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd11bY29sdW1uXSkgLSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RvcmUubWFwLmNhdGVnb3JpZXMucG9wKCk7XG5cdFx0dGhpcy5zaG93TGlzdCgpO1xuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdH0sXG5cblx0c2hvd0xpc3QgKCkge1xuXHRcdGxldCBhZGRDYXRlZ29yeSA9IFwiPHRhYmxlPlwiOyBcblx0XHRsZXQgYWRkU2VsZWN0ID0gJyc7XG5cblx0XHRmb3IobGV0IGkgPSAxLCBpTWF4ID0gc3RvcmUubWFwLmNhdGVnb3JpZXMubGVuZ3RoOyBpIDwgaU1heDsgaSsrKXtcblx0XHRcdGFkZENhdGVnb3J5ICs9ICc8dHI+PHRkPjxzcGFuPicgKyBpICsgJzwvc3Bhbj48L3RkPjx0ZD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2F0ZWdvcnlfbmFtZVwiIGlkX2NhdGVnb3J5PVwiJyArIGkgKyAnXCIgdmFsdWU9XCInICsgc3RvcmUubWFwLmNhdGVnb3JpZXNbaV0ubmFtZSsgJ1wiIC8+PC90ZD48dGQ+PGRpdiBjbGFzcz1cImNvbHBpY2tfYm94XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyBzdG9yZS5tYXAuY2F0ZWdvcmllc1tpXS5jb2xvciArICdcIiBpZF9jYXRlZ29yeT1cIicgKyBpICsgJ1wiPjwvZGl2PjwvdGQ+PHRkPjxidXR0b24gY2xhc3M9XCJyZW1vdmVcIiBpZF9jYXRlZ29yeT1cIicgKyBpICsgJ1wiPnVzdW48L2J1dHRvbj48L3RkPjwvdHI+Jztcblx0XHRcdGFkZFNlbGVjdCArPSAnPG9wdGlvbiBuYW1lPVwiJyArIGkgKyAnXCI+JyArIHN0b3JlLm1hcC5jYXRlZ29yaWVzW2ldLm5hbWUgKyAnPC9vcHRpb24+Jztcblx0XHR9XG5cblx0XHRpZihzdG9yZS5tYXAuY2F0ZWdvcmllcy5sZW5ndGggPiAxKXtcblx0XHRcdCQoJ3NlbGVjdCNjaGFuZ2VfY2F0ZWdvcnknKS5odG1sKGFkZFNlbGVjdCkuc2hvdyg1MDApO1xuXHRcdFx0JCgnc2VsZWN0I2NoYW5nZV9jYXRlZ29yeSBvcHRpb24nKS5lcSggc3RvcmUubWVudVRvcC5jYXRlZ29yeSApLmF0dHIoJ3NlbGVjdGVkJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHQkKCdzZWxlY3QjY2hhbmdlX2NhdGVnb3J5JykuaGlkZSg1MDApO1xuXHRcdH1cblxuXHRcdGFkZENhdGVnb3J5ICs9IFwiPC90YWJsZT5cIjtcblx0XHQkKCcjY2F0ZWdvcnlfYm94ICNsaXN0JykuaHRtbChhZGRDYXRlZ29yeSk7XG5cdFx0XG5cdFx0Y29scGljay5hZGQoKTtcblx0fVxufVxuIiwiLy8g4pWU4pWQ4pWX4pWU4pWQ4pWX4pWmICDilZTilZDilZfilabilZDilZfilZTilZDilZfilabilZTilZDilZfilabilZTilZDilZTilZDilZfilabilZDilZdcbi8vIOKVkSAg4pWRIOKVkeKVkSAg4pWRIOKVkeKVoOKVpuKVneKVoOKVkOKVneKVkeKVkSAg4pWg4pWp4pWX4pWR4pWjIOKVoOKVpuKVnVxuLy8g4pWa4pWQ4pWd4pWa4pWQ4pWd4pWp4pWQ4pWd4pWa4pWQ4pWd4pWp4pWa4pWQ4pWpICDilanilZrilZDilZ3ilakg4pWp4pWa4pWQ4pWd4pWp4pWa4pWQXG5cbmltcG9ydCBjYXRlZ29yaWVzIGZyb20gJy4vY2F0ZWdvcmllcyc7XG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuLy9zYW1hIG5hendhIHdpZWxlIHTFgnVtYWN6eSBwbyBwcm9zdHUgY29sb3JwaWNrZXJcbmV4cG9ydCBkZWZhdWx0ICB7XG4gXG5cdGFkZCAoKSB7IFxuXHRcdHRoaXMucmVtb3ZlKCk7XG5cblx0XHQkKCcuY29scGlja19ib3gnKS5Db2xvclBpY2tlcih7XG5cdFx0XHRjb2xvcjogJyNmZjAwMDAnLCBcblx0XHRcdG9uU2hvdzogZnVuY3Rpb24oY29scGtyKSB7XG5cdFx0XHRcdGlmKCQoY29scGtyKS5jc3MoJ2Rpc3BsYXknKT09J25vbmUnKXtcblx0XHRcdFx0XHQkKGNvbHBrcikuZmFkZUluKDIwMCk7XG5cdFx0XHRcdFx0c3RvcmUuY29scGljay5jbGlja0lkID0gJCh0aGlzKS5hdHRyKCdpZF9jYXRlZ29yeScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRvbkhpZGU6IGZ1bmN0aW9uKGNvbHBrcikge1xuXHRcdFx0XHQkKGNvbHBrcikuZmFkZU91dCgyMDApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKGhzYiwgaGV4LCByZ2IpIHtcblx0XHRcdFx0JCgnLmNvbHBpY2tfYm94W2lkX2NhdGVnb3J5PVwiJyArIHN0b3JlLmNvbHBpY2suY2xpY2tJZCArJ1wiXScpLmNzcygnYmFja2dyb3VuZENvbG9yJywgJyMnICsgaGV4KTtcblx0XHRcdFx0c3RvcmUubWFwLmNhdGVnb3JpZXNbIHN0b3JlLmNvbHBpY2suY2xpY2tJZCBdLmNvbG9yID0gJyMnICsgaGV4O1xuXHRcdFx0XHRjYW52YXMuZHJhdygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LCBcblxuXHRyZW1vdmUgKCkge1xuXHRcdCQoJy5jb2xvcnBpY2tlcicpLnJlbW92ZSgpO1xuXHR9XG59XG4iLCIvLyDilZTilZDilZfilabilZDilZfilaYg4pWm4pWU4pWm4pWXXG4vLyDilZEgIOKVoOKVpuKVneKVkSDilZEg4pWR4pWRXG4vLyDilZrilZDilZ3ilanilZrilZDilZrilZDilZ3ilZDilanilZ1cblxuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgY3J1ZCBmcm9tICcuL2NydWQnO1xuaW1wb3J0IHBvaW50c1x0ZnJvbSAnLi9wb2ludHMnO1xuaW1wb3J0IGNhdGVnb3JpZXMgZnJvbSAnLi9jYXRlZ29yaWVzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBtZW51VG9wIGZyb20gJy4vbWVudVRvcCc7XG5cbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJ1xuXG4vL2Z1bmtjamEgb2Rwb3dpZWR6aWFsbmEgemEgdHdvcnplbmllIHphcGlzeXdhbmllIGkgYWt0dWFsaXphY2plIGRhbnljaCBkb3R5Y3rEhcSHY3loIG1hcHlcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHQvL3d5xZt3aWV0bGFteSBsaXN0xJkgbWFwIHcgcGFuZWx1IHUgZ8Ozcnlcblx0Z2V0TWFwcyAoKSB7XG5cdFx0JC5hamF4KHtcbiAgIFx0XHR1cmw6ICcvYXBpL21hcHMnLFxuICAgIFx0dHlwZTogXCJHRVRcIixcbiAgICBcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pLmRvbmUoIGZ1bmN0aW9uKCByZXNwb25zZSApIHtcblxuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwib2tcIil7XG5cblx0XHRcdFx0c3RvcmUubWFwc0xpc3QgPSBbXTtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyggJ3BvYnJhbmUgZGFuZScgKyByZXNwb25zZSk7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGlfbWF4ID0gcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkgPCBpX21heCA7aSsrKXtcblxuXHRcdFx0XHRcdGlmKCByZXNwb25zZS5kYXRhW2ldLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSApe1xuXHRcdFx0XHRcdFx0c3RvcmUubWFwc0xpc3QucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGlkIDogcmVzcG9uc2UuZGF0YVtpXS5faWQsXG5cdFx0XHRcdFx0XHRcdHRpdGxlIDogcmVzcG9uc2UuZGF0YVtpXS5kYXRhLnRpdGxlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdHN0b3JlLm1hcHNMaXN0LnB1c2goe1xuXHRcdFx0XHRcdFx0XHRpZCA6IHJlc3BvbnNlLmRhdGFbaV0uX2lkLFxuXHRcdFx0XHRcdFx0XHR0aXRsZSA6IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YVtpXS5tYXBfanNvbilbMF1bN11cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdGR1cGxpY2F0ZSAoKSB7XG5cblx0XHRzdG9yZS5kYXRhLnRpdGxlID0gXHRzdG9yZS5kYXRhLnRpdGxlICsgJyAtIGtvcGlhJztcblx0XHQvL2FrdHVhbGl6dWplbXkganNvbmEgZG8gd3lzxYJhbmlhIGFqYXhlbVxuXHRcdHRoaXMuZ2V0X2RhdGEoKTtcblx0XHR2YXIgdGggPSB0aGlzOyAvL3ptaWVubmEgcG9tb2NuaWN6YVxuXHRcdFxuXHRcdHZhciBkYXRhID0ge1xuXHRcdFx0bWFwX2pzb246IHRoLm1hcF9qc29uXG5cdFx0fVxuXG5cdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0dXJsOiBcImFwaS9tYXBzXCIsXG5cdFx0XHRkYXRhOiB7IG1hcF9qc29uOiB0aC5tYXBfanNvbiB9LFxuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFxuXHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT0gJ29rJyl7XG5cdFx0XHRcdFx0dGgubWFwX2hhc2ggPSByZXNwb25zZS5oYXNoX21hcDtcblx0XHRcdFx0XHRjcnVkLnNlbGVjdF9tYXAodGgubWFwX2hhc2gpO1xuXHRcdFx0XHRcdHRoLmdldE1hcHMoKTsgLy9wb2JyYW5pZSBsaXN0eSBtYXAgaSB3ecWbd2lldGxlbmllIGplaiB3IG1lbnVUb3Bcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSxcblxuXHQvL3BvYmllcmFteSBkYW5lIHogcG9yb2pla3R1IGkgemFwaXN1amVteSBqZSBkbyBqc29uLWFcblx0Z2V0RGF0YSAoKSB7XG5cblx0XHQvL3plcnVqZW15IG5hIG5vd28gY2HFgsSFIHRhYmxpY8SZIHBvaW50ZXLDs3dcblx0XHR0aGlzLm1hcF9qc29uID0gQXJyYXkoKTtcblxuXHRcdC8vIGRhdGFbeF0gPSB6bWllbm5lIHBvZHN0YXdvd2UgZG90eWN6xIVjZSBtYXB5XG5cdFx0dGhpcy5tYXBfanNvblswXSA9IEFycmF5KCk7XG5cdFx0dGhpcy5tYXBfanNvblswXVswXSA9IGNhbnZhcy5oZWlnaHRfY2FudmFzO1xuXHRcdHRoaXMubWFwX2pzb25bMF1bMV0gPSBjYW52YXMud2lkdGhfY2FudmFzO1xuXHRcdHRoaXMubWFwX2pzb25bMF1bMl0gPSBwb2ludHMucGFkZGluZ194O1xuXHRcdHRoaXMubWFwX2pzb25bMF1bM10gPSBwb2ludHMucGFkZGluZ195O1xuXHRcdHRoaXMubWFwX2pzb25bMF1bNF0gPSBwb2ludHMudHJhbnNsYXRlX21vZHVsbztcblx0XHR0aGlzLm1hcF9qc29uWzBdWzVdID0gcG9pbnRzLnNpemVfcG9pbnRlcjtcblx0XHR0aGlzLm1hcF9qc29uWzBdWzZdID0gcG9pbnRzLm1haW5fa2luZDtcblx0XHR0aGlzLm1hcF9qc29uWzBdWzddID0gY2FudmFzLnRpdGxlX3Byb2plY3Q7XG5cblx0XHQvLyBkYXRhWzFdID0gdGFibGljYSBwdW5rdMOzdyAocG9pbnRzLnBvaW50cykgW3dpZXJzel1ba29sdW1uYV0gPSBcIm5vbmVcIiB8fCAobnVtZXIga2F0ZWdvcmlpKVxuXHRcdHRoaXMubWFwX2pzb25bMV0gPSBwb2ludHMucG9pbnRzO1xuXG5cdFx0Ly8gZGF0YVsyXSA9IHRhYmxpY2Ega2F0ZWdvcmlpXG5cdFx0dGhpcy5tYXBfanNvblsyXSA9IGNhdGVnb3JpZXMuY2F0ZWdvcnk7XG5cblx0XHQvL2RhdGFbM10gPSB0YWJsaWNhIHd6b3JjYSAoemRqxJljaWEgdyB0bGUgZG8gb2RyeXNvd2FuaWEpXG5cdFx0dGhpcy5tYXBfanNvblszXSA9IEFycmF5KCk7XG5cblx0XHRpZihpbWFnZS5vYmope1xuXHRcdFx0dGhpcy5tYXBfanNvblszXVswXSA9IGltYWdlLm9iai5zcmM7XG5cdFx0XHR0aGlzLm1hcF9qc29uWzNdWzFdID0gaW1hZ2UueDtcblx0XHRcdHRoaXMubWFwX2pzb25bM11bMl0gPSBpbWFnZS55O1xuXHRcdFx0dGhpcy5tYXBfanNvblszXVszXSA9IGltYWdlLndpZHRoO1xuXHRcdFx0dGhpcy5tYXBfanNvblszXVs0XSA9IGltYWdlLmhlaWdodDtcblx0XHRcdHRoaXMubWFwX2pzb25bM11bNV0gPSBpbWFnZS5hbHBoYTtcblx0XHR9XG5cblx0XHQvL2tvbndlcnR1amVteSBuYXN6YSB0YWJsaWNlIG5hIGpzb25cblx0XHQvL2NvbnNvbGUubG9nKCdNQVAgXyBKU09OJywgdGhpcy5tYXBfanNvbiwgSlNPTi5zdHJpbmdpZnkoIHRoaXMubWFwX2pzb24gKSk7XG5cdFx0dGhpcy5tYXBfanNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMubWFwX2pzb24pO1xuXG5cdH0sXG5cblx0Ly9wb2JyYW5pZSBtYXB5IHogYmF6eSBkYW55Y2hcblx0c3BlY2lhbCAoKSB7XG5cblx0XHR2YXIgdGggPSB0aGlzOyAgXG5cblx0XHQvL3BvIHphcGlzYW5pdSBkYW55Y2ggZG8gYmF6eSBha3R1YWxpenVqZW15IGlkICh3IHByenlwYWRrdSBqZcWbbGkgaXN0bmllamUgbmFkcGlzdWplbXkgamUpXG5cdFx0dmFyIHJlc3BvbnNlID0gY3J1ZC5kYXRhO1xuXG5cdFx0Ly9wb2JpZXJhbXkgaSB3Y3p5dHVqZW15IGRhbmUgbyBjYW52YXNpZSBkbyBvYmlla3R1XG5cdFx0Y2FudmFzLmhlaWdodF9jYW52YXMgPSByZXNwb25zZVswXVswXTtcblx0XHRjYW52YXMud2lkdGhfY2FudmFzID0gcmVzcG9uc2VbMF1bMV07XG5cdFx0cG9pbnRzLnBhZGRpbmdfeCA9IHJlc3BvbnNlWzBdWzJdO1xuXHRcdHBvaW50cy5wYWRkaW5nX3kgPSByZXNwb25zZVswXVszXTtcblx0XHRwb2ludHMudHJhbnNsYXRlX21vZHVsbyA9IHJlc3BvbnNlWzBdWzRdO1xuXHRcdHBvaW50cy5zaXplX3BvaW50ZXIgPSByZXNwb25zZVswXVs1XTtcblx0XHRwb2ludHMubWFpbl9raW5kID0gcmVzcG9uc2VbMF1bNl07XG5cdFx0Y2FudmFzLnRpdGxlX3Byb2plY3QgPSByZXNwb25zZVswXVs3XTtcblxuXHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwicGFkZGluZ194XCJdJykudmFsKCByZXNwb25zZVswXVsyXSApO1xuXHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwicGFkZGluZ195XCJdJykudmFsKCByZXNwb25zZVswXVszXSApO1xuXHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwic2l6ZV9wb2ludGVyXCJdJykudmFsKCByZXNwb25zZVswXVs1XSApO1xuXHRcdCQoJ2lucHV0W25hbWU9XCJ0aXRsZV9wcm9qZWN0XCJdJykudmFsKCByZXNwb25zZVswXVs3XSApO1xuXG5cdFx0aWYoIHJlc3BvbnNlWzBdWzRdICl7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggZGl2W25hbWU9XCJ0cmFuc2xhdGVfbW9kdWxvXCJdJykucmVtb3ZlQ2xhc3MoJ3N3aXRjaC1vZmYnKTtcblx0XHRcdCQoJyNwb2ludGVyX2JveCBkaXZbbmFtZT1cInRyYW5zbGF0ZV9tb2R1bG9cIl0nKS5hZGRDbGFzcygnc3dpdGNoLW9uJyk7XG5cdFx0fVxuXG5cdFx0JCgnI3BvaW50ZXJfYm94IHNlbGVjdFtuYW1lPVwibWFpbl9raW5kXCJdJykuaHRtbCgnJyk7XG5cblx0XHRwb2ludHMua2luZHMuZm9yRWFjaChmdW5jdGlvbihraW5kKXtcblx0XHRcdGlmKGtpbmQgPT0gcmVzcG9uc2VbMF1bNl0pe1xuXHRcdFx0XHQkKCcjcG9pbnRlcl9ib3ggc2VsZWN0W25hbWU9XCJtYWluX2tpbmRcIl0nKS5hcHBlbmQoJzxvcHRpb24gc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiIG5hbWU9XCInK2tpbmQrJ1wiPicra2luZCsnPC9vcHRpb24+Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHQkKCcjcG9pbnRlcl9ib3ggc2VsZWN0W25hbWU9XCJtYWluX2tpbmRcIl0nKS5hcHBlbmQoJzxvcHRpb24gbmFtZT1cIicra2luZCsnXCI+JytraW5kKyc8L29wdGlvbj4nKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vcG9iaWVyYW15IGRhbmUgbyBwb2ludGVyYWNoXG5cdFx0cG9pbnRzLnBvaW50cyA9IHJlc3BvbnNlWzFdO1xuXG5cdFx0Ly9wb2JpZXJhbXkgZGFuZSBvIGthdGVnb3JpYWNoXG5cdFx0Y2F0ZWdvcmllcy5jYXRlZ29yeSA9IHJlc3BvbnNlWzJdO1xuXG5cdFx0Ly9wb2JpZXJhbmllIGRhbnljaCBvIHpkasSZY2l1IGplxbxlbGkgaXN0bmllamVcblx0XHRpZihyZXNwb25zZVszXS5sZW5ndGggPiAyKXtcblx0XHRcdGltYWdlLm9iaiA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0aW1hZ2Uub2JqLnNyYyA9IHJlc3BvbnNlWzNdWzBdO1xuXHRcdFx0aW1hZ2UueCA9IHBhcnNlSW50KCByZXNwb25zZVszXVsxXSApO1xuXHRcdFx0aW1hZ2UueSA9IHBhcnNlSW50KCByZXNwb25zZVszXVsyXSApO1xuXHRcdFx0aW1hZ2Uud2lkdGggPSBwYXJzZUludCggcmVzcG9uc2VbM11bM10gKTtcblx0XHRcdGltYWdlLmhlaWdodCA9IHBhcnNlSW50KCByZXNwb25zZVszXVs0XSApO1xuXHRcdFx0aW1hZ2UuYWxwaGEgPSBwYXJzZUludCggcmVzcG9uc2VbM11bNV0gKTtcblxuXHRcdFx0Ly96YXpuYWN6ZW5pZSBvZHBvd2llZG5pZWdvIHNlbGVjdGEgYWxwaGEgdyBtZW51IHRvcFxuXHRcdFx0JCgnI2FscGhhX2ltYWdlIG9wdGlvbltuYW1lPVwiJytcdGltYWdlLmFscGhhICsnXCJdJykuYXR0cignc2VsZWN0ZWQnLHRydWUpO1xuXG5cdFx0XHRpbWFnZS5vYmoub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vemFrdHVhbGl6b3dhbmllIGRhbnljaCB3IGlucHV0YWNoXG5cdFx0JCgnI21haW5fY2FudmFzJykuYXR0cignd2lkdGgnLCBjYW52YXMud2lkdGhfY2FudmFzKydweCcpO1xuXHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoJ2hlaWdodCcsIGNhbnZhcy5oZWlnaHRfY2FudmFzKydweCcpO1xuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3Moeyd3aWR0aCc6Y2FudmFzLndpZHRoX2NhbnZhcysncHgnLCdoZWlnaHQnOmNhbnZhcy5oZWlnaHRfY2FudmFzKydweCd9KTtcblxuXHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0Y2F0ZWdvcmllcy5zaG93TGlzdCgpO1xuXG5cdH0sXG5cblx0Ly9wb2JyYW5pZSBtYXB5IHogYmF6eSBkYW55Y2hcblx0Z2V0TWFwICgpIHtcblxuXHRcdHZhciB0aCA9IHRoaXM7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiAnL2FwaS9tYXAvJyArIHRoLm1hcF9oYXNoLFxuXHRcdCAgdHlwZTogXCJHRVRcIixcblx0XHQgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG5cblx0XHRcdC8vcG8gemFwaXNhbml1IGRhbnljaCBkbyBiYXp5IGFrdHVhbGl6dWplbXkgaWQgKHcgcHJ6eXBhZGt1IGplxZtsaSBpc3RuaWVqZSBuYWRwaXN1amVteSBqZSlcblx0XHRcdHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoZGF0YS5kYXRhWzBdLm1hcF9qc29uKTtcblxuXHRcdFx0Ly9wb2JpZXJhbXkgaSB3Y3p5dHVqZW15IGRhbmUgbyBjYW52YXNpZSBkbyBvYmlla3R1XG5cdFx0XHRjYW52YXMuaGVpZ2h0X2NhbnZhcyA9IHJlc3BvbnNlWzBdWzBdO1xuXHRcdFx0Y2FudmFzLndpZHRoX2NhbnZhcyA9IHJlc3BvbnNlWzBdWzFdO1xuXHRcdFx0cG9pbnRzLnBhZGRpbmdfeCA9IHJlc3BvbnNlWzBdWzJdO1xuXHRcdFx0cG9pbnRzLnBhZGRpbmdfeSA9IHJlc3BvbnNlWzBdWzNdO1xuXHRcdFx0cG9pbnRzLnRyYW5zbGF0ZV9tb2R1bG8gPSByZXNwb25zZVswXVs0XTtcblx0XHRcdHBvaW50cy5zaXplX3BvaW50ZXIgPSByZXNwb25zZVswXVs1XTtcblx0XHRcdHBvaW50cy5tYWluX2tpbmQgPSByZXNwb25zZVswXVs2XTtcblx0XHRcdGNhbnZhcy50aXRsZV9wcm9qZWN0ID0gcmVzcG9uc2VbMF1bN107XG5cblx0XHRcdCQoJyNwb2ludGVyX2JveCBpbnB1dFtuYW1lPVwicGFkZGluZ194XCJdJykudmFsKCByZXNwb25zZVswXVsyXSApO1xuXHRcdFx0JCgnI3BvaW50ZXJfYm94IGlucHV0W25hbWU9XCJwYWRkaW5nX3lcIl0nKS52YWwoIHJlc3BvbnNlWzBdWzNdICk7XG5cdFx0XHQkKCcjcG9pbnRlcl9ib3ggaW5wdXRbbmFtZT1cInNpemVfcG9pbnRlclwiXScpLnZhbCggcmVzcG9uc2VbMF1bNV0gKTtcblx0XHRcdCQoJ2lucHV0W25hbWU9XCJ0aXRsZV9wcm9qZWN0XCJdJykudmFsKCByZXNwb25zZVswXVs3XSApO1xuXG5cdFx0XHRpZiggcmVzcG9uc2VbMF1bNF0gKXtcblx0XHRcdFx0JCgnI3BvaW50ZXJfYm94IGRpdltuYW1lPVwidHJhbnNsYXRlX21vZHVsb1wiXScpLnJlbW92ZUNsYXNzKCdzd2l0Y2gtb2ZmJyk7XG5cdFx0XHRcdCQoJyNwb2ludGVyX2JveCBkaXZbbmFtZT1cInRyYW5zbGF0ZV9tb2R1bG9cIl0nKS5hZGRDbGFzcygnc3dpdGNoLW9uJyk7XG5cdFx0XHR9XG5cblx0XHRcdCQoJyNwb2ludGVyX2JveCBzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmh0bWwoJycpO1xuXG5cdFx0XHRwb2ludHMua2luZHMuZm9yRWFjaChmdW5jdGlvbihraW5kKXtcblxuXHRcdFx0XHRpZihraW5kID09IHJlc3BvbnNlWzBdWzZdKXtcblx0XHRcdFx0XHQkKCcjcG9pbnRlcl9ib3ggc2VsZWN0W25hbWU9XCJtYWluX2tpbmRcIl0nKS5hcHBlbmQoJzxvcHRpb24gc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiIG5hbWU9XCInK2tpbmQrJ1wiPicra2luZCsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQkKCcjcG9pbnRlcl9ib3ggc2VsZWN0W25hbWU9XCJtYWluX2tpbmRcIl0nKS5hcHBlbmQoJzxvcHRpb24gbmFtZT1cIicra2luZCsnXCI+JytraW5kKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9wb2JpZXJhbXkgZGFuZSBvIHBvaW50ZXJhY2hcblx0XHRcdHBvaW50cy5wb2ludHMgPSByZXNwb25zZVsxXTtcblxuXHRcdFx0Ly9wb2JpZXJhbXkgZGFuZSBvIGthdGVnb3JpYWNoXG5cdFx0XHRjYXRlZ29yaWVzLmNhdGVnb3J5ID0gcmVzcG9uc2VbMl07XG5cblx0XHRcdC8vcG9iaWVyYW5pZSBkYW55Y2ggbyB6ZGrEmWNpdSBqZcW8ZWxpIGlzdG5pZWplXG5cdFx0XHRpZiggcmVzcG9uc2VbM10ubGVuZ3RoID4gMil7XG5cdFx0XHRcdGltYWdlLm9iaiA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRpbWFnZS5vYmouc3JjID0gcmVzcG9uc2VbM11bMF07XG5cdFx0XHRcdGltYWdlLnggPSBwYXJzZUludCggcmVzcG9uc2VbM11bMV0gKTtcblx0XHRcdFx0aW1hZ2UueSA9IHBhcnNlSW50KCByZXNwb25zZVszXVsyXSApO1xuXHRcdFx0XHRpbWFnZS53aWR0aCA9IHBhcnNlSW50KCByZXNwb25zZVszXVszXSApO1xuXHRcdFx0XHRpbWFnZS5oZWlnaHQgPSBwYXJzZUludCggcmVzcG9uc2VbM11bNF0gKTtcblx0XHRcdFx0aW1hZ2UuYWxwaGEgPSBwYXJzZUludCggcmVzcG9uc2VbM11bNV0gKTtcblxuXHRcdFx0XHQvL3phem5hY3plbmllIG9kcG93aWVkbmllZ28gc2VsZWN0YSBhbHBoYSB3IG1lbnUgdG9wXG5cdFx0XHRcdCQoJyNhbHBoYV9pbWFnZSBvcHRpb25bbmFtZT1cIicrXHRpbWFnZS5hbHBoYSArJ1wiXScpLmF0dHIoJ3NlbGVjdGVkJyx0cnVlKTtcblxuXHRcdFx0XHRpbWFnZS5vYmoub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly96YWt0dWFsaXpvd2FuaWUgZGFueWNoIHcgaW5wdXRhY2hcblx0XHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoJ3dpZHRoJywgY2FudmFzLndpZHRoX2NhbnZhcysncHgnKTtcblx0XHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoJ2hlaWdodCcsIGNhbnZhcy5oZWlnaHRfY2FudmFzKydweCcpO1xuXHRcdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzpjYW52YXMud2lkdGhfY2FudmFzKydweCcsJ2hlaWdodCc6Y2FudmFzLmhlaWdodF9jYW52YXMrJ3B4J30pO1xuXG5cdFx0XHRjYW52YXMuZHJhdygpO1xuXHRcdFx0Y2F0ZWdvcmllcy5zaG93X2xpc3QoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvL3R3b3J6eW15IG5vd8SFIG1hcMSZIGRhbnljaFxuXHRjcmVhdGVNYXAgKCkge1xuXHRcdC8vYWt0dWFsaXp1amVteSBqc29uYSBkbyB3eXPFgmFuaWEgYWpheGVtXG5cdFx0dGhpcy5nZXRfZGF0YSgpO1xuXHRcdHZhciB0aCA9IHRoaXM7IC8vem1pZW5uYSBwb21vY25pY3phXG5cblx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHR1cmw6IFwiYXBpL21hcHNcIixcblx0XHRcdGRhdGE6IHsgbWFwX2pzb246IHRoLm1hcF9qc29uIH0sXG5cdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdHRoLm1hcF9oYXNoID0gcmVzcG9uc2UuaGFzaF9tYXA7XG5cdFx0XHRcdHRoLmdldE1hcHMoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvL2FrdHVhbGl6dWplbXkgbWFwxJlcblx0dXBkYXRlTWFwICgpIHtcblx0XHQvL2FrdHVhbGl6dWplbXkganNvbmEgZG8gd3lzxYJhbmlhIGFqYXhlbVxuXHRcdHRoaXMuZ2V0X2RhdGEoKTtcblx0XHR2YXIgdGggPSB0aGlzOyAvL3ptaWVubmEgcG9tb2NuaWN6YVxuXG5cdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0dXJsOiBcImFwaS9tYXBzXCIsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdG1hcF9oYXNoOiB0aC5tYXBfaGFzaCxcblx0XHRcdFx0bWFwX2pzb246IHRoLm1hcF9qc29uXG5cdFx0XHR9LFxuXHRcdFx0dHlwZTogJ1BVVCcsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdHRoLmdldE1hcHMoKTtcblx0XHRcdFx0YWxlcnQocmVzcG9uc2UubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0Ly91c3V3YW15IG1hcMSZIHogYmF6eSBkYW55Y2hcblx0ZGVsZXRlTWFwICgpIHtcblxuXHRcdHZhciB0aCA9IHRoaXM7IC8vem1pZW5uYSBwb21vY25pY3phXG5cblx0XHQvL3NwcmF3ZHphbXkgY3p5IG1hcGEgZG8gdXN1bmnEmWNpYSBwb3NpYWRhIHN3b2plIGlkXG5cdFx0aWYodGhpcy5tYXBfaGFzaCAhPSBudWxsKXtcdFx0XHRcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiBcImFwaS9tYXAvXCIrdGgubWFwX2hhc2gsXG5cdFx0XHRcdHR5cGU6ICdERUxFVEUnLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09ICdvaycpe1xuXHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRhbGVydCgnYsWCxIVkIHBvZGN6YXMgdXN1d2FuaWEnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0YWxlcnQoJ2JyYWsgaWRlbnR5ZmlrYXRvcmEgcHJvamVrdHUnKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIOKUjOKUgOKUkOKUrOKUjOKUgOKUkOKUrCDilKzilKzilIDilJDilIzilIDilJDilIzilIDilJBcbi8vIOKUnOKUpCDilILilIIg4pSs4pSCIOKUguKUnOKUrOKUmOKUnOKUpCDilJTilIDilJBcbi8vIOKUlCAg4pS04pSU4pSA4pSY4pSU4pSA4pSY4pS04pSU4pSA4pSU4pSA4pSY4pSU4pSA4pSYXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnXG5cbi8vZnVua2NqZSByeXN1asSFY2UgcG9qZWR5xYRjenkgcHVua3RcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHQvL3NxdWFyZVxuXHRmaWd1cmVfMCAoeCx5LHNpemUpIHtcblx0XHRzdG9yZS5jYW52YXMuY3R4LmZpbGxSZWN0KHgseSxzaXplLHNpemUpO1xuXHR9LFxuXG5cdC8vY2lyY2xlXG5cdGZpZ3VyZV8xICh4LHksc2l6ZSkge1xuXHRcdHZhciBzaXplID0gc2l6ZSAvIDI7XG5cdFx0dmFyIGNlbnRlclggPSB4ICsgc2l6ZTtcblx0XHR2YXIgY2VudGVyWSA9IHkgKyBzaXplO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguYmVnaW5QYXRoKCk7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgc2l6ZSwgMCwgMiAqIE1hdGguUEkpO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguZmlsbCgpO1xuXHR9LFxuXG5cdC8vaGV4YVxuXHRmaWd1cmVfMiAoeCx5LHNpemUpIHtcblx0XHR2YXIgYSA9IHNpemUvNDtcblx0XHR2YXIgYTIgPSBzaXplLzI7XG5cdFx0dmFyIGggPSBzaXplLzIqTWF0aC5zcXJ0KDMpLzI7XG5cblx0XHRzdG9yZS5jYW52YXMuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHgubW92ZVRvKHgseSthMik7XG4gICAgc3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthLHkrYTItaCk7XG4gIFx0c3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthK2EyLHkrYTItaCk7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCtzaXplLHkrYTIpO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHgubGluZVRvKHgrc2l6ZS1hLHkrYTIraCk7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthLHkrYTIraCk7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCx5K2EyKTtcblx0XHRzdG9yZS5jYW52YXMuY3R4LmZpbGwoKTtcblx0fSxcblxuXHQvL2hleGEyXG5cdGZpZ3VyZV8zICh4LHksc2l6ZSkge1xuXHRcdHZhciBhID0gc2l6ZS80O1xuXHRcdHZhciBhMiA9IHNpemUvMjtcblx0XHR2YXIgaCA9IHNpemUvMipNYXRoLnNxcnQoMykvMjtcblxuXHRcdHN0b3JlLmNhbnZhcy5jdHguYmVnaW5QYXRoKCk7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5tb3ZlVG8oeCthMix5KTtcbiAgICBzdG9yZS5jYW52YXMuY3R4LmxpbmVUbyh4K2EyK2gseSthKTtcbiAgXHRzdG9yZS5jYW52YXMuY3R4LmxpbmVUbyh4K2EyK2gseSthMithKTtcbiAgICBzdG9yZS5jYW52YXMuY3R4LmxpbmVUbyh4K2EyLHkrc2l6ZSk7XG4gICAgc3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthMi1oLHkrYTIrYSk7XG4gICAgc3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthMi1oLHkrYSk7XG4gICAgc3RvcmUuY2FudmFzLmN0eC5saW5lVG8oeCthMix5KTtcblx0XHRzdG9yZS5jYW52YXMuY3R4LmZpbGwoKTtcblxuXHR9XG59XG4iLCIvLyDilZTilZDilZfilaYgIOKVlOKVkOKVl+KVlOKVlyDilZTilZDilZfilaYgIFxuLy8g4pWRIOKVpuKVkSAg4pWRIOKVkeKVoOKVqeKVl+KVoOKVkOKVo+KVkSAgXG4vLyDilZrilZDilZ3ilanilZDilZ3ilZrilZDilZ3ilZrilZDilZ3ilakg4pWp4pWp4pWQ4pWdXG5cbi8vZnVua2NqZSBnbG9iYWxuZSBrb250ZW5lciBuYSB3c3p5c3RrbyBpIG5pYyA7KVxuZXhwb3J0IGRlZmF1bHQge1xuXHR0b29nbGVfcGFuZWwgKGUpIHtcblx0XHRlID0gZSB8fCB3aW5kb3cuZTsgLy9sYXRrYSBkbGEgbW96aWxsaVxuXHRcdGlmKCAkKGUudGFyZ2V0KS5wYXJlbnQoKS5jc3MoJ3JpZ2h0JykgPT0gJzBweCcgKXtcblx0XHRcdCQoZS50YXJnZXQpLnBhcmVudCgpLmFuaW1hdGUoe3JpZ2h0OiBbLSQoZS50YXJnZXQpLnBhcmVudCgpLndpZHRoKCktMjAsXCJzd2luZ1wiXX0sIDEwMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgIH1cbiAgICBlbHNle1xuICAgIFx0ICQoZS50YXJnZXQpLnBhcmVudCgpLmFuaW1hdGUoe3JpZ2h0OiBbXCIwcHhcIixcInN3aW5nXCJdfSwgMTAwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgfVxuXHR9XG59XG4iLCIvLyDilabilZTilabilZfilZTilZDilZfilZTilZDilZfilZTilZDilZdcbi8vIOKVkeKVkeKVkeKVkeKVoOKVkOKVo+KVkSDilabilZHilaMgXG4vLyDilanilakg4pWp4pWpIOKVqeKVmuKVkOKVneKVmuKVkOKVnVxuXG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuLy9nxYLDs3duZSB6ZGrEmWNpZSBvZCBrdMOzcmVnbyBvZHJ5c293dWplbXkgbWFweVxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdGRyYXcgKCkge1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguZ2xvYmFsQWxwaGEgPSBzdG9yZS5tYXAuaW1hZ2UuYWxwaGE7XG5cdFx0c3RvcmUuY2FudmFzLmN0eC5kcmF3SW1hZ2Uoc3RvcmUuaW1hZ2Uub2JqLHN0b3JlLm1hcC5pbWFnZS54LHN0b3JlLm1hcC5pbWFnZS55LHN0b3JlLm1hcC5pbWFnZS53aWR0aCxzdG9yZS5tYXAuaW1hZ2UuaGVpZ2h0KTtcblxuXHRcdCQoJyNjYW52YXNfYm94ICNpbWFnZV9yZXNpemUnKS5jc3MoeydoZWlnaHQnOnN0b3JlLm1hcC5pbWFnZS5oZWlnaHQsJ3RvcCc6c3RvcmUubWFwLmltYWdlLnkrJ3B4JywnbGVmdCc6KHN0b3JlLm1hcC5pbWFnZS54K3N0b3JlLm1hcC5pbWFnZS53aWR0aCkrJ3B4J30pO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHguZ2xvYmFsQWxwaGEgPSAxO1xuXHR9LFxuXG5cdGFkZCAoKSB7XG5cdFx0Ly9qZXNsaSBwb2RhbnkgcGFyYW1ldHIgbmllIGplc3QgcHVzdHlcblx0XHRsZXQgc3JjSW1hZ2UgPSBwcm9tcHQoXCJQb2RhaiDFm2NpZcW8a8SZIGRvIHpkasSZY2lhOiBcIik7XG5cblx0XHRpZihzcmNJbWFnZSl7XG5cdFx0XHRpZihzcmNJbWFnZS5sZW5ndGggPiAwKXtcblxuXHRcdFx0XHRzdG9yZS5pbWFnZS5vYmogPSBuZXcgSW1hZ2UoKTsgXG5cblx0XHRcdFx0Ly93Y3p5dGFuaWUgemRqxJljaWE6IFxuXHRcdFx0XHRzdG9yZS5pbWFnZS5vYmoub25sb2FkID0gKCkgPT4ge1xuXHQgICAgXHRcdHN0b3JlLm1hcC5pbWFnZS53aWR0aCA9IHN0b3JlLmltYWdlLm9iai53aWR0aDtcblx0ICAgIFx0XHRzdG9yZS5tYXAuaW1hZ2UuaGVpZ2h0ID0gc3RvcmUuaW1hZ2Uub2JqLmhlaWdodDtcblx0ICAgIFx0XHR0aGlzLmRyYXcoKTsgXG5cdCAgXHRcdH07XG5cblx0XHRcdCAgc3RvcmUubWFwLmltYWdlLnggPSAwO1xuXHRcdFx0ICBzdG9yZS5tYXAuaW1hZ2UueSA9IDA7XG5cdFx0XHQgIHN0b3JlLmltYWdlLm9iai5zcmMgPSBzcmNJbWFnZTtcblx0XHRcdCBcdHN0b3JlLm1hcC5pbWFnZS5zcmMgPSBzcmNJbWFnZTtcblx0XHRcdFx0Ly9zaW1hZ2Uub2JqLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vZnVua2NqYSBwb21vY25pY3phIGtvbndlcnR1asSFY2EgZGF0YVVSSSBuYSBwbGlrXG5cdGRhdGFVUkl0b0Jsb2IgKGRhdGFVUkkpIHtcbiAgICB2YXIgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6ICdpbWFnZS9wbmcnfSk7XG5cdH1cblxufVxuIiwiLy8g4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWX4pWU4pWmIOKVpiAg4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWQ4pWXXG4vLyDilZHilZHilZHilZHilaMg4pWR4pWR4pWR4pWRIOKVkSAgIOKVkSDilZEg4pWR4pWg4pWQ4pWdXG4vLyDilakg4pWp4pWa4pWQ4pWd4pWd4pWa4pWd4pWa4pWQ4pWdICAg4pWpIOKVmuKVkOKVneKVqSBcblxuaW1wb3J0IGNydWQgZnJvbSAnLi9jcnVkJztcbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IGltYWdlIGZyb20gJy4vaW1hZ2UnO1xuaW1wb3J0IHBvaW50cyBmcm9tICcuL3BvaW50cyc7XG4gXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbi8vb2JpZWt0IG1lbnVfdG9wXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0c2hvd01hcHNMaXN0ICgpIHtcblxuXHRcdC8qXHRpZihyZXNwb25zZS5kYXRhW2ldLl9pZCA9PSBjcnVkLm1hcF9oYXNoKXtcblx0XHRcdFx0XHRcdGFkZF9odG1sICs9ICc8b3B0aW9uIHNlbGVjdGVkIGlkPVwiJyArIHJlc3BvbnNlLmRhdGFbaV0uX2lkICsgJ1wiPicgKyBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGFbaV0ubWFwX2pzb24pWzBdWzddICsgJzwvb3B0aW9uPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRhZGRfaHRtbCArPSAnPG9wdGlvbiBpZD1cIicgKyAgKyAnXCI+JyArIEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YVtpXS5tYXBfanNvbilbMF1bN10gKyAnPC9vcHRpb24+Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JCgnI3Rvb2xiYXJfdG9wIHNlbGVjdC5zZWxlY3RfbWFwcycpLmFwcGVuZCggYWRkX2h0bWwgKTsqL1xuXG5cblx0XHQvL2RvZGFqZW11IHpkYXJ6ZW5pZSBjaGFuZ2UgbWFwXG5cdFx0JCgnLnNlbGVjdF9tYXBzJykuY2hhbmdlKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoY29uZmlybSgnQ3p5IGNoY2VzeiB3Y3p5dGHEhyBub3fEhSBtYXDEmSA/JykpIHtcblx0XHRcdFx0aWYoICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cignaWQnKSA9PSAnbmV3X21hcCcgKXtcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGNydWQuc2VsZWN0X21hcCggJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCdpZCcpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRzZWxlY3RNYXAgKCBpZE1hcCApIHtcblx0XHQvL2plxZtsaSB1cnVjaG9taW15XG5cdFx0aWYgKGlkTWFwID09ICduZXdfbWFwJykgeyBcblx0XHRcdGNydWQuY3JlYXRlTWFwKCkgXG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRzdG9yZS5tYXBIYXNoID0gaWRNYXA7XG5cdFx0XHRjcnVkLmdldE1hcCgpO1xuXHRcdH1cblx0fSxcblxuXHR1cGRhdGVDYW52YXNJbmZvIDogZnVuY3Rpb24oKXtcblx0XHRzdG9yZS5jYW52YXMuc2NhbGUgPSBwYXJzZUludCggJCgnI2NhbnZhc19pbmZvICNzaXplJykudmFsKCkgKTtcblx0XHRzdG9yZS5tYXAuY2FudmFzLndpZHRoID0gcGFyc2VJbnQoICQoJyNjYW52YXNfaW5mbyAjd2lkdGgnKS52YWwoKSApO1xuXHRcdHN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ID0gcGFyc2VJbnQoICQoJyNjYW52YXNfaW5mbyAjaGVpZ2h0JykudmFsKCkgKTtcblxuXHRcdCQoJyNjYW52YXNfaW5mbyAjc2l6ZScpLnZhbCggc3RvcmUuY2FudmFzLnNjYWxlICsgJyUnICk7XG5cdFx0JCgnI2NhbnZhc19pbmZvICN3aWR0aCcpLnZhbCggc3RvcmUubWFwLmNhbnZhcy53aWR0aCArICdweCcgKTtcblx0XHQkKCcjY2FudmFzX2luZm8gI2hlaWdodCcpLnZhbCggc3RvcmUubWFwLmNhbnZhcy5oZWlnaHQgKyAncHgnICk7XG5cblx0XHQkKCcjY2FudmFzX2JveCwgI2NhbnZhc193cmFwcGVyJykuY3NzKHsnd2lkdGgnOiBzdG9yZS5tYXAuY2FudmFzLndpZHRoICsgJ3B4JywnaGVpZ2h0JzpzdG9yZS5tYXAuY2FudmFzLmhlaWdodCArICdweCd9KTtcblx0XHQkKCcjY2FudmFzX2JveCAjbWFpbl9jYW52YXMnKS5hdHRyKHsnd2lkdGgnOnN0b3JlLm1hcC5jYW52YXMud2lkdGggKyAncHgnLCdoZWlnaHQnOnN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ICsgJ3B4J30pO1xuXG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXG5cblx0c2hvd0luZm8gKCkge1xuXHRcdCQoJyNjYW52YXNfaW5mbyAjc2l6ZScpLnZhbChwYXJzZUludChzdG9yZS5jYW52YXMuc2NhbGUpICsgJyUnKTtcblx0XHQkKCcjY2FudmFzX2luZm8gI3dpZHRoJykudmFsKHBhcnNlSW50KHN0b3JlLm1hcC5jYW52YXMud2lkdGgpICsgJ3B4Jyk7XG5cdFx0JCgnI2NhbnZhc19pbmZvICNoZWlnaHQnKS52YWwocGFyc2VJbnQoc3RvcmUubWFwLmNhbnZhcy5oZWlnaHQpICsgJ3B4Jyk7XG5cdH0sXG5cblx0aW5jcmVtZW50U2NhbGUgKCkge1xuXHRcdGNhbnZhcy5yZXNldCgpO1xuXHRcdHN0b3JlLmNhbnZhcy5zY2FsZSArPSA1O1xuXG5cdFx0aWYoc3RvcmUuY2FudmFzLnNjYWxlID09IDEwMCl7XG5cdFx0XHQkKCcjY2FudmFzX2JveCAjcmlnaHRfcmVzaXplLCAjY2FudmFzX2JveCAjYm90dG9tX3Jlc2l6ZScpLmZhZGVJbig1MDApO1xuXHRcdFx0aWYoc3RvcmUubWVudVRvcC5tb3ZlSW1hZ2UpICQoJyNjYW52YXNfYm94ICNpbWFnZV9yZXNpemUnKS5mYWRlSW4oMCk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHQkKCcjY2FudmFzX2JveCAjcmlnaHRfcmVzaXplLCAjY2FudmFzX2JveCAjYm90dG9tX3Jlc2l6ZScpLmZhZGVPdXQoNTAwKTtcblx0XHRcdCQoJyNjYW52YXNfYm94ICNpbWFnZV9yZXNpemUnKS5mYWRlT3V0KDApO1xuXHRcdH1cblxuXHRcdHZhciBuZXdXaWR0aCA9IHN0b3JlLm1hcC5jYW52YXMud2lkdGggKiAoc3RvcmUuY2FudmFzLnNjYWxlLzEwMCk7XG5cdFx0dmFyIG5ld0hlaWdodCA9IHN0b3JlLm1hcC5jYW52YXMuaGVpZ2h0ICogKHN0b3JlLmNhbnZhcy5zY2FsZS8xMDApO1xuXHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoeyd3aWR0aCc6IG5ld1dpZHRoICsgJ3B4JywnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdCQoJyNjYW52YXNfYm94LCAjY2FudmFzX3dyYXBwZXInKS5jc3Moeyd3aWR0aCc6IG5ld1dpZHRoICsgJ3B4JywnaGVpZ2h0JyA6IG5ld0hlaWdodCArICdweCd9KTtcblxuXHRcdHN0b3JlLmNhbnZhcy5jdHguc2NhbGUoIHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCAsIHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCApO1xuXHRcdHN0b3JlLmNhbnZhcy5jdHgudHJhbnNsYXRlKCAoIHN0b3JlLmNhbnZhcy5jdHhYIC8gKHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCkgKSwoIHN0b3JlLmNhbnZhcy5jdHhZIC8gKHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCkgKSk7XG5cblx0XHR0aGlzLnNob3dJbmZvKCk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXHRkZWNyZW1lbnRTY2FsZSAoKSB7XG5cdFx0aWYoc3RvcmUuY2FudmFzLnNjYWxlID4gMTAwKXtcblx0XHRcdGNhbnZhcy5yZXNldCgpO1xuXHRcdFx0c3RvcmUuY2FudmFzLnNjYWxlIC09IDU7XG5cblx0XHRcdGlmKGNhbnZhcy5zY2FsZSA9PSAxMDApe1xuXHRcdFx0XHQkKCcjY2FudmFzX2JveCAjcmlnaHRfcmVzaXplLCAjY2FudmFzX2JveCAjYm90dG9tX3Jlc2l6ZScpLmZhZGVJbig1MDApO1xuXHRcdFx0XHRpZihzdG9yZS5tZW51VG9wLm1vdmVJbWFnZSkgJCgnI2NhbnZhc19ib3ggI2ltYWdlX3Jlc2l6ZScpLmZhZGVJbigwKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdCQoJyNjYW52YXNfYm94ICNyaWdodF9yZXNpemUsICNjYW52YXNfYm94ICNib3R0b21fcmVzaXplJykuZmFkZU91dCg1MDApO1xuXHRcdFx0XHQkKCcjY2FudmFzX2JveCAjaW1hZ2VfcmVzaXplJykuZmFkZU91dCgwKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG5ld1dpZHRoID0gc3RvcmUubWFwLmNhbnZhcy53aWR0aCAqIChzdG9yZS5jYW52YXMuc2NhbGUvMTAwKTtcblx0XHRcdHZhciBuZXdIZWlnaHQgPSBzdG9yZS5tYXAuY2FudmFzLmhlaWdodCAqIChzdG9yZS5jYW52YXMuc2NhbGUvMTAwKTtcblx0XHRcdCQoJyNtYWluX2NhbnZhcycpLmF0dHIoeyd3aWR0aCc6IG5ld1dpZHRoICsgJ3B4JywnaGVpZ2h0JzogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXHRcdFx0JCgnI2NhbnZhc19ib3gsICNjYW52YXNfd3JhcHBlcicpLmNzcyh7J3dpZHRoJzogbmV3V2lkdGggKyAncHgnLCdoZWlnaHQnIDogbmV3SGVpZ2h0ICsgJ3B4J30pO1xuXG5cdFx0XHRzdG9yZS5jYW52YXMuY3R4LnNjYWxlKCBzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDAgLCBzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDAgKTtcblx0XHRcdHN0b3JlLmNhbnZhcy5jdHgudHJhbnNsYXRlKCAoIHN0b3JlLmNhbnZhcy5jdHhYIC8gKHN0b3JlLmNhbnZhcy5zY2FsZSAvIDEwMCkgKSwoIHN0b3JlLmNhbnZhcy5jdHhZIC8gKGNhbnZhcy5zY2FsZSAvIDEwMCkgKSk7XG5cblx0XHRcdHRoaXMuc2hvd0luZm8oKTtcblx0XHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0fVxuXHR9LFxuXG5cblxuXHRzd2l0Y2hNb2RlIChrZXkpIHtcblx0XHRjb25zb2xlLmxvZygna2V5OiAnICsga2V5KVxuXHRcdC8vaWYoIXN0b3JlLm1lbnVUb3AuZGlzYWJsZVNlbGVjdCl7XG5cdFx0XHRpZihzdG9yZS5tZW51VG9wLm1vZGVLZXkpe1xuXHRcdFx0XHRcblx0XHRcdFx0c3dpdGNoKGtleSl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9wb3J1c3phbmllIHpkasSZY2llbSBcblx0XHRcdFx0XHRjYXNlICdtb3ZlSW1hZ2UnOlxuXHRcdFx0XHRcdGNhc2UgNzM6XG5cdFx0XHRcdFx0Y2FzZSAxMDU6IFxuXG5cdFx0XHRcdFx0XHRpZihzdG9yZS5pbWFnZS5vYmope1xuXHRcdFx0XHRcdFx0XHRpZihzdG9yZS5tZW51VG9wLm1vdmVJbWFnZSl7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRzdG9yZS5tZW51VG9wLm1vdmVJbWFnZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyNtZW51X3RvcCBkaXYjbW92ZV9pbWFnZScpLmNzcygnYmFja2dyb3VuZCcsJyNhYWEnKTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjY2FudmFzX3dyYXBwZXIgI2ltYWdlX3Jlc2l6ZScpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRzdG9yZS5tZW51VG9wLm1vdmVJbWFnZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0c3RvcmUubWVudVRvcC5hdXRvRHJhdyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyNtZW51X3RvcCBkaXYjbW92ZV9pbWFnZScpLmNzcygnYmFja2dyb3VuZCcsJyMzNGE4MWMnKTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I2F1dG9fZHJhdycpLmNzcygnYmFja2dyb3VuZCcsJyNhYWEnKTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I21vdmVfY2FudmFzJykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyNjYW52YXNfd3JhcHBlciAjaW1hZ2VfcmVzaXplJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQgXHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHQvL3J5c293YW5pZSBiZXogd2Npc25pxJljaWEgcHJ6eWNpc2t1XG5cdFx0XHRcdFx0Y2FzZSAnYXV0b0RyYXcnOlxuXHRcdFx0XHRcdGNhc2UgNjg6XG5cdFx0XHRcdFx0Y2FzZSAxMDA6IFxuXG5cdFx0XHRcdFx0XHRzdG9yZS5wb2ludHMubGFzdFJvdyA9IG51bGw7XG5cdFx0XHRcdFx0XHRzdG9yZS5wb2ludHMubGFzdENvbCA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKHN0b3JlLm1lbnVUb3AuYXV0b0RyYXcpe1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRzdG9yZS5tZW51VG9wLmF1dG9EcmF3ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdCQoJyNtZW51X3RvcCBkaXYjYXV0b19kcmF3JykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0c3RvcmUubWVudVRvcC5hdXRvRHJhdyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRzdG9yZS5tZW51VG9wLm1vdmVJbWFnZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I21vdmVfY2FudmFzJykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I21vdmVfaW1hZ2UnKS5jc3MoJ2JhY2tncm91bmQnLCcjYWFhJyk7XG5cdFx0XHRcdFx0XHRcdCQoJyNtZW51X3RvcCBkaXYjYXV0b19kcmF3JykuY3NzKCdiYWNrZ3JvdW5kJywnIzM0YTgxYycpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Ly9wb3J1c3phbmllIGNhxYJ5bSBjYW52YXNlbVxuXHRcdFx0XHRcdGNhc2UgJ21vdmVDYW52YXMnOlxuXHRcdFx0XHRcdGNhc2UgNjc6IFxuXHRcdFx0XHRcdGNhc2UgOTk6IFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbW92ZUNhbnZhcycpO1xuXG5cdFx0XHRcdFx0XHRpZihzdG9yZS5tZW51VG9wLm1vdmVDYW52YXMpe1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I21vdmVfY2FudmFzJykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AubW92ZUltYWdlID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHN0b3JlLm1lbnVUb3AuYXV0b0RyYXcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnI21lbnVfdG9wIGRpdiNtb3ZlX2NhbnZhcycpLmNzcygnYmFja2dyb3VuZCcsJyMzNGE4MWMnKTtcblx0XHRcdFx0XHRcdFx0JCgnI21lbnVfdG9wIGRpdiNtb3ZlX2ltYWdlJykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I2F1dG9fZHJhdycpLmNzcygnYmFja2dyb3VuZCcsJyNhYWEnKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAncnViYmVyJzpcblx0XHRcdFx0XHRjYXNlIDcxOlxuXHRcdFx0XHRcdGNhc2UgMTAzOlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRpZihzdG9yZS5tZW51VG9wLnJ1YmJlcil7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0c3RvcmUubWVudVRvcC5ydWJiZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnI21lbnVfdG9wIGRpdiNydWJiZXInKS5jc3MoJ2JhY2tncm91bmQnLCcjYWFhJyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0c3RvcmUubWVudVRvcC5ydWJiZXIgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzdG9yZS5tZW51VG9wLm1vdmVDYW52YXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0c3RvcmUubWVudVRvcC5tb3ZlSW1hZ2UgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0XHQkKCcjbWVudV90b3AgZGl2I3J1YmJlcicpLmNzcygnYmFja2dyb3VuZCcsJyMzNGE4MWMnKTtcblx0XHRcdFx0XHRcdFx0JCgnI21lbnVfdG9wIGRpdiNtb3ZlX2NhbnZhcycpLmNzcygnYmFja2dyb3VuZCcsJyNhYWEnKTtcblx0XHRcdFx0XHRcdFx0JCgnI21lbnVfdG9wIGRpdiNtb3ZlX2ltYWdlJykuY3NzKCdiYWNrZ3JvdW5kJywnI2FhYScpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQvL31cblx0fVxufVxuIiwiLy8g4pWU4pWm4pWX4pWU4pWQ4pWX4pWU4pWm4pWX4pWU4pWQ4pWX4pWmICDilZTilZDilZdcbi8vIOKVkeKVkeKVkeKVkSDilZEg4pWR4pWR4pWR4pWjIOKVkSAg4pWa4pWQ4pWXXG4vLyDilakg4pWp4pWa4pWQ4pWd4pWQ4pWp4pWd4pWa4pWQ4pWd4pWp4pWQ4pWd4pWa4pWQ4pWdXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHBvaW50cyBmcm9tICcuL3BvaW50cyc7XG5pbXBvcnQgbWVudVRvcCBmcm9tICcuL21lbnVUb3AnO1xuXG4vLyBwb2JpZXJhbmllIGRhbnljaCB6IHNlbGVrdGEgaW5wdXRhIHN3aXRjaHkgKGFrdHVhbGl6YWNqYSBvYmlla3TDs3cpIGJ1dHRvbiBpbmtyZW1lbnQgaSBkZWtyZW1lbnRcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHRwb2ludHMgOiBwb2ludHMsXG5cdG1lbnVUb3AgOiBtZW51VG9wLFxuXHRjYW52YXMgOiBjYW52YXMsXG5cblx0YnV0dG9uSW5jcmVtZW50IChvYmopIHtcblx0XHR2YXIgaW5wdXRfdG9fdXBkYXRlID0gJChvYmopLmF0dHIoJ25hbWVpbnB1dCcpO1xuXHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KCQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykudmFsKCkpICsgMTtcblx0XHRcblx0XHQkKCdpbnB1dFtuYW1lPVwiJytpbnB1dF90b191cGRhdGUrJ1wiXScpLnZhbCh2YWx1ZSk7XG5cdFx0dGhpcy51cGRhdGVfZnJvbV9pbnB1dCggJCgnaW5wdXRbbmFtZT1cIicraW5wdXRfdG9fdXBkYXRlKydcIl0nKSApO1xuXHR9LFxuXG5cdGJ1dHRvbkRlY3JlbWVudCAob2JqKSB7XG5cdFx0dmFyIGlucHV0X3RvX3VwZGF0ZSA9ICQob2JqKS5hdHRyKCduYW1laW5wdXQnKTtcblx0XHR2YXIgdmFsdWUgPSBwYXJzZUludCgkKCdpbnB1dFtuYW1lPVwiJytpbnB1dF90b191cGRhdGUrJ1wiXScpLnZhbCgpKSAtIDE7XG5cdFx0XG5cdFx0JCgnaW5wdXRbbmFtZT1cIicraW5wdXRfdG9fdXBkYXRlKydcIl0nKS52YWwodmFsdWUpO1xuXHRcdHRoaXMudXBkYXRlX2Zyb21faW5wdXQoICQoJ2lucHV0W25hbWU9XCInK2lucHV0X3RvX3VwZGF0ZSsnXCJdJykgKTtcblx0fSwgXG5cblx0dXBkYXRlX2Zyb21faW5wdXQgOiBmdW5jdGlvbihvYmope1xuXHRcdHZhciBuYW1lX2NsYXNzID0gJChvYmopLmF0dHIoJ29iaicpO1xuXHRcdHZhciBuYW1lX21ldGhvZCA9ICQob2JqKS5hdHRyKCduYW1lJyk7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coJ3VwZGF0ZV9mcm9tX2lucHV0Jyk7XG5cblx0XHR0aGlzW25hbWVfY2xhc3NdW25hbWVfbWV0aG9kXSA9IHBhcnNlSW50KCAkKG9iaikudmFsKCkgKTtcblx0XHRjYW52YXMuZHJhdygpOyAgXG5cdH0sXG5cblx0dXBkYXRlX2Zyb21faW5wdXRfdGV4dCA6IGZ1bmN0aW9uKG9iail7XG5cdFx0dmFyIG5hbWVfY2xhc3MgPSAkKG9iaikuYXR0cignb2JqJyk7XG5cdFx0dmFyIG5hbWVfbWV0aG9kID0gJChvYmopLmF0dHIoJ25hbWUnKTtcblx0XHRcblx0XHR0aGlzW25hbWVfY2xhc3NdW25hbWVfbWV0aG9kXSA9ICQob2JqKS52YWwoKTtcblx0XHRjYW52YXMuZHJhdygpO1xuXHR9LFxuXG5cdHVwZGF0ZV9mcm9tX3NlbGVjdCA6IGZ1bmN0aW9uKG9iail7XG5cdFx0dmFyIG5hbWVfY2xhc3MgPSAkKG9iaikuYXR0cignb2JqJyk7XG5cdFx0dmFyIG5hbWVfbWV0aG9kID0gJChvYmopLmF0dHIoJ25hbWUnKTtcblx0XHRcblx0XHR0aGlzW25hbWVfY2xhc3NdW25hbWVfbWV0aG9kXSA9ICQob2JqKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCduYW1lJyk7XG5cdFx0Y2FudmFzLmRyYXcoKTtcblx0fSxcblxuXHR1cGRhdGVfZnJvbV9zd2l0Y2ggOiBmdW5jdGlvbihvYmope1xuXG5cdFx0dmFyIG5hbWVfY2xhc3MgPSAkKG9iaikuYXR0cignb2JqJyk7XG5cdFx0dmFyIG5hbWVfbWV0aG9kID0gJChvYmopLmF0dHIoJ25hbWUnKTtcblxuXHRcdGlmKCAkKG9iaikuYXR0cihcInZhbHVlXCIpID09ICdmYWxzZScgKXtcblx0XHRcdCQob2JqKS5hdHRyKFwidmFsdWVcIiwndHJ1ZScpO1xuXHRcdFx0JChvYmopLnJlbW92ZUNsYXNzKCdzd2l0Y2gtb2ZmJyk7XG5cdFx0XHQkKG9iaikuYWRkQ2xhc3MoJ3N3aXRjaC1vbicpO1xuXHRcdFx0dGhpc1tuYW1lX2NsYXNzXVtuYW1lX21ldGhvZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRlbHNleyAvL3d5xYLEhWN6YW15IHByemXFgsSFY3puaWtcblx0XHRcdCQob2JqKS5hdHRyKFwidmFsdWVcIiwnZmFsc2UnKTtcblx0XHRcdCQob2JqKS5yZW1vdmVDbGFzcygnc3dpdGNoLW9uJyk7XG5cdFx0XHQkKG9iaikuYWRkQ2xhc3MoJ3N3aXRjaC1vZmYnKTtcblx0XHRcdHRoaXNbbmFtZV9jbGFzc11bbmFtZV9tZXRob2RdID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGNhbnZhcy5kcmF3KCk7XG5cblx0fVxufVxuIiwiLy8g4pWU4pWm4pWX4pWU4pWQ4pWX4pWmIOKVpuKVlOKVkOKVl+KVlOKVkOKVl1xuLy8g4pWR4pWR4pWR4pWRIOKVkeKVkSDilZHilZrilZDilZfilZHilaMgXG4vLyDilakg4pWp4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWd4pWa4pWQ4pWdXG5cbmltcG9ydCBtZW51VG9wIGZyb20gJy4vbWVudVRvcCc7XG5pbXBvcnQgbW91c2UgZnJvbSAnLi9tb3VzZSc7XG5pbXBvcnQgY2FudmFzIGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBwb2ludHMgZnJvbSAnLi9wb2ludHMnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5cbi8vb2JpZWt0IG15c3praSAoZG8gb2dhcm5pZWNpYSlcbmV4cG9ydCBkZWZhdWx0IHtcblxuXHQvL2Z1bmNramEgd3lrcnl3YWrEhWNhIHcgY28ga2xpa25pxJl0byBwb2JpZXJhasSFY2EgcGFkZGluZyBrbGlrbmnEmWNpYSBvcmF6IHphcGlzdWrEhWNhIGtsaWtuacSZY2llXG5cdHNldE1vdXNlRG93biAoZSkge1xuXG5cdFx0ZSA9IGUgfHwgd2luZG93LmU7IFxuXHRcdFxuXHRcdHZhciBvYmogPSBlLnRhcmdldDtcblxuXHRcdC8vamXFm2xpIGVsZW1lbnQgbmEga3TDs3J5IGtsaWtuacSZdG8gbWEgYXRyeWJ1dCBuYW1lY2xpY2sgcHJ6eXBpc3VqZW15IGdvIGRvIG9iaWVrdHUgbXlzemtpXG5cdFx0aWYodHlwZW9mKCQoZS50YXJnZXQpLmF0dHIoJ25hbWVjbGljaycpKSAhPSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdHN0b3JlLm1vdXNlLmNsaWNrT2JqID0gJChlLnRhcmdldCkuYXR0cignbmFtZWNsaWNrJyk7XG5cblx0XHRcdHZhciBwb3NpdGlvbiA9ICQob2JqKS5vZmZzZXQoKTtcblx0XHRcdHN0b3JlLm1vdXNlLm9mZnNldFggPSBwb3NpdGlvbi5sZWZ0O1xuXHRcdFx0c3RvcmUubW91c2Uub2Zmc2V0WSA9IHBvc2l0aW9uLnRvcDtcblx0XHRcdHN0b3JlLm1vdXNlLnBhZGRpbmdYID0gc3RvcmUubW91c2UueCAtIHBvc2l0aW9uLmxlZnQ7XG5cdFx0XHRzdG9yZS5tb3VzZS5wYWRkaW5nWSA9IHN0b3JlLm1vdXNlLnkgLSBwb3NpdGlvbi50b3A7XG5cdFx0XHRzdG9yZS5tb3VzZS5tb3VzZURvd24gPSB0cnVlO1xuXG5cdFx0XHRzdG9yZS5tb3VzZS50bXBYID0gc3RvcmUubWFwLmltYWdlLng7XG5cdFx0XHRzdG9yZS5tb3VzZS50bXBZID0gc3RvcmUubWFwLmltYWdlLnk7XG5cdFx0fVxuXHR9LFxuXG5cdHNldFBvc2l0aW9uIChlKSB7XG5cdFx0c3RvcmUubW91c2UueCA9IGUucGFnZVgsXG5cdFx0c3RvcmUubW91c2UueSA9IGUucGFnZVlcblx0fSxcblxuXHQvL2Z1bmtjamEgd3lrb255d2FuYSBwb2RjemFzIHdjacWbbmllY2lhIHByenljaWtza3UgbXlzemtpICh3IHphbGXFvG5vxZtjaSBvZCBrbGlrbmnEmXRlZ28gZWxlbWVudHUgd3lrb251amVteSByw7PFvG5lIHJ6ZWN6eSlcblx0bW91c2VNb3ZlICgpIHtcbiBcblx0XHRzd2l0Y2goc3RvcmUubW91c2UuY2xpY2tPYmopeyBcblx0XHRcdFxuXHRcdFx0Y2FzZSAncmlnaHRfcmVzaXplJzpcblx0XHRcdFx0Ly9yb3pzemVyemFuaWUgY2FudmFzYSB3IHByYXdvXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9ICQoJyNjYW52YXNfYm94ICNjYW52YXNfd3JhcHBlcicpLmNoaWxkcmVuKCdjYW52YXMnKS5vZmZzZXQoKTtcblx0XHRcdFx0dmFyIG5ld1dpZHRoID0gc3RvcmUubW91c2UueCAtIHN0b3JlLm1vdXNlLnBhZGRpbmdYIC0gcG9zaXRpb24ubGVmdFxuXHRcdFx0XHRpZihuZXdXaWR0aCA8IHNjcmVlbi53aWR0aCAtIDEwMCl7XG5cdFx0XHRcdFx0Y2FudmFzLnJlc2l6ZVdpZHRoKG5ld1dpZHRoKTtcblx0XHRcdFx0fSBcblx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdGJyZWFrOyBcblxuXHRcdFx0Y2FzZSAnYm90dG9tX3Jlc2l6ZSc6XG5cdFx0XHRcdC8vem1pZW5pYW15IHd5c29rb8WbxIcgY2FudmFzYVxuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSAkKCcjY2FudmFzX2JveCAjY2FudmFzX3dyYXBwZXInKS5jaGlsZHJlbignY2FudmFzJykub2Zmc2V0KCk7XG5cdFx0XHRcdGNhbnZhcy5yZXNpemVIZWlnaHQoc3RvcmUubW91c2UueSAtIHN0b3JlLm1vdXNlLnBhZGRpbmdZIC0gcG9zaXRpb24udG9wKTtcblx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdpbWFnZV9yZXNpemUnOlxuXG5cdFx0XHRcdGlmKHN0b3JlLmltYWdlLm9iaiAhPT0gbnVsbCl7XG5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSAkKCcjY2FudmFzX2JveCAjY2FudmFzX3dyYXBwZXInKS5jaGlsZHJlbignY2FudmFzJykub2Zmc2V0KCk7XG5cdFx0XHRcdFx0dmFyIHhBY3R1YWwgPSBzdG9yZS5tb3VzZS54IC0gcG9zaXRpb24ubGVmdDtcdC8vYWt0dWFsbmEgcG96eWNqYSBteXN6a2lcblx0XHRcdFx0XHR2YXIgc3Vic3RyYWN0ID0gc3RvcmUubWFwLmltYWdlLnggKyBzdG9yZS5tYXAuaW1hZ2Uud2lkdGggLSB4QWN0dWFsICsgc3RvcmUubW91c2UucGFkZGluZ1g7XG5cdFx0XHRcdFx0dmFyIGZhY29yID0gc3RvcmUubWFwLmltYWdlLndpZHRoIC8gc3RvcmUubWFwLmltYWdlLmhlaWdodDtcblxuXHRcdFx0XHRcdGlmIChzdG9yZS5tYXAuaW1hZ2Uud2lkdGggLSBzdWJzdHJhY3QgPiAxMDApe1xuXHRcdFx0XHRcdFx0c3RvcmUubWFwLmltYWdlLndpZHRoIC09IHN1YnN0cmFjdDtcblx0XHRcdFx0XHRcdHN0b3JlLm1hcC5pbWFnZS5oZWlnaHQgLT0gc3Vic3RyYWN0L2ZhY29yO1xuXHRcdFx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdjYW52YXMnOlxuXHRcdFx0Y29uc29sZS5sb2coJ21vdmVDYW52YXMnLHN0b3JlLm1lbnVUb3AubW92ZUltYWdlLHN0b3JlLmltYWdlLm9iaixzdG9yZS5tZW51VG9wLm1vdmVDYW52YXMpO1xuXHRcdFx0XHQvL3ByemVzdXdhbmllIHpkasSZY2llbSAobnAuIG1hcGEgLyB3em9yemVjKVxuXG5cblx0XHRcdFx0aWYoKHN0b3JlLm1lbnVUb3AubW92ZUltYWdlKSAmJiAoc3RvcmUuaW1hZ2Uub2JqICE9PSBudWxsKSl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gJCgnI2NhbnZhc19ib3ggI2NhbnZhc193cmFwcGVyJykuY2hpbGRyZW4oJ2NhbnZhcycpLm9mZnNldCgpO1xuXG5cdFx0XHRcdFx0dmFyIHhBY3R1YWwgPSBzdG9yZS5tb3VzZS54IC0gcG9zaXRpb24ubGVmdDsgLy9ha3R1YWxuYSBwb3p5Y2phIG15c3praVxuXHRcdFx0XHRcdHZhciB5QWN0dWFsID0gc3RvcmUubW91c2UueSAtIHBvc2l0aW9uLnRvcDsgLy8gYWt0dWFsbmEgcG96eWNqYSBteXN6a2lcblxuXHRcdFx0XHRcdHZhciB4VHJhbnNsYXRlID0geEFjdHVhbCAtIHN0b3JlLm1vdXNlLnBhZGRpbmdYICsgc3RvcmUubW91c2UudG1wWDsgLy9wcnplc3VuacSZY2llIG9icmF6a2Egd3pnbMSZZGVtIGFrdHVhbG5laiBwb3p5Y2ppIG15c3praVxuXHRcdFx0XHRcdHZhciB5VHJhbnNsYXRlID0geUFjdHVhbCAtIHN0b3JlLm1vdXNlLnBhZGRpbmdZICsgc3RvcmUubW91c2UudG1wWTsgLy9wcnplc3VuaWVjaWUgb2JyYXprYSB3emdsxJlkZW0gYWt0dWFsbmVqIHBvenljamkgbXlzemtpXG5cblx0XHRcdFx0XHR2YXIgeE5ldyA9IHhUcmFuc2xhdGUgO1xuXHRcdFx0XHRcdHZhciB5TmV3ID0geVRyYW5zbGF0ZSA7XG5cblx0XHRcdFx0XHRzdG9yZS5tYXAuaW1hZ2UueCA9IHhOZXc7XG4gICAgICBcdFx0c3RvcmUubWFwLmltYWdlLnkgPSB5TmV3O1xuICAgICAgXHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL3J5c293YW5pZVxuXHRcdFx0XHRlbHNlIGlmICgoIXN0b3JlLm1lbnVUb3AubW92ZUltYWdlKSAmJiAoIXN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcykpe1xuXHRcdFx0XHRcdHZhciByb3dDbGljayA9IHBhcnNlSW50KCAoc3RvcmUubW91c2UueSAtIHN0b3JlLmNhbnZhcy5vZmZzZXRUb3AgKyBzdG9yZS5jYW52YXMuY3R4WSAqICgtMSkgKSAvICggKHN0b3JlLm1hcC5wb2ludHMuc2l6ZSArIHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1kpKihzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDApICApICk7XG5cdFx0XHRcdFx0dmFyIGNvbENsaWNrID0gcGFyc2VJbnQoIChzdG9yZS5tb3VzZS54IC0gc3RvcmUuY2FudmFzLm9mZnNldExlZnQgKyBzdG9yZS5jYW52YXMuY3R4WCAqICgtMSkgKSAvICggKHN0b3JlLm1hcC5wb2ludHMuc2l6ZSArIHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1gpKihzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDApICkgKTtcblxuXHRcdFx0XHQvL1x0Y29uc29sZS5sb2coJ2tsaWsnLHJvd0NsaWNrLGNvbENsaWNrLHN0b3JlLmNhbnZhcy5jdHhYLHN0b3JlLmNhbnZhcy5jdHhZKTtcblxuXHRcdFx0XHRcdGlmKChzdG9yZS5tYXAucG9pbnRzLnRyYW5zbGF0ZSkgJiYgKHJvd0NsaWNrICUgMiA9PSAwKSl7XG5cdFx0XHRcdFx0XHQvL2NvbENsaWNrID0gcGFyc2VJbnQoIChzdG9yZS5tb3VzZS54IC0gc3RvcmUuY2FudmFzLm9mZnNldExlZnQgLSBzdG9yZS5tYXAucG9pbnRzLnNpemUvMikgLyAoKHN0b3JlLm1hcC5wb2ludHMuc2l6ZSArIHBvaW50cy5wYWRkaW5nX3gpKihjYW52YXMuc2NhbGUgLyAxMDApKSAgKTtcblx0XHRcdFx0XHRcdGNvbENsaWNrID0gcGFyc2VJbnQoIChzdG9yZS5tb3VzZS54IC0gc3RvcmUuY2FudmFzLm9mZnNldExlZnQgKyBzdG9yZS5jYW52YXMuY3R4WCAqICgtMSkgLSBzdG9yZS5tYXAucG9pbnRzLnNpemUgLyAyKSAvICggKHN0b3JlLm1hcC5wb2ludHMuc2l6ZSArIHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1gpKihzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDApICkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiggKHJvd0NsaWNrID49IDApICYmIChyb3dDbGljayA8IHN0b3JlLnBvaW50cy5hY3RpdmVSb3cpICYmIChjb2xDbGljayA+PSAwKSAmJiAoY29sQ2xpY2sgPCBzdG9yZS5wb2ludHMuYWN0aXZlQ29sKSApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cG9pbnRzLnVwZGF0ZVBvaW50KHJvd0NsaWNrLGNvbENsaWNrLHBvaW50cy5sYXN0Um93LHBvaW50cy5sYXN0Q29sKTtcblx0XHRcdFx0XHRcdHBvaW50cy5sYXN0Q29sID0gY29sQ2xpY2s7XG5cdFx0XHRcdFx0XHRwb2ludHMubGFzdFJvdyA9IHJvd0NsaWNrO1xuXHRcdFx0XHRcdFx0Y2FudmFzLmRyYXcoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdHBvaW50cy5sYXN0Um93ID0gbnVsbDtcblx0XHRcdFx0XHRcdHBvaW50cy5sYXN0Q29sID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL3ByemVzdXdhbmllIGNhxYJ5bSBjYW52YXNlbVxuXHRcdFx0XHRlbHNlIGlmKHN0b3JlLm1lbnVUb3AubW92ZUNhbnZhcyl7XG5cblx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdGNhbnZhcy5yZXNldCgpO1xuXHRcdFx0XHRcdGNhbnZhcy5jbGVhcigpO1xuXG5cdFx0XHRcdFx0c3RvcmUuY2FudmFzLmN0eE5ld1ggPSAoc3RvcmUubW91c2UueCAtIHN0b3JlLm1vdXNlLm9mZnNldFgpIC0gc3RvcmUubW91c2UucGFkZGluZ1ggKyBzdG9yZS5jYW52YXMuY3R4WDtcblx0XHRcdFx0XHRzdG9yZS5jYW52YXMuY3R4TmV3WSA9IChzdG9yZS5tb3VzZS55IC0gc3RvcmUubW91c2Uub2Zmc2V0WSkgLSBzdG9yZS5tb3VzZS5wYWRkaW5nWSArIHN0b3JlLmNhbnZhcy5jdHhZO1xuXG5cdFx0XHRcdFx0aWYoc3RvcmUuY2FudmFzLmN0eE5ld1ggPiAwKSBzdG9yZS5jYW52YXMuY3R4TmV3WCA9IDA7XG5cdFx0XHRcdFx0aWYoc3RvcmUuY2FudmFzLmN0eE5ld1kgPiAwKSBzdG9yZS5jYW52YXMuY3R4TmV3WSA9IDA7XG5cblxuY29uc29sZS5sb2coJ3ByemVzdXdhbXkgY2HFgnltIG9ic3phcmVtJyxzdG9yZS5jYW52YXMuY3R4TmV3WCxzdG9yZS5jYW52YXMuc2NhbGUsc3RvcmUuY2FudmFzLmN0eE5ld1kgIClcblx0XHRcdFx0XHRzdG9yZS5jYW52YXMuY3R4LnRyYW5zbGF0ZSggKCBzdG9yZS5jYW52YXMuY3R4TmV3WCAvIChzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDApICksKCBzdG9yZS5jYW52YXMuY3R4TmV3WSAvIChzdG9yZS5jYW52YXMuc2NhbGUgLyAxMDApICkpO1xuXHRcdFx0XHRcdGNhbnZhcy5kcmF3KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59XG4iLCIvLyDilZTilZDilZfilZTilZDilZfilabilZTilZfilZTilZTilabilZfilZTilZDilZfilabilZDilZfilZTilZDilZdcbi8vIOKVoOKVkOKVneKVkSDilZHilZHilZHilZHilZEg4pWRIOKVkeKVoyDilaDilabilZ3ilZrilZDilZdcbi8vIOKVqSAg4pWa4pWQ4pWd4pWp4pWd4pWa4pWdIOKVqSDilZrilZDilZ3ilanilZrilZDilZrilZDilZ1cblxuaW1wb3J0IGNhbnZhcyBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgcG9pbnRzIGZyb20gJy4vcG9pbnRzJztcbmltcG9ydCBjYXRlZ29yaWVzIGZyb20gJy4vY2F0ZWdvcmllcyc7XG5pbXBvcnQgbWVudVRvcCBmcm9tICcuL21lbnVUb3AnO1xuaW1wb3J0IGZpZ3VyZXMgZnJvbSAnLi9maWd1cmVzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcbi8vbWVudSBwb2ludGVyXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0Ly9yeXNvd2FuaWUgd3N6eXN0a2ljaCBwdW5rdMOzd1xuXHRkcmF3ICgpIHtcblx0XHR2YXIgd2lkdGhQb2ludCA9IHN0b3JlLm1hcC5wb2ludHMuc2l6ZSArIHN0b3JlLm1hcC5wb2ludHMucGFkZGluZ1g7XG5cdFx0dmFyIGhlaWdodFBvaW50ID0gc3RvcmUubWFwLnBvaW50cy5zaXplICsgc3RvcmUubWFwLnBvaW50cy5wYWRkaW5nWTtcblx0XHR2YXIgbm9uZUNvbG9yID0gXCJyZ2JhKDAsMCwwLDApXCJcblxuXHRcdGlmKHN0b3JlLnBvaW50cy5zaG93QWxsKSBub25lQ29sb3IgPSBcInJnYmEoMTI4LDEyOCwxMjgsMSlcIjtcblxuXHRcdGZvcih2YXIgcm93ID0gMDsgcm93IDwgc3RvcmUucG9pbnRzLmFjdGl2ZVJvdzsgcm93Kyspe1xuXHRcdFx0Zm9yKHZhciBjb2wgPSAwOyBjb2wgPCBzdG9yZS5wb2ludHMuYWN0aXZlQ29sOyBjb2wrKyl7XG5cblx0XHRcdFx0aWYoc3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbF0gPT0gMCl7XG5cdFx0XHRcdFx0c3RvcmUuY2FudmFzLmN0eC5maWxsU3R5bGUgPSBub25lQ29sb3I7XG5cdFx0XHRcdFx0c3RvcmUuY2FudmFzLmN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGlmKCAoc3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbF0gIT0gc3RvcmUubWVudVRvcC5jYXRlZ29yeSkgJiYgKHN0b3JlLm1lbnVUb3AuY2F0ZWdvcnkgIT0gMCkgKXtcblx0XHRcdFx0XHRcdHN0b3JlLmNhbnZhcy5jdHguZ2xvYmFsQWxwaGEgPSAwLjJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdHN0b3JlLmNhbnZhcy5jdHguZ2xvYmFsQWxwaGEgPSAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRcdHN0b3JlLmNhbnZhcy5jdHguZmlsbFN0eWxlID0gc3RvcmUubWFwLmNhdGVnb3JpZXNbIHN0b3JlLm1hcC5wb2ludHMuZGJbcm93XVtjb2xdIF0uY29sb3I7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhdGNoKGUpe1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0VSUk9SIDM5IExJTkUgISAnLHN0b3JlLm1hcC5wb2ludHMuZGJbcm93XVtjb2xdLHJvdyxjb2wsc3RvcmUucG9pbnRzLmFjdGl2ZVJvdyxzdG9yZS5wb2ludHMuYWN0aXZlQ29sKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiggKHJvdyAlIDIgPT0gMCkgJiYgKHN0b3JlLm1hcC5wb2ludHMudHJhbnNsYXRlKSApe1xuXG5cdFx0XHRcdFx0ZmlndXJlc1snZmlndXJlXycrc3RvcmUubWFwLnBvaW50cy50eXBlXSggY29sKndpZHRoUG9pbnQgKyB3aWR0aFBvaW50LzIgLCByb3cqaGVpZ2h0UG9pbnQgLCBzdG9yZS5tYXAucG9pbnRzLnNpemUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0ZmlndXJlc1snZmlndXJlXycrc3RvcmUubWFwLnBvaW50cy50eXBlXSggY29sKndpZHRoUG9pbnQgLCByb3cqaGVpZ2h0UG9pbnQgLCBzdG9yZS5tYXAucG9pbnRzLnNpemUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly90d29yenlteSB0YWJsaWNlIHBvbnRlcsOzdyAoamXFm2xpIGpha2nFmyBwb250ZXIgaXN0bmllamUgem9zdGF3aWFteSBnbywgdyBwcnp5cGFka3UgZ2R5IHBvaW50ZXJhIG5pZSBtYSB0d29yenlteSBnbyBuYSBub3dvKVxuXHRjcmVhdGVEYiAoKSB7XG5cdFx0c3RvcmUucG9pbnRzLmFjdGl2ZVJvdyA9IHBhcnNlSW50KCBzdG9yZS5tYXAuY2FudmFzLmhlaWdodCAvIChzdG9yZS5tYXAucG9pbnRzLnNpemUgKyBzdG9yZS5tYXAucG9pbnRzLnBhZGRpbmdZKSApICsgMTtcblx0XHRzdG9yZS5wb2ludHMuYWN0aXZlQ29sID0gcGFyc2VJbnQoIHN0b3JlLm1hcC5jYW52YXMud2lkdGggLyAoc3RvcmUubWFwLnBvaW50cy5zaXplICsgc3RvcmUubWFwLnBvaW50cy5wYWRkaW5nWCkgKSArIDE7XG5cblx0XHRpZiggKHN0b3JlLm1hcC5wb2ludHMuZGIubGVuZ3RoIDw9IHN0b3JlLnBvaW50cy5hY3RpdmVSb3cpIHx8IChzdG9yZS5tYXAucG9pbnRzLmRiWzBdLmxlbmd0aCA8PSBzdG9yZS5wb2ludHMuYWN0aXZlQ29sKSApXG5cdFx0e1xuXHRcdFx0Zm9yICh2YXIgcm93ID0gMDsgcm93IDwgc3RvcmUucG9pbnRzLmFjdGl2ZVJvdzsgcm93KyspXG5cdFx0XHR7XG5cdFx0XHRcdGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHN0b3JlLnBvaW50cy5hY3RpdmVDb2w7IGNvbCsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodHlwZW9mIHN0b3JlLm1hcC5wb2ludHMuZGJbcm93XSA9PSAndW5kZWZpbmVkJyl7XG5cdFx0XHRcdFx0XHRzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd10gPSBuZXcgQXJyYXkoKTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdGlmKHR5cGVvZiBzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd11bY29sXSA9PSAndW5kZWZpbmVkJyl7XG5cdFx0XHRcdFx0XHRzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd11bY29sXSA9IDA7XG5cdFx0XHRcdFx0fVx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0dXBkYXRlUG9pbnQgKHkseCx5TGFzdCx4TGFzdCkge1xuXG5cdFx0bGV0IGNhdCA9ICBzdG9yZS5tZW51VG9wLnJ1YmJlciA/IDAgOiBzdG9yZS5tZW51VG9wLmNhdGVnb3J5O1xuXG5cdFx0c3RvcmUubWFwLnBvaW50cy5kYlt5XVt4XSA9IGNhdDtcblxuXHRcdC8vd3l6bmFjemVuaWUgcsOzd25hbmlhIHByb3N0ZWpcblx0XHRpZiggKCh5TGFzdCAhPSB5KSB8fCAoeExhc3QgIT0geCkpICYmICh5TGFzdCAhPSBudWxsKSAmJiAoeExhc3QgIT0gbnVsbCkgKXtcblx0XHRcdHZhciBhID0gKHlMYXN0IC0geSkgLyAoeExhc3QgLSB4KTtcblx0XHRcdHZhciBiID0geSAtIGEqeDtcblxuXHRcdFx0aWYoeExhc3QgPiB4KXtcblx0XHRcdFx0dmFyIGNvbEZyb20gPSB4O1xuXHRcdFx0XHR2YXIgY29sVG8gPSB4TGFzdDtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgY29sVG8gPSB4O1xuXHRcdFx0XHR2YXIgY29sRnJvbSA9IHhMYXN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZih5TGFzdCA+IHkpe1xuXHRcdFx0XHR2YXIgcm93RnJvbSA9IHk7XG5cdFx0XHRcdHZhciByb3dUbyA9IHlMYXN0O1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciByb3dUbyA9IHk7XG5cdFx0XHRcdHZhciByb3dGcm9tID0geUxhc3Q7XG5cdFx0XHR9XG5cblx0XHRcdHZhciByb3cgPSBudWxsO1xuXHRcdFx0Zm9yKHZhciBjb2wgPSBjb2xGcm9tOyBjb2wgPD0gY29sVG87IGNvbCsrKVxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgPSBwYXJzZUludCggYSpjb2wrYiApO1xuXHRcdFx0XHRpZighJC5pc051bWVyaWMocm93KSkgcm93ID0geTtcblx0XHRcdFx0c3RvcmUubWFwLnBvaW50cy5kYltyb3ddW2NvbF0gPSBjYXQ7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb2wgPSBudWxsO1xuXHRcdFx0Zm9yKHZhciByb3cgPSByb3dGcm9tOyByb3cgPD0gcm93VG87IHJvdysrKVxuXHRcdFx0e1xuXHRcdFx0XHRjb2wgPSBwYXJzZUludCggKHJvdy1iKS9hICk7XG5cdFx0XHRcdGlmKCEkLmlzTnVtZXJpYyhjb2wpKSBjb2wgPSB4O1xuXHRcdFx0XHRzdG9yZS5tYXAucG9pbnRzLmRiW3Jvd11bY29sXSA9IGNhdDtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHN0b3JlLm1hcC5wb2ludHMuZGJbeV1beF0gPSBjYXQ7XG5cdFx0fVxuXHR9LFxuXG5cdHNob3dJbmZvICgpIHtcblx0XHQkKCdpbnB1dC5wYWRkaW5nWCcpLnZhbChzdG9yZS5tYXAucG9pbnRzLnBhZGRpbmdYKTtcblx0XHQkKCdpbnB1dC5wYWRkaW5nWScpLnZhbChzdG9yZS5tYXAucG9pbnRzLnBhZGRpbmdZKTtcblx0XHQkKCdpbnB1dC5zaXplUG9pbnRlcicpLnZhbChzdG9yZS5tYXAucG9pbnRzLnNpemUpO1xuXG5cdFx0JCgnLnN3aXRjaC5zaG93QWxsUG9pbnQnKS5yZW1vdmVDbGFzcygnc3dpdGNoLW9uJykucmVtb3ZlQ2xhc3MoJ3N3aXRjaC1vZmYnKVxuXHRcdGlmKHN0b3JlLnBvaW50cy5zaG93QWxsKXtcblx0XHRcdCQoJy5zd2l0Y2guc2hvd0FsbFBvaW50JykuYWRkQ2xhc3MoJ3N3aXRjaC1vbicpO1xuXHRcdH1lbHNleyBcblx0XHRcdCQoJy5zd2l0Y2guc2hvd0FsbFBvaW50JykuYWRkQ2xhc3MoJ3N3aXRjaC1vZmYnKTsgXG5cdFx0fVxuXG5cdFx0JCgnLnN3aXRjaC50cmFuc2xhdGVNb2R1bG8nKS5yZW1vdmVDbGFzcygnc3dpdGNoLW9uJykucmVtb3ZlQ2xhc3MoJ3N3aXRjaC1vZmYnKVxuXHRcdGlmKHN0b3JlLm1hcC5wb2ludHMudHJhbnNsYXRlKXtcblx0XHRcdCQoJy5zd2l0Y2gudHJhbnNsYXRlTW9kdWxvJykuYWRkQ2xhc3MoJ3N3aXRjaC1vbicpO1xuXHRcdH1lbHNleyBcblx0XHRcdCQoJy5zd2l0Y2gudHJhbnNsYXRlTW9kdWxvJykuYWRkQ2xhc3MoJ3N3aXRjaC1vZmYnKTsgXG5cdFx0fVxuXG5cdFx0dmFyIGFkZEh0bWwgPSAnJztcblx0XHRmb3IodmFyIGkgPSAwLCBpTWF4ID0gc3RvcmUucG9pbnRzLnR5cGVzLmxlbmd0aDsgaSA8IGlNYXg7IGkrKyl7XG5cdFx0XHRhZGRIdG1sICs9ICc8b3B0aW9uPicrc3RvcmUucG9pbnRzLnR5cGVzW2ldLm5hbWUrJzwvb3B0aW9uPidcblx0XHR9XG5cblx0XHQkKCdzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXScpLmh0bWwoYWRkSHRtbCk7XG5cblx0XHQvL2NvbnNvbGUubG9nKCAncG9pbnRzJywgc3RvcmUubWFwLnBvaW50cyApO1xuXG5cblx0XHQkKCdzZWxlY3RbbmFtZT1cIm1haW5fa2luZFwiXSBvcHRpb24nKS5lcShzdG9yZS5tYXAucG9pbnRzLnR5cGUpLmF0dHIoJ3NlbGVjdGVkJywnc2VsZWN0ZWQnKTtcblxuXHRcdHRoaXMuY3JlYXRlRGIoKTtcblx0XHRjYW52YXMuZHJhdygpOyBcblx0fVxufVxuIiwiLy8g4pSM4pSA4pSQ4pSM4pSs4pSQ4pSM4pSA4pSQ4pSs4pSA4pSQ4pSM4pSA4pSQXG4vLyDilJTilIDilJAg4pSCIOKUgiDilILilJzilKzilJjilJzilKQgXG4vLyDilJTilIDilJgg4pS0IOKUlOKUgOKUmOKUtOKUlOKUgOKUlOKUgOKUmFxuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0bWFwIDoge1xuXHRcdFxuXHRcdC8vb2JpZWt0IHByemVjaG93dWrEhWN5IGRhbmUgZG90eWN6xIVjZSB6ZGrEmWNpYVx0XG5cdFx0aW1hZ2UgOiB7XG5cdFx0XHRzcmMgOiBudWxsLFxuXHRcdFx0eCA6IDAsXG5cdFx0XHR5IDogMCxcblx0XHRcdHdpZHRoIDogMCxcblx0XHRcdGhlaWdodCA6IDAsXG5cdFx0XHRhbHBoYSA6IDFcblx0XHR9LFxuXG5cdFx0Ly9vYmlla3QgcHJ6ZWNob3d1asSFY3kgcG9kc3Rhd293ZSBkYW5lIGRvdHljesSFY2UgbWFweVxuXHRcdHRpdGxlIDogJycsXG5cblx0XHRjYW52YXMgOiB7XG5cdFx0XHR3aWR0aCA6IDcwMCxcblx0XHRcdGhlaWdodCA6IDQwMCxcblx0XHR9LFxuXG5cdFx0cG9pbnRzIDoge1xuXHRcdFx0cGFkZGluZ1ggOiAxLCBcblx0XHRcdHBhZGRpbmdZIDogMSxcblx0XHRcdHRyYW5zbGF0ZSA6IGZhbHNlLFxuXHRcdFx0c2l6ZSA6IDEwLFxuXHRcdFx0dHlwZSA6IDIsIFxuXHRcdFx0XG5cdFx0XHQvL2R3dSB3eW1pYXJvd2EgdGFibGljYSB6YXdpZXJhasSFY2Egd3N6eXN0a2llIGRhbmUgZG90eWN6xIVjZSBwdW5rdMOzdyBbcm93XVtjb2xdIFxuXHRcdFx0ZGIgOiBbXVxuXHRcdH0sXG5cblx0XHQvL3RhYmxpY2EgemF3aWVyYWrEhWNhIG9iaWVrdHkga2F0ZWdvcmlpIChwaWVyd3N6eSBvYmlla3QgamVzdCBrYXRlZ29yacSFIGRvbXnFm2xuxIUgLyBwdXN0xIUgKVxuXHRcdGNhdGVnb3JpZXMgOiBbe1xuXHRcdFx0bmFtZSA6ICdlbXB0eScsXG5cdFx0XHRjb2xvciA6ICcjODA4MDgwJ1xuXHRcdH1dXG5cdFxuXHR9LFxuXG5cdC8vaGFzaCBtYXB5IG5hIGt0w7NyZWogcHJhY3VqZW15XG5cdG1hcEhhc2ggOiBudWxsLFxuXG5cdG1hcHNMaXN0IDogW10sXG5cblx0Ly9vYmpla3QgcHJ6ZWNob3d1asSFY3kgZGFuZSBjYW52YXNhXG5cdGNhbnZhcyA6IHtcblx0XHRvYmogOiBudWxsLFxuXHRcdGN0eCA6IG51bGwsXG5cdFx0Y3R4WCA6IDAsXG5cdFx0Y3R4WSA6IDAsXG5cdFx0Y3R4TmV3WCA6IDAsXG5cdFx0Y3R4TmV3WSA6IDAsXG5cblx0XHRvZmZzZXRMZWZ0IDogMCxcblx0XHRvZmZzZXRUb3AgOiAwLFxuXHRcdHNjYWxlIDogMTAwLFxuXHR9LFxuXG5cdGltYWdlIDoge1xuXHRcdG9iaiA6IG51bGxcblx0fSxcblxuXHRjYXRlZ29yaWVzIDoge1xuXHRcdGNvbG9yRGVmYXVsdCA6ICcjZmYwMDAwJ1xuXHR9LFxuIFxuXHRwb2ludHMgOiB7XG5cdFx0YWN0aXZlUm93IDogMCxcblx0XHRhY3RpdmVDb2wgOiAwLFxuXHRcdGxhc3RSb3cgOiAwLFxuXHRcdGxhc3RDb2wgOiAwLFxuXHRcdHNob3dBbGwgOiB0cnVlLFxuXG5cdFx0Ly9nxYLDs3duZSB0eXB5IHB1bmt0w7N3XG5cdFx0dHlwZXM6IFt7XG5cdFx0XHRpZCA6ICdzcXVhcmUnLFxuXHRcdFx0bmFtZSA6ICdrd2FkcmF0J1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQgOiAnY2lyY2xlJyxcblx0XHRcdG5hbWUgOiAna2/Fgm8nXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZCA6ICdoZXhhZ29uJyxcblx0XHRcdG5hbWUgOiAncGxhc3RlciBtaW9kdSBJJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQgOiAnaGV4YWdvbjInLFxuXHRcdFx0bmFtZSA6ICdwbGFzdGVyIG1pb2R1IElJJ1xuXHRcdH1dXG5cblx0fSxcblxuXHQvL3ptaWVubmUgcG9tb2NuaWN6ZSBvYmlla3R1IG1lbnUgVG9wXG5cdG1lbnVUb3AgOiB7XG5cdFx0bW92ZUltYWdlIDogZmFsc2UsXG5cdFx0bW92ZUNhbnZhcyA6IGZhbHNlLFxuXHRcdGF1dG9EcmF3IDogZmFsc2UsXG5cdFx0cnViYmVyIDogZmFsc2UsXG5cdFx0bW9kZUtleSA6IHRydWUsXG5cdFx0ZGlzYWJsZVNlbGVjdCA6IGZhbHNlLFxuXHRcdGNhdGVnb3J5IDogMFxuXHR9LFxuXG5cdG1vdXNlIDoge1xuXHRcdG1vdXNlRG93biA6IGZhbHNlLFxuXHRcdGNsaWNrT2JqIDogbnVsbCxcblxuXHRcdHRtcFggOiBudWxsLCAvL3ptaWVubmUgdHltY3phc293ZSB1bW/FvGxpd2lhasSFY2UgcHJ6ZXN1d2FuaWUgdMWCYVxuXHRcdHRtcFkgOiBudWxsLCAvL3ptaWVubmUgdHltY3phc293ZSB1bW/FvGxpd2lhasSFY2UgcHJ6ZXN1d2FuaWUgdMWCYVxuXG5cdFx0eCA6IG51bGwsIC8vcG96eWNqYSB4IG15c3praVxuXHRcdHkgOiBudWxsLCAvL3BvenljamEgeSBteXN6a2lcblx0XHRwYWRkaW5nWCA6IG51bGwsIC8vcG96eWNqYSB4IG15c3praSBvZCBnw7NybmVqIGtyYXfEmWR6aVxuXHRcdHBhZGRpbmdZIDogbnVsbCwgLy9wb3p5Y2phIHkgbXlzemtpIG9kIGfDs3JuZWoga3Jhd8SZZHppXG5cdFx0b2Zmc2V0WCA6IG51bGwsIC8vb2Zmc2V0IHggb2JpZWt0dSBrbGlrbmnEmXRlZ29cblx0XHRvZmZzZXRZIDogbnVsbCwgLy9vZmZzZXQgeSBvYmlla3R1IGtsaWtuacSZdGVnb1xuXHR9LFxuXG5cdGNvbHBpY2sgOiB7XG5cdFx0Y2xpY2tJZCA6IG51bGwsXG5cdH1cblxuXG59Il19
