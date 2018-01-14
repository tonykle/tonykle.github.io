window.onload = () => {
  // open up email upon clicking
  document.getElementById('envelope').onclick = () => {
    window.location = 'mailto:tonyl3@uw.edu';
  }

  // redirecting to linked in profile upon clicking linkedin logo
  document.getElementById('linkedinlogo').onclick = () => {
    location.href = 'http://www.linkedin.com/in/tony-le-01140b79';
  }

  // date appendage
  let date = new Date();
  let month = (function() {
    if (date.getMonth() < 10) {
      return '0' + (date.getMonth() + 1);
    }
    return date.getMonth();
  })();
  let fullDate = month + '.' + date.getDate();
  document.getElementById('date').innerHTML = fullDate;

  // Invoking Open Weather Map's API to retrieve weather statistics in NYC
  $.ajax({
    type: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather?id=5128581&units=imperial&APPID=a40b4ca7691175cf366fcb7e19a3fbde',
    dataType: 'json',
    success: getWeatherDetails
  });

  // Parse API response for degrees fahrenheit in NYC
  function getWeatherDetails(weather) {
    console.log(weather);
    let degrees = weather.main.temp.toString();
    if (degrees.indexOf('.') > 0) {
      degrees = degrees.substring(0, degrees.indexOf('.'));
    }
    document.getElementById('weather').innerHTML = 'Currently ' + degrees + '°F in NYC'
  }
};
