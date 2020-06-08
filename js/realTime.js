<!-- Author: Bo Ericsson, bo@boe.net -->
<!-- Inspiration from numerous examples by Mike Bostock, http://bl.ocks.org/mbostock, -->
<!-- and example by Andy Aiken, http://blog.scottlogic.com/2014/09/19/interactive.html -->
'use strict';

function realTimeChart(minYSpeed, maxYSpeed, minYAcel, maxYAcel, minBit, maxBit) {
    
  var version = "0.1.0",
      datum, initialData, data = [], updateChart = false, clearChart = false,
      
	  //configuracion de tiempo de visualizacion y tamaño de ventana inicial
	  maxSeconds = 600, pixelsPerSecond = 10,
	  
      svgWidth, svgHeight,
      margin = { 
          topSpeed: 20, 
	  		  bottomSpeed: 20, 
				 
				  topAcel: 20, 
	  		  bottomAcel: 20,
				 
				  left: 60, 
				  right: 30, 
				 
				  topNav: 10, 
          bottomNav: 20 
      },
				 
      dimension = { 
          chartTitle: 20, 
					xTitle: 20, 
	  			    
					xAxisSpeed: 20, 
					yAxisSpeed: 20, 					
					yTitleSpeed: 20, 					

					xAxisAcel: 20, 
					yAxisAcel: 20, 
					yTitleAcel: 20, 					

					xAxisBit: 20, 
					yAxisBit: 20, 
					yTitleBit: 20, 					
					
					navChart: 70,
					acelChart: 100
				  },
      
	    chartTitle, 
	  
	    xTitle,
      yTitleSpeed,
      yTitleAcel,
      
	    yTitleEMR,
      yTitleFBR,
      yTitleBFR,
      yTitlePCCR,
      yTitleTracc,
      yTitleConf,
      yTitlePosEmer,
      yTitleFrenoServ,
      yTitle82,
      yTitle90,
      yTitle98,
      yTitle106,
      yTitle114,
      yTitle122,
      yTitle130,
      
      drawXAxisSpeed = true, 
      drawYAxisSpeed = true, 

      drawXAxisAcel = true, 
      drawYAxisAcel = true, 
      
      drawYAxisEMR = true, 
      drawYAxisFBR = true, 
      drawYAxisBFR = true, 
      drawYAxisPCCR = true, 
      drawYAxisTracc = true, 
      drawYAxisConf = true, 
      drawYAxisPosEmer = true, 
      drawYAxisFrenoServ = true, 
      drawYAxis82 = true, 
      drawYAxis90 = true, 
      drawYAxis98 = true, 
      drawYAxis106 = true, 
      drawYAxis114 = true, 
      drawYAxis122 = true, 
      drawYAxis130 = true, 

      drawNavChart = true,

      drawAcelChart = true,
        
      border,
      selection;

  // create the chart
  var chart = function(s) {
    selection = s;
    if (selection == undefined) {
      console.error("selection is undefined");
      return;
    };
		
    // process titles
    chartTitle = chartTitle || "";
    
	  xTitle = xTitle || "";
	
    yTitleSpeed = yTitleSpeed || "";
    yTitleAcel = yTitleAcel || "";
    
	  yTitleEMR = yTitleEMR || "";
    yTitleFBR = yTitleFBR || "";
    yTitleBFR = yTitleBFR || "";
    yTitlePCCR = yTitlePCCR || "";
    yTitleTracc = yTitleTracc || "";
    yTitleConf = yTitleConf || "";
    yTitlePosEmer = yTitlePosEmer || "";
    yTitleFrenoServ = yTitleFrenoServ || "";
    yTitle82 = yTitle82 || "";
    yTitle90 = yTitle90 || "";
    yTitle98 = yTitle98 || "";
    yTitle106 = yTitle106 || "";
    yTitle114 = yTitle114 || "";
    yTitle122 = yTitle122 || "";
    yTitle130 = yTitle130 || "";
	
    // compute component dimensions
    var chartTitleDim = chartTitle == "" ? 0 : dimension.chartTitle;
	  var xTitleDim = xTitle == "" ? 0 : dimension.xTitle;
    var xAxisDimSpeed = !drawXAxisSpeed ? 0 : dimension.xAxisSpeed;
	  var navChartDim = !drawNavChart ? 0 : dimension.navChart;

    // compute chart dimension and offset
    var marginTopSpeed = margin.topSpeed + chartTitleDim;
	  var heightSpeed = svgHeight/2 - marginTopSpeed - margin.bottomSpeed - chartTitleDim - xTitleDim - xAxisDimSpeed - navChartDim + 30;
	  var heightAcel = svgHeight*100/961;
    var marginTopAcel = marginTopSpeed + heightSpeed + 30;    
	  var heightBit = svgHeight*10/961;
	  var offsetBit = 15;
    var marginTop98 = marginTopAcel + heightAcel + offsetBit +5;    
    var marginTop82 = marginTop98 + heightBit + offsetBit;    
    var marginTop106 = marginTop82 + heightBit + offsetBit;    
    var marginTop90 = marginTop106 + heightBit + offsetBit;    
    var marginTop114 = marginTop90 + heightBit + offsetBit;    
    var marginTop122 = marginTop114 + heightBit + offsetBit;    
    var marginTop130 = marginTop122 + heightBit + offsetBit;    
    var marginTopEMR = marginTop130 + heightBit + offsetBit;    
    var marginTopFBR = marginTopEMR + heightBit + offsetBit;    
    var marginTopBFR = marginTopFBR + heightBit + offsetBit;    
    var marginTopPCCR = marginTopBFR + heightBit + offsetBit;    
    var marginTopTracc = marginTopPCCR + heightBit + offsetBit;    
    var marginTopConf = marginTopTracc + heightBit + offsetBit;    
    var marginTopPosEmer = marginTopConf + heightBit + offsetBit;    
    var marginTopFrenoServ = marginTopPosEmer + heightBit + offsetBit;    

	  var heightNav = (svgHeight*70/961) - margin.topNav - margin.bottomNav;
    var marginTopNav = svgHeight - margin.bottomSpeed - heightNav - margin.topNav;
    var width = svgWidth - margin.left - margin.right;
    var widthNav = width;
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // append the svg
    var svg = selection.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("border", function(d) { 
          if (border) return "1px solid lightgray"; 
          else return null;
        });
				
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate Speed
    var mainSpeed = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopSpeed + ")");

	// define clip-path-Speed
    mainSpeed.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightSpeed);

    // create chart background-Speed
    mainSpeed.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightSpeed)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGSpeed = mainSpeed.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");

    // add group for x axis Speed
    var xAxisGSpeed = mainSpeed.append("g")
        .attr("class", "x axis")
