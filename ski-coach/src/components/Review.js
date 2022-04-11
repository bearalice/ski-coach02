import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';


export default function Review({ isAuthed, isAuthor, review, deleteReview }) {


    return (
        <li>
            <div>
                {isAuthed ?
                    <>
                        <h2>Leave a Review</h2>
                    </>
                    : <h2>Login to leave a review</h2>}
                <p>This is a review.</p>
            </div>
        </li>
    )
}