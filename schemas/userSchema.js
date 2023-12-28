const mongoose = require('mongoose');

// Establish mongoDB connection
var Schema = mongoose.Schema;

// Establish four required schemas
var userSchema = new Schema({
    username: String,
    password: String,
    salt: String,

});
const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};