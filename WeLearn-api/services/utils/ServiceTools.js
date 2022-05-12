const mysql = require('mysql');
const util = require('util');
require('dotenv').config()

const connexion = mysql.createConnection({
    host     : process.env.db_host,
    user     : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_name
});

const makeResponse = async (success, info, data) => {
    return {
        success: success,
        info: info,
        data: data
    }
}

const getInfoDb = () => {
    return connexion;
}

const getDbQuery = () => {
    const db = getInfoDb();
    return (util.promisify(db.query).bind(db));
}

module.exports = {
    makeResponse,
    getInfoDb,
    getDbQuery
}