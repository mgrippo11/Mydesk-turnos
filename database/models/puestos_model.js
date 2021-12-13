module.exports = (sequelize, dataTypes) => {
    const alias = 'Puesto'

    const cols = {
        id_puesto: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        num_puesto: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        piso_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        tipo: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        caracteristica: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        }
    }
    
    const config = {
        tablename: 'puestos',
        timestamps: false
    }
    const Puesto = sequelize.define(alias, cols, config);

    Puesto.associate = function(models) {
        Puesto.belongsTo(models.Piso, {
          as: "piso",
          foreignKey: "piso_id"  
        })
    }
    return Edificio
}