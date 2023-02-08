import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from 'react'
import { LoaderOverlay } from "./LoaderOverlay";

type AuthGuardProps = {
    component: React.ComponentType<object>
}

export function AuthGuard(props: AuthGuardProps) {
    const {component} = props
    const ProtectedComponent =  withAuthenticationRequired(component, {
        onRedirecting: () => <LoaderOverlay/>
    })
    return <ProtectedComponent />
}