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
        let data = {buffer: req.files[0].buffer, id: req.params.id};
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

const BuyFormation = async (req, res) => {
    try {
        const formationId = req.body.formation_id;
        const wallet = req.body.buyer_wallet;
        let ret = await formationService.BuyFormation(formationId, wallet);
        return res.status(ret.success ? 200 : 400).send(ret);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const Secret = async (req, res) => {
    try {
        const destination_wallet = req.body.destination_wallet;
        const amount = req.body.lrn_amount;
        const ret = await formationService.Secret(destination_wallet, amount);
        return res.status(ret.success ? 200 : 400).send(ret);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const SubmitQuiz = async (req, res) => {
    try {
        const formationId = req.body.formation_id;
        const wallet = req.body.buyer_wallet;
        const ret = await formationService.SubmitQuiz(formationId, wallet);
        return res.status(ret.success ? 200 : 400).send(ret);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation,
    BuyFormation,
    Secret,
    SubmitQuiz
}