const bcrypt = require("bcryptjs");

let hashedPassowrd = bcrypt.hashSync("csu123");

console.log(hashedPassword);

let hashTest = bcrypt.compareSync("csu123", hashedPassword);

console.log(hashTest);
