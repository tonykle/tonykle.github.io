'use strict';

const ROW_LENGTH = 3; // how many boxes are to be in each row
const OUTLINE_COLOR = "#ef3d47"; // color to highlight an airport delay/closure
let count = 0; // count to create unique IDs and to properly format boxes

$(document).ready(function() {
  const AIRPORT_LIST = ['SFO', 'LAX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'ORD', 'PDX']; // used for URL in ajax
  AIRPORT_LIST.forEach(airportName => {
    let urlCurr = 'http://services.faa.gov/airport/status/' + airportName + '?format=application/json';
    initializeAirports(urlCurr);
  })
});

// ajax calls to receive JSON data
function initializeAirports(airportName) {
  $.ajax({
    type: 'GET',
    url: airportName,
    data: {}, //
    dataType: 'jsonp',
    success: createAirports,
    error: function(e) {
      console.log("Sorry - one of the airports' data could not be loaded.");
    }
  })
}

// this function creates and uses airport objects to create boxes with live airport information
function createAirports(data) {
  let airport = {
    abbrev   : data.IATA,
    fullName : data.name,
    city     : data.city,
    status   : data.status.reason.replace(".", ""),
    temp     : data.weather.temp,
    updated  : "Last Updated: " + data.weather.meta.updated
  }
  let doc = document;
  let airportCurr = doc.createElement("div");
  $(airportCurr)
    .attr("id", airport.abbrev + count + "")
    .attr("class", "airportContainers");

  $("#area").append(airportCurr);

  // airport box outline becomes thicker and red if there is a delay
  if (airport.status != "No known delays for this airport") {
    $("#" + airport.abbrev + count)
      .css("outline-color", OUTLINE_COLOR)
      .css("outline-width", "9px");
  }

  // 3 x 3 box layout
  if (count % ROW_LENGTH === 0) {
    $(airportCurr).css("clear", "right");
  }

  // loop over all properties of airport objects
  Object.getOwnPropertyNames(airport).forEach(val => {
    let airPortProp;
    if (val === "abbrev") {
      airPortProp = doc.createElement("h3");
    } else {
      airPortProp = doc.createElement("div");
    }

    $(airPortProp)
      .attr("id", val)
      .html(airport[val]);
    $("#" + airport.abbrev + count).append(airPortProp);
  });
  count++;
}
