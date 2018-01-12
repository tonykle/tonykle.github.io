window.onload = () => {
  // open up email upon clicking
  let envelope = document.getElementById('envelope');
  envelope.onclick = () => {
    window.location = "mailto:tonyl3@uw.edu";
  }

  // redirecting to linked in profile upon clicking linkedin logo
  let linkedinlogo = document.getElementById('linkedinlogo');
  linkedinlogo.onclick = () => {
    location.href = "http://www.linkedin.com/in/tony-le-01140b79";
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
};
