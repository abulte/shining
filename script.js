var locale = (navigator.language || navigator.userLanguage).indexOf('fr') !== -1 ? 'fr-FR' : 'en-US';

var date = new Date(Date.now());

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

function plus () {
  date.setDate(date.getDate() + 1);
  setHeaderDate();
  doFetch();
}

function minus () {
  date.setDate(date.getDate() - 1);
  setHeaderDate();
  doFetch();
}

function setHeaderDate () {
  var dayName = date.toLocaleDateString(locale, {weekday: "long"});
  var day = date.toLocaleDateString(locale, {day: "numeric"});
  var month = date.toLocaleDateString(locale, {month: "long"});
  document.getElementById('dayName').innerHTML = dayName;
  document.getElementById('day').innerHTML = day;
  document.getElementById('month').innerHTML = month.toLowerCase();
}

function hideClass (className) {
  Array.prototype.forEach.call(document.getElementsByClassName(className), function (e) {
    e.style.display = 'none';
  });
}

function showClass (className) {
  Array.prototype.forEach.call(document.getElementsByClassName(className), function (e) {
    e.style.display = '';
  });
}

function doFetch () {
  strDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  showClass('spinner');
  hideClass('hour');
  fetch('http://api.sunrise-sunset.org/json?lat=48.929584&lng=2.046982&date=' + strDate + '&formatted=0').then(function(res) {
    showClass('hour');
    hideClass('spinner');
    res.json().then(function(data) {
      document.getElementById('sunrise-value').innerHTML = formatDate(data.results.sunrise);
      document.getElementById('sunset-value').innerHTML = formatDate(data.results.sunset);
    });
  });
}

ready(function () {
  // set today's date
  setHeaderDate();
  doFetch();
});
