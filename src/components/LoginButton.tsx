import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mantine/core"

export function LoginButton() {
    const { loginWithRedirect } = useAuth0()

    async function handleLogin() {
        await loginWithRedirect({
            appState: {
                returnTo: '/callback'
            }
        })
    }

    return <Button
        variant="light" 
        color="violet"
        onClick={handleLogin}
    >
        Login
    </Button>

}