import { FormationService } from "../services/FormationService";

let IFormationService = new FormationService()

export default class FormationController {
    
    async defineRoute() {
        return new Promise((resolve => {

            this.router.post('/create-formation', async (req, res) => {
                return this.CreateFormation(req, res);
            });
            resolve(this.router);
        }));
    }

    async CreateFormation(req, res) {
        try {
            let formation = await IFormationService.CreateFormation(req.body);
            res.status(200).json(formation);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}