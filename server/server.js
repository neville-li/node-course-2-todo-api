var express = require("express");
var bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
       res.send({todos}); 
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/1234

app.get("/todos/:id",(req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        console.log("ID not valid");
        return res.status(404).send({});
    }

    Todo.findById(id).then(todo => {
        if(todo) {
           return res.status(200).send({todo});
        }
        res.status(404).send({});
    }).catch(e => res.status(404).send());
    //validate id using isValid
    // if not valid return 404, send back empty body

    //findById //success case if todo send it back if no todo - send back 404
    // error -> 400 send empty body
});

app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = {app};

