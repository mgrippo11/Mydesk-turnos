//Este script se incluye en reservations-list.ejs
//Genera una lista con las reservas realizadas según el día elegido

document.addEventListener("DOMContentLoaded", function () {
    //guardar fecha en variable dateInput     
    var dateInput = date.value();
    })
    //actualizar fecha seleccionada en variable dateInput      
    date.addEventListener("change", function() {
        var dateInput = this.value;
    })
    update.addEventListener("click",function(){ 
    //convertir fecha al formato local    
        var dmyDate = dateInput.split("/").reverse().join("-");
    //mostrar fecha seleccionada en el titulo de la lista
        document.getElementById("dateOutput").innerHTML = "Mostrando turnos del día " + dmyDate;  
    // generar lista de espacios disponibles    

    })