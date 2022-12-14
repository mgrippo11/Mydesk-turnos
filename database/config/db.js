const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./db_config');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Error de coneccion con la DB');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La DB tiene muchas conecciones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Coneccion con la DB rechazada');
        }
    }
    if(connection) connection.release();
    console.log('DB CONNECTED');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;