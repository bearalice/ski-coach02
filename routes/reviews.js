const express = require('express');
const { findCoach } = require('../db.js');
const router = express.Router();
const db = require('../db.js');

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        console.log("TRYING TO save review data is ", data);
        const id = data._id;
        const userID = data.userID;
        const review = data.review;
        await db.saveReview(id, userID, review);
        res.send("REVIEW data saved");
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:reviewID', async function (req, res) {
    try {
        const id = req.params.coachID;
        await db.deleteCoach(id);
        res.send("COACH deleted");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;