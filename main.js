

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { tempBookLookup } = require('./schemas');
const bookFetchHandler = require('./bookFetchHandler');
const moreSearchOptions = require('./moreSearchOptions');

const crypto = require("crypto")
const parser = require('body-parser');
// const cookieParser = require('cookie-parser');
app.use(parser.json());


/*
        let toHash = pwd + userObjSalt;
        let h = crypto.createHash('sha3-256');
        let data = h.update(toHash, 'utf-8');
        let hashPwd = data.digest('hex');
*/


const port = 5000;

const validSearches = ["xxx"];

// Establish mongoDB connection
const db = mongoose.connection
const mongoDBURL = "mongodb://127.0.0.1/libraryManager";
mongoose.connect(mongoDBURL);
db.on("error", () => { console.log("MongoDB Connection Error") })

// Log all routes
app.use("", (req, res, next) => {
    console.log("\n-----------------------------\nThe request is:\t", req.url, "\n-----------------------------\n")
    next()
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Serve static files
app.use(express.static('public_html'))

// Route requested when user searches with only the title field and leaves the author field blank.
// Gets books by title using bookFetchHandler methods and then saves the search and responds to the 
// user.
app.get("/get/title/:title", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseBookTitleSearch(req.params.title)
        let userResponse = handlingFetchData;
        let temp = new tempBookLookup(handlingFetchData);
        let savingTemp = await temp.save();
        let id = savingTemp._id.toHexString()
        delete userResponse.extendedInfo;
        delete userResponse.allDocs;
        res.status(200).json([userResponse, id]);
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})

// Routes requested when the user just searches by author and leaves the title field blank. Gets
// all books by that author and responds.
app.get("/get/author/:author", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseBookAuthorSearch(req.params.author)
        console.log(handlingFetchData)
        res.status(200).json(handlingFetchData)
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})

// Route requested when user has both the title and author fields filled. Book is found and returned
// to user
app.get("/get/authAndTitle/:title/:author", async (req, res) => {
    try {
        let handlingFetchData = await bookFetchHandler.parseTitleAndAuthorSearch(req.params.title, req.params.author) 
        let temp = new tempBookLookup(handlingFetchData);
        let savingTemp = await temp.save();
        let id = savingTemp._id.toHexString()
        delete handlingFetchData.extendedInfo;
        delete handlingFetchData.allDocs;
        res.status(200).json([handlingFetchData, id])
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

app.get("/get/notTitleAndOrAuthResult/:result", (req, res) => {
    console.log(req.params.result)
    res.status(200).end()
})

app.post("/post/notTitleAndOrAuthResult", async (req, res) => {
    // console.log("inside the req");
    // console.log(req.body.tempLookup);
    let gettingOtherSearchOptions = await moreSearchOptions.getOtherSearchResultsFromDoc(req.body.tempLookup);
    //console.log(gettingOtherSearchOptions);
    res.status(200).json(gettingOtherSearchOptions);
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`))

