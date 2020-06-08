'use strict';
function dataTableChart() {
  		 var Prueba;
         var select;
         var data, rowView;
		 var tableWidth, tableHeight, tableBorder;
         var updateTable = false;
         var pageActual = 0;
         var rows = [];
         var headers = [
                    ["tipo","fecha","hora","fecha ats","hora ats","descripción","acción recomendada"]
            ];

		 // create the chart  		 
		 var dataTables = function(s) {
    	 select = s;
    	 if (select == undefined) {
      	 	console.error("selection is undefined");
      		return;
    	 };
		 
		 //creo el svg para el dashboard        
        var table = select.append('table')
                .style("border-collapse", "collapse")
                .style("border", "2px black solid")
                .attr("width", tableWidth)
                .attr("height", tableHeight)
                .style("border", function(d) { 
                      if (tableBorder) return "1px solid lightgray"; 
                     else return null;
                   });
                // headers
        table.append("thead").append("tr")
                .selectAll("th")
                .data(headers[0])
                .enter().append("th")
                .text(function(d) { return d; })
                .style("border", "1px black solid")
                .style("border-color", "#404040")
                .style("padding", "5px")
                .style("background-color", "black")
                .style("font-weight", "bold")
                .style("color", "white")
                .style('font-family','sans-serif')    
                .style("text-transform", "uppercase");

   
        select.append('button')
                   .text("<<")
                   .attr("id", "btnPrevtIdFull")
                   .attr("class", "btnPrevFull")
                   .attr('font-size', '16px')
                   .attr('font-family','sans-serif')
                   .style('color', window.colorText)
                   .style('background-color', '#000')
                   .on('mouseover', function(){
                           d3.select(".btnPrevFull")
                               .style('color', '#00FFFF')
                               .style('cursor', 'pointer');
                       }
                   )
                   .on('mouseout', function(){
                       d3.select(".btnPrevFull")
                           .style('color', window.colorText)
                           .style('cursor', 'default');
                       }
                    )
                   .on('click', function(){
                        if (pageActual>0){
                            pageActual = 0;
                            updateDataTable();
                        }
                      }
                   );                   
   

        select.append('button')
                .text("<")
                .attr("id", "btnPrevtId")
                .attr("class", "btnPrev")
                .attr('font-size', '16px')
                .attr('font-family','sans-serif')
                .style('color', window.colorText)
                .style('background-color', '#000')
                .on('mouseover', function(){
                        d3.select(".btnPrev")
                            .style('color', '#00FFFF')
                            .style('cursor', 'pointer');
                    }
                )
                .on('mouseout', function(){
                    d3.select(".btnPrev")
                        .style('color', window.colorText)
                        .style('cursor', 'default');
                    }
                 )
                .on('click', function(){
                    if (pageActual>0){
                        pageActual--;
                        updateDataTable();
                    }
                   }
                );                   

        var infoPage = select.append('text')
                .attr('class', 'rText')
                .attr('font-size', '12px')
                .attr('font-family','sans-serif')
                .attr('text-anchor','canter')
                .style('color', window.colorText)
                .attr('dominant-baseline','middle');

        select.append('button')
                .text(">")
                .attr("id", "btnNextId")
                .attr("class", "btnNext")
                .attr('font-size', '16px')
                .attr('font-family','sans-serif')
                .style('color', window.colorText)
                .style('background-color', '#000')
                .on('mouseover', function(){
                        d3.select(".btnNext")
                            .style('color', '#00FFFF')
                            .style('cursor', 'pointer');
                    }
                )
                .on('mouseout', function(){
                        d3.select(".btnNext")
                            .style('color', window.colorText)
                            .style('cursor', 'defaul');
                    }
                )
                .on('click', function(){
                    if (pageActual<(Math.ceil((rows.length)/rowView)-1)){
                        pageActual++;
                        updateDataTable();
                    }
                });

        select.append('button')
                .text(">>")
                .attr("id", "btnNextIdFull")
                .attr("class", "btnNextFull")
                .attr('font-size', '16px')
                .attr('font-family','sans-serif')
                .style('color', window.colorText)
                .style('background-color', '#000')
                .on('mouseover', function(){
                        d3.select(".btnNextFull")
                            .style('color', '#00FFFF')
                            .style('cursor', 'pointer');
                    }
                )
                .on('mouseout', function(){
                        d3.select(".btnNextFull")
                            .style('color', window.colorText)
                            .style('cursor', 'defaul');
                    }
                )
                .on('click', function(){
                    if (Math.ceil((rows.length)/rowView)>1){
                        pageActual = Math.ceil((rows.length)/rowView)-1;
                        updateDataTable();
                    }
                });

        var infoPage1 = select.append('text')
                .attr('class', 'rText')
                .attr('font-size', '12px')
                .attr('font-family','sans-serif')
                .attr('text-anchor','canter')
                .style('color', window.colorText)
                .attr('dominant-baseline','middle');
                
        
		qUpdateTable();
		
		function qUpdateTable(){
			if (updateTable == true){
		   	   updateTable = false;
		   	   updateDataTable();
    		}
			setTimeout(function(){ qUpdateTable() }, 1);		
    	}		
		

		function updateDataTable(){

                infoPage1.text ("     Total  " + String(rows.length) + " elementos");
                if (rows.length>0)  infoPage.text("  " + "Página  "+ String(pageActual + 1) + " de " + String(Math.ceil((rows.length)/rowView)) + "  ");
                else infoPage.text("  " + "Página  "+ String(pageActual + 1) + " de " + String(1) + "  ");
                table.selectAll("tbody").remove();
                
                // data
                table.append("tbody")
                  .selectAll("tr")
                  .data(rows.slice((pageActual*rowView), (pageActual+1)*rowView))
                  .enter().append("tr")
                  .style("background-color", function (d){ 
                        if (d.color == "red") return "#CC0000";
                        else return "#404040";
                  })
                  .style("color", function(d){
                        if (d.color == "red") return "white";
                        else return d.color;
                  })
                  .selectAll("td")
                  .data(function(d){return d.dato;})
                  .enter().append("td")
                  .style("border", "1px black solid")
                  .style("padding", "5px")
                  .text(function(d){return d;})
                  .style("font-size", "12px")
                  .style('font-family','sans-serif');              
        }
    }
				
  		// Prueba
  		dataTables.Prueba = function(_) {
    		if (arguments.length == 0) return Prueba;
    		Prueba = _;
    		return dataTables;       
  		}

  		// svg width
  	    dataTables.width = function(_) {
    		if (arguments.length == 0) return tableWidth;
    		tableWidth = _;
    		return dataTables;       
  		}

  		// svg height
  		dataTables.height = function(_) {
    		if (arguments.length == 0) return tableHeight;
    		tableHeight = _;
    		return dataTables;       
  		}

  		// svg border
  		dataTables.border = function(_) {
    		if (arguments.length == 0) return tableBorder;
    		tableBorder = _;
    		return dataTables;       
  		}

  		// svg border
  		dataTables.rowView = function(_) {
    		if (arguments.length == 0) return rowView;
    		rowView = _;
    		return dataTables;       
  		}

  		dataTables.data = function(_) {
    		if (arguments.length == 0) return data;
            data = _;
            rows.unshift(data);
			updateTable = true;
			return dataTables;
  		}

		return dataTables;		

}