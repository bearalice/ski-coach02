import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Profile() {
    const { user } = useAuth0();
    console.log("testing profile");
    return (
        <div>
            <img src={user.picture} alt="user" />
            <p>{user.name}</p>
            <div>{JSON.stringify(user)}</div>
        </div>
    )
}
