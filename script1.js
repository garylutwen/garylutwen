
fetch("http://worldtimeapi.org/api/timezone/Europe/Moscow")
  .then(response => response.json())
  .then(data => console.log(data.dst,data.datetime));

