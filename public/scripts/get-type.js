//Mostrar al usuario el tipo de espacio seleccionado en la vista anterior

document.addEventListener("DOMContentLoaded", function () {
    //Guardamos la url
    var url = window.location.href;
    //Obtener el último caracter de la url
    var tipo = url.slice(-1);
    //Asignar el tipo de escritorio a la variable strTipo
    if (tipo == 1){
        strTipo = "Escritorio individual"
    }else if (tipo == 2){
        strTipo = "Escritorio grupal"
    }else if (tipo == 3){
        strTipo = "Sala de reuniones"
    }
    else{
        strTipo = "Error! No definido"
    }
    //Mostrar strTipo en el label strTipo
    document.getElementById('strTipo').innerHTML='Tipo de espacio: ' + strTipo;  
})
