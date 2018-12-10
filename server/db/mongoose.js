var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }); 
mongoose.connect("mongodb+srv://m001-student:12345@sandbox-dkqfw.mongodb.net/TodoApp?retryWrites=true", { useNewUrlParser: true }); 



module.exports = {
    mongoose
}