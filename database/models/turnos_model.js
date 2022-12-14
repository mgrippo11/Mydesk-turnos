const poolDB = require('../config/db');

//const { DataTypes, col } = require("sequelize/dist");

const turnos = function(turno) {
    this.id_turno = turno.id_turno,
    this.fecha = turno.fecha,
    this.estado = turno.estado,
    this.usuario_id = turno.usuario_id,
    this.escritorio_id = turno.escritorio_id
}

/* module.exports = (sequelize, dataTypes) => {
    const alias = 'Turno'

    const cols = {
        id_turno: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        escritorio_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        fecha: {
            type: dataTypes.DATE(),
            allowNull: false
        },
        estado: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    const config = {
        tablename: 'turnos',
        timestamps: false
    }
    const Turno = sequelize.define(alias, cols, config);

    Turno.associate = function(models) {
        Turno.belongsTo(models.User, {
          as: "usuarios",
          foreignKey: "usuario_id"  
        })
    }
    return Turno
}
*/