// Tony Le
// This JS file provides animation for my bar project


(function (){
	"use strict";

	window.onload = function() {
		change();

		var dataset = [4.6, 4.7, 4.9, 5.5, 5.8, 6.0, 6.1, 6.4, 6.5, 7.0, 7.9, 8.9];
		var w = 500; // width of svg canvas
		var h = 375; // height of svg canvas
		var barPadding = 2; // padding between each bar
		var numb = 1;

        var xScale = d3.scale.linear()
					 .domain([100, 200])
					 .range([barPadding, w - barPadding * 2]);

        // for the x-avis
        // for some reason adding ticks() messes it up

			
		var svg = d3.select("#barGraphPH")
					.append("svg") // svg w=500, h=375 ** think of SVG as a blank canvas that you paint on
					.attr("width", w)
					.attr("height", h);

		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("id", numb)
		   .attr("x", function(d, i) {
		   		return i * (w / dataset.length);
		   })
		   // below: 30 used to be 4
		   .attr("y", function (d) {
		   		return h - (d * 35); // makes the graph flip to appear "correct" (instead of upside down)
		   })
		   .attr("fill", function(d) {
		   		return "black";
		   })
		   .attr("width", w / dataset.length - barPadding)
		   .attr("height", function(d) { // how far bars go down, from top to bottom
		   		return (d * 35) - 10; // 30 used to be 4 -- d * x --> changes histogram scale
		   });
		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text") 
		   .text(function(d) { // text becomes the data pulled from array
		   		return d;
		   })
		    .attr("font-family", "sans-serif")
		    .attr("font-size", "11px")
		    .attr("fill", "white")
		    .attr("font-weight", "bold")
		    .attr("text-anchor", "middle")

		    // x & y = coordinates of data (ex: 4.6, 4.7, etc)
			.attr("x", function(d, i) {
				return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2; // left edge of each bar + half the bar width
			})
			.attr("y", function(d) {
				return h - (d * 35) + 15; // USED TO BE 4
			});

			svg.append("g")
				.attr("class", "axis")
				// increasing 0 pushes the axis to the right
				// increase 5 in order to move the axis upwards
				// think = translate(x, y)
				.attr("class", "axis")
				.attr("transform", "translate(0," + (h - barPadding - 5) + ")");

		var test = svg.selectAll("rect") 
		    .on('mouseover', function(d){ 
		    	console.log(d);
		    	if (d == 4.6) {
		    		document.getElementById("year").innerHTML = "1999";
		    	} else if (d == 4.7) {
		    		document.getElementById("year").innerHTML = "2000";
		    	} else if (d == 4.9) {
		    		document.getElementById("year").innerHTML = "2001";
		    	} else if (d == 5.5) {
		    		document.getElementById("year").innerHTML = "2002";
		    	} else if (d == 5.8) {
		 		    document.getElementById("year").innerHTML = "2003";   		
		    	} else if (d == 6) {
		    		document.getElementById("year").innerHTML = "2004";		
		    	} else if (d == 6.1) {
		    		document.getElementById("year").innerHTML = "2005";
		    	} else if (d == 6.4) {
		    		document.getElementById("year").innerHTML = "2006";
		    	} else if (d == 6.5) {
		    		document.getElementById("year").innerHTML = "2007";
		    	} else if (d == 7) {
		    		document.getElementById("year").innerHTML = "2008";
		    	} else if (d == 7.9) {
		    		document.getElementById("year").innerHTML = "2009";
		    	} else if (d == 8.9) {
		    		document.getElementById("year").innerHTML = "2010";	
		    	}
		    })

		/////////////////////////////////////
		/////////////////////////////////////
		/////////////////////////////////////
		// EVERYTHING BELOW: FOR PIE CHART //
		var dataRace = [44, 3, 1, 7, 14, 1, 2, 25, 3];

		var pie = d3.layout.pie();

		var w = 400;
		var h = 400;
		// outer: w/2, inner: w/3 --> DOUGHNUT
		// outer: w/2, inner: 0 --> regular pie graph
		var outerRadius = w / 2; // outer: w/2, inner: w/3
		var innerRadius = w / 2.9;
		var arc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

		var svg = d3.select("#pieChartPH")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

		var arcs = svg.selectAll("g.arc")
				.data(pie(dataRace))
				.enter()
				.append("g")
				.attr("class", "arc")
				.attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

		arcs.append("path")
			.attr("fill", function(d, i) {
				return color(i);
		})

		.attr("d", arc);

		//////////////////////////////////////////////
		//////////////////////////////////////////////
		// uncomment below to include #s in pie graph

		// arcs.append("text")
		// 	.attr("font-size", "9px")
		// 	.attr("font-family", "sans-serif")
		// 	.attr("font-weight", "bold")
		// 	.attr("transform", function(d) {
		// 		return "translate(" + arc.centroid(d) + ")";
		// 	})
		// 	.attr("text-anchor", "middle")
		// 	.text(function(d) {
		// 		return d.value;
		// 	});

		var prevOnePerc = "";
		var prevThreePerc = "";
		var path = svg.selectAll("path") 
		    .on('mouseover', function(d){ 
			    var race = ["CAUCASIAN", "FILIPINO", "HAWAIIAN / PACIFIC ISLANDER", "LATINO", 
			    		"INTERNATIONAL", "NATIVE AMERICAN", "NOT INDICATED", "ASIAN", "BLACK"];
				var curr = "";
				
				if (d.value == 44) {
					curr = race[0];
				} else if (d.value == 3) {
					if (prevThreePerc != race[1]) {
						curr = race[1];
						prevThreePerc = race[1];
					} else if (prevThreePerc != race[8]) {
						prevThreePerc = race[8];
						curr = race[8];			
					}
				} else if (d.value == 1) {
					if (prevOnePerc != race[2]) {
						curr = race[2];
						prevOnePerc = race[2];
					} else if (prevOnePerc != race[5]) {
						prevOnePerc = race[5];
						curr = race[5];			
					}
				} else if (d.value == 7) {
					curr = race[3];
				} else if (d.value == 14) {
					curr = race[4];
				} else if (d.value == 2) {
					curr = race[6];
				} else if (d.value == 25) {
					curr = race[7];
				}

				curr = curr + " | " + d.value + "%";
			    $('#race').text(curr); // curr is the changing text
		    }) 
		};

	// stuff below makes wireframe open/close on-hover
	function change() {
		wireframe.onmouseover = open;
		imageAppear.onmouseout = close;
	}

	// openns the wireframe when text is hovered over
	function open() {
	 	document.getElementById("imageAppear").src = "http://i.imgur.com/ENNngny.jpg?1";
	 	document.getElementById("wireframe").innerHTML = "";
	}

	// closes the wireframe when wireframe is no longer hovered over
	function close() {
		document.getElementById("imageAppear").src = "";
		document.getElementById("wireframe").innerHTML = "view wireframe here &#8618";
	}

	var color = d3.scale.category20();
})();