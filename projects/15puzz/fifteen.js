// Tony Le
// Desc: This file provides the JavaScript for the fifteen.html file.
// The JavaScript in this file will make the puzzle interactive. It
// allows us to move each puzzle piece by clicking and allows us to
// shuffle their positioning.

(function() {
	"use strict";
	var topB = 300 + "px"; // top value for blank space
	var leftB = 300 + "px"; // left value for blank space
	var randomImg;
	window.onload = function() {
		randomImg = Math.floor((Math.random() * 9) + 1);
		createTiles();
		document.getElementById("shufflebutton").onclick = shuffleIt;
	};
	
	// this function creates the tiles of the puzzle and sets their background images
	function createTiles() {
		var x = 0;
		var y = 0;
		for (var i = 0; i < 15; i++) {
			var newDiv = document.createElement("div");
			newDiv.innerHTML = [i + 1];
			x = parseInt(i % 4);
			y = parseInt(i / 4);
			newDiv.setAttribute("id", "piece " + (i + 1)); // piece IDs will look like: piece #
			newDiv.style.left = (100 * x) + "px";
			newDiv.style.top = (100 * y) + "px";
			newDiv.style.backgroundPosition = (x * - 100) + "px " + (y * - 100) + "px";
			newDiv.style.backgroundImage="url('background" + randomImg + ".jpg')"; // set background-image of each piece
			document.getElementById("puzzlearea").appendChild(newDiv); // adds new div to puzzlearea
			newDiv.onclick = moveTile; // moves a tile
			newDiv.onmouseover = changeCursorColor; // changes cursor/color appearance
			newDiv.onmouseout = changeCursorColorBack; // changes cursor/color appearance back
		}
	}

	// this function randomly shuffles all of the puzzle pieces
	function shuffleIt() {
		for(var i = 0; i < 1993; i++) {
			var randTile = Math.floor((Math.random() * 15) + 1); // random # (1-15)
			var piece = document.getElementById("piece " + randTile); // this is the piece you randomly got
			var pieceLeft = piece.style.left; // the left val of the randomly selected piece
			var pieceTop = piece.style.top; // the top val of the randomly selected piece
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
		var topBlank = parseInt(topB); // top value of blank piece
		var leftBlank = parseInt(leftB); // left balue of blank piece
		var tCurr = parseInt(top); // top value of current piece
		var lCurr = parseInt(left); // left value of current piece
		if ((((tCurr - topBlank == 100) || (tCurr - topBlank == -100)) && (lCurr - leftBlank == 0)) || 
			(((lCurr - leftBlank == 100) || (lCurr - leftBlank == -100)) && (tCurr - topBlank == 0))) {
			return true;
		} 
		return false;
	}

	// this function allows us to move tiles one at a time
	function moveTile() {
		if (validate(this.style.top, this.style.left)) {
			var tempTop =  this.style.top;
			var tempLeft = this.style.left;
			this.style.top = topB;
			this.style.left = leftB;
			topB = tempTop;
			leftB = tempLeft;
		}
	}

	// this function highlights individual tiles and changes the cursor appearance
	function changeCursorColor() {
		if (validate(this.style.top, this.style.left)) {
			this.style.cursor="pointer";
			this.style.color="red";
			this.style.borderColor="red";
		}
	}

	// this function changes the tiles/cursor appearance back to the  default state
	function changeCursorColorBack() {
		this.style.cursor="auto";
		this.style.color="black";
		this.style.borderColor="black";
	}
})();