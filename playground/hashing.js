// const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hasedPassword = "$2a$10$A4SFiPJYLAE3DMuD9rfDd.zfGc4TOQ4d6qAR93atFvQZZ7pPqtwdO";

bcrypt.compare(password, hasedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, "123abc");
// var decoded = jwt.verify(token, "123abc"); // return payload or throw error if salt is not correct
// console.log(`decoded`, decoded); // get payload

// console.log(token);

// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "secret").toString()
// };


// var resultHash = SHA256(JSON.stringify(token.data) + "secret").toString();

// if(resultHash === token.hash) {
//     console.log("data not changed");
// } else {
//     console.log("data changed");
// }