const mongoose = require("mongoose");
const Person = require("./models/Person");

const connectionString = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionString, {
    autoIndex: true,
    dbName: "luisdb",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

/* const person = new Person({
  name: "Arto Hellas",
  number: "040-123456",
});

person
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); */
/* 
Note.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close;
}); */
/* 
{
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }
 */
