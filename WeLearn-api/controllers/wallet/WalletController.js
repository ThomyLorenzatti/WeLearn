const walletService = require('../../services/wallet/WalletService');

const GetWalletInfo = async (req, res) => {
    try {
        const wallet = req.query.wallet;
        let infos = await walletService.GetWalletInfo(wallet);
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const GetCertificate = async (req, res) => {
    try {
        const wallet = req.params.wallet;
        let infos = await walletService.GetCertificate(wallet);
        console.log(infos)
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const GetMyCertificate = async (req, res) => {
    try {
        const wallet = req.params.wallet;
        let infos = await walletService.GetMyCertificate(wallet);
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    GetWalletInfo,
    GetCertificate,
    GetMyCertificate
}