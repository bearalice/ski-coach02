const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        console.log("TRYING TO save user ", data);
        // const id = data._id;
        // const userID = data.userID;
        // const review = data.review;
        await db.addUser(data);
        res.send("USER data saved");
    } catch (err) {
        console.log(err);
    }
})

router.get('/', async function (req, res) {
    const users = await db.findUsers(req.params);
    const userData = users.map(user => {
        return {
            name: user.userName
        }
    });
    res.json(userData);
});

module.exports = router;