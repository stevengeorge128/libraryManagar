

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bookFetchHandler = require('./bookFetchHandler');
// const parser = require('body-parser');
// const cookieParser = require('cookie-parser');
// app.use(parser.json());

const port = 5000;

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
        delete userResponse.extendedInfo;
        delete userResponse.allDocs;
        console.log(userResponse);
        // console.log(handlingFetchData)
        res.status(200).json(userResponse);
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


app.get("/get/google", async (req, res) => {
    const getting = await fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:modern+elementary+particle+physics");
    const response = await getting.json();
    console.log(response.items[0]);
    res.json(response)
})


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`))