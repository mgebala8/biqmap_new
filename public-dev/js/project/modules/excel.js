// ╔═╗═╗ ╦╔═╗╔═╗╦  
// ║╣ ╔╩╦╝║  ║╣ ║  
// ╚═╝╩ ╚═╚═╝╚═╝╩═╝

import palets from './palets';

import store from './store';
import categories from './categories';

export default {

	init : function(){

		var that = this;
		//dodanie eventów przy kliknięciu excela
		$('#excel_box button').click(function(){ $('#excel_box input').click(); });
		$('#excel_box input').change(function(){ that.send_file(); });

		//funkcja tymczasowa do narysowania tabelki excela
		this.show();
	},

	//funkcja odpowiedziala za poprawne podpisanie osi
	show : function(){
			
		var l_excel = store.layers[store.project.layers.active].excel;

		var add_html = '';

		//jeśli ilośc wierszy jest większa aktualizujemy wielkość tablicy
		if(l_excel.data.length >= l_excel.min_row) l_excel.min_row = l_excel.data.length;
		if(l_excel.data[0].length >= l_excel.min_col) l_excel.min_col = l_excel.data[0].length+1;

		//renderujemy całą tablicę excel
		for(var i = 0;i < l_excel.min_row; i++){
			add_html += '<tr class="tr">';
			for(var j = 0;j < l_excel.min_col; j++){
				if((j == 0) && (i > 0)){
					add_html += '<td class="td" row="' + i + '" col="' + j + '" >'+ i +'</td>';
				}
				else{
					try{
						if(typeof(l_excel.data[i][(j-1)]) != "undefined"){
							add_html += '<td class="td" contenteditable="false" row="' + i + '" col="' + j + '">'+l_excel.data[i][(j-1)]+'</td>';
						}
						else{
							add_html += '<td class="td"  row="' + i + '" col="' + j + '"></td>';
						}
						//console.log(l_excel.data[i][(j+1)]);
					}catch(error){
						//console.log(error,i,j);
						add_html += '<td class="td" row="' + i + '" col="' + j + '"></td>';
					}
				}

			}
			add_html += '</tr>';
		}

		var that = this;
		
		$('#excel_box .table').html( add_html );

		$('#excel_box .table .td').dblclick(function(){ $(this).attr('contenteditable','true'); $(this).selectText(); });

		//dodajemy możliwość edycji excela
		$('#excel_box .table .td').keyup(function(){ that.edit(this); });

		$('#excel_box .table .td').blur(function(){ $(this).attr('contenteditable','false');  palets.show_select(); });

	},

	//funkcja umożliwiająca edycje zawartości komórki
	edit : function(obj){	
		var l_excel = store.layers[store.project.layers.active].excel;

		var val = $(obj).html()
		if($.isNumeric(val)) { val = parseFloat(val); }
		
		l_excel.data[$(obj).attr('row')][($(obj).attr('col')-1)] = val;
		categories.update_color();
	},

	//pobieramy plik, z inputa i wyłamy do backendu w celu sparsowania a następnie przypisujemy do tablicy i wyświetlamyw formie tabelski
	send_file : function() {
	
		var l_excel = store.layers[store.project.layers.active].excel;

		excel_form.append("excel_file", $("#excel_box input")[0].files[0]);

		var that = this;

 		$.ajax( {
      
      url: '/api/projects/excel_parse',
      type: 'POST',
      data: excel_form,
      processData: false,
      contentType: fals

    }).done(function( response ) {
    	
			$("#excel_box input").remove();
			$("#excel_box").append('<input type="file" />')
			$('#excel_box input').change(function(){ that.send_file(); });

    	//po wczytaniu pliku excel przypisujemy dane rysujemy na nowo tabelę oraz wyświetlamy wszystkie palety kolorów
			console.log( response )
    	l_excel.data = response.excel[0].l_excel.data;
    	that.transition(); 
    	that.show();
    	palets.show_select();
    });
	}, 

	//funckja zamieniająca krtopki na przecinki przy komórkach liczbowych
	transition : function(){
		
		var l_excel = store.layers[store.project.layers.active].excel;

		for(var i = 0, i_max = this.l_excel.data.length; i < i_max; i++){
			for(var j = 0, j_max = this.l_excel.data[0].length; j < j_max; j++){
				
				//usuwamy spacje występujące za lub przed tekstem
				this.l_excel.data[i][j] = $.trim(this.l_excel.data[i][j])

				//jeśli mamy pustą wartość null zamieniamy ją na zamknięty string
				if(this.l_excel.data[i][j] == null){ this.l_excel.data[i][j] = ''; }
				
				if($.isNumeric( this.l_excel.data[i][j] )){
					//console.log(excel.l_excel.data[i][j])
					this.l_excel.data[i][j] = String(this.l_excel.data[i][j]).replace('.',',');
				}

			}
		}
	}
}