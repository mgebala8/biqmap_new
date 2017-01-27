// ╔═╗╔═╗╦╔╗╔╔╦╗╔═╗╦═╗╔═╗
// ╠═╝║ ║║║║║ ║ ║╣ ╠╦╝╚═╗
// ╩  ╚═╝╩╝╚╝ ╩ ╚═╝╩╚═╚═╝

import canvas from './canvas';
import points from './points';
import categories from './categories';
import menuTop from './menuTop';
import figures from './figures';
import store from './store';
//menu pointer
export default {

	//rysowanie wszystkich punktów
	draw () {
		var widthPoint = store.map.points.size + store.map.points.paddingX;
		var heightPoint = store.map.points.size + store.map.points.paddingY;
		var noneColor = "rgba(0,0,0,0)"

		if(store.points.showAll) noneColor = "rgba(128,128,128,1)";

		for(var row = 0; row < store.points.activeRow; row++){
			for(var col = 0; col < store.points.activeCol; col++){

				if(store.map.points.db[row][col] == 0){
					store.canvas.ctx.fillStyle = noneColor;
					store.canvas.ctx.globalAlpha = 0.5;
				}
				else{
					if( (store.map.points.db[row][col] != store.menuTop.category) && (store.menuTop.category != 0) ){
						store.canvas.ctx.globalAlpha = 0.2
					}
					else{
						store.canvas.ctx.globalAlpha = 1
					}
					try{
						store.canvas.ctx.fillStyle = store.map.categories[ store.map.points.db[row][col] ].color;
					}
					catch(e){
						console.log('ERROR 39 LINE ! ',store.map.points.db[row][col],row,col,store.points.activeRow,store.points.activeCol);
					}
				}

				if( (row % 2 == 0) && (store.map.points.translate) ){

					figures['figure_'+store.map.points.type]( col*widthPoint + widthPoint/2 , row*heightPoint , store.map.points.size);
				}
				else{
					figures['figure_'+store.map.points.type]( col*widthPoint , row*heightPoint , store.map.points.size);
				}

			}
		}
	},

	//tworzymy tablice ponterów (jeśli jakiś ponter istnieje zostawiamy go, w przypadku gdy pointera nie ma tworzymy go na nowo)
	createDb () {
		store.points.activeRow = parseInt( store.map.canvas.height / (store.map.points.size + store.map.points.paddingY) ) + 1;
		store.points.activeCol = parseInt( store.map.canvas.width / (store.map.points.size + store.map.points.paddingX) ) + 1;

		if( (store.map.points.db.length <= store.points.activeRow) || (store.map.points.db[0].length <= store.points.activeCol) )
		{
			for (var row = 0; row < store.points.activeRow; row++)
			{
				for (var col = 0; col < store.points.activeCol; col++)
				{
					if(typeof store.map.points.db[row] == 'undefined'){
						store.map.points.db[row] = new Array();
					} 
					if(typeof store.map.points.db[row][col] == 'undefined'){
						store.map.points.db[row][col] = 0;
					}	
				}
			}
		}
	},

	updatePoint (y,x,yLast,xLast) {

		let cat =  store.menuTop.rubber ? 0 : store.menuTop.category;

		store.map.points.db[y][x] = cat;

		//wyznaczenie równania prostej
		if( ((yLast != y) || (xLast != x)) && (yLast != null) && (xLast != null) ){
			var a = (yLast - y) / (xLast - x);
			var b = y - a*x;

			if(xLast > x){
				var colFrom = x;
				var colTo = xLast;
			}else{
				var colTo = x;
				var colFrom = xLast;
			}

			if(yLast > y){
				var rowFrom = y;
				var rowTo = yLast;
			}else{
				var rowTo = y;
				var rowFrom = yLast;
			}

			var row = null;
			for(var col = colFrom; col <= colTo; col++)
			{
				row = parseInt( a*col+b );
				if(!$.isNumeric(row)) row = y;
				store.map.points.db[row][col] = cat;
			}

			var col = null;
			for(var row = rowFrom; row <= rowTo; row++)
			{
				col = parseInt( (row-b)/a );
				if(!$.isNumeric(col)) col = x;
				store.map.points.db[row][col] = cat;
			}
		}
		else{
			store.map.points.db[y][x] = cat;
		}
	},

	showInfo () {
		$('input.paddingX').val(store.map.points.paddingX);
		$('input.paddingY').val(store.map.points.paddingY);
		$('input.sizePointer').val(store.map.points.size);

		$('.switch.showAllPoint').removeClass('switch-on').removeClass('switch-off')
		if(store.points.showAll){
			$('.switch.showAllPoint').addClass('switch-on');
		}else{ 
			$('.switch.showAllPoint').addClass('switch-off'); 
		}

		$('.switch.translateModulo').removeClass('switch-on').removeClass('switch-off')
		if(store.map.points.translate){
			$('.switch.translateModulo').addClass('switch-on');
		}else{ 
			$('.switch.translateModulo').addClass('switch-off'); 
		}

		var addHtml = '';
		for(var i = 0, iMax = store.points.types.length; i < iMax; i++){
			addHtml += '<option>'+store.points.types[i].name+'</option>'
		}

		$('select[name="main_kind"]').html(addHtml);

		//console.log( 'points', store.map.points );


		$('select[name="main_kind"] option').eq(store.map.points.type).attr('selected','selected');

		this.createDb();
		canvas.draw(); 
	}
}
