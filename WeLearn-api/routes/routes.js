const express = require('express')
const { FormationController } = require('../controllers')
const router = express.Router()

router.post('/create-formation', FormationController.CreateFormation)

module.exports = router