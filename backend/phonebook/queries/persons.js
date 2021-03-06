const Person = require('../models/Person')

const queryAllPersons = async () => {
  try {
    return await Person.find({}).exec()
  } catch (error) {
    throw new Error(`queryAllpersons: ${error}`)
  }
}

const queryOnePersonById = async (id) => {
  try {
    return await Person.findById(id).exec()
  } catch (error) {
    throw new Error(`queryOnePersonById: ${error}`)
  }
}

const queryRemoveOnePerson = async (id) => {
  try {
    await Person.findByIdAndRemove(id).exec()
    return
  } catch (error) {
    throw new Error(`queryRemoveOnePerson: ${error}`)
  }
}

const queryOnePersonByName = async (name) => {
  try {
    const person = await Person.find({ name }).exec()
    return person
  } catch (error) {
    throw new Error(`queryOnePersonByName: ${error}`)
  }
}

const insertOnePerson = async (name, number) => {
  try {
    const person = new Person({
      name,
      number
    })
    return await person.save()
  } catch (error) {
    throw new Error(`insertOnePerson: ${error}`)
  }
}

const queryUpdateById = async (id, number) => {
  try {
    console.log('Entre en el query')
    console.log({ number })
    return await Person.findByIdAndUpdate(
      id,
      { number },
      { new: true }
    ).exec()
  } catch (error) {
    throw new Error(`queryUpdateById: ${error}`)
  }
}

module.exports = {
  queryAllPersons,
  queryOnePersonById,
  queryRemoveOnePerson,
  queryOnePersonByName,
  insertOnePerson,
  queryUpdateById
}
