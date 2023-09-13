const express = require("express");
const { validatePersonBody } = require("../middleware/validation");
const {
  apiCheck,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

const router = express.Router();

//run health check
router.get("/", apiCheck);

//create person
router.post("/", validatePersonBody, createPerson);

//get person
router.get("/:id", getPerson);

//update person
router.put("/:id", validatePersonBody, updatePerson);

//delete person
router.delete("/:id", deletePerson);

module.exports = router;
