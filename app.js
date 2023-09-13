const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const createError = require("http-errors");
const errorHandler = require("./middleware/handleErrors");
require("./database/connection");

const app = express();

const PersonRouter = require("./routes/person.route");
const indexRoute = require("./routes/index.route");

// load middleware
app.use(bodyParser.json());
app.use(express.json());

// define routes
app.use("/api", PersonRouter);
app.use("/", indexRoute);

//implement errors handler
app.use(async (req, res, next) => {
  next(createError.NotFound("Resource not found"));
});

app.use(errorHandler);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
