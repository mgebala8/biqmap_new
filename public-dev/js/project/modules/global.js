// ╔═╗╦  ╔═╗╔╗ ╔═╗╦  
// ║ ╦║  ║ ║╠╩╗╠═╣║  
// ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝

//funkcje globalne kontener na wszystko i nic ;)
export default {
	toogle_right  : (obj) => {
		//panel jest z prawej strony
		if( $(obj).parent().css('right') == '0px' ){
			$(obj).parent().animate({right: [-$(obj).parent().width()-20,"swing"]}, 1000, function() {});
    }
    else{
    	 $(obj).parent().animate({right: ["0px","swing"]}, 1000, function() {});
    } 
	},
	toogle_left  : (obj) => {
		//panel jest z lewej strony
		if( $(obj).parent().css('left') == '0px' ){
			$(obj).parent().animate({left: [-$(obj).parent().width()-20,"swing"]}, 1000, function() {});
    }
    else{
    	 $(obj).parent().animate({left: ["0px","swing"]}, 1000, function() {});
	  }
	},

  setCookie : (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie : (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
  },

  //dodajemy blokadę przed odświeżeniem strony
  refreshLock : (e) => {
    window.onbeforeunload = (e) => {
      if (typeof e == 'undefined') {
        e = window.event;
      }
      if (e) {
        if(!confirm('Czy chcesz opuścić tę stronę')) return false
      }
    }
  }
}  