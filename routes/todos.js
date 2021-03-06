var express = require("express");
var router = express.Router();

// routes functions in different dir
var helpers = require("../helpers/todos");

router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route("/:id")
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;