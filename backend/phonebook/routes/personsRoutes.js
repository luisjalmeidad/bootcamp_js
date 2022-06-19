const { Router } = require('express')
const {
  getAllPersons,
  getOnePerson,
  createOnePerson,
  updateOnePerson,
  deleteOnePerson
} = require('../controllers/personController')

const personsRoutes = Router()

personsRoutes.get('', getAllPersons)
personsRoutes.get('/:id', getOnePerson)
personsRoutes.post('', createOnePerson)
personsRoutes.put('/:id', updateOnePerson)
personsRoutes.delete('/:id', deleteOnePerson)

module.exports = personsRoutes
