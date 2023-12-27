const mongoose = require('mongoose');

// Establish mongoDB connection
var Schema = mongoose.Schema;


// Establish four required schemas
var tempBookLookupSchema = new Schema({
    title: String,
    authors: [],
    clientLookupHash: String,
    googleID: String,
    link: String,
    isbn: String,
    firstPublished: String,
    imageLink: String,
    imageHtml: String,
    extendedInfo: String,
    allDocs: String
});
const tempBookLookup = mongoose.model("tempBookLookup", tempBookLookupSchema);

module.exports = {
    tempBookLookup,
};