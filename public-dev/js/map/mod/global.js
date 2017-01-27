// ╔═╗╦  ╔═╗╔╗ ╔═╗╦  
// ║ ╦║  ║ ║╠╩╗╠═╣║  
// ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝

//funkcje globalne kontener na wszystko i nic ;)
export default {
	toogle_panel (e) {
		e = e || window.e; //latka dla mozilli
		if( $(e.target).parent().css('right') == '0px' ){
			$(e.target).parent().animate({right: [-$(e.target).parent().width()-20,"swing"]}, 1000, function() {});
    }
    else{
    	 $(e.target).parent().animate({right: ["0px","swing"]}, 1000, function() {});
    }
	}
}
