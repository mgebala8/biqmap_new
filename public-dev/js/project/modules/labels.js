// ╦  ╔═╗╔╗ ╔═╗╦  ╔═╗
// ║  ╠═╣╠╩╗║╣ ║  ╚═╗
// ╩═╝╩ ╩╚═╝╚═╝╩═╝╚═╝

import layers from './layers';
import labels from './labels';

export default {

	show : function(){
		$('#layers .label_layer').val( layers.labels[layers.active] );
	},

	edit : function(obj) {
		layers.labels[layers.active] = $(obj).val();
	}
}


