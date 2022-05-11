const formationModel = require('../../models/formations/FormationModel.js')
const serviceTools = require('../../services/utils/ServiceTools')

const CreateFormation = async () => {
    data = {
        succes: true,
        message: "Formation créée avec succès"
    }
    return res.status(200).json(data)
}

const GetFormations = async () => {
    let data = await formationModel.GetFormations();
    if (!data) {
        return serviceTools.makeResponse(false, 'Error getting formations', {})
    }
    return serviceTools.makeResponse(true, '', data);
}

const GetFormation = async (formationId) => {
    let formation = await formationModel.GetFormation(formationId);
    if (!formation) {
        return serviceTools.makeResponse(false, 'Formation not found', {});
    }
    return serviceTools.makeResponse(true, '', formation);
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormation
}