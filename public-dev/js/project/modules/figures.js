// ┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌─┐
// ├┤ ││ ┬│ │├┬┘├┤ └─┐
// └  ┴└─┘└─┘┴└─└─┘└─┘

import canvas from './canvas';

//funkcje rysujące pojedyńczy punkt (pointer)
export default {

	square : function(data){
		data.ctx.fillRect(data.x,data.y,data.size,data.size);
	},

	circle : function(data){
		data.size = data.size / 2;
		var center_x = data.x + data.size;
		var center_y = data.y + data.size;
		data.ctx.beginPath();
		data.ctx.arc(center_x, center_y, data.size, 0, 2 * Math.PI);
		data.ctx.fill();
	},

	hexagon  : function(data){
		var a = data.size/4;
		var a2 = data.size/2;
		var h = data.size/2*Math.sqrt(3)/2;

		data.ctx.beginPath();
		data.ctx.moveTo(data.x,data.y+a2);
    data.ctx.lineTo(data.x+a,data.y+a2-h);
  	data.ctx.lineTo(data.x+a+a2,data.y+a2-h);
		data.ctx.lineTo(data.x+data.size,data.y+a2);
		data.ctx.lineTo(data.x+data.size-a,data.y+a2+h);
		data.ctx.lineTo(data.x+a,data.y+a2+h);
		data.ctx.lineTo(data.x,data.y+a2);
		data.ctx.fill();
	},

	hexagon2 : function(data){
		var a = data.size/4;
		var a2 = data.size/2;
		var h = data.size/2*Math.sqrt(3)/2;

		data.ctx.beginPath();
		data.ctx.moveTo(data.x+a2,data.y);
    data.ctx.lineTo(data.x+a2+h,data.y+a);
  	data.ctx.lineTo(data.x+a2+h,data.y+a2+a);
    data.ctx.lineTo(data.x+a2,data.y+data.size);
    data.ctx.lineTo(data.x+a2-h,data.y+a2+a);
    data.ctx.lineTo(data.x+a2-h,data.y+a);
    data.ctx.lineTo(data.x+a2,data.y);
		data.ctx.fill();
	},

  square_border_small : function(data){

    if(data.line_width_y < 2){ var y_trans = -2; }
    else{ var y_trans = -3; }

    if(data.line_width_x < 3){ var x_trans = -2; }
    else{ var x_trans = -1*data.line_width_x; }

    if(data.border.top){
      data.ctx.fillRect(
        data.x+x_trans+1,
        data.y+y_trans+1,
        data.size+data.line_width_x+1,
        1
      );
    }

    if(data.border.top_left){
      data.ctx.fillRect(
        data.x+x_trans+1,
        data.y+y_trans+1,
        parseInt((data.size+data.line_width_x+1)/2),
        1
      );
    }

    if(data.border.top_right){
      data.ctx.fillRect(
        data.x+x_trans+1+parseInt((data.size+data.line_width_x+1)/2),
        data.y+y_trans+1,
        Math.ceil((data.size+data.line_width_x+1)/2),
        1
      );
    }

    if(data.border.right){
      if(data.line_width_x < 2){ var x_trans = -1; }
      else{ var x_trans = 0; }

      if(data.line_width_y < 2){ var y_trans = 2; }
      else{ var y_trans = data.line_width_y; }

      data.ctx.fillRect(
        data.x+data.size+x_trans+1,
        data.y-1,
        1,
        data.size+y_trans 
      );
    }
  },

  square_border_big : function(data){

    if(data.line_width_y < 2){ var y_trans = -2; }
    else{ var y_trans = -3; }

    if(data.line_width_x < 3){ var x_trans = -2; }
    else{ var x_trans = -1*data.line_width_x; }

    if(data.border.top){
      data.ctx.fillRect(
        data.x+x_trans,
        data.y+y_trans,
        data.size+data.line_width_x+3,
        3
      );
    }  

    if(data.border.top_left){
      data.ctx.fillRect(
        data.x+x_trans,
        data.y+y_trans,
        parseInt((data.size+data.line_width_x+3)/2),
        3
      );
    }

    if(data.border.top_right){
      data.ctx.fillRect(
        data.x+x_trans+parseInt((data.size+data.line_width_x+3)/2),
        data.y+y_trans,
        Math.ceil((data.size+data.line_width_x+3)/2),
        3
      );
    }

    if(data.border.right){
      if(data.line_width_x < 2){var x_trans = -1; }
      else{var x_trans = 0; }

      if(data.line_width_y < 2){ var y_trans = 2; }
      else{ var y_trans = data.line_width_y;}

      data.ctx.fillRect(
        data.x+data.size+x_trans,
        data.y,
        3,
        data.size+y_trans 
      );
    }
  }
}
