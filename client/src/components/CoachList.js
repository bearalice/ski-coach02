import React from 'react'
import Coach from './Coach'

export default function CoachList({ coaches, deleteCoach, editCoach }) {
    return (
        <>
            <div className='card-body p-3'></div>
            <h1 className='card-header p-3'>All Ski and Snowboard Coaches</h1>
            <div className='card-body p-3'></div>
            {coaches.map((coach) => (
                <Coach key={coach._id} coach={coach} deleteCoach={deleteCoach} editCoach={editCoach} />
            ))}
        </>
    )
}