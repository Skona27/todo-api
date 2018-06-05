var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-app");
mongoose.Promise = Promise;
mongoose.set("debug", true);

module.exports.Todo = require("./todo");