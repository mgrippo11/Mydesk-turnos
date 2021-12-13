'use strict';
//const dbModel = require('../database/models/users_model');
const poolDB = require('../database/config/db');

const contact = (req, res) => {
    res.render('./user/contact')
}

const addContacto = async (req, res, next) => {
    const legajo = req.cookies.legajo;
    const mensaje = `${req.body.mensaje}`;
    const sqlUser = `SELECT * from usuarios WHERE legajo = ${legajo}`;
    const sql = 'INSERT INTO contacto SET ?';
    const f = new Date();
    const newFecha = (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
    //console.log(mensaje)
    poolDB.query(sqlUser, (err, rows, fields) =>{
        if(!err){
            const data = {
                usuario_id: rows[0].id_usuario,
                mensaje: mensaje,
                fecha: newFecha
            };
            if(mensaje.length > 0){
                poolDB.query(sql, data, (err, rowsC, fields) => {
                    if(!err){
    
                        res.render('./user/contact', {
                            ok: {
                                mensaje: {
                                    msg: "¡La consulta se envió correctamente!"
                                }
                            }
                        })
                    }else{
                        console.error(err)
                    }
                }) 
           }else{
                res.render('./user/contact', {
                    errors: {
                        mensaje: {
                            msg: "El mensaje no puede estar vacio!"
                        }
                    }
                })
            }                 
        }
        else{
            console.error(err)
        }
    })

}

const viewContacto = async (req, res, next) => {
    const legajo = req.cookies.legajo;
    const sqlUser = `SELECT * from usuarios`;
    const sql = 'SELECT * from contacto';
    poolDB.query(sqlUser, (err, rowsU, fields) =>{
        if(!err){
            poolDB.query(sql, (err, rowsC, fields) => {
                if(!err){
                    //console.log(rowsU)
                    res.render('./admin/contacto-list', {rowsU, rowsC})
                }
                else{
                    console.error(err)
                }
            })
        }else{
            console.error(err)
        }
    })
}

module.exports = {
    contact,
    addContacto,
    viewContacto
}