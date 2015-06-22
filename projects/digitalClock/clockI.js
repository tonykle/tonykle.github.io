// This JS file is used to create and update the digital clock web application.
// - Tony Le

(function () {
	"use strict";
	var hours;
	var firstMin; // if min == 36, firstMin == 3
	var secMin; // if min == 36, secMin == 6
	var flip = 0; // for the blinker
	var circleColor = "background-color: #FFEBCD"; // Blanched Almond 
	var firstMinIsOne = false;

	window.onload = function() {	
		createCircles();
		getTheTime();
		setInterval(function(){ getTheTime() }, 1000);
		setInterval(function(){ blinker() }, 1000);
	};

	// this function reassigns the time data (hours/minutes)
	function getTheTime() {
		var date = new Date();
		hours = date.getHours();
		if (hours > 12) { // for non-military time
		    hours -= 12;
		} else if (hours === 0) {
		   hours = 12;
		}
		var minutes = date.getMinutes(); // minutes
		secMin = minutes % 10;
		firstMin = (minutes - secMin) / 10;
		clearAndRedraw();
	}

	// this function creates the circles and fills them depending on 
	function createCircles() {
		for (var j = 0; j < 6; j++) {
			for (var i = 0; i < 17; i++) {
				var newTd = document.createElement("td");
				var newTDName = "td_" + (i + 1); // table data
				
				$(newTd).attr("id", newTDName);
				$("#singleRow").append(newTd);

				var newDiv = document.createElement("div");
				$(newDiv).attr({
					id: (j + 1) + "_" + (i + 1),
					class: "circle"
				});
				$("#" + newTDName).append(newDiv);
			}
		}
		handleHours();
		handleMinutes();
	}

	// this function clears all current circles, and redraws them when the correct time changes
	function clearAndRedraw() {
		for (var j = 0; j < 6; j++) {
			for (var i = 0; i < 17; i++) {
				$("#" + (j + 1) + "_" + (i + 1)).attr("style", "black"); // div class = circle, div id = 1_1, 1_2
			}
		}
		// re-fill dots
		handleHours();
		handleMinutes();
	}

	// this function handles the circles based on the hour of time
	function handleHours() {
		// fill first number slot w/ 0
		if (hours < 10) {
			if (hours == 1) { // when hour is 01 (moves 0 closer to 1, no awkward gap)
				zero(3);
			} else {
				zero(1);
			}
		// fill second number slot w/ a number (1-9)
		if (hours == 1) {
			one(7); // fill 1-7 to 2-7 (vertically)
		} else if (hours == 2) {
			two(5);
		} else if (hours == 3) {
			three(5);
		}  else if (hours == 4) {
			four(5);
		}  else if (hours == 5) {
			five(5);
		}  else if (hours == 6) {
			six(5);
		}  else if (hours == 7) {
			seven(5);
		}  else if (hours == 8) {
			eight(5);
		}  else if (hours == 9) {
			nine(5);
		}

		} else { // fill number slot #1 with 10/11/12
			if (hours == 10) {
				one(3);
				zero(5);
			} else if (hours == 11) {
				one(4);
				one(7);
			} else if (hours == 12) {
				one(3);
				two(5);
			}
		}
	}

	// this function handles the circles based on the minutesof time
	function handleMinutes() {
		// fill first minute number slot depending on value
		// I created the conditions below, within firstMin == 1 because before
		// if the firstMin == 1, the space between firstMin and secMin would be too much
		if (firstMin == 1) {
			one(11); // fill 1-7 to 2-7 (vertically)
			// fill second minute number slot depending on value
			if (secMin == 1) {
				one(13); // fill 1-7 to 2-7 (vertically)
			} else if (secMin == 2) {
				two(13);
			} else if (secMin== 3) {
				three(13);
			}  else if (secMin == 4) {
				four(13);
			}  else if (secMin == 5) {
				five(13);
			}  else if (secMin == 6) {
				six(13);
			}  else if (secMin == 7) {
				seven(13);
			}  else if (secMin == 8) {
				eight(13);
			}  else if (secMin == 9) {
				nine(13);
			} else if (secMin == 0) {
				zero(13);
			}
			firstMinIsOne = true;
		} else if (firstMin == 2) {
			two(11);
		} else if (firstMin == 3) {
			three(11);
		}  else if (firstMin == 4) {
			four(11);
		}  else if (firstMin == 5) {
			five(11);
		}  else if (firstMin == 6) {
			six(11);
		}  else if (firstMin == 7) {
			seven(11);
		}  else if (firstMin == 8) {
			eight(11);
		}  else if (firstMin == 9) {
			nine(11);
		} else if (firstMin == 0) {
			zero(11);
		}
	
		// fill second minute number slot depending on value
		if (!firstMinIsOne) {
			if (secMin == 1) {
				one(15); // fill 1-7 to 2-7 (vertically)
			} else if (secMin == 2) {
				two(15);
			} else if (secMin== 3) {
				three(15);
			}  else if (secMin == 4) {
				four(15);
			}  else if (secMin == 5) {
				five(15);
			}  else if (secMin == 6) {
				six(15);
			}  else if (secMin == 7) {
				seven(15);
			}  else if (secMin == 8) {
				eight(15);
			}  else if (secMin == 9) {
				nine(15);
			} else if (secMin == 0) {
				zero(15);
			}
		}
		firstMinIsOne = false;
	}

	// DISPLAY 0
	function zero(startNumber) {
		topThree(startNumber);
		bottomThree(startNumber);
		longSideLeft(startNumber);
		longSideRight(startNumber);
	}

	// DISPLAY 1
	function one(startNumber) {
		longSideLeft(startNumber);
	}

	// DISPLAY 2
	function two(startNumber) {
		topThree(startNumber);
		bottomThree(startNumber);
		middleThree(startNumber);

		// last dot on the left
		$("#4_" + startNumber).attr("style", circleColor);

		// last dot on the right
		var newNumb2 = startNumber + 2;
		$("#2_" + newNumb2).attr("style", circleColor);
	}

	// DISPLAY 3
	function three(startNumber) {
		topThree(startNumber);
		bottomThree(startNumber);
		longSideRight(startNumber);
		middleThree(startNumber);
	}

	// DISPLAY 4
	function four(startNumber) {
		middleThree(startNumber);
		longSideRight(startNumber);

		// short side (left)
		for (var i = 1; i < 4; i++) {
			$("#" + i + "_" + startNumber).attr("style", circleColor);
		}
	}

	// DISPLAY 5
	function five(startNumber) {
		topThree(startNumber);	
		bottomThree(startNumber);
		middleThree(startNumber);
		// last dot on the left side
		$("#2_" + startNumber).attr("style", circleColor);

		// last dot on the right side
		var newNumb = startNumber + 2;
		$("#4_" + newNumb).attr("style", circleColor);
	}

	// DISPLAY 6
	function six(startNumber) {
		topThree(startNumber);	
		bottomThree(startNumber);
		longSideLeft(startNumber);
		middleThree(startNumber);

		// last dot on the right side
		var newNumb = startNumber + 2;
		$("#4_" + newNumb).attr("style", circleColor);
	}

	// DISPLAY 7
	function seven(startNumber) {
		topThree(startNumber);	
		longSideRight(startNumber);
	}

	// DISPLAY 8
	function eight(startNumber) {
		topThree(startNumber);	
		longSideLeft(startNumber);
		longSideRight(startNumber);
		middleThree(startNumber);
		bottomThree(startNumber);

	}
	// DISPLAY 9
	function nine(startNumber) {
		topThree(startNumber);	
		longSideRight(startNumber);
		middleThree(startNumber);
		bottomThree(startNumber);

		// short side (left)
		for (var i = 1; i < 4; i++) {
			$("#" + i + "_" + startNumber).attr("style", circleColor);
		}
	}

	// These following functions are called depending on the time and on which dots need
	// to be filled ////////////////////////////////////////////////////////////////////

	function topThree(startNumber) {
		for (var i = 0; i < 3; i++) {
			var newNumb = startNumber + i;
			$("#1_" + newNumb).attr("style", circleColor);
		}
	}

	function bottomThree(startNumber) {
		for (var i = 0; i < 3; i++) {
			var newNumb = startNumber + i;
			$("#5_" + newNumb).attr("style", circleColor);
		}
	}

	function longSideLeft(startNumber) {
		for (var i = 1; i < 6; i++) {
			$("#" + i + "_" + startNumber).attr("style", circleColor);
		}
	}

	function longSideRight(startNumber) {
		for (var i = 1; i < 6; i++) {
			var newNumb = startNumber + 2;
			$("#" + i + "_" + newNumb).attr("style", circleColor);
		}
	}

	function middleThree(startNumber) {
		var newNumb = startNumber + 1;
		for (var i = 0; i < 3; i++) {
			var newNumb = startNumber + i;
			$("#3_" + newNumb).attr("style", circleColor);
		}
	}

	// this function controls the flashing blinker
	function blinker() {
		flip++;
		if (flip % 2 != 0) {
			$("#2_9, #4_9").attr("style", circleColor);
		} else {
			$("#2_9, #4_9").attr("style", "black");
		}
	}
})();