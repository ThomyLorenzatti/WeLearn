const express = require('express')
const router = express.Router()
const formations = require('../controllers/formations/FormationController')
const wallets = require('../controllers/wallet/WalletController')
const multer = require('multer');
const upload = multer();

router.get('/', (req, res) => (res.send('Hello World!')));
router.get('/formations', formations.GetFormations);
router.get('/formations/:id/:wallet', formations.GetFormationById);
router.get('/wallet_info', wallets.GetWalletInfo);
router.get('/get_certificate/:wallet', wallets.GetCertificate);
router.get('/get_my_certificate/:wallet', wallets.GetMyCertificate);

router.post('/submit_quiz', formations.SubmitQuiz)
router.post('/create-formation', formations.CreateFormation);
router.post('/upload_formation/:id', upload.any(), formations.UploadFormation);
router.post('/buy_formation', formations.BuyFormation);
router.post('/secret', formations.Secret);

module.exports = router