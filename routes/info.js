const express = require('express');
const compression = require('compression')
const {getInfo,getInfoWithConsoleLog} = require('../controllers/info')

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(compression())

router.get('/', getInfo)
router.get('/consolelog', getInfoWithConsoleLog)

module.exports = router