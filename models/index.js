var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-app");
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");