const { Router } = require('express')
const personRoutes = require('./personsRoutes')

const routes = Router()

routes.use('/persons', personRoutes)

module.exports = routes
