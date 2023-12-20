

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bookFetchHandler = require('./bookFetchHandler');
const crypto = require("crypto")
// const parser = require('body-parser');
// const cookieParser = require('cookie-parser');
// app.use(parser.json());


const port = 5000;


// Establish mongoDB connection
const db = mongoose.connection
const mongoDBURL = "mongodb://127.0.0.1/libraryManager";
mongoose.connect(mongoDBURL);
db.on("error", () => { console.log("MongoDB Connection Error") })
var Schema = mongoose.Schema;

// Establish four required schemas
var tempLookupSchema = new Schema({
    title: String,
    authors: [],
    isbn: String,
    coverIdOpenLib: String,
    firstPublished: String,
    authorKeyOpenLib: [],
    subjectsOpenLib: [],
    imgSrc: String,
    dewey: String,
    congress: String,
    extendedInfo: String,
    allDocs: String
});
const tempLookup = mongoose.model("tempLookup", tempLookupSchema);




app.use("", (req, res, next) => {
    console.log("\n-----------------------------\nThe request is:\t", req.url, "\n-----------------------------\n")
    next()
})

// Allow request from the client
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://127.0.0.1:5000");
    next();
});

// Serve static files
app.use(express.static('public_html'))

// First route requested when user searches for a book by title
app.get("/get/title/:title", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseBookTitleSearch(req.params.title)
        let userResponse = handlingFetchData;
        let temp = new tempLookup(handlingFetchData);
        let savingTemp = await temp.save();
        let id = savingTemp._id.toHexString()
        delete userResponse.extendedInfo;
        delete userResponse.allDocs;

        //console.log(userResponse);
        // console.log(handlingFetchData)
        res.status(200).json([userResponse, id]);
        //res.status(200).json(handlingFetchData);
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})

// // First route requested when user searches for a book by author
app.get("/get/author/:author", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseBookAuthorSearch(req.params.author)
        //console.log(JSON.stringify(handlingFetchData))
        // console.log(req.params.author)
        
        //console.log(handlingFetchData)
        res.status(200).json(handlingFetchData)
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})


app.get("/get/authAndTitle/:title/:author", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseTitleAndAuthorSearch(req.params.title, req.params.author)
        //console.log(JSON.stringify(handlingFetchData))
        // console.log(req.params.author)
        
        //console.log(handlingFetchData)
        res.status(200).json(handlingFetchData)
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})


app.get("/get/google", async (req, res) => {
    const getting = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:modern+elementary+particle+physics");
    const response = await getting.json();
    console.log(response.items[0]);
    res.json(response)
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`))