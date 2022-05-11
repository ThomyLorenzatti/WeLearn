const knex = require('knex');
var mysql = require('mysql2');
const serviceTools = require('../../services/utils/ServiceTools');

const query = serviceTools.getDbQuery();

const CreateFormation = async (formationDTI) => {
    const sql = "insert into formation (name, wallet_creator, nft_contract, ntt_contract, price, question1, question2, answer1, answer2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        formationDTI.name,
        formationDTI.wallet_creator,
        formationDTI.nft_contract,
        formationDTI.ntt_contract,
        formationDTI.price,
        formationDTI.question1,
        formationDTI.question2,
        formationDTI.answer1,
        formationDTI.answer2
    ];
    let res = await query(sql, values);
    console.log(res);
    return ({});
}

const UploadFormation = async (data) => {

}

const GetFormations = async () => {
    const infos = await query('select * from formation');
    if (!infos) {
        return ({});
    }
    return (infos);
}

const GetFormationById = async (formationId) => {
    const infos = await query('select * from formation where id = ?', [formationId]);
    if (!infos) {
        return ({});
    }
    return (infos);
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation
}