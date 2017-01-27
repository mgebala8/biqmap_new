// ┌─┐┌┬┐┌─┐┬─┐┌─┐
// └─┐ │ │ │├┬┘├┤ 
// └─┘ ┴ └─┘┴└─└─┘

export default {

	map : {
		
		//obiekt przechowujący dane dotyczące zdjęcia	
		image : {
			src : null,
			x : 0,
			y : 0,
			width : 0,
			height : 0,
			alpha : 1
		},

		//obiekt przechowujący podstawowe dane dotyczące mapy
		title : '',

		canvas : {
			width : 700,
			height : 400,
		},

		points : {
			paddingX : 1, 
			paddingY : 1,
			translate : false,
			size : 10,
			type : 2, 
			
			//dwu wymiarowa tablica zawierająca wszystkie dane dotyczące punktów [row][col] 
			db : []
		},

		//tablica zawierająca obiekty kategorii (pierwszy obiekt jest kategorią domyślną / pustą )
		categories : [{
			name : 'empty',
			color : '#808080'
		}]
	
	},

	//hash mapy na której pracujemy
	mapHash : null,

	mapsList : [],

	//objekt przechowujący dane canvasa
	canvas : {
		obj : null,
		ctx : null,
		ctxX : 0,
		ctxY : 0,
		ctxNewX : 0,
		ctxNewY : 0,

		offsetLeft : 0,
		offsetTop : 0,
		scale : 100,
	},

	image : {
		obj : null
	},

	categories : {
		colorDefault : '#ff0000'
	},
 
	points : {
		activeRow : 0,
		activeCol : 0,
		lastRow : 0,
		lastCol : 0,
		showAll : true,

		//główne typy punktów
		types: [{
			id : 'square',
			name : 'kwadrat'
		},
		{
			id : 'circle',
			name : 'koło'
		},
		{
			id : 'hexagon',
			name : 'plaster miodu I'
		},
		{
			id : 'hexagon2',
			name : 'plaster miodu II'
		}]

	},

	//zmienne pomocnicze obiektu menu Top
	menuTop : {
		moveImage : false,
		moveCanvas : false,
		autoDraw : false,
		rubber : false,
		modeKey : true,
		disableSelect : false,
		category : 0
	},

	mouse : {
		mouseDown : false,
		clickObj : null,

		tmpX : null, //zmienne tymczasowe umożliwiające przesuwanie tła
		tmpY : null, //zmienne tymczasowe umożliwiające przesuwanie tła

		x : null, //pozycja x myszki
		y : null, //pozycja y myszki
		paddingX : null, //pozycja x myszki od górnej krawędzi
		paddingY : null, //pozycja y myszki od górnej krawędzi
		offsetX : null, //offset x obiektu klikniętego
		offsetY : null, //offset y obiektu klikniętego
	},

	colpick : {
		clickId : null,
	}


}