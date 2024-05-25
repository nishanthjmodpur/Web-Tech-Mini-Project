const mongoose = require("mongoose");

// to establish connection with the mongoDB database
mongoose.connect("mongodb://localhost:27017/Registration", {
    
// promise return if connection with the mongodb database is successful
}).then(() =>
{
    console.log("Connection is successful");

// if connection is not successful
}).catch((e) =>
{
    console.log("No connection")
})