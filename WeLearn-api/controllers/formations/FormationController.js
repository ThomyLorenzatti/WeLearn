const formationService = require("../../services/formations/FormationService");
const serviceTools = require("../../services/utils/ServiceTools");

const CreateFormation = async (req, res) => {
    try {
        let infos = await formationService.CreateFormation(req);
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const UploadFormation = async (req, res) => {
    try {
        const data = req.body.formData;
        let infos = await formationService.UploadFormation(data);
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
    try {
        const formationId = req.params.id;
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
    GetFormationById,
    UploadFormation
}