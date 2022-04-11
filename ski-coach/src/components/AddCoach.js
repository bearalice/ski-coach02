import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddCoach({ addCoach }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        if (!name || !email) {
            alert("Please enter information!");
            return;
        }
        e.preventDefault();
        addCoach({ name, email });
        setName('');
        setEmail('');
        navigate('/coaches');
    }

    return (
        <>
            <h1 className="text-center">New Coach</h1>

            <form onSubmit={onSubmit}>
                <div className="form-control border-0">
                    <label>Coach Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control border-0">
                    <label>Coach Contact</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <Button variant="primary" onClick={onSubmit}>Save Coach</Button>
            </form>

        </>
    )
}