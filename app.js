const express = require('express');
const coaches = require('./routes/coaches.js');
const reviews = require('./routes/reviews.js');
const db = require('./db.js');
// const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/coaches', coaches); //this is a middleware  
app.use('/coaches/:id/reviews', reviews); //this is a middleware



app.get('/', function (req, res) {
    res.send('coach good morning!');
});

app.listen(port, function () {
    console.log(`app listening on ${port}`);
});

app.listen(8000, () => {
    console.log("running on 5000");
    db.dbConnect();
});