module.exports = (sequelize, dataTypes) => {
    const alias = 'Piso'

    const cols = {
        id_piso: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        num_piso: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        cant_escritorios: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        edificio_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
        }
    
    const config = {
        tablename: 'pisos',
        timestamps: false
    }
    const Piso = sequelize.define(alias, cols, config);

    Piso.associate = function(models) {
        Piso.belongsTo(models.Edificio, {
          as: "edificio",
          foreignKey: "edificio_id"  
        });
        Piso.hasMany(models.Puesto, {
            as: "puestos",
            foreignKey: "piso_id"
        })
    }
    return Piso
}