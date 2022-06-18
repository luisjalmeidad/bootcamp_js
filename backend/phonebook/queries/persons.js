const Person = require("../models/Person");

const queryAllPersons = async () => {
  try {
    return await Person.find({});
  } catch (error) {
    throw error;
  }
};

const queryOnePersonById = async (id) => {
  try {
    return await Person.findById(id);
  } catch (error) {
    throw error;
  }
};

const queryRemoveOnePerson = (id) => {
  return Person.findByIdAndRemove(id, (err, result) => {
    if (err) throw err;
    return result;
  });
};

const queryOnePersonByName = async (name) => {
  try {
    const person = await Person.find({ name });
    return person;
  } catch (error) {
    throw error;
  }
};

const insertOnePerson = async (name, number) => {
  try {
    const person = new Person({
      name,
      number,
    });
    const savePerson = await person.save();
    return savePerson;
  } catch (error) {
    throw error;
  }
};

const queryUpdateById = (id, number) => {
  Person.findByIdAndUpdate(id, { number }, (err) => {
    if (err) return res.status(400).end(err);
    return res.status(200).end();
  });
};

module.exports = {
  queryAllPersons,
  queryOnePersonById,
  queryRemoveOnePerson,
  queryOnePersonByName,
  insertOnePerson,
  queryUpdateById,
};
