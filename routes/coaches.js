const express = require('express');
const { findCoach } = require('../db.js');
const router = express.Router();
const db = require('../db.js');


router.get('/', async function (req, res) {

    const d = await db.findCoaches(req.params);
    res.json(d);
    //console.log(d);
});

router.get('/:id/reviews', async function (req, res) {

    const id = req.params.id;
    const reviewData = await db.findReviews(id);
    res.json(reviewData);
    //console.log("now req is ", req.params);
    //console.log("now reviewData is ", reviewData);
});

router.get('/:id', async function (req, res) {
    const coach = await db.findCoach(req.params);
    res.json(coach);
});

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        const userID = data.author;
        const coach = data.coach;
        await db.saveCoach(userID, coach);
        res.send("coach data saved");
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id/edit', async function (req, res) {
    try {
        const data = req.body;
        console.log("Edit ", data);
        const id = data._id;
        const userID = data.author;
        const coachName = data.name;
        const coachEmail = data.email;
        await db.updateCoach(id, coachName, coachEmail);
        console.log("to update for COACH:");
        console.log(coachName);
        // console.log("to update for COACH:");
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:coachID', async function (req, res) {
    try {
        const id = req.params.coachID;
        await db.deleteCoach(id);
        res.send("COACH deleted");
    } catch (err) {
        console.log(err);
    }
})


router.post('/:id/reviews', async function (req, res) {
    try {
        const data = req.body;
        console.log("TRYING TO save review data is ", data);
        const id = data.id;
        const userID = data.userID;
        const review = data.review;
        await db.saveReview(id, userID, review);
        res.send("REVIEW data saved");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;