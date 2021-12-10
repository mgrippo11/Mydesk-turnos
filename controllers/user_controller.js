'use strict';
//const dbModel = require('../database/models/users_model');
const poolDB = require('../database/config/db');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


//OBTENER TODOS
const getAllUsers = async (req, res, next) => {
    const sql = 'SELECT * from usuarios';
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
            res.redirect('/login')
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
    return res.render('./user/editar-pass', {id})
}

const checkEditarPassword = async (req, res) => {
    let id = await req.params.id;

    let contrasenaInput = req.body.password
    let contrasenaBdd = password.passHaash

    if (bcryptjs.compareSync(contrasenaInput, contrasenaBdd) == true){
        const sql = `UPDATE usuarios SET password= '${password}' WHERE id_usuario = ${id}`;

       const password = bcryptjs.hashSync(req.body.nuevaContrasena, 10)       
        await poolDB.query(sql, password, (err, rows, fields) =>{
            if(!err){
                res.send("La contraseña se actualizo correctamente!");
            }
            else{
                console.error(err)
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