'use strict';
function dataBitschart() {
  		 var Prueba;
		 var select;
		 var bitsWidth, bitsHeight, bitsBorder;
		 var colorText, colorBorder, fontSize;
		 var xPosBit = 350;
		 var xPosValue = 50;
		 var dataText, dataBit;
		 var updateText = false, updateBits = false;

		 // create the chart  		 
		 var dataBits = function(s) {
    	 select = s;
    	 if (select == undefined) {
      	 	console.error("selection is undefined");
      		return;
    	 };
		 
		 //creo el svg para el dashboard
    	 var dashboard = select.append("svg")
         	 .attr("width", bitsWidth)
        	 .attr("height", bitsHeight)
        	 .style("border", function(d) { 
          	 	if (bitsBorder) return "1px solid lightgray"; 
          		else return null;
        	    });


		//Escribo los dispositivos de los cuales se visualizará el estado
		var bitArray = [
						'EMR',
						'FBR',
						'BFR',
						'PCCR',
						'Tracción',
						'Confirm',
						'Pos emer',
						'Freno serv',
						'Adelante',
						'Retroceso',
						'Interr Prueba',
						'EMR FB',
						'FBR FB',
						'BFR FB',
						'CHR FB',
						'Fall simul 3eje',
						'Pos compensada',
						'Desliz TG1',
						'Giro vacío TG1',
						'Desliz TG2',
						'Giro vacío TG2',
						'Cont Falla Vel',
						'Desconexión Bobina',
						'Acop TG Rot',
						'END1',
						'END2',
						'Vía Principal',
						'Vía de Playa'
					   ];
		 
		//busco los parametros en el servidor
		//Escibo los textos de los parámetros
		//Dibujo las celdas donde se van a mostrar los valores de los parámetros
		//fecha y hora
		dashboard.append('rect')
				.attr('height','100')
				.attr('width','280')
				.attr('x',xPosValue-10)
				.attr('y','5')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(0, 4))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 20 + (24*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		//velocidades ATS
		dashboard.selectAll('rect')
				.data(textArray.slice(4, 12))
				.enter().append('rect')
        		.attr('height','21')
        		.attr('width','265')
        		.attr('fill',function(d){return d.color;})
        		.attr('x',xPosValue-5)
        		.attr('y',function(d, i){return 90 + (24*i);});
		 
		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(5, 12))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 125 + (24*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});
		
		//velocidades TG
		dashboard.append('rect')
				.attr('height','143')
				.attr('width','280')
				.attr('x',xPosValue-10)
				.attr('y','288')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(22, 28))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 300 + (19*i);})
				.attr('font-size',12)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(21, 22))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 414 + (0*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;}); 
			

		//Distancia
		dashboard.append('rect')
				.attr('height','143')
				.attr('width','280')
				.attr('x',xPosValue-10)
				.attr('y','440')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(4, 5))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 455 + (19*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(18, 19))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 473 + (19*i);})
				.attr('font-size',12)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(16, 21))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 493 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;}); 
					
		//configuracion
		dashboard.append('rect')
				.attr('height','104')
				.attr('width','280')
				.attr('x',xPosValue-10)
				.attr('y','593')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(12, 15))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 608 + (24*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(17, 18))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosValue)
				.attr('y',function(d,i){return 680 + (24*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		//Estado de operacion/Falla
		dashboard.append('rect')
				.attr('height','135')
				.attr('width','280')
				.attr('x',xPosBit-10)
				.attr('y','5')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(15, 17))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 20 + (24*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(10, 11))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 68 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;}); 

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(15, 16))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 87 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;}); 

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(22, 24))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 106 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});
				
		//Frecuencia leida
		dashboard.append('rect')
				.attr('height','67')
				.attr('width','280')
				.attr('x',xPosBit-10)
				.attr('y','150')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');
				
		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(19, 22))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 165 + (19*i);})
				.attr('font-size',fontSize)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

		//Estado de entradas ATS
		dashboard.append('rect')
				.attr('height','200')
				.attr('width','280')
				.attr('x',xPosBit-10)
				.attr('y','228')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(6, 8))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 243 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(4, 5))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 281 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(8, 10))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 300 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(5, 6))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 338 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(24, 28))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 357 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		//Bits de Freno/corte de traccion
		dashboard.append('rect')
				.attr('height','160')
				.attr('width','280')
				.attr('x',xPosBit-10)
				.attr('y','438')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(0, 4))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 453 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});

		dashboard.append('text').selectAll('tspan')
				.data(bitArray.slice(11, 15))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 529 + (19*i);})
				.attr('font-size', 12)
				.attr('font-family','sans-serif')
				.attr('stroke-width','none')
				.attr('stroke','none')
				.attr('fill',colorText)
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d;});
		
		//Informacion adicional
		dashboard.append('rect')
				.attr('height','90')
				.attr('width','280')
				.attr('x',xPosBit-10)
				.attr('y','607')
				.attr('rx','5')
				.attr('ry','5')
				.attr('fill','none')
				.attr('stroke','#666');

		dashboard.append('text').selectAll('tspan')
				.data(textArray.slice(28, 33))
				.enter().append('tspan')
				.attr('class', 'fText')
				.attr('x', xPosBit)
				.attr('y',function(d,i){return 620 + (17*i);})
				.attr('font-size',12)
				.attr('font-family','sans-serif')
				.attr('fill', function(d){return d.color_text;})
				.attr('text-anchor','left')
				.attr('dominant-baseline','middle')
				.text(function(d){return d.name;});

