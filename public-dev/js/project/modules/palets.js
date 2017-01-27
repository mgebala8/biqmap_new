// ╔═╗╔═╗╦  ╔═╗╔╦╗╔═╗
// ╠═╝╠═╣║  ║╣  ║ ╚═╗
// ╩  ╩ ╩╩═╝╚═╝ ╩ ╚═╝

import categories from './categories';
import excel from './excel';
import layers from './layers';
import legends from './legends';
import palets from './palets';
import store from './store';

export default {
  
  //val_max : null,
  //val_min : null,
  //val_interval : null,   
  //palets_active : 0,
  //value : -1, 
  //category : -1,

  //podstawowe palety kolorów ( ostatnia paleta jest naszą własną do zdefiniowania )


  show : function(){
    this.show_color();
    this.show_palets();
    this.show_select();
    //layers.data.color_active[layers.active] = layers.colors_active[layers.active];
  },

  show_select : function(){
    
    var l_excel = store.layers[store.project.layers.active].excel;

    //wyświetlamy panel do wyboru kolumny kategorii
    var add_html = '<option col="-1">wybierz</option>';
    for(var i = 0, i_max = l_excel.data[0].length;  i < i_max; i++){
      if(l_excel.data[0][i]!= ''){
        if(i == layers.category[layers.active]){
          add_html += '<option col="'+i+'" selected>' +l_excel.data[0][i]+ '</option>';  
        }
        else{
          add_html += '<option col="'+i+'">' +l_excel.data[0][i]+ '</option>';  
        }
      }
    }

    $('#excel_box select.category').html( add_html );

    //wyświetlamy panel do wyboru kolumny wartości
    add_html = '<option col="-1">wybierz</option>';
    for(var i = 0, i_max = l_excel.data[0].length;  i < i_max; i++){
      if(l_excel.data[0][i]!= ''){
        if(i == layers.value[layers.active]){
          add_html += '<option col="'+i+'" selected>' +l_excel.data[0][i]+ '</option>';  
        }
        else{
          add_html += '<option col="'+i+'">' +l_excel.data[0][i]+ '</option>';  
        }
      }
    }
    $('#excel_box select.value').html( add_html );

    //kolorujemy odpowiednio excela
    $('#excel_wrapper .td').removeClass("value");
    $('#excel_wrapper .td').removeClass("category");
    
    if( layers.value[layers.active] != -1){
      $('#excel_wrapper .td[col="'+(layers.value[layers.active]+1)+'"]').addClass("value");
    }

    if( layers.category[layers.active] != -1){
      $('#excel_wrapper .td[col="'+(layers.category[layers.active]+1)+'"]').addClass("category");
    }
  },

  //wybieramy kolumnę kategorii (obszarów)
  set_category : function(obj){
    layers.category[layers.active] = parseFloat($("#excel_box select.category option:selected").attr('col'));
    $('#excel_wrapper .td').removeClass("category");
    $('#excel_wrapper .td[col="'+(layers.category[layers.active]+1)+'"]').addClass("category");
    //categories.update_color();
  }, 

  //wybieramy kolumne wartości i ustawiamy najmniejszą i największą wartość
  set_value : function(obj){
    var l_excel = store.layers[store.project.layers.active].excel;
    var value_tmp = parseFloat($("#excel_box select.value option:selected").attr('col'));


    //zabezpieczenie przed wybraniem kolumny zawierającej tekst
    var check = true;
    for(var i = 1, i_max = l_excel.data.length; i < i_max; i++){
      if ((!$.isNumeric(String(l_excel.data[i][value_tmp]).replace(',','.'))) &&  (l_excel.data[i][value_tmp] != '')){ 

        check = false;
        console.log('to nie jest liczba!: '+l_excel.data[i][value_tmp]);
       }
    }

    //sprawdzamy czy w zaznaczonej kolumnie znajduje się wiersz z tekstem
    if(check){
      //jesli nie wybieramy daną kolumnę
      layers.value[layers.active] = value_tmp;
      $('#excel_wrapper .td').removeClass("value");
      $('#excel_wrapper .td[col="'+(layers.value[layers.active]+1)+'"]').addClass("value");
      this.set_min_max_value();
    }
    else{
      //jeśli tak zwracamy błąd
      alert('wybrana kolumna zawiera wartości tekstowe')
      this.show_select();
    }

  },

  set_min_max_value : function(){ 

    var l_excel = store.layers[store.project.layers.active].excel;
    var tmp_value = layers.value[layers.active];
    if(tmp_value != -1){
      //wyszukujemy najmniejsza i największą wartość w kolumnie wartości
      if( layers.value[tmp_value] != -1 ){
        
        var tmp_min = parseFloat(String(l_excel.data[1][tmp_value]).replace(',','.'));
        var tmp_max =  parseFloat(String(l_excel.data[1][tmp_value]).replace(',','.'));

        for(var i = 1, i_max = l_excel.data.length; i < i_max; i++){

          var num_tmp = parseFloat(String(l_excel.data[i][tmp_value]).replace(',','.'));

          if((tmp_min > num_tmp) && (num_tmp != "")){ tmp_min = num_tmp; }
          if((tmp_max < num_tmp) && (num_tmp != "")){ tmp_max = num_tmp; }
        }
        //console.log("min max value: ",tmp_min, tmp_max);
      }
      
      console.log('wynik: ',tmp_min,tmp_max);

      layers.min_value[layers.active] = tmp_min
      layers.max_value[layers.active] = tmp_max;

      //aktualizujemy tablicę legend
      legends.update();
    }
  },

  show_color : function(){
    //wyświetlamy pierwszalistę kolorów
    var html = ''; 
 
    for (var i = 0, i_max = this.colors[0].length; i<i_max; i++){

      if(layers.colors_pos[layers.active][i] == 1){
        html += '<span class="active" style="background:'+this.colors[layers.palets_active[layers.active]][i]+'"></span>';
      }
      else{
        html += '<span style="background:'+this.colors[layers.palets_active[layers.active]][i]+'"></span>';
      }
    }

    $('#palets #select').html( html );
    
    $('#palets #select > span').click(function(){ palets.select_color(this); });

  },

  show_palets : function(){
    
    //wyswietlamy wszystkie palety
    var html = '';
    for (var i = 0, i_max = this.colors.length;i < i_max; i++){
      
      if(i == layers.palets_active[layers.active]){
        html += '<span class="active">';
      }
      else{
        html += '<span>';
      }

      for (var j = 0, j_max = this.colors[0].length; j < j_max; j++){
        html += '<span style="background:' + this.colors[i][j] + '"></span>';
      }
      html += '</span>';

    }
    $('#palets #all').html( html );
    $('#palets #all > span').click(function(){ palets.select_palets(this);});
 
  },

  //zaznaczamy konkretne kolory do wyświetlenia
  select_color : function(obj){
    if((layers.value[layers.active] != -1) && (layers.category[layers.active] != -1)){
      if( $(obj).hasClass('active') ){
        layers.colors_pos[layers.active][$(obj).index()] = 0;
        $(obj).removeClass('active');
      }
      else{
        layers.colors_pos[layers.active][$(obj).index()] = 1;
        $(obj).addClass('active');
      }
      this.parse_color();
      palets.set_min_max_value();
    }
  },

  //dodajemy do tablicy aktywnych kolorów te które są zaznaczone
  parse_color : function(){
    layers.colors_active[layers.active] = [];
     for (var i = 0, i_max = this.colors[0].length; i<i_max; i++){

      if( $('#palets #select span').eq(i).hasClass('active') ){
        layers.colors_active[layers.active].push( rgb2hex($('#palets #select span').eq(i).css('background-color')) );
      }
     }
    //categories.color_from_excel();
    //funkcja pomocnicza
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    legends.update();
  },

  //zaznaczamy palete kolorów
  select_palets : function(obj){
    if((layers.value[layers.active] != -1) && (layers.category[layers.active] != -1)){
      $('#palets #all > span').removeClass('active');
      $(obj).addClass('active');
      layers.palets_active[layers.active] = $(obj).index();
      
      //aktualizujemy paletę aktywnych kolorów
      layers.colors_active[layers.active] = [];
      for(var i = 0, i_max = layers.colors_pos[layers.active].length; i < i_max; i++){
        if(layers.colors_pos[layers.active][i] == 1){
          layers.colors_active[layers.active].push( palets.colors[layers.palets_active[layers.active]][i] );
        }
      }

      //aktualizujemy kolory w legendzie
      for(var i = 0, i_max = layers.legends[layers.active].length; i < i_max; i++){
        layers.legends[layers.active][i][3] = layers.colors_active[layers.active][i];
      }

      //wyświetlamy okna kolorów do zaznaczenia
      palets.show_color();
      //wyświetlamy okno z legendami
      legends.show();

      //aktualizujemy kolory na mapie
      categories.update_color();
    }
  }
}

