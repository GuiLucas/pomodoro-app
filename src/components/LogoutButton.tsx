import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mantine/core"

export function LogoutButton() {
    const { logout } = useAuth0()

    return <Button
        variant="light" 
        color="violet" 
        onClick={() => logout()}
    >
        Logout
    </Button>

}