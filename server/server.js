require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {authenticate} = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.send("hello");
});

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

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//POST /users

app.post("/users", (req, res) => {
    var body =_.pick(req.body,["email", "password"]);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }). catch((e) => {
        res.status(400).send(e);
    })
});

app.get("/users/me", authenticate, (req, res) => {
   res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};

