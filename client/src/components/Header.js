import React from 'react'
import { SiSnowflake } from "react-icons/si";


export default function Header({ appName, showForm, onAddClick }) {
    return (
        <header className='header'>
            <SiSnowflake />

            <h1>Welcome to {appName}</h1>
            <button onClick={onAddClick}> {showForm ? 'Close' : 'Add Task'}</button>


        </header>
    )
}