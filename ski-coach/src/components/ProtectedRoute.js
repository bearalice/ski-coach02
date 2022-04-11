import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export default function ProtectedRoute({ protectedCompo }) {
    const Compo = withAuthenticationRequired(protectedCompo);
    return (
        <Compo />
    )
}
