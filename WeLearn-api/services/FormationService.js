

export default class FormationService {

    async CreateFormation() {
        data = {
            succes: true,
            message: "Formation créée avec succès"
        }
        return res.status(200).json(data)
    }

}