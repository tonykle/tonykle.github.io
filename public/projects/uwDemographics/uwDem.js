/*jshint esnext: true */
// Tony Le
// This JS file provides animation for my bar project


(function (){
	"use strict";

	window.onload = function() {
		change();

		const dataset = [4.6, 4.7, 4.9, 5.5, 5.8, 6.0, 6.1, 6.4, 6.5, 7.0, 7.9, 8.9];
		const barPadding = 2; // padding between each bar
		const numb = 1;
		const color = d3.scale.category20();
		const wTuit = 500; // width of svg canvas
		const hTuit = 375; // height of svg canvas
		const xScale = d3.scale.linear() // for the x-axis
			 .domain([100, 200])
			 .range([barPadding, wTuit - barPadding * 2]);
		let docElem = document;
		var svg = d3.select("#barGraphPH")
					.append("svg") // svg w=500, h=375 ** think of SVG as a blank canvas that you paint on
					.attr("width", wTuit)
					.attr("height", hTuit);

		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("id", numb)
		   .attr("x", (d, i) => i * (wTuit / dataset.length))

		   // below: 30 used to be 4
		   .attr("y", d => hTuit - (d * 35)) // makes the graph flip to appear "correct" (instead of upside down)
		   .attr("fill", d => "black")
		   .attr("width", wTuit / dataset.length - barPadding)
		   .attr("height", d => (d * 35) - 10) // how far bars go down, from top to bottom

		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(d => d)
		    .attr("font-family", "sans-serif")
		    .attr("font-size", "11px")
		    .attr("fill", "white")
		    .attr("font-weight", "bold")
		    .attr("text-anchor", "middle")

		    // x & y = coordinates of data (ex: 4.6, 4.7, etc)
			.attr("x", (d, i) => i * (wTuit / dataset.length) + (wTuit / dataset.length - barPadding) / 2) // left edge of each bar + half the bar width
			.attr("y", d => hTuit - (d * 35) + 15)

			svg.append("g")
				.attr("class", "axis")
				// increasing 0 pushes the axis to the right
				// increase 5 in order to move the axis upwards
				// think = translate(x, y)
				.attr("class", "axis")
				.attr("transform", "translate(0," + (hTuit - barPadding - 5) + ")");
		let year = docElem.getElementById("year");
		const test = svg.selectAll("rect")
		    .on('mouseover', function(dataPoint){
					switch (dataPoint) {
						case 4.6:
							year.innerHTML = "1999";
							break;
						case 4.7:
							year.innerHTML = "2000";
							break;
						case 4.9:
							year.innerHTML = "2001";
							break;
						case 5.5:
							year.innerHTML = "2002";
							break;
						case 5.8:
							year.innerHTML = "2003";
							break;
						case 6:
							year.innerHTML = "2004";
							break;
						case 6.1:
							year.innerHTML = "2005";
							break;
						case 6.4:
							year.innerHTML = "2006";
							break;
						case 6.5:
							year.innerHTML = "2007";
							break;
						case 7:
							year.innerHTML = "2008";
							break;
						case 7.9:
							year.innerHTML = "2009";
							break;
						case 8.9:
							year.innerHTML = "2010";
							break;
					}
		    })

		/////////////////////////////////////
		/////////////////////////////////////
		/////////////////////////////////////
		// EVERYTHING BELOW: FOR PIE CHART //
		const race = ["CAUCASIAN", "FILIPINO", "HAWAIIAN / PACIFIC ISLANDER", "LATINO",
				"INTERNATIONAL", "NATIVE AMERICAN", "NOT INDICATED", "ASIAN", "BLACK"];
		const dataRace = [44, 3, 1, 7, 14, 1, 2, 25, 3];
		const pie = d3.layout.pie();
		const wRace = 400;
		const hRace = 400;
		// outer: w/2, inner: w/3 --> DOUGHNUT
		// outer: w/2, inner: 0 --> regular pie graph
		const outerRadius = wRace / 2; // outer: w/2, inner: w/3
		const innerRadius = wRace / 2.9;
		const arc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

		var svg = d3.select("#pieChartPH")
				.append("svg")
				.attr("width", wRace)
				.attr("height", hRace);

		const arcs = svg.selectAll("g.arc")
				.data(pie(dataRace))
				.enter()
				.append("g")
				.attr("class", "arc")
				.attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

		arcs.append("path")
			.attr("fill", (d, i) => color(i))
			.attr("d", arc);

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

		let prevOnePerc = "";
		let prevThreePerc = "";
		let path = svg.selectAll("path")
		    .on('mouseover', function(d){
				let curr = "";

				if (d.value === 44) {
					curr = race[0];
				} else if (d.value === 3) {
					if (prevThreePerc !== race[1]) {
						curr = race[1];
						prevThreePerc = race[1];
					} else if (prevThreePerc !== race[8]) {
						prevThreePerc = race[8];
						curr = race[8];
					}
				} else if (d.value === 1) {
					if (prevOnePerc !== race[2]) {
						curr = race[2];
						prevOnePerc = race[2];
					} else if (prevOnePerc !== race[5]) {
						prevOnePerc = race[5];
						curr = race[5];
					}
				} else if (d.value === 7) {
					curr = race[3];
				} else if (d.value === 14) {
					curr = race[4];
				} else if (d.value === 2) {
					curr = race[6];
				} else if (d.value === 25) {
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
	 	docElem.getElementById("imageAppear").src = "http://i.imgur.com/ENNngny.jpg?1";
	 	docElem.getElementById("wireframe").innerHTML = "";
	}

	// closes the wireframe when wireframe is no longer hovered over
	function close() {
		docElem.getElementById("imageAppear").src = "";
	  docElem.getElementById("wireframe").innerHTML = "view wireframe here";
	}
})();
