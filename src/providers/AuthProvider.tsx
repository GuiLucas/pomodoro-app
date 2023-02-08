import type * as Core from '../types'
import type * as Auth0 from '@auth0/auth0-react'
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
    children: React.ReactNode
}

export function Auth0ProviderWithNavigate(props: Auth0ProviderWithNavigateProps) {
    const { children } = props
    
    const navigate = useNavigate()
    
    const ENV_VARS = import.meta.env
    const domain = ENV_VARS.VITE_AUTH0_DOMAIN
    const clientId = ENV_VARS.VITE_AUTH0_CLIENT_ID
    const redirectUri = ENV_VARS.VITE_AUTH0_CALLBACK

    const onRedirectCallback = (appState: Core.Optional<Auth0.AppState>) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    if(!(domain && clientId && redirectUri))
        return null

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}