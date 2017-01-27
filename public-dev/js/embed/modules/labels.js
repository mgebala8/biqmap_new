// ╦  ╔═╗╔╗ ╔═╗╦  ╔═╗
// ║  ╠═╣╠╩╗║╣ ║  ╚═╗
// ╩═╝╩ ╩╚═╝╚═╝╩═╝╚═╝

import layers from './layers';
import labels from './labels';

export default {
	show : function(){
		$('#labels').html( layers.labels[layers.active] );
	}
} 