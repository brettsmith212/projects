const router = require("express").Router();
const Todo = require("../models/Todo");

router.get("/", (req, res) => {
  Todo.find((err, result) => {
    if (err) throw new Error(err);
    console.log(result);
  });
});

router.post("/new", (req, res) => {
  console.log(req.body);
});

module.exports = router;
