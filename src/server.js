'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const handleNotFound = require('./handlers/404.js');
//validator
const handleError = require('./handlers/500.js');
const logger = require('./middleware/logger.js');
const timeStamp = require('./middleware/timestamp.js');

const validator = require('./middleware/validator');
const app = express();

let database = {
    abc111: {name: "John"},
    def222: {name: "Cathy"},
    ghi333: {name: "Zachary"},
    jkl444: {name: "Allie"},
};

app.use(cors()); // no restrictions on the app working on the internet

app.use(timeStamp);
app.use(logger);

app.use(handleError);
// route definitions
app.get('/', getHomePage);
app.get('/data', getData);
app.get('/data/:id', getOneRecord);  // /data/abc111
app.get('/broken', simulateError);
// Added Route

app.get('/person', validator, (req, res) => {
    const name = req.query.name;
    res.status(200).json({name: name});
});


app.get("*", handleNotFound);


app.get('/', function (req, res) {
    res.send('id: ' + req.query.string);
});

// Route Handlers

function getData(req, res) {
    res.status(200).json(database);
}

function getOneRecord(req, res, next) {
    // http://localhost:3000/data/abc111 => req.params.id = "abc111"
    let id = req.params.id;
    if (database[id]) {
        res.status(200).json(database[id]);
    } else {
        next("Record Not Found")
    }
}

function getHomePage(req, res) {
    res.status(200).send("Hello World");
}

function simulateError(req, res, next) {
    next("We have a problem");
}

function start(port) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

function getPerson(req, res) {

}

module.exports = {app, start};
