// ╔╦╗╔═╗╦ ╦╔═╗╔═╗
// ║║║║ ║║ ║╚═╗║╣ 
// ╩ ╩╚═╝╚═╝╚═╝╚═╝

import menuTop from './menuTop';
import mouse from './mouse';
import canvas from './canvas';
import image from './image';
import points from './points';
import store from './store';


//obiekt myszki (do ogarniecia)
export default {

	//funckja wykrywająca w co kliknięto pobierająca padding kliknięcia oraz zapisująca kliknięcie
	setMouseDown (e) {

		e = e || window.e; 
		
		var obj = e.target;

		//jeśli element na który kliknięto ma atrybut nameclick przypisujemy go do obiektu myszki
		if(typeof($(e.target).attr('nameclick')) != "undefined"){
			store.mouse.clickObj = $(e.target).attr('nameclick');

			var position = $(obj).offset();
			store.mouse.offsetX = position.left;
			store.mouse.offsetY = position.top;
			store.mouse.paddingX = store.mouse.x - position.left;
			store.mouse.paddingY = store.mouse.y - position.top;
			store.mouse.mouseDown = true;

			store.mouse.tmpX = store.map.image.x;
			store.mouse.tmpY = store.map.image.y;
		}
	},

	setPosition (e) {
		store.mouse.x = e.pageX,
		store.mouse.y = e.pageY
	},

	//funkcja wykonywana podczas wciśniecia przyciksku myszki (w zależności od klikniętego elementu wykonujemy różne rzeczy)
	mouseMove () {
 
		switch(store.mouse.clickObj){ 
			
			case 'right_resize':
				//rozszerzanie canvasa w prawo
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				var newWidth = store.mouse.x - store.mouse.paddingX - position.left
				if(newWidth < screen.width - 100){
					canvas.resizeWidth(newWidth);
				} 
				canvas.draw();
			break; 

			case 'bottom_resize':
				//zmieniamy wysokość canvasa
				var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
				canvas.resizeHeight(store.mouse.y - store.mouse.paddingY - position.top);
				canvas.draw();
			break;

			case 'image_resize':

				if(store.image.obj !== null){

					var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();
					var xActual = store.mouse.x - position.left;	//aktualna pozycja myszki
					var substract = store.map.image.x + store.map.image.width - xActual + store.mouse.paddingX;
					var facor = store.map.image.width / store.map.image.height;

					if (store.map.image.width - substract > 100){
						store.map.image.width -= substract;
						store.map.image.height -= substract/facor;
						canvas.draw();
					}
				}
			break;

			case 'canvas':
			console.log('moveCanvas',store.menuTop.moveImage,store.image.obj,store.menuTop.moveCanvas);
				//przesuwanie zdjęciem (np. mapa / wzorzec)


				if((store.menuTop.moveImage) && (store.image.obj !== null)){
					
					var position = $('#canvas_box #canvas_wrapper').children('canvas').offset();

					var xActual = store.mouse.x - position.left; //aktualna pozycja myszki
					var yActual = store.mouse.y - position.top; // aktualna pozycja myszki

					var xTranslate = xActual - store.mouse.paddingX + store.mouse.tmpX; //przesunięcie obrazka względem aktualnej pozycji myszki
					var yTranslate = yActual - store.mouse.paddingY + store.mouse.tmpY; //przesuniecie obrazka względem aktualnej pozycji myszki

					var xNew = xTranslate ;
					var yNew = yTranslate ;

					store.map.image.x = xNew;
      		store.map.image.y = yNew;
      		canvas.draw();
				}

				//rysowanie
				else if ((!store.menuTop.moveImage) && (!store.menuTop.moveCanvas)){
					var rowClick = parseInt( (store.mouse.y - store.canvas.offsetTop + store.canvas.ctxY * (-1) ) / ( (store.map.points.size + store.map.points.paddingY)*(store.canvas.scale / 100)  ) );
					var colClick = parseInt( (store.mouse.x - store.canvas.offsetLeft + store.canvas.ctxX * (-1) ) / ( (store.map.points.size + store.map.points.paddingX)*(store.canvas.scale / 100) ) );

				//	console.log('klik',rowClick,colClick,store.canvas.ctxX,store.canvas.ctxY);

					if((store.map.points.translate) && (rowClick % 2 == 0)){
						//colClick = parseInt( (store.mouse.x - store.canvas.offsetLeft - store.map.points.size/2) / ((store.map.points.size + points.padding_x)*(canvas.scale / 100))  );
						colClick = parseInt( (store.mouse.x - store.canvas.offsetLeft + store.canvas.ctxX * (-1) - store.map.points.size / 2) / ( (store.map.points.size + store.map.points.paddingX)*(store.canvas.scale / 100) ) );
					}

					if( (rowClick >= 0) && (rowClick < store.points.activeRow) && (colClick >= 0) && (colClick < store.points.activeCol) )
					{
						points.updatePoint(rowClick,colClick,points.lastRow,points.lastCol);
						points.lastCol = colClick;
						points.lastRow = rowClick;
						canvas.draw();
					}
					else{
						points.lastRow = null;
						points.lastCol = null;
					}
				}

				//przesuwanie całym canvasem
				else if(store.menuTop.moveCanvas){

					

					canvas.reset();
					canvas.clear();

					store.canvas.ctxNewX = (store.mouse.x - store.mouse.offsetX) - store.mouse.paddingX + store.canvas.ctxX;
					store.canvas.ctxNewY = (store.mouse.y - store.mouse.offsetY) - store.mouse.paddingY + store.canvas.ctxY;

					if(store.canvas.ctxNewX > 0) store.canvas.ctxNewX = 0;
					if(store.canvas.ctxNewY > 0) store.canvas.ctxNewY = 0;


console.log('przesuwamy całym obszarem',store.canvas.ctxNewX,store.canvas.scale,store.canvas.ctxNewY  )
					store.canvas.ctx.translate( ( store.canvas.ctxNewX / (store.canvas.scale / 100) ),( store.canvas.ctxNewY / (store.canvas.scale / 100) ));
					canvas.draw();
				}

			break;
		}
	}
}
