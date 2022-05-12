const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.db_host,
        user     : process.env.db_user,
        password : process.env.db_password,
        database : process.env.db_name
    }
});

const CreateFormation = async () => {
    data = {
        success: true,
        message: "Formation créée avec succès"
    }
    return json(data)
}

const GetFormations = async () => {
    knex('formation').select('*').then(function(datas) {
        console.log(datas)
    });
}

const GetFormation = async (formationId) => {
    return ({});
}

module.exports = {
    CreateFormation,
    GetFormations
}
