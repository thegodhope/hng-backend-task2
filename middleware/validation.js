const { body } = require("express-validator");

const validatePersonBody = [
  body("name")
    .isString()
    .notEmpty()
    .isLength({ min: 1, max: 20 })
    .matches(/^[a-zA-Z ]+$/)
    .trim()
    .escape()
    .withMessage("Name must be a string"),
];

module.exports = {
  validatePersonBody,
};
