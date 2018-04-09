// include models directory
// it will search for index.js and include it
var db = require("../models");


exports.getTodos = function(req, res) {
    // find all todos in db
    db.Todo.find().then(function(todos) {
        // send them as json
        res.json(todos);
    }).catch(function(err) {
        // catch error
        res.send(err);
    });
};


exports.createTodo = function(req, res) {
    // create new todo
    // req.body = {name: "blabla"}
    db.Todo.create(req.body).then(function(newTodo) {
        // return newly created todo as json
        // respond with status code of CREATED 201
        res.status(201).json(newTodo);
    }).catch(function(err) {       
        res.send(err);
    });
};


exports.getTodo =  function(req, res) {
    // find todo by id
    db.Todo.findById(req.params.id).then(function(todo) {
        // return todo as json
        res.json(todo);
    }).catch(function(err) {
        // handle err
        res.send(err);
    });
};


exports.updateTodo =  function(req, res) {
    // find by id and update
    // first arg is what we are looking by
    // sec is new obj data, third to response with new data
    db.Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    }).catch(function(err) {
        res.send(err);
    });
};


exports.deleteTodo =  function(req, res) {
    db.Todo.remove({_id: req.params.id}).then(function() {
        res.json("Todo deleted");
    }).catch(function(err) {
        res.send(err);
    });
};


module.exports = exports;