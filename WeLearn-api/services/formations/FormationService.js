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

    if (!formation_name || !wallet || !question1 || !question2 || !answer1 || !answer2) {
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

    console.log(keyScRes.data.smartContract);

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
        const nft = await http.post(`/smart-contract/binance-testnet/${contract_formation}/read`, {
            functionName: "balanceOf",
            params: [wallet]
        });
        if (nft.data.response.raw != 0)
            return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    return false;
}

const GetFormationById = async (formationId, wallet) => {
    if (!formationId || !wallet)
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    
    let formation = await formationModel.GetFormationById(formationId);
    if (!formation)
        return serviceTools.makeResponse(false, 'Formation not found', {});

    let res = await hasNFTFormation(wallet, formation.nft_contract);
    if (res == false) {
        formation.bought = false;
    } else {
        formation.bought = true;
    }
    return serviceTools.makeResponse(true, '', formation);
}

const BuyFormation = async (formationId, wallet) => {
    if (!formationId || !wallet)
        return serviceTools.makeResponse(false, 'Missing parameters', {});
  
    let formation = await formationModel.GetFormationById(formationId);
    if (!formation)
        return serviceTools.makeResponse(false, 'Formation not found', {});
    const mint = await http.post(`/smart-contract/binance-testnet/${formation.nft_contract}/call`, {
        functionName: "safeMint",
        signerWallet: "0x22D901E22203673903263E363062e6759E0632C8",
        speed: "low",
        params: [
            wallet,
            "METADATAURI" //formation.cid_nft // need to update this
        ],
    }).catch(err => {
        console.log(err);
    });
    if (!mint)
        return serviceTools.makeResponse(false, 'Error sending transaction', {});
    return serviceTools.makeResponse(true, '', {});
}

const Secret = async (destination_wallet, lrn_amount) => {
    if (!destination_wallet)
        return res.status(400).send(serviceTools.makeResponse(false, 'destination_wallet is required', {}));
    const res = await http.post(`/smart-contract/binance-testnet/${process.env.learn_adress}/call`, {
        "functionName": 'transfer',
        "signerWallet": "0x22D901E22203673903263E363062e6759E0632C8",
        "speed": "low",
        "params": [
            destination_wallet,
            lrn_amount + "000000000000000000"
        ],
    }).catch(err => {
        console.log(err);
    });
    return serviceTools.makeResponse(true, '', {});
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation,
    BuyFormation,
    hasNFTFormation,
    Secret
}