'use strict';

var count = 0;
$(document).ready(function() {
  const AIRPORT_LIST = ['SFO', 'LAX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'ORD', 'PDX']; // used for URL in ajax
  AIRPORT_LIST.forEach(airportName => {
    let urlCurr = 'http://services.faa.gov/airport/status/' + airportName + '?format=application/json';
    initializeAirports(urlCurr, createAirports);
  })
});

// ajax calls to receive JSON data
function initializeAirports(airportName, createAirports) {
  $.ajax({
    type: 'GET',
    url: airportName,
    data: {},
    dataType: 'jsonp',
    success: createAirports
  })
}

// this function creates airport objects and adds them to an array
function createAirports(data) {
  let airport = {
    abbrev : data.IATA,
    fullName : data.name,
    city : data.city,
    status: data.status.reason.replace(".", ""),
    temp : data.weather.temp,
    updated: "Last Updated: " + data.weather.meta.updated
  }
  let airportCurr = document.createElement("div");
  $(airportCurr)
    .attr("id", airport.abbrev + "1")
    .attr("class", "airportContainers");
  if (count % 3 == 0) {
    $(airportCurr).css("clear", "both");
  }
  $(airportCurr).css("float", "left");

  $("#area").append(airportCurr);

  Object.getOwnPropertyNames(airport).forEach(val => {
    let airPortProp;
    if (val == "abbrev") {
      airPortProp = document.createElement("h3");
    } else {
      airPortProp = document.createElement("div");
    }

    // airport box becomes red if there is a delay
    if (airport.status != "No known delays for this airport") {
      $("#" + airport.abbrev + "1").css("background-color", "#ef3d47");
    }
    $(airPortProp)
      .attr("id", val)
      .html(airport[val]);
    $("#" + airport.abbrev + "1").append(airPortProp);
  });
  count++;
}
