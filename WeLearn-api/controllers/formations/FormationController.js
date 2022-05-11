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
        let infos = await formationService.GetFormations();
        console.log("infos: ", infos)
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const GetFormation = async (req, res) => {
    try {
        let formationId = req.params.formation_id;
        let formation = await formationService.GetFormation(formationId);
        return res.status(formation.success ? 200 : 400).send(formation);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormation
}