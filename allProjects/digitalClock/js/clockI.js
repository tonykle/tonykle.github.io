// This JS file is used to create and update the digital clock web application.
// - Tony Le

(function () {
	"use strict";

	const CIRCLE_COLOR = "background-color: #FFEBCD"; // Blanched Almond
	const HEIGHT = 6;
	const WIDTH = 17;
	var hours;
	var firstMin; // if min == 36, firstMin == 3
	var secMin; // if min == 36, secMin == 6
	var flip = 0; // for the blinker
	var firstMinIsOne = false;

	window.onload = () => {
		createCircles();
		getTheTime();
		setInterval(() => {
			getTheTime()
		}, 1000);
		setInterval(() => {
			blinker()
		}, 1000);
	};

	// this function reassigns the time data (hours/minutes)
	function getTheTime() {
		let date = new Date();
		hours = date.getHours();
		if (hours > 12) { // for non-military time
		    hours -= 12;
		} else if (hours === 0) {
		   hours = 12;
		}

		let minutes = date.getMinutes(); // minutes
		secMin = minutes % 10;
		firstMin = (minutes - secMin) / 10;
		clearAndRedraw();
	}

	// this function creates the circles and fills them depending on
	function createCircles() {
		for (let j = 0; j < HEIGHT; j++) {
			for (let i = 0; i < WIDTH; i++) {
			  let newTd = document.createElement("td");
				let newTDName = "td_" + (i + 1); // table data

				$(newTd).attr("id", newTDName);
				$("#singleRow").append(newTd);

				let newDiv = document.createElement("div");
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
		for (let j = 0; j < HEIGHT; j++) {
			for (let i = 0; i < WIDTH; i++) {
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
			if (hours === 1) { // when hour is 01 (moves 0 closer to 1, no awkward gap)
				zero(3);
			} else {
				zero(1);
			}
		// fill second number slot w/ a number (1-9)
		switch (hours) {
			case 1:
				one(7);
				break;
			case 2:
				two(5);
				break;
			case 3:
				three(5);
				break;
			case 4:
				four(5);
				break;
			case 5:
				five(5);
				break;
			case 6:
				six(5);
				break;
			case 7:
				seven(5);
				break;
			case 8:
				eight(5);
				break;
			case 9:
				nine(5);
				break;
		}

		} else { // fill number slot #1 with 10/11/12
			if (hours === 10) {
				one(3);
				zero(5);
			} else if (hours === 11) {
				one(4);
				one(7);
			} else if (hours === 12) {
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
		if (firstMin === 1) {
			one(11); // fill 1-7 to 2-7 (vertically)
			// fill second minute number slot depending on value
			switch (secMin) {
				case 1:
					one(13);
					break;
				case 2:
					two(13);
					break;
				case 3:
					three(13);
					break;
				case 4:
					four(13);
					break;
				case 5:
					five(13);
					break;
				case 6:
					six(13);
					break;
				case 7:
					seven(13);
					break;
				case 8:
					eight(13);
					break;
				case 9:
					nine(13);
					break;
				case 0:
					zero(13);
					break;
			}
			firstMinIsOne = true;
		}
		switch (firstMin) {
			case 2:
				two(11);
				break;
			case 3:
				three(11);
				break;
			case 4:
				four(11);
				break;
			case 5:
				five(11);
				break;
			case 6:
				six(11);
				break;
			case 7:
				seven(11);
				break;
			case 8:
				eight(11);
				break;
			case 9:
				nine(11);
				break;
			case 0:
				zero(11);
				break;
		}

		// fill second minute number slot depending on value
		if (!firstMinIsOne) {
			switch (secMin) {
				case 1:
					one(15);
					break;
				case 2:
					two(15);
					break;
				case 3:
					three(15);
					break;
				case 4:
					four(15);
					break;
				case 5:
					five(15);
					break;
				case 6:
					six(15);
					break;
				case 7:
					seven(15);
					break;
				case 8:
					eight(15);
					break;
				case 9:
					nine(15);
					break;
				case 0:
					zero(15);
					break;
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
		$("#4_" + startNumber).attr("style", CIRCLE_COLOR);

		// last dot on the right
		let newNumb2 = startNumber + 2;
		$("#2_" + newNumb2).attr("style", CIRCLE_COLOR);
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
		for (let i = 1; i < 4; i++) {
			$("#" + i + "_" + startNumber).attr("style", CIRCLE_COLOR);
		}
	}

	// DISPLAY 5
	function five(startNumber) {
		topThree(startNumber);
		bottomThree(startNumber);
		middleThree(startNumber);
		// last dot on the left side
		$("#2_" + startNumber).attr("style", CIRCLE_COLOR);

		// last dot on the right side
		let newNumb = startNumber + 2;
		$("#4_" + newNumb).attr("style", CIRCLE_COLOR);
	}

	// DISPLAY 6
	function six(startNumber) {
		topThree(startNumber);
		bottomThree(startNumber);
		longSideLeft(startNumber);
		middleThree(startNumber);

		// last dot on the right side
		let newNumb = startNumber + 2;
		$("#4_" + newNumb).attr("style", CIRCLE_COLOR);
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
		for (let i = 1; i < 4; i++) {
			$("#" + i + "_" + startNumber).attr("style", CIRCLE_COLOR);
		}
	}

	// These following functions are called depending on the time and on which dots need
	// to be filled ////////////////////////////////////////////////////////////////////

	function topThree(startNumber) {
		for (let i = 0; i < 3; i++) {
			let newNumb = startNumber + i;
			$("#1_" + newNumb).attr("style", CIRCLE_COLOR);
		}
	}

	function bottomThree(startNumber) {
		for (let i = 0; i < 3; i++) {
			let newNumb = startNumber + i;
			$("#5_" + newNumb).attr("style", CIRCLE_COLOR);
		}
	}

	function longSideLeft(startNumber) {
		for (let i = 1; i < 6; i++) {
			$("#" + i + "_" + startNumber).attr("style", CIRCLE_COLOR);
		}
	}

	function longSideRight(startNumber) {
		for (let i = 1; i < 6; i++) {
			let newNumb = startNumber + 2;
			$("#" + i + "_" + newNumb).attr("style", CIRCLE_COLOR);
		}
	}

	function middleThree(startNumber) {
		for (let i = 0; i < 3; i++) {
			let newNumb = startNumber + i;
			$("#3_" + newNumb).attr("style", CIRCLE_COLOR);
		}
	}

	// this function controls the flashing blinker
	function blinker() {
		flip++;
		if (flip % 2 != 0) {
			$("#2_9, #4_9").attr("style", CIRCLE_COLOR);
		} else {
			$("#2_9, #4_9").attr("style", "black");
		}
	}
})();
