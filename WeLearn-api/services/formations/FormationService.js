const formationModel = require('../../models/formations/FormationModel.js');
const serviceTools = require('../../services/utils/ServiceTools');
const DTService = require('../../services/utils/DTService');
const nftjs = require('../../nft/nft.js')
const axios = require('axios')
var FormData = require('form-data');
require('dotenv');

const starton = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": process.env.starton_key}});

const CreateFormation = async (req) => {
    const wallet = req.body.wallet;
    const formation_name = req.body.formation_name;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;

    if (!formation_name || !wallet || !question1 || !question2 || !answer1 || !answer2) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }

    let keyScRes = await starton.post('/smart-contract/from-template', {
        "network": 'binance-testnet',
        "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
        "name": formation_name + " - key",
        "signerWallet": process.env.signer_wallet,
        "speed": "low",
        "params": [
            formation_name + " - key",
            'LRNNFT',
            'ipfs://ipfs/',
            'QmeUVQn7NTiQXkGvvVEFkhgEBhDVvyhcXWsgaiBzKhAfC7',
            process.env.signer_wallet
        ],
    }).catch(err => {
        return serviceTools.makeResponse(false, 'Unknow error key sc creation', {});
    });

    let certifScRes = await starton.post('/smart-contract/from-template', {
        "network": 'binance-testnet',
        "name": formation_name + " - certificate",
        "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
        "signerWallet": process.env.signer_wallet,
        "speed": "low",
        "params": [
            formation_name + " - certificate",
            'LRNNFT',
            'ipfs://ipfs/',
            'QmeUVQn7NTiQXkGvvVEFkhgEBhDVvyhcXWsgaiBzKhAfC7',
            process.env.signer_wallet
        ],
    }).catch(err => {
        return serviceTools.makeResponse(false, 'Unknow error certif sc creation', {});
    });

    // let cid_nft = await nftjs.createImageNFT(formation_name, true);
    // let cid_ntt = await nftjs.createImageNFT(formation_name, false);
    req.body.cid_nft = "";
    req.body.cid_ntt = "";

    const formationDTI = await DTService.makeFormationDTI(req.body);
    
    formationDTI.nft_contract = keyScRes.data.smartContract.address;
    formationDTI.ntt_contract = certifScRes.data.smartContract.address;

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

    const ipfsImg = await starton.post("/pinning/content/file", data, {
        maxBodyLength: "Infinity",
        headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
    });
    return "https://ipfs.io/ipfs/" + ipfsImg.data.pinStatus.pin.cid;
  }

const UploadFormation = async (data) => {

    if (!data ||!data.buffer ||!data.id) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }

    const pdf_link = await UploadPdf(data.buffer, data.id);
    const res = await formationModel.UpdateFormationPdfLink(data.id, pdf_link);
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
        console.log("before: ", contract_formation)
        const nft = await starton.post(`/smart-contract/binance-testnet/${contract_formation}/read`, {
            functionName: "balanceOf",
            params: [wallet]
        });
        console.log("raw: ", nft.data.response.raw, "addr: ", contract_formation);
        if (nft.data.response.raw != 0)
            return true;
    } catch (err) {
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

    const mint = await starton.post(`/smart-contract/binance-testnet/${formation.nft_contract}/call`, {
        functionName: "safeMint",
        signerWallet: process.env.signer_wallet,
        speed: "low",
        params: [
            wallet,
            "QmeUVQn7NTiQXkGvvVEFkhgEBhDVvyhcXWsgaiBzKhAfC7"
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

    const res = await starton.post(`/smart-contract/binance-testnet/${process.env.learn_adress}/call`, {
        "functionName": 'transfer',
        "signerWallet": process.env.signer_wallet,
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

const SubmitQuiz = async (formationId, wallet) => {
    if (!formationId || !wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters', {});
    }
    let formation = await formationModel.GetFormationById(formationId);
    if (!formation) {
        return serviceTools.makeResponse(false, 'Formation not found', {});
    }
    const res = await hasNFTFormation(wallet, formation.nft_contract);
    if (res == false) {
        return serviceTools.makeResponse(false, 'Formation not bought', {});
    }
    const mint = await starton.post(`/smart-contract/binance-testnet/${formation.ntt_contract}/call`, {
        functionName: "safeMint",
        signerWallet: process.env.signer_wallet,
        speed: "low",
        params: [
            wallet,
            "QmeUVQn7NTiQXkGvvVEFkhgEBhDVvyhcXWsgaiBzKhAfC7"
        ],
    }).catch(err => {
        console.log(err);
    });
    if (!mint)
        return serviceTools.makeResponse(false, 'Error sending transaction', {});
    return serviceTools.makeResponse(true, '', {});
}

module.exports = {
    CreateFormation,
    GetFormations,
    GetFormationById,
    UploadFormation,
    BuyFormation,
    hasNFTFormation,
    Secret,
    SubmitQuiz
}