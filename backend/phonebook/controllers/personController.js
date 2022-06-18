const {
  queryAllPersons,
  queryOnePersonById,
  queryRemoveOnePerson,
  queryOnePersonByName,
  insertOnePerson,
  queryUpdateById,
} = require("../queries/persons");

const getAllPersons = async (req, res) => {
  try {
    const result = await queryAllPersons();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(504).end(res);
  }
};

const getOnePerson = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await queryOnePersonById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).end(err);
  }
};

const deleteOnePerson = async (req, res) => {
  try {
    const id = req.params.id;
    await queryRemoveOnePerson(id);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error);
  }
};

const createOnePerson = async (req, res) => {
  try {
    const personData = req.body;
    if (!personData.name) {
      return res.status(400).end("Name is required");
    }
    if (!personData.number) {
      return res.status(400).end("Number is required");
    }
    const count = await queryOnePersonByName(personData.name);
    if (count > 0) {
      console.log({ count }); // PROBAR ESTE HECHIZO DE ALBERTO
      console.log("Ya existe el nombre");
      return res.status(200).end(`${personData.name} already exists`);
    }
    const resInsert = await insertOnePerson(
      personData.name,
      personData.number
    );
    console.log(resInsert);
    return res.status(200).json(resInsert);
  } catch (error) {
    return res.status(400).end(error);
  }
};

const updateOnePerson = (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.body;
    const result = queryUpdateById(id, number);
    return res.status(200).end(result);
  } catch (error) {
    return res.status(400).end(error);
  }
};

// -------------------------------------------------------------------------------------------
/* app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id, (err, result) => {
    if (err) return res.status(504).end(err);
    return res.status(204).json(result);
  });
}); */

/* app.post("/api/persons", (req, res) => {
  const personData = req.body;

  if (!personData.name) {
    return res.status(400).end("Name is required");
  }
  if (!personData.number) {
    return res.status(400).end("Number is required");
  }

  Person.find({ name: personData.name }, (err, result) => {
    if (err) {
      console.log({ err });
      return res.status(400).end();
    }

    if (result > 0) {
      console.log("Ya existe el nombre");
      return res.status(400).end(`${personData.name} already exists`);
    }
    const person = new Person({
      name: personData.name,
      number: personData.number,
    });

    person.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      console.log(result);
      return res.status(200).json(result);
    });
  });
}); */

/* app.put("/api/persons/:id", (req, res) => {
  try {
    const id = req.params.id;
    const number = req.body.number;
    Person.findByIdAndUpdate(id, { number }, (err) => {
      if (err) return res.status(400).end(err);
      return res.status(200).end();
    });
  } catch (error) {
    return res.status(400).end(error);
  }
}); */

/* 

routes.get("", getAllPersons);
routes.get("/:id", getOnePerson);
routes.post("", createOnePerson);
routes.put("/:id", updateOnePerson);
routes.delete("/:id", deleteOnePerson); 

*/

module.exports = {
  getAllPersons,
  getOnePerson,
  createOnePerson,
  updateOnePerson,
  deleteOnePerson,
};
