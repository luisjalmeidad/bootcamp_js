const {
  queryAllPersons,
  queryOnePersonById,
  queryRemoveOnePerson,
  queryOnePersonByName,
  insertOnePerson,
  queryUpdateById
} = require('../queries/persons')

const getAllPersons = async (req, res) => {
  try {
    const result = await queryAllPersons()
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(504).end(res)
  }
}

const getOnePerson = async (req, res) => {
  try {
    const id = req.params.id
    const result = await queryOnePersonById(id)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(400).end(error)
  }
}

const deleteOnePerson = async (req, res) => {
  try {
    const id = req.params.id
    await queryRemoveOnePerson(id)
    return res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

const createOnePerson = async (req, res) => {
  try {
    const personData = req.body
    if (!personData.name) {
      return res.status(400).end('Name is required')
    }
    if (!personData.number) {
      return res.status(400).end('Number is required')
    }
    const count = await queryOnePersonByName(personData.name)
    if (count.lenght > 0) {
      return res.status(200).end(`${personData.name} already exists`)
    }
    const resInsert = await insertOnePerson(
      personData.name,
      personData.number
    )
    console.log({ resInsert })
    return res.status(200).json(resInsert)
  } catch (error) {
    return res.status(400).end(error)
  }
}

const updateOnePerson = async (req, res) => {
  try {
    const { id } = req.params
    const { number } = req.body
    const result = await queryUpdateById(id, number)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).end(error)
  }
}

module.exports = {
  getAllPersons,
  getOnePerson,
  createOnePerson,
  updateOnePerson,
  deleteOnePerson
}
