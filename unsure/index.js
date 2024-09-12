//I think you have to use this with live server

const express = require('express');
const routes = require("../database/routes");
const cors = require('cors');
const path = require('path');
const handleSearch = require('../searchHandler')
// const bodyParser = require("body-parser");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// //idk what that does tbh

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {

    console.log("here")
    res.render("index")

}) // need to render index with this :3

app.get("/api/getnutrition", async (req, res) => {

    console.log("in route");
    //this comes from the query sent w the get request
    const toSearch = req.query.toSearch;
    console.log("toSearch is: ", toSearch);

    if (!toSearch) {

        //400 is a bad request error, "server unable to process a request due to a client error"
        return res.status(400).send({message: "no query param :("});

    }
    //since we're awaiting the function, we use try catch.  not awaiting ig you use then/catch?

    try {
        //wanna return data eventually, get that from searching
        const data = await handleSearch(toSearch);
        return res.send(data);

    } catch(error) {
        //error code 500 means internal server error
        res.status(500).send({message: "failed to fetch data :("});
        
    }

});


app.listen(3000);