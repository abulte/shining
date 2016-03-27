function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function formatDate (date) {
  var date = new Date(date);
  return date.getHours() + ':' + date.getMinutes();
}

ready(function () {
  // set today's date
  var now = new Date(Date.now());
  var dayName = now.toLocaleDateString("fr-FR", {weekday: "long"});
  var day = now.toLocaleDateString("fr-FR", {day: "numeric"});
  var month = now.toLocaleDateString("fr-FR", {month: "long"});
  document.getElementById('dayName').innerHTML = dayName;
  document.getElementById('day').innerHTML = day;
  document.getElementById('month').innerHTML = month.toLowerCase();

  // get data
  fetch('http://api.sunrise-sunset.org/json?lat=48.929584&lng=2.046982&date=today&formatted=0').then(function(res) {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('container').style.display = '';
    res.json().then(function(data) {
      document.getElementById('sunrise-value').innerHTML = formatDate(data.results.sunrise);
      document.getElementById('sunset-value').innerHTML = formatDate(data.results.sunset);
    });
  });
});
