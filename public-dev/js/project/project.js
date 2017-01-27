// ██████╗ ██╗ ██████╗ ███╗   ███╗ █████╗ ██████╗     ██████╗    ██╗
// ██╔══██╗██║██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ╚════██╗  ███║
// ██████╔╝██║██║   ██║██╔████╔██║███████║██████╔╝     █████╔╝  ╚██║
// ██╔══██╗██║██║▄▄ ██║██║╚██╔╝██║██╔══██║██╔═══╝      ╚═══██╗   ██║
// ██████╔╝██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║         ██████╔╝██╗██║
// ╚═════╝ ╚═╝ ╚══▀▀═╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚═════╝ ╚═╝╚═╝
// wersja: 3.1.5 autor: Marcin Gębala

import menu_top from './modules/menu_top';
import layers from './modules/layers';
import palets from './modules/palets';
import colorpicker from './modules/colorpicker';
import crud from './modules/crud';
import mouse from './modules/mouse';
import pointers from './modules/pointers';
import canvas from './modules/canvas';
import categories from './modules/categories'; 
import excel from './modules/excel'; 
import legends from './modules/legends';  
import on_category from './modules/on_category';
import cloud from './modules/cloud';
import global from './modules/global';
import models from './modules/models';
import labels from './modules/labels';
import store from './modules/store';


//specjalny obiekt do badania stanu różnych obiektów
window.spec = {
  menu_top : menu_top, 
  layers : layers, 
  palets : palets, 
  colorpicker : colorpicker,
  crud : crud,  
  mouse : mouse, 
  pointers : pointers, 
  canvas : canvas, 
  categories : categories, 
  excel : excel, 
  legends : legends, 
  on_category : on_category, 
  cloud : cloud, 
  global : global,
  models : models, 
  labels : labels,
  store : store
}

//dodajemy tinymce do 2 textarea (dymek źródło)
tinymce.init({
	menubar:false,
  selector: '.tinyedit',  // change this value according to your HTML
  toolbar: 'bold italic | link image',
    setup: (editor) => {
      editor.on('change', (e) => {
        var target = $(editor.targetElm).attr('name');
        
        //jeśli aktualizujemy dymek
        if(target == 'cloud'){
          console.log()
        	layers.cloud[layers.active] = editor.getContent();
        	//cloud.get_textarea( editor.getContent() );
        }

        //jeśli aktualizujemy żródło projektu
        if(target == 'source'){
   				layers.source = editor.getContent();
        }

      });
    }
});

//dodajemy blokadę przed przypadkowym odświeżeniem strony
global.refreshLock();

//po kliknięciu zmieniay aktualny panel
$('.box > ul > li').click((e) => { menu_top.change_box(e.currentTarget) });

