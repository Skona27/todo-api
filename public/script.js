// wait until page loads
$(document).ready(function () {
    // get request to url
    $.getJSON("/api/todos").then(function (todos) {
        // display all todos
        displayTodos(todos);
    }).catch(function (err) {
        // check error
        console.log(err);
    })

    // post request, create todo
    $("#todoInput").keypress(function(event) {
        // check if enter was clicked
        if(event.keyCode === 13) {
            createTodo();
        }
    });

    // listen on delete click
    $(".list").on("click", "span", function(event) {
        event.stopPropagation();
        deleteTodo($(this).parent());
    })

    // listen on update click
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    })
});


function displayTodos(todos) {
    todos.forEach(function (todo) {
        displayTodo(todo);
    })
}


function displayTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    // check if completed
    if(todo.completed) {
        newTodo.addClass("done");
    }
    // add id to todo data
    newTodo.data("id", todo._id); 
    newTodo.data("completed", todo.completed);
    // add todo item to list
    $(".list").append(newTodo);
}


function createTodo() {
    // get input text
    var input = $("#todoInput").val();
    // post request to url, send input data
    $.post("/api/todos", {name: input}).then(function(todo) {
        // c lear the input and display new todo
        $("#todoInput").val("")
        displayTodo(todo);
    }).catch(function(err) {
        // catch err
        console.log(err);
    });
}


function deleteTodo(todo) {
    // delete request url
    var deleteURL = "/api/todos/" +  todo.data("id");
    // request to api
    $.ajax({
        method: "DELETE",
        url: deleteURL,
    }).then(function() {
        // remove item from UI
        todo.remove();
    }).catch(function(err) {
        console.log(err);
    });
}


function updateTodo(todo) {
    // update url
    var updateURL = "/api/todos/" +  todo.data("id");
    var isDone = todo.data("completed");
    var data = {completed: !isDone};
    
    // request to api
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: data,
    }).then(function(updatedTodo) {
        // change class
       todo.toggleClass("done");
       // change completed data
       todo.data("completed", !isDone);
    }).catch(function(err) {
        console.log(err);
    });
}