//------------------------------------------------------------------------------------------------------------------				
		//dibujo los LEDS que representan el estado de los dispositivos
		
		qUpdateText();
		qUpdateBits();

		function qUpdateText(){
			if (updateText == true){
		   	   updateText = false;
		   	   updateDataText();
    		}
			setTimeout(function(){ qUpdateText() }, 1);		
    	}		
		
		function qUpdateBits(){
			if (updateBits == true){
		   	   updateBits = false;
		   	   updateDataBits();
    		}
			setTimeout(function(){ qUpdateBits() }, 1);		
    	}		


		function updateDataText(){
				 dashboard.selectAll('.rText').remove();
				
				 //fecha y hora
				 dashboard.append('text').selectAll('tspan')
    			 	.data(dataText.slice(0,4))
    				.enter().append('tspan')
					.attr('class', 'rText')
    				.attr('x', xPosValue + 145)
    				.attr('y',function(d,i){return 21 + (24*i);})
    				.attr('font-size', fontSize)
					.attr('font-family','sans-serif')
    				.attr('stroke-width','none')
    				.attr('stroke','none')
    				.attr('fill', function(d, i){return textArray[i + 0].color_text;})
    				.attr('text-anchor','left')
    				.attr('dominant-baseline','middle')
					.text(function(d){return d;});
					
				 //VELOCIDAD ATS
				 dashboard.append('text').selectAll('tspan')
    			 	.data(dataText.slice(5,12))
    				.enter().append('tspan')
					.attr('class', 'rText')
    				.attr('x', xPosValue + 145)
    				.attr('y',function(d,i){return 125 + (24*i);})
    				.attr('font-size', fontSize)
					.attr('font-family','sans-serif')
    				.attr('stroke-width','none')
    				.attr('stroke','none')
    				.attr('fill', function(d, i){return textArray[i + 5].color_text;})
    				.attr('text-anchor','left')
    				.attr('dominant-baseline','middle')
					.text(function(d){return d;});
	
				//velocidad TG
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(22,28))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosValue + 145)
					.attr('y',function(d,i){return 300 + (19*i);})
					.attr('font-size', 12)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 22].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				//distancia
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(4,5))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosValue + 145)
					.attr('y',function(d,i){return 455 + (19*i);})
					.attr('font-size', 12)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 4].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(18,19))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosValue + 145)
					.attr('y',function(d,i){return 473 + (19*i);})
					.attr('font-size', 12)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 18].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				//configuracion
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(12,15))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosValue + 145)
					.attr('y',function(d,i){return 608 + (24*i);})
					.attr('font-size', fontSize)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 12].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(17,18))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosValue + 145)
					.attr('y',function(d,i){return 680 + (24*i);})
					.attr('font-size', fontSize)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 17].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				//Estado de operacion/Falla
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(15,17))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosBit + 145)
					.attr('y',function(d,i){return 20 + (24*i);})
					.attr('font-size', fontSize)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 15].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});

				//frecuencia leida
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(19,22))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosBit + 145)
					.attr('y',function(d,i){return 165 + (19*i);})
					.attr('font-size', 12)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 19].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});
				
				//Informacion adicional
				dashboard.append('text').selectAll('tspan')
					.data(dataText.slice(28,33))
					.enter().append('tspan')
					.attr('class', 'rText')
					.attr('x', xPosBit + 145)
					.attr('y',function(d,i){return 620 + (17*i);})
					.attr('font-size', 12)
					.attr('font-family','sans-serif')
					.attr('stroke-width','none')
					.attr('stroke','none')
					.attr('fill', function(d, i){return textArray[i + 28].color_text;})
					.attr('text-anchor','left')
					.attr('dominant-baseline','middle')
					.text(function(d){return d;});


		}
		
		function updateDataBits(){
				 dashboard.selectAll('circle').remove();
				
				 //velocidad
				 dashboard.selectAll('.shape')
					.data(dataBit.slice(21, 22))
					.enter().append('circle')
    				.attr('cx', xPosValue+147)
    				.attr('cy',function(d,i){return 414 + (0*i);})
    				.attr('r', '8')
    				.attr('fill',function(d,i){
						var pintar = 'none';
        				if (d==1) pintar = '#008800';
        				else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
        		
        				return pintar;
    				})
    				.attr('stroke',colorBorder)
    				.attr('stroke-width','1');
				 
				 //posicion
				 dashboard.selectAll('.shape')
					.data(dataBit.slice(16, 21))
					.enter().append('circle')
    				.attr('cx', xPosValue+147)
    				.attr('cy',function(d,i){return 493 + (19*i);})
    				.attr('r', '8')
    				.attr('fill',function(d,i){
						var pintar = 'none';
        				if (d==1) pintar = '#008800';
        				else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
        		
        				return pintar;
    				})
    				.attr('stroke',colorBorder)
    				.attr('stroke-width','1');

				//Estado de operacion/Falla
				dashboard.selectAll('.shape')
					.data(dataBit.slice(10, 11))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 68 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(15, 16))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 87 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(22, 24))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 106 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				//Estado de entradas ATS
				dashboard.selectAll('.shape')
					.data(dataBit.slice(6, 8))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 243 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(4, 5))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 281 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(8, 10))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 300 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(5, 6))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 338 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(24, 28))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 357 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				//Bits freno/Traccion
				dashboard.selectAll('.shape')
					.data(dataBit.slice(0, 4))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 453 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

				dashboard.selectAll('.shape')
					.data(dataBit.slice(11, 15))
					.enter().append('circle')
					.attr('cx', xPosBit+147)
					.attr('cy',function(d,i){return 529 + (19*i);})
					.attr('r', '8')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#008800';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

					//info general
				dashboard.selectAll('.shape')
					.data(dataBit.slice(28, 29))
					.enter().append('circle')
					.attr('cx', xPosBit+215)
					.attr('cy',function(d,i){return 688 + (17*i);})
					.attr('r', '6')
					.attr('fill',function(d,i){
						var pintar = 'none';
						if (d==1) pintar = '#AAAA00';
						else if (d==0) pintar = '#aa0000';
						else pintar = 'gray'
				
						return pintar;
					})
					.attr('stroke',colorBorder)
					.attr('stroke-width','1');

  				}
  		}
		
  		// Prueba
  		dataBits.Prueba = function(_) {
    		if (arguments.length == 0) return Prueba;
    		Prueba = _;
    		return dataBits;       
  		}

  		// svg width
  	    dataBits.width = function(_) {
    		if (arguments.length == 0) return bitsWidth;
    		bitsWidth = _;
    		return dataBits;       
  		}

  		// svg height
  		dataBits.height = function(_) {
    		if (arguments.length == 0) return bitsHeight;
    		bitsHeight = _;
    		return dataBits;       
  		}

  		// svg border
  		dataBits.border = function(_) {
    		if (arguments.length == 0) return bitsBorder;
    		bitsBorder = _;
    		return dataBits;       
  		}

  		dataBits.colorText = function(_) {
    		if (arguments.length == 0) return colorText;
    		colorText = _;
    		return dataBits;       
  		}
		
  		dataBits.colorBorder = function(_) {
    		if (arguments.length == 0) return colorBorder;
    		colorBorder = _;
    		return dataBits;       
  		}
		
  		dataBits.fontSize = function(_) {
    		if (arguments.length == 0) return fontSize;
    		fontSize = _;
    		return dataBits;       
  		}

  		dataBits.dataText = function(_) {
    		if (arguments.length == 0) return dataText;
    		dataText = _;
			updateText = true;
			return dataBits;
  		}
		
  		dataBits.dataBit = function(_) {
    		if (arguments.length == 0) return dataBit;
    		dataBit = _;
			updateBits = true;
			return dataBits;
  		}
		
		return dataBits;		

}