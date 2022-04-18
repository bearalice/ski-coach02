import React from 'react'
import Coach from './Coach'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Button, Card } from 'react-bootstrap';


export default function EditCoach() {
    const { id } = useParams();
    const [coach, setCoach] = useState({});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onSubmit = (e) => {
        if (!name || !email) {
            alert("Please enter information!");
            return;
        }
        e.preventDefault();
        setCoach({ name: name, email: email });
        console.log("now coach is:", coach);
        console.log("now name is:", name);
        edit_Coach(id, name, email, user, coach);
        setName('');
        setEmail('');
        navigate(`/coaches/${id}`);
    }


    useEffect(() => {
        async function fetchCoach() {
            const data = await fetch(`/coaches/${id}`);
            const jsonData = await data.json();
            console.log(jsonData);
            setCoach(jsonData);
        }
        fetchCoach();
    }, [])

    useEffect(() => {
        edit_Coach(coach);
    }, [])


    const { isAuthenticated, user } = useAuth0();


    const edit_Coach = async (id, name, email, user, coach) => {
        console.log('Trying to edit:', coach);
        const tmp = await fetch(`/coaches2/${id}/edit`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _id: id,
                    name: name,
                    email: email,
                    authhor: user.nickname,
                    reviews: coach.reviews,
                })
            })
        const newCoach = await tmp.json();
        setCoach(newCoach);
    }


    return (

        <>
            <div>You are editing details of {coach.name} :).</div>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Coach Name</label>
                    <input type="text" placeholder={coach.name} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Coach Contact</label>
                    <input type="text" placeholder={coach.email} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <input type="submit" value="Update" />
            </form>
            {/* <div className="reviews"> Reviews for {coach.name} </div>
            {
                coach.reviews.map(review => (
                    <Card >
                        <p>Review: {review.comment}</p>
                        <p>Rating: {review.rating}</p>
                    </Card>
                ))
            } */}


        </>
    )
}