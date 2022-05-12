var mysql = require('mysql2');
const serviceTools = require('../../services/utils/ServiceTools');

const query = serviceTools.getDbQuery();

const CreateFormation = async (formationDTI) => {
    const sql = "insert into formation (name, wallet_creator, nft_contract, ntt_contract, price, question1, question2, answer1, answer2, cid_nft, cid_ntt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        formationDTI.name,
        formationDTI.wallet_creator,
        formationDTI.nft_contract,
        formationDTI.ntt_contract,
        formationDTI.price,
        formationDTI.question1,
        formationDTI.question2,
        formationDTI.answer1,
        formationDTI.answer2,
        formationDTI.cid_nft,
        formationDTI.cid_ntt,
    ];
    let res = await query(sql, values);
    return (res.insertId);
}

const UpdateFormationPdfLink = async (id, link) => {
    const infos = await query("update formation set pdf_link = ? where id = ?", [link, id]);
    if (!infos) {
        return ({});
    }
    return (infos);
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
    return (infos[0]);
}

const GetFormationsCertificates = async () => {
    const infos = await query('select * from formation');
    if (!infos) {
        return ({});
    }
    const addr = [];
    for (let i = 0; i < infos.length; i++) {
        addr.push({nft_contract: infos[i].nft_contract, ntt_contract: infos[i].ntt_contract, id: infos[i].id, name: infos[i].name});
    }
    return (addr);
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UpdateFormationPdfLink,
    GetFormationsCertificates
}
