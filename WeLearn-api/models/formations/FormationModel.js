var mysql = require('mysql2');
const serviceTools = require('../../services/utils/ServiceTools');

const query = serviceTools.getDbQuery();

const CreateFormation = async () => {
    data = {
        success: true,
        message: "Formation créée avec succès"
    }
    return json(data)
}

const GetFormations = async () => {
    const infos = await query('select * from formation');
    if (!infos) {
        return (error);
    }
    return (infos);
}

const GetFormation = async (formationId) => {
    return ({});
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormation
}