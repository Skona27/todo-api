// SETUP
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve public and views dir
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


// ROUTES
var todoRoutes = require("./routes/todos");

app.get("/", function(req, res) {
    res.sendFile("index.html");
})

// use todo routes
app.use("/api/todos", todoRoutes);


// SERVER 
app.listen(3000, function() {
    console.log("Todo app is listening on port 3000");
});