const { validationResult } = require("express-validator");
const Person = require("../model/personSchema");

//api check
const apiCheck = (req, res) => {
  res.json({
    message: "Welcome to my API",
  });
};

//Create person controller
const createPerson = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.array()[0].msg });
  }

  const { name } = req.body;

  try {
    const personExist = await Person.find({ name });

    if (personExist.length !== 0) {
      return res.json({
        message: `Person with name ${name} already exist`,
      });
    }

    const newPerson = new Person({ name: name });
    await newPerson.save().then((result) => {
      return res
        .status(200)
        .json({ message: "user created successfully", result: result });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get person by id
const getPerson = async (req, res) => {
  const { id } = req.params;

  try {
    try {
      const person = await Person.find({ _id: id });
      if (person.length === 0) {
        return res.status(404).json({ message: "Person not found!" });
      }
      res.status(200).json({ person });
    } catch (error) {
      return res.status(400).json({ message: "invalid id" });
    }
  } catch (err) {
    console.error(err);
  }
};

//update person by Id
const updatePerson = async (req, res) => {
  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.array()[0].msg });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: id },
      { $set: body },
      {
        new: true,
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found!" });
    }

    return res
      .status(200)
      .json({ message: "Person updated", person: updatedPerson });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete person by id
const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPerson = await Person.findOneAndDelete({ _id: id });

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found!" });
    }

    return res.status(200).json({
      message: "Person deleted",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  apiCheck,
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
