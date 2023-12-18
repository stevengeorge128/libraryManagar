

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



app.get("/get/mountain", async (req, res) => {
    try {
    let gettingBook = await fetch("https://openlibrary.org/search.json?title=my+side+of+the+mountain")
    if (gettingBook.ok) {
        let data = await gettingBook.json();
        let handlingFetchData = bookFetchHandler.parseBookSearch(data)
        res.status(200).json(handlingFetchData)
      } else {
        console.error("Error fetching data:", gettingBook.status, gettingBook.statusText);
      }
    } catch (err) {
        console.error(err);
        res.status(404).end()
    }
})




app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`))