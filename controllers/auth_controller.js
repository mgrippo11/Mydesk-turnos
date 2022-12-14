'use strict';
const poolDB = require('../database/config/db');
const bcryptjs = require('bcryptjs');
var userLogged = require('../middleware/userLoggedMiddleware');

const viewLogin = async (req,res) => {
    res.render('login');
}

const login = async (req, res) => {
    const legajo = req.body.legajo;
    const pass = req.body.password;
    //let passHaash = await bcryptjs.hash(pass, 4);

    if(legajo && pass){
        const sql = `SELECT * FROM usuarios WHERE legajo = ${legajo}`;
        
        poolDB.query(sql, async (err, rows) => {
            var perfil = rows[0].es_admin;            
            //console.log(perfil)     
            if(rows.length == 0){
                res.render('login', {
                    errors: {
                        legajo: {
                           msg: 'Las credenciales son incorrectas'}}
                })
            }else{
                const p = rows[0].password;
                const id = rows[0].id_usuario;
                if(!await bcryptjs.compare(pass, p)){
                res.render('login', {
                    errors: {
                        legajo: {
                           msg: 'Las credenciales son incorrectas'}}
                })
                
                }else{
                    req.session.userLogged = legajo;
                    res.cookie('legajo', legajo, {maxAge: 1000 * 3600})
                    //console.log(rows[0])
                    if(perfil == 0){
                        res.redirect('/home');
                    }else{
                        res.redirect('/reserva/reservas');
                    }                    
                }
            }
        })
    }else{
        res.render('login', {
            errors: {
                legajo: {
                   msg: 'Las credenciales son incorrectas'}}
        })
    }
};

module.exports = {
    login,
    viewLogin,
}