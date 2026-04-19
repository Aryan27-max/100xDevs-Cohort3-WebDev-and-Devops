/*
You have been given an express server which has a few endpoints.

Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
If a user sends more than 5 requests in a single second, the server should block them with a 404.
User will be sending in their user id in the header as 'user-id'
You have been given a numberOfRequestsForUser object to start off with which clears every one second
*/

// import express module using require function and store it in express variable
const express = require("express");

// create an express application using express function
const app = express();

// create a global variable numberOfRequestsForUser and assign it an empty object
let numberOfRequestsForUser = {};

// create a setInterval function that clears the numberOfRequestsForUser object every one second
setInterval(() => {
    // clear the numberOfRequestsForUser object every one second
    numberOfRequestsForUser = {};
}, 1000);

app.use(function (req, res, next){
    const userID = req.headers["user-id"];
    if(numberOfRequestsForUser[userID]){
        numberOfRequestsForUser[userID] = numberOfRequestsForUser[userID] +1;
        if(numberOfRequestsForUser[userID] > 5){
            res.status(404).send("No entry, Too many requests !!");
        } 
        else{
            next();
        }
    }else{
        numberOfRequestsForUser[userID] = 1;
        next();
    }
});
// create a route for GET request on /user path
app.get("/user", function (req, res) {
    // return a json response with name as Bharat
    res.status(200).json({ name: "Bharat" });
});

// create a route for POST request on /user path
app.post("/user", function (req, res) {
    // return a json response with message "created dummy user
    res.status(200).json({ msg: "created dummy user" });
});

// Start the server on port 3000
app.listen(3000);
