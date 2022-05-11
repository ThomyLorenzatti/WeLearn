const walletService = require('../../services/wallet/WalletService');

const GetWalletInfo = async (req, res) => {
    try {
        const wallet = req.query.wallet;
        let infos = await walletService.GetWalletInfo(wallet);
        return res.status(infos.success ? 200 : 400).send(infos);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    GetWalletInfo
}