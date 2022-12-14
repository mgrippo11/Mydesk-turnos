//Cargar fecha actual en el input date y limitar el rango de selección

document.addEventListener("DOMContentLoaded", function () {
  //guardar elemento fecha en una variable
  var date = document.getElementById("date");
  //guardar fecha actual en variable "today"
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  dmyToday = dd + "-" + mm + "-" + yyyy;
  //setear fecha actual como valor por defecto
  date.setAttribute("value", today);
  //setear fecha actual como valor mínimo
  date.setAttribute("min", today);
  //setear 31-diciembre-2025 como fecha maxima
  date.setAttribute("max", "2025-12-31");
});
