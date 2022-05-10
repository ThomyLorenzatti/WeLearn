import { WalletService } from "../services/WalletService";

let IWalletService = new WalletService()

export default class FormationController {
    
    async defineRoute() {
        return new Promise((resolve => {

            this.router.get('/wallet_info', async (req, res) => {
                return this.CreateFormation(req, res);
            });
            resolve(this.router);
        }));
    }

    async GetWalletInfo(req, res) {
        try {
            let wallet = await IWalletService.GetWalletInfo(req.body);
            res.status(200).json(wallet);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}