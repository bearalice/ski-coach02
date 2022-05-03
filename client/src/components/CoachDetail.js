import React from 'react'
import Coach from './Coach'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Button, Card } from 'react-bootstrap';
import LoginButton from './LoginButton';


export default function CoachDetail({ findCoach, deleteCoach, editCoach }) {
    const { id } = useParams();
    const [coach, setCoach] = useState({});
    const [reviews, setReviews] = useState([]);
    const baseURL = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        async function fetchCoach() {
            const data = await fetch(baseURL + `/coaches2/${id}`);
            const jsonData = await data.json();
            console.log(jsonData);
            setCoach(jsonData);
        }
        fetchCoach();
    }, [])

    useEffect(() => {
        async function fetchReviews() {
            const reviewData = await fetch(baseURL + `/coaches2/${id}/reviews`);
            const reviewJsonData = await reviewData.json();
            console.log("reviews for a specific coach:", reviewJsonData);
            setReviews(reviewJsonData);
        }
        fetchReviews();
    }, [])

    const { isAuthenticated, user } = useAuth0();

    const addReview = async (review) => {
        const tmp = await fetch(baseURL + `/coaches2/${id}/reviews`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    userID: user.nickname,
                    review: review
                })
            })
        const newReview = await tmp.json();
        setReviews([...reviews, newReview]);
    }

    const edit_Coach = async (coach) => {
        console.log('Trying to edit:', coach);
        const tmp = await fetch(baseURL + `/coaches2/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    coach: coach,
                    authhor: user.nickname,
                    reviews: reviews,
                })
            })
        const newCoach = await tmp.json();
        setCoach(newCoach);
    }

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const onSubmit = (e) => {
        if (!comment || !rating) {
            alert("Please enter review information!");
            return;
        }
        e.preventDefault();
        addReview({ comment, rating });
        setComment('');
        setRating('');
    }

    return (

        <>
            <div>You are viewing details of {coach.name} :).</div>
            {/* <Coach coach={coach} deleteCoach={deleteCoach} editCoach={editCoach} /> */}
            <h2>{coach.name}</h2>
            <p>{coach.email}</p>
            {isAuthenticated ?
                <>
                    {user.nickname === coach.author ?
                        <Button variant="danger" onClick={() => { deleteCoach(coach._id) }}> Delete Coach</Button>
                        : null}
                </>

                : null}

            {isAuthenticated ?
                <>
                    {user.nickname === coach.author ?
                        <Link to={`/coaches/${id}/edit`}>
                            <AiFillEdit onClick={() => { edit_Coach(coach) }} />
                        </Link>
                        : null}
                </>

                : null}

            {/* {isAuthenticated ?
                <Link to={`/coaches/${id}/edit`}>
                    <AiFillEdit onClick={() => { edit_Coach(coach) }} />
                </Link> : null} */}
            <div className='contactCoachButton'>
                <Button variant="primary" id="email-link" href={`mailto:${coach.email}`} >Contact {coach.name}</Button>
            </div>

            {isAuthenticated ?
                <>
                    <form onSubmit={onSubmit}>
                        <div className="form-control">
                            <label>Review description of the coach</label>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label>Overall rating of the coach</label>
                            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)}></input>
                        </div>
                        <input type="submit" value="Save Review" />
                    </form>

                    <div className='card-body p-3'> <h4>Reviews for {coach.name}</h4> </div></>
                : <p>
                    <LoginButton />
                    Login to add review</p>}


            <ul>
                {
                    reviews.map(review => (
                        <li key={review._id} >
                            <Card className='card mb-3 border-0' >
                                <p>Review: {review.comment}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Author: {review.author}</p>
                                {/* {isAuthenticated ?
                                    <>
                                        {user.nickname === review.author ?
                                            <Button variant="danger" onClick={() => { deleteCoach(coach._id) }}> Delete Review</Button>
                                            : null}
                                    </>

                                    : null} */}
                            </Card>
                        </li>
                    ))
                }
            </ul>

        </>
    )
}