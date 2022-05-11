const express = require('express')
const router = express.Router()
const formations = require('../controllers/formations/FormationController')
const wallets = require('../controllers/wallet/WalletController')

router.get('/formations', formations.GetFormations);
router.get('/formations/:id/:wallet', formations.GetFormationById);
router.get('/wallet_info', wallets.GetWalletInfo);

router.post('/create-formation', formations.CreateFormation);
router.post('/upload_formation', formations.UploadFormation);

module.exports = router