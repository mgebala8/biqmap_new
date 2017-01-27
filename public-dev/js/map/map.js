import canvas from './mod/canvas';
import colpick from './mod/colpick';

import categories from './mod/categories';
import crud from './mod/crud';
import figures from './mod/figures';
import global from './mod/global';
import image from './mod/image';
import menuTop from './mod/menuTop';
import models from './mod/models';
import mouse from './mod/mouse';
import points from './mod/points';
 
import store from './mod/store'


//specjalny obiekt do badania stanu różnych obiektów
window.spec = {
  canvas:canvas,
  categories:categories, 
  colpick:colpick, 
  crud:crud,
  figures:figures, 
  global:global, 
  image:image,
  menuTop:menuTop, 
  models:models, 
  mouse:mouse,
  points:points,
  store:store,
};  	

$(document).ready(() => {
	
	crud.getMaps();
	canvas.init();
	menuTop.showInfo(); 
	points.showInfo();
	canvas.draw(); 

	//zablokowanie możliwości zaznaczania buttonów podczas edycji pola
	$(document).on("focusin","input",() => { store.menuTop.disableSelect = true; });
	$(document).on("focusout","input",() => { store.menuTop.disableSelect = false; });

	//jeśli nie mamy zdefiniowanega hasha tworzymy nową mapę w przeciwnym wypadku aktualizujemy już istniejącą
	$('#toolbar_top button.save').click(() => { 
		if(typeof crud.mapHash == 'string'){ crud.updateMap(); }
		else{ crud.createMap(); }
	});

	$('#toolbar_top button.delete').click(() => { 
		if(confirm('Czy chcesz usunąć mapę ?')){
			if(typeof store.mapHash != null){ crud.deleteMap(); }
		}
	});

	//odznaczenie selecta przy zmianie
	$('#change_category').change(() => { $('#change_category').blur(); });

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup(() => { store.mouse.mouseDown = false; });

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown((e) => {
		e = e || window.event; 
		mouse.setMouseDown(e);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove((e) => {
		e = e || window.event; 
		mouse.setPosition(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if(store.mouse.mouseDown){ mouse.mouseMove(e); }
		
		if(store.menuTop.autoDraw){ 
			store.mouse.clickObj = "canvas";
			mouse.mouseMove(e);
		}
	});

	$('#main_canvas').mousedown( (e) => {
		e = e || window.event; 
		mouse.setMouseDown(e);//zarejestrowanie obiektuw  który klikamy
		mouse.setPosition(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		mouse.mouseMove(e);
	});

	$(document).mouseup( () => {
		points.lastColumn = null;	//kolumna pointera który został ostatnio zmieniony
		points.lastRow = null;
		store.canvas.ctxX = store.canvas.ctxNewX;
		store.canvas.ctxY = store.canvas.ctxNewY;
	});

	$('#move_image').click( () => { menuTop.switchMode('moveImage'); });
	$('#move_canvas').click( () => { menuTop.switchMode('moveCanvas'); });
	$('#auto_draw').click( () => { menuTop.switchMode('autoDraw'); });
	$('#rubber').click( () => { menuTop.switchMode('rubber'); });

	// button paddingX
	$('button.increment.paddingX').click( () => { store.map.points.paddingX++; points.showInfo(); });
	$('button.decrement.paddingX').click( () => { store.map.points.paddingX--; points.showInfo(); });
	$('input.paddingX').keyup( (e) => { 
		store.map.points.paddingX = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0 ;
		points.showInfo();
	}); 

	// button paddingY
	$('button.increment.paddingY').click( () => { store.map.points.paddingY++; points.showInfo(); });
	$('button.decrement.paddingY').click( () => { store.map.points.paddingY--; points.showInfo(); });
	$('input.paddingY').keyup( (e) => { 
		store.map.points.paddingY = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0 ;
		points.showInfo();
	});

	//button sizePointer
	$('button.increment.sizePointer').click( () => { store.map.points.size++; points.showInfo(); });
	$('button.decrement.sizePointer').click( () => { store.map.points.size--; points.showInfo(); });
	$('input.sizePointer').keyup( (e) => { 
		store.map.points.size = Number.isInteger(parseInt($(e.currentTarget).val())) ? parseInt($(e.currentTarget).val()) : 0 ;
		points.showInfo();
	});

	$('.switch.showAllPoint').click( (e) => { 
		if( $(e.currentTarget).hasClass('switch-off') ){ store.points.showAll = true; }
		else{ store.points.showAll = false; }
		points.showInfo();
	});

	$('.switch.translateModulo').click( (e) => { 
		if( $(e.currentTarget).hasClass('switch-off') ){ store.map.points.translate = true; }
		else{ store.map.points.translate = false; }
		points.showInfo();
	});

	$('select[name="main_kind"]').change( (e) => {
		store.map.points.type = $(e.currentTarget)[0].selectedIndex;
		points.showInfo();
	});

	$('#change_category').change( (e) => {
		store.menuTop.category = $(e.currentTarget)[0].selectedIndex+1;
	});

	//dodanie nowej kategorii
	$('#add_category').click( () => { categories.add(); });

	//dodanie nowej kategorii (po wciśnięciu enter)
	$('input[name="add_category"]').keypress( (e) => { if(e.which == 13) { categories.add(); } });

	$(document).keypress( (e) => { menuTop.switchMode( e.which ); });

	//zaktualizowanie kategorii
	$("#list").delegate("input","focusout", (e) => { 
		categories.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val() ); 
	});

	$("#list").delegate("input","keypress", (e) => { 
		if(e.which == 13){ categories.update($(e.currentTarget).attr('id_category') ,$(e.currentTarget).val() ); } 
	});

	//usunięcie kategorii
	$("#list").delegate("button.remove","click", (e) => { categories.remove($(e.currentTarget).attr('id_category')); });

	//zaktualizowanie kategorii
	$(document).delegate("input","click", () => { store.menuTop.modeKey = false;  });
	$(document).delegate("input","focusout", () => { store.menuTop.modeKey = true;  });

	//pokazanie / ukrycie panelu kategorii
	$('#category_box h2, #pointer_box h2').click( (e) => { global.toogle_panel(e); });

	//obługa inputów pobranie danych i zapisanie do bazy
	//$('.switch').click( (e) => { models.update_from_switch( $(e.currentTarget) ); }); //przyciski switch
	//$('.input_base').change( (e) => { models.update_from_input( $(e.currentTarget) ); }); //tradycyjne inputy
	//$('.input_base_text').change( (e) => { models.update_from_input_text( $(e.currentTarget) ); }); //tradycyjne inputy
	//$('.select_base').change( (e) => { models.update_from_select( $(e.currentTarget) ); }); //listy rozwijane select

	$('#increment_canvas').click( () => { menuTop.incrementScale(); });
	$('#decrement_canvas').click( () => { menuTop.decrementScale(); });
	$('#add_image').click( () => { image.add(); });

	$('#reset_canvas').click( () => { canvas.setDefault(); });

	$('#duplicate').click( () => { if(confirm("Czy chcesz skopiować aktualną mapę ?")){ crud.duplicate(); } });

	$('#canvas_info #width,#canvas_info #height,#canvas_info #size').change(() => {menuTop.updateCanvasInfo()});

	$('#alpha_image').mousemove((e) => { 
		if( ($(e.currentTarget).val()/100) != store.map.image.alpha ){
			store.map.image.alpha = $(e.currentTarget).val()/100;
			canvas.draw();
		}
	});

	$('input').click(() => { store.menuTop.modeKey = false; });
	$('input').focusout(() => { store.menuTop.modeKey = true; });

	$(document).mouseup(() => { canvas.draw(); });
	
	//zapisujemy lub aktualizujemy mapę po kliknięciu w buttow w zależności od tego czy mamy zdefiniowane id mapy
	$('.menu_right .save').click(() => {
		if(store.mapHash == null){ crud.createMap(); }
		else{ crud.updateMap(); }
	});

	//usuwamy mapę po kliknięciu w button
	$('.menu_right .remove').click(() => { if(confirm("czy napewno usunąć mapę ?")){ crud.deleteMap(); } });

});