//        .attr("class", "#000")
        .attr("transform", "translate(0," + heightSpeed + ")");

    // add group for y axis Speed
    var yAxisGSpeed = mainSpeed.append("g")
        .attr("class", "y axis");

    // in y axis group, add y axis title Speed
    yAxisGSpeed.append("text")
        .attr("class", "title")
        .attr("transform", "rotate(-90)")
        .attr("x", - heightSpeed / 2)
        .attr("y", -35)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = yTitleSpeed == undefined ? "" : yTitleSpeed;
          return text; 
        });

    // in main group, add chart title
    mainSpeed.append("text")
        .attr("class", "chartTitle")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = chartTitle == undefined ? "" : chartTitle;
          return text; 
        });

    // define main chart scales Speed
    var xSpeed = d3.time.scale().range([0, width]);
    var ySpeed = d3.scale.linear().domain([minYSpeed, maxYSpeed]).range([heightSpeed, 0]);

    // define main chart axis Speed
    var xAxisSpeed = d3.svg.axis().orient("bottom");
    var yAxisSpeed = d3.svg.axis().orient("left");

    var mainLineRealSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xSpeed(d.time); })
        .y(function (d) { return ySpeed(d.realSpeed); });

    var mainLineCompSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidad tope
        .x(function (d) { return xSpeed(d.time); })
        .y(function (d) { return ySpeed(d.compSpeed); });
	
    var mainLineRegSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidad tope
        .x(function (d) { return xSpeed(d.time); })
        .y(function (d) { return ySpeed(d.regSpeed); });

	var mainLineFbSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidad tope
        .x(function (d) { return xSpeed(d.time); })
        .y(function (d) { return ySpeed(d.fbSpeed); });

    var mainLineMaxSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidad tope
        .x(function (d) { return xSpeed(d.time); })
        .y(function (d) { return ySpeed(d.maxSpeed); });
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate Speed
    var mainAcel = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopAcel + ")");
	
	// define clip-path-Acel
    mainAcel.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightAcel);
		
    // create chart background-Acel
    mainAcel.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightAcel)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGAcel = mainAcel.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisGAcel = mainAcel.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGAcel.append("text")
        .attr("class", "title")
        .attr("transform", "rotate(-90)")
        .attr("x", - heightAcel / 2)
        .attr("y", -35)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = yTitleAcel == undefined ? "" : yTitleAcel;
          return text; 
        });
		
    // define main chart scales Acel
    var xAcel = d3.time.scale().range([0, width]);
    var yAcel = d3.scale.linear().domain([minYAcel, maxYAcel]).range([heightAcel, 0]);
	
    // define main chart axis Acel
    var xAxisAcel = d3.svg.axis().orient("bottom");
    var yAxisAcel = d3.svg.axis().orient("left");
	
    var mainLineAcel1 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xAcel(d.time); })
        .y(function (d) { return yAcel(d.Acel1); });
		
    var mainLineAcel2 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xAcel(d.time); })
        .y(function (d) { return yAcel(d.Acel2); });
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main98 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop98 + ")");
	
	// define clip-path-EMR
    main98.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main98.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG98 = main98.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG98 = main98.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG98.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle98 == undefined ? "" : yTitle98;
          return text; 
        });
		
    // define main chart scales Acel
    var x98 = d3.time.scale().range([0, width]);
    var y98 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis98 = d3.svg.axis().orient("bottom");
    var yAxis98 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine98 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x98(d.time); })
        .y(function (d) { return y98(d.f98); });		

