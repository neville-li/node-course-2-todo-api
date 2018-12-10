const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove("5c0eefcf2acb5b2e220f3cae").then((todo) => {
    console.log(todo);
});
