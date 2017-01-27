// ╔╦╗╔═╗╔╗╔╦ ╦  ╔╦╗╔═╗╔═╗
// ║║║║╣ ║║║║ ║   ║ ║ ║╠═╝
// ╩ ╩╚═╝╝╚╝╚═╝   ╩ ╚═╝╩ 

import crud from './crud';
import canvas from './canvas';
import image from './image';
import points from './points';
 
import store from './store';

//obiekt menu_top
export default {

	showMapsList () {

		/*	if(response.data[i]._id == crud.map_hash){
						add_html += '<option selected id="' + response.data[i]._id + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					}
					else{
						add_html += '<option id="' +  + '">' + JSON.parse(response.data[i].map_json)[0][7] + '</option>';
					}
				}
				$('#toolbar_top select.select_maps').append( add_html );*/


		//dodajemu zdarzenie change map
		$('.select_maps').change(function(){
			if (confirm('Czy chcesz wczytać nową mapę ?')) {
				if( $(this).find('option:selected').attr('id') == 'new_map' ){
					location.reload();
				}
				else{
					crud.select_map( $(this).find('option:selected').attr('id') );
				}
			}
		});
	},

	selectMap ( idMap ) {
		//jeśli uruchomimy
		if (idMap == 'new_map') { 
			crud.createMap() 
		}
		else{
			store.mapHash = idMap;
			crud.getMap();
		}
	},

	updateCanvasInfo : function(){
		store.canvas.scale = parseInt( $('#canvas_info #size').val() );
		store.map.canvas.width = parseInt( $('#canvas_info #width').val() );
		store.map.canvas.height = parseInt( $('#canvas_info #height').val() );

		$('#canvas_info #size').val( store.canvas.scale + '%' );
		$('#canvas_info #width').val( store.map.canvas.width + 'px' );
		$('#canvas_info #height').val( store.map.canvas.height + 'px' );

		$('#canvas_box, #canvas_wrapper').css({'width': store.map.canvas.width + 'px','height':store.map.canvas.height + 'px'});
		$('#canvas_box #main_canvas').attr({'width':store.map.canvas.width + 'px','height':store.map.canvas.height + 'px'});

		canvas.draw();
	},



	showInfo () {
		$('#canvas_info #size').val(parseInt(store.canvas.scale) + '%');
		$('#canvas_info #width').val(parseInt(store.map.canvas.width) + 'px');
		$('#canvas_info #height').val(parseInt(store.map.canvas.height) + 'px');
	},

	incrementScale () {
		canvas.reset();
		store.canvas.scale += 5;

		if(store.canvas.scale == 100){
			$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
			if(store.menuTop.moveImage) $('#canvas_box #image_resize').fadeIn(0);
		}
		else{
			$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeOut(500);
			$('#canvas_box #image_resize').fadeOut(0);
		}

		var newWidth = store.map.canvas.width * (store.canvas.scale/100);
		var newHeight = store.map.canvas.height * (store.canvas.scale/100);
		$('#main_canvas').attr({'width': newWidth + 'px','height': newHeight + 'px'});
		$('#canvas_box, #canvas_wrapper').css({'width': newWidth + 'px','height' : newHeight + 'px'});

		store.canvas.ctx.scale( store.canvas.scale / 100 , store.canvas.scale / 100 );
		store.canvas.ctx.translate( ( store.canvas.ctxX / (store.canvas.scale / 100) ),( store.canvas.ctxY / (store.canvas.scale / 100) ));

		this.showInfo();
		canvas.draw();
	},

	decrementScale () {
		if(store.canvas.scale > 100){
			canvas.reset();
			store.canvas.scale -= 5;

			if(canvas.scale == 100){
				$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeIn(500);
				if(store.menuTop.moveImage) $('#canvas_box #image_resize').fadeIn(0);
			}
			else{
				$('#canvas_box #right_resize, #canvas_box #bottom_resize').fadeOut(500);
				$('#canvas_box #image_resize').fadeOut(0);
			}

			var newWidth = store.map.canvas.width * (store.canvas.scale/100);
			var newHeight = store.map.canvas.height * (store.canvas.scale/100);
			$('#main_canvas').attr({'width': newWidth + 'px','height': newHeight + 'px'});
			$('#canvas_box, #canvas_wrapper').css({'width': newWidth + 'px','height' : newHeight + 'px'});

			store.canvas.ctx.scale( store.canvas.scale / 100 , store.canvas.scale / 100 );
			store.canvas.ctx.translate( ( store.canvas.ctxX / (store.canvas.scale / 100) ),( store.canvas.ctxY / (canvas.scale / 100) ));

			this.showInfo();
			canvas.draw();
		}
	},



	switchMode (key) {
		console.log('key: ' + key)
		//if(!store.menuTop.disableSelect){
			if(store.menuTop.modeKey){
				
				switch(key){
					
					//poruszanie zdjęciem 
					case 'moveImage':
					case 73:
					case 105: 

						if(store.image.obj){
							if(store.menuTop.moveImage){
						
								store.menuTop.moveImage = false;
								$('#menu_top div#move_image').css('background','#aaa');
								$('#canvas_wrapper #image_resize').hide();
						
							}
							else{
						
								store.menuTop.moveImage = true;
								store.menuTop.autoDraw = false;
								store.menuTop.moveCanvas = false;
								$('#menu_top div#move_image').css('background','#34a81c');
								$('#menu_top div#auto_draw').css('background','#aaa');
								$('#menu_top div#move_canvas').css('background','#aaa');
								$('#canvas_wrapper #image_resize').show();
						
						 	}
						}
					break;

					//rysowanie bez wcisnięcia przycisku
					case 'autoDraw':
					case 68:
					case 100: 

						store.points.lastRow = null;
						store.points.lastCol = null;

						if(store.menuTop.autoDraw){
					
							store.menuTop.autoDraw = false;
							$('#menu_top div#auto_draw').css('background','#aaa');
					
						}
						else{
					
							store.menuTop.autoDraw = true;
							store.menuTop.moveCanvas = false;
							store.menuTop.moveImage = false;
							$('#menu_top div#move_canvas').css('background','#aaa');
							$('#menu_top div#move_image').css('background','#aaa');
							$('#menu_top div#auto_draw').css('background','#34a81c');
					
						}
					break;

					//poruszanie całym canvasem
					case 'moveCanvas':
					case 67: 
					case 99: 
						
						console.log('moveCanvas');

						if(store.menuTop.moveCanvas){
						
							store.menuTop.moveCanvas = false;
							$('#menu_top div#move_canvas').css('background','#aaa');
						
						}
						else{
						
							store.menuTop.moveCanvas = true;
							store.menuTop.moveImage = false;
							store.menuTop.autoDraw = false;
							$('#menu_top div#move_canvas').css('background','#34a81c');
							$('#menu_top div#move_image').css('background','#aaa');
							$('#menu_top div#auto_draw').css('background','#aaa');
						
						}
					break;

					case 'rubber':
					case 71:
					case 103:
						
						if(store.menuTop.rubber){
						
							store.menuTop.rubber = false;
							$('#menu_top div#rubber').css('background','#aaa');
						
						}
						else{
						
							store.menuTop.rubber = true;
							store.menuTop.moveCanvas = false;
							store.menuTop.moveImage = false;

							$('#menu_top div#rubber').css('background','#34a81c');
							$('#menu_top div#move_canvas').css('background','#aaa');
							$('#menu_top div#move_image').css('background','#aaa');
						
						}
		
					break;
				}
			}
		//}
	}
}
