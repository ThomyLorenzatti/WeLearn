const formationService = require("../../services/formations/FormationService");
const serviceTools = require("../../services/utils/ServiceTools");

const CreateFormation = async (req, res) => {
    try {
        const formation = req.body;
        let infos = await formationService.CreateFormation(formation);
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const GetFormations = async (req, res) => {
    try {
        const infos = await formationService.GetFormations();
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const GetFormationById = async (req, res) => {
    console.log("oui");
    try {
        const formationId = req.params.formation_id;
        const wallet = req.params.wallet;
        const formation = await formationService.GetFormationById(formationId, wallet);
        return res.status(formation.success ? 200 : 400).send(formation);
    } catch (error) {
        return res.status(500).send(error);
    }
}


module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById
}