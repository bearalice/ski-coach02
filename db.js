if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const uri = process.env.URI;
const { MongoClient, ObjectId } = require('mongodb');
//const uri = 'URI';
const client = new MongoClient(uri);

module.exports =
{
    dbConnect: async function dbConnect() {
        try {
            await client.connect();
            console.log("Coach DB connected!");
        } catch (err) {
            console.log(err);
        }
    },
    saveCoach: async function saveCoach(author, coach) {
        try {
            coach.reviews = [];
            coach.author = author;
            coach.name = coach.name;
            coach.email = coach.email;
            await client.db('cs5610').collection('coaches').insertOne(coach);
        } catch (err) {
            console.log(err);
        }
    },

    findCoaches: async function findCoaches(coach) {
        try {
            const data = await client.db('cs5610').collection('coaches').find();
            const dataArray = await data.toArray();
            return dataArray;
        } catch (err) {
            console.log(err);
        }
    },
    findCoach: async function findCoach(id) {
        try {
            const data = await client.db('cs5610').collection('coaches').findOne({ _id: ObjectId(id) });
            //const dataArray = await data.toArray();
            return data;
        } catch (err) {
            console.log(err);
        }
    },
    findReviews: async function findReviews(coachID) {
        try {
            const coach = await client.db('cs5610').collection('coaches').findOne({ _id: ObjectId(coachID) });
            const reviews = [];
            for (review of coach.reviews) {
                const r = await client.db('cs5610').collection('reviews').findOne({ _id: ObjectId(review) });
                reviews.push(r);
            }
            //await client.db('cs5610').collection('reviews').find({ id: ObjectId(review) });
            console.log("in findReviews:", reviews);
            return reviews;
        } catch (err) {
            console.log(err);
        }
    },
    deleteCoach: async function deleteCoach(coachID) {
        try {
            await client.db('cs5610').collection('coaches').deleteOne({ _id: ObjectId(coachID) });
            console.log("to delete for COACH:");
            console.log(coachID);
        } catch (err) {
            console.log(err);
        }
    },
    updateCoach: async function updateCoach(coachID, name, email) {
        try {
            await client.db('cs5610').collection('coaches').updateOne({ _id: ObjectId(coachID) },
                { $set: { name: name, email: email } });
            console.log("to update for COACH:");
            console.log(name + " " + email);
        } catch (err) {
            console.log(err);
        }
    },
    saveReview: async function saveReview(id, userID, review) {
        try {
            const data = await client.db('cs5610').collection('coaches').findOne({ _id: ObjectId(id) });
            await client.db('cs5610').collection('reviews').insertOne(review);
            review.author = userID;
            console.log("REVIEW ID:", review._id);
            data.reviews.push(review._id);
            await client.db('cs5610').collection('coaches').updateOne({ _id: ObjectId(id) }, { $set: { reviews: data.reviews } });

        } catch (err) {
            console.log(err);
        }
    },
    deleteReview: async function deleteReview(reviewID) {
        try {
            await client.db('cs5610').collection('reviews').deleteOne({ _id: ObjectId(reviewID) });
            console.log("to delete for REVIEW:");
            console.log(reviewID);
        } catch (err) {
            console.log(err);
        }
    },
}
//Add a function in db.js that receives an id and deletes the document with _id equal to the ObjectId(id)