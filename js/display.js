'use strict';
function displayChart() {
        var dsplHeight, dsplWidth, Prueba, data, updateData = false;

        var select;

        //Posición y radio de los círculos de la alarma
        var radius = 3;
        var col = [62, 70, 78, 86, 94];
        var row = [55, 63, 71, 79, 87, 95, 103, 111, 119];
        //Línea y coordenadas para generar los path
        var line = d3.svg.line()
                .x(function(d){return d.x;})
                .y(function(d){return d.y});

        var segmentA = [
        {x:7.98 ,y:58},
        {x:40.36 ,y:58},
        {x:34.11 ,y:52.2},
        {x:12.62 ,y:52.2},
        {x:7.98 ,y:58}
        ];
        var segmentB = [
        {x:31.75 ,y:32.1},
        {x:34.51 ,y:51.8},
        {x:40.76 ,y:57.58},
        {x:36.79 ,y:29.2},
        {x:34.06 ,y:29.2},
        {x:31.75 ,y:32.1}
        ];
        var segmentC = [
        {x:32.8 ,y:0},
        {x:28.16 ,y:5.8},
        {x:30.93 ,y:25.5},
        {x:34.06 ,y:28.4},
        {x:36.79 ,y:28.4},
        {x:32.8 ,y:0}
        ];
        var segmentD = [
        {x:0 ,y:-0.4},
        {x:6.27 ,y:5.4},
        {x:27.76 ,y:5.4},
        {x:32.4 ,y:-0.4},
        {x:0 ,y:-0.4}
        ];        
        var segmentE = [
        {x:-0.4 ,y:0},
        {x:3.59 ,y:28.4},
        {x:6.32 ,y:28.4},
        {x:8.64 ,y:25.5},
        {x:5.87 ,y:5.8},
        {x:-0.4 ,y:0}
        ];
        var segmentF = [
        {x:3.59 ,y:29.2},
        {x:7.58 ,y:57.6},
        {x:12.22 ,y:51.8},
        {x:9.45 ,y:32.1},
        {x:6.32 ,y:29.2},
        {x:3.59 ,y:29.2}
        ];
        var segmentG = [
        {x:6.72 ,y:28.8},
        {x:9.85 ,y:31.7},
        {x:31.35 ,y:31.7},
        {x:33.66 ,y:28.8},
        {x:30.53 ,y:25.9},
        {x:9.04 ,y:25.9},
        {x:6.72 ,y:28.8}
        ];

        var dspl = function (s){
                select = s;

                if (select == undefined) {
                        console.error("selection is undefined");
                        return;
                };
   
        //creo el svg para el dashboard
        var displayATS = select.append("svg")
                .attr('height', dsplHeight)
                .attr('width', dsplWidth);                

        //Rectángulos-------------------------------------------------------------------------------------------------------------------------

        displayATS.append('rect')
                .attr('class','frame')
                .attr('height','200')
                .attr('width','330')
                .attr('x','10')
                .attr('y','10')
                .attr('rx','10')
                .attr('ry','10')
                .attr('fill','none')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','but1')
                .attr('height','20')
                .attr('width','40')
                .attr('x','155')
                .attr('y','125')
                .attr('fill','#002200')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','but2')
                .attr('height','20')
                .attr('width','40')
                .attr('x','205')
                .attr('y','125')
                .attr('fill','#002200')
                .attr('stroke','white');   
        displayATS.append('rect')
                .attr('class','corteTrac')
                .attr('height','20')
                .attr('width','40')
                .attr('x','255')
                .attr('y','125')
                .attr('fill','#220000')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','atsNorm')
                .attr('height','20')
                .attr('width','40')
                .attr('x','105')
                .attr('y','160')
                .attr('fill','#002200')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','avisoRev')
                .attr('height','20')
                .attr('width','40')
                .attr('x','155')
                .attr('y','160')
                .attr('fill','#220000')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','aplicATS')
                .attr('height','20')
                .attr('width','40')
                .attr('x','205')
                .attr('y','160')
                .attr('fill','#220000')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','atsPlaya')
                .attr('height','20')
                .attr('width','40')
                .attr('x','255')
                .attr('y','160')
                .attr('fill','#220000')
                .attr('stroke','white');
        displayATS.append('rect')
                .attr('class','backDisp')
                .attr('height','60')
                .attr('width','160')
                .attr('x','145')
                .attr('y','40')
                .attr('fill','black')
                .attr('stroke','white');         

        //Textos-------------------------------------------------------------------------------------------------------------------------

        displayATS.append('text')
                .attr('class','text1')
                .attr('x','171')
                .attr('y','139')
                .attr('font-size','12')
                .attr('fill','black')
                .text('1')
                .attr('fill','black')
                .attr('stroke','none');
        displayATS.append('text')
                .attr('class','text2')
                .attr('x','221')
                .attr('y','139')
                .attr('font-size','12')
                .attr('fill','black')
                .attr('stroke','none')
                .text('2');
        displayATS.append('text')
                .attr('class','textCorteTrac')
                .attr('x','267')
                .attr('y','133')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('Corte');
        displayATS.append('text')
                .attr('class','textCorteTrac')
                .attr('x','257')
                .attr('y','141')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('de Tracción');
        displayATS.append('text')
                .attr('class','textAtsNorm')
                .attr('x','118')
                .attr('y','169')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('ATS');
        displayATS.append('text')
                .attr('class','textAtsNorm')
                .attr('x','113')
                .attr('y','177')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('Normal');
        displayATS.append('text')
                .attr('class','textAvisoRev')
                .attr('x','167')
                .attr('y','169')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('Aviso');
        displayATS.append('text')
                .attr('class','textAvisoRev')
                .attr('x','157')
                .attr('y','177')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('de Reversa');
        displayATS.append('text')
                .attr('class','textAplicAts')
                .attr('x','210')
                .attr('y','169')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('Aplicación');
        displayATS.append('text')
                .attr('class','textAplicAts')
                .attr('x','213')
                .attr('y','177')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('de ATS');
        displayATS.append('text')
                .attr('class','textAtsPlaya')
                .attr('x','257')
                .attr('y','169')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('ATS en Vía');
        displayATS.append('text')
                .attr('class','textAtsPlaya')
                .attr('x','261')
                .attr('y','177')
                .attr('font-size','7')
                .attr('fill','black')
                .attr('stroke','none')
                .text('de playa');

        //Circulos-------------------------------------------------------------------------------------------------------------------------        

        displayATS.append('circle')
                .attr('r','25')
                .attr('class','confirm')
                .attr('cx','65')
                .attr('cy','165')
                .attr('fill','#333')
                .attr('stroke','white');
        displayATS.append('circle')
                .attr('r','11')
                .attr('class','confirm')
                .attr('cx','65')
                .attr('cy','165')
                .attr('fill','#333')
                .attr('stroke','white');        
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[2])
                .attr('cy', row[0])  
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r', radius)
                .attr('class','sound')
                .attr('cx', col[1])
                .attr('cy', row[1])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[3])
                .attr('cy', row[1])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[2])
                .attr('cy', row[2])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[0])
                .attr('cy', row[2])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[4])
                .attr('cy', row[2])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[1])
                .attr('cy', row[3])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[3])
                .attr('cy', row[3])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[2])
                .attr('cy', row[4])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[0])
                .attr('cy', row[4])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[4])
                .attr('cy', row[4])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[1])
                .attr('cy', row[5])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[3])
                .attr('cy', row[5])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[2])
                .attr('cy', row[6])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[0])
                .attr('cy', row[6])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[4])
                .attr('cy', row[6])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[1])
                .attr('cy', row[7])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[3])
                .attr('cy', row[7])
                .attr('fill','#111')
                .attr('stroke','#555');
        displayATS.append('circle')
                .attr('r',radius)
                .attr('class','sound')
                .attr('cx', col[2])
                .attr('cy', row[8])
                .attr('fill','#111')
                .attr('stroke','#555');

        //Path-------------------------------------------------------------------------------------------------------------------------

        displayATS.append('path')
                .attr('class','segA')
                .attr('id','ca')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentA));
        displayATS.append('path')
                .attr('class','segB')
                .attr('id','cb')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentB));
        displayATS.append('path')
                .attr('class','segC')
                .attr('id','cc')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentC));
        displayATS.append('path')
                .attr('class','segD')
                .attr('id','cd')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentD));
        displayATS.append('path')
                .attr('class','segE')
                .attr('id','ce')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentE));
        displayATS.append('path')
                .attr('class','segF')
                .attr('id','cf')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentF));
        displayATS.append('path')
                .attr('class','segG')
                .attr('id','cg')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(160,93) scale(0.8, -0.8)")
                .attr('d',line(segmentG));
        //----------------------------------------------------------------------------------------
        displayATS.append('path')
                .attr('class','segA')
                .attr('id','da')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentA));
        displayATS.append('path')
                .attr('class','segB')
                .attr('id','db')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentB));
        displayATS.append('path')
                .attr('class','segC')
                .attr('id','dc')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentC));
        displayATS.append('path')
                .attr('class','segD')
                .attr('id','dd')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentD));
        displayATS.append('path')
                .attr('class','segE')
                .attr('id','de')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentE));
        displayATS.append('path')
                .attr('class','segF')
                .attr('id','df')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentF));
        displayATS.append('path')
                .attr('class','segG')
                .attr('id','dg')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(210,93) scale(0.8, -0.8)")
                .attr('d',line(segmentG));
        //----------------------------------------------------------------------------------------
        displayATS.append('path')
                .attr('class','segA')
                .attr('id','ua')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentA));
        displayATS.append('path')
                .attr('class','segB')
                .attr('id','ub')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentB));
        displayATS.append('path')
                .attr('class','segC')
                .attr('id','uc')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentC));
        displayATS.append('path')
                .attr('class','segD')
                .attr('id','ud')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentD));
        displayATS.append('path')
                .attr('class','segE')
                .attr('id','ue')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentE));
        displayATS.append('path')
                .attr('class','segF')
                .attr('id','uf')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentF));
        displayATS.append('path')
                .attr('class','segG')
                .attr('id','ug')
                .attr('fill','#440000')
                .attr('stroke','none')
                .attr("transform", "translate(260,93) scale(0.8, -0.8)")
                .attr('d',line(segmentG));

        //Lógica-------------------------------------------------------------------------------------------------------------------------

        function update (){
                if (data.light1){
                        d3.select(".but1").attr('fill','green');
                        d3.selectAll(".text1").attr('fill','white');
                }
                else{
                        d3.select(".but1").attr('fill','#002200');
                        d3.selectAll(".text1").attr('fill','black');
                }        

                if (data.light2){
                        d3.select(".but2").attr('fill','green');
                        d3.selectAll(".text2").attr('fill','white');
                }
                else{
                        d3.select(".but2").attr('fill','#002200');
                        d3.selectAll(".text2").attr('fill','black');
                }        

                if (data.light3){
                        d3.select(".corteTrac").attr('fill','red');
                        d3.selectAll(".textCorteTrac").attr('fill','white');
                }
                else{
                        d3.select(".corteTrac").attr('fill','#220000');
                        d3.selectAll(".textCorteTrac").attr('fill','black');
                }        

                if (data.light4){
                        d3.select(".atsNorm").attr('fill','green');
                        d3.selectAll(".textAtsNorm").attr('fill','white');
                }
                else{
                        d3.select(".atsNorm").attr('fill','#002200');
                        d3.selectAll(".textAtsNorm").attr('fill','black');
                }        

                if (data.light5){
                        d3.select(".avisoRev").attr('fill','red');
                        d3.selectAll(".textAvisoRev").attr('fill','white');
                }
                else{
                        d3.select(".avisoRev").attr('fill','#220000');
                        d3.selectAll(".textAvisoRev").attr('fill','black');
                }        

                if (data.light6){
                        d3.select(".aplicATS").attr('fill','red');
                        d3.selectAll(".textAplicAts").attr('fill','white');
                }
                else{
                        d3.select(".aplicATS").attr('fill','#220000');
                        d3.selectAll(".textAplicAts").attr('fill','black');
                }        

                if (data.light7){
                        d3.select(".atsPlaya").attr('fill','red');
                        d3.selectAll(".textAtsPlaya").attr('fill','white');
                }
                else{
                        d3.select(".atsPlaya").attr('fill','#220000');
                        d3.selectAll(".textAtsPlaya").attr('fill','black');
                }        

                switch (data.velU) {
                        case -1:
                                d3.select("#ua").attr('fill','#440000');
                                d3.select("#ub").attr('fill','#440000');
                                d3.select("#uc").attr('fill','#440000');
                                d3.select("#ud").attr('fill','#440000'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','#440000');
                                break;
                        case 0:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','red'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','#440000');
                                break;
                        case 1:
                                d3.select("#ua").attr('fill','#440000');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','#440000'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','#440000');
                                break;
                        case 2:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','#440000');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','red'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 3:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 4:
                                d3.select("#ua").attr('fill','#440000');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','#440000'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 5:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','#440000');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 6:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','#440000');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','red'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 7:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','#440000'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','#440000');
                                break;
                        case 8:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','red'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case 9:
                                d3.select("#ua").attr('fill','red');
                                d3.select("#ub").attr('fill','red');
                                d3.select("#uc").attr('fill','red');
                                d3.select("#ud").attr('fill','red'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','red');
                                d3.select("#ug").attr('fill','red');
                                break;
                        case -2:
                                d3.select("#ua").attr('fill','#440000');
                                d3.select("#ub").attr('fill','#440000');
                                d3.select("#uc").attr('fill','#440000');
                                d3.select("#ud").attr('fill','#440000'); 
                                d3.select("#ue").attr('fill','#440000'); 
                                d3.select("#uf").attr('fill','#440000');
                                d3.select("#ug").attr('fill','red');
                                break;
                        default:
                                break;
                }

                switch (data.velD) {
                        case -1:
                                d3.select("#da").attr('fill','#440000');
                                d3.select("#db").attr('fill','#440000');
                                d3.select("#dc").attr('fill','#440000');
                                d3.select("#dd").attr('fill','#440000'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','#440000');
                                break;
                        case 0:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','red'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','#440000');
                                break;
                        case 1:
                                d3.select("#da").attr('fill','#440000');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','#440000'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','#440000');
                                break;
                        case 2:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','#440000');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','red'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 3:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 4:
                                d3.select("#da").attr('fill','#440000');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','#440000'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 5:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','#440000');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 6:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','#440000');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','red'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 7:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','#440000'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','#440000');
                                break;
                        case 8:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','red'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case 9:
                                d3.select("#da").attr('fill','red');
                                d3.select("#db").attr('fill','red');
                                d3.select("#dc").attr('fill','red');
                                d3.select("#dd").attr('fill','red'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','red');
                                d3.select("#dg").attr('fill','red');
                                break;
                        case -2:
                                d3.select("#da").attr('fill','#440000');
                                d3.select("#db").attr('fill','#440000');
                                d3.select("#dc").attr('fill','#440000');
                                d3.select("#dd").attr('fill','#440000'); 
                                d3.select("#de").attr('fill','#440000'); 
                                d3.select("#df").attr('fill','#440000');
                                d3.select("#dg").attr('fill','red');
                                break;

                        default:
                                break;
                }

                switch (data.velC) {
                        case -1:
                                d3.select("#ca").attr('fill','#440000');
                                d3.select("#cb").attr('fill','#440000');
                                d3.select("#cc").attr('fill','#440000');
                                d3.select("#cd").attr('fill','#440000'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','#440000');
                                break;
                        case 0:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','red'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','#440000');
                                break;
                        case 1:
                                d3.select("#ca").attr('fill','#440000');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','#440000'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','#440000');
                                break;
                        case 2:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','#440000');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','red'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 3:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 4:
                                d3.select("#ca").attr('fill','#440000');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','#440000'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 5:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','#440000');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 6:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','#440000');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','red'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 7:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','#440000'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','#440000');
                                break;
                        case 8:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','red'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case 9:
                                d3.select("#ca").attr('fill','red');
                                d3.select("#cb").attr('fill','red');
                                d3.select("#cc").attr('fill','red');
                                d3.select("#cd").attr('fill','red'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','red');
                                d3.select("#cg").attr('fill','red');
                                break;
                        case -2:
                                d3.select("#ca").attr('fill','#440000');
                                d3.select("#cb").attr('fill','#440000');
                                d3.select("#cc").attr('fill','#440000');
                                d3.select("#cd").attr('fill','#440000'); 
                                d3.select("#ce").attr('fill','#440000'); 
                                d3.select("#cf").attr('fill','#440000');
                                d3.select("#cg").attr('fill','red');
                                break;

                        default:
                                break;
                }
        }

        qUpdate();

        function qUpdate(){
                if (updateData == true){
                      updateData = false;
                      update();
                }
                setTimeout(function(){ qUpdate()}, 1);		
        }		

        }
        // Prueba
  	dspl.Prueba = function(_) {
                if (arguments.length == 0) return Prueba;
                Prueba = _;
                return dspl;       
        }

  	// svg width
        dspl.width = function(_) {
                if (arguments.length == 0) return dsplWidth;
                dsplWidth = _;
                return dspl;       
        }
    
        // svg height
         dspl.height = function(_) {
                if (arguments.length == 0) return dsplHeight;
                dsplHeight = _;
                return dspl;       
        }
        
        dspl.data = function(_) {
                if (arguments.length == 0) return data;
                data = _;
                updateData = true;
                return dspl;
        }

        return dspl;
}
