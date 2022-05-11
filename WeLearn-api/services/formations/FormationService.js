const formationModel = require('../../models/formations/FormationModel.js');
const serviceTools = require('../../services/utils/ServiceTools');
const DTService = require('../../services/utils/DTService');

const CreateFormation = async (req) => {
    const wallet = req.body.wallet;
    const formation_name = req.body.formation_name;
    const price = req.body.price;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;

    if (!formation_name || !wallet || !question1 || !question2 || !answer1 || !answer2) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }

    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": process.env.starton_key}});

    let keyScRes = await http.post('/smart-contract/from-template', {
        "network": 'binance-testnet',
        "name": formation_name + " - key",
        "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
        "signerWallet": "0x22D901E22203673903263E363062e6759E0632C8",
        "params": [
            formation_name + " - key",
            'LRNNFT',
            'ipfs://ipfs/',
            'QmXV8vyGmrQGMxZvMeafr28We8JT2gGTiatHKiMVd8uTT8',
            '0x22D901E22203673903263E363062e6759E0632C8'
        ],
        "speed": "low",
    }).catch(err => {
        return serviceTools.makeResponse(false, 'Unknow error key sc creation', {});
    });

    let certifScRes = await http.post('/smart-contract/from-template', {
        "network": 'binance-testnet',
        "name": formation_name + " - certificate",
        "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
        "signerWallet": "0x22D901E22203673903263E363062e6759E0632C8",
        "params": [
            formation_name + " - certificate",
            'LRNNFT',
            'ipfs://ipfs/',
            'QmXV8vyGmrQGMxZvMeafr28We8JT2gGTiatHKiMVd8uTT8',
            '0x22D901E22203673903263E363062e6759E0632C8'
        ],
        "speed": "low",
    }).catch(err => {
        return serviceTools.makeResponse(false, 'Unknow error certif sc creation', {});
    });

    const nft_contract = keyScRes.data.smartContract.address;
    const ntt_contract = certifScRes.data.smartContract.address;

    const formationDTI = DTService.makeFormationDTI(formation_name, wallet, nft_contract, ntt_contract, price, question1, question2, answer1, answer2, content);

    let data = await formationModel.CreateFormation(formationDTI);
    if (!data) {
        return serviceTools.makeResponse(false, 'Error creating formations', {});
    }
    return serviceTools.makeResponse(true, '', data);
}

const UploadFormation = async (data) => {
    console.log(data);
    if (!data) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }
    const res = await formationModel.UploadFormation(data);
    if (!res) {
        return serviceTools.makeResponse(false, 'Error uploading formation', {});
    }
    return serviceTools.makeResponse(true, '', {});
}

const GetFormations = async () => {
    let data = await formationModel.GetFormations();
    if (!data) {
        return serviceTools.makeResponse(false, 'Error getting formations', {})
    }
    return serviceTools.makeResponse(true, '', data);
}

const GetFormationById = async (formationId, wallet) => {
    if (!formationId || !wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }
    let formation = await formationModel.GetFormationById(formationId);
    if (!formation) {
        return serviceTools.makeResponse(false, 'Formation not found', {});
    }
    return serviceTools.makeResponse(true, '', formation);
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation
}