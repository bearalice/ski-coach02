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
app.use(express.static(__dirname + "/public/build"));
app.use('/coaches2', coaches); //this is a middleware  
app.use('/coaches/:id/reviews', reviews); //this is a middleware



app.get('/', function (req, res) {
    res.send('coach good morning!');
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.listen(port, function () {
    console.log(`app listening on ${port}`);
    db.dbConnect();
});


//test