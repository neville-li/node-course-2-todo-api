var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); 
//"mongodb://localhost:27017/TodoApp"
//"mongodb+srv://m001-student:12345@sandbox-dkqfw.mongodb.net/TodoApp?retryWrites=true"


module.exports = {
    mongoose
}