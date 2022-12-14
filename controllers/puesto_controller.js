'use strict';
const poolDB = require('../database/config/db');

const getlibres = async (req, res, next) => {
    const tipo = req.params.tipo;
    res.render("./user/seleccionar-turno");
}


//OBTENER TODOS
const getAll = async (req, res, next) => {
    const sql = 'SELECT * from puestos';
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send(rows)
        }
        else{
            console.error(err)
        }
    })
}


module.exports = {
    getlibres,
    getAll
}