require("dotenv").config();
require("./mongo");

const Person = require("./models/Person");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const uuid = require("node-uuid");
const routes = require("./routes");
const app = express();

morgan.token("id", function getId(req) {
  return req.id;
});

morgan.token("body", (req) => JSON.stringify(req.body));

function assignId(req, res, next) {
  req.id = uuid.v4();
  next();
}

app.use(bodyParser.json());
app.use(cors());
app.use(assignId);

app.use(
  morgan(
    ":id :method :url :status :res[content-length] - :response-time body: :body "
  )
);

let persons = [];

app.get("/", (req, res) => {
  res.send("<h2> Hello World </h2>");
});
app.use("/api", routes);
/* app.get("/api/persons", (req, res) => {
  Person.find({}, (err, result) => {
    if (err) return res.status(400).end(err);
    return res.status(200).json(result);
  });
}); */

app.get("/api/info", (req, res) => {
  const date = new Date();
  res.send(
    `<h3>Phonebook has info for ${persons.length} people</h3> <p> ${date} </p>`
  );
});

/* app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id, (err, result) => {
    if (err) return res.status(400).end(err);
    return res.status(200).json(result);
  });
}); */

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:${PORT}/api/persons`);
  console.log(`http://localhost:${PORT}/api/info`);
});