$(document).ready(() => {

	menu_top.get_maps();
	menu_top.get_projects();
  layers.show();
  palets.show();
  colorpicker.color_border();
  //tworzymy tablice pointerów
  pointers.create_array();
  excel.init();
  legends.show(); 
  canvas.init();

	//zablokowanie możliwości zaznaczania buttonów podczas edycji pola
	$(document).on("focusin","input", () => { menu_top.disable_select = true; });
	$(document).on("focusout","input", () => { menu_top.disable_select = false; });

	//zaznaczenie dymka do publikacji po kliknięciu
	$('.publish .embed').click( () => {	$(this).select();	});
	$('.publish').click( (e) => { crud.publish(e); }); 

	//jeśli chcemy zapisać / zaktualizować / opublikować projekt
	$('#toolbar_top button.save').click( () => { 
		if(typeof crud.project_hash == 'string'){	crud.update_project(); }
		else{ crud.create_project(); }
	});

	//jeśli chcemy usunąć projekt
	$('#toolbar_top button.delete').click( () => { 
		if(confirm('Czy chcesz usunąć projekt ?')){ crud.delete_project(); }
	});

	//odznaczenie selecta przy zmianie
	$('#change_category').change( () => { $('#change_category').blur(); });

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup( () => { mouse.mouse_down = false; });

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown( (e) => { 
		if (!e) {e = window.event;} //łata dla mozilli
		mouse.set_mouse_down(e);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove( (e) => {
		if (!e) {e = window.event;} //lata dla mozilli
		mouse.set_position(e); //zarejestrowanie pozycji myszki

		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if(mouse.mouse_down) mouse.mousemove(event);
		if(menu_top.auto_draw){ mouse.click_obj = "canvas"; mouse.mousemove(event);}
	
	});

	$('#main_canvas').mousedown( (e) => {
		if (!e) {e = window.event;} //lata dla mozilli
		mouse.set_mouse_down(e);//zarejestrowanie obiektuw  który klikamy
		mouse.set_position(e); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		mouse.mousemove(e);
	});

	$(document).mouseup( () => {
		pointers.last_column = null;	//kolumna pointera który został ostatnio zmieniony
		pointers.last_row = null;
		canvas.context_x = canvas.context_new_x;
		canvas.context_y = canvas.context_new_y;
	});

	//dodanie nowej kategorii
	$('#add_category').click( () => { categories.add(); });

	//dodanie nowej kategorii (po wciśnięciu enter)
	$('input[name="add_category"]').keypress( (e) => {
    if(e.which == 13) {
    	categories.add();
    } 
	});


	//podpięcie zdarzeń
  $('#pointers').delegate('input[name="project.name"]','keyup', (e) => { 
		console.log( 'test', e.currentTarget.value );
	});

	//pokazanie / ukrycie panelu kategorii
	$('#excel_box h2').click( (e) => { global.toogle_left(e.currentTarget); });
  $('#pointer_box h2').click( (e) => { global.toogle_right(e.currentTarget); }); 
  $('#palets_box h2').click( (e) => { global.toogle_right(e.currentTarget); });

	//obsługa buttonów do inkrementacji i dekrementacji inputów
	$('button.increment').click( (e) => { models.button_increment( $(e.currentTarget) ) });
	$('button.decrement').click( (e) => { models.button_decrement( $(e.currentTarget) ) });

	//obługa inputów pobranie danych i zapisanie do bazy
	$('.switch').click( (e) => { models.update_from_switch( $(e.currentTarget) ); }); //przyciski switch
	$('.input_base').change( (e) => { models.update_from_input( $(e.currentTarget) ); }); //tradycyjne inputy
	$('.input_base_text').change( (e) => { models.update_from_input_text( $(e.currentTarget) ); }); //tradycyjne inputy
	$('.select_base').change( (e) => { models.update_from_select( $(e.currentTarget) ); }); //listy rozwijane select

	$('#menu_top #increment_canvas').click( () => { menu_top.increment_scale(); });
	$('#menu_top #decrement_canvas').click( () => { menu_top.decrement_scale(); });
	$('#menu_top #add_image').click( () => { menu_top.add_image(); });

	$('#menu_top #reset_canvas').click( () => { canvas.set_default(); });

  $('#layers .label_layer').keyup( (e) => { labels.edit(e.currentTarget); }); 
  //zdarzenia dotyczące palet
  $('#excel_box select.category').change( (e) => { palets.set_category(e.currentTarget); });
  $('#excel_box select.value').change( (e) => { palets.set_value(e.currentTarget); });

    //zaktualizowanie kategorii
  $("#area").delegate("input","focusout", (e) => { 
    categories.update($(e.currentTarget).attr('id_category'), $(e.currentTarget).val() ); 
  });
 
  $("#area").delegate("input","keypress", (e) => { 
    if(e.which == 13){ categories.update( $(e.currentTarget).attr('id_category'), $(e.currentTarget).val() ); } 
  });
 
  $('#canvas_wrapper').mouseleave( () => { $("#canvas_cloud").fadeOut(200); });

  $('#canvas_wrapper').mousemove( () => {  
    on_category.set();
    cloud.update_text();
    cloud.set_position();
  });

  //zmiana nazwy projektu przy wpisaniu nowej nazwy do inputa
  $('#pointers .project_name').keyup( () => { layers.project_name = $(this).val(); });

  //$('#canvas_info #width').val(canvas.width_canvas+'px');
	//$('#canvas_info #height').val(canvas.height_canvas+'px');
  $('#canvas_box, #canvas_wrapper').css({'width': canvas.width_canvas + 'px','height':canvas.height_canvas + 'px'});
	$('#width_canvas, #height_canvas').change( () => {menu_top.update_canvas_info()});

});
