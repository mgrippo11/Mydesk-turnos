'use strict';
//const dbModel = require('../database/models/users_model');
const poolDB = require('../database/config/db');

const viewReserva = async (req, res, next) => {
    const legajo = req.cookies.legajo;
    const tipo = req.params.tipo;
    const sql = `SELECT * from usuarios WHERE legajo = ${legajo}`;
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            //res.send(rows)
            res.render("./user/seleccionar-turno", {tipo, rows});
        }
        else{
            console.error(err)
        }
    })
};

//OBTENER TODOS
const getAllReservas = async (req, res, next) => {
    const sql = 'SELECT * from turnos';
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            //res.send(rows)
            res.render("./admin/reservations-list", {rows})
        }
        else{
            console.error(err)
        }
    })

}

//OBTENER POR FECHA
const getReservasFecha = async (req, res, next) => {
    const date = req.body.date;
    const sql = `SELECT * from turnos WHERE fecha = "${date}"`;
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send(rows)
        }
        else{
            console.error(err)
        }
    })
}

//OBTENER UNO
const getReserva = async (req, res, next) => {
    console.log(req.params.id)
    const id = req.params.id;
    const sql = `SELECT * from turnos WHERE usuario_id = ${id}`;
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.render("./user/mis-turnos", {rows})
        }
        else{
            console.error(err)
        }
    })

};

//ACTUALIZAR
const updateReserva = async (req, res, next) => {
    const id = req.params.id;
    const fecha = req.body.fecha;
    const sql = `UPDATE turnos SET fecha= '${fecha}' WHERE id_turno = ${id}`;
    await poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send("La reserva se actualizo correctamente!");
        }
        else{
            console.error(err)
        }
    })
};

//ELIMINAR
const deleteReserva = async (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM turnos WHERE id_turno = ${id}`;
    poolDB.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send("Lar reserva se elimino correctamente!");
        }
        else {
            console.error(err);
        }
    })
};

//AGREGAR
const addReserva = async (req, res, next) => {
    const tipo = req.body.tipo;
    const fecha = req.body.fecha;
    const user = req.body.usuario_id;
    var puestos = 0;
    const sqlValidaUser = `SELECT * FROM turnos WHERE fecha = "${fecha}" AND usuario_id = ${user}`;
    const sqlFecha = `SELECT * FROM turnos WHERE fecha = "${fecha}" AND tipo = ${tipo}`;
    const sqlTurno = 'INSERT INTO turnos SET ?';
    switch(tipo) {
        case "1":
            puestos = 40;
            break;
        case "2":
            puestos = 30;
            break;
        case "3":
            puestos = 10;
            break;
      }
    //Valida User
    poolDB.query(sqlValidaUser, (err, rows, fields) =>{
        const escritorio = (rows.length+1);
        var p;
        if(rows.length == 0){
        //Valida fecha
            poolDB.query(sqlFecha, (err, rows, fields) =>{
                if(rows.length < puestos){
                    switch(tipo) {
                        case "1":
                            if(escritorio <=20){
                                p = 1;
                            }else{
                                p = 2;
                            };
                            break;
                        case "2":
                            if(escritorio <=15){
                                p = 3;
                            }else{
                                p = 4;
                            };
                            break;
                        case "3":
                            p = 5;
                            break;
                      }
                    const data = {
                        usuario_id: user,
                        escritorio_id: escritorio,
                        fecha: fecha,
                        tipo: tipo,
                        piso: p
                    };
        //Reserva con 1er puesto vacio
                    poolDB.query(sqlTurno, data, (err, rows, fields) =>{
                        if(!err){
                            res.render('./user/res-turno',{
                                alert:"alert-success",                                
                                message:"El turno fue reservado con éxito!",
                                error:"",
                                date:`Fecha: ${req.body.fecha}`,
                                escritorio:`Escritorio: ${data.escritorio_id}`,
                                id: user
                            })
                            //res.send(`Puesto ${data.escritorio_id} reservado para la fecha ${fecha}`)
                        }else{
                            res.render('./user/res-turno',{
                                alert:"alert-danger",
                                message:"Hubo un error al reservar el turno",
                                error:err,
                                date:"",
                                escritorio:"",
                                id: user
                            })
                        }
                    })
                }else{
                    res.render('./user/res-turno',{
                        alert:"alert-danger",
                        message:`Puesto no disponible para la fecha ${fecha}`,
                        error:err,
                        date:"",
                        escritorio:"",
                        id: user
                    })
                    //res.send(`Puesto no disponible para la fecha ${fecha}`)
                }
            })

        }else{
            res.render('./user/res-turno',{
                alert:"alert-danger",
                message:`Ya tenes reservado un puesto para la fecha ${fecha}`,
                error:err,
                date:"",
                escritorio:"",
                id: user
            })
            //res.send(`Ya tenes reservado el puesto ${rows[0].escritorio_id} para la fecha ${fecha}`)
        }
    })
}

module.exports = {
    viewReserva, 
    getAllReservas,
    getReserva,
    addReserva,
    updateReserva,
    deleteReserva,
    getReservasFecha
}