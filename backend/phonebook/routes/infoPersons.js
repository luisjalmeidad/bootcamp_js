const { Router } = require('express')
const { getInfo } = require('../controllers/infoController')

const infoPersons = Router()

infoPersons.get('', getInfo)

module.exports = infoPersons
