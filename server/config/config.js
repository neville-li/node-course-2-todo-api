var env = process.env.NODE_ENV || "development";
console.log("env **********" , env);

if(env === "production") {
    process.env.MONGODB_URI = "mongodb+srv://m001-student:12345@sandbox-dkqfw.mongodb.net/TodoApp?retryWrites=true";
}
if(env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if(env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}