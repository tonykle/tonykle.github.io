// Tony Le
// Desc: This file provides the JavaScript for the fifteen.html file.
// The JavaScript in this file will make the puzzle interactive. It
// allows us to move each puzzle piece by clicking and allows us to
// shuffle their positioning.

(function() {
	"use strict";
	const TILE_PIECES = 15,
	      HILIGHT_COLOR = "red";
	let topB = "300px", // top value for blank space
	    leftB = "300px", // left value for blank space
      randomImg = Math.floor((Math.random() * 9) + 1),
	    doc = document;
	window.onload = function() {
		createTiles();
		doc.getElementById("shufflebutton").onclick = shuffleIt;
	};

	// this function creates the tiles of the puzzle and sets their background images
	function createTiles() {
		let x = 0;
		let y = 0;
		for (let i = 0; i < TILE_PIECES; i++) {
			let newDiv = doc.createElement("div");
			newDiv.innerHTML = [i + 1];
			x = parseInt(i % 4);
			y = parseInt(i / 4);
			newDiv.setAttribute("id", "piece " + (i + 1)); // piece IDs will look like: piece #
			newDiv.style.left = (100 * x) + "px";
			newDiv.style.top = (100 * y) + "px";
			newDiv.style.backgroundPosition = (x * - 100) + "px " + (y * - 100) + "px";
			newDiv.style.backgroundImage="url('images/background" + randomImg + ".jpg')"; // set background-image of each piece
			doc.getElementById("puzzlearea").appendChild(newDiv); // adds new div to puzzlearea
			newDiv.onclick = moveTile; // moves a tile
			newDiv.onmouseover = changeCursorColor; // changes cursor/color appearance
			newDiv.onmouseout = changeCursorColorBack; // changes cursor/color appearance back
		}
	}

	// this function randomly shuffles all of the puzzle pieces
	function shuffleIt() {
		for(let i = 0; i < 1000; i++) {
			let randTile = Math.floor((Math.random() * TILE_PIECES) + 1); // random # (1-15)
			let piece = doc.getElementById("piece " + randTile); // this is the piece you randomly got
			let pieceLeft = piece.style.left; // the left val of the randomly selected piece
			let pieceTop = piece.style.top; // the top val of the randomly selected piece
			if (validate(piece.style.top, piece.style.left)) {
				piece.style.left = leftB; // following lines switches positioning
				piece.style.top = topB;
				leftB = pieceLeft;
				topB = pieceTop;
			}
		}
	}

	// this function makes sure a puzzle piece we want to move is movable
	function validate(top, left) {
		let topBlank = parseInt(topB); // top value of blank piece
		let leftBlank = parseInt(leftB); // left balue of blank piece
		let tCurr = parseInt(top); // top value of current piece
		let lCurr = parseInt(left); // left value of current piece
		return ((((tCurr - topBlank == 100) || (tCurr - topBlank == -100)) && (lCurr - leftBlank == 0)) ||
			(((lCurr - leftBlank == 100) || (lCurr - leftBlank == -100)) && (tCurr - topBlank == 0)));
	}

	// this function allows us to move tiles one at a time
	function moveTile() {
		if (validate(this.style.top, this.style.left)) {
			let tempTop =  this.style.top;
			let tempLeft = this.style.left;
			this.style.top = topB;
			this.style.left = leftB;
			topB = tempTop;
			leftB = tempLeft;
		}
	}

	// this function highlights individual tiles and changes the cursor appearance
	function changeCursorColor() {
		let currStyle = this.style;
		if (validate(currStyle.top, currStyle.left)) {
			currStyle.cursor = "pointer";
			currStyle.color = HILIGHT_COLOR;
			currStyle.borderColor = HILIGHT_COLOR;
		}
	}

	// this function changes the tiles/cursor appearance back to the  default state
	function changeCursorColorBack() {
		let currStyle = this.style;
		currStyle.cursor = "auto";
		currStyle.color = "black";
		currStyle.borderColor = "black";
	}
})();
