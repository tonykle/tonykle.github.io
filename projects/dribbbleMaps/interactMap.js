// This is my JavaScript file that does most of the work for this Google Maps API JS project.

// global variables
// go here ^^^^^^^^

$(document).ready(function() {
	// Map is more zoomed-out if the user is using a smart-phonse
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 	createMap(1);
	} else {
		createMap(3);
	}
});

function createMap(zoomVal) {
	var mapOptions = { // here we create a Map options object containing map initialization variables
		zoom: zoomVal,
	    center: new google.maps.LatLng(39.176897, -27.355632), // starting latitude/longitude
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    // add other details here
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	initializeDribbb(getImageData);
}

//this function creates an image object for each image
function getImageData(data) { // data from sucess callback?
	//console.log(data);
	for (var key in data.shots) {
		var results = data.shots[key];
		// console.log(results);

		// creates image object with all of its detail
		var image = {
			link: results.image_teaser_url,
			title : results.title,
			likes : results.likes_count,
			website : results.player.url,
			location : results.player.location, // format: city, country ,, city ,, country ,, neither
			artistName : results.player.name
		};
		// console.log(image.link);
		// console.log(image.title);
		// console.log(image.likes);
		// console.log(image.website);
		// console.log(image.location);
		// console.log(image.artistName);
		// console.log("---------------");
		drawMarkersInfoWindow(image);
	}
}

// this function creates the markers and places them on the map and populates each markers' Info Window with
// their image's details
function drawMarkersInfoWindow(image) {
	var geo = new google.maps.Geocoder;

	geo.geocode({'address':image.location},function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lati = results[0].geometry.location.lat();
			var longi = results[0].geometry.location.lng();
			console.log(lati);
			console.log(longi);
			console.log("-------------");
			// create marker object with details
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng (lati, longi),
				map: map, // ?
				animation: google.maps.Animation.DROP,
				title: image.address
			});
			// populating the Info window with the image, artist, and location
			marker.info = new google.maps.InfoWindow({
	     		content:"<b>" + image.title + "</b> <br />" + "<img src=" + image.link + "> <br />" +
	     		image.artistName + "&nbsp; | &nbsp;" + image.location + "<br />" + image.likes + " likes <br />" +
	     		"<a href=" + image.website + ">" + image.website + "</a>"
	     	});
	     	// opens Info window on-click
	     	google.maps.event.addListener(marker, 'click', function() { // opens info window when you click
	     		marker.info.open(map, marker);
			});
		} else {
			// console.log(address + " does not work"); // countries that do not work are duplicates, find way to display duplicates
		}
  	});
  }

// this function contains the Ajax request to the Dribbble API
function initializeDribbb(callback) {
	$.ajax({
		type: 'GET',
		url: 'https://api.dribbble.com/shots/popular',
		data: {},
		dataType: 'jsonp',
		success: callback
	});
}
