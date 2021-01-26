const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbConfig = require('./config/db.config.js');

mongoose.Promise = global.Promise; 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

const user = require("./routes/index");

app.use(user);
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});