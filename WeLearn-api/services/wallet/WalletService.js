const axios = require('axios');
const serviceTools = require('../../services/utils/ServiceTools');
const formationModel = require('../../models/formations/FormationModel.js');
const formationService = require('../formations/FormationService.js');
require('dotenv').config()

const starton = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": process.env.starton_key,},})

const GetWalletInfo = async (wallet) => {
    if (!wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters to getWalletInfo', {})
    }
    let scRes = await starton.post(`/smart-contract/binance-testnet/${process.env.learn_adress}/read`,
    {
        "functionName": 'balanceOf',
        "params": [wallet],
    })

    let bnbRes = await starton.get(`/wallet/${wallet}/binance-testnet/balance`)
    if (!bnbRes) {
        return serviceTools.makeResponse(false, 'Error getting bnb balance', {})
    }

    let lrn = parseFloat(scRes.data.response.raw / (10**18)).toFixed(3)
    let bnb = parseFloat(bnbRes.data.balance.raw / (10**18)).toFixed(3)
    let data = {bnb: bnb.toString(), lrn: lrn.toString()}

    if (!data) {
        return serviceTools.makeResponse(false, 'Error getting wallet info', {})
    }
    return serviceTools.makeResponse(true, '', data)
}

const GetCertificate = async (wallet) => {
    if (!wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters to getCertificate', {})
    }
    const infos = await formationModel.GetFormationsCertificates(wallet);
    let certificates = [];

    for (let i = 0; i < infos.length; i++) {
        const ntt_ret = await formationService.hasNFTFormation(wallet, infos[i].ntt_contract);
        if (ntt_ret == true) {
            certificates.push({ntt_contract: infos[i].ntt_contract, id: infos[i].id, name: infos[i].name});
        }
    }
    return serviceTools.makeResponse(true, '', certificates);
}

const GetMyCertificate = async (wallet) => {
    if (!wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters to getCertificate', {})
    }
    const infos = await formationModel.GetFormationsCertificates(wallet);
    let keys = [];
    let certificates = [];

    if (!infos || infos.length == 0) {
        return serviceTools.makeResponse(false, 'No certificates found', {})
    }

    for (let i = 0; i < infos.length; i++) {
        const nft_ret = await formationService.hasNFTFormation(wallet, infos[i].nft_contract);
        if (nft_ret == true) {
            keys.push({nft_contract: infos[i].nft_contract, id: infos[i].id, name: infos[i].name});
        }
        const ntt_ret = await formationService.hasNFTFormation(wallet, infos[i].ntt_contract);
        if (ntt_ret == true) {
            certificates.push({ntt_contract: infos[i].ntt_contract, id: infos[i].id, name: infos[i].name});
        }
    }
    return serviceTools.makeResponse(true, '', {certificates: certificates, keys: keys});
}

module.exports = {
    GetWalletInfo,
    GetCertificate,
    GetMyCertificate
}