module.exports = (sequelize, dataTypes) => {
    const alias = 'Edificio'

    const cols = {
        id_edificio: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        direccion: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        mail: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        telefono: {
            type: dataTypes.INTEGER(20),
            allowNull: false
        },
        id_empresa: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        cant_pisos: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    const config = {
        tablename: 'edificios',
        timestamps: false
    }
    const Edificio = sequelize.define(alias, cols, config);

    Edificio.associate = function(models) {
        Edificio.belongsTo(models.Empresa, {
          as: "empresa",
          foreignKey: "empresa_id"  
        })
    }
    return Edificio
}