//const poolDB = require('../config/db');

const { Sequelize, DataTypes } = require("sequelize/dist");

//const users = function(user) {
  //  this.id_usuario = user.id_usuario,
   // this.nombre = user.nombre,
  //  this.mail = user.mail,
  //  this.legajo = user.legajo,
  //  this.password = user.password,
   // this.es_admin = user.es_admin,
   // this.empresa_id = user.empresa_id,
   // this.escritorio_id = user.escritorio_id,
    //this.edificio_id = user.edificio_id
//}

module.exports = (sequelize, dataTypes) => {
    const alias = 'User'

    const cols = {
        id_usuario: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        mail: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        legajo: {
            type: dataTypes.INTEGER(6),
            allowNull: false
        },
        password: {
            type: dataTypes.VARCHAR(20),
            allowNull: false
        },
        empresa_id: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        escritorio_id: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        edificio_id: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        es_admin: {
            type: dataTypes.INTEGER(1),
            allowNull: false
        }
    }
    const config = {
        tablename: 'usuarios',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Turno,{
            as: "turnos",
            foreignKey: "usuario_id"
        })
    }
    return User; 
}