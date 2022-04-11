import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Review from './Review';
import { Button, ListGroup } from 'react-bootstrap';

export default function Coach({ coach, deleteCoach, editCoach }) {

    return (
        <>
            <ListGroup >
                <div className='card mb-3 border-0'>
                    <div >
                        <h2>{coach.name}</h2>
                        <Link to={`/coaches/${coach._id}`}> <Button variant="primary" >View Detail</Button></Link>
                        {/* <FaTimes onClick={() => { deleteCoach(coach._id) }} />
                        <a href="/">
                            <AiFillEdit onClick={() => { deleteCoach(coach._id) }} />
                        </a> */}
                    </div>
                    <p>{coach.email}</p>
                </div>
            </ListGroup>



        </>
    )
}

