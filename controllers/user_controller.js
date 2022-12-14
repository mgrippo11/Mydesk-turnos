'use strict';
//const dbModel = require('../database/models/users_model');
const poolDB = require('../database/config/db');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


//OBTENER TODOS
const getAllUsers = async (req, res, next) => {
    const sql = 'SELECT * from usuarios WHERE es_admin = 0';
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.render('./admin/users-list', {rows})
        }
        else{
            console.error(err)
        }
    })
}

//OBTENER UNO
const getUser = async (req, res, next) => {
    const id = req.params.id;
    const sql = `SELECT * from usuarios WHERE id_usuario = ${id}`;
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send(rows)
        }
        else{
            console.error(err)
        }
    })
}

const registro = async (req, res) => {
    res.render('./admin/user-registration');
}

//AGREGAR
const addUser = async (req, res, next) => {
    const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('./admin/user-registration', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    const sql = 'INSERT INTO usuarios SET ?';
    const pass = `${req.body.legajo}2021`;
    let passHaash = await bcryptjs.hash(pass, 4);
    const data = {
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: passHaash,
        legajo: req.body.legajo,
        empresa_id: 1,
        escritorio_id: 1,
        edificio_id: 1,
        es_admin: 0
    };

    poolDB.query(sql, data, (err, rows, fields) =>{
        if(!err){
            res.redirect('/api/users')
        }
        else{
            res.render('error')
        }
    })

}

//ACTUALIZAR
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {nombre, mail, password} = req.body;
    const sql = `UPDATE usuarios SET nombre= '${nombre}', mail='${mail}', password= '${password}' WHERE id_usuario = ${id}`;
    await poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send("El usuario se actualizo correctamente!");
        }
        else{
            console.error(err)
        }
    })
}

//ELIMINAR
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id_usuario = ${id}`;
    await poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.send("El usuario se elimino correctamente!");
        }
        else{
            console.error(err)
        }
    })
}

//CERRAR SESIÓN
const logout = (req, res) => {
    res.clearCookie('legajo');
    req.session.destroy();
    res.redirect('/')
}

const miPerfil = (req,res) => {
    console.log(req.cookies.legajo)
    const legajo = req.cookies.legajo;

    const sql = `SELECT * from usuarios WHERE legajo = ${legajo}`;
    const msg = ''
    poolDB.query(sql, (err, rows, fields) =>{
        if(!err){
            res.render('./user/mi-perfil', {rows})
        }
        else{
            console.error(err)
        }
    })
}

const editarPassword = async (req, res) => {
    const id = await req.params.id;
    res.render('./user/editar-pass', {id})
}

const checkEditarPassword = async (req, res) => {
    let id = await req.params.id;

    let oldP = req.body.oldPassword
    let newP = req.body.newPassword
    let passHash = await bcryptjs.hash(newP, 4);
    const sqlUser = `SELECT * FROM usuarios WHERE id_usuario = ${id}`
    const sql = `UPDATE usuarios SET password= '${passHash}' WHERE id_usuario = ${id}`;

    if(oldP.length > 0){
        poolDB.query(sqlUser, async (err, rows) => {
            if(!err){
                if(await bcryptjs.compare(oldP, rows[0].password)){
                    if(newP.length > 0){
                        poolDB.query(sql, async (err, rowsU) => {
                            if(!err){
                                console.log("Se cambio la contraseña corectamente!")
                                res.render('./user/editar-pass', {id,
                                    ok: {
                                        newPassword: {
                                            msg: "¡La contraseña se cambio correctamente!"
                                        }
                                    }
                                })
                            }else{
                                console.error(err)
                            }
                        })
                    }else{
                        console.log("contraseña vacia")
                        res.render('./user/editar-pass', {id,
                        errors: {
                            newPassword: {
                                msg: "La contraseña nueva está vacía"
                            }
                        }
                    })                 
                    }
                }else{
                    console.log("la contraseña actual no coincide")
                    res.render('./user/editar-pass', {id,
                        errors: {
                            oldPassword: {
                                msg: "La contraseña actual no coincide"
                            }
                        }
                    })                     
                }
            }
            else{
                console.error(err)
            }
        })
    }else{
        res.render('./user/editar-pass', {id,
            errors: {
                oldPassword: {
                    msg: "La contraseña actual está vacía"
                }
            }
        })
    }
}

module.exports = {
    addUser, 
    getAllUsers,
    getUser,
    registro,
    updateUser,
    deleteUser,
    logout,
    miPerfil,
    editarPassword,
    checkEditarPassword
}