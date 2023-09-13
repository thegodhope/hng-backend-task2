//controller for the root GET route

exports.index = (req, res) => {
  res.json({
    message: "My Stage two task",
  });
};
