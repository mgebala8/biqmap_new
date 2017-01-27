// ██████╗ ██╗ ██████╗ ███╗   ███╗ █████╗ ██████╗     ██████╗    ██╗
// ██╔══██╗██║██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ╚════██╗  ███║
// ██████╔╝██║██║   ██║██╔████╔██║███████║██████╔╝     █████╔╝  ╚██║
// ██╔══██╗██║██║▄▄ ██║██║╚██╔╝██║██╔══██║██╔═══╝      ╚═══██╗   ██║
// ██████╔╝██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║         ██████╔╝██╗██║
// ╚═════╝ ╚═╝ ╚══▀▀═╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝         ╚═════╝ ╚═╝╚═╝
// wersja: 3.1.5 autor: Marcin Gębala
 
import menu_top from './modules/menu_top';
import layers from './modules/layers'; 
//import palets from './modules/palets';
//import colorpicker from './modules/colorpicker';
import crud from './modules/crud';
import mouse from './modules/mouse'; 
import pointers from './modules/pointers';
import canvas from './modules/canvas';
import categories from './modules/categories'; 
import excel from './modules/excel'; 
import legends from './modules/legends';  
import on_category from './modules/on_category';
import cloud from './modules/cloud';
//import global from './modules/global'; 
//import models from './modules/models';
 
//po kliknięciu zmieniay aktualny panel
$('.box > ul > li').click(function(){ menu_top.change_box(this) });

$(document).ready(function(){ 

	//przypisanie podstawowowych danych do obiektu canvas
	canvas.canvas = document.getElementById('main_canvas');
  canvas.context = canvas.canvas.getContext('2d');
  canvas.width_canvas = parseInt( $('#main_canvas').attr('width') );
  canvas.height_canvas = parseInt( $('#main_canvas').attr('height') ); 
  var offset = $('#canvas_box').offset(); 
  canvas.offset_left = offset.left;
  canvas.offset_top = offset.top;

  //tworzymy tablice pointerów
	pointers.create_array();

	//odznaczenie selecta przy zmianie
	//$//('#change_category').change(function(){ $('#change_category').blur(); });

	//rejestracja zdarzenia w momencie pusczenia przycisku myszki
	$(document).mouseup(function(){ mouse.mouse_down = false; });

	//rejestracja zdarzenia w momencie wciśnięcia przycisku myszki
	$(document).mousedown(function(event){
		if (!event) {event = window.event;} //łata dla mozilli
		mouse.set_mouse_down(event);
	});

	//wywołanie funkcji podczas poruszania myszką
	$(document).mousemove(function(event){
		if (!event) {event = window.event;} //lata dla mozilli
		mouse.set_position(event); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		if(mouse.mouse_down) mouse.mousemove(event);
		if(menu_top.auto_draw){ mouse.click_obj = "canvas"; mouse.mousemove(event);}
	});

	$('#main_canvas').mousedown(function(event){

		if (!event) {event = window.event;} //lata dla mozilli
		mouse.set_mouse_down(event);//zarejestrowanie obiektuw  który klikamy
		mouse.set_position(event); //zarejestrowanie pozycji myszki
		//jesli przycisk jest wciśnięty wykonujemy dodatkowe zdarzenia (przy ruszaniu myszką)
		mouse.mousemove(event);

	});

	$(document).mouseup(function(){

		pointers.last_column = null;	//kolumna pointera który został ostatnio zmieniony
		pointers.last_row = null;
		canvas.context_x = canvas.context_new_x;
		canvas.context_y = canvas.context_new_y;

	});

	crud.get_project();

  //parent.postMessage($('body').height(),'http://'+location.href.split( '/' )[2]);
});
   
$('#canvas_wrapper').mouseleave(function(){ $("#canvas_cloud").fadeOut(200); });

$('#canvas_wrapper').mousemove(function(){
  on_category.set();
  cloud.update_text();  
});

$("#canvas_cloud").mousemove(function(){ cloud.set_position(); });
