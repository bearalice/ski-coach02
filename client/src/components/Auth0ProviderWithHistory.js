import React from 'react'
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export default function Auth0ProviderWithHistory({ children }) {
    console.log("test env");
    // console.log(process.env.REACT_APP_AUTH0_CLIENT_ID);
    // console.log(process.env.REACT_APP_AUTH0_DOMAIN);
    const navigate = useNavigate();
    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    }
    return (
        // <div>Auth0ProviderWithHistory</div>

        <Auth0Provider
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >{children}</Auth0Provider>
    )
}