//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main82 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop82 + ")");
	
	// define clip-path-EMR
    main82.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main82.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG82 = main82.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG82 = main82.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG82.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle82 == undefined ? "" : yTitle82;
          return text; 
        });
		
    // define main chart scales Acel
    var x82 = d3.time.scale().range([0, width]);
    var y82 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis82 = d3.svg.axis().orient("bottom");
    var yAxis82 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine82 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x82(d.time); })
        .y(function (d) { return y82(d.f82); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main106 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop106 + ")");
	
	// define clip-path-EMR
    main106.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main106.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG106 = main106.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG106 = main106.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG106.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle106 == undefined ? "" : yTitle106;
          return text; 
        });
		
    // define main chart scales Acel
    var x106 = d3.time.scale().range([0, width]);
    var y106 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis106 = d3.svg.axis().orient("bottom");
    var yAxis106 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine106 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x106(d.time); })
        .y(function (d) { return y106(d.f106); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main90 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop90 + ")");
	
	// define clip-path-EMR
    main90.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main90.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG90 = main90.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG90 = main90.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG90.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle90 == undefined ? "" : yTitle90;
          return text; 
        });
		
    // define main chart scales Acel
    var x90 = d3.time.scale().range([0, width]);
    var y90 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis90 = d3.svg.axis().orient("bottom");
    var yAxis90 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine90 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x90(d.time); })
        .y(function (d) { return y90(d.f90); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main114 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop114 + ")");
	
	// define clip-path-EMR
    main114.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main114.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG114 = main114.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG114 = main114.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG114.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle114 == undefined ? "" : yTitle114;
          return text; 
        });
		
    // define main chart scales Acel
    var x114 = d3.time.scale().range([0, width]);
    var y114 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis114 = d3.svg.axis().orient("bottom");
    var yAxis114 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine114 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x114(d.time); })
        .y(function (d) { return y114(d.f114); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main122 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop122 + ")");
	
	// define clip-path-EMR
    main122.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main122.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG122 = main122.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG122 = main122.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG122.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle122 == undefined ? "" : yTitle122;
          return text; 
        });
		
    // define main chart scales Acel
    var x122 = d3.time.scale().range([0, width]);
    var y122 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis122 = d3.svg.axis().orient("bottom");
    var yAxis122 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine122 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x122(d.time); })
        .y(function (d) { return y122(d.f122); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var main130 = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop130 + ")");
	
	// define clip-path-EMR
    main130.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    main130.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barG130 = main130.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisG130 = main130.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisG130.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitle130 == undefined ? "" : yTitle130;
          return text; 
        });
		
    // define main chart scales Acel
    var x130 = d3.time.scale().range([0, width]);
    var y130 = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxis130 = d3.svg.axis().orient("bottom");
    var yAxis130 = d3.svg.axis().orient("left").ticks(1);
	
    var mainLine130 = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return x130(d.time); })
        .y(function (d) { return y130(d.f130); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainEMR = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopEMR + ")");
	
	// define clip-path-EMR
    mainEMR.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainEMR.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGEMR = mainEMR.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGEMR = mainEMR.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGEMR.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleEMR == undefined ? "" : yTitleEMR;
          return text; 
        });
		
    // define main chart scales Acel
    var xEMR = d3.time.scale().range([0, width]);
    var yEMR = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisEMR = d3.svg.axis().orient("bottom");
    var yAxisEMR = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineEMR = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xEMR(d.time); })
        .y(function (d) { return yEMR(d.EMR); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainFBR = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopFBR + ")");
	
	// define clip-path-EMR
    mainFBR.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainFBR.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGFBR = mainFBR.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGFBR = mainFBR.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGFBR.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleFBR == undefined ? "" : yTitleFBR;
          return text; 
        });
		
    // define main chart scales Acel
    var xFBR = d3.time.scale().range([0, width]);
    var yFBR = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisFBR = d3.svg.axis().orient("bottom");
    var yAxisFBR = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineFBR = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xFBR(d.time); })
        .y(function (d) { return yFBR(d.FBR); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainBFR = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopBFR + ")");
	
	// define clip-path-EMR
    mainBFR.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainBFR.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGBFR = mainBFR.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGBFR = mainBFR.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGBFR.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleBFR == undefined ? "" : yTitleBFR;
          return text; 
        });
		
    // define main chart scales Acel
    var xBFR = d3.time.scale().range([0, width]);
    var yBFR = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisBFR = d3.svg.axis().orient("bottom");
    var yAxisBFR = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineBFR = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xBFR(d.time); })
        .y(function (d) { return yBFR(d.BFR); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainPCCR = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopPCCR + ")");
	
	// define clip-path-EMR
    mainPCCR.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainPCCR.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGPCCR = mainPCCR.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGPCCR = mainPCCR.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGPCCR.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitlePCCR == undefined ? "" : yTitlePCCR;
          return text; 
        });
		
    // define main chart scales Acel
    var xPCCR = d3.time.scale().range([0, width]);
    var yPCCR = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisPCCR = d3.svg.axis().orient("bottom");
    var yAxisPCCR = d3.svg.axis().orient("left").ticks(1);
	
    var mainLinePCCR = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xPCCR(d.time); })
        .y(function (d) { return yPCCR(d.PCCR); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainTracc = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopTracc + ")");
	
	// define clip-path-EMR
    mainTracc.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainTracc.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGTracc = mainTracc.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGTracc = mainTracc.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGTracc.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleTracc == undefined ? "" : yTitleTracc;
          return text; 
        });
		
    // define main chart scales Acel
    var xTracc = d3.time.scale().range([0, width]);
    var yTracc = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisTracc = d3.svg.axis().orient("bottom");
    var yAxisTracc = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineTracc = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xTracc(d.time); })
        .y(function (d) { return yTracc(d.Tracc); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainConf = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopConf + ")");
	
	// define clip-path-EMR
    mainConf.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainConf.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGConf = mainConf.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGConf = mainConf.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGConf.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleConf == undefined ? "" : yTitleConf;
          return text; 
        });
		
    // define main chart scales Acel
    var xConf = d3.time.scale().range([0, width]);
    var yConf = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisConf = d3.svg.axis().orient("bottom");
    var yAxisConf = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineConf = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xConf(d.time); })
        .y(function (d) { return yConf(d.Conf); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // create main group and translate EMR
    var mainPosEmer = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopPosEmer + ")");
	
	// define clip-path-EMR
    mainPosEmer.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainPosEmer.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGPosEmer = mainPosEmer.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
        .append("g");
	  	  		
    // add group for y axis Acel
    var yAxisGPosEmer = mainPosEmer.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGPosEmer.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitlePosEmer == undefined ? "" : yTitlePosEmer;
          return text; 
        });
		
    // define main chart scales Acel
    var xPosEmer = d3.time.scale().range([0, width]);
    var yPosEmer = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisPosEmer = d3.svg.axis().orient("bottom");
    var yAxisPosEmer = d3.svg.axis().orient("left").ticks(1);
	
    var mainLinePosEmer = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xPosEmer(d.time); })
        .y(function (d) { return yPosEmer(d.PosEmer); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
    // create main group and translate EMR
    var mainFrenoServ = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopFrenoServ + ")");
	
	// define clip-path-EMR
    mainFrenoServ.append("defs").append("clipPath")
        .attr("id", "myClip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit);
		
    // create chart background-Acel
    mainFrenoServ.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightBit)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");
		
    var barGFrenoServ = mainFrenoServ.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");
	  	  
    // add group for y axis Acel
    var yAxisGFrenoServ = mainFrenoServ.append("g")
        .attr("class", "y axis");
		
    // in y axis group, add y axis title Acel
    yAxisGFrenoServ.append("text")
        .attr("class", "title")
        .attr("x", - (margin.left/2)-7)
        .attr("y", (heightBit / 2) + 2)
        .text(function(d) { 
          var text = yTitleFrenoServ == undefined ? "" : yTitleFrenoServ;
          return text; 
        });
		
    // define main chart scales Acel
    var xFrenoServ = d3.time.scale().range([0, width]);
    var yFrenoServ = d3.scale.linear().domain([minBit, maxBit]).range([heightBit, 0]);
	
    // define main chart axis Acel
    var xAxisFrenoServ = d3.svg.axis().orient("bottom");
    var yAxisFrenoServ = d3.svg.axis().orient("left").ticks(1);
	
    var mainLineFrenoServ = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xFrenoServ(d.time); })
        .y(function (d) { return yFrenoServ(d.FrenoServ); });		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------			
    // add nav chart
    var nav = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTopNav + ")");

    // add nav background
    nav.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightNav)
        .style("fill", "#000")
        .style("shape-rendering", "crispEdges")
        .attr("transform", "translate(0, 0)");

    // add group to hold line paths
    var navG = nav.append("g")
        .attr("class", "nav");

    // add group to hold nav x axis
    var xAxisGNav = nav.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightNav + ")");

    xAxisGNav.append("text")
        .attr("class", "title")
        .attr("x", width+20)
        .attr("y", 15)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = xTitle == undefined ? "" : xTitle;
          return text; 
        });
				
    // define nav scales
    var xNav = d3.time.scale().range([0, widthNav]);
    var yNav = d3.scale.linear().domain([minYSpeed, maxYSpeed]).range([heightNav, 0]);

    // define nav axis
    var xAxisNav = d3.svg.axis().orient("bottom");

    // define function that will draw the nav line chart
    var navLineRealSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion velocidad real y aceleraciones
        .x(function (d) { return xNav(d.time); })
        .y(function (d) { return yNav(d.realSpeed); });

    var navLineCompSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidades tope
        .x(function (d) { return xNav(d.time); })
        .y(function (d) { return yNav(d.compSpeed); });

    var navLineRegSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidades tope
        .x(function (d) { return xNav(d.time); })
        .y(function (d) { return yNav(d.regSpeed); });

    var navLineFbSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidades tope
        .x(function (d) { return xNav(d.time); })
        .y(function (d) { return yNav(d.fbSpeed); });

    var navLineMaxSpeed = d3.svg.line()
		.interpolate("step-after") //interpolacion bits y velocidades tope
        .x(function (d) { return xNav(d.time); })
        .y(function (d) { return yNav(d.maxSpeed); });


    // compute initial time domains...
    var ts = new Date().getTime();
		
    // first, the full time domain
    var endTime = new Date(ts);
    var startTime = new Date(endTime.getTime() - (maxSeconds * 1000));
    var interval = maxSeconds * 1000;
		
    // then the viewport time domain (what's visible in the main chart 
    // and the viewport in the nav chart)
    var endTimeViewport = new Date(ts);
    var startTimeViewport = new Date(endTime.getTime() - width / pixelsPerSecond * 1000);
    var intervalViewport = endTimeViewport.getTime() - startTimeViewport.getTime();
    var offsetViewport = startTimeViewport.getTime() - startTime.getTime();
	
    // set the scale domains for main and nav charts
    xSpeed.domain([startTimeViewport, endTimeViewport]);    
    xAcel.domain([startTimeViewport, endTimeViewport]);
    x98.domain([startTimeViewport, endTimeViewport]);    
    x82.domain([startTimeViewport, endTimeViewport]);    
    x106.domain([startTimeViewport, endTimeViewport]);    
    x90.domain([startTimeViewport, endTimeViewport]);    
    x114.domain([startTimeViewport, endTimeViewport]);    
    x122.domain([startTimeViewport, endTimeViewport]);    
    x130.domain([startTimeViewport, endTimeViewport]);    
    xEMR.domain([startTimeViewport, endTimeViewport]);    
    xFBR.domain([startTimeViewport, endTimeViewport]);    
    xBFR.domain([startTimeViewport, endTimeViewport]);    
    xPCCR.domain([startTimeViewport, endTimeViewport]);    
    xTracc.domain([startTimeViewport, endTimeViewport]);    
    xConf.domain([startTimeViewport, endTimeViewport]);    
    xPosEmer.domain([startTimeViewport, endTimeViewport]);    
    xFrenoServ.domain([startTimeViewport, endTimeViewport]);    
    xNav.domain([startTime, endTime]); 

    // update axis with modified scale
    xAxisSpeed.scale(xSpeed)(xAxisGSpeed);
    yAxisSpeed.scale(ySpeed)(yAxisGSpeed);
    
    yAxisAcel.scale(yAcel)(yAxisGAcel);

    yAxis98.scale(y98)(yAxisG98);
    yAxis82.scale(y82)(yAxisG82);
    yAxis106.scale(y106)(yAxisG106);
    yAxis90.scale(y90)(yAxisG90);
    yAxis114.scale(y114)(yAxisG114);
    yAxis122.scale(y122)(yAxisG122);
    yAxis130.scale(y130)(yAxisG130);
    yAxisEMR.scale(yEMR)(yAxisGEMR);
    yAxisFBR.scale(yFBR)(yAxisGFBR);
    yAxisBFR.scale(yBFR)(yAxisGBFR);
    yAxisPCCR.scale(yPCCR)(yAxisGPCCR);
    yAxisTracc.scale(yTracc)(yAxisGTracc);
    yAxisConf.scale(yConf)(yAxisGConf);
    yAxisPosEmer.scale(yPosEmer)(yAxisGPosEmer);
    yAxisFrenoServ.scale(yFrenoServ)(yAxisGFrenoServ);
	  xAxisNav.scale(xNav)(xAxisGNav);

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");
	
    // create brush (moveable, changable rectangle that determines 
    // the time domain of main chart)
    var viewport = d3.svg.brush()
        .x(xNav)
        .extent([startTimeViewport, endTimeViewport])
        .on("brush", function () {
          // get the current time extent of viewport
          var extent = viewport.extent();

          startTimeViewport = extent[0];
          endTimeViewport = extent[1];
          intervalViewport = endTimeViewport.getTime() - startTimeViewport.getTime();
          offsetViewport = startTimeViewport.getTime() - startTime.getTime();

          // handle invisible viewport
          if (intervalViewport == 0) {
            intervalViewport = maxSeconds * 1000;
            offsetViewport = 0;
          }

          // update the x domain of the main chart
          xSpeed.domain(viewport.empty() ? xNav.domain() : extent);
          xAcel.domain(viewport.empty() ? xNav.domain() : extent);
          x98.domain(viewport.empty() ? xNav.domain() : extent);
          x82.domain(viewport.empty() ? xNav.domain() : extent);
          x106.domain(viewport.empty() ? xNav.domain() : extent);
          x90.domain(viewport.empty() ? xNav.domain() : extent);
          x114.domain(viewport.empty() ? xNav.domain() : extent);
          x122.domain(viewport.empty() ? xNav.domain() : extent);
          x130.domain(viewport.empty() ? xNav.domain() : extent);
          xEMR.domain(viewport.empty() ? xNav.domain() : extent);
          xFBR.domain(viewport.empty() ? xNav.domain() : extent);
          xBFR.domain(viewport.empty() ? xNav.domain() : extent);
          xPCCR.domain(viewport.empty() ? xNav.domain() : extent);
          xTracc.domain(viewport.empty() ? xNav.domain() : extent);
          xConf.domain(viewport.empty() ? xNav.domain() : extent);
          xPosEmer.domain(viewport.empty() ? xNav.domain() : extent);
          xFrenoServ.domain(viewport.empty() ? xNav.domain() : extent);

		  
          // update the x axis of the main chart
          xAxisSpeed.scale(xSpeed)(xAxisGSpeed);

          // update display
          refresh();
        });

    // create group and assign to brush
    var viewportG = nav.append("g")
        .attr("class", "viewport")
        .call(viewport)
        .selectAll("rect")
        .attr("height", heightNav);


    // initial invocation
    data = initialData || [];

    // update display
    refresh();

    // function to refresh the viz upon changes of the time domain 
    // (which happens constantly), or after arrival of new data,
    // or at init
    function refresh() {
//      console.log(data);

      data = data.filter(function(d) {
        if (d.time.getTime() >= startTime.getTime() &&
            d.time.getTime() <= endTime.getTime()) 
          return true;
      })
      
      barGSpeed.selectAll("path").remove();
      barGAcel.selectAll("path").remove();
      
	    barG98.selectAll("path").remove();
      barG82.selectAll("path").remove();
      barG106.selectAll("path").remove();
      barG90.selectAll("path").remove();
      barG114.selectAll("path").remove();
      barG122.selectAll("path").remove();
      barG130.selectAll("path").remove();	  
      barGEMR.selectAll("path").remove();
      barGFBR.selectAll("path").remove();
      barGBFR.selectAll("path").remove();
      barGPCCR.selectAll("path").remove();
      barGTracc.selectAll("path").remove();
      barGConf.selectAll("path").remove();
      barGPosEmer.selectAll("path").remove();
      barGFrenoServ.selectAll("path").remove();
	  
	  //velocidad Real
      barGSpeed.append('path')
          .attr('class', 'line')
          .attr('id', 'RealSpeed')		  
          .attr('d', mainLineRealSpeed(data)) 
          .style('stroke', '#DDDDDD')		  
          .style('stroke-width', '2px');		  

      barGSpeed.append('path')
          .attr('class', 'line')
          .attr('id', 'CompSpeed')		  
          .attr('d', mainLineCompSpeed(data)) 
          .style('stroke', '#ff0000')		  
          .style('stroke-width', '1px')
		      .style('stroke-dasharray', '5 5');		  

      barGSpeed.append('path')
          .attr('class', 'line')
          .attr('id', 'RegSpeed')		  
          .attr('d', mainLineRegSpeed(data)) 
          .style('stroke', '#ffff00')		  
          .style('stroke-width', '1px');

      barGSpeed.append('path')
          .attr('class', 'line')
          .attr('id', 'FbSpeed')		  
          .attr('d', mainLineFbSpeed(data))
          .style('stroke', '#ff00ff')		  
          .style('stroke-width', '1px')
		      .style('stroke-dasharray', '5 5');		  

      barGSpeed.append('path')
          .attr('class', 'line')
          .attr('id', 'MaxSpeed')		  
          .attr('d', mainLineMaxSpeed(data))
          .style('stroke', '#40E000')		  
          .style('stroke-width', '1px');

      barGAcel.append('path')
          .attr('class', 'line')
          .attr('id', 'Acel1')		  
          .attr('d', mainLineAcel1(data))
          .style('stroke', '#EEEEEE')		  
          .style('stroke-width', '1px');

      barGAcel.append('path')
          .attr('class', 'line')
          .attr('id', 'Acel2')		  
          .attr('d', mainLineAcel2(data)) 
          .style('stroke', '#00FFFF')		  
          .style('stroke-width', '1px');
	  
	   var strokef98,
	       strokef82,
	       strokef106,
	       strokef90,
	       strokef114,
	       strokef122,
	       strokef130,
	       strokeEMR,
	       strokeFBR,
	       strokeBFR,
	       strokePCCR,
	       strokeTracc,
	       strokeConf,
	       strokePosEmer,
	       strokeFrenoServ;
		   
	   data.forEach(function(d) {
	   		if (d.f98 == 0) strokef98 = '#aa0000';
			  else strokef98 = '#008800';

	   		if (d.f82 == 0) strokef82 = '#aa0000';
			  else strokef82 = '#008800';

	   		if (d.f106 == 0) strokef106 = '#aa0000';
			  else strokef106 = '#008800';

	   		if (d.f90 == 0) strokef90 = '#aa0000';
			  else strokef90 = '#008800';

	   		if (d.f114 == 0) strokef114 = '#aa0000';
			  else strokef114 = '#008800';

	   		if (d.f122 == 0) strokef122 = '#aa0000';
			  else strokef122 = '#008800';

	   		if (d.f130 == 0) strokef130 = '#aa0000';
			  else strokef130 = '#008800';

	   		if (d.EMR == 0) strokeEMR = '#aa0000';
			  else strokeEMR = '#008800';

	   		if (d.FBR == 0) strokeFBR = '#aa0000';
			  else strokeFBR = '#008800';

	   		if (d.BFR == 0) strokeBFR = '#aa0000';
			  else strokeBFR = '#008800';

	   		if (d.PCCR == 0) strokePCCR = '#aa0000';
			  else strokePCCR = '#008800';

	   		if (d.Tracc == 0) strokeTracc = '#aa0000';
			  else strokeTracc = '#008800';

	   		if (d.Conf == 0) strokeConf = '#aa0000';
			  else strokeConf = '#008800';

	   		if (d.PosEmer == 0) strokePosEmer = '#aa0000';
			  else strokePosEmer = '#008800';

	   		if (d.FrenoServ == 0) strokeFrenoServ = '#aa0000';
			  else strokeFrenoServ = '#008800';
  	   });
	   
	   barG98.append('path')
          .attr('class', 'line')
          .attr('id', 'f98')		  
          .attr('d', mainLine98(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef98);
		  
	   barG82.append('path')
          .attr('class', 'line')
          .attr('id', 'f82')		  
          .attr('d', mainLine82(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef82);

	   barG106.append('path')
          .attr('class', 'line')
          .attr('id', 'f106')		  
          .attr('d', mainLine106(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef106);

	   barG90.append('path')
          .attr('class', 'line')
          .attr('id', 'f90')		  
          .attr('d', mainLine90(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef90);

	   barG114.append('path')
          .attr('class', 'line')
          .attr('id', 'f114')		  
          .attr('d', mainLine114(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef114);
		  
	   barG122.append('path')
          .attr('class', 'line')
          .attr('id', 'f122')		  
          .attr('d', mainLine122(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef122);
		  
	   barG130.append('path')
          .attr('class', 'line')
          .attr('id', 'f130')		  
          .attr('d', mainLine130(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokef130);
		  
	   barGEMR.append('path')
          .attr('class', 'line')
          .attr('id', 'EMR')		  
          .attr('d', mainLineEMR(data))
          .style('stroke-width', '2px')
	   	  .style('stroke', strokeEMR);

	   barGFBR.append('path')
          .attr('class', 'line')
          .attr('id', 'FBR')		  
          .attr('d', mainLineFBR(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokeFBR);

	   barGBFR.append('path')
          .attr('class', 'line')
          .attr('id', 'BFR')		  
          .attr('d', mainLineBFR(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokeBFR);

	   barGPCCR.append('path')
          .attr('class', 'line')
          .attr('id', 'PCCR')		  
          .attr('d', mainLinePCCR(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokePCCR);

	   barGTracc.append('path')
          .attr('class', 'line')
          .attr('id', 'Tracc')		  
          .attr('d', mainLineTracc(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokeTracc);

	   barGConf.append('path')
          .attr('class', 'line')
          .attr('id', 'Conf')		  
          .attr('d', mainLineConf(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokeConf);

	   barGPosEmer.append('path')
          .attr('class', 'line')
          .attr('id', 'PosEmer')		  
          .attr('d', mainLinePosEmer(data))
          .style('stroke-width', '2px')
	   	  .style('stroke', strokePosEmer);

	   barGFrenoServ.append('path')
          .attr('class', 'line')
          .attr('id', 'FrenoServ')		  
          .attr('d', mainLineFrenoServ(data))
          .style('stroke-width', '2px')
	   	    .style('stroke', strokeFrenoServ);
		  
      // also, bind data to nav chart
      // first remove current paths
      navG.selectAll("path").remove();

      // ...and line path
      navG.append('path')
          .attr('class', 'lineRealSpeed')
          .attr('d', navLineRealSpeed(data)); 

      navG.append('path')
          .attr('class', 'lineCompSpeed')
          .attr('d', navLineCompSpeed(data)); 

      navG.append('path')
          .attr('class', 'lineRegSpeed')
          .attr('d', navLineRegSpeed(data)); 

      navG.append('path')
          .attr('class', 'lineFbSpeed')
          .attr('d', navLineFbSpeed(data)); 

      navG.append('path')
          .attr('class', 'lineMaxSpeed')
          .attr('d', navLineMaxSpeed(data)); 


//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------				
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
	
//    mouseG.append("path") // this is the black vertical line to follow mouse
//      .attr("class", "mouse-line")
//      .style("stroke", "white")
//      .style("stroke-width", "1px")
//      .style("opacity", "0");
//      	
//    var lines = document.getElementsByClassName('line');
//
//    var mousePerLine = mouseG.selectAll('.mouse-per-line')
//     .data(d3.range(lines.length))
////      .data(data)
//      .enter()
//      .append("g")
//      .attr("class", "mouse-per-line");
//	  
//    mousePerLine.append("circle")
//      .attr("r", 5)
//      .style("stroke", 'white')
//      .style("fill", "none")
//      .style("stroke-width", "2px")
//      .style("opacity", "0");
//	  
//    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
//      .attr('x', margin.left)
//      .attr('y', marginTopSpeed)
//	  .attr('width', width) // can't catch mouse events on a g element
//      .attr('height', marginTopFrenoServ + heightBit - marginTopSpeed)
//      .attr('fill', 'none')
//      .attr('pointer-events', 'all')
//      .on('mouseout', function() { // on mouse out hide line, circles and text
//        d3.select(".mouse-line")
//          .style("opacity", "0");
//        d3.selectAll(".mouse-per-line circle")
//          .style("opacity", "0");
//      })
//      .on('mouseover', function() { // on mouse in show line, circles and text
//        d3.select(".mouse-line")
//          .style("opacity", "0.8");
//        d3.selectAll(".mouse-per-line circle")
//          .style("opacity", "1");
//      })
//      .on('mousemove', function() { // mouse moving over canvas
//        var mouse = d3.mouse(this);		
//        d3.select(".mouse-line")
//          .attr("d", function() {
//            var d = "M" + mouse[0] + "," + marginTopSpeed;
//            d += " " + mouse[0] + "," + (marginTopFrenoServ + heightBit);
//            return d;
//          });
//        d3.selectAll(".mouse-per-line circle")
//		  .style("stroke", function(d, i) {
//		  	   var color;
//			   
//			   switch(lines[i].id) {
//  			   		case "RealSpeed":
//						 color = textArray[5].color;
//    					 break;
//  			   		case "CompSpeed":
//						 color = textArray[6].color;
//    					 break;
//  			   		case "RegSpeed":
//						 color = textArray[7].color;
//    					 break;
//  			   		case "FbSpeed":
//						 color = textArray[8].color;
//    					 break;
//  			   		case "MaxSpeed":
//						 color = textArray[9].color;
//    					 break;
//  					case "Acel1":
//						 color = textArray[10].color;
//    					 break;
//  					case "Acel2":
//						 color = textArray[11].color;
//    					 break;
//  					case "f98":
//						 color = strokef98;
//    					 break;
//  					case "f82":
//						 color = strokef82;
//    					 break;
//  					case "f106":
//						 color = strokef106;
//    					 break;
//  					case "f90":
//						 color = strokef90;
//    					 break;
//  					case "f114":
//						 color = strokef114;
//    					 break;
//  					case "f122":
//						 color = strokef122;
//    					 break;
//  					case "f130":
//						 color = strokef130;
//    					 break;
//  					case "EMR":
//						 color = strokeEMR;
//    					 break;
//  					case "FBR":
//						 color = strokeFBR;
//    					 break;
//  					case "BFR":
//						 color = strokeBFR;
//    					 break;
//  					case "PCCR":
//						 color = strokePCCR;
//    					 break;
//  					case "Tracc":
//						 color = strokeTracc;
//    					 break;
//  					case "Conf":
//						 color = strokeConf;
//    					 break;
//  					case "PosEmer":
//						 color = strokePosEmer;
//    					 break;
//  					case "FrenoServ":
//						 color = strokeFrenoServ;
//    					 break;
//			   }
//
//			   return color;
//	     })
//
//		  
//
//        d3.selectAll(".mouse-per-line")
//          .attr("transform", function(d, i) {			
//			   var scaleX, scaleY, marginId;
//			   var beginning = 0,
//               end = lines[i].getTotalLength(),
//               target = null;
//			   
//			   switch(lines[i].id) {
//  			   		case "RealSpeed":
//    					 scaleX = xSpeed;
//						 scaleY = ySpeed;
//						 marginId = marginTopSpeed;
//    					 break;
//  			   		case "CompSpeed":
//    					 scaleX = xSpeed;
//						 scaleY = ySpeed;
//						 marginId = marginTopSpeed;
//    					 break;
//  			   		case "RegSpeed":
//    					 scaleX = xSpeed;
//						 scaleY = ySpeed;
//						 marginId = marginTopSpeed;
//    					 break;
//  			   		case "FbSpeed":
//    					 scaleX = xSpeed;
//						 scaleY = ySpeed;
//						 marginId = marginTopSpeed;
//    					 break;
//  			   		case "MaxSpeed":
//    					 scaleX = xSpeed;
//						 scaleY = ySpeed;
//						 marginId = marginTopSpeed;
//    					 break;
//  					case "Acel1":
//    					 scaleX = xAcel;
//						 scaleY = yAcel;
//						 marginId = marginTopAcel;
//    					 break;
//  					case "Acel2":
//    					 scaleX = xAcel;
//						 scaleY = yAcel;
//						 marginId = marginTopAcel;
//    					 break;
//  					case "f98":
//    					 scaleX = x98;
//						 scaleY = y98;
//						 marginId = marginTop98;
//    					 break;
//  					case "f82":
//    					 scaleX = x82;
//						 scaleY = y82;
//						 marginId = marginTop82;
//    					 break;
//  					case "f106":
//    					 scaleX = x106;
//						 scaleY = y106;
//						 marginId = marginTop106;
//    					 break;
//  					case "f90":
//    					 scaleX = x90;
//						 scaleY = y90;
//						 marginId = marginTop90;
//    					 break;
//  					case "f114":
//    					 scaleX = x114;
//						 scaleY = y114;
//						 marginId = marginTop114;
//    					 break;
//  					case "f122":
//    					 scaleX = x122;
//						 scaleY = y122;
//						 marginId = marginTop122;
//    					 break;
//  					case "f130":
//    					 scaleX = x130;
//						 scaleY = y130;
//						 marginId = marginTop130;
//    					 break;
//  					case "EMR":
//    					 scaleX = xEMR;
//						 scaleY = yEMR;
//						 marginId = marginTopEMR;
//    					 break;
//  					case "FBR":
//    					 scaleX = xFBR;
//						 scaleY = yFBR;
//						 marginId = marginTopFBR;
//    					 break;
//  					case "BFR":
//    					 scaleX = xBFR;
//						 scaleY = yBFR;
//						 marginId = marginTopBFR;
//    					 break;
//  					case "PCCR":
//    					 scaleX = xPCCR;
//						 scaleY = yPCCR;
//						 marginId = marginTopPCCR;
//    					 break;
//  					case "Tracc":
//    					 scaleX = xTracc;
//						 scaleY = yTracc;
//						 marginId = marginTopTracc;
//    					 break;
//  					case "Conf":
//    					 scaleX = xConf;
//						 scaleY = yConf;
//						 marginId = marginTopConf;
//    					 break;
//  					case "PosEmer":
//    					 scaleX = xPosEmer;
//						 scaleY = yPosEmer;
//						 marginId = marginTopPosEmer;
//    					 break;
//  					case "FrenoServ":
//    					 scaleX = xFrenoServ;
//						 scaleY = yFrenoServ;
//						 marginId = marginTopFrenoServ;
//    					 break;
//			   }
//			   			   
//
//               while (true){
//               		 target = Math.floor((beginning + end) / 2);
//              		 var pos = lines[i].getPointAtLength(target);
//              		 if ((target === end || target === beginning) && (pos.x + margin.left) !== mouse[0]) {
//                  	 	break;
//              		 }
//			  		 if ((pos.x + margin.left) > mouse[0])      end = target;
//              		 else if ((pos.x + margin.left) < mouse[0]) beginning = target;
//			  		 else break; //position found
//			  }
//			  			  
//			  window.textData[2] = scaleX.invert(pos.x).toLocaleDateString();
//			  window.textData[3] = scaleX.invert(pos.x).toLocaleTimeString()+'.'+scaleX.invert(pos.x).getMilliseconds();
//			  window.dataBits.dataText(window.textData);
//			  
//              return "translate(" + mouse[0] + "," + (pos.y + marginId)  +")";
//          });
//      });      
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		
//---------------------------------------------------------------------------------------------------------------		

    } // end refreshChart function
	
	
  qUpdate();
  qClear();

    // function to keep the chart "moving" through time (right to left) 
	function updateAxis() {

      // get current viewport extent
      var extent = viewport.empty() ? xNav.domain() : viewport.extent();
      var interval = extent[1].getTime() - extent[0].getTime();
      var offset = extent[0].getTime() - xNav.domain()[0].getTime();

      // compute new nav extents
      endTime = datum.time;
      startTime = new Date(endTime.getTime() - (maxSeconds * 1000));

      // compute new viewport extents 
      startTimeViewport = new Date(startTime.getTime() + offset);
      endTimeViewport = new Date(startTimeViewport.getTime() + interval);
      viewport.extent([startTimeViewport, endTimeViewport])

      // update scales
      xSpeed.domain([startTimeViewport, endTimeViewport]);
      xAcel.domain([startTimeViewport, endTimeViewport]);
      x98.domain([startTimeViewport, endTimeViewport]);
      x82.domain([startTimeViewport, endTimeViewport]);
      x106.domain([startTimeViewport, endTimeViewport]);
      x90.domain([startTimeViewport, endTimeViewport]);
      x114.domain([startTimeViewport, endTimeViewport]);
      x122.domain([startTimeViewport, endTimeViewport]);
      x130.domain([startTimeViewport, endTimeViewport]);
      xEMR.domain([startTimeViewport, endTimeViewport]);
      xFBR.domain([startTimeViewport, endTimeViewport]);
      xBFR.domain([startTimeViewport, endTimeViewport]);
      xPCCR.domain([startTimeViewport, endTimeViewport]);
      xTracc.domain([startTimeViewport, endTimeViewport]);
      xConf.domain([startTimeViewport, endTimeViewport]);
      xPosEmer.domain([startTimeViewport, endTimeViewport]);
      xFrenoServ.domain([startTimeViewport, endTimeViewport]);
      xNav.domain([startTime, endTime]);

      // update axis
      xAxisSpeed.scale(xSpeed)(xAxisGSpeed);
      xAxisNav.scale(xNav)(xAxisGNav);

      // refresh svg
      refresh();

    }
	
	function qUpdate(){
		if (updateChart == true){
		   updateChart = false;
		   updateAxis();
    	}
		setTimeout(function(){ qUpdate() }, 1);		
    }

    function clearAllChart(){
      barGSpeed.selectAll("path").remove();
      barGAcel.selectAll("path").remove();
      
	    barG98.selectAll("path").remove();
      barG82.selectAll("path").remove();
      barG106.selectAll("path").remove();
      barG90.selectAll("path").remove();
      barG114.selectAll("path").remove();
      barG122.selectAll("path").remove();
      barG130.selectAll("path").remove();	  
      barGEMR.selectAll("path").remove();
      barGFBR.selectAll("path").remove();
      barGBFR.selectAll("path").remove();
      barGPCCR.selectAll("path").remove();
      barGTracc.selectAll("path").remove();
      barGConf.selectAll("path").remove();
      barGPosEmer.selectAll("path").remove();
      barGFrenoServ.selectAll("path").remove();

      navG.selectAll("path").remove();

    }

    function qClear(){
      if (clearChart == true){
         clearChart = false;
         clearAllChart();
        }
      setTimeout(function(){ qClear() }, 1);		
      }
      
    return chart;

  } // end chart function
  
  // chart getter/setters
 
  // array of inital data
  chart.initialData = function(_) {
    if (arguments.length == 0) return initialData;
    initialData = _;
    return chart;
  }

  // new data item (this most recent item will appear 
  // on the right side of the chart, and begin moving left)
  chart.datum = function(_) {
    if (arguments.length == 0) return datum;
    datum = _;
    if (!datum.clear){ 
      data.push(datum);
      clearChart = false;
      updateChart = true;
    }else{
      data = [];
      clearChart = true;
      updateChart = false;
    }        
	  return chart;
  }

  // svg width
  chart.width = function(_) {
    if (arguments.length == 0) return svgWidth;
    svgWidth = _;
    return chart;
  }

  // svg height
  chart.height = function(_) {
    if (arguments.length == 0) return svgHeight;
    svgHeight = _;
    return chart;
  }

  // svg border
  chart.border = function(_) {
    if (arguments.length == 0) return border;
    border = _;
    return chart;       
  }

  // chart title
  chart.title = function(_) {
    if (arguments.length == 0) return chartTitle;
    chartTitle = _;
    return chart;   
  }

  // x axis title Speed
  chart.xTitle = function(_) {
    if (arguments.length == 0) return xTitle;
    xTitle = _;
    return chart;       
  }

  // y axis title Speed
  chart.yTitleSpeed = function(_) {
    if (arguments.length == 0) return yTitleSpeed;
    yTitleSpeed = _;
    return chart;       
  }

  // y axis title Acel
  chart.yTitleAcel = function(_) {
    if (arguments.length == 0) return yTitleAcel;
    yTitleAcel = _;
    return chart;       
  }

  // y axis title 98
  chart.yTitle98 = function(_) {
    if (arguments.length == 0) return yTitle98;
    yTitle98 = _;
    return chart;       
  }

  // y axis title 82
  chart.yTitle82 = function(_) {
    if (arguments.length == 0) return yTitle82;
    yTitle82 = _;
    return chart;       
  }
  
  // y axis title 106
  chart.yTitle106 = function(_) {
    if (arguments.length == 0) return yTitle106;
    yTitle106 = _;
    return chart;       
  }

  // y axis title 90
  chart.yTitle90 = function(_) {
    if (arguments.length == 0) return yTitle90;
    yTitle90 = _;
    return chart;       
  }

  // y axis title 114
  chart.yTitle114 = function(_) {
    if (arguments.length == 0) return yTitle114;
    yTitle114 = _;
    return chart;       
  }

  // y axis title 122
  chart.yTitle122 = function(_) {
    if (arguments.length == 0) return yTitle122;
    yTitle122 = _;
    return chart;       
  }
  
  // y axis title 130
  chart.yTitle130 = function(_) {
    if (arguments.length == 0) return yTitle130;
    yTitle130 = _;
    return chart;       
  }

  // y axis title EMR
  chart.yTitleEMR = function(_) {
    if (arguments.length == 0) return yTitleEMR;
    yTitleEMR = _;
    return chart;       
  }
  
  // y axis title FBR
  chart.yTitleFBR = function(_) {
    if (arguments.length == 0) return yTitleFBR;
    yTitleFBR = _;
    return chart;       
  }

  // y axis title BFR
  chart.yTitleBFR = function(_) {
    if (arguments.length == 0) return yTitleBFR;
    yTitleBFR = _;
    return chart;       
  }

  // y axis title PCCR
  chart.yTitlePCCR = function(_) {
    if (arguments.length == 0) return yTitlePCCR;
    yTitlePCCR = _;
    return chart;       
  }

  // y axis title Tracc
  chart.yTitleTracc = function(_) {
    if (arguments.length == 0) return yTitleTacc;
    yTitleTracc = _;
    return chart;       
  }

  // y axis title Conf
  chart.yTitleConf = function(_) {
    if (arguments.length == 0) return yTitleConf;
    yTitleConf = _;
    return chart;       
  }

  // y axis title PosEmer
  chart.yTitlePosEmer = function(_) {
    if (arguments.length == 0) return yTitlePosEmer;
    yTitlePosEmer = _;
    return chart;       
  }

  // y axis title FrenoServ
  chart.yTitleFrenoServ = function(_) {
    if (arguments.length == 0) return yTitleFrenoServ;
    yTitleFrenoServ = _;
    return chart;       
  }
  
  // version
  chart.version = version;
  
  return chart;

} // end realTimeChart function