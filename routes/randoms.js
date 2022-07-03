const express = require('express')
const {getRandoms} = require('../controllers/randoms')

const router = express.Router()

router.get('/', getRandoms)

module.exports = router