// ╦╔╦╗╔═╗╔═╗╔═╗
// ║║║║╠═╣║ ╦║╣ 
// ╩╩ ╩╩ ╩╚═╝╚═╝

import canvas from './canvas';
import store from './store';

//główne zdjęcie od którego odrysowujemy mapy
export default {

	draw () {
		store.canvas.ctx.globalAlpha = store.map.image.alpha;
		store.canvas.ctx.drawImage(store.image.obj,store.map.image.x,store.map.image.y,store.map.image.width,store.map.image.height);

		$('#canvas_box #image_resize').css({'height':store.map.image.height,'top':store.map.image.y+'px','left':(store.map.image.x+store.map.image.width)+'px'});
		store.canvas.ctx.globalAlpha = 1;
	},

	add () {
		//jesli podany parametr nie jest pusty
		let srcImage = prompt("Podaj ścieżkę do zdjęcia: ");

		if(srcImage){
			if(srcImage.length > 0){

				store.image.obj = new Image(); 

				//wczytanie zdjęcia: 
				store.image.obj.onload = () => {
	    		store.map.image.width = store.image.obj.width;
	    		store.map.image.height = store.image.obj.height;
	    		this.draw(); 
	  		};

			  store.map.image.x = 0;
			  store.map.image.y = 0;
			  store.image.obj.src = srcImage;
			 	store.map.image.src = srcImage;
				//simage.obj.setAttribute('crossOrigin', 'anonymous');
			}
		}
	},

	//funkcja pomocnicza konwertująca dataURI na plik
	dataURItoBlob (dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
	}

}
