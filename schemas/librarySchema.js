const mongoose = require('mongoose');

// Establish mongoDB connection
var Schema = mongoose.Schema;

// Establish four required schemas
var librarySchema = new Schema({
    name: String,
    location: String,
    creator: String,
    owner: String,
    members: String,
    books: String,
    stats1: String,
    stats2: String,
    stats3: String,
    stats4: String,
    bookshelves: String,
    subjects: String,
    recommendations: String,
    extra: String,
    extra: String,
    extra: String,
    extra: String,


});
const Library = mongoose.model("library", librarySchema);

module.exports = {
    Library,
};