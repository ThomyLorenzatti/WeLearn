const formationModel = require('../../models/formations/FormationModel.js');
const serviceTools = require('../../services/utils/ServiceTools');
const DTService = require('../../services/utils/DTService');
const axios = require('axios')
var FormData = require('form-data');
require('dotenv');

const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": process.env.starton_key}});

const CreateFormation = async (req) => {
    const wallet = req.body.wallet;
    const formation_name = req.body.formation_name;
    const price = req.body.price;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;

    if (!formation_name || !wallet || !question1 || !question2 || !answer1 || !answer2 || !price) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }

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

    const formationDTI = DTService.makeFormationDTI(req.body);
    formationDTI.nft_contract = keyScRes.data.smartContract.address;
    formationDTI.ntt_contract = certifScRes.data.smartContract.address;

    console.log(keyScRes.data.smartContract)

    let data = await formationModel.CreateFormation(formationDTI);

    if (!data) {
        return serviceTools.makeResponse(false, 'Error creating formations', {});
    }
    return serviceTools.makeResponse(true, '', data);
}

async function UploadPdf(buffer, name) {
    let data = new FormData();
    data.append("file", buffer, name);
    data.append("isSync", "true");
    const ipfsImg = await http.post("/pinning/content/file", data, {
        maxBodyLength: "Infinity",
        headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
    });
    return "https://ipfs.io/ipfs/" + ipfsImg.data;
  }

const UploadFormation = async (data) => {
    if (!data ||!data.buffer ||!data.id) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }
    const pdf_link = UploadPdf(data.buffer, data.id);
    const res = await formationModel.UpdateFormationPdfLink(id, pdf_link);
    if (!res) {
        return serviceTools.makeResponse(false, 'Error updating formation', {});
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

const hasNFTFormation = async (wallet, contract_formation) => {
    try {
        const nft = await starton.post(`/smart-contract/binance-testnet/${contract_formation}/read`, {
            functionName: "balanceOf",
            params: [wallet]
        });
        if (nft.data.response.raw != 0)
            return true;
    } catch {
        return false;
    }
    return false;
}

const GetFormationById = async (formationId, wallet) => {
    if (!formationId || !wallet)
        return serviceTools.makeResponse(false, 'Missing parameters', {bought: false});

    if (!hasNFTFormation(wallet, formationId))
        return serviceTools.makeResponse(true, 'You don\'t have this formation', {bought: false});
        
    let formation = await formationModel.GetFormationById(formationId);
    if (!formation)
        return serviceTools.makeResponse(false, 'Formation not found', {bought: false});

    formation.append({bought: true});
    return serviceTools.makeResponse(true, '', formation);
}

const BuyFormation = async (formationId, wallet) => {
    if (!formationId || !wallet)
        return serviceTools.makeResponse(false, 'Missing parameters', {});

    let formation = await formationModel.GetFormationById(formationId);
    if (!formation)
        return serviceTools.makeResponse(false, 'Formation not found', {});

    let balance = await serviceTools.getBalance(wallet);
    if (balance < formation.price)
        return serviceTools.makeResponse(false, 'Not enought funds', {});

    await starton.post(`/smart-contract/binance-testnet/${formation.nft_contract}/call`, {
        functionName: "safeMint",
        signerWallet: process.env.learn_adress,
        speed: "low",
        params: [wallet, formation.cid_nft],
    });

    if (!res)
        return serviceTools.makeResponse(false, 'Error sending transaction', {});
    return serviceTools.makeResponse(true, '', {});
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation,
    BuyFormation,
    hasNFTFormation
}